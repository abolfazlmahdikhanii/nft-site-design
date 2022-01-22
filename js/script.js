"use strict";
// Variable
const menu = document.querySelector(".nav__center");
const overlay = document.querySelector(".overlay");
const btnMenu = document.querySelector(".nav__sm-menu");
const serviceContainer = document.querySelector(".service--item");
const footerItem = document.querySelectorAll(".footer--list");
const slide = document.querySelectorAll(".slide");
const btnNextSlide = document.querySelector(".slider__btn--right");
const btnPrevSlide = document.querySelector(".slider__btn--left");
const dotsContainer = document.querySelector(".dots");
const section = document.querySelectorAll(".section");
let currentSlide = 0;
let maxSlide = slide.length;
// function

/*--------- menu -------------*/
btnMenu.addEventListener("click", function () {
  menu.classList.add("active");
  overlay.classList.add("active");
});
overlay.addEventListener("click", function () {
  menu.classList.remove("active");
  overlay.classList.remove("active");
});
/*-------- slider -------------*/

const sliders = function () {
  const goToSlide = function (curSlide) {
    slide.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    });
  };
  const createDots = function () {
    slide.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `
          <button class="dots__dot" data-slide="${i}"></button>
          `
      );
    });
  };

  const activeDots = function (curSlide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((item) => item.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${curSlide}"]`)
      .classList.add("dots__dot--active");
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activeDots(currentSlide);
  };
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
    activeDots(currentSlide);
  };

  const init = function () {
    goToSlide(0);

    createDots();
    activeDots(0);
  };
  init();
  btnNextSlide.addEventListener("click", nextSlide);
  btnPrevSlide.addEventListener("click", prevSlide);
  document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });
  dotsContainer.addEventListener("click", (e) => {
    const dot = e.target.closest(".dots__dot");

    if (!dot) return;
    const slideId = dot.dataset.slide;
    goToSlide(slideId);
    activeDots(slideId);
  });
};
sliders();
/*----- footer -----------*/
serviceContainer.addEventListener("click", (e) => {
  const btnFooter = e.target.closest(".footer__contetnt--btn");
  if (!btnFooter) return;

  const id = btnFooter.dataset.tab;
  footerItem.forEach((item, i) => {
    if (id == i + 1) {
      item.classList.toggle("active");
      btnFooter.classList.toggle("active");
    }
  });
});
/*------ section ----*/
const scrollSection = function (entries, observe) {
    const [entry]=entries
    if(!entry.isIntersecting)return;
    entry.target.classList.remove('section--hidden')

    observe.unobserve(entry.target)

};
const sectionObserve = new IntersectionObserver(scrollSection, {
  root: null,
  threshold: 0,
});
section.forEach((i) => {
  sectionObserve.observe(i);
});
