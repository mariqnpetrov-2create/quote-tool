<template>
	<b-container>
	    <b-row v-if="quotes">
	        <b-col v-for="(quote, index) in quotes" :key="index" md="6">
	        	<b-card :title="quote.name"
			          :img-src="quote.image"
			          img-top
			          tag="article">
				    <p class="card-text">
				     {{quote.instructions}}
				    </p>
				    <div class="actions">
				    	<b-button :to="`quote/${quote.id}`" variant="secondary">Discuss</b-button>

				    	<b-button :href="quote.link" v-if="quote.link" variant="primary" target="_blank">See Project</b-button>
				    </div>
				</b-card>
	        </b-col>
	    </b-row>
	</b-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {

  name: 'Quotes',

  data () {
    return {

    }
  },
  computed: {
  	...mapGetters(['quotes'])
  },
  created() {
  	this.$store.dispatch('getQuotes');
  }
}
</script>

<style lang="css" scoped>
.card { margin-bottom: 30px; }

.card img { height: 250px; object-position: center center; object-fit: cover; }

.card .actions { display: flex; justify-content: space-between; flex-direction: row-reverse; }
</style>
