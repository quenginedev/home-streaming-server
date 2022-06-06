<script lang="ts">
	import { useMovie } from '../../hooks/use-movie';
	import { onMount } from 'svelte';
	import { getStores } from '$app/stores';

	const { page } = getStores();
	const { generateWatchLink, getMovieInfo } = useMovie();

	let errorMsg: string;
	let movie: Movie;
	let videoPlayer: HTMLVideoElement;

	$: file = $page.params.file;
	$: link = generateWatchLink(file);

	onMount(async () => {
		const { error, data } = await getMovieInfo(file);
		if (error) return (errorMsg = error.message);
		movie = data;
	});
	let canSave = true;

	const handleTimeUpdate = async () => {
		if (canSave) {
			canSave = false;
			localStorage.setItem(`${file}-time`, videoPlayer.currentTime.toString());
			setTimeout(() => {
				canSave = true;
			}, 10000);
		}
	};
	const handleLoadStart = () => {
		videoPlayer.currentTime = parseFloat(localStorage.getItem(`${file}-time`) || '0');
	};

	const handleVideoPlayerError = (videoElement: any) => {
		errorMsg = videoElement.target.error.message;
	};
</script>

<main class="p-5">
	{#if errorMsg}
		<div class="bg-red-500/20 text-red-500 mb-5 p-5 rounded-lg">
			{errorMsg}
		</div>
	{/if}

	{#if movie}
		<!-- svelte-ignore a11y-media-has-caption -->
		<video
			bind:this={videoPlayer}
			on:error={handleVideoPlayerError}
			class="rounded-xl w-full"
			controls
			playsinline
			on:timeupdate={handleTimeUpdate}
			on:loadstart={handleLoadStart}
		>
			<source src={link} type="video/mp4" />
		</video>
		<div class="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5 flex-wrap text-white">
			<div
				class="bg-gray-700  shadow-lg border-gray-700 max-h-80 border rounded-3xl p-8 flex space-x-8"
			>
				<div class="h-48 overflow-visible w-1/2">
					<img class="rounded-3xl shadow-lg" src={movie.Poster} alt="" />
				</div>
				<div class="flex flex-col w-1/2 space-y-4">
					<div class="flex justify-between items-start">
						<h2 class="text-3xl font-bold">{movie.Title}</h2>
						<div class="bg-yellow-400 font-bold rounded-xl p-2">{movie.imdbRating}</div>
					</div>
					<div>
						<div class="text-sm text-gray-400">Movie</div>
						<div class="text-lg">{movie.Year}</div>
					</div>
				</div>
			</div>
			<div class="bg-gray-700  shadow-lg border-gray-700 border rounded-3xl p-8">
				<h1 class="text-3xl mb-2 font-bold">Plot</h1>
				<p>{movie.Plot}</p>

				<h1 class="mt-10 text-3xl mb-2 font-bold">Cast</h1>
				<p>{movie.Actors}</p>
			</div>
		</div>
	{/if}
</main>
