<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<svelte:head>
	<title>Forgot Password Page</title>
</svelte:head>

<article>
	<h1>Forgot Password</h1>

	<form method="post" use:enhance class="margin-bottom" autocomplete="off">
		<section class="form-group">
			<label for="email">Email address</label>
			<input
				type="email"
				id="email"
				name="email"
				class="input-block"
				placeholder="e.g. johndoe@example.com"
				required
				autocomplete="off"
			/>
		</section>

		<!-- Button -->
		<button type="submit" class="margin-top-large paper-btn">Submit</button>
	</form>
</article>
