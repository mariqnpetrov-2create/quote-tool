<template>
	<header class="header">
		<b-navbar toggleable="md" type="dark">
			<div class="container">
				<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

				<router-link to="/" class="navbar-brand">
					<img src="@/assets/logo.png" alt="" width="35" height="35">
				</router-link>

				<b-collapse is-nav id="nav_collapse" class="navigation">
					<b-navbar-nav class="ml-auto" v-if="!user">
						<li class="nav-item">
							<router-link class="nav-link" to="/login">Login</router-link>
						</li>

						<li class="nav-item">
							<router-link class="nav-link" to="/signup">Sign Up</router-link>
						</li>
					</b-navbar-nav>

					<b-navbar-nav class="ml-auto" v-if="user">
						<li class="nav-item">
							<router-link class="nav-link" to="/quotes">Quotes</router-link>
						</li>

						<li class="nav-item">
							<router-link class="nav-link" to="/add-quote">Add Quote</router-link>
						</li>

						<b-dropdown class="profile-dropdown" ref="dropdown">
							<template slot="button-content">
								<img class="avatar" :src="user.photoURL" alt="" v-if="user.photoURL"> {{user.displayName ? user.displayName : user.email}}
							</template>

							<router-link class="dropdown-item" @click.native="hide" to="/profile">Profile</router-link>

							<a href="#" @click.prevent="signOut" class="dropdown-item">Sign Out</a>
						</b-dropdown>
					</b-navbar-nav>
				</b-collapse>
			</div><!-- /.container -->
		</b-navbar>
	</header><!-- /.header -->
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Header',

  data () {
    return {

    }
  },
  computed: {
  	...mapGetters(['isLogged', 'user'])
  },
  methods: {
  	signOut() {
  		this.$store.dispatch('logout');

  		this.$router.push('/login');
  	},
  	hide() {
  		this.$refs.dropdown.hide();
  	}
  }
}
</script>

<style lang="css">
	.header a { text-decoration: none; }

	.navigation .dropdown-menu span { display: block; padding: 4px 24px; }

	.avatar { width: auto; height: auto; max-width: 36px; max-height: 36px; margin: -8px 0 -8px -8px; }

	.navbar { background: #505050; color: #fff; }
	.navbar .navigation .navbar-nav .nav-link { color: #fff; }

	.profile-dropdown { margin-left: 20px; background: none; }
	.profile-dropdown button { border: 0 none; background: none; }
	.profile-dropdown button:hover,
	.profile-dropdown button:active,
	.profile-dropdown button:focus,
	.profile-dropdown.show button.dropdown-toggle,
	.profile-dropdown.show button:active,
	.profile-dropdown.show button:focus,
	.profile-dropdown.show button:hover { background: none !important; outline: 0 none; box-shadow: none !important; border: 0 none!important; }

</style>
