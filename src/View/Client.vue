<template>
    <div class="container">
      <h1>Course Registration Form</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="nin">NIN:</label>
          <input 
            id="nin" 
            type="text" 
            v-model="form.nin" 
            @input="validateNIN" 
            placeholder="Enter your NIN" 
          />
          <small v-if="errors.nin" class="error">{{ errors.nin }}</small>
        </div>
        <div class="form-group">
          <label for="firstName">First Name:</label>
          <input id="firstName" type="text" v-model="form.first_name" required />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name:</label>
          <input id="lastName" type="text" v-model="form.last_name" required />
        </div>
        <div class="form-group">
          <label for="school">School:</label>
          <input id="school" type="text" v-model="form.school" required />
        </div>
        <div class="form-group">
          <label for="address">Address:</label>
          <textarea id="address" v-model="form.address" required style="resize: none; padding: 0.8rem;" rows="5"></textarea>
        </div>
        <div class="form-group">
          <label for="course">Course:</label>
          <select id="course" class="form-select" v-model="form.course" required>
        <option value="BLP">BLP</option>
        <option value="Photography/Video Editing">Photography/Video Editing</option>
        <option value="Graphic Design/UI-UX">Graphic Design/UI-UX</option>
        <option value="Web Design">Web Design</option>
      </select>
        </div>
        <div class="form-group">
          <label for="age">Age:</label>
          <select id="age" class="form-select" v-model="form.age" required>
        <option value="18-25">18-25</option>
        <option value="26-35">26-35</option>
        <option value="36-45">36-45</option>
      </select>
        </div>
        <button type="submit" :disabled="isFormInvalid">Submit</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive, computed, ref } from 'vue';
  import axios from 'axios';
  
  // API URL
  const API_URL = 'https://infracredit2.pythonanywhere.com/api/v1/biodata/';
  
  // Reactive form data and errors
  const form = reactive({
    nin: '',
    first_name: '',
    last_name: '',
    school: '',
    address: '',
    course: '',
    age: '',
  });
  
  const errors = reactive({
    nin: null,
  });
  
  // NIN validation logic
  const validateNIN = () => {
    const ninRegex = /^[0-9]{11,}$/; // Ensure NIN is numeric and at least 11 characters
    if (!form.nin) {
      errors.nin = 'NIN is required.';
    } else if (!ninRegex.test(form.nin)) {
      errors.nin = 'NIN must be at least 11 digits and numeric only.';
    } else {
      errors.nin = null; // No errors
    }
  };
  
  // Check if the form is valid
  const isFormInvalid = computed(() => {
    validateNIN();
    return !!errors.nin;
  });
  
  // Handle form submission (POST request)
  const handleSubmit = async () => {
    validateNIN();
    if (!errors.nin) {
      try {
        const response = await axios.post(API_URL, form);
        console.log('Response:', response.status);
        if(response.status==201){
          alert('Form submitted successfully!');
          form.nin= '',
          form.first_name= '',
          form.last_name= '',
          form.school= '',
          form.address= '',
          form.course= '',
          form.age= ''
        }
        console.log(response)
      } catch (error) {
        alert(error.response.data.error);
      }
    } else {
      alert('Please fix the errors before submitting.');
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
  
  .form-select{
    height: 40px;
    border-radius: 4px;
  }
  
  textarea{
    border-radius: 4px;
  }
  </style>
  