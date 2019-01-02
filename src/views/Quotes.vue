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
                        <span>
                            <span v-if="user" class="delete-button">
                                <b-button @click="deleteQuote(quote.id, quote.image)" v-if="quote.uid == user.uid" variant="primary" target="_blank">Delete</b-button>
                            </span>

                            <b-button :to="`quote/${quote.id}`" variant="secondary">Discuss</b-button>
                        </span>

                        <b-button :href="quote.link" v-if="quote.link" variant="primary" target="_blank">See Project</b-button>
                    </div>
                </b-card>
            </b-col>
        </b-row>

        <div v-if="quotes.length == 0">
            <h2>There are no quotes currently. <router-link to="/add-quote">Add one.</router-link></h2>
        </div>
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
    ...mapGetters(['quotes', 'user'])
  },
  created() {
    this.$store.dispatch('getQuotes');
  },
  methods: {
    deleteQuote(id, imageURL) {
        this.$store.dispatch('deleteQuote', {
            id,
            imageURL
        })
        .catch(err => {
          alert(err);
        });

        this.$store.commit('removeQuote', id);
    }
  }
}
</script>

<style lang="css" scoped>
.card { margin-bottom: 30px; }

.card img { height: 250px; object-position: center center; object-fit: cover; }

.card .actions { display: flex; justify-content: space-between; flex-direction: row-reverse; }

.card .delete-button { margin-right: 10px; }
</style>
