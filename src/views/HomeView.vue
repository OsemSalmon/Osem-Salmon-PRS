<template>
  <UserCreate />
  <UserList />
</template>

<script>
import UserCreate from '@/components/UserCreate.vue'
import UserList from '@/components/UserList.vue'

export default {
  name: 'TableView',
  components: { UserCreate, UserList }
}
</script>

