<script context="module">
	import { useSeries } from '../../../hooks/use-series';
	const { getSeriesInfo, generateWatchLink } = useSeries();

	// @ts-ignore
	export const load = async ({ params }) => {
		const seriesName = params.seriesName;
		const { data, error } = await getSeriesInfo(seriesName);
		return {
			status: 200,
			props: {
				seriesName,
				errorMsg: error,
				series: data
			}
		};
	};
</script>

<script lang="ts">
	export let seriesName: string;
	export let series: Series;
	export let errorMsg: string;
	let videoPlayer: HTMLVideoElement;
	let selectedSeason = series.seasonsList[0];
	let selectedEpisode = 0;

	const { getSeriesSeasonEpisodes } = useSeries();

	const handleTimeUpdate = async () => {};
	const handleLoadStart = () => {
		videoPlayer.currentTime = parseFloat(localStorage.getItem(`${seriesName}-time`) || '0');
	};

	const handleVideoPlayerError = (videoElement: any) => {
		errorMsg = videoElement.target.error.message;
	};
</script>

<main class="p-5">
	<div class="py-5">
		{#if errorMsg}
			<div class="bg-red-500/20 text-red-500 mt-5 p-5 rounded-lg">
				{errorMsg}
			</div>
		{/if}
	</div>

	{#if series}
		<!-- svelte-ignore a11y-media-has-caption -->
		{#await getSeriesSeasonEpisodes({ selectedSeason, seriesName }) then episodes}
			<div class="grid grid-cols-1 md:grid-cols-4 gap-5">
				<video
					bind:this={videoPlayer}
					src={generateWatchLink({
						file: seriesName,
						season: selectedSeason,
						episode: episodes[selectedEpisode]
					})}
					on:error={handleVideoPlayerError}
					class="rounded-xl col-span-1 md:col-span-3 w-full"
					controls
					playsinline
					on:timeupdate={handleTimeUpdate}
					on:loadstart={handleLoadStart}
				/>
				<div class="col-span-1 md:col-span-1 w-full h-full text-white">
					<div
						class="bg-gray-700 col-span-2 shadow-lg border-gray-700 border rounded-3xl py-5 overflow-y-scroll no-scrollbar"
					>
						<h2 class="font-bold text-lg px-5">Episode List</h2>
						<ul class="mt-5 flex flex-col gap-5">
							{#each episodes as episode, index}
								<li
									on:click={() => (selectedEpisode = index)}
									class="bg-gray-500 px-5 py-3 cursor-pointer"
								>
									{episode.split('.')[0]}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		{/await}
		<div class="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5 text-white">
			<div
				class="bg-gray-700 col-span-2 shadow-lg border-gray-700 border rounded-3xl p-8 flex flex-row flex-wrap gap-2"
			>
				{#each series.seasonsList as season}
					<button
						on:click={() => (selectedSeason = season)}
						class="bg-gray-500 p-3 font-semibold capitalize rounded-lg">{season}</button
					>
				{/each}
			</div>
			<div
				class=" col-span-2 md:col-span-1 bg-gray-700 shadow-lg border-gray-700 max-h-80 border rounded-3xl p-8 flex space-x-8"
			>
				<div class="h-48 overflow-visible w-1/2">
					<img class="rounded-3xl shadow-lg" src={series.Poster} alt="" />
				</div>
				<div class="flex flex-col w-1/2 space-y-4">
					<div class="flex justify-between items-start">
						<h2 class="text-3xl font-bold">{series.Title}</h2>
						<div class="bg-yellow-400 font-bold rounded-xl p-2">{series.imdbRating}</div>
					</div>
					<div>
						<div class="text-sm text-gray-400">Movie</div>
						<div class="text-lg">{series.Year}</div>
					</div>
				</div>
			</div>
			<div
				class="col-span-2 md:col-span-1 bg-gray-700 shadow-lg border-gray-700 border rounded-3xl p-8"
			>
				<h1 class="text-3xl mb-2 font-bold">Plot</h1>
				<p>{series.Plot}</p>
				<h1 class="mt-10 text-3xl mb-2 font-bold">Cast</h1>
				<p>{series.Actors}</p>
			</div>
		</div>
	{/if}
</main>

<style>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
</style>
