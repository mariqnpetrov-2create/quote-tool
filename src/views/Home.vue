<template>
	<intro></intro>
</template>

<script>
import Intro from '@/components/Intro.vue';
import Login from '@/views/Login.vue';

export default {

  name: 'home',

  data () {
    return {

    }
  },
  components: {
  	Intro,
  	Login
  }
}
</script>

<style lang="css" scoped>

</style>
