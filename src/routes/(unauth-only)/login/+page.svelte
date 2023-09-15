<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import { URL_Patterns } from '$lib/constants';

	export let form: ActionData;

	$: msg = form?.message

</script>

<svelte:head>
	<title>Login Page</title>
</svelte:head>

<article>
	<h1>Login</h1>

	{#if msg}
		<input class="alert-state" id="alert-5" type="checkbox" />
		<div class="alert alert-danger dismissible">
			{msg}
			<label class="btn-close" for="alert-5">&times;</label>
		</div>
	{/if}
	<form method="post" use:enhance class="margin-bottom" autocomplete="off">
		<section class="form-group">
			<label for="email">Email address</label>
			<input
				type="email"
				id="email"
				name="email"
				class="input-block"
				placeholder="e.g. johndoe@example.com"
				autocomplete="off"
			/>
		</section>
		<section class="form-group margin-top-large">
			<label for="password">Password</label>
			<input
				type="password"
				id="password"
				name="password"
				placeholder="*******"
				class="input-block"
			/>
		</section>

		<!-- Button -->
		<button type="submit" class="margin-top-large paper-btn">Submit</button>
	</form>
	<a href={URL_Patterns.forgot}>Forgot password</a>
</article>
