<template>

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <editPatientDetails />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>

    <ul class="list-group">
        <li class="list-group-item list-group-item-dark" v-for="user in user" :key="user.id">
            <div class="details">
                <span class="fs-2 fw-bold">{{ user.fullname }}</span> 
                <span class="fs-3 fw-light ms-3">{{ user.nric }}</span>
                <br>
                <span class="fs-4 fw-light">{{ user.dob }}</span> 
                <span class="fs-4 fw-light ms-3">{{ user.email }}</span>
                
            </div>
        </li>
    </ul>

    <div class="accordion mt-1 mb-1">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Add Record
            </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse container" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div class="accordion-body">
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
                            <textarea class="form-control" name="docNote" v-model="docNote" placeholder="Note" required></textarea>
                            <label for="docNote" class="form-label">Note</label>
                        </div>
                        
                        
                        <div class="form-floating mb-3">
                            <button class="btn btn-outline-success">Add Record</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>

    <ul class="list-group">
        <li class="list-group-item list-group-item-light" v-for="visit in visit" :key="visit.id">
            <div class="details">
                <span class="fw-semibold">Date:</span> <span class="fw-light">{{ visit.date }}</span>
                <br>
                <span class="fw-semibold">Note:</span> <span class="fw-light">{{ visit.docNote }}</span>
                <br>
                <span class="fw-semibold">Doctor:</span> <span class="fw-light">{{ visit.docName }}</span>
            </div>
        </li>
    </ul>
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

        var currentDoc = userAuth.value.email

        const date = ref('')
        const docNote = ref('')
        const docName = ref('')
        const nric = ref('')

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
                docName: currentDoc,
                docNote: docNote.value,
                nric: patientNRIC
            })

            date.value = ''
            docName.value = ''
            docNote.value = ''
            nric.value = ''
        }

        return { 
            visit,
            user,
            handleSubmit,
            userAuth,
            date,
            docName,
            docNote,
            nric 
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