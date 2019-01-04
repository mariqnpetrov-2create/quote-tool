<template>
	<footer class="footer">
		<div class="footer-inner">
			<div class="container">
				<p>For any feedback contact @mpetrov.</p>
			</div><!-- /.container -->
		</div><!-- /.footer-inner -->
	</footer><!-- /.footer -->
</template>

<script>
export default {

  name: 'Footer',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
	.footer { position: absolute; bottom: 0; left: 0; display: flex; align-items: center; width: 100%; height: 80px; background: #333; color: #fff; text-align: center; }
	.footer .footer-inner { width: 100%; }
</style>
