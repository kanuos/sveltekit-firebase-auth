<script lang="ts">
	import { enhance } from '$app/forms';
	import { URL_Patterns } from '$lib/constants';
	import type { ActionData, PageServerData } from './$types';

	export let form: ActionData;
	export let data: PageServerData;

	$: forgotMessage = form?.forgot?.message || '';
	$: forgotSuccess = form?.forgot?.success || false;

	$: resetMessage = form?.reset?.message || '';
	$: resetSuccess = form?.reset?.success || false;

	$: resetMode = data.mode === 'reset';

	// form action depending on the form type
	$: action = resetMode ? URL_Patterns.resetAction : URL_Patterns.forgotAction;
	$: title = resetMode ? 'Reset Password' : 'Forgot Password';
</script>

<svelte:head>
	<title>{title} Page</title>
</svelte:head>

<article>
	<h1>
		{title}
	</h1>
	{#if forgotMessage.length > 0}
		<div>
			<input class="alert-state" id="deleteAdminMsgs" type="checkbox" />
			<div class="alert dismissible {forgotSuccess ? 'alert-success' : 'alert-danger'}">
				<ul>
					{#each forgotMessage as msg}
						<li class="padding-small">
							{msg}
						</li>
					{/each}
				</ul>
				<label class="btn-close" for="deleteAdminMsgs">&times;</label>
			</div>
		</div>
	{/if}
	{#if resetMessage.length > 0}
		<div>
			<input class="alert-state" id="deleteAdminMsgs" type="checkbox" />
			<div class="alert dismissible {resetSuccess ? 'alert-success' : 'alert-danger'}">
				<ul>
					{#each resetMessage as msg}
						<li class="padding-small">
							{msg}
						</li>
					{/each}
				</ul>
				<label class="btn-close" for="deleteAdminMsgs">&times;</label>
			</div>
		</div>
	{/if}
	<form method="post" use:enhance {action} class="margin-bottom" autocomplete="off">
		{#if resetMode}
			<section class="form-group">
				<label for="newPassword">New Password</label>
				<input
					type="password"
					id="newPassword"
					name="newPassword"
					class="input-block"
					placeholder="Type in your new password"
					autocomplete="off"
				/>
			</section>
			<section class="form-group">
				<label for="confirmPassword">Confirm Password</label>
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					class="input-block"
					placeholder="Retype the new password"
					autocomplete="off"
				/>
			</section>
			<input type="hidden" name="code" value={data.code}>
		{:else}
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
		{/if}

		<!-- Button -->
		<button type="submit" class="margin-top-large paper-btn">Submit</button>
	</form>
</article>
