<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <form @submit.prevent="handleSubmit">
          <div class="form-floating mb-3">
            <input class="form-control" type="text" name="fullname" v-model="fullname" placeholder="fullname" required />
            <label for="title" class="form-label">Full Name</label>
          </div>

          <div class="form-floating mb-3">
            <input class="form-control" type="text" name="email" v-model="email" placeholder="email" required />
            <label for="email" class="form-label">Email</label>
          </div>

          <div class="form-floating mb-3">
            <input class="form-control" type="date" name="dob" v-model="dob" placeholder="Date of Birth" required />
            <label for="dob" class="form-label">Date of Birth</label>
          </div>

          <div class="form-floating mb-3">
            <input class="form-control" type="text" name="nric" v-model="nric" placeholder="NRIC" required />
            <label for="nric" class="form-label">NRIC</label>
          </div>

          <div class="form-floating mb-3">
            <textarea class="form-control" name="note" v-model="note" placeholder="Note" required></textarea>
            <label for="note" class="form-label">Note</label>
          </div>

          <br>
          <button class="btn btn-outline-success float-end">Add Patient</button>
          <!-- <div v-if="error">
      {{ error }}
    </div> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import { db } from "../firebase/config"
import { addDoc, collection } from "firebase/firestore"


export default {
  setup() {
    //patient info const
    const fullname = ref("")
    const email = ref("")
    const dob = ref("")
    const nric = ref("")
    const note = ref("")

    const handleSubmit = async () => {
      const colRef = collection(db, "user")

      await addDoc(colRef, {
        fullname: fullname.value,
        email: email.value,
        dob: dob.value,
        nric: nric.value,
        note: note.value,
      })

      fullname.value = ""
      email.value = ""
      dob.value = ""
      nric.value = ""
      note.value = ""
    }

    return {
      handleSubmit,
      fullname,
      email,
      dob,
      nric,
      note,
    }
  }
}
</script>

<style>
</style>