<script lang="ts">
	import { URL_Patterns } from '$lib/constants';
</script>

<article>
	<section>
		<h1>Hello world</h1>
		<p>Page Access: PUBLIC</p>
	</section>
	<a href={URL_Patterns.login}>ADMIN login</a>
</article>

<style>
	article {
		width: 100%;
		min-height: 90%;
		margin-bottom: auto;
	}
</style>
