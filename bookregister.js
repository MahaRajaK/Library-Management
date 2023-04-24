import {
  auth,
  db,
  createUserWithEmailAndPassword,
  doc,
  setDoc,
  updateProfile,
  sendEmailVerification,
} from "./firebase.config.js";

const signUpForm = document.querySelector("#signup-form");
const messageElement = document.querySelector("#success-message");
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let reg = document.getElementById("reg").value;
  let number = document.getElementById("number").value;
  let password = document.getElementById("password").value;

  if (email === "admin@gmail.com" && password === "LibAdmin*") {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      location.href = "/admin.html";
    } catch (error) {
      console.log(error);
    }
    return;
  }
  

  try {
    await createUserWithEmailAndPassword(auth, email, password);

    const user = auth.currentUser;

    await setDoc(doc(db, "users", user.uid), {
      email,
      reg,
      number,
    });

    await updateProfile(user, {
      displayName: reg,
      photoURL: "https://cdn-icons-png.flaticon.com/512/3177/3177440.png",
    });

    document.querySelector("#registerForm").style.display = "none";
    document.querySelector("#emailbox").style.display = "block";

    await sendEmailVerification(auth.currentUser);
    console.log("Email Sent");

    const checkEmailVerify = (() => {
      console.log(auth.currentUser.emailVerified);
      if (auth.currentUser.emailVerified) {
        clearInterval(checkEmailVerify);
        location.href = "/bookhome.html";
      }
    }, 4000);

  } catch (error) {
    console.log(error);
  }
});
