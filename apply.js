function gotoHome() {
    location.href = 'index.html'
}

let dropArea = document.getElementById("applyDropArea");//label for droping
let report = document.getElementById("report");
const dropFile = document.getElementById("Drop-File");

document.getElementById("report").addEventListener("change",uploadedFile);

function uploadedFile() {
    //dropFile.style.backgroundColor = rgb(153, 255, 0);
    document.getElementById("Drop-File").style.backgroundColor = `rgb(153, 255, 0)`;
   
}