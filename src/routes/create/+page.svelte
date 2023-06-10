<script lang="ts">
	import { enhance } from "$app/forms";
	import type { ActionData } from "./$types";
	import { page } from "$app/stores";
	export let form: ActionData;
	import Icon from "@iconify/svelte";
	let options = [""] as string[];
	$: options = options
		.filter(Boolean)
		.concat("")
		.filter((p, i, a) => a.indexOf(p) === i);
</script>

<form class="card p-4 max-w-sm w-full" use:enhance action="/create" method="post">
	<h1 class="font-bold text-xl">Create Vote</h1>
	<label class="label">
		<span class="text-md capitalize"> name </span>
		<input
			class="input max-w-sm py-1 px-3"
			type="text"
			name="name"
			placeholder="Some cool name"
			autocomplete="off"
		/>
	</label>
	<label class="label">
		<span class="text-md capitalize"> description </span>
		<textarea
			class="textarea max-w-sm py-1 px-3"
			name="description"
			rows="5"
			placeholder="Some meaningfull description"
			autocomplete="off"
		/>
	</label>
	<div class="flex flex-col space-y-1">
		<span> Options </span>
		{#each options as o, i}
			<label class="flex flex-row space-x-1">
				<input
					type="text"
					name="options[]"
					placeholder="some good options"
					bind:value={options[i]}
					class="input px-3 py-1"
				/>
				<button
					type="button"
					on:click={() => {
						options = options.filter((_, ii) => ii !== i);
					}}
					class="btn bg-red-600 max-w-min"
				>
					<Icon icon="mdi:close" />
				</button>
			</label>
		{/each}
	</div>
	<button
		type="button"
		class="mt-2 btn btn-sm variant-filled w-full"
		on:click={() => {
			options = options.concat("");
		}}
	>
		Add Options
	</button>
	<button type="submit" class="mt-2 btn btn-sm variant-filled-primary w-full"> Create </button>
</form>

{#if form}
	<div class="card p-4 max-w-sm w-full mt-2">
		<h2>Successfully create voting</h2>
		<p>Click url bellow to visit voting page</p>
		<a
			class="text-blue-600 hover:text-blue-700 visited:text-purple-700 underline"
			href="/v/{form.id}"
		>
			{new URL(`/v/${form.id}`, $page.url).href}
		</a>
	</div>
{/if}
