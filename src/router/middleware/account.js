import store from '@/store';

const account = () => {
  let result = {
    passed: true,
    redirect: { name: 'home' }
  };

  if ( store.getters.isLogged ) {
    result.passed = false;
  }

  return result;
}

export default account;
