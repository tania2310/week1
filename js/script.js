const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const msg = document.getElementById("formMsg");

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;

        if (!name || !email || !message) {
            msg.textContent = "All fields are required!";
            msg.style.color = "red";
            return;
        }

        if (!emailPattern.test(email)) {
            msg.textContent = "Please enter a valid email address!";
            msg.style.color = "red";
            return;
        }

        msg.textContent = "Form submitted successfully (dummy submission).";
        msg.style.color = "green";

        form.reset();
    });
}
