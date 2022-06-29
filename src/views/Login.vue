<template>
  <div class="container">
    <div class="row">
      <div class="col"></div>
      <div class="col pt-5">
        <form @submit.prevent="handleSubmit">
          <h1 class="display-6 mb-3">Login</h1>

          <div class="form-floating mb-3">
            <input
              type="email"
              name="email"
              v-model="email"
              class="form-control"
              placeholder="name@example.com"
              required
            />
            <label for="email" class="form-label">Email</label>
          </div>

          <div class="form-floating mb-3">
            <input
              type="password"
              name="password"
              v-model="password"
              class="form-control"
              placeholder="Password"
              required
            />
            <label for="password" class="form-label">Password</label>
          </div>

          <button class="btn btn-primary float-end">Login</button>
          <button class="btn btn-outline-danger float-end me-1">Forgot Password?</button>
          <div v-if="error">
            <h6><small class="text-muted">{{ error }}</small></h6>
          </div>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import { useRouter } from "vue-router"

import useLogin from "../composables/useLogin"

export default {
  setup() {
    const email = ref("")
    const password = ref("")

    const { login, error } = useLogin()
    const router = useRouter()

    const handleSubmit = async () => {
      await login(email.value, password.value)

      if (!error.value) {
        router.push("/")
      }
    }

    return { email, password, handleSubmit, error }
  }
}
</script>