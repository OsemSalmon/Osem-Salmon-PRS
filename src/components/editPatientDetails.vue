<template>
  <form @submit.prevent="handleUpdate(user)" class="mt-3" v-for="user in user" :key="user.id">
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
      <label for="floatingPassword">Email</label>
    </div>

    <div class="form-floating mb-3">
      <input class="form-control" type="text" name="contact" v-model="user.contact" placeholder="contact" required />
      <label for="nric" class="form-label">Contact</label>
    </div>

    <div class="form-floating mb-3">
      <textarea class="form-control" name="address" v-model="user.address" placeholder="address" required></textarea>
      <label for="note" class="form-label">Address</label>
    </div>

    <div class="form-floating mb-3">
      <textarea class="form-control" name="note" v-model="user.note" placeholder="Note" required></textarea>
      <label for="note" class="form-label">Note</label>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button class="btn btn-primary">Done</button>
    </div>
  </form>
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
        contact: user.contact,
        address: user.address,
        note: user.note,
      })

      alert("Patient details updated")
    }

    return {
      user, handleUpdate
    }
  }
}
</script>

<style>
</style>