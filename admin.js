import { auth, signInWithEmailAndPassword,sendPasswordResetEmail } from "./firebase.config.js";

const form = document.getElementById('login-form');
form.addEventListener('submit', login);

function login(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const message=document.getElementById('name');

  // Perform server-side validation
  // ...

  // Simulate successful login for demonstration purposes
  if (username === 'admin' && password === 'admin123') {
    message.innerText=`Login Successful`;
    window.location.href = 'admin.html';
  } else {
    alert('Invalid login credentials');
  }
}