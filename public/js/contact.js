(function () {
  "use strict";

  let form = document.querySelector("#contact-form");

  document.querySelector("#send-contact").addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    let formValid = true;
    if (!form.checkValidity()) {
      formValid = false;
    }
    form.classList.add("was-validated");
    if (formValid) {
      sendTheEmail();
    }
  });

  function sendTheEmail() {
    console.log("You clicked the submit button.");
    let firstName = document.querySelector("#contact-first").value;
    let lastName = document.querySelector("#contact-first").value;
    let email = document.querySelector("#contact-email-addr").value;
    let message = document.querySelector("#contact-question").value;
    console.log("First name: " + firstName);
    console.log("Last name: " + lastName);
    console.log("Email: " + email);
    console.log("Message: " + message);
  }
})();
