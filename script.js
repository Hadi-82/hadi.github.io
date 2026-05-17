/*
    script.js - all the JavaScript for the prototype


    The brief said the site needs JavaScript for "simple
    interaction(s)". I went a bit further than just one
    interaction since I needed the hamburger to work for the
    responsive nav anyway. So this file does three things:

      1. Mobile hamburger menu - opens/closes the nav drawer
      2. Newsletter form - shows a thank-you message
      3. Booking form - validates fields and shows a success message

    Each block checks if its element exists on the page first,
    so the script can run on every page without errors. Pages
    that don't have a booking form just skip that bit.

    I wrapped everything in an IIFE (immediately invoked function
    expression) which is a JS pattern I learnt from MDN - it
    keeps my variables out of the global scope so they can't
    clash with anything else.
    Reference: MDN - IIFE
    https://developer.mozilla.org/en-US/docs/Glossary/IIFE
*/

(function () {
    'use strict';


    /* ===============================================
       1. HAMBURGER MENU TOGGLE

       This is the main "responsive design" interaction.
       On mobile, the nav is hidden off to the side and
       slides in when you tap the hamburger. On desktop
       the CSS already shows the nav as a normal row, so
       this code mostly just doesn't do anything visible
       on big screens.

       I followed this MDN article on building accessible
       toggle buttons:
       https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role
       =============================================== */
    const navToggle = document.getElementById('navToggle');
    const primaryNav = document.getElementById('primaryNav');

    if (navToggle && primaryNav) {

        // Open or close the menu when the button is tapped
        navToggle.addEventListener('click', function () {
            // classList.toggle returns true if the class was just added
            const isOpen = primaryNav.classList.toggle('is-open');

            // Update the aria attributes so screen readers know
            // what's going on
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');

            // Stop the page behind from scrolling while the
            // menu is open. Without this you can scroll under
            // the menu which feels weird.
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close the menu when a link inside it is clicked,
        // otherwise the menu stays open over the new page
        // for a second which looks broken
        const navLinks = primaryNav.querySelectorAll('a');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                primaryNav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Open menu');
                document.body.style.overflow = '';
            });
        });

        // If someone resizes from mobile to desktop while
        // the menu is open (e.g. rotating a tablet) it'd
        // get stuck "open" but invisible. This listener
        // resets things if the screen goes wide.
        // Reference: MDN matchMedia
        // https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
        const desktopQuery = window.matchMedia('(min-width: 768px)');
        desktopQuery.addEventListener('change', function (e) {
            if (e.matches) {
                primaryNav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }


    /* ===============================================
       2. NEWSLETTER FORM

       Stops the form actually submitting (since there's
       no backend), checks if the email looks valid, and
       shows a message.
       =============================================== */
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterNote = document.getElementById('newsletterNote');

    if (newsletterForm && newsletterNote) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = document.getElementById('newsletterEmail');
            const value = emailInput.value.trim();

            // Quick regex check for an @ and a dot. Not perfect
            // but good enough for a prototype. A real site would
            // validate properly on the server.
            const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

            if (!looksLikeEmail) {
                newsletterNote.textContent = 'Please enter a valid email address.';
                newsletterNote.hidden = false;
                return;
            }

            newsletterNote.textContent = "Thanks - you're on the list!";
            newsletterNote.hidden = false;
            newsletterForm.reset();
        });
    }


    /* ===============================================
       3. BOOKING FORM

       Goes through every required field, marks the
       invalid ones with a red border (using a CSS class),
       and only "submits" if everything is filled in.

       I'm using each field's built-in checkValidity()
       method - HTML form inputs have a load of validation
       built in (email format, number ranges, required
       fields, etc.) so I don't need to write all that
       myself.
       Reference: MDN - Form validation using JavaScript
       https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
       =============================================== */
    const bookingForm = document.getElementById('bookingForm');
    const formSuccess = document.getElementById('formSuccess');

    if (bookingForm && formSuccess) {

        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Find every required field and check if it's valid
            const requiredFields = bookingForm.querySelectorAll('[required]');
            let allValid = true;

            requiredFields.forEach(function (field) {
                const isValid = field.checkValidity();
                const wrapper = field.closest('.form-field');

                // Toggle the .has-error class on the wrapper.
                // The CSS uses this to style the red border.
                if (wrapper) {
                    if (isValid) {
                        wrapper.classList.remove('has-error');
                    } else {
                        wrapper.classList.add('has-error');
                    }
                }

                if (!isValid) {
                    allValid = false;
                }
            });

            // If anything's invalid, scroll to the first error
            // and stop here - don't show the success message
            if (!allValid) {
                const firstError = bookingForm.querySelector('.has-error');
                if (firstError) {
                    firstError.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
                return;
            }

            // Everything's valid - hide the form fields and
            // show the thank-you message instead
            const elementsToHide = bookingForm.querySelectorAll(
                'fieldset, button[type="submit"], .form-field-check'
            );
            elementsToHide.forEach(function (el) {
                el.style.display = 'none';
            });

            formSuccess.hidden = false;
            formSuccess.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });

        // Clear the error on a field as soon as the user
        // fixes it - feels nicer than waiting for them to
        // hit submit again
        bookingForm.addEventListener('input', function (e) {
            const wrapper = e.target.closest('.form-field');
            if (wrapper && wrapper.classList.contains('has-error')) {
                if (e.target.checkValidity()) {
                    wrapper.classList.remove('has-error');
                }
            }
        });
    }

})();