<template>
	<b-form @submit.prevent="addComment" class="form">
		<b-form-group>
			<b-form-textarea id="comment"
			    type="text"
			    rows="2"
			    placeholder="Add Comment"
				v-model="comment">

			</b-form-textarea>
    	</b-form-group>

        <b-form-group>
            <b-button type="submit">Add</b-button>
        </b-form-group>
  </b-form>
</template>

<script>
export default {

  name: 'CommentsForm',
  props: {
  	postId: {
  		type: String,
  		required: true
  	},
  	mainId: {
  		type: null,
  		default: ''
  	},
  	comments: {
  		type: Array,
  		required: true
  	},
  	user: {
  		type: null,
  		required: true
  	}
  },

  data () {
    return {
    	comment: ''
    }
  },

  methods: {
  	addComment() {
  		const {uid, photoURL, displayName} = this.user;
  		const commentData = {
			uid,
			photoURL,
			displayName,
			entry: this.comment
		};

  		if (!this.mainId.toString().length) {
  			this.$store.dispatch('addComment', {
	  			id: this.postId,
	  			comment: commentData
	  		});
  		} else {
  			this.$store.dispatch('addSubComment', {
	  			id: this.postId,
	  			comment: commentData,
	  			commentId: this.mainId
	  		});
  		}

  		this.comment = '';
  	}
  }
}
</script>

<style lang="css" scoped>
</style>
