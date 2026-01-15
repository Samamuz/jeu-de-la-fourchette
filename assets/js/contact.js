// Validation du formulaire de contact
const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  feedback.innerHTML = '';
  let valid = true;

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (name.length < 2) {
    showError('name', 'Nom trop court (≥ 2 caractères)');
    valid = false;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    showError('email', 'Email invalide');
    valid = false;
  }
  if (message.length < 10) {
    showError('message', 'Message trop court (≥ 10 caractères)');
    valid = false;
  }

  if (valid) {
    feedback.innerHTML = '<span style="color:green">Merci, message enregistré (simulation)</span>';
    form.reset();
  }
});

function showError(field, msg) {
  let el = document.getElementById(field + '-error');
  if (!el) {
    el = document.createElement('div');
    el.id = field + '-error';
    el.style.color = 'red';
    el.style.fontSize = '0.9em';
    document.getElementById(field).after(el);
  }
  el.textContent = msg;
}

['name', 'email', 'message'].forEach(f => {
  document.getElementById(f).addEventListener('input', () => {
    const err = document.getElementById(f + '-error');
    if (err) err.textContent = '';
  });
});
