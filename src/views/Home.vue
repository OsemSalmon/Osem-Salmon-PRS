<template>
  <div class="home">
    <div class="accordion mb-2 mt-2" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Add New Patient
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <CreateUserForm />
          </div>
        </div>
      </div>
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="user in user" :key="user.id">
        <div class="details">
          <span class="fs-3" @click="handleUpdate(user)">{{ user.fullname }}</span>
          <span class="ms-3">{{ user.nric }}</span>
          <br>
          <span>{{ user.dob }}</span>
          <span class="ms-3">{{ user.email }}</span>
          <br>
          <span>{{ user.note }}</span>
        </div>
        <div class="d-flex justify-content-end">
          <router-link :to="`/patientRecord/${user.nric}`" style="color: black">
            <span class="material-icons text-end" id="editUser">edit_note</span>
          </router-link>

          <div class="icon" @click="handleDelete(user)">
            <span class="material-icons text-end" id="deleteUser">delete</span>
          </div>
        </div>
        
      </li>
    </ul>
  </div>
</template>

<script>
import CreateUserForm from "@/components/CreateUserForm"
import getCollection from "../composables/getCollection"

import { db } from "../firebase/config"
import { doc, deleteDoc, updateDoc } from "firebase/firestore"

export default {
  name: "Home",
  components: { CreateUserForm },
  setup() {
    //get user info from collection
    const { documents: user } = getCollection("user")

    //delete user from collection
    const handleDelete = (user) => {
      const docRef = doc(db, "user", user.id)

      deleteDoc(docRef)
    }

    //update user info

    return { user, handleDelete }
  }
}
</script>

<style>
/* .home ul {
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

.home li p {
  margin: 0;
}

.icon {
  color: black;
}
*/
#deleteUser:hover {
  color: red;
}

#editUser:hover {
  color: blue;
} 
</style>