// United Nations Homepage Clone Interactions

document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupLanguageSwitcher();
  setupWhatWeDoCarousel();
  setupAudioPlayer();
  setupSearchForm();
});

// Mobile menu toggle
function setupMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
}

// 1. Language Switcher active state toggle
function setupLanguageSwitcher() {
  const langLinks = document.querySelectorAll('.languages a');
  langLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      langLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      console.log(`Language switched to: ${link.textContent} (${link.getAttribute('lang')})`);
    });
  });
}

// 2. What We Do Section Slider / Carousel
function setupWhatWeDoCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const bullets = document.querySelectorAll('.bullet-item');
  const dots = document.querySelectorAll('.dot');
  const overlayText = document.querySelector('.slide-overlay-text');
  
  const slideTitles = [
    "Maintain International Peace and Security",
    "Protect Human Rights",
    "Deliver Humanitarian Aid",
    "Promote Sustainable Development",
    "Uphold International Law"
  ];
  
  let currentSlide = 0;
  let carouselInterval;

  function goToSlide(index) {
    // Remove active state
    slides[currentSlide].classList.remove('active');
    bullets[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Set new slide
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    bullets[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    overlayText.textContent = slideTitles[currentSlide];
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    goToSlide(next);
  }

  function startAutoplay() {
    carouselInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    clearInterval(carouselInterval);
  }

  // Event Listeners for Bullets
  bullets.forEach(bullet => {
    bullet.addEventListener('click', () => {
      stopAutoplay();
      const index = parseInt(bullet.getAttribute('data-slide'));
      goToSlide(index);
      startAutoplay();
    });
  });

  // Event Listeners for Dots
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopAutoplay();
      const index = parseInt(dot.getAttribute('data-slide'));
      goToSlide(index);
      startAutoplay();
    });
  });

  // Start rotation
  startAutoplay();
}

// 3. Simulated Podcast Audio Player
function setupAudioPlayer() {
  const playBtn = document.querySelector('.audio-play-pause-btn');
  const playIcon = playBtn.querySelector('.play-icon');
  const pauseIcon = playBtn.querySelector('.pause-icon');
  const progressBar = document.querySelector('.audio-progress-bar');
  const progressThumb = document.querySelector('.audio-progress-thumb');
  const progressContainer = document.querySelector('.audio-progress-container');
  const timeDisplay = document.querySelector('.audio-time');
  
  const totalDuration = 2832; // 47 minutes and 12 seconds in seconds
  let currentProgressSeconds = 0;
  let isPlaying = false;
  let playbackInterval;

  function formatTime(secs) {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  function updateUI() {
    const percentage = (currentProgressSeconds / totalDuration) * 100;
    progressBar.style.width = `${percentage}%`;
    progressThumb.style.left = `${percentage}%`;
    timeDisplay.textContent = `${formatTime(currentProgressSeconds)} / ${formatTime(totalDuration)}`;
  }

  function togglePlay() {
    if (isPlaying) {
      // Pause
      isPlaying = false;
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
      clearInterval(playbackInterval);
    } else {
      // Play
      isPlaying = true;
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
      
      playbackInterval = setInterval(() => {
        if (currentProgressSeconds < totalDuration) {
          currentProgressSeconds++;
          updateUI();
        } else {
          togglePlay(); // End of audio, pause
          currentProgressSeconds = 0;
          updateUI();
        }
      }, 1000);
    }
  }

  playBtn.addEventListener('click', togglePlay);

  // Click on progress bar to scrub
  progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));
    
    currentProgressSeconds = Math.floor(percentage * totalDuration);
    updateUI();
  });
}

// 4. Search form handler
function setupSearchForm() {
  const form = document.querySelector('.search-form');
  const input = document.querySelector('.search-input');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value.trim()) {
      alert(`Simulated Search for: "${input.value}"\nIn a live environment, this would query the United Nations search database.`);
      input.value = '';
    }
  });
}
