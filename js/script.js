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

// Replace existing RSVP code with this
const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbziKQ3gbBUw-ZAtP_sGfCIX7MuVq8BvS-U7N2EKJHslMxzbOSPMUJkEsR2awdT2_n6-cw/exec";
// Paste your URL here"

async function loadRSVPs() {
  try {
    const response = await fetch(SHEET_URL);
    const data = await response.json();

    const list = document.getElementById("rsvpList");
    const resultDiv = document.getElementById("rsvpResult");

    list.innerHTML = "";
    data.forEach((item) => {
      const li = document.createElement("li");
      li.className = "bg-white p-3 rounded-md shadow-sm";
      li.innerHTML = `
        <p class="font-semibold my-1">${item.nama}</p>
        <p class="my-1">${item.message}</p>
        <p class="my-1">${item.kehadiran}</p>
        <p class="text-sm text-gray-300">${item.waktu}</p>
      `;
      list.appendChild(li);
    });

    if (data.length > 0) {
      resultDiv.classList.remove("hidden");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

document
  .getElementById("rsvpForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      nama: document.getElementById("name").value.trim(),
      message: document.getElementById("message").value.trim(),
      kehadiran: document.getElementById("attendance").value,
    };

    try {
      await fetch(SHEET_URL, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      this.reset();
      loadRSVPs();
    } catch (error) {
      console.error("Error:", error);
    }
  });

// Load RSVPs on page load
document.addEventListener("DOMContentLoaded", loadRSVPs);

// Refresh list every 30 seconds
setInterval(loadRSVPs, 1000);
