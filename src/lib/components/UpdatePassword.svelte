<script lang="ts">
	import { enhance } from '$app/forms';
	import { URL_Patterns } from '$lib/constants';

	export let message: string[] = [];
	export let success: boolean;
</script>

<article class="text-left">
	<h2>Update password</h2>
	{#if message.length > 0}
		<input class="alert-state" id="alert-1" type="checkbox" />
		<div class="alert dismissible {success ? 'alert-success' : 'alert-danger'}">
			<ul>
				{#each message as msg}
					<li class="padding-small">
						{msg}
					</li>
				{/each}
			</ul>
			<label class="btn-close" for="alert-1">&times;</label>
		</div>
	{/if}
	<form
		method="post"
		action={URL_Patterns.updatePasswordAction}
		use:enhance
		class="margin-bottom"
		autocomplete="off"
	>
		<section class="form-group margin-top-large">
			<label for="password">New password</label>
			<input
				type="password"
				id="password"
				name="newPassword"
				placeholder="Type in the new password"
				class="input-block padding"
			/>
		</section>
		<section class="form-group margin-top-large">
			<label for="confirm-password">Confirm password</label>
			<input
				type="password"
				id="confirm-password"
				name="confirmPassword"
				class="input-block padding"
				placeholder="Retype the new password"
			/>
		</section>

		<!-- Button -->
		<button type="submit" class="margin-top-large paper-btn">Submit</button>
	</form>
</article>

<style>
	input[type='password'] {
		display: block;
	}
</style>
