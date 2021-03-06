! function(t) {
    var e = window;
    Object.keys || (Object.keys = function() {
        "use strict";
        var t = Object.prototype.hasOwnProperty,
            e = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            i = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
            a = i.length;
        return function(s) {
            if ("object" != typeof s && ("function" != typeof s || null === s)) throw new TypeError("Object.keys called on non-object");
            var n, r, o = [];
            for (n in s) t.call(s, n) && o.push(n);
            if (e)
                for (r = 0; r < a; r++) t.call(s, i[r]) && o.push(i[r]);
            return o
        }
    }());
    var i = !1;
    location.hash;
    var a = ["Days", "Hours", "Minutes", "Seconds"],
        s = {
            Seconds: "Minutes",
            Minutes: "Hours",
            Hours: "Days",
            Days: "Years"
        },
        n = {
            Seconds: 1,
            Minutes: 60,
            Hours: 3600,
            Days: 86400,
            Months: 2678400,
            Years: 31536e3
        };

    function r() {
        return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    }

    function o(t, e, i, a, s) {
        for (var r = {}, o = {}, h = {}, d = {}, u = {}, l = {}, c = null, f = 0; f < a.length; f++) {
            var m, p = a[f];
            m = null === c ? i / n[p] : n[c] / n[p];
            var _ = t / n[p],
                b = e / n[p];
            s && (_ = _ > 0 ? Math.floor(_) : Math.ceil(_), b = b > 0 ? Math.floor(b) : Math.ceil(b)), "Days" !== p && (_ %= m, b %= m), r[p] = _, h[p] = Math.abs(_), o[p] = b, l[p] = Math.abs(b), d[p] = Math.abs(_) / m, u[p] = Math.abs(b) / m, c = p
        }
        return {
            raw_time: r,
            raw_old_time: o,
            time: h,
            old_time: l,
            pct: d,
            old_pct: u
        }
    }
    Array.prototype.indexOf || (Array.prototype.indexOf = function(t) {
        var e = this.length >>> 0,
            i = Number(arguments[1]) || 0;
        for ((i = i < 0 ? Math.ceil(i) : Math.floor(i)) < 0 && (i += e); i < e; i++)
            if (i in this && this[i] === t) return i;
        return -1
    });
    var h = {};

    function d() {
        void 0 !== e.TC_Instance_List ? h = e.TC_Instance_List : e.TC_Instance_List = h,
            function(t) {
                for (var e = ["webkit", "moz"], i = 0; i < e.length && !t.requestAnimationFrame; ++i) t.requestAnimationFrame = t[e[i] + "RequestAnimationFrame"], t.cancelAnimationFrame = t[e[i] + "CancelAnimationFrame"];
                t.requestAnimationFrame && t.cancelAnimationFrame || (t.requestAnimationFrame = function(e, i, a) {
                    void 0 === a && (a = {
                        data: {
                            last_frame: 0
                        }
                    });
                    var s = (new Date).getTime(),
                        n = Math.max(0, 16 - (s - a.data.last_frame)),
                        r = t.setTimeout(function() {
                            e(s + n)
                        }, n);
                    return a.data.last_frame = s + n, r
                }, t.cancelAnimationFrame = function(t) {
                    clearTimeout(t)
                })
            }(e)
    }
    var u = function(t, e) {
        this.element = t, this.container, this.listeners = null, this.data = {
            paused: !1,
            last_frame: 0,
            animation_frame: null,
            interval_fallback: null,
            timer: !1,
            total_duration: null,
            prev_time: null,
            drawn_units: [],
            text_elements: {
                Days: null,
                Hours: null,
                Minutes: null,
                Seconds: null
            },
            attributes: {
                canvas: null,
                context: null,
                item_size: null,
                line_width: null,
                radius: null,
                outer_radius: null
            },
            state: {
                fading: {
                    Days: !1,
                    Hours: !1,
                    Minutes: !1,
                    Seconds: !1
                }
            }
        }, this.config = null, this.setOptions(e), this.initialize()
    };
    u.prototype.clearListeners = function() {
        this.listeners = {
            all: [],
            visible: []
        }
    }, u.prototype.addTime = function(t) {
        if (this.data.attributes.ref_date instanceof Date) {
            var e = this.data.attributes.ref_date;
            e.setSeconds(e.getSeconds() + t)
        } else isNaN(this.data.attributes.ref_date) || (this.data.attributes.ref_date += 1e3 * t)
    }, u.prototype.initialize = function(a) {
        this.data.drawn_units = [];
        for (var s = 0; s < Object.keys(this.config.time).length; s++) {
            var n = Object.keys(this.config.time)[s];
            this.config.time[n].show && this.data.drawn_units.push(n)
        }
        t(this.element).children("div.time_circles").remove(), void 0 === a && (a = !0), (a || null === this.listeners) && this.clearListeners(), this.container = t("<div>"), this.container.addClass("time_circles"), this.container.appendTo(this.element);
        var r = this.element.offsetHeight,
            o = this.element.offsetWidth;
        0 === r && (r = t(this.element).height()), 0 === o && (o = t(this.element).width()), 0 === r && o > 0 ? r = o / this.data.drawn_units.length : 0 === o && r > 0 && (o = r * this.data.drawn_units.length);
        var h = document.createElement("canvas");
        h.width = o, h.height = r, this.data.attributes.canvas = t(h), this.data.attributes.canvas.appendTo(this.container);
        var d, u = !(!(d = document.createElement("canvas")).getContext || !d.getContext("2d"));
        u || "undefined" == typeof G_vmlCanvasManager || (G_vmlCanvasManager.initElement(h), i = !0, u = !0), u && (this.data.attributes.context = h.getContext("2d")), this.data.attributes.item_size = Math.min(o / this.data.drawn_units.length, r), this.data.attributes.line_width = this.data.attributes.item_size * this.config.fg_width, this.data.attributes.radius = (.8 * this.data.attributes.item_size - this.data.attributes.line_width) / 2, this.data.attributes.outer_radius = this.data.attributes.radius + .4 * Math.max(this.data.attributes.line_width, this.data.attributes.line_width * this.config.bg_width);
        s = 0;
        for (var l in this.data.text_elements)
            if (this.config.time[l].show) {
                var c = t("<div>");
                c.addClass("textDiv_" + l + " time-selector"), c.css("top", Math.round(.35 * this.data.attributes.item_size)), c.css("left", Math.round(s++ * this.data.attributes.item_size)), c.css("width", this.data.attributes.item_size), c.appendTo(this.container);
                var f = t("<span>");
                f.css("font-size", Math.round(2 * this.config.text_size * this.data.attributes.item_size)), f.css("line-height", Math.round(this.config.text_size * this.data.attributes.item_size) + "px"), f.appendTo(c);
                var m = t("<h4>");
                m.text(this.config.time[l].text), m.css("font-size", Math.round(this.config.text_size * this.data.attributes.item_size)), m.css("line-height", Math.round(this.config.text_size * this.data.attributes.item_size) + "px"), m.appendTo(c), this.data.text_elements[l] = f
            } this.start(), this.config.start || (this.data.paused = !0);
        var p = this;
        this.data.interval_fallback = e.setInterval(function() {
            p.update.call(p, !0)
        }, 100)
    }, u.prototype.update = function(t) {
        if (void 0 === t) t = !1;
        else if (t && this.data.paused) return;
        var s, r;
        i && this.data.attributes.context.clearRect(0, 0, this.data.attributes.canvas[0].width, this.data.attributes.canvas[0].hright);
        var h = this.data.prev_time,
            d = new Date;
        if (this.data.prev_time = d, null === h && (h = d), !this.config.count_past_zero && d > this.data.attributes.ref_date) {
            for (var u = 0; u < this.data.drawn_units.length; u++) {
                var l = this.data.drawn_units[u];
                this.data.text_elements[l].text("0");
                var c = u * this.data.attributes.item_size + this.data.attributes.item_size / 2,
                    f = this.data.attributes.item_size / 2,
                    m = this.config.time[l].color;
                this.drawArc(c, f, m, 0)
            }
            this.stop()
        } else {
            s = (this.data.attributes.ref_date - d) / 1e3, r = (this.data.attributes.ref_date - h) / 1e3;
            var p = "smooth" !== this.config.animation,
                _ = o(s, r, this.data.total_duration, this.data.drawn_units, p),
                b = o(s, r, n.Years, a, p),
                v = (u = 0, 0),
                g = null,
                y = this.data.drawn_units.slice();
            for (var u in a) {
                l = a[u];
                if (Math.floor(b.raw_time[l]) !== Math.floor(b.raw_old_time[l]) && this.notifyListeners(l, Math.floor(b.time[l]), Math.floor(s), "all"), !(y.indexOf(l) < 0)) {
                    if (Math.floor(_.raw_time[l]) !== Math.floor(_.raw_old_time[l]) && this.notifyListeners(l, Math.floor(_.time[l]), Math.floor(s), "visible"), !t) {
                        this.data.text_elements[l].text(Math.floor(Math.abs(_.time[l])));
                        c = v * this.data.attributes.item_size + this.data.attributes.item_size / 2, f = this.data.attributes.item_size / 2, m = this.config.time[l].color;
                        "smooth" === this.config.animation ? (null === g || i || (Math.floor(_.time[g]) > Math.floor(_.old_time[g]) ? (this.radialFade(c, f, m, 1, l), this.data.state.fading[l] = !0) : Math.floor(_.time[g]) < Math.floor(_.old_time[g]) && (this.radialFade(c, f, m, 0, l), this.data.state.fading[l] = !0)), this.data.state.fading[l] || this.drawArc(c, f, m, _.pct[l])) : this.animateArc(c, f, m, _.pct[l], _.old_pct[l], (new Date).getTime() + 200)
                    }
                    g = l, v++
                }
            }
            if (!this.data.paused && !t) {
                var w = this,
                    M = function() {
                        w.update.call(w)
                    };
                if ("smooth" === this.config.animation) this.data.animation_frame = e.requestAnimationFrame(M, w.element, w);
                else {
                    var x = s % 1 * 1e3;
                    x < 0 && (x = 1e3 + x), x += 50, w.data.animation_frame = e.setTimeout(function() {
                        w.data.animation_frame = e.requestAnimationFrame(M, w.element, w)
                    }, x)
                }
            }
        }
    }, u.prototype.animateArc = function(t, i, a, s, n, r) {
        if (null !== this.data.attributes.context) {
            var o = n - s;
            if (Math.abs(o) > .5) 0 === s ? this.radialFade(t, i, a, 1) : this.radialFade(t, i, a, 0);
            else {
                var h = (200 - (r - (new Date).getTime())) / 200;
                h > 1 && (h = 1);
                var d = n * (1 - h) + s * h;
                if (this.drawArc(t, i, a, d), h >= 1) return;
                var u = this;
                e.requestAnimationFrame(function() {
                    u.animateArc(t, i, a, s, n, r)
                }, this.element)
            }
        }
    }, u.prototype.drawArc = function(t, e, a, s) {
        if (null !== this.data.attributes.context) {
            var n, r, o, h = Math.max(this.data.attributes.outer_radius, this.data.attributes.item_size / 2);
            i || this.data.attributes.context.clearRect(t - h, e - h, 2 * h, 2 * h), this.config.use_background && (this.data.attributes.context.beginPath(), this.data.attributes.context.arc(t, e, this.data.attributes.radius, 0, 2 * Math.PI, !1), this.data.attributes.context.lineWidth = this.data.attributes.line_width * this.config.bg_width, this.data.attributes.context.strokeStyle = this.config.circle_bg_color, this.data.attributes.context.stroke());
            var d = -.5 * Math.PI,
                u = 4 * Math.PI;
            n = d + this.config.start_angle / 360 * u;
            var l = 2 * s * Math.PI;
            "Both" === this.config.direction ? (o = !1, r = (n -= l / 2) + l) : "Clockwise" === this.config.direction ? (o = !1, r = n + l) : (o = !0, r = n - l), this.data.attributes.context.beginPath(), this.data.attributes.context.arc(t, e, this.data.attributes.radius, n, r, o), this.data.attributes.context.lineWidth = this.data.attributes.line_width, this.data.attributes.context.strokeStyle = a, this.data.attributes.context.stroke()
        }
    }, u.prototype.radialFade = function(t, i, a, s, n) {
        var r, o = function(t) {
                t = t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(t, e, i, a) {
                    return e + e + i + i + a + a
                });
                var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
                return e ? {
                    r: parseInt(e[1], 16),
                    g: parseInt(e[2], 16),
                    b: parseInt(e[3], 16)
                } : null
            }(a),
            h = this,
            d = .2 * (1 === s ? -1 : 1);
        for (r = 0; s <= 1 && s >= 0; r++) ! function() {
            var a = 50 * r,
                n = "rgba(" + o.r + ", " + o.g + ", " + o.b + ", " + Math.round(10 * s) / 10 + ")";
            e.setTimeout(function() {
                h.drawArc(t, i, n, 1)
            }, a)
        }(), s += d;
        void 0 !== typeof n && e.setTimeout(function() {
            h.data.state.fading[n] = !1
        }, 50 * r)
    }, u.prototype.timeLeft = function() {
        if (this.data.paused && "number" == typeof this.data.timer) return this.data.timer;
        var t = new Date;
        return (this.data.attributes.ref_date - t) / 1e3
    }, u.prototype.start = function() {
        e.cancelAnimationFrame(this.data.animation_frame), e.clearTimeout(this.data.animation_frame);
        var i = t(this.element).data("date");
        if (void 0 === i && (i = t(this.element).attr("data-date")), "string" == typeof i) this.data.attributes.ref_date = function(t) {
            var e = t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{1,2}:[0-9]{2}:[0-9]{2}$/);
            if (null !== e && e.length > 0) {
                var i = t.split(" "),
                    a = i[0].split("-"),
                    s = i[1].split(":");
                return new Date(a[0], a[1] - 1, a[2], s[0], s[1], s[2])
            }
            var n = Date.parse(t);
            return isNaN(n) ? (n = Date.parse(t.replace(/-/g, "/").replace("T", " ")), isNaN(n) ? new Date : n) : n
        }(i);
        else if ("number" == typeof this.data.timer) this.data.paused && (this.data.attributes.ref_date = (new Date).getTime() + 1e3 * this.data.timer);
        else {
            var a = t(this.element).data("timer");
            void 0 === a && (a = t(this.element).attr("data-timer")), "string" == typeof a && (a = parseFloat(a)), "number" == typeof a ? (this.data.timer = a, this.data.attributes.ref_date = (new Date).getTime() + 1e3 * a) : this.data.attributes.ref_date = this.config.ref_date
        }
        this.data.paused = !1, this.update.call(this)
    }, u.prototype.restart = function() {
        this.data.timer = !1, this.start()
    }, u.prototype.stop = function() {
        "number" == typeof this.data.timer && (this.data.timer = this.timeLeft(this)), this.data.paused = !0, e.cancelAnimationFrame(this.data.animation_frame)
    }, u.prototype.destroy = function() {
        this.clearListeners(), this.stop(), e.clearInterval(this.data.interval_fallback), this.data.interval_fallback = null, this.container.remove(), t(this.element).removeAttr("data-tc-id"), t(this.element).removeData("tc-id")
    }, u.prototype.setOptions = function(i) {
        if (null === this.config && (this.default_options.ref_date = new Date, this.config = t.extend(!0, {}, this.default_options)), t.extend(!0, this.config, i), e = this.config.use_top_frame ? window.top : window, d(), this.data.total_duration = this.config.total_duration, "string" == typeof this.data.total_duration)
            if (void 0 !== n[this.data.total_duration]) this.data.total_duration = n[this.data.total_duration];
            else if ("Auto" === this.data.total_duration)
            for (var a = 0; a < Object.keys(this.config.time).length; a++) {
                var r = Object.keys(this.config.time)[a];
                if (this.config.time[r].show) {
                    this.data.total_duration = n[s[r]];
                    break
                }
            } else this.data.total_duration = n.Years, console.error("Valid values for TimeCircles config.total_duration are either numeric, or (string) Years, Months, Days, Hours, Minutes, Auto")
    }, u.prototype.addListener = function(t, e, i) {
        "function" == typeof t && (void 0 === i && (i = "visible"), this.listeners[i].push({
            func: t,
            scope: e
        }))
    }, u.prototype.notifyListeners = function(t, e, i, a) {
        for (var s = 0; s < this.listeners[a].length; s++) {
            var n = this.listeners[a][s];
            n.func.apply(n.scope, [t, e, i])
        }
    }, u.prototype.default_options = {
        ref_date: new Date,
        start: !0,
        animation: "smooth",
        count_past_zero: !0,
        circle_bg_color: "#60686F",
        use_background: !0,
        fg_width: .1,
        bg_width: 1.2,
        text_size: .09,
        total_duration: "Auto",
        direction: "Clockwise",
        use_top_frame: !1,
        start_angle: 0,
        time: {
            Days: {
                show: !0,
                text: "Days",
                color: "#FC6"
            },
            Hours: {
                show: !0,
                text: "Hours",
                color: "#9CF"
            },
            Minutes: {
                show: !0,
                text: "Minutes",
                color: "#BFB"
            },
            Seconds: {
                show: !0,
                text: "Seconds",
                color: "#F99"
            }
        }
    };
    var l = function(t, e) {
        this.elements = t, this.options = e, this.foreach()
    };
    l.prototype.getInstance = function(e) {
        var i, a = t(e).data("tc-id");
        if (void 0 === a && (a = r() + r() + "-" + r() + "-" + r() + "-" + r() + "-" + r() + r() + r(), t(e).attr("data-tc-id", a)), void 0 === h[a]) {
            var s = this.options,
                n = t(e).data("options");
            "string" == typeof n && (n = JSON.parse(n)), "object" == typeof n && (s = t.extend(!0, {}, this.options, n)), i = new u(e, s), h[a] = i
        } else i = h[a], void 0 !== this.options && i.setOptions(this.options);
        return i
    }, l.prototype.addTime = function(t) {
        this.foreach(function(e) {
            e.addTime(t)
        })
    }, l.prototype.foreach = function(t) {
        var e = this;
        return this.elements.each(function() {
            var i = e.getInstance(this);
            "function" == typeof t && t(i)
        }), this
    }, l.prototype.start = function() {
        return this.foreach(function(t) {
            t.start()
        }), this
    }, l.prototype.stop = function() {
        return this.foreach(function(t) {
            t.stop()
        }), this
    }, l.prototype.restart = function() {
        return this.foreach(function(t) {
            t.restart()
        }), this
    }, l.prototype.rebuild = function() {
        return this.foreach(function(t) {
            t.initialize(!1)
        }), this
    }, l.prototype.getTime = function() {
        return this.getInstance(this.elements[0]).timeLeft()
    }, l.prototype.addListener = function(t, e) {
        void 0 === e && (e = "visible");
        var i = this;
        return this.foreach(function(a) {
            a.addListener(t, i.elements, e)
        }), this
    }, l.prototype.destroy = function() {
        return this.foreach(function(t) {
            t.destroy()
        }), this
    }, l.prototype.end = function() {
        return this.elements
    }, t.fn.TimeCircles = function(t) {
        return new l(this, t)
    }
}(jQuery);