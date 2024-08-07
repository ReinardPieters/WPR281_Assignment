const form = document.querySelector('.applyMainsection');
form.addEventListener('submit', handleFormSubmit);
async function handleFormSubmit(event) {
    event.preventDefault();
  
    const courseSelect = document.querySelector('#Course');
    const courseValue = courseSelect.value;
    const userId = localStorage.getItem('UserId');
    try {
      const response = await fetch('http://localhost:3000/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, courseValue })
      });
  
      if (!response.ok) {
        alert('You are already enrolled in that course!!');
      }
  
      alert('Course inserted successfully');
    } catch (error) {
      console.error(error);
    }
  }
// Function to go back to home page
function gotoHome() {
    location.href = 'index.html';
}
