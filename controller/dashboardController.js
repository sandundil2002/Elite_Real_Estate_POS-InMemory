document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const timer = document.getElementById("time-lbl");
  const date = document.getElementById("date-lbl");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  getDate(date);
  getTime(timer);
  setInterval(() => getTime(timer), 1000);
});

$(document).ready(function () {
  $("#dash-btn").addClass("active");

  $(".icon-button").click(function () {
    $(".icon-button").removeClass("active");
    $(this).addClass("active");
  });
});
