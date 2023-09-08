<script>
	import { URL_Patterns } from '$lib/constants';
</script>

<article>
	<h1>Login</h1>

	<form>
		<section>
			<label for="email">Email address</label>
			<input type="email" id="email" name="email" placeholder="e.g. johndoe@example.com" required />
			<small>We'll never share your email with anyone else.</small>
		</section>
		<section>
			<label for="password">Password</label>
			<input
				type="password"
				id="password"
				name="password"
				placeholder="*******"
				required
				autocomplete="bday-day"
			/>
			<small>We'll never share your email with anyone else.</small>
		</section>

		<!-- Button -->
		<button type="submit">Submit</button>
	</form>
	<a href={URL_Patterns.forgot}>Forgot password</a>
</article>

<style>
	article {
		min-height: 90%;
		margin-bottom: auto;
	}
	article,
	form {
		width: 100%;
	}

	button {
		margin-top: 5rem;
	}
	small {
		font-size: 0.75rem;
	}
</style>
