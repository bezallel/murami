const icons = document.querySelectorAll('.icon');
const contentBlocks = document.querySelectorAll('.content-block');
const body = document.body;

// Section activation (unchanged)
function activateSection(id) {
  const targetBlock = document.querySelector(`.content-block[data-id="${id}"]`);
  const currentBlock = document.querySelector('.content-block.active');

  icons.forEach(i => i.classList.remove('active'));
  document.querySelectorAll('a[data-location]').forEach(link => link.classList.remove('active'));

  setTimeout(() => {
    document.querySelector(`.icon[data-location="${id}"]`)?.classList.add('active');
    document.querySelector(`a[data-location="${id}"]`)?.classList.add('active');
  }, 50);

  if (currentBlock && currentBlock !== targetBlock) {
    currentBlock.classList.remove('active');
    currentBlock.classList.add('fading-out');

    setTimeout(() => {
      currentBlock.classList.remove('fading-out');
      if (targetBlock) targetBlock.classList.add('active');
    }, 500);
  } else if (!currentBlock && targetBlock) {
    targetBlock.classList.add('active');
  }

  body.setAttribute('data-theme', `theme-${id}`);
}

// Hook up icons
icons.forEach(icon => {
  icon.addEventListener('click', () => {
    const id = parseInt(icon.getAttribute('data-location'));
    activateSection(id);
  });
});

// Hook up nav links
document.querySelectorAll('a[data-location]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const id = parseInt(link.getAttribute('data-location'));
    activateSection(id);
  });
});

// Auto-activate section 1
document.addEventListener('DOMContentLoaded', () => {
  activateSection(1);
});

// Make logo click go to Hero (Section 1)
document.querySelector('.logo').addEventListener('click', () => {
  activateSection(1);
});







// --- DRAGGABLE SNAP-BACK FOR HOW-STEP TILES ---
document.querySelectorAll('.how-step').forEach(tile => {
  let startX = 0, startY = 0, offsetX = 0, offsetY = 0, dragging = false;

  // Smooth glide back
  tile.style.transition = 'transform 0.6s cubic-bezier(.25,1.5,.5,1)';

  const onDown = (e) => {
    dragging = true;
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    startY = (e.touches ? e.touches[0].clientY : e.clientY);
    offsetX = 0;
    offsetY = 0;

    tile.style.transition = 'none'; // disable while dragging
  };

  const onMove = (e) => {
    if (!dragging) return;
    const x = (e.touches ? e.touches[0].clientX : e.clientX);
    const y = (e.touches ? e.touches[0].clientY : e.clientY);

    offsetX = x - startX;
    offsetY = y - startY;

    tile.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  };

  const onUp = () => {
    if (!dragging) return;
    dragging = false;

    // Snap back with a springy feel
    tile.style.transition = 'transform 0.6s cubic-bezier(.25,1.5,.5,1)';
    tile.style.transform = 'translate(0, 0)';
  };

  // Mouse + touch listeners
  tile.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);

  tile.addEventListener('touchstart', onDown, { passive: true });
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('touchend', onUp);
});


// MATRIX


document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('matrix');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const matrix = letters.split('');
  const fontSize = 16;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const columns = () => Math.floor(canvas.width / fontSize);
  let drops = Array(columns()).fill(1);

  function draw() {
    if (!document.body.getAttribute('data-theme')?.includes('theme-1')) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00F';
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
      const text = matrix[Math.floor(Math.random() * matrix.length)];
      ctx.fillText(text, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  setInterval(draw, 50);
});




// MATRIX END




// HIGHLIGHTS

document.addEventListener("DOMContentLoaded", function () {
  const testimonials = [
    "Ajah offers quick access to the Lekki-Epe Expressway and several malls.",
    "Yaba is a tech hub with good schools and easy access to the mainland.",
    "Victoria Island has high-rise luxury apartments near top restaurants.",
    "Ikeja GRA offers quieter neighborhoods with proximity to the airport.",
    "Surulere has plenty of markets, schools, and central road networks.",
    "Ikorodu offers lower rents with improving road connectivity."
  ];

  let testimonialIndex = 0;
  const testimonialBox = document.getElementById("testimonial-box");
  const testimonialText = document.getElementById("testimonial-text");

  function showTestimonial() {
  // Fade out the text smoothly
  testimonialText.style.transition = 'opacity 0.5s ease';
  testimonialText.style.opacity = 0;

  // After fade-out is done, swap text and fade back in
  setTimeout(() => {
    testimonialText.textContent = testimonials[testimonialIndex];
    testimonialText.style.opacity = 1;
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  }, 800);
}


  // Rotate testimonials every 4 seconds
  showTestimonial();
  setInterval(showTestimonial, 4000);

  // Observe Section 4 to show/hide testimonials
  const section4 = document.querySelector('.content-block[data-id="4"]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        testimonialBox.classList.add("show");
      } else {
        testimonialBox.classList.remove("show");
      }
    });
  }, { threshold: 0.5 }); // Show only when at least 50% visible

  if (section4) observer.observe(section4);


  const sliders = document.querySelectorAll('.slider-track');

  sliders.forEach(track => {
    const slides = Array.from(track.children);
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      track.appendChild(clone);
    });
  });
});











// ESTIMATOR JS

// DROPDOWN LOGIC
document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".custom-dropdown");
  dropdowns.forEach(dropdown => {
    const selected = dropdown.querySelector(".dropdown-selected");
    const options = dropdown.querySelector(".dropdown-options");
    const arrow = selected.querySelector(".icon-arrow"); // Keep reference to icon

    selected.addEventListener("click", (e) => {
      dropdowns.forEach(d => {
        if (d !== dropdown) d.classList.remove("active"); // Close others
      });
      dropdown.classList.toggle("active");
      e.stopImmediatePropagation(); // Allow outside listener to work
    });

    options.addEventListener("click", e => {
      if (e.target.classList.contains("dropdown-option")) {
        dropdown.querySelector("input[type='hidden']").value = e.target.dataset.value;

        // Update ONLY the text, keep arrow intact
        selected.childNodes[0].textContent = e.target.textContent + " ";

        dropdown.classList.remove("active");
      }
    });
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", (e) => {
    document.querySelectorAll(".custom-dropdown.active").forEach(dropdown => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });
  });
});




// PREDICTION LOGIC

function showResultCard(text, isLoading = false) {
  const overlay = document.getElementById('blur-overlay');
  const card = document.getElementById('result-card');
  const prediction = document.getElementById('prediction-text');
  const spinner = document.getElementById('loading-spinner');

  overlay.style.display = 'block';
  card.style.display = 'block';

  if (isLoading) {
    prediction.style.display = 'none';
    spinner.style.display = 'block';
  } else {
    spinner.style.display = 'none';
    prediction.textContent = text;
    prediction.style.display = 'block';
  }
}

function closeResultCard() {
  document.getElementById('blur-overlay').style.display = 'none';
  document.getElementById('result-card').style.display = 'none';
}

function resetCustomDropdowns() {
  const dropdowns = document.querySelectorAll('.custom-dropdown');
  dropdowns.forEach(dropdown => {
    const selected = dropdown.querySelector('.dropdown-selected');
    const hiddenInput = dropdown.querySelector("input[type='hidden']");
    selected.textContent = 'Select Option'; // Adjust placeholder if needed
    hiddenInput.value = '';
  });
}


function predict() {
  const form = document.getElementById('estimator-form');
  const formData = new FormData(form);

  let hasMissing = false;

  // Clear previous error state classes
  document.querySelectorAll('.input-box, .custom-dropdown').forEach(el => {
    el.classList.remove('error');
  });

  // Check for missing inputs
  form.querySelectorAll("input[type='hidden'], select, input[type='number']").forEach(input => {
    if (!input.value) {
      hasMissing = true;
      // ⚠️ Prioritize styling the .custom-dropdown if it exists
      const wrapper = input.closest('.custom-dropdown') || input.closest('.input-box');
      if (wrapper) wrapper.classList.add('error');
    }
  });

  if (hasMissing) {
    showResultCard('Oops! Looks like you left something out... Please complete your selection.', false);
    return;
  }

  // Show spinner before sending request
  showResultCard('', true);
  const startTime = Date.now();

  fetch('/estimate', {
    method: 'POST',
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 1200 - elapsed);

      setTimeout(() => {
        showResultCard(data.error || data.prediction_text, false);
        form.reset();                // ✅ Reset form inputs
        resetCustomDropdowns();      // ✅ Reset dropdown UI
      }, remaining);
    })
    .catch(() => {
      setTimeout(() => {
        showResultCard('Error occurred.', false);
      }, 1200);
    });
}

// 🟢 Remove error class when user starts interacting
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener('input', () => {
      const wrapper = el.closest('.custom-dropdown') || el.closest('.input-box');
      if (wrapper) wrapper.classList.remove('error');
    });
  });
});







 