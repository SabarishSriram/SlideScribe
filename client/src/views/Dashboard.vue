<template>
    <div class="text-white"v-if="user">
      <h2>Welcome, {{ user.name }}</h2>
      <p>Email: {{ user.email }}</p>
      <img :src="user.image" alt="User Avatar" />
    </div>
    <div v-else>
      <p>You need to log in to see your profile.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: null,  // To store the user profile data
      };
    },
    created() {
      this.fetchProfile();
    },
    methods: {
      async fetchProfile() {
        try {
          const response = await axios.get('http://localhost:4000/api/auth/profile', { withCredentials: true });
          this.user = response.data;  // Save user data if authenticated
          console.log(response.data)
        } catch (error) {
          console.log('Error fetching profile:', error.response.data);
          this.user = null;  // If not authenticated, set user to null
        }
      },
    },
  };
  </script>
  