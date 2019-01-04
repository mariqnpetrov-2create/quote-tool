<template>
	<div>
		<div class="comments">
      <div v-for="(comment, index) in comments" :key="index">
        <div class="comment blog-comment" v-if="users && user">
          <div class="comment-author user" v-if="userDetails(comment.uid)">
            <div class="comment-avatar">
              <img v-if="userDetails(comment.uid).photoURL" :src="userDetails(comment.uid).photoURL" :alt="userDetails(comment.uid).email">
              <img v-else src="@/assets/user-image.png" :alt="userDetails(comment.uid).email">
            </div><!-- /.comment-avatar -->

          </div><!-- /.comment-author -->

          <div class="message">
            <div class="info" v-if="userDetails(comment.uid)">
              <span class="user-name" v-if="userDetails(comment.uid).displayName">{{userDetails(comment.uid).displayName}}</span>
              <span class="user-name" v-else>{{userDetails(comment.uid).email}}</span>

              <span class="date   sub">{{getTimeFrom(comment.date)}}</span>
            </div><!-- /.info -->

            <div class="comment-entry">
              <vue-markdown :source="comment.entry"></vue-markdown>
            </div><!-- /.comment-entry -->
          </div><!-- /.message -->

          <div v-for="(nestedComment, nestedIndex) in comment.children" :key="nestedIndex" class="comment sub-comment">
            <div class="comment-author user">
              <div class="comment-avatar">
                <img :src="userDetails(nestedComment.uid).photoURL" :alt="userDetails(nestedComment.uid).email">
              </div><!-- /.nestedComment-avatar -->
            </div><!-- /.comment-author -->

            <div class="message">
              <div class="info">
                <span class="user-name" v-if="userDetails(nestedComment.uid).displayName">{{userDetails(nestedComment.uid).displayName}}</span>
                <span class="user-name" v-if="!userDetails(nestedComment.uid).displayName">{{userDetails(nestedComment.uid).email}}</span>

                <span class="date sub">{{getTimeFrom(nestedComment.date)}}</span>
              </div><!-- /.info -->

              <div class="comment-entry">
                <vue-markdown :source="nestedComment.entry"></vue-markdown>
              </div><!-- /.comment-entry -->
            </div><!-- /.message -->
          </div>

          <div class="comment-actions">
            <div class="comments-toggle">
              <a href="#" @click.prevent="showSubComments(comment.id); comment.subRevealed = true" v-if="!comment.subRevealed && comment.hasSub">Show Comments</a>
            </div><!-- /.comments-toggle -->

            <div class="comment-reply">
              <a href="#" @click.prevent="toggleReply(comment)">
                  <span v-if="!comment.reply">Reply</span>
                  <span v-if="comment.reply">Close</span>
              </a>
            </div><!-- /.comment-reply -->

            <CommentsForm :postId="postId" :comments="comments" :mainId="comment.id" :user="user" v-if="comment.reply" @sub-added="comment.subRevealed == false ? showSubComments(comment.id) : true; comment.subRevealed = true"></CommentsForm>
          </div><!-- /.comment-actions -->

        </div><!-- /.comment -->
      </div>
    </div><!-- /.comments -->

    <p><a href="http://miaolz123.github.io/vue-markdown/" target="_blank">Markdown</a></p>

		<CommentsForm :postId="postId" :comments="comments" :user="user" v-if="user"></CommentsForm>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import CommentsForm from '@/components/CommentsForm.vue';
import VueMarkdown from 'vue-markdown';
import moment from 'moment';

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

    getTimeFrom(date) {
      return moment(date).fromNow();
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
.comments { padding-right: 10px; margin-bottom: 20px; overflow-y: auto; }

.comment .comment { padding-left: 115px; }

.comment-author { display: flex; align-items: center; }

.comment-avatar { width: 100px; height: 100px; }
.comment-avatar img { width: 100%; height: 100%; object-position: center center; object-fit: contain; }

.sub-comment { margin-top: 20px; }

.comment .date { display: inline-block; }
.comment .user-name { margin-right: 10px; }

.comments-toggle { float: left; }

.comment-actions { overflow: hidden; padding: 15px 0 40px; margin-left: 115px; }
.comment-actions .form { float: left; width: 100%; }

.comment-reply { text-align: right;}

.comment-list {
  margin-top: 32px;
}
.comment-list h5 {
  margin-bottom: 32px;
}
.comment-list ol {
  padding: 0px;
  margin-bottom: 48px;
}
.comment-list li {
  margin-bottom: 32px;
}
.comment-list li:last-child {
  margin-bottom: 0px;
}
.comment-list .children {
  padding-left: 50px;
  margin-bottom: 32px;
}
.blog-comment {
  overflow: hidden;
}
.blog-comment .user {
  width: 100px;
  float: left;
}
.blog-comment .user img {
  max-width: 100%;
}
.blog-comment .info {
  color: #333;
  margin-bottom: 16px;
}
.blog-comment .link-text {
  display: inline-block;
  margin-left: 12px;
}
.blog-comment .message {
  width: auto;
  background: #fff;
  margin-left: 115px;
  padding: 24px;
}
.blog-comment .message h6 {
  margin-bottom: 0px;
}
.comment-respond {
  margin-top: 32px;
}
.comment-form .form-input {
  margin-bottom: 16px;
}
.comment-form .form-input:last-child {
  margin-bottom: 0px;
}
.comment-form input[type="text"],
.comment-form textarea {
  width: 100%;
  padding: 16px;
  border: none;
  box-shadow: none;
}
.comment-form input[type="submit"] {
  min-width: 185px;
}


@media screen and (max-width: 767px) {
  .blog-comment .user {
    width: 50px;
  }
  .blog-comment .comment-avatar {
    width: 40px;
    height: 40px;
  }
  .blog-comment .message {
    padding: 12px;
    margin-left: 50px;
  }

  .comment-actions { margin-left: 0; }

  .comment .comment { padding-left: 50px; }
}

</style>
