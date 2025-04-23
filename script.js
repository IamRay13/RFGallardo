document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Header ---
    const header = document.getElementById('main-header');
    if (header) {
        const scrollThreshold = 50; // Pixels to scroll before adding class
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScrollY = window.scrollY;
        });
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Change button text (optional)
            if (mainNav.classList.contains('active')) {
                menuToggle.textContent = 'CLOSE';
            } else {
                menuToggle.textContent = 'MENU';
            }
        });
    }

    // --- Active Navigation Link Highlighting ---
    const navLinks = document.querySelectorAll('#main-nav ul li a');
    const currentPage = window.location.pathname.split('/').pop(); // Gets filename like "work.html" or "" for index

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();

        // Handle index case (empty string or index.html)
        if ((currentPage === "" || currentPage === "index.html") && (linkPage === "" || linkPage === "index.html")) {
             link.classList.add('active');
        }
        // Handle other pages
        else if (currentPage !== "" && currentPage !== "index.html" && linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // --- Update Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Placeholder for Gallery Filtering ---
    const filterButtons = document.querySelectorAll('.btn-filter');
    const galleryItems = document.querySelectorAll('.gallery-item, .product-item'); // Select both types

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            // Update active button state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (filterValue === 'all' || (itemCategory && itemCategory.includes(filterValue))) {
                    item.style.display = 'block'; // Or 'grid', 'flex', etc. depending on layout needs
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });


    // --- Placeholder for Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default page reload
            formStatus.textContent = 'Sending...';
            formStatus.className = ''; // Clear previous status classes

            // --- !!! ---
            // Replace this setTimeout with actual form submission logic
            // using Fetch API to send data to a server endpoint or a service like Formspree/Netlify Forms
            setTimeout(() => {
                // Simulate success for now
                const isSuccess = Math.random() > 0.2; // Simulate occasional failure

                if (isSuccess) {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.classList.add('success');
                    contactForm.reset(); // Clear the form
                } else {
                     formStatus.textContent = 'An error occurred. Please try again.';
                     formStatus.classList.add('error');
                }

            }, 1500); // Simulate network delay
            // --- !!! ---

        });
    }

    // --- Placeholder for Add to Cart ---
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
     addToCartButtons.forEach(button => {
         button.addEventListener('click', (e) => {
            // Prevent link navigation if button is inside <a>
            e.preventDefault();
            const productItem = button.closest('.product-item');
            const productName = productItem.querySelector('h3').textContent;
            console.log(`Adding "${productName}" to cart (placeholder)`);
            // Add actual cart logic here (update cart icon, store data, etc.)
            button.textContent = 'Added!';
            setTimeout(() => { button.textContent = 'Add to Cart'; }, 1500); // Reset button text
         });
     });


    console.log("RF Gallardo website script loaded.");
});
