document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header (Optional) ---
    const header = document.getElementById('main-header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Add class after scrolling down 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScrollY = window.scrollY;
    });
    // Add CSS for .scrolled if needed (e.g., change background)
    /*
    #main-header.scrolled {
        background-color: var(--background-dark); // Make it solid on scroll
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    */

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Optional: Change button text/icon
            if (mainNav.classList.contains('active')) {
                menuToggle.textContent = 'CLOSE';
            } else {
                menuToggle.textContent = 'MENU';
            }
        });
    }

    // --- Smooth Scrolling for Nav Links ---
    const navLinks = document.querySelectorAll('#main-nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open before scrolling
                if (mainNav.classList.contains('active')) {
                     mainNav.classList.remove('active');
                     menuToggle.textContent = 'MENU';
                }

                // Calculate scroll position (consider header height)
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- Update Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Placeholder for Gallery Lightbox ---
    //  const galleryItems = document.querySelectorAll('.gallery-item');
    //  galleryItems.forEach(item => {
    //      item.addEventListener('click', () => {
    //          // Add logic here to open a lightbox/modal
    //          console.log('Open lightbox for:', item.querySelector('img').alt);
    //          // You would typically use a library like Lightbox2, FancyBox, or build your own modal
    //      });
    //  });


    // --- Placeholder for Contact Form Submission ---
    // const contactForm = document.getElementById('contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', (e) => {
    //         e.preventDefault(); // Prevent default page reload
    //         console.log('Form submitted');
    //         // Add logic here for form validation and sending data
    //         // (e.g., using Fetch API to send to a server endpoint or service like Formspree)
    //         alert('Form submitted (placeholder - no data sent)');
    //         contactForm.reset(); // Clear the form
    //     });
    // }


    console.log("Website script loaded.");
});
