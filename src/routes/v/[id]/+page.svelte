<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
	import Icon from "@iconify/svelte";
	import type { PageData } from "./$types";
	import { ProgressBar } from "@skeletonlabs/skeleton";

	export let data: PageData;
	let selected = "";
</script>

<div class="flex flex-col max-w-lg w-full">
	<span class="flex flex-row justify-between">
		<h1 class="text-3xl font-bold underline">{data.voting.name}</h1>
		<button class="btn btn-sm variant-filled">
			<Icon icon="mdi:share" />
		</button>
	</span>
	<p>{data.voting.description}</p>
	<div class="block">
		<span class="text-lg font-bold"> Options</span>
		<span>(click to vote)</span>
	</div>
	<form
		class="grid grid-cols-[auto_1fr_auto] gap-2 items-center"
		use:enhance
		method="post"
		action="/v/{$page.params.id}"
	>
		{#each data.voting.options as o}
			<button
				type="submit"
				on:click={() => {
					selected = o;
				}}
				class="btn variant-filled btn-sm variant-filled-primary">{o}</button
			>
			<ProgressBar label={o} value={data.points[o] || 0} max={data.max} min={0} />
			<span class="text-center bg-green-300 rounded-container-token px-1 text-green-700">
				{data.points[o] || 0}
			</span>
		{/each}
		<input type="text" class="hidden" bind:value={selected} name="selected" />
	</form>
</div>
