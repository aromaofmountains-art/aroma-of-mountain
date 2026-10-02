/* ============================================================
   AROMA LUXURY — SHARED CART ENGINE
   Loaded on every page so the cart (and its contents) stays in
   sync as the user moves between pages. Data lives in
   localStorage under the key 'aroma_cart'.
============================================================ */

const WHATSAPP_NUMBER = '923702208716'; // +92 370 2208716
const OWNER_EMAIL = 'aromaofmountains@gmail.com';
const STORE_NAME = 'Aroma Luxury';


/* Product catalog — single source of truth for names & prices (PKR). */

const PRODUCT_CATALOG = {

    'ameer-x-50ml': {
        product: 'Ameer X',
        variant: '50ml Perfume',
        regularPrice: 1950,
        offerPrice: 1950,
        image: 'pics/2 pic new.jpeg'
    },

    'ameer-x-tester': {
        product: 'Ameer X',
        variant: 'Tester Box',
        regularPrice: 1500,
        offerPrice: 1500,
        image: 'pics/2 pic new.jpeg'
    },

    'sport-vibe-50ml': {
        product: 'Sport Vibe',
        variant: '50ml Perfume',
        regularPrice: 1900,
        offerPrice: 1900,
        image: 'pics/5 pic new.jpeg'
    },

    'sport-vibe-tester': {
        product: 'Sport Vibe',
        variant: 'Tester Box',
        regularPrice: 1500,
        offerPrice: 1500,
        image: 'pics/5 pic new.jpeg'
    },

    'pure-flora-50ml': {
        product: 'Pure Flora',
        variant: '50ml Perfume',
        regularPrice: 1850,
        offerPrice: 1850,
        image: 'pics/Perfume_bottle_with_crimson_roses_202608070135.jpeg'
    },

    'pure-flora-tester': {
        product: 'Pure Flora',
        variant: 'Tester Box',
        regularPrice: 1500,
        offerPrice: 1500,
        image: 'pics/Perfume_bottle_with_crimson_roses_202608070135.jpeg'
    },

    'blue-essence-50ml': {
        product: 'Blue Essence',
        variant: '50ml Perfume',
        regularPrice: 2000,
        offerPrice: 2000,
        image: 'pics/1 pic new.jpeg'
    },

    'blue-essence-tester': {
        product: 'Blue Essence',
        variant: 'Tester Box',
        regularPrice: 1500,
        offerPrice: 1500,
        image: 'pics/1 pic new.jpeg'
    },

    'ocean-drift-50ml': {
        product: 'Ocean Drift',
        variant: '50ml Perfume',
        regularPrice: 2500,
        offerPrice: 2500,
        image: 'pics/6 pic new.jpeg'
    },

    'ocean-drift-tester': {
        product: 'Ocean Drift',
        variant: 'Tester Box',
        regularPrice: 1500,
        offerPrice: 1500,
        image: 'pics/6 pic new.jpeg'
    },

    'marine-water-50ml': {
        product: 'Marine Water',
        variant: '50ml Perfume',
        regularPrice: 1850,
        offerPrice: 1850,
        image: 'pics/4 pic new.jpeg'
    },

    'marine-water-tester': {
        product: 'Marine Water',
        variant: 'Tester Box',
        regularPrice: 1500,
        offerPrice: 1500,
        image: 'pics/4 pic new.jpeg'
    },

    'gentlemen-50ml': {
        product: 'The Gentlemen',
        variant: '50ml Perfume',
        regularPrice: 2250,
        offerPrice: 2250,
        image: 'pics/Perfume_bottle_on_wood_surface_202608070134.jpeg'
    },

    'gentlemen-tester': {
        product: 'The Gentlemen',
        variant: 'Tester Box',
        regularPrice: 1500,
        offerPrice: 1500,
        image: 'pics/Perfume_bottle_on_wood_surface_202608070134.jpeg'
    },

    'crystal-bloom-50ml': {
        product: 'Crystal Bloom',
        variant: '50ml Perfume',
        regularPrice: 2100,
        offerPrice: 2100,
        image: 'pics/Perfume_bottle_on_velvet_fabric_202608070134.jpeg'
    },

    'crystal-bloom-tester': {
        product: 'Crystal Bloom',
        variant: 'Tester Box',
        regularPrice: 1500,
        offerPrice: 1500,
        image: 'pics/Perfume_bottle_on_velvet_fabric_202608070134.jpeg'
    }
};


/* ============================================================
   CART FUNCTIONS
============================================================ */

function formatPKR(value){
    return 'Rs ' + Number(value).toLocaleString('en-PK');
}


function loadCart(){

    try{

        const raw = localStorage.getItem('aroma_cart');

        return raw ? JSON.parse(raw) : {};

    }catch(e){

        return {};

    }

}


function saveCart(cart){

    localStorage.setItem(
        'aroma_cart',
        JSON.stringify(cart)
    );

}


let cart = loadCart();


function addToCart(productId, qty){

    qty = qty || 1;

    if(!PRODUCT_CATALOG[productId]) return;

    cart[productId] =
        (cart[productId] || 0) + qty;

    saveCart(cart);

    renderCart();

}


function setQuantity(productId, qty){

    if(qty <= 0){

        delete cart[productId];

    }else{

        cart[productId] = qty;

    }

    saveCart(cart);

    renderCart();

}


function removeFromCart(productId){

    delete cart[productId];

    saveCart(cart);

    renderCart();

}


function getCartTotal(){

    return Object.entries(cart).reduce(
        (sum, [id, qty]) => {

            const p = PRODUCT_CATALOG[id];

            if(!p) return sum;

            return sum + p.offerPrice * qty;

        },
        0
    );

}


function getCartItemCount(){

    return Object.values(cart).reduce(
        (sum, qty) => sum + qty,
        0
    );

}


function getCartSavings(){

    return Object.entries(cart).reduce(
        (sum, [id, qty]) => {

            const p = PRODUCT_CATALOG[id];

            if(!p) return sum;

            return sum +
                (p.regularPrice - p.offerPrice) * qty;

        },
        0
    );

}


/* ============================================================
   RENDER CART
============================================================ */

function renderCart(){

    document.querySelectorAll('.cart-count').forEach(el => {

        el.textContent = getCartItemCount();

    });


    const list =
        document.getElementById('cart-items-list');

    const totalEl =
        document.getElementById('cart-total-value');

    const savingsEl =
        document.getElementById('cart-savings-value');

    const savingsRow =
        document.getElementById('cart-savings-row');


    if(!list || !totalEl) return;


    const entries = Object.entries(cart);


    if(entries.length === 0){

        list.innerHTML = `
            <div class="empty-cart">

                <div class="empty-cart-icon">

                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">

                        <path d="M6 2L3 6v14a2 2 0 0 1 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>

                        <line
                            x1="3"
                            y1="6"
                            x2="21"
                            y2="6"/>

                        <path d="M16 10a4 4 0 0 1-8 0"/>

                    </svg>

                </div>

                <p>Your cart is empty.</p>

                <span class="empty-cart-sub">
                    Add a fragrance to get started.
                </span>

            </div>
        `;


        totalEl.textContent = formatPKR(0);


        if(savingsRow){

            savingsRow.style.display = 'none';

        }

        return;

    }


    list.innerHTML = '';


    entries.forEach(([id, qty]) => {

        const p = PRODUCT_CATALOG[id];

        if(!p) return;


        const row =
            document.createElement('div');


        row.className = 'cart-item-row';


        row.innerHTML = `

            <img
                class="item-thumb"
                src="${p.image}"
                alt="${p.product}">

            <div class="item-info">

                <span class="item-name">
                    ${p.product}
                </span>

                <span class="item-variant">
                    ${p.variant}
                </span>

                <div class="item-qty-controls">

                    <button
                        class="qty-btn"
                        data-action="dec"
                        aria-label="Decrease quantity">
                        −
                    </button>

                    <span>${qty}</span>

                    <button
                        class="qty-btn"
                        data-action="inc"
                        aria-label="Increase quantity">
                        +
                    </button>

                </div>

            </div>

            <div class="item-right">

                <span class="item-price">
                    ${formatPKR(p.offerPrice * qty)}
                </span>

                <button class="cart-item-remove">
                    Remove
                </button>

            </div>

        `;


        row
            .querySelector('[data-action="inc"]')
            .addEventListener('click', () => {

                setQuantity(
                    id,
                    (cart[id] || 0) + 1
                );

            });


        row
            .querySelector('[data-action="dec"]')
            .addEventListener('click', () => {

                setQuantity(
                    id,
                    (cart[id] || 0) - 1
                );

            });


        row
            .querySelector('.cart-item-remove')
            .addEventListener('click', () => {

                removeFromCart(id);

            });


        list.appendChild(row);

    });


    totalEl.textContent =
        formatPKR(getCartTotal());


    const savings = getCartSavings();


    if(savingsRow && savingsEl){

        if(savings > 0){

            savingsRow.style.display = 'flex';

            savingsEl.textContent =
                "You're saving " +
                formatPKR(savings);

        }else{

            savingsRow.style.display = 'none';

        }

    }

}


/* ============================================================
   CART DRAWER
============================================================ */

function openCartDrawer(){

    const drawer =
        document.getElementById('cart-drawer');

    const backdrop =
        document.getElementById('cart-backdrop');


    if(drawer)
        drawer.classList.add('open');


    if(backdrop)
        backdrop.classList.add('active');

}


function closeCartDrawer(){

    const drawer =
        document.getElementById('cart-drawer');

    const backdrop =
        document.getElementById('cart-backdrop');


    if(drawer)
        drawer.classList.remove('open');


    if(backdrop)
        backdrop.classList.remove('active');

}


function showCartToast(message){

    const toast =
        document.getElementById('cart-toast');


    if(!toast) return;


    toast.textContent = message;

    toast.classList.add('show');


    clearTimeout(toast._t);


    toast._t =
        setTimeout(
            () => toast.classList.remove('show'),
            2000
        );

}


/* ============================================================
   EMAIL / WHATSAPP ORDER MESSAGE
============================================================ */

function buildOrderSummary(){

    const entries =
        Object.entries(cart);


    const lines =
        entries.map(([id, qty]) => {

            const p =
                PRODUCT_CATALOG[id];


            if(!p) return '';


            return `• ${p.product} — ${p.variant} × ${qty} — ${formatPKR(p.offerPrice * qty)}`;

        }).filter(Boolean);


    return `Hello Aroma of Mountains,

I would like to buy the following fragrances from your website:

${lines.join('\n')}

Total Order Amount: ${formatPKR(getCartTotal())}

Please let me know how I can complete my order and provide my delivery details.

Thank you,
Aroma of Mountains Customer`;

}


/* ============================================================
   WHATSAPP CHECKOUT
============================================================ */

function checkoutViaWhatsApp(){

    if(Object.keys(cart).length === 0){

        showCartToast('Your cart is empty');

        return;

    }


    const customerName =
        prompt('Please enter your full name:');


    if(!customerName || !customerName.trim()){

        showCartToast('Name is required');

        return;

    }


    const phoneNumber =
        prompt('Please enter your phone number:');


    if(!phoneNumber || !phoneNumber.trim()){

        showCartToast('Phone number is required');

        return;

    }


    const address =
        prompt('Please enter your complete delivery address:');


    if(!address || !address.trim()){

        showCartToast('Delivery address is required');

        return;

    }


    const orderMessage =
        buildOrderSummary();


    const finalMessage =

`${orderMessage}

CUSTOMER DETAILS
----------------
Name: ${customerName.trim()}
Phone: ${phoneNumber.trim()}
Delivery Address: ${address.trim()}

Please confirm my order.

Thank you.`;


    const text =
        encodeURIComponent(finalMessage);


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;


    /* Direct navigation avoids Opera GX popup blocking */

    window.location.href = whatsappURL;

}


/* ============================================================
   EMAIL CHECKOUT — GMAIL
============================================================ */

function checkoutViaEmail(){

    if(Object.keys(cart).length === 0){

        showCartToast('Your cart is empty');

        return;

    }


    const customerName =
        prompt('Please enter your full name:');


    if(!customerName || !customerName.trim()){

        showCartToast('Name is required');

        return;

    }


    const phoneNumber =
        prompt('Please enter your phone number:');


    if(!phoneNumber || !phoneNumber.trim()){

        showCartToast('Phone number is required');

        return;

    }


    const address =
        prompt('Please enter your complete delivery address:');


    if(!address || !address.trim()){

        showCartToast('Delivery address is required');

        return;

    }


    const subject =
        encodeURIComponent(
            'Aroma of Mountains - Fragrance Order'
        );


    const orderMessage =
        buildOrderSummary();


    const finalMessage =

`${orderMessage}

CUSTOMER DETAILS
----------------
Name: ${customerName.trim()}
Phone: ${phoneNumber.trim()}
Delivery Address: ${address.trim()}

Please confirm my order.

Thank you.`;


    const body =
        encodeURIComponent(finalMessage);


    /* Direct Gmail compose URL */

    const gmailURL =
        'https://mail.google.com/mail/u/0/?view=cm&fs=1' +
        '&to=' + encodeURIComponent(OWNER_EMAIL) +
        '&su=' + subject +
        '&body=' + body;


    /* Direct navigation avoids Opera GX popup blocking */

    window.location.href = gmailURL;

}


/* ============================================================
   INITIALIZE CART UI
============================================================ */

function initCartUI(){

    renderCart();


    document
        .querySelectorAll('.cart-link')
        .forEach(link => {

            link.addEventListener(
                'click',
                e => {

                    e.preventDefault();

                    openCartDrawer();

                }
            );

        });


    const closeBtn =
        document.getElementById('cart-close');


    if(closeBtn){

        closeBtn.addEventListener(
            'click',
            closeCartDrawer
        );

    }


    const backdrop =
        document.getElementById('cart-backdrop');


    if(backdrop){

        backdrop.addEventListener(
            'click',
            closeCartDrawer
        );

    }


    const waBtn =
        document.getElementById('checkout-whatsapp');


    if(waBtn){

        waBtn.addEventListener(
            'click',
            checkoutViaWhatsApp
        );

    }


    const emailBtn =
        document.getElementById('checkout-email');


    if(emailBtn){

        emailBtn.addEventListener(
            'click',
            checkoutViaEmail
        );

    }


    /* Any element with data-add-to-cart="productId"
       becomes an add-to-cart button */

    document
        .querySelectorAll('[data-add-to-cart]')
        .forEach(btn => {

            btn.addEventListener(
                'click',
                () => {

                    const id =
                        btn.getAttribute(
                            'data-add-to-cart'
                        );


                    const p =
                        PRODUCT_CATALOG[id];


                    if(!p) return;


                    addToCart(id, 1);


                    openCartDrawer();


                    showCartToast(
                        `${p.product} (${p.variant}) added to cart`
                    );

                }
            );

        });


    initThemeToggle();

}


/* ============================================================
   DARK MODE
============================================================ */

function initThemeToggle(){

    const toggle =
        document.getElementById('theme-toggle');


    if(!toggle) return;


    updateThemeIcon();


    toggle.addEventListener(
        'click',
        () => {

            const isDark =
                document.documentElement
                    .classList
                    .toggle('dark-mode');


            try{
                localStorage.setItem(
                    'aroma_theme',
                    isDark ? 'dark' : 'light'
                );
            }catch(e){}


            updateThemeIcon();

        }
    );

}


/* ============================================================
   THEME ICONS
============================================================ */

const MOON_ICON = `
<svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round">

    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>

</svg>
`;


const SUN_ICON = `
<svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round">

    <circle
        cx="12"
        cy="12"
        r="5"/>

    <line
        x1="12"
        y1="1"
        x2="12"
        y2="3"/>

    <line
        x1="12"
        y1="21"
        x2="12"
        y2="23"/>

    <line
        x1="4.22"
        y1="4.22"
        x2="5.64"
        y2="5.64"/>

    <line
        x1="18.36"
        y1="18.36"
        x2="19.78"
        y2="18.36"/>

    <line
        x1="1"
        y1="12"
        x2="3"
        y2="12"/>

    <line
        x1="21"
        y1="12"
        x2="23"
        y2="12"/>

    <line
        x1="4.22"
        y1="19.78"
        x2="5.64"
        y2="18.36"/>

    <line
        x1="18.36"
        y1="18.36"
        x2="19.78"
        y2="18.36"/>

    <line
        x1="4.22"
        y1="19.78"
        x2="5.64"
        y2="18.36"/>

    <line
        x1="18.36"
        y1="5.64"
        x2="19.78"
        y2="4.22"/>

</svg>
`;


function updateThemeIcon(){

    const toggle =
        document.getElementById('theme-toggle');


    if(!toggle) return;


    const isDark =
        document.documentElement
            .classList
            .contains('dark-mode');


    toggle.innerHTML =
        isDark
            ? SUN_ICON
            : MOON_ICON;


    toggle.setAttribute(
        'aria-label',
        isDark
            ? 'Switch to light mode'
            : 'Switch to dark mode'
    );

    const meta = document.querySelector('meta[name="theme-color"]');
    if(meta) meta.setAttribute('content', isDark ? '#120c0b' : '#f1eee8');

}


/* ============================================================
   START CART
============================================================ */

document.addEventListener(
    'DOMContentLoaded',
    initCartUI
);


/* ============================================================
   SMOOTH SCROLL-REVEAL
============================================================ */

function initScrollReveal(){

    const prefersReducedMotion =
        window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;


    const selectors = [

        '.feature-card',

        '.card',

        '.story-image',

        '.story-content',

        '.quote h2',

        '.collection-top',

        '.footer-grid > div'

    ];


    const els =
        document.querySelectorAll(
            selectors.join(',')
        );


    if(els.length === 0) return;


    els.forEach(el => {

        el.classList.add('reveal');

    });


    if(
        prefersReducedMotion ||
        !('IntersectionObserver' in window)
    ){

        els.forEach(el => {

            el.classList.add('in-view');

        });

        return;

    }


    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry, i) => {

                        if(entry.isIntersecting){

                            const el =
                                entry.target;


                            const delay =
                                Math.min(
                                    i * 60,
                                    240
                                );


                            setTimeout(
                                () =>
                                    el.classList.add(
                                        'in-view'
                                    ),
                                delay
                            );


                            observer.unobserve(el);

                        }

                    }
                );

            },

            {
                threshold: 0.12,

                rootMargin:
                    '0px 0px -60px 0px'
            }

        );


    els.forEach(el => {

        observer.observe(el);

    });

}


/* scroll-reveal retired in the redesign */
void(
    initScrollReveal
);