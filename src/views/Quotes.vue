<template>
    <b-container>
        <b-form @submit.prevent="filterQuotes" class="filters">
            <b-form-group>
                <b-form-input id="Search"
                    type="text"
                    placeholder="Search By Name/Description"
                    v-model="filters.search">
                </b-form-input>

                <b-button type="submit" class="search-btn">Search</b-button>  
            </b-form-group>
        </b-form>

        <b-form-group>
            <b-form-checkbox v-model="byUser" @input="filterQuotes">
                My Quotes
            </b-form-checkbox>

            <b-form-checkbox v-model="approved" @input="filterQuotes">
                Approved Quotes
            </b-form-checkbox>
        </b-form-group>

        <b-row v-if="quotes">
            <b-col v-for="(quote, index) in filteredQuotes" :key="index" xl="4" md="6">
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

                        <b-button :href="quote.link" v-if="quote.link" variant="primary" target="_blank">Related Project</b-button>
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
        filters: {
            search: ''
        },
        filteredQuotes: {},
        options: [{
            text: 'My Quotes Only',
            value: 'my-quotes'
        }],
        byUser: false,
        approved: false
    }
  },
  computed: {
    ...mapGetters(['quotes', 'user'])
  },
  created() {
    this.$store.dispatch('getQuotes').then( () => {
        this.filteredQuotes = this.quotes;
    });
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
    },

    filterQuotes() {
        const searchRegex = new RegExp(this.filters.search)

        this.filteredQuotes = this.quotes.filter(quote => {
            const isMatched = searchRegex.test(quote.name) || searchRegex.test(quote.instructions);
            const isByUser = this.byUser != true ? true : quote.uid == this.user.uid;
            const isApproved = this.approved != true ? true : quote.approved;

            return isMatched && isByUser && isApproved;
        });
    }
  }
}
</script>

<style lang="css" scoped>
.card { margin-bottom: 30px; }

.card img { height: 250px; object-position: center center; object-fit: cover; }

.card .actions { display: flex; justify-content: space-between; flex-direction: row-reverse; }

.card .delete-button { margin-right: 10px; }

.filters { position: relative; }
.filters .search-btn { position: absolute; top: 0; right: 0; min-width: 100px; }
</style>
