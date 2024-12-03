<template>
  <div class="container">
    <h1>Login Form</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          id="username"
          type="text"
          v-model="form.username"
          placeholder="Enter your username"
          required
        />
        <small v-if="errors.username" class="error">{{
          errors.username
        }}</small>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          v-model="form.password"
          placeholder="Enter your password"
          required
        />
        <small v-if="errors.password" class="error">{{
          errors.password
        }}</small>
      </div>
      <button type="submit">Login</button>
    </form>
    <div v-if="loginMessage" class="message">{{ loginMessage }}</div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";

const API_URL = "https://infracredit2.pythonanywhere.com/api/v1/export-csv";

// Predefined username and password
const acceptedUsername = "codeware";
const acceptedPassword = "Simple@123";

// Reactive form data and errors
const form = reactive({
  username: "",
  password: "",
});

const errors = reactive({
  username: null,
  password: null,
});

const loginMessage = ref(null);

// Validate user input
const validateForm = () => {
  errors.username = !form.username ? "Username is required." : null;
  errors.password = !form.password ? "Password is required." : null;
};

// Handle login logic
const handleLogin = async () => {
  validateForm();

  if (!errors.username && !errors.password) {
    if (
      form.username === acceptedUsername &&
      form.password === acceptedPassword
    ) {
      loginMessage.value = "File Download in Progress";
      alert("Welcome!");
      // Create a temporary anchor element to trigger download
      const link = document.createElement("a");
      link.href = API_URL;
      link.download = "registeredData.csv"; // Name of the downloaded file
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert("File downloaded successfully!");
      loginMessage.value = " ";
    } else {
      loginMessage.value = "Invalid username or password. Please try again.";
      alert("Login failed!");
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
}

h1 {
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s ease-in-out;
}

input:focus {
  outline: none;
  border-color: #007bff;
}

.error {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.3rem;
}

button {
  padding: 0.8rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}

pre {
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
}

.form-select {
  height: 40px;
  border-radius: 4px;
}

textarea {
  border-radius: 4px;
}
</style>
