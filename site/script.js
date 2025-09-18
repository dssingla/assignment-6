
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = location.pathname.split("/").pop();
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
});

const packagesData = [
  { id: 1, destination: "Paris, France", durationDays: 7, basePrice: 1500, season: "peak" },
  { id: 2, destination: "Bali, Indonesia", durationDays: 5, basePrice: 1200, season: "off" },
  { id: 3, destination: "Swiss Alps, Switzerland", durationDays: 6, basePrice: 2000, season: "shoulder" }
];

function calculateFinalPrice(pkg) {
  let multiplier = 1;
  switch (pkg.season) {
    case "peak": multiplier = 1.3; break;
    case "off": multiplier = 0.8; break;
    case "shoulder": multiplier = 1.1; break;
  }
  
  let surcharge = pkg.durationDays >= 6 ? 100 : 0;
  return pkg.basePrice * multiplier + surcharge;
}

function renderPackages() {
  const table = document.getElementById("packagesTableBody");
  if (!table) return;

  table.innerHTML = "";
  for (let pkg of packagesData) {
    let row = document.createElement("tr");
    row.innerHTML = `
      <td>${pkg.destination}</td>
      <td>${pkg.durationDays} Days</td>
      <td>$${pkg.basePrice}</td>
      <td>${pkg.season}</td>
      <td>$${calculateFinalPrice(pkg).toFixed(2)}</td>
    `;
    table.appendChild(row);
  }
}
renderPackages();

function calculateBookingPrice() {
  const checkIn = document.getElementById("checkIn");
  const checkOut = document.getElementById("checkOut");
  const guests = document.getElementById("guests");
  const packageSelect = document.getElementById("packageSelect");
  const promo = document.getElementById("promo");

  const totalDisplay = document.getElementById("totalPrice");
  const submitBtn = document.querySelector("form button");

  if (!checkIn || !checkOut || !guests || !packageSelect) return;

  let inDate = new Date(checkIn.value);
  let outDate = new Date(checkOut.value);

  if (isNaN(inDate) || isNaN(outDate) || outDate <= inDate) {
    totalDisplay.textContent = "Please select valid dates.";
    submitBtn.disabled = true;
    return;
  }

  let nights = (outDate - inDate) / (1000 * 60 * 60 * 24);

 
  let selectedPkg = packagesData.find(p => p.destination.includes(packageSelect.value));
  let base = selectedPkg ? calculateFinalPrice(selectedPkg) : 0;

  let total = base * nights;

  
  if (guests.value > 2) total *= 1.2;

  switch (promo.value.trim().toUpperCase()) {
    case "EARLYBIRD": total *= 0.9; break;
    case "VIP": total *= 0.85; break;
  }

  totalDisplay.textContent = `Estimated Total: $${total.toFixed(2)}`;
  submitBtn.disabled = false;
}

document.addEventListener("input", e => {
  if (["checkIn", "checkOut", "guests", "packageSelect", "promo"].includes(e.target.id)) {
    calculateBookingPrice();
  }
});


function initGallery() {
  const thumbnails = document.querySelectorAll(".gallery img[data-large]");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalCaption = document.getElementById("modalCaption");

  if (!modal) return;

  thumbnails.forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "flex";
      modalImg.src = img.dataset.large;
      modalImg.alt = img.alt;
      modalCaption.textContent = img.title || img.alt;
    });
  });

  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}
initGallery();
