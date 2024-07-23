const hamMenu = document.getElementById("ham-menu");
const offScreenMenu = document.getElementById("off-screen-menu");


hamMenu.addEventListener("click", () =>{
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
    return;
});

