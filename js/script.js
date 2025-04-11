function showNextPage(currentPageId, nextPageId) {
  const currentPage = document.getElementById(currentPageId);
  const nextPage = document.getElementById(nextPageId);

  // Apply fade-out effect to the current page
  currentPage.classList.add("fade-out");

  // After fade-out animation ends, hide the current page and show the next page
  currentPage.addEventListener("animationend", function () {
    currentPage.style.display = "none"; // Hide current page
    nextPage.style.display = "block"; // Show next page
    nextPage.classList.add("fade-in"); // Apply fade-in effect to the next page
  });
}

var end = new Date("7/6/2025 10:1 AM");

var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var timer;

function showRemaining() {
  var now = new Date();
  var distance = end - now;
  if (distance < 0) {
    clearInterval(timer);
    document.getElementById("countdown").innerHTML = "EXPIRED!";

    return;
  }
  var days = Math.floor(distance / _day);
  var hours = Math.floor((distance % _day) / _hour);
  var minutes = Math.floor((distance % _hour) / _minute);
  var seconds = Math.floor((distance % _minute) / _second);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}

timer = setInterval(showRemaining, 1000);

const form = document.getElementById("rsvpForm");
const resultDiv = document.getElementById("rsvpResult");
const list = document.getElementById("rsvpList");

// Load data dari localStorage saat halaman dibuka
let rsvpData = JSON.parse(localStorage.getItem("rsvpList")) || [];

function renderRSVP() {
  list.innerHTML = "";
  rsvpData.forEach((data, index) => {
    const item = document.createElement("li");
    item.className = "bg-gray-100 p-3 rounded-md shadow-sm";
    item.innerHTML = `
      <p><strong>Nama:</strong> ${data.nama}</p>
      <p><strong>Kehadiran:</strong> ${data.kehadiran}</p>
      <p class="text-sm text-gray-500">${data.waktu}</p>
    `;
    list.appendChild(item);
  });
  if (rsvpData.length > 0) {
    resultDiv.classList.remove("hidden");
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const attendance = document.getElementById("attendance").value;

  const newData = {
    nama: name,
    kehadiran: attendance,
    waktu: new Date().toLocaleString(),
  };

  rsvpData.push(newData);
  localStorage.setItem("rsvpList", JSON.stringify(rsvpData));
  renderRSVP();
  form.reset();
});

// Render saat pertama kali halaman dibuka
renderRSVP();
