$(document).ready(function() {
  // Toggle active class on click for appropriate screen sizes
  $(".wrapper ul li a").on("click", function(e) {
    e.preventDefault();
    var li = $(this).parent("li");
    var screenWidth = $(window).width();
    
    if (screenWidth >= 280 && screenWidth <= 800) {
      li.toggleClass("active");
    }
  });

  // Hide tooltip when clicking outside
  $(document).on("click", function(e) {
    if (!$(e.target).closest(".tooltip, .wrapper ul li a").length) {
      $(".wrapper ul li").removeClass("active");
    }
  });
});


function myMenuFunction() {
  var i = document.getElementById("navMenu");

  if(i.className === "nav-menu") {
    i.className += " responsive";
  } else {
      i.className = "nav-menu";
  }
}

  document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".custom-dropdown");

    dropdowns.forEach(function (dropdown) {
      const selected = dropdown.querySelector(".dropdown-selected");
      const options = dropdown.querySelector(".dropdown-options");

      selected.addEventListener("click", function () {
        dropdown.classList.toggle("active");
      });

      options.addEventListener("click", function (event) {
        if (event.target.classList.contains("dropdown-option")) {
          const value = event.target.getAttribute("data-value");
          const text = event.target.textContent;
          
          selected.textContent = text;
          dropdown.querySelector("input[type='hidden']").value = value;
          dropdown.classList.remove("active");
        }
      });
    });
  });



  document.addEventListener("DOMContentLoaded", function () {
    const aboutModelLink = document.getElementById('aboutModelLink');
    const conciseTooltip = document.querySelector('.tooltip-small');
    const largeTooltip = document.querySelector('.tooltip');
  
    // Add an event listener to the link to toggle the tooltip on click
    aboutModelLink.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default link behavior
  
      // Check if the screen width is smaller than 653px (adjust as needed)
      if (window.innerWidth <= 653) {
        // Toggle the visibility of the concise tooltip for smaller screens
        conciseTooltip.style.opacity = conciseTooltip.style.opacity === '1' ? '0' : '1';
  
        // Ensure the large tooltip is hidden
        largeTooltip.style.opacity = '0';
      } else {
        // Toggle the visibility of the large tooltip for larger screens
        largeTooltip.style.opacity = largeTooltip.style.opacity === '1' ? '0' : '1';
  
        // Ensure the concise tooltip is hidden
        conciseTooltip.style.opacity = '0';
      }
    });
  });

  
  // Function to show the result card
function showResultCard(predictionText) {
    var resultCard = document.querySelector('#result-card');
    var predictionParagraph = document.querySelector('.result p');

    // Set the prediction_text content
    predictionParagraph.textContent = predictionText;

    resultCard.style.display = 'block';
}

// Function to close the result card
function closeResultCard() {
    var resultCard = document.querySelector('#result-card');
    resultCard.style.display = 'none';
}

function predict() {
    var formData = new FormData(document.querySelector('form'));
    fetch('/estimate', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        if (data.hasOwnProperty('prediction_text')) {
            showResultCard(data.prediction_text);
        } else if (data.hasOwnProperty('error')) {
            showResultCard(data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Event listener for the close button (outside the .then() block)
    var closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', closeResultCard);
}
