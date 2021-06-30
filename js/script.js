"use strict";
window.addEventListener("DOMContentLoaded", () => {
  function Navigation() {
    let navItem = document.querySelectorAll(".header__link");

    navItem.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        navItem.forEach((item) => item.classList.remove("header__item--active"));
        e.target.classList.add("header__item--active");

        const id = item.getAttribute("href");
        document.querySelector(id).scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    });
  }

  Navigation();

  function NavigationMobile() {
    const burger = document.querySelector("#burger-content");
    const burgerItem = document.querySelectorAll(".header__burger-box");
    const burgerIconOpen = document.querySelector("#burger-content");
    let count = 0;
    burger.addEventListener("click", (e) => {
      e.preventDefault();
      if (count == 0) {
        document.querySelector(".header__burger-content").style.bottom = "50px";
        burgerIconOpen.innerHTML = `<i class="fas fa-times"></i>`;
        count++;
      } else {
        document.querySelector(".header__burger-content").style.bottom = "-100px";
        burgerIconOpen.innerHTML = `<i class="fas fa-bars"></i>`;
        count--;
      }
    });

    burgerItem.forEach((item) => {
      item.addEventListener("click", (e) => {
        document.querySelector(".header__burger-content").style.bottom = "-100px";
        burgerIconOpen.innerHTML = `<i class="fas fa-bars"></i>`;
        count--;
        const id = e.target.getAttribute("data-item");
        document.querySelector(`#${id}`).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }

  NavigationMobile();

  function toggleTheme() {
    const buttonTheme = document.querySelectorAll("[data-theme]");
    const changeIconTheme = document.querySelectorAll("[data-icon]");
    if (localStorage.getItem("dark-theme")) {
      document.body.classList.add("light");
      changeIconTheme.forEach((item) => {
        item.innerHTML = `<i class="fas fa-sun"></i>`;
        document.querySelector(".footer__link").classList.remove = "";
        document.querySelector(".footer__link").classList.add = "";
      });
      document.querySelector(".footer").style.backgroundColor = "#6C55E0";
    } else {
      document.body.classList.add("dark");
    }

    buttonTheme.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();

        if (document.body.classList.contains("dark")) {
          localStorage.setItem("dark-theme", "1");
          document.body.classList.remove("dark");
          document.body.classList.add("light");
          changeIconTheme.forEach((item) => {
            item.innerHTML = `<i class="fas fa-sun"></i>`;
          });
          document.querySelector(".footer").style.backgroundColor = "#6C55E0";

          return;
        }

        if (document.body.classList.contains("light")) {
          localStorage.setItem("dark-theme", "");
          document.body.classList.remove("light");
          document.body.classList.add("dark");
          changeIconTheme.forEach((item) => {
            item.innerHTML = `<i class="far fa-moon"></i>`;
          });
          document.querySelector(".footer").style.backgroundColor = "#100E1A";

          inputs.forEach((item) => {
            item.classList.remove("input__light");
            item.classList.add("input__dark");
          });
          return;
        }
      });
    });
  }
  toggleTheme();

  function replaceTextHeader() {
    const text = document.querySelector(".header__title");
    const clearMessage = [];

    const addMessageOne = Array.from("Привет, я Родион 👋 ");
    const addMessageTwo = Array.from(" Изучаю Frontend каждый день 💻 ");
    const addMessageThree = Array.from("Хочу стать крутым разработчиком 😎 ");

    let addMessageNumber = 0;
    let count = -1;
    let circle = 0;

    function clearText() {
      clearMessage.pop();

      if (clearMessage.length == 0) {
        count++;
        addMessageNumber = 0;
      }
    }

    function addText(arr, number) {
      clearMessage.push(arr[addMessageNumber]);
      addMessageNumber++;

      if (addMessageNumber == arr.length) {
        count += number;
        addMessageNumber = 0;
        circle++;
      }
    }

    setInterval(() => {
      if (count == -1) {
        if (clearMessage.length > 0 && circle != 0) {
          clearMessage.pop();
          if (clearMessage.length == 0) {
            circle = 0;
          }
        } else {
          addText(addMessageOne, 1);
        }
      }

      if (count == 0) {
        clearText();
      }

      if (count == 1) {
        addText(addMessageTwo, 1);
      }

      if (count == 2) {
        clearText();
      }

      if (count == 3) {
        addText(addMessageThree, -4);
      }

      text.innerHTML = `${clearMessage.join("")}|`;
    }, 120);
  }

  replaceTextHeader();

  function Border() {
    function randomBorder() {
      let arrBorder = ["50% 50% 33% 67% / 56% 37% 63% 44% ", "60% 40% 54% 46% / 38% 58% 42% 62%", "80% 20% 70% 30% / 23% 75% 25% 77%", "50% 50% 23% 77% / 29% 35% 65% 71% "];
      let index = 0;
      return function () {
        document.querySelector(".header__block-img").style.borderRadius = arrBorder[index];
        index++;
        if (index == 3) {
          index = 0;
        }
      };
    }

    const changeBorder = randomBorder();

    setInterval(changeBorder, 1000);
  }

  Border();

  function ProgressBar(item, lastPercent, time) {
    const element = document.querySelectorAll(".skills__progress--active")[item];
    const elementNumber = document.querySelectorAll(".skills__number")[item];
    const timerId = setInterval(test, time);
    let elementProgress = 0;

    function test() {
      if (elementProgress == lastPercent) {
        clearInterval(timerId);
      }
      elementNumber.textContent = elementProgress + "%";
      element.style.width = `${elementProgress}%`;
      elementProgress++;
    }
  }

  function SliderTehnology() {
    const rightArrow = document.querySelector(".skills__slider-next");
    const leftArrow = document.querySelector(".skills__slider-prev");
    const spinnerBlock = document.querySelector(".skills__slider-inner");
    const slider = document.querySelector(".skills__slider-container");
    const widthSlider = 800 - +window.getComputedStyle(slider).width.split("").splice(0, 3).join("");
    let transform = 0;

    function SliderTehnologyMove(event, step, lastPos, mainArrow, secondArrow) {
      event.preventDefault();
      transform = transform + step;
      if (transform === lastPos) {
        mainArrow.setAttribute("disabled", "disabled");
        mainArrow.classList.add("disabled");
      }
      if (secondArrow.classList.contains("disabled")) {
        secondArrow.removeAttribute("disabled", "disabled");
        secondArrow.classList.remove("disabled");
      }

      spinnerBlock.style.transform = `translateX(-${transform}px)`;
    }

    rightArrow.addEventListener("click", (event) => {
      SliderTehnologyMove(event, 100, widthSlider, rightArrow, leftArrow);
    });

    leftArrow.addEventListener("click", (event) => {
      SliderTehnologyMove(event, -100, 0, leftArrow, rightArrow);
    });
  }

  SliderTehnology();

  function SliderPortfoli() {
    const prev = document.querySelector(".portfolio__prev");
    const next = document.querySelector(".portfolio__next");
    const slider = document.querySelectorAll(".portfolio__content");
    const dots = document.querySelectorAll(".portfolio__dot");
    let slide = 0;
    let animate = "";

    function SliderMove(nameButton) {
      slider.forEach((item) => item.classList.add("none"));
      dots.forEach((item) => item.classList.remove("portfolio__dot--active"));

      if (nameButton == "next") {
        animate = "animate__slideInRight";
        slide++;
      }
      if (nameButton == "prev") {
        animate = "animate__slideInLeft";
        slide--;
      }

      if (slide < 0) {
        slide = slider.length - 1;
      }

      if (slide > slider.length - 1) {
        slide = 0;
      }

      slider[slide].classList.remove("none");
      RemoveAnim();

      slider[slide].classList.add(animate);
      dots[slide].classList.add("portfolio__dot--active");
    }

    function Navigation(e) {
      dots.forEach((item) => item.classList.remove("portfolio__dot--active"));

      e.target.classList.add("portfolio__dot--active");

      slider.forEach((item) => item.classList.add("none"));

      slide = e.target.getAttribute("data-id");

      RemoveAnim();

      slider[slide].classList.remove("none");
      slider[slide].classList.add("animate__slideInDown");
    }

    function RemoveAnim() {
      if (slider[slide].classList.contains("animate__slideInDown")) {
        slider[slide].classList.remove("animate__slideInDown");
      }

      if (slider[slide].classList.contains("animate__slideInLeft")) {
        slider[slide].classList.remove("animate__slideInLeft");
      }

      if (slider[slide].classList.contains("animate__slideInRight")) {
        slider[slide].classList.remove("animate__slideInRight");
      }
    }

    dots.forEach((item) => item.addEventListener("click", (e) => Navigation(e)));
    prev.addEventListener("click", () => SliderMove("prev"));
    next.addEventListener("click", () => SliderMove("next"));
  }

  SliderPortfoli();

  function buttonHoverSlider() {
    const button = document.querySelectorAll("[data-sliderBtn]");

    button.forEach((item) => {
      item.addEventListener("mousemove", (e) => {
        if (e.target && e.target.tagName == "A") {
          e.target.querySelector("i").classList.add("button-move");
        } else {
          e.target.classList.add("button-move");
        }
      });
      item.addEventListener("mouseleave", (e) => {
        if (e.target && e.target.tagName == "A") {
          e.target.querySelector("i").classList.remove("button-move");
        } else {
          e.target.classList.remove("button-move");
        }
      });
    });
  }

  buttonHoverSlider();

  function Scroll() {
    const header = document.querySelector("header");
    const skills = document.querySelector("#skills");
    const qualification = document.querySelector("#qualification");
    let count = 0;
    let count2 = 0;

    function ActiveSkills() {
      let scrollTop = window.scrollY;
      let skillsHeightTop = skills.offsetTop - header.offsetHeight;
      if (scrollTop >= skillsHeightTop + skills.offsetHeight / 2 && count == 0) {
        skills.classList.remove("opacity");
        skills.classList.add("animate__animated", "animate__fadeInLeft");
        ProgressBar(0, 90, 20);
        ProgressBar(1, 80, 22);
        ProgressBar(2, 70, 24);
        ProgressBar(3, 50, 33);
        count++;
      }
    }

    function ActiveQulification() {
      let scrollTop = window.scrollY;
      let qualificationHeightTop = qualification.offsetTop - header.offsetHeight;
      if (scrollTop >= qualificationHeightTop + qualification.offsetHeight / 2 && count2 === 0) {
        qualification.classList.remove("opacity");
        qualification.classList.add("animate__animated", "animate__fadeInRight");
      }
    }

    function ProgressScroll() {
      const elem = document.querySelector(".scroll-progress");
      let windowScroll = document.documentElement.scrollTop;
      let windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      let progress = Math.floor((windowScroll / windowHeight) * 100);
      elem.style.width = `${progress}%`;
      const navBar = document.querySelectorAll(".header__link");

      function nav() {
        navBar.forEach((item) => item.classList.remove("header__item--active"));
      }

      function navCondition(index) {
        nav();
        navBar[index].classList.add("header__item--active");
      }

      if (progress < 20) {
        navCondition(0);
      } else if (progress > 20 && progress < 40) {
        navCondition(1);
      } else if (progress > 40 && progress < 60) {
        navCondition(2);
      } else if (progress > 60 && progress < 80) {
        navCondition(3);
      } else if (progress > 80 && progress < 90) {
        navCondition(4);
      } else if (progress > 90) {
        navCondition(5);
      }
    }

    ProgressScroll();
    ActiveSkills();
    ActiveQulification();

    window.addEventListener("scroll", () => {
      if (document.body.offsetWidth > 768) {
        ProgressScroll();
      }
      ActiveSkills();
      ActiveQulification();

      if (window.innerHeight <= 800 && window.innerHeight > 500) {
        document.querySelector("main").style.marginTop = "100px";
      } else if (window.innerHeight < 500) {
        document.querySelector("main").style.marginTop = "400px";
      } else {
        document.querySelector("main").style.marginTop = "0px";
      }
    });
  }

  Scroll();

  function ContactButton() {
    const button = document.querySelector(".header__text").querySelector(".button");
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  ContactButton();
});
