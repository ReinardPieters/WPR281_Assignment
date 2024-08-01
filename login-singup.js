const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

const signin = document.getElementById("signin");
const emailInput = document.getElementById("signinemail");
const passwordInput = document.getElementById("signinpass");
let storedPasswords = [];
let storedEmails =[]
let storedName = []
// Fetch and store passwords
function loadData(){
    fetch("members.txt")
    .then(response => response.text())
    .then(data => {
        let members = data.split('\n');
        members.forEach(line => {
            let account = line.split(';');
            if (account[2]) {
                storedPasswords.push(account[2].trim());
            }
            if(account[1]){
                storedEmails.push(account[1].trim())
            }
            if(account[0]){
                storedName.push(account[0])
            }
        });
        console.log("Passwords loaded:", storedPasswords); // Debugging line
    })
    .catch(error => console.error('Error fetching members:', error));
}
loadData()
// Sign-in event listener
signin.addEventListener('click', () => {
    setTimeout(loadData(),300)
    
    console.log(passwordInput.value)
    const password = passwordInput.value;
    const email = emailInput.value;
    // Ensure that storedPasswords is populated before checking
    if (storedPasswords.length === 0 && storedEmails.length ===0) {
        alert("Passwords not loaded yet.");
        return;
    }

  for(i=0;i<storedEmails.length;i++){
    if (storedEmails[i].toString().toLowerCase()== email.toLowerCase() && password === storedPasswords[i]){
        alert(`Welcome ${storedName[i]}`);
        break
    }else{
        if(i =  storedEmails.length-1){
            alert("Not found")
        }
        
    }
  }
});
registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});