<template>
  <div class="home">
    <ul>
      <li v-for="user in user" :key="user.id">
        <div class="details">
          <h3  @click="handleDelete(user)"> {{ user.fullname }}</h3>
          <p>{{ user.email }}</p>
        </div>
        <div :class="{ icon: true, admin: user.isadmin }" @click="handleUpdate(user)">
          <span class="material-icons">verified_user</span>
        </div>
      </li>
    </ul>
    <CreateUserForm />
  </div>
</template>

<script>
import CreateUserForm from '@/components/CreateUserForm'
import getCollection from '../composables/getCollection'

import { db } from '../firebase/config'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'

export default {
  name: 'Home',
  components: { CreateUserForm },
  setup() {
    //get user info from collection
    const { documents: user } = getCollection('user')
    
    //delete user from collection
    const handleDelete = (user) => {
      const docRef = doc(db, 'user', user.id)

      deleteDoc(docRef)
    }

    //update user info
    const handleUpdate = (user) => {
      const docRef = doc(db, 'user', user.id)

      updateDoc(docRef, { isadmin: !user.isadmin })
    }

    return { user, handleDelete, handleUpdate }
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

.icon.admin {
  color: greenyellow;
}
</style>