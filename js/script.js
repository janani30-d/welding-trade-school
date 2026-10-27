
/* =====================================================
   WELDING TRADE SCHOOL
   PART 4 — JAVASCRIPT
   Hamburger + Dropdown + Dark Mode + RTL
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       1. ELEMENTS
    ================================================= */

    const html = document.documentElement;
    const body = document.body;

    const header = document.getElementById("wtsHeader");
    const menuToggle = document.getElementById("wtsMenuToggle");
    const navigation = document.getElementById("wtsNavigation");

    const homeDropdown = document.querySelector(".wts-home-dropdown");
    const dropdownToggle = document.querySelector(".wts-dropdown-toggle");
    const dropdownMenu = document.getElementById("wtsHomeDropdown");

    const darkToggle = document.getElementById("wtsDarkToggle");
    const rtlToggle = document.getElementById("wtsRtlToggle");

    const mobileBreakpoint = 1199;


    /* =================================================
       2. SAFE STORAGE
       Prevent errors if browser storage is unavailable.
    ================================================= */

    function readStorage(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function saveStorage(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            // Continue working without persistent storage.
        }
    }


    /* =================================================
       3. HAMBURGER MENU
    ================================================= */

    function isResponsiveView() {
        return window.matchMedia(
            `(max-width: ${mobileBreakpoint}px)`
        ).matches;
    }

    function openNavigation() {
        if (!navigation || !menuToggle) return;

        navigation.classList.add("is-open");
        menuToggle.classList.add("is-active");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
    }

    function closeDropdown() {
        if (!homeDropdown || !dropdownToggle) return;

        homeDropdown.classList.remove("is-open");
        dropdownToggle.setAttribute("aria-expanded", "false");
    }

    function closeNavigation() {
        if (!navigation || !menuToggle) return;

        navigation.classList.remove("is-open");
        menuToggle.classList.remove("is-active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        closeDropdown();
    }

    function toggleNavigation() {
        if (!navigation) return;

        if (navigation.classList.contains("is-open")) {
            closeNavigation();
        } else {
            openNavigation();
        }
    }

    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", function () {
            toggleNavigation();
        });
    }


    /* =================================================
       4. HOME DROPDOWN
       Contains Home 1 and Home 2 only.
    ================================================= */

    if (dropdownToggle && homeDropdown && dropdownMenu) {

        dropdownToggle.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const isOpen = homeDropdown.classList.contains("is-open");

            if (isOpen) {
                closeDropdown();
            } else {
                homeDropdown.classList.add("is-open");

                dropdownToggle.setAttribute("aria-expanded", "true");
            }
        });

        dropdownMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                closeNavigation();
            });
        });
    }


    /* =================================================
       5. DARK MODE
       Persists across pages using localStorage.
    ================================================= */

    function applyDarkMode(enabled) {
        body.classList.toggle("dark-mode", enabled);

        if (darkToggle) {
            const icon = darkToggle.querySelector("i");

            darkToggle.setAttribute(
                "aria-label",
                enabled ? "Enable light mode" : "Enable dark mode"
            );

            darkToggle.setAttribute(
                "title",
                enabled ? "Switch to light mode" : "Switch to dark mode"
            );

            if (icon) {
                icon.classList.toggle("fa-moon", !enabled);
                icon.classList.toggle("fa-sun", enabled);
            }
        }
    }

    const savedTheme = readStorage("wts-theme");

    applyDarkMode(savedTheme === "dark");

    if (darkToggle) {
        darkToggle.addEventListener("click", function () {

            const enableDark = !body.classList.contains("dark-mode");

            applyDarkMode(enableDark);

            saveStorage("wts-theme", enableDark ? "dark" : "light");
        });
    }


    /* =================================================
       6. RTL TOGGLE
       Persists across pages using localStorage.
    ================================================= */

    function applyDirection(isRTL) {
        html.setAttribute("dir", isRTL ? "rtl" : "ltr");

        if (rtlToggle) {
            rtlToggle.setAttribute(
                "aria-label",
                isRTL ? "Switch to left-to-right layout" :
                        "Switch to right-to-left layout"
            );

            rtlToggle.setAttribute(
                "title",
                isRTL ? "Switch to LTR" : "Switch to RTL"
            );

            rtlToggle.setAttribute(
                "aria-pressed",
                isRTL ? "true" : "false"
            );
        }
    }

    const savedDirection = readStorage("wts-direction");

    applyDirection(savedDirection === "rtl");

    if (rtlToggle) {
        rtlToggle.addEventListener("click", function () {

            const enableRTL = html.getAttribute("dir") !== "rtl";

            applyDirection(enableRTL);

            saveStorage(
                "wts-direction",
                enableRTL ? "rtl" : "ltr"
            );
        });
    }


    /* =================================================
       7. CLOSE MENU AFTER NAVIGATION
       Applies to all links inside the shared header.
    ================================================= */

    if (navigation) {
        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                closeNavigation();

            });

        });
    }


    /* =================================================
       8. CLOSE WHEN CLICKING OUTSIDE THE HEADER
    ================================================= */

    document.addEventListener("click", function (event) {

        if (!header || !navigation) return;

        if (!header.contains(event.target)) {
            closeNavigation();
        }

    });


    /* =================================================
       9. CLOSE WITH ESCAPE KEY
    ================================================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeNavigation();

            if (menuToggle && isResponsiveView()) {
                menuToggle.focus();
            }
        }

    });


    /* =================================================
       10. HANDLE RESPONSIVE BREAKPOINT CHANGES
       No separate mobile HTML required.
    ================================================= */

    function handleResize() {

        if (!isResponsiveView()) {
            closeNavigation();
        }

    }

    window.addEventListener("resize", handleResize);

    handleResize();


    /* =================================================
       11. INITIALIZE ARIA STATES
    ================================================= */

    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
    }

    if (dropdownToggle) {
        dropdownToggle.setAttribute("aria-expanded", "false");
    }

});
















/* =====================================================
   WELDING TRADE SCHOOL — HOME 1
   PART 3: AUTOMATIC HERO SLIDER
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const hero = document.getElementById("wtsHome1Hero");

    if (!hero) return;

    const slides = hero.querySelectorAll(".wts-home1-slide");

    if (slides.length < 2) return;

    let currentSlide = 0;
    let slideInterval;

    const slideDuration = 5000;

    /* Show the selected slide */

    function showSlide(index) {
        slides.forEach(function (slide, i) {
            const isActive = i === index;

            slide.classList.toggle("active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
        });

        currentSlide = index;
    }

    /* Automatically move to the next slide */

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    /* Start automatic rotation */

    function startSlider() {
        stopSlider();

        slideInterval = window.setInterval(
            nextSlide,
            slideDuration
        );
    }

    /* Stop automatic rotation */

    function stopSlider() {
        if (slideInterval) {
            window.clearInterval(slideInterval);
            slideInterval = null;
        }
    }

    /* Initialize */

    showSlide(0);
    startSlider();

    /* Pause when the browser tab is hidden */

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            stopSlider();
        } else {
            startSlider();
        }
    });

});











/* =========================================
   SECTION 8 — FAQ ACCORDION
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const faqSection = document.querySelector("#wtsFaq");

    if (!faqSection) return;

    const faqItems = faqSection.querySelectorAll(".wts-faq-item");

    faqItems.forEach(function (item) {
        const button = item.querySelector(".wts-faq-question");
        const answer = item.querySelector(".wts-faq-answer");
        const icon = item.querySelector(".wts-faq-toggle i");

        if (!button || !answer || !icon) return;

        button.addEventListener("click", function () {
            const isOpen = button.getAttribute("aria-expanded") === "true";

            /* Close all FAQ items */
            faqItems.forEach(function (otherItem) {
                const otherButton =
                    otherItem.querySelector(".wts-faq-question");
                const otherAnswer =
                    otherItem.querySelector(".wts-faq-answer");
                const otherIcon =
                    otherItem.querySelector(".wts-faq-toggle i");

                if (!otherButton || !otherAnswer || !otherIcon) return;

                otherButton.setAttribute("aria-expanded", "false");
                otherAnswer.hidden = true;
                otherItem.classList.remove("is-active");

                otherIcon.classList.remove("fa-minus");
                otherIcon.classList.add("fa-plus");
            });

            /* Open clicked item if it was closed */
            if (!isOpen) {
                button.setAttribute("aria-expanded", "true");
                answer.hidden = false;
                item.classList.add("is-active");

                icon.classList.remove("fa-plus");
                icon.classList.add("fa-minus");
            }
        });
    });
});















/*******HOME-2********/


/* =========================================
   HOME 2 — HERO SLIDER
========================================= */

(function () {
    "use strict";

    function initHome2Hero() {
        const hero = document.querySelector("#wtsHome2Hero");

        if (!hero || hero.dataset.sliderInitialized === "true") {
            return;
        }

        const slides = Array.from(
            hero.querySelectorAll(".wts-home2-hero-slide")
        );

        const dots = Array.from(
            hero.querySelectorAll(".wts-home2-hero-dot")
        );

        const image = hero.querySelector(".wts-home2-hero-image");
        const currentCount = hero.querySelector(
            ".wts-home2-hero-current"
        );
        const visualNumber = hero.querySelector(
            ".wts-home2-hero-visual-number"
        );

        if (!slides.length || !dots.length || !image) {
            return;
        }

        /*
         * Each slide uses its own image.
         * Keep these paths consistent with your images folder.
         */
        const slideImages = [
            "images/welding-home2-hero-1.jpg",
            "images/welding-home2-hero-2.jpg"
        ];

        let activeIndex = Math.max(
            0,
            slides.findIndex(function (slide) {
                return slide.classList.contains("is-active");
            })
        );

        function showSlide(index) {
            if (index < 0 || index >= slides.length) {
                return;
            }

            activeIndex = index;

            slides.forEach(function (slide, slideIndex) {
                const isActive = slideIndex === activeIndex;

                slide.classList.toggle("is-active", isActive);
                slide.hidden = !isActive;
                slide.setAttribute(
                    "aria-hidden",
                    String(!isActive)
                );

                const slideHeading = slide.querySelector(
                    ".wts-home2-hero-title"
                );

                if (slideHeading) {
                    slideHeading.setAttribute(
                        "aria-level",
                        slideIndex === 0 ? "1" : "2"
                    );
                }
            });

            dots.forEach(function (dot, dotIndex) {
                const isActive = dotIndex === activeIndex;

                dot.classList.toggle("is-active", isActive);
                dot.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

            const nextImage = slideImages[activeIndex];

            if (nextImage && image.getAttribute("src") !== nextImage) {
                image.src = nextImage;
            }

            if (currentCount) {
                currentCount.textContent = String(
                    activeIndex + 1
                ).padStart(2, "0");
            }

            if (visualNumber) {
                visualNumber.textContent = String(
                    activeIndex + 1
                ).padStart(2, "0");
            }
        }

        dots.forEach(function (dot, index) {
            dot.addEventListener("click", function () {
                showSlide(index);
            });
        });

        /*
         * Optional keyboard navigation while focus is
         * on a slide control.
         */
        const controls = hero.querySelector(
            ".wts-home2-hero-controls"
        );

        if (controls) {
            controls.addEventListener("keydown", function (event) {
                if (
                    event.key !== "ArrowLeft" &&
                    event.key !== "ArrowRight"
                ) {
                    return;
                }

                event.preventDefault();

                const isRTL =
                    document.documentElement.dir === "rtl";

                let nextIndex = activeIndex;

                if (event.key === "ArrowRight") {
                    nextIndex += isRTL ? -1 : 1;
                } else {
                    nextIndex += isRTL ? 1 : -1;
                }

                if (nextIndex < 0) {
                    nextIndex = slides.length - 1;
                }

                if (nextIndex >= slides.length) {
                    nextIndex = 0;
                }

                showSlide(nextIndex);

                if (dots[nextIndex]) {
                    dots[nextIndex].focus();
                }
            });
        }

        hero.dataset.sliderInitialized = "true";

        /* Synchronize initial slide and controls. */
        showSlide(activeIndex);
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initHome2Hero
        );
    } else {
        initHome2Hero();
    }
})();










/**********PROGRAM PAGE*********/


/* =========================================
   SECTION 8 — PROGRAMS FAQ ACCORDION
========================================= */

document.addEventListener("click", function (event) {
    const question = event.target.closest(
        ".wts-programs-faq-question"
    );

    if (!question) return;

    const faqItem = question.closest(
        ".wts-programs-faq-item"
    );

    const faqList = question.closest(
        ".wts-programs-faq-list"
    );

    if (!faqItem || !faqList) return;

    const answerId = question.getAttribute("aria-controls");
    const answer = document.getElementById(answerId);

    if (!answer) return;

    const isCurrentlyOpen =
        question.getAttribute("aria-expanded") === "true";

    // Close all FAQ items in this FAQ list.
    faqList
        .querySelectorAll(".wts-programs-faq-question")
        .forEach(function (otherQuestion) {
            const otherAnswerId =
                otherQuestion.getAttribute("aria-controls");

            const otherAnswer =
                document.getElementById(otherAnswerId);

            otherQuestion.setAttribute("aria-expanded", "false");

            const otherItem = otherQuestion.closest(
                ".wts-programs-faq-item"
            );

            if (otherItem) {
                otherItem.classList.remove("active");
            }

            if (otherAnswer) {
                otherAnswer.hidden = true;
            }

            const otherIcon = otherQuestion.querySelector(
                ".wts-programs-faq-toggle i"
            );

            if (otherIcon) {
                otherIcon.classList.remove("fa-minus");
                otherIcon.classList.add("fa-plus");
            }
        });

    // Open the selected item if it was previously closed.
    if (!isCurrentlyOpen) {
        question.setAttribute("aria-expanded", "true");
        faqItem.classList.add("active");
        answer.hidden = false;

        const icon = question.querySelector(
            ".wts-programs-faq-toggle i"
        );

        if (icon) {
            icon.classList.remove("fa-plus");
            icon.classList.add("fa-minus");
        }
    }
});












/* =====================================================
   WELDING TRADE SCHOOL
   LOGIN + REGISTER PAGE FUNCTIONALITY
   Add to the bottom of your existing js/script.js
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       1. LOGIN PAGE — PASSWORD VISIBILITY
    ================================================= */

    const loginPassword = document.getElementById("wtsLoginPassword");
    const loginPasswordToggle = document.getElementById(
        "wtsLoginPasswordToggle"
    );

    if (loginPassword && loginPasswordToggle) {
        loginPasswordToggle.addEventListener("click", function () {
            const showPassword = loginPassword.type === "password";

            loginPassword.type = showPassword ? "text" : "password";

            const icon = loginPasswordToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-eye", !showPassword);
                icon.classList.toggle("fa-eye-slash", showPassword);
            }

            loginPasswordToggle.setAttribute(
                "aria-label",
                showPassword ? "Hide password" : "Show password"
            );
        });
    }


    /* =================================================
       2. LOGIN PAGE — FORM VALIDATION
    ================================================= */

    const loginForm = document.getElementById("wtsLoginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!loginForm.checkValidity()) {
                loginForm.reportValidity();
                return;
            }

            showWtsMessage(
                loginForm,
                "wtsLoginMessage",
                "wts-login-message",
                "Your details are valid. Connect your authentication service to sign in.",
                "info",
                ".wts-login-submit"
            );
        });
    }


    /* =================================================
       3. REGISTER PAGE — PASSWORD VISIBILITY
       Handles both password fields
    ================================================= */

    const registerPasswordToggles = document.querySelectorAll(
        ".wts-register-password-toggle[data-target]"
    );

    registerPasswordToggles.forEach(function (toggle) {
        toggle.addEventListener("click", function () {
            const targetId = toggle.getAttribute("data-target");
            const passwordField = document.getElementById(targetId);

            if (!passwordField) return;

            const showPassword = passwordField.type === "password";

            passwordField.type = showPassword ? "text" : "password";

            const icon = toggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-eye", !showPassword);
                icon.classList.toggle("fa-eye-slash", showPassword);
            }

            toggle.setAttribute(
                "aria-label",
                showPassword ? "Hide password" : "Show password"
            );
        });
    });


    /* =================================================
       4. REGISTER PAGE — PASSWORD MATCHING
    ================================================= */

    const registerPassword = document.getElementById(
        "wtsRegisterPassword"
    );

    const registerConfirmPassword = document.getElementById(
        "wtsRegisterConfirmPassword"
    );

    function validateWtsPasswords() {
        if (!registerPassword || !registerConfirmPassword) {
            return true;
        }

        if (
            registerConfirmPassword.value !== "" &&
            registerPassword.value !== registerConfirmPassword.value
        ) {
            registerConfirmPassword.setCustomValidity(
                "Passwords do not match."
            );

            return false;
        }

        registerConfirmPassword.setCustomValidity("");
        return true;
    }

    if (registerPassword && registerConfirmPassword) {
        registerPassword.addEventListener("input", validateWtsPasswords);
        registerConfirmPassword.addEventListener("input", validateWtsPasswords);
    }


    /* =================================================
       5. REGISTER PAGE — FORM VALIDATION
    ================================================= */

    const registerForm = document.getElementById("wtsRegisterForm");

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            validateWtsPasswords();

            if (!registerForm.checkValidity()) {
                registerForm.reportValidity();
                return;
            }

            if (
                registerPassword &&
                registerPassword.value.length < 8
            ) {
                showWtsMessage(
                    registerForm,
                    "wtsRegisterMessage",
                    "wts-register-message",
                    "Your password must contain at least 8 characters.",
                    "error",
                    ".wts-register-submit"
                );

                registerPassword.focus();
                return;
            }

            if (
                registerPassword &&
                registerConfirmPassword &&
                registerPassword.value !== registerConfirmPassword.value
            ) {
                showWtsMessage(
                    registerForm,
                    "wtsRegisterMessage",
                    "wts-register-message",
                    "Your passwords do not match.",
                    "error",
                    ".wts-register-submit"
                );

                registerConfirmPassword.focus();
                return;
            }

            showWtsMessage(
                registerForm,
                "wtsRegisterMessage",
                "wts-register-message",
                "Your details are valid. Connect your registration service to create your account.",
                "info",
                ".wts-register-submit"
            );
        });
    }


    /* =================================================
       6. GOOGLE / FACEBOOK / APPLE BUTTONS
       Works on either page if provider buttons exist
    ================================================= */

    const socialButtons = document.querySelectorAll(
        "[data-provider]"
    );

    socialButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const provider = button.getAttribute("data-provider");

            const isRegisterButton = button.classList.contains(
                "wts-register-social-button"
            );

            const form = isRegisterButton ? registerForm : loginForm;

            if (!form) return;

            const messageId = isRegisterButton
                ? "wtsRegisterMessage"
                : "wtsLoginMessage";

            const messageClass = isRegisterButton
                ? "wts-register-message"
                : "wts-login-message";

            const submitSelector = isRegisterButton
                ? ".wts-register-submit"
                : ".wts-login-submit";

            const providerName = provider
                ? provider.charAt(0).toUpperCase() + provider.slice(1)
                : "Social";

            showWtsMessage(
                form,
                messageId,
                messageClass,
                providerName +
                    " authentication requires provider configuration.",
                "info",
                submitSelector
            );
        });
    });


    /* =================================================
       7. SHARED MESSAGE FUNCTION
    ================================================= */

    function showWtsMessage(
        form,
        messageId,
        messageClass,
        message,
        type,
        submitSelector
    ) {
        let messageBox = document.getElementById(messageId);

        if (!messageBox) {
            messageBox = document.createElement("div");
            messageBox.id = messageId;
            messageBox.className = messageClass;
            messageBox.setAttribute("role", "status");
            messageBox.setAttribute("aria-live", "polite");

            const submitButton = form.querySelector(submitSelector);

            if (submitButton) {
                submitButton.insertAdjacentElement("afterend", messageBox);
            } else {
                form.appendChild(messageBox);
            }
        }

        messageBox.textContent = message;
        messageBox.dataset.type = type;
    }

});

/* =========================================
   WELDING SCHOOL — RTL & DARK MODE
   Works on Login and Register pages
========================================= */

(function () {
    "use strict";

    function initWtsThemeControls() {
        const rtlButton = document.getElementById("rtlToggle");
        const darkButton = document.getElementById("darkModeToggle");

        // RTL TOGGLE
        if (rtlButton && !rtlButton.dataset.wtsInitialized) {
            rtlButton.dataset.wtsInitialized = "true";

            rtlButton.addEventListener("click", function () {
                const isRTL = document.documentElement.getAttribute("dir") === "rtl";

                document.documentElement.setAttribute(
                    "dir",
                    isRTL ? "ltr" : "rtl"
                );

                rtlButton.classList.toggle("is-active", !isRTL);
                rtlButton.setAttribute(
                    "aria-pressed",
                    String(!isRTL)
                );
            });
        }

        // DARK MODE TOGGLE
        if (darkButton && !darkButton.dataset.wtsInitialized) {
            darkButton.dataset.wtsInitialized = "true";

            darkButton.addEventListener("click", function () {
                const isDark = document.body.classList.toggle("dark-mode");

                darkButton.classList.toggle("is-active", isDark);
                darkButton.setAttribute(
                    "aria-pressed",
                    String(isDark)
                );
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initWtsThemeControls
        );
    } else {
        initWtsThemeControls();
    }
})();






/* SCROLL TO TOP */
document.addEventListener("DOMContentLoaded", function () {
    const scrollTopBtn = document.getElementById("wtsScrollTop");

    if (!scrollTopBtn) return;

    function toggleScrollTop() {
        scrollTopBtn.classList.toggle(
            "wts-scroll-top-visible",
            window.scrollY > 300
        );
    }

    window.addEventListener("scroll", toggleScrollTop, {
        passive: true
    });

    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    toggleScrollTop();
});