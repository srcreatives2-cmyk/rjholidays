// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// Mobile nav toggle
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});

// Close nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// Contact form submission
function submitForm(e) {
  e.preventDefault();
  const name = e.target.querySelector('input[type="text"]').value;
  const phone = e.target.querySelector('input[type="tel"]').value;
  const destination = e.target.querySelector('select').value;
  const message = e.target.querySelector('textarea').value;
  const waMsg = `Hi RJ Holidays! I am ${name}. I am interested in a ${destination || 'tour'} package. My contact: ${phone}. ${message}`;
  window.open(`https://wa.me/919317618833?text=${encodeURIComponent(waMsg)}`, '_blank');
}
