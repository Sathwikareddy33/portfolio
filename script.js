document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     LOADER
  ========================= */

  const loader = document.getElementById("loader");

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.style.opacity = "0";

      setTimeout(() => {
        loader.style.display = "none";
      }, 500);

    }, 800);
  });

  /* =========================
     THEME TOGGLE
  ========================= */

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");

  const savedTheme = localStorage.getItem("theme");

  if(savedTheme === "light"){
    document.body.classList.add("light-mode");
    themeIcon.className = "fas fa-sun";
  }

  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const isLight =
      document.body.classList.contains("light-mode");

    themeIcon.className =
      isLight
      ? "fas fa-sun"
      : "fas fa-moon";

    localStorage.setItem(
      "theme",
      isLight ? "light" : "dark"
    );

  });

  /* =========================
     MOBILE MENU
  ========================= */

  const menuBtn =
    document.getElementById("menuBtn");

  const navLinks =
    document.getElementById("navLinks");

  const overlay =
    document.getElementById("mobileOverlay");

  function toggleMenu(){

    navLinks.classList.toggle("active");
    overlay.classList.toggle("active");

    const icon =
      menuBtn.querySelector("i");

    icon.className =
      navLinks.classList.contains("active")
      ? "fas fa-times"
      : "fas fa-bars";
  }

  menuBtn.addEventListener(
    "click",
    toggleMenu
  );

  overlay.addEventListener(
    "click",
    toggleMenu
  );

  document
  .querySelectorAll(".nav-links a")
  .forEach(link => {

    link.addEventListener("click", () => {

      if(navLinks.classList.contains("active")){
        toggleMenu();
      }

    });

  });

  /* =========================
     NAVBAR SCROLL
  ========================= */

  const navbar =
    document.getElementById("navbar");

  window.addEventListener("scroll", () => {

    if(window.scrollY > 50){
      navbar.classList.add("navbar-scrolled");
    }else{
      navbar.classList.remove("navbar-scrolled");
    }

  });

  /* =========================
     TYPING EFFECT
  ========================= */

  const typing =
    document.getElementById("typing");

  const words = [
    "Full Stack Developer",
    "React Developer",
    "Java Programmer",
    "Computer Science graduate",
    "Problem Solver"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeEffect(){

    const current =
      words[wordIndex];

    if(!deleting){

      typing.textContent =
      current.substring(0,charIndex+1);

      charIndex++;

      if(charIndex === current.length){

        deleting = true;

        setTimeout(
          typeEffect,
          1500
        );

        return;
      }

    }else{

      typing.textContent =
      current.substring(0,charIndex-1);

      charIndex--;

      if(charIndex === 0){

        deleting = false;

        wordIndex =
        (wordIndex+1) %
        words.length;

      }

    }

    setTimeout(
      typeEffect,
      deleting ? 60 : 120
    );
  }

  typeEffect();

  /* =========================
     REVEAL ANIMATION
  ========================= */

  const reveals =
    document.querySelectorAll(".reveal");

  function reveal(){

    reveals.forEach(el => {

      const top =
      el.getBoundingClientRect().top;

      if(top < window.innerHeight - 100){

        el.classList.add("active");

      }

    });

  }

  window.addEventListener(
    "scroll",
    reveal
  );

  reveal();

  /* =========================
     COUNTERS
  ========================= */

  const counters =
    document.querySelectorAll(".counter");

  let counterStarted = false;

  function runCounters(){

    if(counterStarted) return;

    const stats =
      document.querySelector(".stats");

    const top =
      stats.getBoundingClientRect().top;

    if(top < window.innerHeight){

      counterStarted = true;

      counters.forEach(counter => {

        const target =
        +counter.dataset.target;

        let count = 0;

        const step =
        Math.ceil(target / 80);

        const update = () => {

          count += step;

          if(count >= target){

            counter.innerText =
            target + "+";

          }else{

            counter.innerText =
            count + "+";

            requestAnimationFrame(
              update
            );

          }

        };

        update();

      });

    }

  }

  window.addEventListener(
    "scroll",
    runCounters
  );

  runCounters();

  /* =========================
     ACTIVE NAV LINKS
  ========================= */

  const sections =
    document.querySelectorAll("section[id]");

  const navItems =
    document.querySelectorAll(
      ".nav-links a"
    );

  function activeNav(){

    let current = "";

    sections.forEach(section => {

      const top =
      section.offsetTop - 200;

      const height =
      section.offsetHeight;

      if(
        window.scrollY >= top &&
        window.scrollY < top + height
      ){
        current =
        section.getAttribute("id");
      }

    });

    navItems.forEach(link => {

      link.classList.remove("active");

      if(
        link.getAttribute("href") ===
        "#" + current
      ){
        link.classList.add("active");
      }

    });

  }

  window.addEventListener(
    "scroll",
    activeNav
  );

  /* =========================
     SMOOTH SCROLL
  ========================= */

  document
  .querySelectorAll('a[href^="#"]')
  .forEach(anchor => {

    anchor.addEventListener(
      "click",
      function(e){

        e.preventDefault();

        document
        .querySelector(
          this.getAttribute("href")
        )
        .scrollIntoView({
          behavior:"smooth"
        });

      }
    );

  });

  /* =========================
     BACK TO TOP
  ========================= */

  const topBtn =
    document.getElementById("topBtn");

  window.addEventListener(
    "scroll",
    () => {

      if(window.scrollY > 500){

        topBtn.classList.add("show");

      }else{

        topBtn.classList.remove("show");

      }

    }
  );

  topBtn.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top:0,
        behavior:"smooth"
      });

    }
  );

  /* =========================
     CONTACT FORM
  ========================= */

  const form =
    document.getElementById(
      "contactForm"
    );

  form.addEventListener(
    "submit",
    e => {

      e.preventDefault();

      const name =
      document.getElementById("name");

      const email =
      document.getElementById("email");

      const subject =
      document.getElementById("subject");

      const message =
      document.getElementById("message");

      if(
        name.value.trim()==="" ||
        email.value.trim()==="" ||
        subject.value.trim()==="" ||
        message.value.trim()===""
      ){
        alert(
          "Please fill all fields."
        );
        return;
      }

      alert(
        "Message sent successfully!"
      );

      form.reset();

    }
  );

  /* =========================
     PARTICLE CANVAS
  ========================= */

  const canvas =
    document.getElementById(
      "hero-canvas"
    );

  const ctx =
    canvas.getContext("2d");

  let particles = [];

  function resizeCanvas(){

    canvas.width =
    window.innerWidth;

    canvas.height =
    window.innerHeight;

  }

  resizeCanvas();

  window.addEventListener(
    "resize",
    resizeCanvas
  );

  class Particle{

    constructor(){

      this.x =
      Math.random() *
      canvas.width;

      this.y =
      Math.random() *
      canvas.height;

      this.radius =
      Math.random()*3+1;

      this.dx =
      (Math.random()-0.5);

      this.dy =
      (Math.random()-0.5);

    }

    draw(){

      ctx.beginPath();

      ctx.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Math.PI*2
      );

      ctx.fillStyle =
      "rgba(124,58,237,.6)";

      ctx.fill();

    }

    update(){

      this.x += this.dx;
      this.y += this.dy;

      if(
        this.x < 0 ||
        this.x > canvas.width
      ){
        this.dx *= -1;
      }

      if(
        this.y < 0 ||
        this.y > canvas.height
      ){
        this.dy *= -1;
      }

      this.draw();

    }

  }

  function initParticles(){

    particles = [];

    for(let i=0;i<60;i++){

      particles.push(
        new Particle()
      );

    }

  }

  function animateParticles(){

    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    particles.forEach(p => {

      p.update();

    });

    requestAnimationFrame(
      animateParticles
    );

  }

  initParticles();
  animateParticles();

});