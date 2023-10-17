"use strict";

// Form Elements

const form = document.querySelector("form");
const email = document.getElementById("email");
const emailError = document.querySelector("#email + .error");
const country = document.querySelector("#country");
const countryError = document.querySelector("#country + .error");
const zipCode = document.getElementById("zipcode");
const zipCodeError = document.querySelector("#zipcode+ .error");
const password = document.getElementById("password");
const passwordError = document.querySelector("#password + .error");
const confirmation = document.getElementById("confirmation");
const confirmationError = document.querySelector("#confirmation + .error");
const formButton = document.querySelector(".account-form-btn");

function displayError(input, span, message) {
  input.setCustomValidity(message);
  span.textContent = message;
}

function clearError(span) {
  span.textContent = "";
  span.classList.remove("active");
}

function showEmailError() {
  if (email.validity.valueMissing) {
    // If the field is empty,
    // display the following error message.
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    // If the field doesn't contain an email address,
    // display the following error message.
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    // If the data is too short,
    // display the following error message.
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }

  // Set the styling appropriately
  emailError.classList.add("active"); // Use classList.add to add the 'active' class
}

function showCountryError() {
  if (country.validity.valueMissing) {
    countryError.textContent = "You need to enter a country.";
  } else if (country.validity.tooShort) {
    countryError.textContent = `Your Country should be at least ${country.minLength} characters; you entered ${country.value.length}.`;
  } else if (country.validity.tooLong) {
    countryError.textContent = `Your Country should be no more than ${country.maxLength} characters; you entered ${country.value.length}.`;
  } else {
    countryError.textContent = ""; // Clear the error message when there are no validation errors
  }

  // Set the styling appropriately
  countryError.classList.add("active");
}

function showZipCodeError() {
  const zipCodeInput = parseInt(zipCode.value, 10);

  if (zipCode.validity.valueMissing) {
    zipCodeError.textContent = "You need to enter a 5 digit zip code";
  } else if (zipCode.validity.tooShort || zipCode.validity.tooLong) {
    zipCodeError.textContent = `The zip code needs to be exactly 5 digits, you entered ${zipCode.value.length}`;
  }
  if (501 > zipCodeInput || zipCodeInput > 99950) {
    zipCodeError.textContent = `Your Input is out of range. Please enter a zip code between the values of 00501 & 99950`;
  }

  zipCodeError.classList.add("active");
}

function isPasswordValid(password) {
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /\d/;

  return (
    uppercaseRegex.test(password) &&
    lowercaseRegex.test(password) &&
    numberRegex.test(password)
  );
}

function showPasswordError() {
  const pass = password.value;

  if (password.validity.tooShort) {
    passwordError.textContent = `Your Password length must have a minimum of 8 characters, you currently have ${password.value.length}`;
  }
  if (pass.length > 32) {
    passwordError.textContent = `Your password length cannot be longer than 32 characters, you currently have ${password.value.length} characters`;
  }
  if (!isPasswordValid(pass)) {
    passwordError.textContent = `Your password must contain atleast 1 uppercase, 1 lowercase and 1 number`;
  }
  passwordError.classList.add("active");
}

function showConfirmationError() {
  const pass = password.value;
  const confirm = confirmation.value;
  let message = ``;

  if (confirm.length < 8) {
    message = `Your Password length must have a minimum of 8 characters, you currently have ${confirm.length}`;
  } else if (confirm.length > 32) {
    message = `Your password length cannot be longer than 32 characters, you currently have ${confirm.length} characters`;
  } else if (!isPasswordValid(confirm)) {
    message = `Your password must contain atleast 1 uppercase, 1 lowercase and 1 number`;
  } else if (confirm != pass) {
    message =
      "Your confirmation must be identical to your password input, please double check your inputs.";
  } else {
    message = ``;
    confirmation.setCustomValidity("");
  }
  if (message) {
    // Should i make this a higher level object and use destructuring for cleaner code?
    displayError(confirmation, confirmationError, message);
  }
}

// Event Listeners
email.addEventListener("input", function (e) {
  if (email.validity.valid) {
    clearError(emailError);
  } else {
    showEmailError();
  }
});

country.addEventListener("input", function (e) {
  if (country.validity.valid) {
    clearError(countryError);
  } else {
    showCountryError();
  }
});

zipCode.addEventListener("input", function (e) {
  if (zipCode.validity.valid) {
    clearError(zipCodeError);
  } else {
    showZipCodeError();
  }
});

password.addEventListener("input", function (e) {
  if (isPasswordValid(password.value) && password.validity.valid) {
    clearError(passwordError);
  } else {
    showPasswordError();
  }
});

confirmation.addEventListener("input", function (e) {
  showConfirmationError();
  if (confirmation.validity.valid) {
    clearError(confirmationError);
  }
});

form.addEventListener("submit", function (e) {
  if (!form.validity.valid) {
    e.preventDefault();
    if (!email.validity.valid) {
      showEmailError();
    }
    if (!country.validity.valid) {
      showCountryError();
    }
    if (!zipCode.validity.valid) {
      showZipCodeError();
    }
    if (!password.validity.valid) {
      showPasswordError();
    }
    if (!confirmation.validity.valid) {
      showConfirmationError();
    }
  }
});

formButton.addEventListener("click", function (e) {
  // Corrected the event target
  e.preventDefault();
  console.log("Button clicked");
});
