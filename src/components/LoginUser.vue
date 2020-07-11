<template>
  <q-form
    ref="form"
    @submit="sendForm"
  >
    <q-card-section>
      <q-input
        v-model="form.email"
        label="Email"
        :rules="[requiredRule]"
      >
        <template v-slot:prepend>
          <q-icon name="fas fa-envelope" />
        </template>
      </q-input>
      <q-input
        v-model="form.password"
        :label="$t('auth.password')"
        :type="isPwd ? 'password' : 'text'"
        :rules="[requiredRule]"
      >
        <template v-slot:prepend>
          <q-icon name="fas fa-key" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'fas fa-eye-slash' : 'fas fa-eye'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn
        color="primary"
        class="full-width"
        type="submit"
      >
        {{ $t('auth.login') }}
      </q-btn>
      <div>
        <p
          class="text-subtitle2 Link"
          @click="$emit('setRegister',true)"
        >
          {{ $t('auth.register_account') }}
        </p>
      </div>
    </q-card-actions>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'LoginUser',
  data () {
    return {
      form: {
        email: '',
        password: ''

      },
      isPwd: true
    };
  },
  methods: {
    ...mapActions('auth', ['login']),
    async sendForm () {
      this.$q.loading.show();
      try {
        await this.login(this.form);
        this.$emit('logged');
      } catch (error) {
        this.$q.loading.hide();
      }
    },
    requiredRule (val) {
      return !!val || this.$t('validation.required');
    }
  }
};
</script>
<style scoped>
.Link {
  color: #2e88e2;
  cursor: pointer;
}
</style>
