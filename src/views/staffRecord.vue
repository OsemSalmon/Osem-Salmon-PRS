<template>
<div class="container-fluid">
<table class="table table-striped table-hover table-bordered mt-3">
    <thead>
        <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">User ID</th>
            <th scope="col">Contact</th>
            <th scope="col">Address</th>
            <th scope="col">Approved</th>
        </tr>
    </thead>

    <tbody class="table-group-divider">
        <tr v-for="staff in staff" :key="staff.uid">
            <td>{{ staff.fullname }}</td>
            <td>{{ staff.email }}</td>
            <td>{{ staff.uid }}</td>
            <td>{{ staff.pNumber }}</td>
            <td>{{ staff.address }}</td>
            <td>
                <button class="btn btn-outline-white" :class="{ i:true, fav: staff.isApproved }" @click="handleUpdate(staff)">
                    <i class="bi bi-check-square"></i>
                </button>        
            </td>
        </tr>
    </tbody>
</table>
</div>
</template>

<script>
import getCollection from "../composables/getCollection"
import getUserAuth from "../composables/getUserAuth"

import { db } from "../firebase/config"
import { doc, updateDoc } from "firebase/firestore"

export default {
    setup() {
        const { userAuth } = getUserAuth()

        const { documents: staff } = getCollection("staff")

        const handleUpdate = (staff) => {
            const docRef = doc(db, "staff", staff.id)

            updateDoc(docRef, {
                isApproved: !staff.isApproved
            })
        }

        //return
        return { staff, userAuth, handleUpdate }
    }
}
</script>

<style>
.i {
    color: red;
    cursor: pointer;
}
.i.fav {
    color: #198754;
}
</style>