const timer = document.getElementById("time-lbl");
const date = document.getElementById("date-lbl");

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});

function getTime() {
  let t = new Date().toLocaleTimeString();
  timer.textContent = t;
}

function getDate() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let now = new Date();
  let dayName = days[now.getDay()];
  let day = now.getDate();
  let monthName = months[now.getMonth()];
  let year = now.getFullYear();

  let formattedDate = `${dayName}(${day})-${monthName}-${year}`;
  date.textContent = formattedDate;
}

getDate();
getTime();
setInterval(getTime, 1000);

function loadSection(sectionId) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });
  
  document.getElementById(sectionId).classList.add("active");
}