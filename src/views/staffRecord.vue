<template>
<div class="table">
    <thead>
        <tr>
            <th scope="col">Email</th>
            <th scope="col">User ID</th>
            <th scope="col">Admin</th>
            <th scope="col">Approved</th>
        </tr>
    </thead>

    <tbody>
        <tr v-for="staff in staff" :key="staff.uid">
            <td>{{ staff.email }}</td>
            <td>{{ staff.uid }}</td>
            <td>{{ staff.isAdmin }}</td>
            <td>{{ staff.isApproved }}</td>
        </tr>
    </tbody>
</div>
</template>

<script>
import getCollection from "../composables/getCollection"

export default {
    setup() {
        const { documents: staff } = getCollection("staff")


        //return
        return { staff }
    }
}
</script>

<style>

</style>