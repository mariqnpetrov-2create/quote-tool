import Vue from 'vue';
import Router from 'vue-router'
import firebase from 'firebase';
import store from '@/store';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Signup from '@/views/SignUp.vue';
import Profile from '@/views/Profile.vue';
import AddQuote from '@/views/AddQuote.vue';
import Quotes from '@/views/Quotes.vue';
import QuoteDetail from '@/views/QuoteDetail.vue';

import Account from '@/router/middleware/account';
import isUserLoggedIn from '@/router/middleware/is-logged-in';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      middlewares: {
        guards: [Account]
      }
    }
  },
  {
    path: '/signup',
    component: Signup,
    meta: {
      middlewares: {
        guards: [Account]
      }
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      middlewares: {
        guards: [isUserLoggedIn]
      }
    }
  },
  {
    path: '/add-quote',
    name: 'add-quote',
    component: AddQuote,
    meta: {
      middlewares: {
        guards: [isUserLoggedIn]
      }
    }
  },
  {
    path: '/quotes',
    name: 'quotes',
    component: Quotes
  },
  {
    path: '/quote/:id',
    component: QuoteDetail,
    props: true
  }
];

const router = new Router({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if ( to.meta.middlewares ) {
    const guards = to.meta.middlewares.guards;

    if ( guards ) {

      for (let i = 0; i < guards.length; i++) {
        const result = guards[i]();

        if (!result.passed) {
          if ( !store.getters.isLogged ) {
            next({
                name: result.redirect.name,
                query: {
                  redirect: to.fullPath
                }
            });
          } else {
            if ( from.query.redirect ) {
              next(from.query.redirect);
            } else {
              next(result.redirect);
            }
          }
        } else {
          next();
        }
      }
    }
  } else {
    next();
  }
});

export default router;
