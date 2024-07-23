const hamMenu = document.getElementById("ham-menu");
const offScreenMenu = document.getElementById("off-screen-menu")
const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});
hamMenu.addEventListener("click", function(){
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
})