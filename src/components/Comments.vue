<template>
	<div>
		<div v-for="(comment, index) in comments" :key="index">
			<div class="comment" v-if="users && user">
				<div class="comment-author" v-if="userDetails(comment.uid)">
          <div class="comment-avatar">
            <img v-if="userDetails(comment.uid).photoURL" :src="userDetails(comment.uid).photoURL" :alt="userDetails(comment.uid).email">
            <img v-else src="@/assets/user-image.png" :alt="userDetails(comment.uid).email">
          </div><!-- /.comment-avatar -->

          <span v-if="userDetails(comment.uid).displayName">{{userDetails(comment.uid).displayName}}</span>
					<span v-if="!userDetails(comment.uid).displayName">{{userDetails(comment.uid).email}}</span>
				</div><!-- /.comment-author -->

				<div class="comment-entry">
                    <vue-markdown>{{comment.entry}}</vue-markdown>
        </div><!-- /.comment-entry -->

        <div class="comment-actions">
          <b-button @click="showSubComments(comment.id); comment.subRevealed = true" v-if="!comment.subRevealed && comment.hasSub">Show Comments</b-button>
        </div><!-- /.comment-actions -->

				<div v-for="(nestedComment, nestedIndex) in comment.children" :key="nestedIndex">
					<div class="comment">
						<div class="comment-author">
              <div class="comment-avatar">
                <img :src="userDetails(nestedComment.uid).photoURL" :alt="userDetails(nestedComment.uid).email">
              </div><!-- /.nestedComment-avatar -->

              <span v-if="userDetails(nestedComment.uid).displayName">{{userDetails(nestedComment.uid).displayName}}</span>
              <span v-if="!userDetails(nestedComment.uid).displayName">{{userDetails(nestedComment.uid).email}}</span>
            </div><!-- /.comment-author -->

						<div class="comment-entry">
                            <vue-markdown>{{nestedComment.entry}}</vue-markdown>
            </div><!-- /.comment-entry -->
					</div><!-- /.comment -->
				</div>

        <a href="#" @click.prevent="toggleReply(comment)">
            <span v-if="!comment.reply">Reply</span>
            <span v-if="comment.reply">Close</span>
        </a>

        <CommentsForm :postId="postId" :comments="comments" :mainId="comment.id" :user="user" v-if="comment.reply"></CommentsForm>
			</div><!-- /.comment -->
		</div>

		<CommentsForm :postId="postId" :comments="comments" :user="user" v-if="user"></CommentsForm>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import CommentsForm from '@/components/CommentsForm.vue';
import VueMarkdown from 'vue-markdown';

import {
  importDatabase,
} from '@/lib/firebase';

export default {

  name: 'Comments',
  props: ['postId'],

  data () {
    return {
    	comments: []
    }
  },

  components: {
    CommentsForm,
    VueMarkdown
  },

  computed: {
    ...mapGetters(['user', 'users']),
    userDetails() {
      if ( !this.users.includes(this.user) ) {
        this.users.push(this.user)
      };

      return function(uid) {
        return this.users.find(user => {
          return user.uid == uid;
        });
      }
    }
  },

  methods: {
    showSubComments(id) {
      importDatabase().then(database => {
        database()
          .collection('main-comments')
          .doc(this.postId)
          .collection('comments')
          .doc(id)
          .collection('subcomments')
          .orderBy('date')
          .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
              if (change.type === 'added') {
                const data = change.doc.data();

                const currentComment = this.comments.findIndex(comment => comment.id == id);

                this.comments[currentComment].children.push(data);

                this.$store.dispatch('getUsers', data.uid);
              }
            });
          });
      });
    },

    toggleReply(comment) {
      comment.reply = !comment.reply;
    }
  },

  created() {
    importDatabase().then(database => {
      database()
        .collection('main-comments')
        .doc(this.postId)
        .collection('comments')
        .orderBy('date')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              const data = change.doc.data();

              let hasSub = false;

               change.doc.ref.collection('subcomments').get().then(doc => {
                    hasSub = !doc.empty;

                    this.comments.push({
                        ...data,
                        id: change.doc.id,
                        reply: false,
                        subRevealed: false,
                        hasSub,
                        children: []
                    });
               });


              this.$store.dispatch('getUsers', data.uid);
            }

          });

        });
    });
  }
}
</script>

<style lang="css" scoped>
.comment .comment { padding-left: 50px; }

.comment-author { display: flex; align-items: center; }

.comment-avatar { width: 30px; height: 30px; }
.comment-avatar img { width: 100%; height: 100%; object-position: center center; object-fit: contain; }

.comment-entry { padding-left: 30px; }
</style>
