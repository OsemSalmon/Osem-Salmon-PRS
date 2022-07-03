<template>
<form @submit.prevent="handleSubmit">
    <div class="form-floating mb-3">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
        <label for="floatingPassword">Password</label>
    </div>

    <div class="form-floating mb-3">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="passwordRepeat">
        <label for="floatingPassword">Repeat Password</label>
        <div class="form-text">Security-sensitive actions may require user to re-login before updating.</div>
    </div>
    <div v-if="error">
            <h6><small class="text-muted">{{ error }}</small></h6>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button class="btn btn-primary">Update</button>
    </div>    
</form>
  

</template>

<script>
import { getAuth, updatePassword } from '@firebase/auth'
import { ref } from 'vue'

export default {
    setup() {

        const auth = getAuth()

        const user = auth.currentUser
        const error = ref(null)

        const password = ref("")
        const passwordRepeat = ref("")

        const handleSubmit = async () => {
            try {
                if (password.value == passwordRepeat.value) 
                {
                    await updatePassword(user, password.value)
                    password.value = ""
                    passwordRepeat.value = ""
                    alert("Passwords updated")
                } 
            
                else if (password.value != passwordRepeat.value) 
                {
                    alert("Passwords no match")
                }
            } 
            
            catch (err) 
            {
                error.value = err.message
            }
            
        }

        

        return {
            handleSubmit,
            password,
            passwordRepeat,
            error
        }
    }
}
</script>

<style>

</style>