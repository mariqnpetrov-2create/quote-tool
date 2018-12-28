<template>
	<div>
		<div v-for="(comment, index) in comments" :key="index">
			<div class="comment">
				<div class="comment-author">
					<span>{{comment.id}}</span>
				</div><!-- /.comment-author -->

				<p>{{comment.entry}}</p>

				<div v-for="(nestedComment, nestedIndex) in comment.children" :key="nestedIndex">
					<div class="comment">
						<div class="comment-author">
							<span>{{nestedComment.id}}</span>
						</div><!-- /.comment-author -->

						<p>{{nestedComment.entry}}</p>
					</div><!-- /.comment -->
				</div>
			</div><!-- /.comment -->
		</div>

		<b-form @submit.prevent="addComment" class="form">
			<h5>Add Comment</h5>

			<b-form-group>
				<b-form-textarea id="newComment"
				    type="text"
				    rows="2"
					v-model="newComment">

				</b-form-textarea>
        	</b-form-group>

            <b-form-group>
                <b-button type="submit">Add</b-button>
            </b-form-group>
      </b-form>
	</div>
</template>

<script>
export default {

  name: 'Comments',
  props: ['postId'],

  data () {
    return {
    	comments: [{
    			id: 123,
    			entry: 'Test',
    			children: [{
    				id: 123,
    				entry: 'Test 2',
    			}]
    		},
    		{
    			id: 151,
    			entry: 'Test 3',
    			children: [{
    				id: 123,
    				entry: 'Test 4'
    			}]
    		}
    	],
    	newComment: ''
    }
  },
  methods: {
  	addComment() {
  		this.$store.dispatch('addComment', {
  			id: this.postId,
  			comment: {
  				uid: this.$store.state.auth.user.uid,
  				entry: this.newComment
  			}
  		});

  		this.comments.push({
  			id: this.$store.state.auth.user.uid,
  			entry: this.newComment
  		});

  		this.newComment = '';
  	}
  },
  created() {

  }
}
</script>

<style lang="css" scoped>
.comment .comment { padding-left: 50px; }
</style>
