
const RESTAURANT_PHONE = "22366519491";

const MENU = [
  {category:"plats", name:"Riz au gras / Zamai", description:"Un délicieux riz mijoté, généreux et parfumé.", minimumPrice:500,
   image:"zamai.jpeg"},
  {category:"plats", name:"Poulet braisé", description:"Poulet grillé et accompagné de sa garniture.", minimumPrice:3000,
   image:"poulet.jpg"},
  {category:"plats", name:"Poisson grillé", description:"Poisson frais, grillé et relevé juste comme il faut.", minimumPrice:2000,
   image:"poisson.jpg"},
  {category:"plats", name:"Vermicelle", description:"Un grand saveur authentique vermicelle bien fait.", minimumPrice:500,
   image:"vermi.jpeg"},
  {category:"plats", name:"Widjila", description:"Doux et équilibre dans une belle assiette.", minimumPrice:500,
   image:"WIDJILA.jpg"},
  {category:"plats", name:"Brochettes", description:"Brochettes grillées, idéales pour se régaler.", minimumPrice:250,
   image:"brochette.webp"},
  {category:"sauces", name:"Sauce Saka Saka", description:"sauce africaine, idéales pour se régaler.", minimumPrice:500,
   image:"sakasaka.png"},
   {category:"sauces", name:"Sauce Fakoye", description:"sauce africaine, idéales pour se régaler.", minimumPrice:500,
   image:"fakoye.jpg"},
   {category:"sauces", name:"Sauce Arachide", description:"sauce africaine, idéales pour se régaler.", minimumPrice:500,
   image:"arachide.jpg"},
   {category:"plats", name:"Couscous", description:"Un regal", minimumPrice:500,
   image:"couscous.webp"},
   {category:"plats", name:"Fonio / Djouka", description:"Un regal", minimumPrice:500,
   image:"djouka.jpg"},
   {category:"sauces", name:"Sauce Nandji", description:"sauce africaine, idéales pour se régaler.", minimumPrice:500,
   image:"nandji.jpg"},
   {category:"sauces", name:"Sauce Yassa", description:"sauce africaine, idéales pour se régaler.", minimumPrice:500,
   image:"yassa.webp"},
   {category:"plats", name:"Sandwich", description:"personaliser le votre et régaler vous.", minimumPrice:500,
   image:"sandwich.webp"},
   {category:"plats", name:"Paté", description:"La Specialité de votre Marietou.", minimumPrice:500,
   image:"pate.webp"},
   {category:"jus", name:"Paps Pomme", description:"Delicieux jus aprés votre repas.", minimumPrice:300,
   image:"paps pom.jpg"},
   {category:"jus", name:"Paps Ananas", description:"Delicieux jus aprés votre repas.", minimumPrice:300,
   image:"paps.jpg"},
    {category:"jus", name:"Vinto", description:"Delicieux jus aprés votre repas.", minimumPrice:300,
   image:"vinto.jpg"},
    {category:"jus", name:"Coca Cola", description:"Delicieux jus aprés votre repas.", minimumPrice:300,
   image:"coca.jpg"}, 
   {category:"jus", name:"Paps Mandarin", description:"Delicieux jus aprés votre repas.", minimumPrice:300,
   image:"tomy.jpg"},
    {category:"jus", name:"Degue", description:"Delicieux jus aprés votre repas.", minimumPrice:300,
   image:"degue.jpg"},
   {category:"plats", name:"Alloco", description:"Un regal", minimumPrice:500,
   image:"alloco.jpg"},
   {category:"plats", name:"Frite", description:"Un regal", minimumPrice:500,
   image:"frite.jpg"},
   {category:"plats", name:"Soup Pied de vache", description:"Un regal avec une explosion de saveur", minimumPrice:500,
   image:"michi se.jpg"},
   {category:"plats", name:"Soup Intestin", description:"Un regal avec une explosion de saveur", minimumPrice:500,
   image:"fourou.jpg"},
   {category:"plats", name:"Soup Foie", description:"Un regal avec une explosion de saveur", minimumPrice:500,
   image:"foie.webp"},
    {category:"jus", name:"Sprite", description:"Delicieux jus aprés votre repas.", minimumPrice:300,
   image:"sprite.jpg"},
   {category:"jus", name:"Fanta", description:"Delicieux jus aprés votre repas.", minimumPrice:300,
   image:"fanta.jpg"},
];

const grid = document.getElementById("menuGrid");
const emptyMenu = document.getElementById("emptyMenu");
let selected = null;
const cards = [];

function formatPrice(price) {
  return `${price.toLocaleString("fr-FR")} F CFA`;
}

MENU.forEach((dish, index) => {
  const card = document.createElement("article");
  card.className = "dish-card";
  card.dataset.category = dish.category;
  card.innerHTML = `
    <div class="dish-photo">
      <img src="${dish.image}" alt="${dish.name}" loading="lazy">
      <span class="photo-hint">Cliquer pour commander</span>
    </div>
    <div class="dish-info">
      <h3>${dish.name}</h3>
      <p>${dish.description}</p>
      <p class="minimum-price">Montant minimum : ${formatPrice(dish.minimumPrice)}</p>
      <div class="dish-bottom">
        <button class="order-link" type="button">Commander</button>
      </div>
    </div>`;
  card.addEventListener("click", () => openOrder(index, card.querySelector(".order-link")));
  card.querySelector(".order-link").addEventListener("click", event => {
    event.stopPropagation();
    openOrder(index, event.currentTarget);
  });
  cards.push(card);
  grid.appendChild(card);
});

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;
    cards.forEach(card => {
      const visible = filter === "tous" || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) visibleCount++;
    });
    document.querySelectorAll(".filter-btn").forEach(filterButton => {
      const active = filterButton === button;
      filterButton.classList.toggle("active", active);
      filterButton.setAttribute("aria-pressed", String(active));
    });
    emptyMenu.hidden = visibleCount > 0;
  });
});

let orderReturnFocus = null;
function openOrder(index, trigger) {
  selected = MENU[index];
  orderReturnFocus = trigger;
  const amountInput = document.getElementById("unitAmount");
  amountInput.min = String(selected.minimumPrice);
  amountInput.value = String(selected.minimumPrice);
  document.getElementById("quantity").value = "1";
  document.getElementById("orderError").textContent = "";
  updateOrderSummary();
  document.getElementById("orderModal").classList.add("show");
  document.getElementById("orderModal").setAttribute("aria-hidden", "false");
  document.getElementById("closeModal").focus();
}
function getIntegerInputValue(id) {
  const value = Number(document.getElementById(id).value);
  return Number.isSafeInteger(value) && value > 0 ? value : null;
}
function getQuantity() {
  return getIntegerInputValue("quantity");
}
function getUnitAmount() {
  return getIntegerInputValue("unitAmount");
}
function validateOrder() {
  const amount = getUnitAmount();
  const quantity = getQuantity();
  const error = document.getElementById("orderError");
  if (!amount || amount < selected.minimumPrice) {
    error.textContent = `Le montant par article doit être au moins ${formatPrice(selected.minimumPrice)}.`;
    document.getElementById("unitAmount").focus();
    return false;
  }
  if (!quantity) {
    error.textContent = "Saisissez une quantité entière supérieure à zéro.";
    document.getElementById("quantity").focus();
    return false;
  }
  error.textContent = "";
  return true;
}
function updateOrderSummary() {
  const amount = getUnitAmount();
  const quantity = getQuantity();
  document.getElementById("selectedDish").textContent = selected.name;
  document.getElementById("orderTotal").textContent = amount && quantity
    ? `Total : ${formatPrice(amount * quantity)}`
    : "";
  const error = document.getElementById("orderError");
  if (amount && amount >= selected.minimumPrice) error.textContent = "";
  else if (document.getElementById("unitAmount").value) {
    error.textContent = `Le montant par article doit être au moins ${formatPrice(selected.minimumPrice)}.`;
  }
}
function closeOrder() {
  const modal = document.getElementById("orderModal");
  modal.classList.remove("show");
  if (orderReturnFocus && orderReturnFocus.isConnected) orderReturnFocus.focus();
  modal.setAttribute("aria-hidden", "true");
}
function buildMessage() {
  const name = document.getElementById("customerName").value.trim();
  const quantity = getQuantity();
  const amount = getUnitAmount();
  const details = document.getElementById("details").value.trim();
  const total = amount * quantity;
  return `Bonjour, je souhaite commander :\nArticle : ${selected.name}\nMontant par article : ${formatPrice(amount)}\nQuantité : ${quantity}\nTotal : ${formatPrice(total)}\nNom : ${name || "Non précisé"}\nPrécisions : ${details || "Aucune"}\nMerci.`;
}
function validPhone() {
  const phone = RESTAURANT_PHONE.replace(/\D/g, "");
  if (!/^\d{8,15}$/.test(phone) || /X/i.test(RESTAURANT_PHONE)) {
    alert("Le numéro du restaurant n'est pas encore configuré. Modifiez RESTAURANT_PHONE dans le fichier script.js.");
    return false;
  }
  return true;
}
document.getElementById("whatsappBtn").addEventListener("click", () => {
  if (!selected || !validateOrder() || !validPhone()) return;
  const phone = RESTAURANT_PHONE.replace(/\D/g, "");
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(buildMessage())}`, "_blank");
});
document.getElementById("smsBtn").addEventListener("click", () => {
  if (!selected || !validateOrder() || !validPhone()) return;
  const phone = RESTAURANT_PHONE.replace(/\D/g, "");
  window.location.href = `sms:+${phone}?body=${encodeURIComponent(buildMessage())}`;
});
document.getElementById("closeModal").addEventListener("click", closeOrder);
document.getElementById("unitAmount").addEventListener("input", updateOrderSummary);
document.getElementById("quantity").addEventListener("input", updateOrderSummary);
document.getElementById("orderModal").addEventListener("click", e => {
  if (e.target.id === "orderModal") closeOrder();
});
document.addEventListener("keydown", e => { if (e.key === "Escape") closeOrder(); });
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("displayPhone").textContent =
  RESTAURANT_PHONE.includes("X")
    ? "+223 66 51 94 91"
    : "+" + RESTAURANT_PHONE.replace(/\D/g, "").replace(/(\d{3})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
