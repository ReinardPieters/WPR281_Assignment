const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const signin = document.getElementById("signin");

signin.addEventListener("click",() =>{
    const x = document.getElementById("signinemail").value;
    const y = document.getElementById("signinpass").value;
})
registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});