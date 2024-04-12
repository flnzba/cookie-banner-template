document.addEventListener("DOMContentLoaded", function () {
    var cookieBanner = document.getElementById("cookieBanner");
    var acceptButton = document.getElementById("cookieAcceptButton");

    // Check if the cookieBannerCookie is set
    if (!getCookie("cookieBannerAccepted") ) {
        // Show the banner
        cookieBanner.classList.remove("hidden");
    } else {
        // If the cookie is already accepted, activate Google Analytics directly
        activateGoogleAnalytics();
    }

    acceptButton.addEventListener("click", function () {
        // Set a cookie for 30 days to remember the choice
        setCookie("cookieBannerAccepted", "true", 30);
        // Hide the banner
        cookieBanner.classList.add("hidden");
        // Activate Google Analytics
        activateGoogleAnalytics();
    });

    // Function to set a cookie
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Function to get a cookie
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Function to dynamically insert the Google Analytics script
    function activateGoogleAnalytics() {
        // Check if GA script is already inserted
        if (document.querySelector("script#ga-script")) {
            return; // GA script is already active
        }
        // Replace 'YOUR_GA_MEASUREMENT_ID' with your actual Google Analytics Measurement ID
        var gaMeasurementId = 'G-YE6TEV8YH0';
        var script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
        script.onload = function () {
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());

            gtag('config', gaMeasurementId);
        };
        script.setAttribute('id', 'ga-script');
        document.head.appendChild(script);
        
    }
});
