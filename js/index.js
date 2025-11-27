// ------------------- SIGNUP -------------------
function signup() {
    const fullName = document.getElementById("fullName")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const country = document.getElementById("country")?.value.trim();
    const address = document.getElementById("address")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value;
    const confirmPassword = document.getElementById("confirmPassword")?.value;

    if(!fullName || !phone || !country || !address || !email || !password || !confirmPassword){
        alert("Please fill all fields.");
        return;
    }

    if(password !== confirmPassword){
        alert("Passwords do not match!");
        return;
    }

    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if(!strongPassword.test(password)){
        alert("Password must be 8+ chars, include uppercase, lowercase, number, special char.");
        return;
    }

    fetch("https://reportapp.infinityfree.me/wp-json/custom/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phone, country, address, email, password })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Sign Up Response:", data);
        if(data.success){
            alert(data.message);
            window.location.href = "index.html";
        } else {
            alert(data.message || "Sign up failed.");
        }
    })
    .catch(err => { 
        console.error("Sign Up Fetch Error:", err); 
        alert("Something went wrong. Check console."); 
    });
}

// ------------------- LOGIN -------------------
function login() {
    const username = document.getElementById('loginUsername')?.value.trim();
    const password = document.getElementById('loginPassword')?.value.trim();

    if(!username || !password){
        alert("Please enter both username and password.");
        return;
    }

    fetch('https://reportapp.infinityfree.me/wp-json/jwt-auth/v1/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Login Response:", data);
        if(data.token){
            localStorage.setItem('jwtToken', data.token);
            localStorage.setItem('userEmail', data.user_email);
            localStorage.setItem('userName', data.user_display_name);
            alert('Login successful!');
            window.location.href = 'home.html';
        } else {
            alert('Login failed: ' + (data.message || "Unknown error"));
        }
    })
    .catch(err => { 
        console.error("Login Fetch Error:", err); 
        alert('Something went wrong. Check console.');
    });
}

// ------------------- CHECK LOGIN -------------------
function checkLogin() {
    const token = localStorage.getItem('jwtToken');
    if(!token) window.location.href = 'index.html';
}
