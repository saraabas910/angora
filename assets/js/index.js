
var toggle = document.getElementById("settings-toggle");
var sidebar = document.getElementById("settings-sidebar");
var closeBtn = document.getElementById("close-settings");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");
const toggleBtn = document.getElementById("theme-toggle-button");
const scrollBtn = document.getElementById("scroll-to-top");
const cards = document.querySelectorAll(".testimonial-card");
const carousel = document.getElementById("testimonials-carousel");
const nextBtn = document.getElementById("next-testimonial");
const prevBtn = document.getElementById("prev-testimonial");
var btns = document.getElementsByClassName("portfolio-filter");
var cardss = document.getElementsByClassName("portfolio-item");



/*************************************************************** */ 

var sidebarWidth = 320; 


toggle.style.right = "0px";


function openSidebar() {
  sidebar.classList.remove("translate-x-full");     
  toggle.style.right = sidebarWidth + "px";          
       
}


function closeSidebar() {
  sidebar.classList.add("translate-x-full");       
  toggle.style.right = "0px";                       
}

function toggleSidebar() {
  if (sidebar.classList.contains("translate-x-full")) {
    openSidebar(); 
  } else {
    closeSidebar(); 
  }
}

toggle.addEventListener("click", toggleSidebar);  
closeBtn.addEventListener("click", closeSidebar);



/***************************************************************  */


  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;

      
      if (scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });

  /********************************************************************* */
  
  toggleBtn.addEventListener("click", () => {


    document.documentElement.classList.toggle("dark");
  });
  /************************************************************8888*/ 
  window.addEventListener("scroll", () => {
    if (window.scrollY >5900) {

      scrollBtn.classList.remove("opacity-0", "invisible");
    } else {

      scrollBtn.classList.add("opacity-0", "invisible");
    }
  });

 
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
  /************************************************************8888*/
  let current = 0;


function updateCarousel() {
  const cardWidth = cards[0].offsetWidth; 
  carousel.style.transform = `translateX(${current * cardWidth}px)`;
}


nextBtn.addEventListener("click", () => {

  if (current < cards.length - 1) {

    current++;


    updateCarousel();
  }
});


prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    updateCarousel();
  }
});

/************************************************************8888*/
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function (e) {

    var type = e.target.getAttribute("data-filter");

    for (var j = 0; j < cardss.length; j++) {
      if (type == "all") {

        cardss[j].style.display = "block";
      } 
      else if (cardss[j].getAttribute("data-category") == type) {

        cardss[j].style.display = "block";
      } 
      else {
        cardss[j].style.display = "none";
      }
    }

  });
}