document.querySelector("#signUp").addEventListener("click", async () => {
    let username = document.querySelector("#signUpName").value;
    let email = document.querySelector("#signUpEmail").value;
    let password = document.querySelector("#signUpPass").value; // Fix selector

    if (!username || !email || !password) {
        alert('Please fill in all fields');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/register', { // Match with the backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });

        if (response.ok) {
            alert("User registered successfully");
        } else {
            alert("Error registering user");
        }
    } catch (error) {
        console.error('Error:', error);
        alert(error);
    }
});

const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

const signin = document.getElementById("signin");
const emailInput = document.getElementById("signinemail");
const passwordInput = document.getElementById("signinpass");

registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});

