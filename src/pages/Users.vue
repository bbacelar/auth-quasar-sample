<template>
  <q-page padding>
    <q-table
      :title="$t('users')"
      :data="users"
      :columns="columns"
      row-key="id"
    />
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      users: [],
      columns: [
        { name: 'id', required: true, label: 'Id', align: 'left', field: 'id' },
        { name: 'name', align: 'left', label: this.$t('name'), field: 'name', sortable: true },
        { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
        { name: 'created_on', align: 'left', label: this.$t('created_on'), field: 'created_on' }
      ]
    };
  },
  async mounted () {
    const result = await this.$axios.get('/users');
    this.users = result.data;
  }
};
</script>

<style>

</style>
