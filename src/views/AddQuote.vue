<template>
	<div class="container" v-if="user">
		<b-form @submit.prevent="addQuote" class="form">
			<h2>Add Quote</h2>

			<b-form-group
				label="Name"
				label-for="name">
				<b-form-input id="name"
				    type="text"
					v-model="quote.name">

				</b-form-input>
        	</b-form-group>

        	<b-form-group
				label="Screenshot"
				label-for="screenshot">
				<b-form-file id="screenshot"
				    accept="image/jpeg, image/png, image/gif"
					v-model="quote.image"
					@change="onFileChange">

				</b-form-file>

				<div class="quote-preview" v-if="quote.image">
					<img :src="image" v-if="image"/>
				</div><!-- /.quote-preview -->
        	</b-form-group>

        	<b-form-group
				label="Price"
				label-for="price">
				<b-form-input id="price"
				    type="text"
					v-model="quote.price">

				</b-form-input>
        	</b-form-group>

        	<b-form-group
				label="Link"
				label-for="link">
				<b-form-input id="link"
				    type="text"
					v-model="quote.link">

				</b-form-input>
        	</b-form-group>

        	<b-form-group
				label="Instructions"
				label-for="instructions">
				<b-form-textarea id="instructions"
				    type="text"
				    rows="6"
					v-model="quote.instructions">

				</b-form-textarea>
        	</b-form-group>

            <b-form-group>
                <b-button type="submit">Add</b-button>
            </b-form-group>

            <b-alert variant="success" show v-if="updateMessage">{{updateMessage}}</b-alert>
      </b-form>
	</div><!-- /.container -->
</template>

<script>
import { mapGetters } from 'vuex';
import fileUpload from '@/mixins/file-upload';
export default {

  name: 'AddQuote',
  mixins: [fileUpload],

  data () {
    return {
    	updateMessage: null,
      image: '',
    	quote: {
    		name: '',
    		image: null,
    		price: '',
    		link: '',
    		instructions: ''
    	}
    }
  },

  computed: {
  	...mapGetters(['isLogged', 'user'])
  },

  methods: {
  	addQuote() {
  		this.quote.imageFile = this.imageFile;
  		this.$store.dispatch('addQuote', this.quote);

  		this.updateMessage = 'Quote Added';

      this.quote = {
        name: '',
        image: null,
        price: '',
        link: '',
        instructions: '',
        imageFile: null
      };

      this.image = '';
      this.imageFile = null;

  		setTimeout(() => {
  			this.updateMessage = null;
  		}, 3000);
  	}
  }
}
</script>

<style lang="css" scoped>
.quote-preview { display: inline-block; height: auto; padding: 10px; border: 1px solid #ccc; margin-top: 20px; }
.quote-preview img { max-width: 100%; }
</style>
