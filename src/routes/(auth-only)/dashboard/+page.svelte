<script lang="ts">
	import AdminHome from '$lib/components/AdminHome.svelte';
	import UpdatePassword from '$lib/components/UpdatePassword.svelte';
	import type { LayoutParentData } from '../$types';
	import type { ActionData } from './$types';
	
	
	export let data: LayoutParentData;
	export let form: ActionData

	$: message = form?.message || []
	$: success = form?.success || false

</script>

<svelte:head>
	<title>ADMIN dashboard</title>
</svelte:head>

<article class="text-center">
	<h1>Welcome admin</h1>
	<p class="article-meta">{data.email}</p>
	<p class="text-lead">This page denotes the dashboard.</p>
	<div class="row flex-spaces tabs margin-top-large">
		<input id="tab1" type="radio" name="tabs" checked />
		<label for="tab1">Home</label>
		<input id="tab2" type="radio" name="tabs" />
		<label for="tab2">Update Password</label>
		<div class="content" id="content1">
			<AdminHome />
		</div>
		<div class="content" id="content2">
			<UpdatePassword {message} {success}/>
		</div>
	</div>
</article>

