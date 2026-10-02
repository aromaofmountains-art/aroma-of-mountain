/* ============================================================
   AROMA LUXURY — SHARED LAYOUT
   Writes the header, cart drawer, footer and WhatsApp button on
   every page, so they are edited in ONE place. Must load before
   cart.js (cart.js wires up the elements created here).
============================================================ */

(function(){

    var PAGES = [
        { href:'index.html',      label:'Home' },
        { href:'collection.html', label:'Collections' },
        { href:'about-us.html',   label:'About' },
        { href:'contact.html',    label:'Contact' }
    ];

    var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

    var nav = PAGES.map(function(p){
        var current = (p.href === here) ? ' aria-current="page"' : '';
        return '<a href="' + p.href + '"' + current + '>' + p.label + '</a>';
    }).join('');

    var header =
    '<a class="skip" href="#main">Skip to content</a>' +
    '<header class="site-header" id="site-header">' +
        '<div class="wrap header-row">' +
            '<a class="logo" href="index.html">Aroma Luxury</a>' +
            '<nav class="main-nav" id="main-nav" aria-label="Main">' + nav + '</nav>' +
            '<div class="header-actions">' +
                '<button class="icon-btn" id="theme-toggle" type="button" aria-label="Switch to dark mode"></button>' +
                '<a class="icon-btn cart-link" id="cart-link" href="#" aria-label="Open cart">' +
                    '<span class="cart-icon" aria-hidden="true">' +
                        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>' +
                    '</span>' +
                    '<span class="cart-count" id="cart-count">0</span>' +
                '</a>' +
                '<button class="icon-btn menu-btn" id="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="main-nav">' +
                    '<span class="bars"><i></i></span>' +
                '</button>' +
            '</div>' +
        '</div>' +
    '</header>';

    var drawer =
    '<div id="cart-backdrop" class="cart-backdrop"></div>' +
    '<aside id="cart-drawer" class="cart-drawer" aria-label="Shopping cart">' +
        '<div class="cart-drawer-header">' +
            '<h2>Your Cart</h2>' +
            '<button class="cart-close" id="cart-close" aria-label="Close cart" type="button">×</button>' +
        '</div>' +
        '<div class="cart-items-list" id="cart-items-list">' +
            '<div class="empty-cart">' +
                '<div class="empty-cart-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></div>' +
                '<p>Your cart is empty.</p>' +
                '<span class="empty-cart-sub">Add a fragrance to get started.</span>' +
            '</div>' +
        '</div>' +
        '<div class="cart-savings-row" id="cart-savings-row" style="display:none;"><span id="cart-savings-value">You\'re saving Rs 0</span></div>' +
        '<div class="cart-total"><span>Total</span><span id="cart-total-value">Rs 0</span></div>' +
        '<div class="checkout-actions">' +
            '<button id="checkout-whatsapp" class="checkout-btn whatsapp-btn" type="button"><span class="btn-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>Order via WhatsApp</button>' +
            '<button id="checkout-email" class="checkout-btn email-btn" type="button"><span class="btn-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg></span>Order via Email</button>' +
            '<div class="checkout-trust"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>Your order details go straight to us — nowhere else</div>' +
        '</div>' +
    '</aside>' +
    '<div id="cart-toast" class="cart-toast" role="status" aria-live="polite">Added to cart</div>';

    var footer =
    '<footer class="site-footer">' +
        '<div class="wrap">' +
            '<div class="footer-grid">' +
                '<div>' +
                    '<div class="footer-logo">Aroma Luxury</div>' +
                    '<p>Discover your signature scent. Luxury fragrances made for every moment.</p>' +
                '</div>' +
                '<div>' +
                    '<h4>Explore</h4>' +
                    '<div class="footer-links">' +
                        '<a href="index.html">Home</a>' +
                        '<a href="collection.html">All collections</a>' +
                        '<a href="about-us.html">About us</a>' +
                        '<a href="contact.html">Contact</a>' +
                    '</div>' +
                '</div>' +
                '<div>' +
                    '<h4>Shop</h4>' +
                    '<div class="footer-links">' +
                        '<a href="collection.html#men">For men</a>' +
                        '<a href="collection.html#women">For women</a>' +
                        '<a href="collection.html#unisex">Unisex</a>' +
                    '</div>' +
                '</div>' +
                '<div>' +
                    '<h4>Get in touch</h4>' +
                    '<div class="footer-links">' +
                        '<a href="tel:+923702208716">+92 370 2208716</a>' +
                        '<a href="mailto:aromaofmountains@gmail.com">aromaofmountains@gmail.com</a>' +
                        '<a href="https://wa.me/923702208716" target="_blank" rel="noopener">Chat on WhatsApp</a>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="footer-bottom">© 2026 Aroma Luxury · Karachi, Pakistan</div>' +
        '</div>' +
    '</footer>' +
    '<a class="wa-float" href="https://wa.me/923702208716" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"/></svg>' +
    '</a>';

    // Header + drawer go in first (before the page content)
    document.body.insertAdjacentHTML('afterbegin', header + drawer);

    // Footer goes last — wait until the page content above it exists
    function addFooter(){
        document.body.insertAdjacentHTML('beforeend', footer);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addFooter);
    } else {
        addFooter();
    }


    /* ---------- header behaviour ---------- */

    var headerEl = document.getElementById('site-header');
    var menuBtn  = document.getElementById('menu-btn');
    var navEl    = document.getElementById('main-nav');

    function setScrolled(){
        headerEl.classList.toggle('at-top', window.scrollY < 24);
    }
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive:true });

    function closeMenu(){
        navEl.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open menu');
    }

    menuBtn.addEventListener('click', function(e){
        e.stopPropagation();
        var open = navEl.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        // keep the header solid while the menu is open over the hero
        if (open) headerEl.classList.remove('at-top'); else setScrolled();
    });

    document.addEventListener('click', function(e){
        if (!navEl.contains(e.target) && e.target !== menuBtn) closeMenu();
    });
    document.addEventListener('keydown', function(e){
        if (e.key === 'Escape') closeMenu();
    });
    navEl.addEventListener('click', function(e){
        if (e.target.tagName === 'A') closeMenu();
    });
    window.addEventListener('resize', function(){
        if (window.innerWidth > 820) closeMenu();
    });

})();
