"use strict";

const preloader = document.querySelector("[data-preaload]");
window.addEventListener("load", function () {
	preloader.classList.add("loaded");
	document.body.classList.add("loaded");
});

const addEventOnElements = function (e, t, l) {
	for (let r = 0, a = e.length; r < a; r++) {
		e[r].addEventListener(t, l);
	}
};

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const navbarLinks = document.querySelectorAll('.navbar a');

const toggleNavbar = function () {
	navbar.classList.toggle("active");
	overlay.classList.toggle("active");
	document.body.classList.toggle("nav-active");
};

const closeNavbar = function () {
	navbar.classList.remove("active");
	overlay.classList.remove("active");
	document.body.classList.remove("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);
addEventOnElements(navbarLinks, "click", closeNavbar);

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
let lastScrollPos = 0;

const hideHeader = function () {
	let e = lastScrollPos < window.scrollY;
	e ? header.classList.add("hide") : header.classList.remove("hide");
	lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
	window.scrollY >= 50 ? (header.classList.add("active"), backTopBtn.classList.add("active"), hideHeader()) : (header.classList.remove("active"), backTopBtn.classList.remove("active"));
});

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");
let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
	lastActiveSliderItem.classList.remove("active");
	heroSliderItems[currentSlidePos].classList.add("active");
	lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
	currentSlidePos >= heroSliderItems.length - 1 ? (currentSlidePos = 0) : currentSlidePos++;
	updateSliderPos();
};

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
	currentSlidePos <= 0 ? (currentSlidePos = heroSliderItems.length - 1) : currentSlidePos--;
	updateSliderPos();
};

heroSliderPrevBtn.addEventListener("click", slidePrev);

let autoSlideInterval;

const autoSlide = function () {
	autoSlideInterval = setInterval(function () {
		slideNext();
	}, 7e3);
};

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
	clearInterval(autoSlideInterval);
});
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);
window.addEventListener("load", autoSlide);

const parallaxItems = document.querySelectorAll("[data-parallax-item]");
let x, y;

window.addEventListener("mousemove", function (e) {
	x = (e.clientX / window.innerWidth) * 10 - 5;
	y = (e.clientY / window.innerHeight) * 10 - 5;
	x -= 2 * x;
	y -= 2 * y;
	for (let t = 0, l = parallaxItems.length; t < l; t++) {
		x *= Number(parallaxItems[t].dataset.parallaxSpeed);
		y *= Number(parallaxItems[t].dataset.parallaxSpeed);
		parallaxItems[t].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
	}
});