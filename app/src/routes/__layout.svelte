<script>
	import '../app.css';
	import Setup from './setup.svelte';
	import { useMedia } from '../hooks/use-media';

	const { mediaPath, logout } = useMedia();
</script>

<main class="flex flex-row justify-center bg-gray-900 min-h-screen h-full pb-32">
	<div class="max-w-screen-lg w-full ">
		{#if $mediaPath}
			<nav class="flex flex-row justify-between p-5 text-white">
				<a href="/movies/list" class="font-bold text-lg">Home Flixer</a>
				<div class="flex gap-5 font-semibold">
					<a href="/movies"><p class="hover:text-green-500">Movies</p></a>
					<a href="/series"><p class="hover:text-green-500">Series</p></a>
					<p on:click={logout} class="cursor-pointer hover:text-red-500">Log out</p>
				</div>
			</nav>
			<main>
				{#if mediaPath}
					<slot />
				{/if}
			</main>
		{:else}
			<Setup />
		{/if}
	</div>
</main>
