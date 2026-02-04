// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (burger && navMenu) {
  burger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    burger.classList.toggle('toggle');
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      burger.classList.remove('toggle');
    });
  });
}

// Filter Logic
function filterSelection(category) {
  const cards = document.querySelectorAll('.product-card');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  // Handle event safely
  if (event && event.target) {
    event.target.classList.add('active');
  }

  cards.forEach(card => {
    if (category === 'all') {
      card.style.display = 'flex';
    } else {
      if (card.classList.contains(category)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    }
  });
}

// Cart Logic
let cart = [];
let total = 0;
let pendingItem = null; // Store item waiting for confirmation
let pendingBtn = null;  // Store button waiting for update

function addToCart(name, price, btn) {
  // If button says "Voir mon Panier", open cart
  if (btn && (btn.innerText.includes("Voir") || btn.innerText.includes("VOIR"))) {
    document.getElementById('cart-modal').style.display = 'block';
    return;
  }

  // Store details for confirmation
  pendingItem = { name, price };
  pendingBtn = btn;

  // Show Confirmation Modal
  showConfirm();
}

function confirmAdd() {
  if (!pendingItem) return;

  // Add to cart
  cart.push(pendingItem);
  total += pendingItem.price;
  updateCartUI();

  // Change Button Text
  if (pendingBtn) {
    pendingBtn.innerText = "Voir mon Panier";
    pendingBtn.style.backgroundColor = "var(--secondary-color)";
    pendingBtn.style.color = "#fff";
  }

  // Notification (Optional since we have modal, but nice as second feedback)
  if (typeof iziToast !== 'undefined') {
    iziToast.success({
      title: 'Délice ajouté !',
      message: pendingItem.name + ' est prêt pour vous.',
      position: 'topRight'
    });
  }

  // Close modal
  closeConfirm();

  // Reset
  pendingItem = null;
  pendingBtn = null;
}

function showConfirm() {
  const modal = document.getElementById('confirm-modal');
  if (modal) modal.style.display = 'block';

  // Bind Yes button
  const yesBtn = document.getElementById('confirm-yes');
  if (yesBtn) yesBtn.onclick = confirmAdd;
}

function closeConfirm() {
  const modal = document.getElementById('confirm-modal');
  if (modal) modal.style.display = 'none';
}

function updateCartUI() {
  const cartCount = document.getElementById('cart-count');
  const totalPrice = document.getElementById('total-price');
  const cartList = document.getElementById('cart-items');

  if (cartCount) cartCount.innerText = cart.length;
  if (totalPrice) totalPrice.innerText = total;

  if (cartList) {
    if (cart.length === 0) {
      cartList.innerHTML = "<p>Votre panier est vide.</p>";
    } else {
      cartList.innerHTML = "";
      cart.forEach((item, index) => {
        cartList.innerHTML += `<div style="display:flex; justify-content:space-between; margin: 5px 0; border-bottom: 1px dashed #eee; padding-bottom: 5px;">
                        <span>${item.name}</span>
                        <span>$${item.price}</span>
                    </div>`;
      });
    }
  }
}

function checkoutWhatsApp() {
  if (cart.length === 0) {
    showMessage("Panier Vide", "Votre panier est vide. Ajoutez quelques douceurs !", "🍰");
    return;
  }

  // Close cart modal
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) cartModal.style.display = 'none';

  // Show success message using the standart Info Modal
  showMessage("Commande Prête !", "Nous vous redirigeons vers WhatsApp pour finaliser votre commande avec élégance.", "✨");

  // Chic Message Formatting
  let message = "✨ *C O M M A N D E • B E A U T É • C A K E* ✨\n";
  message += "________________________________\n";
  message += "Bonjour, je souhaite valider mon panier :\n\n";

  cart.forEach(item => {
    message += "▪️ " + item.name + " ..... $" + item.price + "\n";
  });

  message += "\n________________________________\n";
  message += "💳 *TOTAL : $" + total + "*\n";
  message += "________________________________\n";
  message += "📍 *Lieu de Livraison* :\n[Votre Adresse Ici]\n\n";
  message += "Merci de confirmer ma commande ! 🌸";

  let phoneNumber = "243854832846";

  // SAVE ORDER TO LOCALSTORAGE (Best Feature: History)
  const newOrder = {
    date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
    items: [...cart], // Clone cart
    total: total
  };

  const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
  existingOrders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(existingOrders));

  // Delay redirection slightly to let user see the modal
  setTimeout(() => {
    let url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
    window.open(url, '_blank');
  }, 1500);
}

// Custom Dialog Function
function showMessage(title, text, icon = '🔔') {
  const modal = document.getElementById('info-modal');
  const titleEl = document.getElementById('info-title');
  const textEl = document.getElementById('info-text');
  const iconEl = document.getElementById('info-icon');

  if (modal && titleEl && textEl) {
    titleEl.innerText = title;
    textEl.innerText = text;
    if (iconEl) iconEl.innerText = icon;
    modal.style.display = 'block';
  } else {
    alert(text);
  }
}

// Close modal when clicking outside
window.onclick = function (event) {
  const cartModal = document.getElementById('cart-modal');
  const infoModal = document.getElementById('info-modal');
  const confirmModal = document.getElementById('confirm-modal');

  if (cartModal && event.target == cartModal) {
    cartModal.style.display = "none";
  }
  if (infoModal && event.target == infoModal) {
    infoModal.style.display = "none";
  }
  if (confirmModal && event.target == confirmModal) {
    confirmModal.style.display = "none";
  }
}

// Carousel / Slideshow Logic
let slideIndex = 1;
let slideInterval;

// Initialize slideshow if carousel exists
if (document.querySelector('.carousel-container')) {
  showSlides(slideIndex);
  startSlideTimer();
}

function plusSlides(n) {
  showSlides(slideIndex += n);
  resetSlideTimer();
}

function currentSlide(n) {
  showSlides(slideIndex = n);
  resetSlideTimer();
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("carousel-slide");
  let dots = document.getElementsByClassName("dot");

  if (slides.length === 0) return;

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].classList.remove("active");
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  slides[slideIndex - 1].classList.add("active");
  if (dots.length > 0) {
    dots[slideIndex - 1].className += " active";
  }
}

function startSlideTimer() {
  slideInterval = setInterval(() => {
    plusSlides(1);
  }, 5000); // Change slide every 5 seconds
}

function resetSlideTimer() {
  clearInterval(slideInterval);
  startSlideTimer();
}