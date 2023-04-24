import { auth, signInWithEmailAndPassword,sendPasswordResetEmail } from "./firebase.config.js";

const username = document.getElementById("username");
const password = document.getElementById("password");
// const forgotPassword = document.getElementById("forgotPassword");

if (username.value === 'admin@gmail.com' && password.value === 'Lib*Admin') {
  windows.location.href = "admin.html";
  
}


document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form accept");
  // const auth = getAuth();

  signInWithEmailAndPassword(auth, username.value, password.value)
    .then(() => (location.href = "bookhome.html"))
    .catch((error) => alert(error))
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log("output error: ",errorCode,errorMessage)
      alert("Entered wrong credentials!!");
      loginForm.reset();
    });
});
document.getElementById("forgotPassword").addEventListener("click", (e) => {
  e.preventDefault();
  sendPasswordResetEmail(auth, username.value)
  .then(() => {
    alert("Password reset email sent. Please check your email.");
    console.log("Password reset email sent");
    // Prompt user to reset their password in the email
    const newPassword = prompt("Please check your email and enter the new password you created.");
    // Log in with the new password to confirm that it works
    auth.signInWithEmailAndPassword(username.value, newPassword)
      .then(() => {
        alert("Your password has been reset successfully.");
        window.location.href = "bookhome.html"; // redirect to bookhome page
      })
      .catch((error) => {
        alert(error.message);
      });
  })
    .catch((error) => {
      // Handle errors here, e.g. show an error message to the user.
      console.error(error.code, error.message);
    });
});



// document.getElementById("forgotPassword").addEventListener("click", (e) => {
//   e.preventDefault();
//   sendPasswordResetEmail(auth, username.value)
//     .then(() => {
//       alert("Password reset email sent. Please check your email.");
//       console.log("Password reset email sent");
//       auth.onAuthStateChanged((user) => {
//         if (user) {
//           alert("Your password has been reset successfully.");
//           window.location.href = "bookhome.html"; // redirect to bookhome page
//         }
//       });
//     })
//     .catch((error) => {
//       alert(error.message);
//     });
// });
