<script context="module">
  import { useSeries } from '../../hooks/use-series';
	const { getSeriesList } = useSeries();
	export const load = async ({ }) => {
    const { error, data } = await getSeriesList();
    return {
      status: 200,
      props: {
        errorMsg: error && error.message,
        seriesList: data
      }
    }
  };
</script>

<script lang="ts">
	export let seriesList: Array<Series> = [];
	export let errorMsg: string;

  let filterName: string;
	$: filteredSeries = seriesList.filter((series) => {
		if (series.Error) return false;
		if (filterName) return series.Title.toLocaleLowerCase().includes(filterName);
		return true;
	});
</script>

<div class="px-5">
	<input
		bind:value={filterName}
		class="px-5 py-3 w-full rounded-lg bg-gray-700 text-white outline-none"
		placeholder="Search"
	/>
	{#if errorMsg}
		<div class="bg-red-500/20 text-red-500 mt-5 p-5 rounded-lg">
			{errorMsg}
		</div>
	{/if}
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-10 p-5">
	{#each filteredSeries as series}
		<a href={`/series/${series.File}`}>
			<div
				class="bg-gray-700 shadow-lg max-h-80 border border-gray-900 sm:rounded-3xl p-8 flex space-x-8 text-white"
			>
				<div class="h-48 overflow-visible w-1/2">
					<img class="rounded-3xl shadow-xl" src={series.Poster} alt="" />
				</div>
				<div class="flex flex-col w-1/2 space-y-4">
					<div class="flex justify-between items-start">
						<h2 class="text-2xl font-bold">{series.Title}</h2>
						<div class="bg-yellow-400 font-bold rounded-xl p-2">{series.imdbRating}</div>
					</div>
					<div>
						<div class="text-sm text-gray-400">Movie</div>
						<div class="text-lg">{series.Year} <span class="font-bold">{series.Rated}</span></div>
						<div class="text-lg font-bold">{series.totalSeasons} Seasons</div>
					</div>
				</div>
			</div>
		</a>
	{/each}
</div>
