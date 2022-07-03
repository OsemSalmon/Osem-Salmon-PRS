<template>
  <ul class="list-group">
        <li class="list-group-item" v-for="user in user" :key="user.id">
            <div class="details">
                <span class="fs-2 fw-bold">{{ user.fullname }}</span> 
                <span class="fs-3 fw-light ms-3">{{ user.nric }}</span>
                <br>
                <span class="fs-4 fw-light">{{ user.dob }}</span> 
                <span class="fs-4 fw-light ms-3">{{ user.email }}</span>
            </div>
            <form @submit.prevent="handleUpdate(user)" class="mt-3">
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="placeholder" placeholder="placeholder" v-model="user.fullname">
                <label for="floatingInput">Full Name</label>
              </div>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="placeholder" placeholder="placeholder" v-model="user.nric" disabled>
                <label for="floatingPassword">NRIC</label>
              </div>
              <div class="form-floating mb-3">
                <input type="date" class="form-control" id="placeholder" placeholder="placeholder" v-model="user.dob">
                <label for="floatingPassword">Date of Birth</label>
              </div>
              <div class="form-floating mb-3">
                <input type="text" class="form-control" id="placeholder" placeholder="placeholder" v-model="user.email">
                <label for="floatingPassword">email</label>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button class="btn btn-primary">Done</button>
              </div>
            </form>
        </li>
    </ul>
</template>

<script>
var patientNRIC = window.location.pathname.split("/").pop()

import { db } from "../firebase/config"
import { doc, updateDoc } from "firebase/firestore"
import getCollection from "../composables/getCollection"

export default {
  setup() {
    const { documents: user } = getCollection("user", [
      "nric",
      "==",
      patientNRIC,
    ])

    const handleUpdate = (user) => {
      const docRef = doc(db, 'user', user.id)

      updateDoc(docRef, {
        fullname: user.fullname,
        dob: user.dob,
        email: user.email,
      })
    }

    return {
      user, handleUpdate
    }
  }
}
</script>

<style>
</style>