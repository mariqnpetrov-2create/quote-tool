<template>
	<b-container v-if="quote">
    <h2>{{quote.name}}</h2>
    <h6 v-if="quote.approved">Approved</h6>

    <b-img :src="quote.image" fluid alt="Responsive image" />

    <div>
        <vue-markdown>{{quote.instructions}}</vue-markdown>
    </div>

    <Comments :postId="id"></Comments>

    <div v-if="user">
      <div class="actions" v-if="quote.uid == user.uid">
        <a href="#" @click.prevent="deleteQuote()" class="btn btn-primary">Delete</a>

        <a href="#" @click.prevent="toggleApprove()" class="btn btn-primary">
            <span v-if="!quote.approved">Approve</span>
            <span v-else>Disapprove</span>
        </a>
      </div>
    </div>
  </b-container>
</template>

<script>
import VueMarkdown from 'vue-markdown';
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
  	Comments,
    VueMarkdown
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
    },

    toggleApprove() {
        this.quote.approved = !this.quote.approved;

        this.$store.dispatch('toggleApprove', {
            id: this.id,
            isApproved: this.quote.approved
        });
    }
  }
}
</script>

<style lang="css" scoped>
</style>
