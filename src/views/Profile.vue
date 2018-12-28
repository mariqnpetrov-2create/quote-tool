<template>
	<div class="container" v-if="user">
		<b-form @submit.prevent="update" class="form">
          <h2>Profile</h2>

          <p>Email {{user.email}}</p>

			<b-form-group
				label="Name"
				label-for="name">
				<b-form-input id="name"
				    type="text"
					v-model="displayName">

				</b-form-input>
        	</b-form-group>

        	<b-form-group
				label="Change Avatar"
				label-for="avatar">
				<b-form-file id="avatar"
				    accept="image/jpeg, image/png, image/gif"
					v-model="image"
					@change="onFileChange">

				</b-form-file>

				<div class="avatar-preview" v-if="image">
					<img :src="image"/>
				</div><!-- /.avatar-preview -->
        	</b-form-group>

            <b-form-group>
                <b-button type="submit">Update</b-button>
            </b-form-group>

            <b-alert variant="success" show v-if="updateMessage">{{updateMessage}}</b-alert>
      </b-form>
	</div><!-- /.container -->
</template>

<script>
import { mapGetters } from 'vuex';
import fileUpload from '@/mixins/file-upload';
export default {

  name: 'Profile',
  mixins: [fileUpload],

  data () {
    return {
    	name: '',
    	image: null,
    	updateMessage: null
    }
  },
  computed: {
  	...mapGetters(['isLogged', 'user']),
  	displayName: {
  		get() {
  			return this.user.displayName;
  		},
  		set(value) {
  			this.name = value;
  		}
  	}
  },
  methods: {
  	update() {
  		this.user.imageFile = this.imageFile;
  		this.$store.dispatch('updateUser', {...this.user, name: this.name});

  		this.image = null;

  		this.updateMessage = 'Profile updated';

  		setTimeout(() => {
  			this.updateMessage = null;
  		}, 3000);
  	}
  }
}
</script>

<style lang="css" scoped>
.avatar-preview { display: inline-block; max-width: 400px; height: auto; padding: 10px; border: 1px solid #ccc; margin-top: 20px; }
</style>
