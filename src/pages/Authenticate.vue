<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card :style="$q.screen.xs ? { width: '80%' } : { width: '20%' }">
          <q-card-section class="bg-primary text-white">
            <div
              class="text-h6"
              style="text-align: center"
            >
              ADMIN
            </div>
          </q-card-section>
          <component
            :is="loginOrRegister"
            @setRegister="isRegister = $event"
            @logged="redirectToHome"
          />
        </q-card>
        <q-page-sticky
          position="bottom-right"
          :offset="[18, 18]"
        >
          <Locales direction="up" />
        </q-page-sticky>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import RegisterUser from 'src/components/RegisterUser';
import LoginUser from 'src/components/LoginUser';
import Locales from 'src/components/Locales';
export default {
  components: {
    RegisterUser,
    LoginUser,
    Locales
  },
  data () {
    return {
      isRegister: false
    };
  },
  computed: {
    loginOrRegister () {
      return this.isRegister ? 'RegisterUser' : 'LoginUser';
    }
  },
  methods: {
    redirectToHome () {
      this.$q.loading.hide();
      this.$router.push('/');
    }
  }
};
</script>

<style>

</style>
