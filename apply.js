// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", function() {


    // Get the necessary elements
    const report = document.getElementById("Report"); //Name of the input
    const dropFile = document.getElementById("Drop-File");// name of the div
    const paragraph = document.getElementById("applyImgP");
    const dropArea = document.getElementById("applyDropArea"); // name of the label

    // Add event listener for file input change
    report.addEventListener("change", uploadedFile);

        function uploadedFile() { //function when file is uploaded
            dropFile.style.backgroundColor = 'rgb(153, 255, 0)';
            dropFile.style.borderStyle = 'solid';
            paragraph.innerHTML = "File has been uploaded";
        }

    dropArea.addEventListener("dragover", function(e){ //Used for the drag and drop function
        e.preventDefault();
    })

    dropArea.addEventListener("drop", function(e){ //Used for the drag and drop function
        e.preventDefault();
        report.files = e.dataTransfer.files;
        uploadedFile();
    })

});

// Function to go back to home page
function gotoHome() {
    location.href = 'index.html';
}
