<template>
	<b-container v-if="quote">
		<b-img :src="quote.image" fluid alt="Responsive image" />

		<Comments :postId="id"></Comments>
	</b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import Comments from '@/components/Comments.vue';

export default {

  name: 'QuoteDetail',

  props: ['id'],

  data () {
    return {
    	quote: {}
    }
  },
  components: {
  	Comments
  },
  created() {
  	this.$store.dispatch('getQuote', this.id)
  		.then(quote => this.quote = quote)
  		.catch(err => {
  			this.$router.push('/quotes');
  		});
  }
}
</script>

<style lang="css" scoped>
</style>
