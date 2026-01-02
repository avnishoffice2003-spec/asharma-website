// Data for the Image Carousel (KEEP THIS ONLY ONCE)
// NOTE: You will need to create an 'images' folder and place images named slide1.jpg, slide2.jpg, etc.
const slidesData = [
    {
        image: 'images/slide1.jpg',
        heading: 'Strategic Legal Solutions for Modern Business',
        text: 'Partnering with Small Businesses, Enterprises, and Non-Profits for Growth and Compliance.'
    },
    {
        image: 'images/slide2.jpg',
        heading: 'Mastering Regulatory Compliance: GST, Income Tax & Corporate Law',
        text: 'Actionable advice to minimize risk and maximize financial opportunity.'
    },
    {
        image: 'images/slide3.jpg',
        heading: 'Your Guide to RBI & Foreign Exchange Matters (FDI, ODI, ECB)',
        text: 'Expert consultancy on raising capital and making strategic overseas investments.'
    }
];

// Variable declarations (KEEP THIS ONLY ONCE)
let currentSlideIndex = 0;
const carouselContainer = document.querySelector('.carousel-container');
let indicatorContainer; 

// Function to initialize and render all slides
function createSlides() {
    // Check if the container was found before trying to clear it
    if (!carouselContainer) {
        console.error("Carousel container with class '.carousel-container' not found.");
        return;
    }
    
    carouselContainer.innerHTML = ''; 
    
    // Create container for indicators (dots)
    indicatorContainer = document.createElement('div');
    indicatorContainer.className = 'carousel-indicators';
    carouselContainer.appendChild(indicatorContainer);

    slidesData.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = 'carousel-slide';
        
        // 1. Set the background image
        slideElement.style.backgroundImage = `url(${slide.image})`;
        
        // 2. Add the Hero Content overlay
        slideElement.innerHTML = `
            <div class="hero-content">
                <h2>${slide.heading}</h2>
                <p>${slide.text}</p>
                <a href="contact.html" class="btn btn-primary">Book a Consultation Now</a>
            </div>
        `;

        if (index === 0) {
            slideElement.classList.add('active'); // Set the first slide as active on creation
        }

        carouselContainer.appendChild(slideElement);
        
        // 3. Create the indicator dot
        const indicator = document.createElement('span');
        indicator.className = 'indicator-dot';
        indicator.dataset.index = index;
        if (index === 0) {
            indicator.classList.add('active');
        }
        indicatorContainer.appendChild(indicator);
    });
}

// Function to update the active indicator dot
function updateIndicators() {
    // Check for dots before querying
    const dots = document.querySelectorAll('.indicator-dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentSlideIndex) {
            dot.classList.add('active');
        }
    });
}

// Function to change the slide
function changeSlide() {
    // Check for slides before querying
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return; // Prevent errors if slides haven't loaded
    
    // Deactivate current slide
    slides[currentSlideIndex].classList.remove('active');
    
    // Move to the next index, looping back to 0
    currentSlideIndex = (currentSlideIndex + 1) % slidesData.length;
    
    // Activate the new current slide
    slides[currentSlideIndex].classList.add('active');
    
    // Update the visual dots
    updateIndicators(); 
}

// Initialize the slides and start the auto-cycle (KEEP THIS ONLY ONCE)
document.addEventListener('DOMContentLoaded', () => {
    createSlides();
    // Set an interval to automatically cycle through the slides every 7 seconds
    setInterval(changeSlide, 7000); 
});
// --- Accordion Toggle Functionality ---
function setupFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Toggle the 'open' class on the clicked item
            item.classList.toggle('open');
            
            // Close all other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('open')) {
                    otherItem.classList.remove('open');
                }
            });
        });
    });
}

// Add this function call to your existing DOMContentLoaded listener in script.js
document.addEventListener('DOMContentLoaded', () => {
    // ... existing calls (createSlides, setInterval) ...
    
    setupFaqAccordion(); // Call the new FAQ setup function
});
// --- Print Button Functionality ---
const printButton = document.getElementById('printLinks');
if (printButton) {
    printButton.addEventListener('click', () => {
        // Triggers the browser's print dialog
        window.print();
    });
}
// --- Form Submission Feedback (JS) ---
function displayFormStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const formWrapper = document.querySelector('.contact-form-wrapper');
    
    if (!formWrapper || !status) return; 

    let messageHTML = '';

    if (status === 'success') {
        messageHTML = `
            <div style="padding: 20px; margin-bottom: 20px; background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; border-radius: 4px; font-weight: 600;">
                <i class="fas fa-check-circle"></i> Thank you! Your confidential inquiry has been successfully submitted. We will contact you shortly.
            </div>
        `;
    } else if (status === 'error' || status === 'fail') {
        messageHTML = `
            <div style="padding: 20px; margin-bottom: 20px; background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px; font-weight: 600;">
                <i class="fas fa-times-circle"></i> Error: Submission failed. Please try again or contact us directly via email.
            </div>
        `;
    }

    // Insert the message above the form
    if (messageHTML) {
        formWrapper.insertAdjacentHTML('afterbegin', messageHTML);
        // Clean the URL history after display
        history.replaceState(null, '', window.location.pathname); 
    }
}

// Ensure this runs when the page loads:
document.addEventListener('DOMContentLoaded', () => {
    // ... existing function calls ...
    
    displayFormStatus(); // Run the status checker
});
// --- Mandatory Disclaimer Logic ---
function setupDisclaimer() {
    const modal = document.getElementById('disclaimerModal');
    const acceptButton = document.getElementById('acceptDisclaimer');
    
    // Check if the user has already accepted the disclaimer in local storage
    const hasAccepted = localStorage.getItem('disclaimerAccepted');

    // CRITICAL: Only show the modal if the user has NOT accepted AND we are on the Home Page
    // (Assuming index.html is the home page)
    if (modal && !hasAccepted && window.location.pathname.includes('index.html')) {
        // Prevent background scrolling while the modal is open
        document.body.style.overflow = 'hidden';
        modal.style.display = 'block';
    }

    // Event listener for the Accept button
    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            // 1. Record the acceptance in local storage
            localStorage.setItem('disclaimerAccepted', 'true');
            
            // 2. Hide the modal and restore scrolling
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
}

// Ensure this runs when the page loads:
document.addEventListener('DOMContentLoaded', () => {
    // ... existing function calls (createSlides, setupFaqAccordion, etc.) ...
    
    // Setup the disclaimer modal
    setupDisclaimer(); 
});

// --- Mandatory Disclaimer Logic ---
function setupDisclaimer() {
    const modal = document.getElementById('disclaimerModal');
    const acceptButton = document.getElementById('acceptDisclaimer');

    // CRITICAL FIX: The logic to check Local Storage (localStorage.getItem('disclaimerAccepted'))
    // and the logic to save the status (localStorage.setItem('disclaimerAccepted', 'true'))
    // have been removed.

    // Ensure we only show the modal if the element exists AND we are on the Home Page
    // (We include index.html to prevent it from blocking other pages that don't need it)
    if (modal && window.location.pathname.includes('index.html')) {
        // Show the modal and prevent background scrolling immediately on load
        document.body.style.overflow = 'hidden';
        modal.style.display = 'block';
    }

    // Event listener for the Accept button
    if (acceptButton) {
        acceptButton.addEventListener('click', () => {
            // 1. The code to record acceptance is REMOVED.
            
            // 2. Hide the modal and restore scrolling
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
}

// Ensure this runs when the page loads:
document.addEventListener('DOMContentLoaded', () => {
    // ... existing function calls (createSlides, setupFaqAccordion, etc.) ...
    
    // Setup the disclaimer modal
    setupDisclaimer(); 
});