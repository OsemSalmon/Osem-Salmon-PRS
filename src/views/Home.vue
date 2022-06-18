<template>
  <div class="home">
    <ul>
      <li v-for="user in user" :key="user.id">
        <div class="details">
          <h3>{{ user.fullname }}</h3>
          <p>{{ user.email }}</p>
        </div>
        <div class="icon">
          <span class="material-icons">favorite</span>
        </div>
      </li>
    </ul>
    <CreateUserForm />
  </div>
</template>

<script>
import CreateUserForm from '@/components/CreateUserForm'
import getCollection from '../composables/getCollection'

export default {
  name: 'Home',
  components: { CreateUserForm },
  setup() {
    const { documents: user } = getCollection('user')
    
    return { user }
  }
}
</script>

<style>
.home ul {
  padding: 0;
}
.home li {
  list-style-type: none;
  background: #fff;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
}
.home li .details {
  margin-right: auto;
}
.home li h3 {
  margin: 0;
  margin-bottom: 4px;
}
.home li h3:hover {
  cursor: pointer;
  text-decoration: line-through;
}
.home li p {
  margin: 0;
}
.icon {
  color: #bbbbbb;
  cursor: pointer;
}
</style>