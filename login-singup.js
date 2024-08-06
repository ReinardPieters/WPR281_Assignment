
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const emailInput = document.getElementById("signinemail");
const passwordInput = document.getElementById("signinpass");
localStorage.removeItem('username')

document.querySelector('#signin').addEventListener("click",() => {
    let email = document.querySelector("#signinemail").value;
    let password = document.querySelector("#signinpass").value;
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert(`Error: ${data.error}`);
      } else {
        localStorage.setItem('username', data.username);
        localStorage.setItem('UserId',data.userID)
        // or sessionStorage.setItem('username', data.username);
        alert(`Welcome, ${data.username}!`);
        window.location.href = 'index.html';
      }
    })
    .catch(error => console.error('Error:', error));
  });

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
    }
});




registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});