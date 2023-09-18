<!-- Global layout -->
<script lang="ts">
	import 'papercss/dist/paper.min.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	$: ({ navType } = data);
</script>

<Navbar {navType} />
<main>
	<slot />
</main>

<style>
	main {
		width: 90%;
		min-height: 90dvh;
		max-width: 768px;
		margin: 4rem auto 0 auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
</style>
