<template>
  <div class="max-w-screen justify-center items-center p-7">
    <div class="min-w-full shadow-xl rounded-lg border border-gray-200 bg-white">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-2xl font-semibold">Settings</h2>
        <p class="text-gray-600">Manage your account settings!</p>
      </div>
      <form @submit.prevent="" novalidate>
        <div class="p-6 grid gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Profile Picture</label>
            <img :src="user.image" alt="Profile" class="mt-3 rounded-sm w-24 h-24 object-cover" />
          </div>

          <div class="flex flex-col space-y-1.5">
            <label for="name" class="text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              v-model="user.name"
              type="text"
              placeholder="Full Name"
              class="border rounded-md p-2"
            />
            <p class="text-red-500 text-sm">{{ errors.name }}</p>
          </div>

          <div class="flex flex-col space-y-1.5">
            <label class="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              :value="user.email"
              disabled
              class="border rounded-md p-2 bg-gray-100"
            />
          </div>

          <button type="submit" class="px-10 py-2 bg-blue-600 text-white rounded-md mt-5">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Settings } from 'lucide-vue-next';
import { onMounted } from 'vue';

onMounted(async()=>{
    const res= await fetch("http://localhost:4000/api/auth/profile",{
        credentials:"include"
    })
    const user= await res.json();
    console.log(user)

})
</script>

<!-- <script setup>

import { reactive, ref } from 'vue'
import { z } from 'zod'

const props = defineProps({
  name: String,
  email: String,
  image: String
})

const form = reactive({
  name: props.name,
  email: props.email,
  image: props.image
})

const errors = reactive({
  name: ''
})

// Zod schema for validation (replica of settingsSchema)
const settingsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters")
})

const handleSubmit = () => {
  const result = settingsSchema.safeParse(form)

  if (!result.success) {
    errors.name = result.error.format().name?._errors?.[0] || ''
    return
  }

  // Simulate sending data (you can replace with axios or fetch)
  console.log("Submitting form", form)
  alert('Settings updated successfully!')
}
</script> -->
