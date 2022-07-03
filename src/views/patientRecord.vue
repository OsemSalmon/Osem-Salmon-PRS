<template>
<div class="container-fluid">
    <div class="row">
        <div>
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">NRIC</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Address</th>
                        <th scope="col">Note</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="user in user" :key="user.id">
                    <td>{{ user.fullname }}</td>
                    <td>{{ user.nric }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.contact }}</td>
                    <td>{{ user.address }}</td>
                    <td>{{ user.note }}</td>
                    <td>
                    <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <i class="bi bi-pencil-square"></i>
                    </button>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="row">
        <div>
        <table class="table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Doctor</th>
                    <th scope="col">Illness</th>
                    <th scope="col">Ailment(s)</th>
                    <th scope="col">Remarks</th>
                    <th>
                    <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
                    <i class="bi bi-plus-square"></i>
                    </button>
                    </th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="visit in visit" :key="visit.id">
                <td>{{ visit.date }}</td>
                <td>{{ visit.docName }}</td>
                <td>{{ visit.illness }}</td>
                <td>{{ visit.ailment }}</td>
                <td>{{ visit.remarks }}</td>
                <td></td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</div>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Edit Patient Details</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <editPatientDetails />
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="staticBackdrop2" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">New Visitation Record</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="handleSubmit">
            <div class="form-floating mb-3">
                <input class="form-control" type="date" name="date" v-model="date" placeholder="date" required />
                <label for="date" class="form-label">Date</label>
            </div>

            <div class="form-floating mb-3">
                <input class="form-control" type="text" name="docName" v-model="userAuth.email" required readonly />
                <label for="docName" class="form-label">Doctor</label>
            </div>

            <div class="form-floating mb-3">
                <input class="form-control" type="text" name="illness" v-model="illness" placeholder="Illness" required />
                <label for="illness" class="form-label">Illness</label>
            </div>

            <div class="form-floating mb-3">
                <input class="form-control" type="text" name="ailment" v-model="ailment" placeholder="Ailment" required />
                <label for="ailment" class="form-label">Ailment(s)</label>
            </div>

            <div class="form-floating mb-3">
                <textarea class="form-control" name="remarks" v-model="remarks" placeholder="remarks" required></textarea>
                <label for="remarks" class="form-label">Remarks</label>
            </div>
            
            
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button class="btn btn-primary">Add New Record</button>
            </div>
        </form>
      </div>
      
    </div>
  </div>
</div>

</template>

<script>
var patientNRIC = window.location.pathname.split("/").pop()

import getCollection from "../composables/getCollection"
import getUserAuth from '../composables/getUserAuth'
import editPatientDetails from "@/components/editPatientDetails"

import { db } from "../firebase/config"
import { addDoc, collection } from "firebase/firestore"
import { ref } from "vue"

export default {
    name: 'patientRecord',
    components: { editPatientDetails },
    setup() {
        const { userAuth } = getUserAuth()

        const date = ref('')
        const remarks = ref('')
        const docName = ref('')
        const nric = ref('')
        const illness = ref('')
        const ailment = ref('')

        const { documents: visit } = getCollection(
            'visit',
            ['nric', '==', patientNRIC]
            )

        const { documents: user } = getCollection(
            'user',
            ['nric', '==', patientNRIC]
            )

        const handleSubmit = async () => {
            const colRef = collection(db, 'visit')

            await addDoc(colRef, {
                date: date.value,
                docName: userAuth.value.email,
                remarks: remarks.value,
                nric: patientNRIC,
                illness: illness.value,
                ailment: ailment.value,
            })

            date.value = ''
            docName.value = ''
            remarks.value = ''
            nric.value = ''
            illness.value = ''
            ailment.value = ''
        }

        return { 
            visit,
            user,
            handleSubmit,
            userAuth,
            date,
            docName,
            remarks,
            nric,
            illness,
            ailment,
        }
    },

    mounted() {
        if (localStorage.getItem('reloaded')) {
            // The page was just reloaded. Clear the value from local storage
            // so that it will reload the next time this page is visited.
            localStorage.removeItem('reloaded');
        } else {
            // Set a flag so that we know not to reload the page twice.
            localStorage.setItem('reloaded', '1');
            location.reload();
        }
    }
}


</script>

<style>
</style>