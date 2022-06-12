<template>
  <h1>add patient</h1>
  <form @submit.prevent="onSubmit">
    <input type="text" placeholder="Name" v-model="patient_form.name">
    <input type="text" placeholder="NRIC" v-model="patient_form.nric">
    <button type="submit">Add</button>
  </form>
</template>

<script>
import { createUser } from '@/firebase'
import { reactive } from 'vue'

export default {
    setup() {
        const patient_form = reactive({name: '', nric: ''})

        const onSubmit = async () => {
            await createUser({...patient_form})
            patient_form.name = ''
            patient_form.nric = ''
        }

        return {
            patient_form, onSubmit
        }
    }
}
</script>

<style>

</style>