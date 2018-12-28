import store from '@/store';

const isUserLoggedIn = () => {
  let result = {
    passed: true,
    redirect: { name: 'login' }
  };

  if ( !store.getters.isLogged ) {
    result.passed = false;
  }

  return result;
}

export default isUserLoggedIn;
