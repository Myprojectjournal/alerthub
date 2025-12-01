// passwordStrength.js

function checkPasswordStrength(password) {
    const regexStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; 
    const regexMedium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (regexStrong.test(password)) return "Strong";
    if (regexMedium.test(password)) return "Medium";
    return "Weak";
}

function displayPasswordStrength(inputId, barId) {
    const input = document.getElementById(inputId);
    const bar = document.getElementById(barId);

    input.addEventListener("input", () => {
        const password = input.value;
        const strength = checkPasswordStrength(password);

        bar.innerHTML = "";
        const div = document.createElement("div");
        div.style.height = "8px";
        div.style.borderRadius = "4px";

        if (strength === "Weak") {
            div.style.width = "33%";
            div.style.backgroundColor = "red";
        } else if (strength === "Medium") {
            div.style.width = "66%";
            div.style.backgroundColor = "orange";
        } else {
            div.style.width = "100%";
            div.style.backgroundColor = "green";
        }

        bar.appendChild(div);
    });
}

// Confirm password match check
function confirmPasswordMatch(passwordId, confirmId, messageId) {
    const passwordInput = document.getElementById(passwordId);
    const confirmInput = document.getElementById(confirmId);
    const message = document.getElementById(messageId);

    function checkMatch() {
        if (confirmInput.value === "") {
            message.textContent = "";
        } else if (passwordInput.value === confirmInput.value) {
            message.textContent = "Passwords match ✅";
            message.style.color = "green";
        } else {
            message.textContent = "Passwords do not match ❌";
            message.style.color = "red";
        }
    }

    passwordInput.addEventListener("input", checkMatch);
    confirmInput.addEventListener("input", checkMatch);
}

// Toggle password visibility
function togglePasswordVisibility(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);

    toggle.addEventListener("click", () => {
        if (input.type === "password") {
            input.type = "text";
        } else {
            input.type = "password";
        }
    });
}
