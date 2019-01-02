<template>
	<b-container v-if="quote">
    <b-img :src="quote.image" fluid alt="Responsive image" />

    <div v-if="user">
      <div class="actions" v-if="quote.uid == user.uid">
        <a href="#" @click.prevent="deleteQuote()" class="btn btn-primary">Delete</a>
      </div>
    </div>

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
  computed: {
    ...mapGetters(['user']),
  },
  components: {
  	Comments
  },
  created() {
  	this.$store.dispatch('getQuote', this.id)
  		.then(quote => {
        this.quote = quote;
      })
  		.catch(err => {
  			this.$router.push('/quotes');
  		});
  },
  methods: {
    deleteQuote() {
      this.$store.dispatch('deleteQuote', {
        id: this.id,
        imageURL: this.quote.image
      })
        .then( () => {
          this.$router.push('/quotes');
        })
        .catch(err => {
          alert(err)
        });
    }
  }
}
</script>

<style lang="css" scoped>
</style>
