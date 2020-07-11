<template>
  <q-fab
    :label="$t('locale.title')"
    external-label
    vertical-actions-align="right"
    :icon="icon"
    :direction="direction"
  >
    <q-fab-action
      label-position="left"
      icon="img:flags/pt-br.png"
      :label="$t('locale.ptbr')"
      external-label
      @click="set('pt-br')"
    />
    <q-fab-action
      label-position="left"
      icon="img:flags/en-us.png"
      :label="$t('locale.enus')"
      external-label
      @click="set('en-us')"
    />
  </q-fab>
</template>

<script>
export default {
  name: 'LocaleComponent',
  props: {
    direction: {
      type: String,
      default: 'down'
    }
  },
  computed: {
    locale () {
      return this.$i18n.locale;
    },
    icon () {
      return `img:flags/${this.locale}.png`;
    }
  },
  methods: {
    async set (locale) {
      this.$i18n.locale = locale;
      /* webpackInclude: /(pt-br|en-us)\.js$/ */
      const lang = await import('quasar/lang/' + locale);
      this.$q.lang.set(lang.default);
    }
  }
};
</script>
<style lang="scss">
.q-btn--fab .q-btn__wrapper {
  padding: 0;
  min-width: 35px;
  min-height: 35px;
  .q-fab__icon-holder,
  img {
    width: 35px;
    height: 35px;
  }
}
.q-btn--fab-mini .q-btn__wrapper {
  padding: 0;
  img {
    width: 40px;
    height: 40px;
  }
}
</style>
