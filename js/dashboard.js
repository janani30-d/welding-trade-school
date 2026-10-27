
/* =========================================
   WELDPRO STUDENT DASHBOARD
   PART 4 — DASHBOARD JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    /* =========================================
       1. ELEMENTS
    ========================================= */

    const sidebar = document.getElementById("wtsSidebar");
    const menuToggle = document.getElementById("wtsMenuToggle");
    const closeButton = document.getElementById("wtsSidebarClose");
    const overlay = document.getElementById("wtsSidebarOverlay");

    const settingsButton = document.getElementById("wtsSettingsToggle");
    const settingsMenu = document.getElementById("wtsSettingsMenu");

    const profileButton = document.getElementById("wtsProfileToggle");
    const profileMenu = document.getElementById("wtsProfileMenu");

    const mobileQuery = window.matchMedia("(max-width: 1199px)");

    // Stop if this is not the dashboard page.
    if (!sidebar) return;

    /* =========================================
       2. SIDEBAR OPEN / CLOSE
    ========================================= */

    function openSidebar() {
        if (!mobileQuery.matches) return;

        sidebar.classList.add("is-open");

        if (overlay) {
            overlay.classList.add("is-visible");
        }

        document.body.classList.add("wts-sidebar-open");

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close sidebar");
        }
    }

    function closeSidebar() {
        sidebar.classList.remove("is-open");

        if (overlay) {
            overlay.classList.remove("is-visible");
        }

        document.body.classList.remove("wts-sidebar-open");

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open sidebar");
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener("click", function () {
            if (sidebar.classList.contains("is-open")) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (closeButton) {
        closeButton.addEventListener("click", closeSidebar);
    }

    if (overlay) {
        overlay.addEventListener("click", closeSidebar);
    }

    /* =========================================
       3. CLOSE SIDEBAR AFTER NAVIGATION
    ========================================= */

    sidebar.querySelectorAll(".wts-nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
            if (mobileQuery.matches) {
                closeSidebar();
            }
        });
    });

    /* =========================================
       4. RESPONSIVE RESIZE
    ========================================= */

    function handleResize() {
        if (!mobileQuery.matches) {
            closeSidebar();
        }
    }

    if (mobileQuery.addEventListener) {
        mobileQuery.addEventListener("change", handleResize);
    } else {
        mobileQuery.addListener(handleResize);
    }

    /* =========================================
       5. SETTINGS / PROFILE DROPDOWNS
    ========================================= */

    const dropdowns = [
        {
            button: settingsButton,
            menu: settingsMenu
        },
        {
            button: profileButton,
            menu: profileMenu
        }
    ];

    function closeAllDropdowns() {
        dropdowns.forEach(function (item) {
            if (!item.button || !item.menu) return;

            item.menu.hidden = true;
            item.button.setAttribute("aria-expanded", "false");
        });
    }

    dropdowns.forEach(function (item) {
        if (!item.button || !item.menu) return;

        item.button.addEventListener("click", function (event) {
            event.stopPropagation();

            const shouldOpen = item.menu.hidden;

            closeAllDropdowns();

            item.menu.hidden = !shouldOpen;
            item.button.setAttribute(
                "aria-expanded",
                String(shouldOpen)
            );
        });

        item.menu.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    });

    // Close dropdowns when clicking outside.
    document.addEventListener("click", function () {
        closeAllDropdowns();
    });

    /* =========================================
       6. ESCAPE KEY SUPPORT
    ========================================= */

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeSidebar();
            closeAllDropdowns();
        }
    });

    /* =========================================
       7. INITIAL STATE
    ========================================= */

    closeSidebar();
    closeAllDropdowns();

});

/* =========================================
   8. DASHBOARD RTL MODE
========================================= */

const rtlButton = document.getElementById("rtlToggle");

function updateRtlState() {
    const isRTL =
        document.documentElement.getAttribute("dir") === "rtl";

    if (rtlButton) {
        rtlButton.classList.toggle("is-active", isRTL);
        rtlButton.setAttribute("aria-pressed", String(isRTL));
    }
}

if (rtlButton) {
    rtlButton.addEventListener("click", function () {
        const isRTL =
            document.documentElement.getAttribute("dir") === "rtl";

        document.documentElement.setAttribute(
            "dir",
            isRTL ? "ltr" : "rtl"
        );

        updateRtlState();
    });
}

/* =========================================
   9. DASHBOARD DARK MODE
========================================= */

const darkModeButton = document.getElementById("darkModeToggle");

function updateDarkModeState() {
    const isDark = document.body.classList.contains("dark-mode");

    if (darkModeButton) {
        darkModeButton.classList.toggle("is-active", isDark);
        darkModeButton.setAttribute("aria-pressed", String(isDark));

        const icon = darkModeButton.querySelector("i");

        if (icon) {
            icon.className = isDark
                ? "fa-solid fa-sun"
                : "fa-solid fa-moon";
        }
    }
}

if (darkModeButton) {
    darkModeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        updateDarkModeState();
    });
}

/* =========================================
   10. SETTINGS DROPDOWN THEME SHORTCUTS
========================================= */

document.getElementById("wtsSettingsDark")
    ?.addEventListener("click", function () {
        darkModeButton?.click();
        closeAllDropdowns();
    });

document.getElementById("wtsSettingsRtl")
    ?.addEventListener("click", function () {
        rtlButton?.click();
        closeAllDropdowns();
    });

/* INITIAL STATES */

updateRtlState();
updateDarkModeState();




















/* =========================================
   WTS LOGOUT MODAL
   File: js/logout-modal.js
========================================= */

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("wtsLogoutModal");
    const closeButton = document.getElementById("wtsLogoutClose");
    const stayButton = document.getElementById("wtsLogoutStay");
    const confirmButton = document.getElementById("wtsLogoutConfirm");
    const logoutLinks = document.querySelectorAll(".wts-logout-link");

    if (!modal || !closeButton || !stayButton || !confirmButton) {
        return;
    }

    let previousFocus = null;

    function openLogoutModal(event) {
        if (event) {
            event.preventDefault();
        }

        previousFocus = document.activeElement;

        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        requestAnimationFrame(function () {
            modal.classList.add("wts-logout-open");
            closeButton.focus();
        });
    }

    function closeLogoutModal() {
        modal.classList.remove("wts-logout-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        window.setTimeout(function () {
            if (!modal.classList.contains("wts-logout-open")) {
                modal.hidden = true;

                if (previousFocus && previousFocus.isConnected) {
                    previousFocus.focus();
                }
            }
        }, 250);
    }

    logoutLinks.forEach(function (link) {
        link.addEventListener("click", openLogoutModal);
    });

    closeButton.addEventListener("click", closeLogoutModal);
    stayButton.addEventListener("click", closeLogoutModal);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeLogoutModal();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (modal.hidden) {
            return;
        }

        if (event.key === "Escape") {
            closeLogoutModal();
        }

        if (event.key === "Tab") {
            const focusable = modal.querySelectorAll(
                'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (!first || !last) {
                return;
            }

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    confirmButton.addEventListener("click", function () {
        window.location.href = "login.html";
    });
});
