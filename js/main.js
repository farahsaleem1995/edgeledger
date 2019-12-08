// Get browser Viewport Width, Viewport  Height
const vpWidth = Math.max(
  document.documentElement.clientWidth,
  window.innerWidth || 0
);
const vpHeight = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
);

// Element Selectio
const navbar = document.querySelector("#navbar");

const menuButton = document.querySelector(".menu-button");
const navList = document.querySelector("#navbar ul");
const overlay = document.querySelector(".overlay");

let homeLink = document.querySelector("#home-link");
let whatLink = document.querySelector("#what-link");
let whoLink = document.querySelector("#who-link");
let contactLink = document.querySelector("#contact-link");

let mapTarget = document.querySelector(".map");
// --------------------------------------------------------------------

// Smaller screen menu
menuButton.addEventListener("click", () => {
  navList.classList.toggle("active");
  menuButton.classList.toggle("active");
  overlay.classList.toggle("active");
});

document.addEventListener("click", e => {
  if (
    !e.target.classList.contains("menu-button") &&
    navList.classList.contains("active") &&
    menuButton.classList.contains("active")
  ) {
    navList.classList.remove("active");
    menuButton.classList.remove("active");
    overlay.classList.remove("active");
  }
});
// --------------------------------------------------------------------

// Page Smooth Scroll
function smoothScroll(target, duration) {
  let targetElement = document.querySelector(target);
  let targetElementPosition =
    targetElement.getBoundingClientRect().top + window.scrollY;
  let startPosition = window.pageYOffset;
  let distance = targetElementPosition - startPosition;

  // Fixed Navbar => add navbar(10vh) height to scroll distance
  // Option 1
  // if (targetElement.getBoundingClientRect().top > vpHeight / 10) {
  //   distance -= vpHeight / 10;
  // }
  // Option 2
  if (
    Math.abs(targetElement.getBoundingClientRect().top) > navbar.scrollHeight
  ) {
    distance -= navbar.scrollHeight;
  }

  // console.log(
  //   "target element pos:" +
  //     targetElementPosition +
  //     " = pos to current loc(" +
  //     targetElement.getBoundingClientRect().top +
  //     ") + scrollY (" +
  //     window.scrollY +
  //     ")"
  // );
  // console.log("start pos: " + startPosition);
  // console.log("distance: " + distance);

  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(1, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

const links = document.querySelectorAll("#navbar a, .btn");

links.forEach(link => {
  link.addEventListener("click", function() {
    if (this.getAttribute("href")) {
      smoothScroll(this.getAttribute("href"), 1000);
    }
  });
});

window.addEventListener("scroll", function() {
  if (window.scrollY > navbar.scrollHeight) {
    navbar.style.opacity = 0.9;
  } else {
    navbar.style.opacity = 1;
  }
});
// --------------------------------------------------------------------

// GOOGLE MAP
function initMap() {
  // My Location
  const loc = { lat: 33.510397, lng: 36.309773 };
  // Centered map on location
  const map = new google.maps.Map(mapTarget, {
    center: loc,
    zoom: 8
  });

  // The marker, positioned at location
  const marker = new google.maps.Marker({
    position: loc,
    map: map
  });
}
// --------------------------------------------------------------------
