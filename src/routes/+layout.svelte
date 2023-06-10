<script>
	import "@skeletonlabs/skeleton/themes/theme-gold-nouveau.css";
	import "@skeletonlabs/skeleton/styles/skeleton.css";
	import "../app.postcss";
	import "@fontsource/dm-sans";

	import { AppBar, AppShell } from "@skeletonlabs/skeleton";
	import Navigation from "$components/Navigation.svelte";
	import Icon from "@iconify/svelte";
</script>

<AppShell slotHeader="bg-surface-500" slotFooter="sticky bottom-0" class="font-dm-sans">
	<svelte:fragment slot="header">
		<AppBar>
			<a href="/" class="font-bold">Vote</a>
			<svelte:fragment slot="trail">
				<a href="//github.com/falentio/vote"> <Icon icon="mdi:github" class="h-8 w-8" /> </a>
			</svelte:fragment>
			<svelte:fragment slot="lead">
				<span />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>

	<div class="container mx-auto p-2 w-full items-center flex flex-col">
		<slot />
	</div>

	<svelte:fragment slot="footer">
		<footer class="bg-surface-800 text-surface-200 p-4 text-center">
			Made by Kevin Falentio &copy; 2023
		</footer>
	</svelte:fragment>
</AppShell>
