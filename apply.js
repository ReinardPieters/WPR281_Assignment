// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", function() {
    // Function to go back to home page
    function gotoHome() {
        location.href = 'index.html';
    }

    // Get the necessary elements
    const report = document.getElementById("Report");
    const dropFile = document.getElementById("Drop-File");

    // Add event listener for file input change
    report.addEventListener("change", function() {
        dropFile.style.backgroundColor = 'rgb(153, 255, 0)';
    });
});
