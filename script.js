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
        handleScroll(); // Initial check
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
            menuToggle.textContent = mainNav.classList.contains('active') ? 'CLOSE' : 'MENU';
            menuToggle.setAttribute('aria-expanded', mainNav.classList.contains('active'));
        });
    }

    /**
     * Active Navigation Link Highlighting
     * Adds an 'active' class to the navigation link corresponding to the current page.
     */
    const navLinks = document.querySelectorAll('#main-nav ul li a');
    const currentPageUrl = window.location.href;

    navLinks.forEach(link => {
        const cleanCurrentPageUrl = currentPageUrl.replace(/\/$/, ''); // Remove trailing slash if exists
        const cleanLinkHref = link.href.replace(/\/$/, ''); // Remove trailing slash if exists

        // Direct match or check if it's the index page
        if (cleanLinkHref === cleanCurrentPageUrl ||
           ((window.location.pathname === '/' || window.location.pathname.endsWith('index.html')) && link.pathname.endsWith('index.html')))
        {
            // Clear active class from all links first to handle edge cases
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to the matched link
            link.classList.add('active');
        }
    });
    // Ensure the above logic correctly handles the root '/' case by matching index.html

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
     */
    const filterContainer = document.querySelector('.filter-buttons');
    if (filterContainer) {
        const filterButtons = filterContainer.querySelectorAll('.btn-filter');
        const galleryGrid = filterContainer.nextElementSibling;
        const galleryItems = galleryGrid ? galleryGrid.querySelectorAll('.gallery-item, .product-item') : [];

        if (galleryItems.length > 0 && filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const filterValue = button.dataset.filter;

                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');

                    galleryItems.forEach(item => {
                        const itemCategories = item.dataset.category;
                        const shouldShow = (filterValue === 'all') || (itemCategories && itemCategories.includes(filterValue));
                        item.style.display = shouldShow ? '' : 'none';
                    });
                });
            });
            console.log("Filter functionality initialized.");
        }
    }

    /**
     * Contact Form Submission Placeholder
     * Replace with actual form submission logic.
     */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatus.textContent = 'Sending message...';
            formStatus.className = '';
            formStatus.style.color = 'var(--secondary-color)';

            // --- Placeholder Simulation ---
            setTimeout(() => {
                const isSuccess = Math.random() > 0.2;
                if (isSuccess) {
                    formStatus.textContent = 'Message sent successfully! (Placeholder)';
                    formStatus.classList.add('success');
                    formStatus.style.color = 'lightgreen';
                    contactForm.reset();
                } else {
                    formStatus.textContent = 'An error occurred. Please try again. (Placeholder)';
                    formStatus.classList.add('error');
                    formStatus.style.color = 'lightcoral';
                }
            }, 1500);
            // --- End Placeholder ---
        });
        console.log("Contact form listener initialized.");
    }

    /**
     * Add to Cart Button Placeholder Functionality
     * Replace with actual e-commerce cart integration logic.
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
     * Initialize GLightbox (MUST be after the library JS is loaded)
     * Finds elements with the 'glightbox' class and enables the lightbox functionality.
     */
    try {
        const lightbox = GLightbox({
            // Add custom options here if desired:
             loop: true, // Loop back to start from end
             touchNavigation: true,
             keyboardNavigation: true,
            // openEffect: 'zoom', // Example effects
            // closeEffect: 'fade',
             selector: '.glightbox' // Important: ensure this matches the class on your links
        });
        console.log("GLightbox initialized successfully.");
    } catch (e) {
        // Catch error if GLightbox library didn't load correctly
        console.error("GLightbox library not found or initialization failed:", e);
    }


    // Final log message
    console.log("RF Gallardo website script fully loaded and initialized.");

}); // End of DOMContentLoaded
