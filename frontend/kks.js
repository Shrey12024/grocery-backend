
// main loader
const percentText = document.getElementById("percent");
const leftPanel = document.getElementById("leftPanel");
const rightPanel = document.getElementById("rightPanel");
const loader = document.getElementById("loader");
const mainContent = document.getElementById("mainContent");

let percent = 0;

const loading = setInterval(() => {
  percent++;
  percentText.textContent = percent + "%";

  const moveX = percent; // percent == how far to slide
  leftPanel.style.transform = `translateX(-${moveX}%)`;
  rightPanel.style.transform = `translateX(${moveX}%)`;

  if (percent >= 100) {
    clearInterval(loading);

    setTimeout(() => {
      loader.style.display = "none";
      leftPanel.style.display = "none";
      rightPanel.style.display = "none";
      mainContent.style.display = "block";
      document.body.style.overflow = "auto";
    }, 500);
  }
}, 20);

// loader end


// header start


 
    
    // Aap yeh results ek dropdown ya container mein show bhi kar sakte ho
  



// Variables to track cart and wishlist counts
let cart = 0, wishlist = 0;

// Toggle the search bar visibility
function toggleSearch() {
  const bar = document.getElementById('searchBar');
  bar.style.display = (bar.style.display === 'block') ? 'none' : 'block';
}

// Search action when pressing Enter

  const sampleProducts = [
    "Tomato", "Potato", "Carrot", "Onion", "Cucumber", "Cabbage"
  ];

  function searchAction(event) {
    const keyword = event.target.value.toLowerCase();

    // Filter matching products
    const results = sampleProducts.filter(product =>
      product.toLowerCase().includes(keyword)
    );

    // Show results (console log or DOM render)
    console.log("Results:", results);

    // Optional: Show in alert for testing
    if (keyword.length > 0) {
      alert("Results:\n" + results.join('\n'));
    }
  }

// Increment cart or wishlist count
function increment(type) {
  if (type === 'cart') {
    cart++;
    document.getElementById('cartCount').innerText = cart;
    document.getElementById('cartCountMobile').innerText = cart;
  } else if (type === 'wishlist') {
    wishlist++;
    document.getElementById('wishlistCount').innerText = wishlist;
    document.getElementById('wishlistCountMobile').innerText = wishlist;
  }
}

// Open mobile drawer
document.getElementById('openDrawer').onclick = function () {
  document.getElementById('drawer').classList.add('open');
}

// Close mobile drawer
document.getElementById('closeDrawer').onclick = function () {
  document.getElementById('drawer').classList.remove('open');
}

// Toggle submenu for drawer
function toggleSubmenu(elem) {
  let submenu = elem.nextElementSibling;
  submenu.classList.toggle('open');
}

// Show selected tab content in mobile drawer
function showTab(tab) {
  document.getElementById('menuTab').classList.toggle('d-none', tab !== 'menu');
  document.getElementById('categoriesTab').classList.toggle('d-none', tab !== 'categories');
  let buttons = document.querySelectorAll('.tabs button');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (tab === 'menu') {
    buttons[0].classList.add('active');
  } else {
    buttons[1].classList.add('active');
  }
}
function toggleMobileSearch() {
  const bar = document.getElementById('mobileSearchBar');
  bar.style.display = bar.style.display === 'block' ? 'none' : 'block';
}



// slider js 


  const slider = document.getElementById('slider');
  const slides = slider.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let currentIndex = 1;

  // Clone first and last slide
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  firstClone.id = 'first-clone';
  lastClone.id = 'last-clone';
  slider.appendChild(firstClone);
  slider.insertBefore(lastClone, slides[0]);

  let allSlides = slider.querySelectorAll('.slide');

  function updateSlidePosition() {
    const slideWidth = allSlides[0].getBoundingClientRect().width;
    slider.style.transition = 'none';
    slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }

  window.addEventListener("resize", updateSlidePosition);
  window.addEventListener("load", () => {
    updateSlidePosition();
    startAutoSlide();
  });

  function moveToNextSlide() {
    const slideWidth = allSlides[0].getBoundingClientRect().width;
    if (currentIndex >= allSlides.length - 1) return;
    currentIndex++;
    slider.style.transition = "transform 0.8s ease-in-out";
    slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }

  function moveToPrevSlide() {
    const slideWidth = allSlides[0].getBoundingClientRect().width;
    if (currentIndex <= 0) return;
    currentIndex--;
    slider.style.transition = "transform 0.8s ease-in-out";
    slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  }

  slider.addEventListener("transitionend", () => {
    const slideWidth = allSlides[0].getBoundingClientRect().width;
    const currentSlide = allSlides[currentIndex];
    if (currentSlide.id === 'first-clone') {
      slider.style.transition = "none";
      currentIndex = 1;
      slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
    if (currentSlide.id === 'last-clone') {
      slider.style.transition = "none";
      currentIndex = allSlides.length - 2;
      slider.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
    }
  });

  nextBtn.addEventListener("click", () => {
    moveToNextSlide();
    resetInterval();
  });

  prevBtn.addEventListener("click", () => {
    moveToPrevSlide();
    resetInterval();
  });

  let slideInterval;

  function startAutoSlide() {
    slideInterval = setInterval(() => {
      moveToNextSlide();
    }, 5000);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startAutoSlide();
  }



// end slider 



// testimonial

const swiper = new Swiper(".testimonial-swiper", {
  loop: true,
  spaceBetween: 20,
  observer: true,
  observeParents: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 2,
    },
  },
});




// test

function searchAction(event) {
  const keyword = event.target.value.toLowerCase();
  const results = sampleProducts.filter(product =>
    product.toLowerCase().includes(keyword)
  );

  const resultBox = document.getElementById("searchResults");
  if (keyword.length > 0 && results.length > 0) {
    resultBox.innerHTML = results.map(r => `<div>${r}</div>`).join('');
  } else {
    resultBox.innerHTML = "<div>No results found</div>";
  }
}
