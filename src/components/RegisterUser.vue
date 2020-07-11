<template>
  <q-form
    ref="form"
    @submit="sendForm"
  >
    <q-card-section>
      <q-input
        v-model="form.name"
        :label="$t('name')"
        :rules="[requiredRule]"
      >
        <template v-slot:prepend>
          <q-icon name="fas fa-user" />
        </template>
      </q-input>
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
      <q-input
        v-model="form.password2"
        :label="$t('auth.confirm_pwd')"
        :type="isPwd ? 'password' : 'text'"
        :rules="[requiredRule, val => val === form.password || $t('validation.pwd_not_match')]"
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
        type="submit"
      >
        {{ $t('auth.register') }}
      </q-btn>
      <q-btn
        color="negative"
        @click="$emit('setRegister',false)"
      >
        {{ $t('cancel') }}
      </q-btn>
    </q-card-actions>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'RegisterUser',
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password2: ''
      },
      isPwd: true
    };
  },
  methods: {
    ...mapActions('auth', ['register']),
    async sendForm () {
      this.$q.loading.show();
      try {
        await this.register(this.form);
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
