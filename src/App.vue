<template>
  <div id="root" class="wrapper">
    <Header></Header>

    <div class="main">
      <router-view></router-view>
    </div><!-- /.main -->

    <Footer></Footer>
  </div><!-- /#root -->
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'app',

  data () {
    return {

    }
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="css" scoped>
.main { padding: 50px 0; }

.wrapper { position: relative; min-height: 100vh; padding-bottom: 80px; }
</style>
