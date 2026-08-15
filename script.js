document.querySelector('#signup-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.querySelector('#email');
  document.querySelector('#form-message').textContent = `Thanks — we’ll save a little wonder for ${email.value}.`;
  email.value = '';
});
