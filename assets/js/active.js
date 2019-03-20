! function(o) {
    o(window).on("load", function() {
        setTimeout(function() {
            o("body").addClass("loaded")
        }, 3e3), o("body").toggleClass("loaded")
    }), o(".main-header").affix({
        offset: {
            top: 70
        }
    }), o(window).resize(function() {
        o("#count-down").TimeCircles().rebuild()
    }), o("#count-down").TimeCircles({
        animation: "smooth",
        bg_width: 2,
        fg_width: .0466,
        circle_bg_color: "rgba(255,255,255,0.2)",
        time: {
            Days: {
                text: "Days",
                color: "#00A5B2",
                show: !0
            },
            Hours: {
                text: "Hours",
                color: "#00A5B2",
                show: !0
            },
            Minutes: {
                text: "Minutes",
                color: "#00A5B2",
                show: !0
            },
            Seconds: {
                text: "Seconds",
                color: "#00A5B2",
                show: !0
            }
        }
    }), o('[data-toggle="tooltip"]').tooltip(), o(window).on("load", function() {
        o(".page-content").mCustomScrollbar({
            theme: "light-thin"
        })
    }), o("nav #nav-icon").on("click", function() {
        o(this).toggleClass("is-active"), o("main").toggleClass("auto-hide"), o("nav ul").addClass("mobile-menu")
    }), o("#nav-menu li a").on("click", function() {
        o("main").removeClass("auto-hide"), o("#nav-icon").removeClass("is-active")
    }), o(".button-close").on("click", function() {
        o("#nav-menu li.active").removeClass("active"), o("#nav-menu li:first-child").addClass("active")
    }), o("#submit").on("click", function() {
        return o.post("contact.php", o("#contact-form").serialize(), function(e) {
            o("#success").fadeIn().html(e), o("#success").delay(2e3).fadeOut()
        }), !1
    }), o("form-selector").ajaxChimp(), o("#mc-form").ajaxChimp({
        language: "en",
        url: "//example.us16.list-manage.com/subscribe/post?u=78f021141e5894e7820649747&amp;id=f6f82cde2d"
    }), o(".carousel").carousel({
        interval: 5e3
    })
}(jQuery);