<script>
	import { URL_Patterns } from '$lib/constants';
</script>

<article>
	<h1>Forgot password</h1>
	<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, libero?</p>
	<form>
		<section>
			<label for="email">Admin Email</label>
			<input
				type="email"
				id="email"
				name="email"
				placeholder="*******"
				required
				autocomplete="off"
			/>
			<small>We'll never share your email with anyone else.</small>
		</section>

		<!-- Button -->
		<button type="submit">Submit</button>
	</form>
	<a href={URL_Patterns.login}>Login</a>
</article>

<style>
	article {
		min-height: 90%;
		margin-bottom: auto;
	}
	form {
		width: 100%;
	}
</style>
