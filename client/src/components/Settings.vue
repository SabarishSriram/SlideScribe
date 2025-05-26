<template>
  <div class="max-w-screen justify-center items-center p-7">
    <div
      class="min-w-full shadow-xl rounded-lg border border-slate-600 bg-[#0F172A]"
    >
      <div class="p-6 border-b border-slate-600">
        <h2 class="text-2xl text-[#fb444f] font-semibold">Settings</h2>
        <p class="text-white">Manage your account settings!</p>
      </div>
      <form @submit.prevent="" novalidate>
        <div class="p-6 grid gap-6">
          <div>
            <label class="block text-sm font-medium text-white"
              >Profile Picture</label
            >
            <img
              :src="user.image"
              alt="Profile"
              class="mt-3 rounded-sm w-24 h-24 object-cover"
            />
          </div>

          <div class="flex flex-col space-y-1.5">
            <label for="name" class="text-sm font-medium text-white"
              >Full Name</label
            >
            <input
              id="name"
              v-model="user.name"
              type="text"
              placeholder="Full Name"
              class=" rounded-md bg-black text-white p-2"
            />
            <!-- <p class="text-red-500 text-sm">{{ errors.name }}</p> -->
          </div>

          <div class="flex flex-col space-y-1.5">
            <label class="text-sm font-medium text-white">Email</label>
            <input
              type="email"
              :value="user.email"
              disabled
              class="rounded-md p-2 bg-black text-slate-400"
            />
          </div>

          <button
            type="submit"
            class="px-10 py-2 bg-[#fb444f] text-white rounded-md mt-5"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { Settings } from "lucide-vue-next";
import { onMounted, reactive } from "vue";

const user = reactive({ name: "", email: "", image: "" });

onMounted(async () => {
  const res = await fetch("http://localhost:4000/api/auth/profile", {
    credentials: "include",
  });
  const data = await res.json();
  console.log(data);
  user.name = data.name;
  user.email = data.email;
  user.image = data.image;
});
</script>

