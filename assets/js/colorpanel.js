! function(o) {
    o(".color1").click(function() {
        o("#colors").attr("href", "assets/color-log/color1.css"), o(".logo a img").attr("src", "assets/color-log/logo1.png");
        var t = document.createElement("script");
        return t.type = "text/javascript", t.src = "assets/color-log/color-js/color1.js", document.getElementsByTagName("head")[0].appendChild(t), !1
    }), o(".color2").click(function() {
        o("#colors").attr("href", "assets/color-log/color2.css"), o(".logo a img").attr("src", "assets/color-log/logo2.png");
        var t = document.createElement("script");
        return t.type = "text/javascript", t.src = "assets/color-log/color-js/color2.js", document.getElementsByTagName("head")[0].appendChild(t), !1
    }), o(".color3").click(function() {
        o("#colors").attr("href", "assets/color-log/color3.css"), o(".logo a img").attr("src", "assets/color-log/logo3.png");
        var t = document.createElement("script");
        return t.type = "text/javascript", t.src = "assets/color-log/color-js/color3.js", document.getElementsByTagName("head")[0].appendChild(t), !1
    }), o(".color4").click(function() {
        o("#colors").attr("href", "assets/color-log/color4.css"), o(".logo a img").attr("src", "assets/color-log/logo4.png");
        var t = document.createElement("script");
        return t.type = "text/javascript", t.src = "assets/color-log/color-js/color4.js", document.getElementsByTagName("head")[0].appendChild(t), !1
    }), o(".color5").click(function() {
        o("#colors").attr("href", "assets/color-log/color5.css"), o(".logo a img").attr("src", "assets/color-log/logo5.png");
        var t = document.createElement("script");
        return t.type = "text/javascript", t.src = "assets/color-log/color-js/color5.js", document.getElementsByTagName("head")[0].appendChild(t), !1
    }), o(".color6").click(function() {
        o("#colors").attr("href", "assets/color-log/color6.css"), o(".logo a img").attr("src", "assets/color-log/logo6.png");
        var t = document.createElement("script");
        return t.type = "text/javascript", t.src = "assets/color-log/color-js/color6.js", document.getElementsByTagName("head")[0].appendChild(t), !1
    }), o(".icon").click(function(t) {
        return t.preventDefault(), o(this).hasClass("inOut") ? o(".mp-color").stop().animate({
            left: "-280px"
        }, 500) : o(".mp-color").stop().animate({
            left: "0px"
        }, 500), o(this).toggleClass("inOut"), !1
    })
}(jQuery);