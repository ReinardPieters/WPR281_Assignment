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

