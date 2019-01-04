7<template>
	<b-container v-if="quote">
    <h2>{{quote.name}}</h2>

    <h6 v-if="quote.approved">Approved</h6>

    <p>{{quote.price}}</p>

    <div class="details">
      <b-row>
        <b-col md="6">
          <div class="image">
            <b-img :src="quote.image" fluid alt="Responsive image" />
          </div><!-- /.image -->
        </b-col>
        <b-col md="6">
          <div class="entry">
            <vue-markdown :source="quote.instructions"></vue-markdown>
          </div><!-- /.entry -->

          <div class="content-actions">
            <a href="#" @click.prevent="toggleLike" :class="{active: isLiked, 'like-btn': true}">
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                   viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve"> <g> <g id="like"> <path style="fill:#010002;" d="M29.164,10.472c-1.25-0.328-4.189-0.324-8.488-0.438c0.203-0.938,0.25-1.784,0.25-3.286 C20.926,3.16,18.312,0,16,0c-1.633,0-2.979,1.335-3,2.977c-0.022,2.014-0.645,5.492-4,7.256c-0.246,0.13-0.95,0.477-1.053,0.522 L8,10.8C7.475,10.347,6.747,10,6,10H3c-1.654,0-3,1.346-3,3v16c0,1.654,1.346,3,3,3h3c1.19,0,2.186-0.719,2.668-1.727 c0.012,0.004,0.033,0.01,0.047,0.012c0.066,0.018,0.144,0.037,0.239,0.062C8.972,30.352,8.981,30.354,9,30.359 c0.576,0.143,1.685,0.408,4.055,0.953C13.563,31.428,16.247,32,19.027,32h5.467c1.666,0,2.867-0.641,3.582-1.928 c0.01-0.02,0.24-0.469,0.428-1.076c0.141-0.457,0.193-1.104,0.023-1.76c1.074-0.738,1.42-1.854,1.645-2.58 c0.377-1.191,0.264-2.086,0.002-2.727c0.604-0.57,1.119-1.439,1.336-2.766c0.135-0.822-0.01-1.668-0.389-2.372 c0.566-0.636,0.824-1.436,0.854-2.176l0.012-0.209c0.007-0.131,0.013-0.212,0.013-0.5C32,12.643,31.125,11.032,29.164,10.472z M7,29c0,0.553-0.447,1-1,1H3c-0.553,0-1-0.447-1-1V13c0-0.553,0.447-1,1-1h3c0.553,0,1,0.447,1,1V29z M29.977,14.535 C29.957,15.029,29.75,16,28,16c-1.5,0-2,0-2,0c-0.277,0-0.5,0.224-0.5,0.5S25.723,17,26,17c0,0,0.438,0,1.938,0 s1.697,1.244,1.6,1.844C29.414,19.59,29.064,21,27.375,21C25.688,21,25,21,25,21c-0.277,0-0.5,0.223-0.5,0.5 c0,0.275,0.223,0.5,0.5,0.5c0,0,1.188,0,1.969,0c1.688,0,1.539,1.287,1.297,2.055C27.947,25.064,27.752,26,25.625,26 c-0.719,0-1.631,0-1.631,0c-0.277,0-0.5,0.223-0.5,0.5c0,0.275,0.223,0.5,0.5,0.5c0,0,0.693,0,1.568,0 c1.094,0,1.145,1.035,1.031,1.406c-0.125,0.406-0.273,0.707-0.279,0.721C26.012,29.672,25.525,30,24.494,30h-5.467 c-2.746,0-5.47-0.623-5.54-0.639c-4.154-0.957-4.373-1.031-4.634-1.105c0,0-0.846-0.143-0.846-0.881L8,13.563 c0-0.469,0.299-0.893,0.794-1.042C8.856,12.497,8.94,12.471,9,12.446c4.568-1.892,5.959-6.04,6-9.446c0.006-0.479,0.375-1,1-1 c1.057,0,2.926,2.122,2.926,4.748C18.926,9.119,18.83,9.529,18,12c10,0,9.93,0.144,10.812,0.375 C29.906,12.688,30,13.594,30,13.906C30,14.249,29.99,14.199,29.977,14.535z"/> <path style="fill:#010002;" d="M4.5,26C3.672,26,3,26.672,3,27.5S3.672,29,4.5,29S6,28.328,6,27.5S5.328,26,4.5,26z M4.5,28 C4.225,28,4,27.775,4,27.5S4.225,27,4.5,27S5,27.225,5,27.5S4.775,28,4.5,28z"/> </g> </g> </svg>
            </a>

            <span v-if="quote.likedBy">{{quote.likedBy.length}}</span>
          </div><!-- /.content-actions -->
        </b-col>
      </b-row>
    </div><!-- /.details -->

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
    isLiked: {
      get() {
        let liked = false;
        if (this.quote.likedBy && this.user) {
          liked = this.quote.likedBy.includes(this.user.uid)
        }

        return liked;
      },
      set(newValue) {

      }
    }
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
        console.log(err);
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

    toggleLike() {
      const likedBy = this.quote.likedBy;
      const index = likedBy.indexOf(this.user.uid);

      this.isLiked = !this.isLiked;

      if ( index < 0 ) {
        likedBy.push(this.user.uid);
      } else {
        likedBy.splice(index, 1);
      }

      this.$store.dispatch('toggleLike', {
          id: this.id,
          likedBy
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
.like-btn { display: inline-block; vertical-align: middle; width: 26px; height: 26px; margin-right: 5px; font-size: 0; line-height: 0; }
.like-btn svg { width: 100%; height: 100%; }
.like-btn.active svg path,
.like-btn:hover svg path { fill: blue !important; }

.like-btn svg path,
.like-btn.active:hover svg path { fill: black !important; }

.content-actions span { display: inline-block; vertical-align: middle; }

.image { position: relative; padding-top: 100%; border: 1px solid #ccc; }
.image img { position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; max-width: 100%; max-height: 100%; }

.details { margin-bottom: 40px; }

.content-actions { position: absolute; bottom: 0; left: 15px; }

.entry { margin-bottom: 40px; }
</style>
