// password strength checker
function checkPasswordStrength(password) {
    const regexStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const regexMedium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (regexStrong.test(password)) return "Strong";
    if (regexMedium.test(password)) return "Medium";
    return "Weak";
}

// strength bar display
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

// confirm password match
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

// toggle password visibility
function togglePasswordVisibility(inputId, toggleId) {
    const input = document.getElementById(inputId);
    const toggle = document.getElementById(toggleId);

    toggle.addEventListener("click", () => {
        input.type = input.type === "password" ? "text" : "password";
    });
}

// signup button
function signup() {
    const fullName = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const country = document.getElementById("country").value.trim();
    const address = document.getElementById("address").value.trim();
    const password = document.getElementById("passwordInput").value.trim();
    const confirmPassword = document.getElementById("confirmPasswordInput").value.trim();

    if (!fullName || !phone || !country || !address || !password || !confirmPassword) {
        alert("All fields are required");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    const strength = checkPasswordStrength(password);
    if (strength === "Weak") {
        alert("Password is too weak. Make sure it has uppercase, lowercase, number, special char, and 8+ chars.");
        return;
    }

    // ✅ Here you can send the data to backend or save locally
    console.log({ fullName, phone, country, address, password });
    alert("Account created successfully!");
}

// initialize features
displayPasswordStrength("passwordInput", "passwordStrengthBar");
confirmPasswordMatch("passwordInput", "confirmPasswordInput", "passwordMatchMsg");
togglePasswordVisibility("passwordInput", "togglePassword");
togglePasswordVisibility("confirmPasswordInput", "toggleConfirmPassword");
