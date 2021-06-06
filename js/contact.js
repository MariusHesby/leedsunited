// Selecting all the necessary elements
const form = document.querySelector("#contactForm");
const fullName = document.querySelector("#fullName");
const fullNameError = document.querySelector("#fullNameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
const messageSent = document.querySelector(".message");
const updateButton = document.querySelector("main button");
function validateForm(event) {
  // Prevent default form actions
  event.preventDefault();

  // Check full name
  if (checkLength(fullName.value, 6)) {
    fullNameError.style.display = "none";
  } else {
    fullNameError.style.display = "block";
  }

  // Check e-mail
  if (validateEmail(email.value)) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  // Check subject
  if (checkLength(subject.value, 10)) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  // Check message
  if (checkLength(message.value, 26)) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }
}

form.addEventListener("submit", validateForm);

// Check valid length
function checkLength(value, len) {
  if (value.trim().length >= len) {
    return true;
  } else {
    return false;
  }
}

// Validate e-mail
function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

// Confirm that form has been sent
function submitForm(event) {
  event.preventDefault();
  if (checkLength(fullName.value, 6) && validateEmail(email.value) && checkLength(subject.value, 16) && checkLength(message.value, 26)) {
    messageSent.innerHTML = `<p class="sent">Your message has been sent</p>`;
    updateButton.innerHTML = "success";
    updateButton.style.background = "green";

    // clear all input values
    form.reset();
  } else {
    console.log("dude");
  }
}

form.addEventListener("submit", submitForm);

// updateButton.addEventListener("click", function () {
//   updateButton.innerHTML = "Successfully updated!";
// });
