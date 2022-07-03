<template>
  <div class="container" v-for="staff in staff" :key="staff.id">
    <div class="row">
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
                <div class="form-text">You are not allowed to change this value.</div>
            </div>
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
                <button class="btn btn-primary float-end">Update</button>
            </div>
        </form>
      </div>
      <div class="col-3">
        <div class="mb-3">

            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Change Email
            </button>

            <button type="button" class="btn btn-secondary ms-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
            Change Password
            </button>


            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    email modal
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Understood</button>
                </div>
                </div>
            </div>
            </div>

            <div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        password modal
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Understood</button>
                    </div>
                    </div>
                </div>
            </div>


            <label for="exampleInputEmail1" class="form-label mt-3">Email Address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="staff.email" disabled>
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

export default {
    setup () {
        const { userAuth } = getUserAuth()

        const { documents: staff } = getCollection('staff', 
        ['uid', '==', userAuth.value.uid])

        const handleUpdate = (staff) => {
            const docRef = doc(db, 'staff', staff.id)
            updateDoc(docRef, {
                fullname: staff.fullname,
                pNumber: staff.pNumber,
            })
            alert('Profile updated')
        }

        return {
            staff, userAuth, handleUpdate
        }
    }
}
</script>

<style>
</style>