<template>
  <div class="container border rounded-3 mt-4 " v-for="staff in staff" :key="staff.id">
    <div class="row mt-3">
      <div class="col">
        <h1 class="display-6">Profile</h1>
      </div>
      <div class="col"></div>
      <div class="col"></div>
    </div>
    <hr />
    <div class="row">
      <div class="col-3">
        <img src="https://via.placeholder.com/150" class="img-fluid" alt="">
      </div>
      <div class="col">
        
            <div class="mb-3">
                <label class="form-label">User ID</label>
                <input type="text" class="form-control" v-model="staff.uid" disabled>
            </div>

            <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="text" class="form-control" v-model="staff.email" disabled>
                <div class="form-text">You are not allowed to change these values.</div>
            </div>
        <hr/>
        <form @submit.prevent="handleUpdate(staff)">
            <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" v-model="staff.fullname">
            </div>

            <div class="mb-3">
                <label class="form-label">Contact Number</label>
                <input type="text" class="form-control" v-model="staff.pNumber">
            </div>

            <div class="mb-3">
                <label class="form-label">Address</label>
                <input type="text" class="form-control" v-model="staff.address">
            </div>

            <div class="mb-3 float-end">
                <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
                Change Password
                </button>
                <button class="btn btn-primary ms-1">Update</button>
            </div>
        </form>
      </div>
      <div class="col-3">
        <div class="mb-3">
            <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Change Password</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <editUserPassword/>
                    </div>
                    </div>
                </div>
            </div>
        </div>         
      </div>
    </div>
  </div>
</template>


<script>
import { db } from "../firebase/config"
import { doc, updateDoc } from "firebase/firestore"

import getCollection from "../composables/getCollection"
import getUserAuth from "../composables/getUserAuth"
import editUserPassword from "../components/editUserPassword.vue"

export default {
    setup() {
        const { userAuth } = getUserAuth()
        const { documents: staff } = getCollection("staff", ["uid", "==", userAuth.value.uid])
        const handleUpdate = (staff) => {
            const docRef = doc(db, "staff", staff.id)
            updateDoc(docRef, {
                fullname: staff.fullname,
                pNumber: staff.pNumber,
                address: staff.address
            });
            alert("Profile updated")
        }
        return {
            staff,
            userAuth,
            handleUpdate
        }
    },
    components: { editUserPassword }
}
</script>

<style>
</style>