/**
 * RF Gallardo Portfolio Website Script
 *
 * Handles:
 * 1. Sticky Header (if used)
 * 2. Mobile Menu Toggle
 * 3. Active Navigation Link Styling
 * 4. Footer Year Update
 * 5. Gallery/Product Filtering (on work.html)
 * 6. Contact Form Submission Placeholder (if used)
 * 7. Add to Cart Placeholder (if used)
 * 8. GLightbox Initialization
 * 9. Scroll Animation Initialization
 */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Sticky Header Functionality (Keep if you use it)
     */
    const header = document.getElementById('main-header');
    if (header) {
        const scrollThreshold = 50;
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
        handleScroll(); // Initial check
    }

    /**
     * Mobile Menu Toggle Functionality
     */
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active'); // Assumes your CSS uses .active for mobile nav display
            // Update button text based on your original script's logic if needed
            menuToggle.textContent = mainNav.classList.contains('active') ? 'CLOSE' : 'MENU';
            menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
        });
    }

    /**
     * Active Navigation Link Highlighting
     */
    const navLinks = document.querySelectorAll('#main-nav ul li a');
    // Use pathname for more reliable matching, handle root case
    const currentPagePath = window.location.pathname === '/' ? '/index.html' : window.location.pathname;

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname === '/' ? '/index.html' : new URL(link.href).pathname;
        // Check if the link's path ends with the current page's path
        if (currentPagePath.endsWith(linkPath.substring(linkPath.lastIndexOf('/') + 1))) {
            link.classList.add('active'); // Assumes your CSS uses .active for styling
        } else {
            link.classList.remove('active');
        }
    });


    /**
     * Update Footer Year
     */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /**
     * Gallery/Product Filtering Functionality (From your original script)
     * This will only run if the necessary elements are on the current page (like work.html)
     */
    const filterContainer = document.querySelector('.filter-buttons');
    if (filterContainer) {
        const filterButtons = filterContainer.querySelectorAll('.btn-filter');
        // Find the next sibling element that contains the items to filter
        // This assumes the grid is the immediate next element, adjust if needed
        const galleryGrid = filterContainer.nextElementSibling;
        const galleryItems = galleryGrid ? galleryGrid.querySelectorAll('.gallery-item, .product-item') : []; // Select all types of items

        if (galleryItems.length > 0 && filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const filterValue = button.dataset.filter; // Use dataset for data-* attributes

                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    galleryItems.forEach(item => {
                        const itemCategories = item.dataset.category; // Get category from data-category
                        // Show item if filter is 'all' OR if item's category matches the filter
                        const shouldShow = (filterValue === 'all') || (itemCategories && itemCategories.split(' ').includes(filterValue));

                        // Use style.display for basic filtering as per original script
                        // If using fade animations, you might toggle classes instead
                        item.style.display = shouldShow ? '' : 'none';
                    });
                });
            });
             // Optional: Programmatically click the 'all' button on load if needed
             if (filterButtons[0] && filterButtons[0].dataset.filter === 'all') {
                filterButtons[0].click();
             }
            console.log("Filter functionality initialized.");
        }
    }


    /**
     * Contact Form Submission Placeholder (Keep if you use it)
     */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.textContent = 'Sending message...';
            formStatus.className = ''; // Clear previous status classes
            formStatus.style.color = 'var(--secondary-color)'; // Reset color

            // Placeholder Simulation
            setTimeout(() => {
                const isSuccess = Math.random() > 0.2;
                if (isSuccess) {
                    formStatus.textContent = 'Message sent successfully! (Placeholder)';
                    formStatus.classList.add('success'); // Add class for potential styling
                    formStatus.style.color = 'lightgreen'; // Use style for direct color
                    contactForm.reset();
                } else {
                    formStatus.textContent = 'An error occurred. Please try again. (Placeholder)';
                    formStatus.classList.add('error');
                    formStatus.style.color = 'lightcoral';
                }
            }, 1500);
        });
        console.log("Contact form listener initialized.");
    }

    /**
     * Add to Cart Button Placeholder Functionality (Keep if you use it)
     */
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productItem = button.closest('.product-item');
                const productName = productItem ? productItem.querySelector('h3').textContent : 'Unknown Product';
                console.log(`Adding "${productName}" to cart (Placeholder)`);
                const originalText = button.textContent;
                button.textContent = 'Added!';
                button.disabled = true;
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 1500);
            });
        });
        console.log("'Add to Cart' listeners initialized.");
    }


    /**
     * Initialize GLightbox (Keep for album pages)
     */
    try {
        // Check if GLightbox function exists before calling it
        if (typeof GLightbox === 'function') {
            const lightbox = GLightbox({
                loop: true,
                touchNavigation: true,
                keyboardNavigation: true,
                selector: '.glightbox' // Ensure this matches links on album pages
            });
            console.log("GLightbox initialized successfully.");
        } else {
            // console.log("GLightbox not available on this page."); // Optional log
        }
    } catch (e) {
        console.error("GLightbox initialization failed:", e);
    }

    /**
     * Scroll Animation Initialization (NEW)
     */
    const animatedElements = document.querySelectorAll('.fade-in-section');

    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If the element is intersecting (visible)
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: Stop observing once it's visible to prevent re-animation
                    observer.unobserve(entry.target);
                }
                // Optional: If you want elements to fade out when scrolling up
                // else {
                //    entry.target.classList.remove('is-visible');
                // }
            });
        }, {
            rootMargin: '0px', // No margin around the viewport
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        // Observe each element marked for animation
        animatedElements.forEach(el => {
            observer.observe(el);
        });

        console.log("Scroll animation observer initialized.");
    } else if (animatedElements.length > 0) {
        // Fallback for older browsers or if you want elements visible immediately
        // animatedElements.forEach(el => el.classList.add('is-visible'));
        console.log("IntersectionObserver not supported, animations may not work as expected.");
    }


    // Final log message
    console.log("RF Gallardo website script fully loaded and initialized.");

}); // End of DOMContentLoaded
