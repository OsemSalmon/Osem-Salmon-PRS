<template>
<div class="container-fluid">
  
  <div class="row">
    
    <div class="m-3">
      <button type="button" class="btn btn-primary float-end me-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      <i class="bi bi-plus-square"></i>
      </button>
      <div v-for="staff in staff" :key="staff.id">
        <form @submit.prevent="handleUpdate(staff)">
        <button class="btn btn-outline-dark float-end me-3"><i class="bi bi-arrow-repeat"></i></button>
        </form>
      </div>
      
    </div>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">New Patient Registration</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <CreateUserForm/>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div class="row">
    
    <table class="table table-striped table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">NRIC</th>
          <th scope="col">Email</th>
          <th scope="col">Contact</th>
          <th scope="col">Address</th>
          <th scope="col" colspan="2">Action</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="user in user" :key="user.id">
        <td>{{ user.fullname }}</td>
        <td>{{ user.nric }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.contact }}</td>
        <td>{{ user.address }}</td>
        <td>
          <router-link :to="`/patientRecord/${user.nric}`" style="color: black">
            <i id="editUser" class="bi bi-pencil-square"></i>
          </router-link>
        </td>
        <td><i id="deleteUser" class="bi bi-person-dash-fill" @click="handleDelete(user)"></i></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<div v-for="staff in staff" :key="staff.id">
<div v-if="!staff.isApproved">
<head>
  <meta http-equiv = "refresh" content = "0; url = /accessDenied" />
</head>
</div>
</div>

</template>

<script>
import CreateUserForm from "@/components/CreateUserForm"
import getCollection from "../composables/getCollection"
import getUserAuth from "../composables/getUserAuth"

import { db } from "../firebase/config"
import { doc, deleteDoc, updateDoc } from "firebase/firestore"

export default {
  name: "Home",
  components: { CreateUserForm },
  setup() {

    const { userAuth } = getUserAuth()
    //get user info from collection
    const { documents: user } = getCollection("user")

    const { documents: staff } = getCollection("staff",
    ['email', '==', userAuth.value.email])

    //delete user from collection
    const handleDelete = (user) => {
      const docRef = doc(db, "user", user.id)

      deleteDoc(docRef)
    }

    //update user info
    const handleUpdate = (staff) => {
      const docRef = doc(db, "staff", staff.id)
      updateDoc(docRef, {
        uid: userAuth.value.uid
      })
    }

    return { user, handleDelete, userAuth, staff, handleUpdate }
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