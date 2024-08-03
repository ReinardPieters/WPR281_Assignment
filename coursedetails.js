const hamMenu = document.getElementById("ham-menu");
const offScreenMenu = document.getElementById("off-screen-menu");
const back = document.getElementById("back")
hamMenu.addEventListener("click", () =>{
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
    back.classList.toggle('active');
    if(back.disabled == true){
        back.disabled = false
    } else{
        back.disabled=true
    }
});

