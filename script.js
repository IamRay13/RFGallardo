document.addEventListener('DOMContentLoaded', () => {

    /**
     * Sticky Header Functionality
     * Adds a 'scrolled' class to the header when the page is scrolled down.
     */
    const header = document.getElementById('main-header');
    if (header) {
        const scrollThreshold = 50; // Pixels to scroll before adding class
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScrollY = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check in case the page loads already scrolled
        handleScroll();
    }

    /**
     * Mobile Menu Toggle Functionality
     * Toggles the 'active' class on the main navigation for mobile view.
     */
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Change button text for better UX
            menuToggle.textContent = mainNav.classList.contains('active') ? 'CLOSE' : 'MENU';
            // Optional: Toggle aria-expanded attribute for accessibility
            menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
        });
    }

    /**
     * Active Navigation Link Highlighting
     * Adds an 'active' class to the navigation link corresponding to the current page.
     */
    const navLinks = document.querySelectorAll('#main-nav ul li a');
    // Use location.href for a more reliable comparison including the full path
    const currentPageUrl = window.location.href;

    navLinks.forEach(link => {
        // Remove trailing slash from URLs for comparison consistency if necessary
        const cleanCurrentPageUrl = currentPageUrl.replace(/\/$/, '');
        const cleanLinkHref = link.href.replace(/\/$/, '');

        if (cleanLinkHref === cleanCurrentPageUrl) {
            link.classList.add('active');
        } else {
            link.classList.remove('active'); // Ensure other links are not marked active
        }
    });
    // Special case for homepage if URL is just the domain root without index.html
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        const homeLink = document.querySelector('#main-nav ul li a[href="index.html"]');
        if (homeLink) {
             // Make sure only the correct home link is active
             navLinks.forEach(link => link.classList.remove('active'));
             homeLink.classList.add('active');
        }
    }


    /**
     * Update Footer Year
     * Automatically sets the current year in the footer copyright notice.
     */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /**
     * Gallery/Product Filtering Functionality
     * Filters items based on data attributes when filter buttons are clicked.
     * Only runs if a container with class 'filter-buttons' exists on the page.
     */
    const filterContainer = document.querySelector('.filter-buttons');

    if (filterContainer) { // Check if filter buttons container exists
        const filterButtons = filterContainer.querySelectorAll('.btn-filter');
        // Find the sibling grid element (assumes it's immediately after filter buttons)
        const galleryGrid = filterContainer.nextElementSibling; // Adjust selector if grid is nested differently
        const galleryItems = galleryGrid ? galleryGrid.querySelectorAll('.gallery-item, .product-item') : []; // Select both types

        if (galleryItems.length > 0 && filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const filterValue = button.dataset.filter; // Get filter value from data-filter attribute

                    // Update 'active' class on buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    // Loop through gallery/product items and show/hide based on filter
                    galleryItems.forEach(item => {
                        const itemCategories = item.dataset.category; // Get categories from data-category attribute

                        // Determine if the item should be shown
                        const shouldShow = (filterValue === 'all') || (itemCategories && itemCategories.includes(filterValue));

                        // Apply display style - resetting to '' allows CSS to control default display (block, grid, flex)
                        if (shouldShow) {
                            item.style.display = '';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
             console.log("Filter functionality initialized.");
        } else {
             console.log("Filter buttons or gallery items not found correctly.");
        }
    }


    /**
     * Contact Form Submission Placeholder
     * Prevents default form submission and shows a status message.
     * Replace the setTimeout with actual AJAX/Fetch submission logic.
     */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop browser's default form submission
            formStatus.textContent = 'Sending message...';
            formStatus.className = ''; // Clear previous status classes (like 'success' or 'error')
            formStatus.style.color = 'var(--secondary-color)'; // Reset color

            // --- !!! ---
            // TODO: Replace this setTimeout with your actual form submission logic.
            // Example using Fetch API to post to a server endpoint or service:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(Object.fromEntries(new FormData(contactForm)))
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
            //         formStatus.textContent = 'Message sent successfully!';
            //         formStatus.classList.add('success'); // Add success class (requires CSS)
            //         formStatus.style.color = 'lightgreen'; // Example success color
            //         contactForm.reset();
            //     } else {
            //         formStatus.textContent = data.message || 'An error occurred. Please try again.';
            //         formStatus.classList.add('error'); // Add error class (requires CSS)
            //         formStatus.style.color = 'lightcoral'; // Example error color
            //     }
            // })
            // .catch(error => {
            //     console.error('Form submission error:', error);
            //     formStatus.textContent = 'A network error occurred. Please try again.';
            //     formStatus.classList.add('error');
            //     formStatus.style.color = 'lightcoral';
            // });

            // Placeholder Simulation Logic:
            setTimeout(() => {
                // Simulate random success/failure
                const isSuccess = Math.random() > 0.2; // 80% chance of success

                if (isSuccess) {
                    formStatus.textContent = 'Message sent successfully! (Placeholder)';
                    formStatus.classList.add('success');
                    formStatus.style.color = 'lightgreen'; // Example success color
                    contactForm.reset(); // Clear the form on success
                } else {
                     formStatus.textContent = 'An error occurred. Please try again. (Placeholder)';
                     formStatus.classList.add('error');
                     formStatus.style.color = 'lightcoral'; // Example error color
                }

            }, 1500); // Simulate network delay
            // --- !!! ---

        });
         console.log("Contact form listener initialized.");
    }

    /**
     * Add to Cart Button Placeholder Functionality
     * Logs a message and provides visual feedback when 'Add to Cart' is clicked.
     * Replace console.log with actual e-commerce cart integration logic.
     */
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Prevent default action if the button is inside a link
                e.preventDefault();

                const productItem = button.closest('.product-item');
                const productName = productItem ? productItem.querySelector('h3').textContent : 'Unknown Product';

                console.log(`Adding "${productName}" to cart (Placeholder)`);

                // Provide visual feedback
                const originalText = button.textContent;
                button.textContent = 'Added!';
                button.disabled = true; // Temporarily disable button

                // TODO: Add actual cart logic here
                // - Update cart quantity indicator somewhere on the page
                // - Store cart data (e.g., in localStorage or via API call)

                // Reset button after a short delay
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 1500); // Reset after 1.5 seconds
            });
        });
         console.log("'Add to Cart' listeners initialized.");
    }

    // Final log message to confirm script execution
    console.log("RF Gallardo website script fully loaded and initialized.");

}); // End of DOMContentLoaded
