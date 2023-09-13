<script lang="ts">
	import type { LayoutParentData } from '../$types';
	export let data: LayoutParentData;
</script>

<svelte:head>
	<title>ADMIN dashboard</title>
</svelte:head>

<article class="margin-top-large text-center">
	<h1>Welcome admin</h1>
	<p class="article-meta">{data.email}</p>
	<p class="text-lead">This page denotes the dashboard.</p>
	<p>
		Only select users i.e ADMINs will have access to this page. You can add any form or admin
		specific content on this page. No unauthenticated user can access this page. Since this page is
		being rendered using SSR - there's not even a slight flash of unauthenticated content or FOUC.
	</p>
	<br />
	<p>
		If an unauthenticated user pretending to be an ADMIN of the site attempts to access the
		dashboard directly - user gets redirected to the login page.
	</p>
	<figure>
		<img
			src="https://source.unsplash.com/random/900×700/"
			alt="Random pic from unsplash"
			loading="lazy"
		/>
		<figcaption class="margin-top article-meta">
			A random image only ADMIN can access. Try refreshing to change the image ☺️
		</figcaption>
	</figure>
</article>
