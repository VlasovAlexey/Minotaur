/*! For license information please see leaflet.betterfilelayer.min.js.LICENSE.txt */
var t = {
    311: t => {
        var e = {};

        function i(t) {
            return Math.floor(Math.abs(t) + .5) * Math.sign(t)
        }

        function r(t, e, r) {
            var n = (t = i(t * r)) - (e = i(e * r));
            n <<= 1, t - e < 0 && (n = ~n);
            for (var s = ""; n >= 32;) s += String.fromCharCode(63 + (32 | 31 & n)), n >>= 5;
            return s + String.fromCharCode(n + 63)
        }

        function n(t) {
            for (var e = [], i = 0; i < t.length; i++) e.push(t[i].slice().reverse());
            return e
        }
        e.decode = function(t, e) {
            for (var i, r = 0, n = 0, s = 0, a = [], o = 0, h = 0, u = null, l = Math.pow(10, e || 5); r < t.length;) {
                u = null, o = 0, h = 0;
                do {
                    h |= (31 & (u = t.charCodeAt(r++) - 63)) << o, o += 5
                } while (u >= 32);
                i = 1 & h ? ~(h >> 1) : h >> 1, o = h = 0;
                do {
                    h |= (31 & (u = t.charCodeAt(r++) - 63)) << o, o += 5
                } while (u >= 32);
                n += i, s += 1 & h ? ~(h >> 1) : h >> 1, a.push([n / l, s / l])
            }
            return a
        }, e.encode = function(t, e) {
            if (!t.length) return "";
            for (var i = Math.pow(10, e || 5), n = r(t[0][0], 0, i) + r(t[0][1], 0, i), s = 1; s < t.length; s++) {
                var a = t[s],
                    o = t[s - 1];
                n += r(a[0], o[0], i), n += r(a[1], o[1], i)
            }
            return n
        }, e.fromGeoJSON = function(t, i) {
            if (t && "Feature" === t.type && (t = t.geometry), !t || "LineString" !== t.type) throw new Error("Input must be a GeoJSON LineString");
            return e.encode(n(t.coordinates), i)
        }, e.toGeoJSON = function(t, i) {
            return {
                type: "LineString",
                coordinates: n(e.decode(t, i))
            }
        }, t.exports && (t.exports = e)
    },
    596: t => {
        function e(t, e) {
            var r = i(t, e);
            return r.whole + "° " + (r.minutes ? r.minutes + "' " : "") + (r.seconds ? r.seconds + '" ' : "") + r.dir
        }

        function i(t, e) {
            var i = ({
                    lat: ["N", "S"],
                    lon: ["E", "W"]
                } [e] || "")[t >= 0 ? 0 : 1],
                r = Math.abs(t),
                n = Math.floor(r),
                s = 60 * (r - n),
                a = Math.floor(s);
            return {
                whole: n,
                minutes: a,
                seconds: Math.floor(60 * (s - a)),
                dir: i
            }
        }

        function r(t, e) {
            if (e || (e = "NSEW"), "string" != typeof t) return null;
            var i = (t = t.toUpperCase()).match(/^[\s\,]*([NSEW])?\s*([\-|\—|\―]?[0-9.]+)[°º˚]?\s*(?:([0-9.]+)['’′‘]\s*)?(?:([0-9.]+)(?:''|"|”|″)\s*)?([NSEW])?/);
            if (!i) return null;
            var r, n = i[0];
            if (i[1] && i[5] ? (r = i[1], n = n.slice(0, -1)) : r = i[1] || i[5], r && -1 === e.indexOf(r)) return null;
            var s = i[2] ? parseFloat(i[2]) : 0,
                a = i[3] ? parseFloat(i[3]) / 60 : 0,
                o = i[4] ? parseFloat(i[4]) / 3600 : 0,
                h = s < 0 ? -1 : 1;
            return "S" !== r && "W" !== r || (h *= -1), {
                val: (Math.abs(s) + a + o) * h,
                dim: r,
                matched: n,
                remain: t.slice(n.length)
            }
        }
        t.exports = function(t, e) {
            var i = r(t, e);
            return null === i ? null : i.val
        }, t.exports.pair = function(t, e) {
            var i = r(t = t.trim(), e);
            if (!i) return null;
            var n, s, a, o = r(t = i.remain.trim(), e);
            return !o || o.remain ? null : i.dim ? (n = i.val, s = o.val, "N" === (a = i.dim) || "S" === a ? [n, s] : "W" === a || "E" === a ? [s, n] : void 0) : [i.val, o.val]
        }, t.exports.format = e, t.exports.formatPair = function(t) {
            return e(t.lat, "lat") + " " + e(t.lon, "lon")
        }, t.exports.coordToDMS = i
    },
    597: (t, e, i) => {
        var r = function() {
            var t, e = /\s*/g,
                r = /^\s*|\s*$/g,
                n = /\s+/;

            function s(t) {
                if (!t || !t.length) return 0;
                for (var e = 0, i = 0; e < t.length; e++) i = (i << 5) - i + t.charCodeAt(e) | 0;
                return i
            }

            function a(t, e) {
                return t.getElementsByTagName(e)
            }

            function o(t, e) {
                return t.getAttribute(e)
            }

            function h(t, e) {
                return parseFloat(o(t, e))
            }

            function u(t, e) {
                var i = a(t, e);
                return i.length ? i[0] : null
            }

            function l(t) {
                for (var e = 0, i = []; e < t.length; e++) i[e] = parseFloat(t[e]);
                return i
            }

            function c(t) {
                var e;
                return t && (e = t).normalize && e.normalize(), t && t.textContent || ""
            }

            function f(t, e) {
                var i, r, n = {};
                for (r = 0; r < e.length; r++)(i = u(t, e[r])) && (n[e[r]] = c(i));
                return n
            }

            function d(t, e) {
                for (var i in e) t[i] = e[i]
            }

            function p(t) {
                return l(t.replace(e, "").split(","))
            }

            function m(t) {
                for (var e = t.replace(r, "").split(n), i = [], s = 0; s < e.length; s++) i.push(p(e[s]));
                return i
            }

            function g(t) {
                var e, i = [h(t, "lon"), h(t, "lat")],
                    r = u(t, "ele"),
                    n = u(t, "gpxtpx:hr") || u(t, "hr"),
                    s = u(t, "time");
                return r && (e = parseFloat(c(r)), isNaN(e) || i.push(e)), {
                    coordinates: i,
                    time: s ? c(s) : null,
                    heartRate: n ? parseFloat(c(n)) : null
                }
            }

            function y(e) {
                return void 0 !== e.xml ? e.xml : t.serializeToString(e)
            }
            return "undefined" != typeof XMLSerializer ? t = new XMLSerializer : "object" != typeof process || process.browser || (t = new(i(692).XMLSerializer)), {
                kml: function(t) {
                    for (var e = {
                            type: "FeatureCollection",
                            features: []
                        }, i = {}, r = {}, n = {}, h = ["Polygon", "LineString", "Point", "Track", "gx:Track"], f = a(t, "Placemark"), d = a(t, "Style"), g = a(t, "StyleMap"), _ = 0; _ < d.length; _++) {
                        var v = s(y(d[_])).toString(16);
                        i["#" + o(d[_], "id")] = v, r[v] = d[_]
                    }
                    for (var b = 0; b < g.length; b++) {
                        i["#" + o(g[b], "id")] = s(y(g[b])).toString(16);
                        for (var w = a(g[b], "Pair"), M = {}, x = 0; x < w.length; x++) M[c(u(w[x], "key"))] = c(u(w[x], "styleUrl"));
                        n["#" + o(g[b], "id")] = M
                    }
                    for (var k = 0; k < f.length; k++) e.features = e.features.concat(A(f[k]));

                    function E(t) {
                        var e, i;
                        return "#" === (t = t || "").substr(0, 1) && (t = t.substr(1)), 6 !== t.length && 3 !== t.length || (e = t), 8 === t.length && (i = parseInt(t.substr(0, 2), 16) / 255, e = "#" + t.substr(6, 2) + t.substr(4, 2) + t.substr(2, 2)), [e, isNaN(i) ? void 0 : i]
                    }

                    function C(t) {
                        var e = a(t, "coord"),
                            i = [],
                            r = [];
                        0 === e.length && (e = a(t, "gx:coord"));
                        for (var n = 0; n < e.length; n++) i.push(l(c(e[n]).split(" ")));
                        for (var s = a(t, "when"), o = 0; o < s.length; o++) r.push(c(s[o]));
                        return {
                            coords: i,
                            times: r
                        }
                    }

                    function S(t) {
                        var e, i, r, n, s, o = [],
                            l = [];
                        if (u(t, "MultiGeometry")) return S(u(t, "MultiGeometry"));
                        if (u(t, "MultiTrack")) return S(u(t, "MultiTrack"));
                        if (u(t, "gx:MultiTrack")) return S(u(t, "gx:MultiTrack"));
                        for (r = 0; r < h.length; r++)
                            if (i = a(t, h[r]))
                                for (n = 0; n < i.length; n++)
                                    if (e = i[n], "Point" === h[r]) o.push({
                                        type: "Point",
                                        coordinates: p(c(u(e, "coordinates")))
                                    });
                                    else if ("LineString" === h[r]) o.push({
                            type: "LineString",
                            coordinates: m(c(u(e, "coordinates")))
                        });
                        else if ("Polygon" === h[r]) {
                            var f = a(e, "LinearRing"),
                                d = [];
                            for (s = 0; s < f.length; s++) d.push(m(c(u(f[s], "coordinates"))));
                            o.push({
                                type: "Polygon",
                                coordinates: d
                            })
                        } else if ("Track" === h[r] || "gx:Track" === h[r]) {
                            var g = C(e);
                            o.push({
                                type: "LineString",
                                coordinates: g.coords
                            }), g.times.length && l.push(g.times)
                        }
                        return {
                            geoms: o,
                            coordTimes: l
                        }
                    }

                    function A(t) {
                        var e, s = S(t),
                            h = {},
                            l = c(u(t, "name")),
                            f = c(u(t, "address")),
                            d = c(u(t, "styleUrl")),
                            p = c(u(t, "description")),
                            m = u(t, "TimeSpan"),
                            g = u(t, "TimeStamp"),
                            y = u(t, "ExtendedData"),
                            _ = u(t, "LineStyle"),
                            v = u(t, "PolyStyle"),
                            b = u(t, "visibility");
                        if (!s.geoms.length) return [];
                        if (l && (h.name = l), f && (h.address = f), d) {
                            "#" !== d[0] && (d = "#" + d), h.styleUrl = d, i[d] && (h.styleHash = i[d]), n[d] && (h.styleMapHash = n[d], h.styleHash = i[n[d].normal]);
                            var w = r[h.styleHash];
                            w && (_ || (_ = u(w, "LineStyle")), v || (v = u(w, "PolyStyle")))
                        }
                        if (p && (h.description = p), m) {
                            var M = c(u(m, "begin")),
                                x = c(u(m, "end"));
                            h.timespan = {
                                begin: M,
                                end: x
                            }
                        }
                        if (g && (h.timestamp = c(u(g, "when"))), _) {
                            var k = E(c(u(_, "color"))),
                                C = k[0],
                                A = k[1],
                                I = parseFloat(c(u(_, "width")));
                            C && (h.stroke = C), isNaN(A) || (h["stroke-opacity"] = A), isNaN(I) || (h["stroke-width"] = I)
                        }
                        if (v) {
                            var O = E(c(u(v, "color"))),
                                B = O[0],
                                N = O[1],
                                L = c(u(v, "fill")),
                                P = c(u(v, "outline"));
                            B && (h.fill = B), isNaN(N) || (h["fill-opacity"] = N), L && (h["fill-opacity"] = "1" === L ? h["fill-opacity"] || 1 : 0), P && (h["stroke-opacity"] = "1" === P ? h["stroke-opacity"] || 1 : 0)
                        }
                        if (y) {
                            var z = a(y, "Data"),
                                R = a(y, "SimpleData");
                            for (e = 0; e < z.length; e++) h[z[e].getAttribute("name")] = c(u(z[e], "value"));
                            for (e = 0; e < R.length; e++) h[R[e].getAttribute("name")] = c(R[e])
                        }
                        b && (h.visibility = c(b)), s.coordTimes.length && (h.coordTimes = 1 === s.coordTimes.length ? s.coordTimes[0] : s.coordTimes);
                        var T = {
                            type: "Feature",
                            geometry: 1 === s.geoms.length ? s.geoms[0] : {
                                type: "GeometryCollection",
                                geometries: s.geoms
                            },
                            properties: h
                        };
                        return o(t, "id") && (T.id = o(t, "id")), [T]
                    }
                    return e
                },
                gpx: function(t) {
                    var e, i, r, n, s = a(t, "trk"),
                        h = a(t, "rte"),
                        l = a(t, "wpt"),
                        p = {
                            type: "FeatureCollection",
                            features: []
                        };
                    for (e = 0; e < s.length; e++)(i = y(s[e])) && p.features.push(i);
                    for (e = 0; e < h.length; e++)(i = _(h[e])) && p.features.push(i);
                    for (e = 0; e < l.length; e++) p.features.push((r = l[e], n = void 0, d(n = b(r), f(r, ["sym"])), {
                        type: "Feature",
                        properties: n,
                        geometry: {
                            type: "Point",
                            coordinates: g(r).coordinates
                        }
                    }));

                    function m(t, e) {
                        var i = a(t, e),
                            r = [],
                            n = [],
                            s = [],
                            o = i.length;
                        if (o < 2) return {};
                        for (var h = 0; h < o; h++) {
                            var u = g(i[h]);
                            r.push(u.coordinates), u.time && n.push(u.time), u.heartRate && s.push(u.heartRate)
                        }
                        return {
                            line: r,
                            times: n,
                            heartRates: s
                        }
                    }

                    function y(t) {
                        for (var e, i = a(t, "trkseg"), r = [], n = [], s = [], o = 0; o < i.length; o++)(e = m(i[o], "trkpt")) && (e.line && r.push(e.line), e.times && e.times.length && n.push(e.times), e.heartRates && e.heartRates.length && s.push(e.heartRates));
                        if (0 !== r.length) {
                            var h = b(t);
                            return d(h, v(u(t, "extensions"))), n.length && (h.coordTimes = 1 === r.length ? n[0] : n), s.length && (h.heartRates = 1 === r.length ? s[0] : s), {
                                type: "Feature",
                                properties: h,
                                geometry: {
                                    type: 1 === r.length ? "LineString" : "MultiLineString",
                                    coordinates: 1 === r.length ? r[0] : r
                                }
                            }
                        }
                    }

                    function _(t) {
                        var e = m(t, "rtept");
                        if (e.line) {
                            var i = b(t);
                            return d(i, v(u(t, "extensions"))), {
                                type: "Feature",
                                properties: i,
                                geometry: {
                                    type: "LineString",
                                    coordinates: e.line
                                }
                            }
                        }
                    }

                    function v(t) {
                        var e = {};
                        if (t) {
                            var i = u(t, "line");
                            if (i) {
                                var r = c(u(i, "color")),
                                    n = parseFloat(c(u(i, "opacity"))),
                                    s = parseFloat(c(u(i, "width")));
                                r && (e.stroke = r), isNaN(n) || (e["stroke-opacity"] = n), isNaN(s) || (e["stroke-width"] = 96 * s / 25.4)
                            }
                        }
                        return e
                    }

                    function b(t) {
                        var e = f(t, ["name", "cmt", "desc", "type", "time", "keywords"]),
                            i = a(t, "link");
                        i.length && (e.links = []);
                        for (var r, n = 0; n < i.length; n++) d(r = {
                            href: o(i[n], "href")
                        }, f(i[n], ["text", "type"])), e.links.push(r);
                        return e
                    }
                    return p
                }
            }
        }();
        t.exports = r
    },
    742: (t, e) => {
        e.byteLength = function(t) {
            var e = o(t),
                i = e[0],
                r = e[1];
            return 3 * (i + r) / 4 - r
        }, e.toByteArray = function(t) {
            var e, i, s = o(t),
                a = s[0],
                h = s[1],
                u = new n(function(t, e, i) {
                    return 3 * (e + i) / 4 - i
                }(0, a, h)),
                l = 0,
                c = h > 0 ? a - 4 : a;
            for (i = 0; i < c; i += 4) e = r[t.charCodeAt(i)] << 18 | r[t.charCodeAt(i + 1)] << 12 | r[t.charCodeAt(i + 2)] << 6 | r[t.charCodeAt(i + 3)], u[l++] = e >> 16 & 255, u[l++] = e >> 8 & 255, u[l++] = 255 & e;
            return 2 === h && (e = r[t.charCodeAt(i)] << 2 | r[t.charCodeAt(i + 1)] >> 4, u[l++] = 255 & e), 1 === h && (e = r[t.charCodeAt(i)] << 10 | r[t.charCodeAt(i + 1)] << 4 | r[t.charCodeAt(i + 2)] >> 2, u[l++] = e >> 8 & 255, u[l++] = 255 & e), u
        }, e.fromByteArray = function(t) {
            for (var e, r = t.length, n = r % 3, s = [], a = 16383, o = 0, u = r - n; o < u; o += a) s.push(h(t, o, o + a > u ? u : o + a));
            return 1 === n ? (e = t[r - 1], s.push(i[e >> 2] + i[e << 4 & 63] + "==")) : 2 === n && (e = (t[r - 2] << 8) + t[r - 1], s.push(i[e >> 10] + i[e >> 4 & 63] + i[e << 2 & 63] + "=")), s.join("")
        };
        for (var i = [], r = [], n = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0; a < 64; ++a) i[a] = s[a], r[s.charCodeAt(a)] = a;

        function o(t) {
            var e = t.length;
            if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            var i = t.indexOf("=");
            return -1 === i && (i = e), [i, i === e ? 0 : 4 - i % 4]
        }

        function h(t, e, r) {
            for (var n, s, a = [], o = e; o < r; o += 3) n = (t[o] << 16 & 16711680) + (t[o + 1] << 8 & 65280) + (255 & t[o + 2]), a.push(i[(s = n) >> 18 & 63] + i[s >> 12 & 63] + i[s >> 6 & 63] + i[63 & s]);
            return a.join("")
        }
        r["-".charCodeAt(0)] = 62, r["_".charCodeAt(0)] = 63
    },
    764: (t, e, i) => {
        const r = i(742),
            n = i(645),
            s = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
        e.lW = h, e.h2 = 50;
        const a = 2147483647;

        function o(t) {
            if (t > a) throw new RangeError('The value "' + t + '" is invalid for option "size"');
            const e = new Uint8Array(t);
            return Object.setPrototypeOf(e, h.prototype), e
        }

        function h(t, e, i) {
            if ("number" == typeof t) {
                if ("string" == typeof e) throw new TypeError('The "string" argument must be of type string. Received type number');
                return c(t)
            }
            return u(t, e, i)
        }

        function u(t, e, i) {
            if ("string" == typeof t) return function(t, e) {
                if ("string" == typeof e && "" !== e || (e = "utf8"), !h.isEncoding(e)) throw new TypeError("Unknown encoding: " + e);
                const i = 0 | m(t, e);
                let r = o(i);
                const n = r.write(t, e);
                return n !== i && (r = r.slice(0, n)), r
            }(t, e);
            if (ArrayBuffer.isView(t)) return function(t) {
                if (X(t, Uint8Array)) {
                    const e = new Uint8Array(t);
                    return d(e.buffer, e.byteOffset, e.byteLength)
                }
                return f(t)
            }(t);
            if (null == t) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
            if (X(t, ArrayBuffer) || t && X(t.buffer, ArrayBuffer)) return d(t, e, i);
            if ("undefined" != typeof SharedArrayBuffer && (X(t, SharedArrayBuffer) || t && X(t.buffer, SharedArrayBuffer))) return d(t, e, i);
            if ("number" == typeof t) throw new TypeError('The "value" argument must not be of type number. Received type number');
            const r = t.valueOf && t.valueOf();
            if (null != r && r !== t) return h.from(r, e, i);
            const n = function(t) {
                if (h.isBuffer(t)) {
                    const e = 0 | p(t.length),
                        i = o(e);
                    return 0 === i.length || t.copy(i, 0, 0, e), i
                }
                return void 0 !== t.length ? "number" != typeof t.length || $(t.length) ? o(0) : f(t) : "Buffer" === t.type && Array.isArray(t.data) ? f(t.data) : void 0
            }(t);
            if (n) return n;
            if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive]) return h.from(t[Symbol.toPrimitive]("string"), e, i);
            throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
        }

        function l(t) {
            if ("number" != typeof t) throw new TypeError('"size" argument must be of type number');
            if (t < 0) throw new RangeError('The value "' + t + '" is invalid for option "size"')
        }

        function c(t) {
            return l(t), o(t < 0 ? 0 : 0 | p(t))
        }

        function f(t) {
            const e = t.length < 0 ? 0 : 0 | p(t.length),
                i = o(e);
            for (let r = 0; r < e; r += 1) i[r] = 255 & t[r];
            return i
        }

        function d(t, e, i) {
            if (e < 0 || t.byteLength < e) throw new RangeError('"offset" is outside of buffer bounds');
            if (t.byteLength < e + (i || 0)) throw new RangeError('"length" is outside of buffer bounds');
            let r;
            return r = void 0 === e && void 0 === i ? new Uint8Array(t) : void 0 === i ? new Uint8Array(t, e) : new Uint8Array(t, e, i), Object.setPrototypeOf(r, h.prototype), r
        }

        function p(t) {
            if (t >= a) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a.toString(16) + " bytes");
            return 0 | t
        }

        function m(t, e) {
            if (h.isBuffer(t)) return t.length;
            if (ArrayBuffer.isView(t) || X(t, ArrayBuffer)) return t.byteLength;
            if ("string" != typeof t) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
            const i = t.length,
                r = arguments.length > 2 && !0 === arguments[2];
            if (!r && 0 === i) return 0;
            let n = !1;
            for (;;) switch (e) {
                case "ascii":
                case "latin1":
                case "binary":
                    return i;
                case "utf8":
                case "utf-8":
                    return H(t).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * i;
                case "hex":
                    return i >>> 1;
                case "base64":
                    return J(t).length;
                default:
                    if (n) return r ? -1 : H(t).length;
                    e = ("" + e).toLowerCase(), n = !0
            }
        }

        function g(t, e, i) {
            let r = !1;
            if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
            if ((void 0 === i || i > this.length) && (i = this.length), i <= 0) return "";
            if ((i >>>= 0) <= (e >>>= 0)) return "";
            for (t || (t = "utf8");;) switch (t) {
                case "hex":
                    return O(this, e, i);
                case "utf8":
                case "utf-8":
                    return C(this, e, i);
                case "ascii":
                    return A(this, e, i);
                case "latin1":
                case "binary":
                    return I(this, e, i);
                case "base64":
                    return E(this, e, i);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return B(this, e, i);
                default:
                    if (r) throw new TypeError("Unknown encoding: " + t);
                    t = (t + "").toLowerCase(), r = !0
            }
        }

        function y(t, e, i) {
            const r = t[e];
            t[e] = t[i], t[i] = r
        }

        function _(t, e, i, r, n) {
            if (0 === t.length) return -1;
            if ("string" == typeof i ? (r = i, i = 0) : i > 2147483647 ? i = 2147483647 : i < -2147483648 && (i = -2147483648), $(i = +i) && (i = n ? 0 : t.length - 1), i < 0 && (i = t.length + i), i >= t.length) {
                if (n) return -1;
                i = t.length - 1
            } else if (i < 0) {
                if (!n) return -1;
                i = 0
            }
            if ("string" == typeof e && (e = h.from(e, r)), h.isBuffer(e)) return 0 === e.length ? -1 : v(t, e, i, r, n);
            if ("number" == typeof e) return e &= 255, "function" == typeof Uint8Array.prototype.indexOf ? n ? Uint8Array.prototype.indexOf.call(t, e, i) : Uint8Array.prototype.lastIndexOf.call(t, e, i) : v(t, [e], i, r, n);
            throw new TypeError("val must be string, number or Buffer")
        }

        function v(t, e, i, r, n) {
            let s, a = 1,
                o = t.length,
                h = e.length;
            if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                if (t.length < 2 || e.length < 2) return -1;
                a = 2, o /= 2, h /= 2, i /= 2
            }

            function u(t, e) {
                return 1 === a ? t[e] : t.readUInt16BE(e * a)
            }
            if (n) {
                let r = -1;
                for (s = i; s < o; s++)
                    if (u(t, s) === u(e, -1 === r ? 0 : s - r)) {
                        if (-1 === r && (r = s), s - r + 1 === h) return r * a
                    } else - 1 !== r && (s -= s - r), r = -1
            } else
                for (i + h > o && (i = o - h), s = i; s >= 0; s--) {
                    let i = !0;
                    for (let r = 0; r < h; r++)
                        if (u(t, s + r) !== u(e, r)) {
                            i = !1;
                            break
                        } if (i) return s
                }
            return -1
        }

        function b(t, e, i, r) {
            i = Number(i) || 0;
            const n = t.length - i;
            r ? (r = Number(r)) > n && (r = n) : r = n;
            const s = e.length;
            let a;
            for (r > s / 2 && (r = s / 2), a = 0; a < r; ++a) {
                const r = parseInt(e.substr(2 * a, 2), 16);
                if ($(r)) return a;
                t[i + a] = r
            }
            return a
        }

        function w(t, e, i, r) {
            return K(H(e, t.length - i), t, i, r)
        }

        function M(t, e, i, r) {
            return K(function(t) {
                const e = [];
                for (let i = 0; i < t.length; ++i) e.push(255 & t.charCodeAt(i));
                return e
            }(e), t, i, r)
        }

        function x(t, e, i, r) {
            return K(J(e), t, i, r)
        }

        function k(t, e, i, r) {
            return K(function(t, e) {
                let i, r, n;
                const s = [];
                for (let a = 0; a < t.length && !((e -= 2) < 0); ++a) i = t.charCodeAt(a), r = i >> 8, n = i % 256, s.push(n), s.push(r);
                return s
            }(e, t.length - i), t, i, r)
        }

        function E(t, e, i) {
            return 0 === e && i === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, i))
        }

        function C(t, e, i) {
            i = Math.min(t.length, i);
            const r = [];
            let n = e;
            for (; n < i;) {
                const e = t[n];
                let s = null,
                    a = e > 239 ? 4 : e > 223 ? 3 : e > 191 ? 2 : 1;
                if (n + a <= i) {
                    let i, r, o, h;
                    switch (a) {
                        case 1:
                            e < 128 && (s = e);
                            break;
                        case 2:
                            i = t[n + 1], 128 == (192 & i) && (h = (31 & e) << 6 | 63 & i, h > 127 && (s = h));
                            break;
                        case 3:
                            i = t[n + 1], r = t[n + 2], 128 == (192 & i) && 128 == (192 & r) && (h = (15 & e) << 12 | (63 & i) << 6 | 63 & r, h > 2047 && (h < 55296 || h > 57343) && (s = h));
                            break;
                        case 4:
                            i = t[n + 1], r = t[n + 2], o = t[n + 3], 128 == (192 & i) && 128 == (192 & r) && 128 == (192 & o) && (h = (15 & e) << 18 | (63 & i) << 12 | (63 & r) << 6 | 63 & o, h > 65535 && h < 1114112 && (s = h))
                    }
                }
                null === s ? (s = 65533, a = 1) : s > 65535 && (s -= 65536, r.push(s >>> 10 & 1023 | 55296), s = 56320 | 1023 & s), r.push(s), n += a
            }
            return function(t) {
                const e = t.length;
                if (e <= S) return String.fromCharCode.apply(String, t);
                let i = "",
                    r = 0;
                for (; r < e;) i += String.fromCharCode.apply(String, t.slice(r, r += S));
                return i
            }(r)
        }
        h.TYPED_ARRAY_SUPPORT = function() {
            try {
                const t = new Uint8Array(1),
                    e = {
                        foo: function() {
                            return 42
                        }
                    };
                return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), 42 === t.foo()
            } catch (t) {
                return !1
            }
        }(), h.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(h.prototype, "parent", {
            enumerable: !0,
            get: function() {
                if (h.isBuffer(this)) return this.buffer
            }
        }), Object.defineProperty(h.prototype, "offset", {
            enumerable: !0,
            get: function() {
                if (h.isBuffer(this)) return this.byteOffset
            }
        }), h.poolSize = 8192, h.from = function(t, e, i) {
            return u(t, e, i)
        }, Object.setPrototypeOf(h.prototype, Uint8Array.prototype), Object.setPrototypeOf(h, Uint8Array), h.alloc = function(t, e, i) {
            return function(t, e, i) {
                return l(t), t <= 0 ? o(t) : void 0 !== e ? "string" == typeof i ? o(t).fill(e, i) : o(t).fill(e) : o(t)
            }(t, e, i)
        }, h.allocUnsafe = function(t) {
            return c(t)
        }, h.allocUnsafeSlow = function(t) {
            return c(t)
        }, h.isBuffer = function(t) {
            return null != t && !0 === t._isBuffer && t !== h.prototype
        }, h.compare = function(t, e) {
            if (X(t, Uint8Array) && (t = h.from(t, t.offset, t.byteLength)), X(e, Uint8Array) && (e = h.from(e, e.offset, e.byteLength)), !h.isBuffer(t) || !h.isBuffer(e)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (t === e) return 0;
            let i = t.length,
                r = e.length;
            for (let n = 0, s = Math.min(i, r); n < s; ++n)
                if (t[n] !== e[n]) {
                    i = t[n], r = e[n];
                    break
                } return i < r ? -1 : r < i ? 1 : 0
        }, h.isEncoding = function(t) {
            switch (String(t).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1
            }
        }, h.concat = function(t, e) {
            if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length) return h.alloc(0);
            let i;
            if (void 0 === e)
                for (e = 0, i = 0; i < t.length; ++i) e += t[i].length;
            const r = h.allocUnsafe(e);
            let n = 0;
            for (i = 0; i < t.length; ++i) {
                let e = t[i];
                if (X(e, Uint8Array)) n + e.length > r.length ? (h.isBuffer(e) || (e = h.from(e)), e.copy(r, n)) : Uint8Array.prototype.set.call(r, e, n);
                else {
                    if (!h.isBuffer(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                    e.copy(r, n)
                }
                n += e.length
            }
            return r
        }, h.byteLength = m, h.prototype._isBuffer = !0, h.prototype.swap16 = function() {
            const t = this.length;
            if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (let e = 0; e < t; e += 2) y(this, e, e + 1);
            return this
        }, h.prototype.swap32 = function() {
            const t = this.length;
            if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (let e = 0; e < t; e += 4) y(this, e, e + 3), y(this, e + 1, e + 2);
            return this
        }, h.prototype.swap64 = function() {
            const t = this.length;
            if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (let e = 0; e < t; e += 8) y(this, e, e + 7), y(this, e + 1, e + 6), y(this, e + 2, e + 5), y(this, e + 3, e + 4);
            return this
        }, h.prototype.toString = function() {
            const t = this.length;
            return 0 === t ? "" : 0 === arguments.length ? C(this, 0, t) : g.apply(this, arguments)
        }, h.prototype.toLocaleString = h.prototype.toString, h.prototype.equals = function(t) {
            if (!h.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
            return this === t || 0 === h.compare(this, t)
        }, h.prototype.inspect = function() {
            let t = "";
            const i = e.h2;
            return t = this.toString("hex", 0, i).replace(/(.{2})/g, "$1 ").trim(), this.length > i && (t += " ... "), "<Buffer " + t + ">"
        }, s && (h.prototype[s] = h.prototype.inspect), h.prototype.compare = function(t, e, i, r, n) {
            if (X(t, Uint8Array) && (t = h.from(t, t.offset, t.byteLength)), !h.isBuffer(t)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
            if (void 0 === e && (e = 0), void 0 === i && (i = t ? t.length : 0), void 0 === r && (r = 0), void 0 === n && (n = this.length), e < 0 || i > t.length || r < 0 || n > this.length) throw new RangeError("out of range index");
            if (r >= n && e >= i) return 0;
            if (r >= n) return -1;
            if (e >= i) return 1;
            if (this === t) return 0;
            let s = (n >>>= 0) - (r >>>= 0),
                a = (i >>>= 0) - (e >>>= 0);
            const o = Math.min(s, a),
                u = this.slice(r, n),
                l = t.slice(e, i);
            for (let t = 0; t < o; ++t)
                if (u[t] !== l[t]) {
                    s = u[t], a = l[t];
                    break
                } return s < a ? -1 : a < s ? 1 : 0
        }, h.prototype.includes = function(t, e, i) {
            return -1 !== this.indexOf(t, e, i)
        }, h.prototype.indexOf = function(t, e, i) {
            return _(this, t, e, i, !0)
        }, h.prototype.lastIndexOf = function(t, e, i) {
            return _(this, t, e, i, !1)
        }, h.prototype.write = function(t, e, i, r) {
            if (void 0 === e) r = "utf8", i = this.length, e = 0;
            else if (void 0 === i && "string" == typeof e) r = e, i = this.length, e = 0;
            else {
                if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                e >>>= 0, isFinite(i) ? (i >>>= 0, void 0 === r && (r = "utf8")) : (r = i, i = void 0)
            }
            const n = this.length - e;
            if ((void 0 === i || i > n) && (i = n), t.length > 0 && (i < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            r || (r = "utf8");
            let s = !1;
            for (;;) switch (r) {
                case "hex":
                    return b(this, t, e, i);
                case "utf8":
                case "utf-8":
                    return w(this, t, e, i);
                case "ascii":
                case "latin1":
                case "binary":
                    return M(this, t, e, i);
                case "base64":
                    return x(this, t, e, i);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return k(this, t, e, i);
                default:
                    if (s) throw new TypeError("Unknown encoding: " + r);
                    r = ("" + r).toLowerCase(), s = !0
            }
        }, h.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        };
        const S = 4096;

        function A(t, e, i) {
            let r = "";
            i = Math.min(t.length, i);
            for (let n = e; n < i; ++n) r += String.fromCharCode(127 & t[n]);
            return r
        }

        function I(t, e, i) {
            let r = "";
            i = Math.min(t.length, i);
            for (let n = e; n < i; ++n) r += String.fromCharCode(t[n]);
            return r
        }

        function O(t, e, i) {
            const r = t.length;
            (!e || e < 0) && (e = 0), (!i || i < 0 || i > r) && (i = r);
            let n = "";
            for (let r = e; r < i; ++r) n += Q[t[r]];
            return n
        }

        function B(t, e, i) {
            const r = t.slice(e, i);
            let n = "";
            for (let t = 0; t < r.length - 1; t += 2) n += String.fromCharCode(r[t] + 256 * r[t + 1]);
            return n
        }

        function N(t, e, i) {
            if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
            if (t + e > i) throw new RangeError("Trying to access beyond buffer length")
        }

        function L(t, e, i, r, n, s) {
            if (!h.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (e > n || e < s) throw new RangeError('"value" argument is out of bounds');
            if (i + r > t.length) throw new RangeError("Index out of range")
        }

        function P(t, e, i, r, n) {
            q(e, r, n, t, i, 7);
            let s = Number(e & BigInt(4294967295));
            t[i++] = s, s >>= 8, t[i++] = s, s >>= 8, t[i++] = s, s >>= 8, t[i++] = s;
            let a = Number(e >> BigInt(32) & BigInt(4294967295));
            return t[i++] = a, a >>= 8, t[i++] = a, a >>= 8, t[i++] = a, a >>= 8, t[i++] = a, i
        }

        function z(t, e, i, r, n) {
            q(e, r, n, t, i, 7);
            let s = Number(e & BigInt(4294967295));
            t[i + 7] = s, s >>= 8, t[i + 6] = s, s >>= 8, t[i + 5] = s, s >>= 8, t[i + 4] = s;
            let a = Number(e >> BigInt(32) & BigInt(4294967295));
            return t[i + 3] = a, a >>= 8, t[i + 2] = a, a >>= 8, t[i + 1] = a, a >>= 8, t[i] = a, i + 8
        }

        function R(t, e, i, r, n, s) {
            if (i + r > t.length) throw new RangeError("Index out of range");
            if (i < 0) throw new RangeError("Index out of range")
        }

        function T(t, e, i, r, s) {
            return e = +e, i >>>= 0, s || R(t, 0, i, 4), n.write(t, e, i, r, 23, 4), i + 4
        }

        function j(t, e, i, r, s) {
            return e = +e, i >>>= 0, s || R(t, 0, i, 8), n.write(t, e, i, r, 52, 8), i + 8
        }
        h.prototype.slice = function(t, e) {
            const i = this.length;
            (t = ~~t) < 0 ? (t += i) < 0 && (t = 0) : t > i && (t = i), (e = void 0 === e ? i : ~~e) < 0 ? (e += i) < 0 && (e = 0) : e > i && (e = i), e < t && (e = t);
            const r = this.subarray(t, e);
            return Object.setPrototypeOf(r, h.prototype), r
        }, h.prototype.readUintLE = h.prototype.readUIntLE = function(t, e, i) {
            t >>>= 0, e >>>= 0, i || N(t, e, this.length);
            let r = this[t],
                n = 1,
                s = 0;
            for (; ++s < e && (n *= 256);) r += this[t + s] * n;
            return r
        }, h.prototype.readUintBE = h.prototype.readUIntBE = function(t, e, i) {
            t >>>= 0, e >>>= 0, i || N(t, e, this.length);
            let r = this[t + --e],
                n = 1;
            for (; e > 0 && (n *= 256);) r += this[t + --e] * n;
            return r
        }, h.prototype.readUint8 = h.prototype.readUInt8 = function(t, e) {
            return t >>>= 0, e || N(t, 1, this.length), this[t]
        }, h.prototype.readUint16LE = h.prototype.readUInt16LE = function(t, e) {
            return t >>>= 0, e || N(t, 2, this.length), this[t] | this[t + 1] << 8
        }, h.prototype.readUint16BE = h.prototype.readUInt16BE = function(t, e) {
            return t >>>= 0, e || N(t, 2, this.length), this[t] << 8 | this[t + 1]
        }, h.prototype.readUint32LE = h.prototype.readUInt32LE = function(t, e) {
            return t >>>= 0, e || N(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
        }, h.prototype.readUint32BE = h.prototype.readUInt32BE = function(t, e) {
            return t >>>= 0, e || N(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
        }, h.prototype.readBigUInt64LE = V((function(t) {
            G(t >>>= 0, "offset");
            const e = this[t],
                i = this[t + 7];
            void 0 !== e && void 0 !== i || W(t, this.length - 8);
            const r = e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24,
                n = this[++t] + 256 * this[++t] + 65536 * this[++t] + i * 2 ** 24;
            return BigInt(r) + (BigInt(n) << BigInt(32))
        })), h.prototype.readBigUInt64BE = V((function(t) {
            G(t >>>= 0, "offset");
            const e = this[t],
                i = this[t + 7];
            void 0 !== e && void 0 !== i || W(t, this.length - 8);
            const r = e * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + this[++t],
                n = this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + i;
            return (BigInt(r) << BigInt(32)) + BigInt(n)
        })), h.prototype.readIntLE = function(t, e, i) {
            t >>>= 0, e >>>= 0, i || N(t, e, this.length);
            let r = this[t],
                n = 1,
                s = 0;
            for (; ++s < e && (n *= 256);) r += this[t + s] * n;
            return n *= 128, r >= n && (r -= Math.pow(2, 8 * e)), r
        }, h.prototype.readIntBE = function(t, e, i) {
            t >>>= 0, e >>>= 0, i || N(t, e, this.length);
            let r = e,
                n = 1,
                s = this[t + --r];
            for (; r > 0 && (n *= 256);) s += this[t + --r] * n;
            return n *= 128, s >= n && (s -= Math.pow(2, 8 * e)), s
        }, h.prototype.readInt8 = function(t, e) {
            return t >>>= 0, e || N(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
        }, h.prototype.readInt16LE = function(t, e) {
            t >>>= 0, e || N(t, 2, this.length);
            const i = this[t] | this[t + 1] << 8;
            return 32768 & i ? 4294901760 | i : i
        }, h.prototype.readInt16BE = function(t, e) {
            t >>>= 0, e || N(t, 2, this.length);
            const i = this[t + 1] | this[t] << 8;
            return 32768 & i ? 4294901760 | i : i
        }, h.prototype.readInt32LE = function(t, e) {
            return t >>>= 0, e || N(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
        }, h.prototype.readInt32BE = function(t, e) {
            return t >>>= 0, e || N(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
        }, h.prototype.readBigInt64LE = V((function(t) {
            G(t >>>= 0, "offset");
            const e = this[t],
                i = this[t + 7];
            void 0 !== e && void 0 !== i || W(t, this.length - 8);
            const r = this[t + 4] + 256 * this[t + 5] + 65536 * this[t + 6] + (i << 24);
            return (BigInt(r) << BigInt(32)) + BigInt(e + 256 * this[++t] + 65536 * this[++t] + this[++t] * 2 ** 24)
        })), h.prototype.readBigInt64BE = V((function(t) {
            G(t >>>= 0, "offset");
            const e = this[t],
                i = this[t + 7];
            void 0 !== e && void 0 !== i || W(t, this.length - 8);
            const r = (e << 24) + 65536 * this[++t] + 256 * this[++t] + this[++t];
            return (BigInt(r) << BigInt(32)) + BigInt(this[++t] * 2 ** 24 + 65536 * this[++t] + 256 * this[++t] + i)
        })), h.prototype.readFloatLE = function(t, e) {
            return t >>>= 0, e || N(t, 4, this.length), n.read(this, t, !0, 23, 4)
        }, h.prototype.readFloatBE = function(t, e) {
            return t >>>= 0, e || N(t, 4, this.length), n.read(this, t, !1, 23, 4)
        }, h.prototype.readDoubleLE = function(t, e) {
            return t >>>= 0, e || N(t, 8, this.length), n.read(this, t, !0, 52, 8)
        }, h.prototype.readDoubleBE = function(t, e) {
            return t >>>= 0, e || N(t, 8, this.length), n.read(this, t, !1, 52, 8)
        }, h.prototype.writeUintLE = h.prototype.writeUIntLE = function(t, e, i, r) {
            t = +t, e >>>= 0, i >>>= 0, r || L(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
            let n = 1,
                s = 0;
            for (this[e] = 255 & t; ++s < i && (n *= 256);) this[e + s] = t / n & 255;
            return e + i
        }, h.prototype.writeUintBE = h.prototype.writeUIntBE = function(t, e, i, r) {
            t = +t, e >>>= 0, i >>>= 0, r || L(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
            let n = i - 1,
                s = 1;
            for (this[e + n] = 255 & t; --n >= 0 && (s *= 256);) this[e + n] = t / s & 255;
            return e + i
        }, h.prototype.writeUint8 = h.prototype.writeUInt8 = function(t, e, i) {
            return t = +t, e >>>= 0, i || L(this, t, e, 1, 255, 0), this[e] = 255 & t, e + 1
        }, h.prototype.writeUint16LE = h.prototype.writeUInt16LE = function(t, e, i) {
            return t = +t, e >>>= 0, i || L(this, t, e, 2, 65535, 0), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
        }, h.prototype.writeUint16BE = h.prototype.writeUInt16BE = function(t, e, i) {
            return t = +t, e >>>= 0, i || L(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
        }, h.prototype.writeUint32LE = h.prototype.writeUInt32LE = function(t, e, i) {
            return t = +t, e >>>= 0, i || L(this, t, e, 4, 4294967295, 0), this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t, e + 4
        }, h.prototype.writeUint32BE = h.prototype.writeUInt32BE = function(t, e, i) {
            return t = +t, e >>>= 0, i || L(this, t, e, 4, 4294967295, 0), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
        }, h.prototype.writeBigUInt64LE = V((function(t, e = 0) {
            return P(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"))
        })), h.prototype.writeBigUInt64BE = V((function(t, e = 0) {
            return z(this, t, e, BigInt(0), BigInt("0xffffffffffffffff"))
        })), h.prototype.writeIntLE = function(t, e, i, r) {
            if (t = +t, e >>>= 0, !r) {
                const r = Math.pow(2, 8 * i - 1);
                L(this, t, e, i, r - 1, -r)
            }
            let n = 0,
                s = 1,
                a = 0;
            for (this[e] = 255 & t; ++n < i && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + n - 1] && (a = 1), this[e + n] = (t / s >> 0) - a & 255;
            return e + i
        }, h.prototype.writeIntBE = function(t, e, i, r) {
            if (t = +t, e >>>= 0, !r) {
                const r = Math.pow(2, 8 * i - 1);
                L(this, t, e, i, r - 1, -r)
            }
            let n = i - 1,
                s = 1,
                a = 0;
            for (this[e + n] = 255 & t; --n >= 0 && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + n + 1] && (a = 1), this[e + n] = (t / s >> 0) - a & 255;
            return e + i
        }, h.prototype.writeInt8 = function(t, e, i) {
            return t = +t, e >>>= 0, i || L(this, t, e, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
        }, h.prototype.writeInt16LE = function(t, e, i) {
            return t = +t, e >>>= 0, i || L(this, t, e, 2, 32767, -32768), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
        }, h.prototype.writeInt16BE = function(t, e, i) {
            return t = +t, e >>>= 0, i || L(this, t, e, 2, 32767, -32768), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
        }, h.prototype.writeInt32LE = function(t, e, i) {
            return t = +t, e >>>= 0, i || L(this, t, e, 4, 2147483647, -2147483648), this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24, e + 4
        }, h.prototype.writeInt32BE = function(t, e, i) {
            return t = +t, e >>>= 0, i || L(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
        }, h.prototype.writeBigInt64LE = V((function(t, e = 0) {
            return P(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
        })), h.prototype.writeBigInt64BE = V((function(t, e = 0) {
            return z(this, t, e, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"))
        })), h.prototype.writeFloatLE = function(t, e, i) {
            return T(this, t, e, !0, i)
        }, h.prototype.writeFloatBE = function(t, e, i) {
            return T(this, t, e, !1, i)
        }, h.prototype.writeDoubleLE = function(t, e, i) {
            return j(this, t, e, !0, i)
        }, h.prototype.writeDoubleBE = function(t, e, i) {
            return j(this, t, e, !1, i)
        }, h.prototype.copy = function(t, e, i, r) {
            if (!h.isBuffer(t)) throw new TypeError("argument should be a Buffer");
            if (i || (i = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < i && (r = i), r === i) return 0;
            if (0 === t.length || 0 === this.length) return 0;
            if (e < 0) throw new RangeError("targetStart out of bounds");
            if (i < 0 || i >= this.length) throw new RangeError("Index out of range");
            if (r < 0) throw new RangeError("sourceEnd out of bounds");
            r > this.length && (r = this.length), t.length - e < r - i && (r = t.length - e + i);
            const n = r - i;
            return this === t && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(e, i, r) : Uint8Array.prototype.set.call(t, this.subarray(i, r), e), n
        }, h.prototype.fill = function(t, e, i, r) {
            if ("string" == typeof t) {
                if ("string" == typeof e ? (r = e, e = 0, i = this.length) : "string" == typeof i && (r = i, i = this.length), void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                if ("string" == typeof r && !h.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
                if (1 === t.length) {
                    const e = t.charCodeAt(0);
                    ("utf8" === r && e < 128 || "latin1" === r) && (t = e)
                }
            } else "number" == typeof t ? t &= 255 : "boolean" == typeof t && (t = Number(t));
            if (e < 0 || this.length < e || this.length < i) throw new RangeError("Out of range index");
            if (i <= e) return this;
            let n;
            if (e >>>= 0, i = void 0 === i ? this.length : i >>> 0, t || (t = 0), "number" == typeof t)
                for (n = e; n < i; ++n) this[n] = t;
            else {
                const s = h.isBuffer(t) ? t : h.from(t, r),
                    a = s.length;
                if (0 === a) throw new TypeError('The value "' + t + '" is invalid for argument "value"');
                for (n = 0; n < i - e; ++n) this[n + e] = s[n % a]
            }
            return this
        };
        const F = {};

        function U(t, e, i) {
            F[t] = class extends i {
                constructor() {
                    super(), Object.defineProperty(this, "message", {
                        value: e.apply(this, arguments),
                        writable: !0,
                        configurable: !0
                    }), this.name = `${this.name} [${t}]`, this.stack, delete this.name
                }
                get code() {
                    return t
                }
                set code(t) {
                    Object.defineProperty(this, "code", {
                        configurable: !0,
                        enumerable: !0,
                        value: t,
                        writable: !0
                    })
                }
                toString() {
                    return `${this.name} [${t}]: ${this.message}`
                }
            }
        }

        function D(t) {
            let e = "",
                i = t.length;
            const r = "-" === t[0] ? 1 : 0;
            for (; i >= r + 4; i -= 3) e = `_${t.slice(i-3,i)}${e}`;
            return `${t.slice(0,i)}${e}`
        }

        function q(t, e, i, r, n, s) {
            if (t > i || t < e) {
                const r = "bigint" == typeof e ? "n" : "";
                let n;
                throw n = s > 3 ? 0 === e || e === BigInt(0) ? `>= 0${r} and < 2${r} ** ${8*(s+1)}${r}` : `>= -(2${r} ** ${8*(s+1)-1}${r}) and < 2 ** ${8*(s+1)-1}${r}` : `>= ${e}${r} and <= ${i}${r}`, new F.ERR_OUT_OF_RANGE("value", n, t)
            }! function(t, e, i) {
                G(e, "offset"), void 0 !== t[e] && void 0 !== t[e + i] || W(e, t.length - (i + 1))
            }(r, n, s)
        }

        function G(t, e) {
            if ("number" != typeof t) throw new F.ERR_INVALID_ARG_TYPE(e, "number", t)
        }

        function W(t, e, i) {
            if (Math.floor(t) !== t) throw G(t, i), new F.ERR_OUT_OF_RANGE(i || "offset", "an integer", t);
            if (e < 0) throw new F.ERR_BUFFER_OUT_OF_BOUNDS;
            throw new F.ERR_OUT_OF_RANGE(i || "offset", `>= ${i?1:0} and <= ${e}`, t)
        }
        U("ERR_BUFFER_OUT_OF_BOUNDS", (function(t) {
            return t ? `${t} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds"
        }), RangeError), U("ERR_INVALID_ARG_TYPE", (function(t, e) {
            return `The "${t}" argument must be of type number. Received type ${typeof e}`
        }), TypeError), U("ERR_OUT_OF_RANGE", (function(t, e, i) {
            let r = `The value of "${t}" is out of range.`,
                n = i;
            return Number.isInteger(i) && Math.abs(i) > 2 ** 32 ? n = D(String(i)) : "bigint" == typeof i && (n = String(i), (i > BigInt(2) ** BigInt(32) || i < -(BigInt(2) ** BigInt(32))) && (n = D(n)), n += "n"), r += ` It must be ${e}. Received ${n}`, r
        }), RangeError);
        const Z = /[^+/0-9A-Za-z-_]/g;

        function H(t, e) {
            let i;
            e = e || 1 / 0;
            const r = t.length;
            let n = null;
            const s = [];
            for (let a = 0; a < r; ++a) {
                if (i = t.charCodeAt(a), i > 55295 && i < 57344) {
                    if (!n) {
                        if (i > 56319) {
                            (e -= 3) > -1 && s.push(239, 191, 189);
                            continue
                        }
                        if (a + 1 === r) {
                            (e -= 3) > -1 && s.push(239, 191, 189);
                            continue
                        }
                        n = i;
                        continue
                    }
                    if (i < 56320) {
                        (e -= 3) > -1 && s.push(239, 191, 189), n = i;
                        continue
                    }
                    i = 65536 + (n - 55296 << 10 | i - 56320)
                } else n && (e -= 3) > -1 && s.push(239, 191, 189);
                if (n = null, i < 128) {
                    if ((e -= 1) < 0) break;
                    s.push(i)
                } else if (i < 2048) {
                    if ((e -= 2) < 0) break;
                    s.push(i >> 6 | 192, 63 & i | 128)
                } else if (i < 65536) {
                    if ((e -= 3) < 0) break;
                    s.push(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128)
                } else {
                    if (!(i < 1114112)) throw new Error("Invalid code point");
                    if ((e -= 4) < 0) break;
                    s.push(i >> 18 | 240, i >> 12 & 63 | 128, i >> 6 & 63 | 128, 63 & i | 128)
                }
            }
            return s
        }

        function J(t) {
            return r.toByteArray(function(t) {
                if ((t = (t = t.split("=")[0]).trim().replace(Z, "")).length < 2) return "";
                for (; t.length % 4 != 0;) t += "=";
                return t
            }(t))
        }

        function K(t, e, i, r) {
            let n;
            for (n = 0; n < r && !(n + i >= e.length || n >= t.length); ++n) e[n + i] = t[n];
            return n
        }

        function X(t, e) {
            return t instanceof e || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === e.name
        }

        function $(t) {
            return t != t
        }
        const Q = function() {
            const t = "0123456789abcdef",
                e = new Array(256);
            for (let i = 0; i < 16; ++i) {
                const r = 16 * i;
                for (let n = 0; n < 16; ++n) e[r + n] = t[i] + t[n]
            }
            return e
        }();

        function V(t) {
            return "undefined" == typeof BigInt ? Y : t
        }

        function Y() {
            throw new Error("BigInt not supported")
        }
    },
    848: (t, e, i) => {
        var r = i(818),
            n = i(596),
            s = /(Lat)(itude)?/gi,
            a = /(L)(on|ng)(gitude)?/i;

        function o(t, e) {
            var i, r, n;
            for (var s in t)(r = s.match(e)) && (!i || r[0].length / s.length > n) && (n = r[0].length / s.length, i = s);
            return i
        }

        function h(t) {
            return o(t, s)
        }

        function u(t) {
            return o(t, a)
        }

        function l(t) {
            return "object" == typeof t ? Object.keys(t).length : 0
        }

        function c(t) {
            var e = [];
            return [",", ";", "\t", "|"].forEach((function(i) {
                var n = r.dsvFormat(i).parse(t);
                if (n.length >= 1) {
                    for (var s = l(n[0]), a = 0; a < n.length; a++)
                        if (l(n[a]) !== s) return;
                    e.push({
                        delimiter: i,
                        arity: Object.keys(n[0]).length
                    })
                }
            })), e.length ? e.sort((function(t, e) {
                return e.arity - t.arity
            }))[0].delimiter : null
        }
        t.exports = {
            isLon: function(t) {
                return !!t.match(a)
            },
            isLat: function(t) {
                return !!t.match(s)
            },
            guessLatHeader: h,
            guessLonHeader: u,
            csv: r.csvParse,
            tsv: r.tsvParse,
            dsv: r,
            auto: function(t) {
                var e = c(t);
                return e ? function(t) {
                    return delete t.columns, t
                }(r.dsvFormat(e).parse(t)) : null
            },
            csv2geojson: function(t, e, i) {
                i || (i = e, e = {}), e.delimiter = e.delimiter || ",";
                var s = e.latfield || "",
                    a = e.lonfield || "",
                    o = e.crs || "",
                    l = [],
                    f = {
                        type: "FeatureCollection",
                        features: l
                    };
                if ("" !== o && (f.crs = {
                        type: "name",
                        properties: {
                            name: o
                        }
                    }), "auto" !== e.delimiter || "string" != typeof t || (e.delimiter = c(t), e.delimiter)) {
                    var d = e.numericFields ? e.numericFields.split(",") : null,
                        p = "string" == typeof t ? r.dsvFormat(e.delimiter).parse(t, (function(t) {
                            if (d)
                                for (var e in t) d.includes(e) && (t[e] = +t[e]);
                            return t
                        })) : t;
                    if (p.length) {
                        var m, g = [];
                        if (s || (s = h(p[0])), a || (a = u(p[0])), s && a) {
                            for (m = 0; m < p.length; m++)
                                if (void 0 !== p[m][a] && void 0 !== p[m][s]) {
                                    var y, _, v, b = p[m][a],
                                        w = p[m][s];
                                    (v = n(b, "EW")) && (b = v), (v = n(w, "NS")) && (w = v), y = parseFloat(b), _ = parseFloat(w), isNaN(y) || isNaN(_) ? g.push({
                                        message: "A row contained an invalid value for latitude or longitude",
                                        row: p[m],
                                        index: m
                                    }) : (e.includeLatLon || (delete p[m][a], delete p[m][s]), l.push({
                                        type: "Feature",
                                        properties: p[m],
                                        geometry: {
                                            type: "Point",
                                            coordinates: [parseFloat(y), parseFloat(_)]
                                        }
                                    }))
                                } i(g.length ? g : null, f)
                        } else {
                            for (m = 0; m < p.length; m++) l.push({
                                type: "Feature",
                                properties: p[m],
                                geometry: null
                            });
                            i(g.length ? g : null, f)
                        }
                    } else i(null, f)
                } else i({
                    type: "Error",
                    message: "Could not autodetect delimiter"
                })
            },
            toLine: function(t) {
                for (var e = t.features, i = {
                        type: "Feature",
                        geometry: {
                            type: "LineString",
                            coordinates: []
                        }
                    }, r = 0; r < e.length; r++) i.geometry.coordinates.push(e[r].geometry.coordinates);
                return i.properties = e.reduce((function(t, e) {
                    for (var i in e.properties) t[i] || (t[i] = []), t[i].push(e.properties[i]);
                    return t
                }), {}), {
                    type: "FeatureCollection",
                    features: [i]
                }
            },
            toPolygon: function(t) {
                for (var e = t.features, i = {
                        type: "Feature",
                        geometry: {
                            type: "Polygon",
                            coordinates: [
                                []
                            ]
                        }
                    }, r = 0; r < e.length; r++) i.geometry.coordinates[0].push(e[r].geometry.coordinates);
                return i.properties = e.reduce((function(t, e) {
                    for (var i in e.properties) t[i] || (t[i] = []), t[i].push(e.properties[i]);
                    return t
                }), {}), {
                    type: "FeatureCollection",
                    features: [i]
                }
            }
        }
    },
    818: (t, e, i) => {
        function r(t) {
            return new Function("d", "return {" + t.map((function(t, e) {
                return JSON.stringify(t) + ": d[" + e + "]"
            })).join(",") + "}")
        }

        function n(t) {
            var e = new RegExp('["' + t + "\n]"),
                i = t.charCodeAt(0);

            function n(t, e) {
                var r, n, s = {},
                    a = {},
                    o = [],
                    h = t.length,
                    u = 0,
                    l = 0;

                function c() {
                    if (u >= h) return a;
                    if (n) return n = !1, s;
                    var e, r = u;
                    if (34 === t.charCodeAt(r)) {
                        for (var o = r; o++ < h;)
                            if (34 === t.charCodeAt(o)) {
                                if (34 !== t.charCodeAt(o + 1)) break;
                                ++o
                            } return u = o + 2, 13 === (e = t.charCodeAt(o + 1)) ? (n = !0, 10 === t.charCodeAt(o + 2) && ++u) : 10 === e && (n = !0), t.slice(r + 1, o).replace(/""/g, '"')
                    }
                    for (; u < h;) {
                        var l = 1;
                        if (10 === (e = t.charCodeAt(u++))) n = !0;
                        else if (13 === e) n = !0, 10 === t.charCodeAt(u) && (++u, ++l);
                        else if (e !== i) continue;
                        return t.slice(r, u - l)
                    }
                    return t.slice(r)
                }
                for (;
                    (r = c()) !== a;) {
                    for (var f = []; r !== s && r !== a;) f.push(r), r = c();
                    e && null == (f = e(f, l++)) || o.push(f)
                }
                return o
            }

            function s(e) {
                return e.map(a).join(t)
            }

            function a(t) {
                return null == t ? "" : e.test(t += "") ? '"' + t.replace(/\"/g, '""') + '"' : t
            }
            return {
                parse: function(t, e) {
                    var i, s, a = n(t, (function(t, n) {
                        if (i) return i(t, n - 1);
                        s = t, i = e ? function(t, e) {
                            var i = r(t);
                            return function(r, n) {
                                return e(i(r), n, t)
                            }
                        }(t, e) : r(t)
                    }));
                    return a.columns = s, a
                },
                parseRows: n,
                format: function(e, i) {
                    return null == i && (i = function(t) {
                        var e = Object.create(null),
                            i = [];
                        return t.forEach((function(t) {
                            for (var r in t) r in e || i.push(e[r] = r)
                        })), i
                    }(e)), [i.map(a).join(t)].concat(e.map((function(e) {
                        return i.map((function(t) {
                            return a(e[t])
                        })).join(t)
                    }))).join("\n")
                },
                formatRows: function(t) {
                    return t.map(s).join("\n")
                }
            }
        }
        i.r(e), i.d(e, {
            csvFormat: () => h,
            csvFormatRows: () => u,
            csvParse: () => a,
            csvParseRows: () => o,
            dsvFormat: () => n,
            tsvFormat: () => d,
            tsvFormatRows: () => p,
            tsvParse: () => c,
            tsvParseRows: () => f
        });
        var s = n(","),
            a = s.parse,
            o = s.parseRows,
            h = s.format,
            u = s.formatRows,
            l = n("\t"),
            c = l.parse,
            f = l.parseRows,
            d = l.format,
            p = l.formatRows
    },
    645: (t, e) => {
        e.read = function(t, e, i, r, n) {
            var s, a, o = 8 * n - r - 1,
                h = (1 << o) - 1,
                u = h >> 1,
                l = -7,
                c = i ? n - 1 : 0,
                f = i ? -1 : 1,
                d = t[e + c];
            for (c += f, s = d & (1 << -l) - 1, d >>= -l, l += o; l > 0; s = 256 * s + t[e + c], c += f, l -= 8);
            for (a = s & (1 << -l) - 1, s >>= -l, l += r; l > 0; a = 256 * a + t[e + c], c += f, l -= 8);
            if (0 === s) s = 1 - u;
            else {
                if (s === h) return a ? NaN : 1 / 0 * (d ? -1 : 1);
                a += Math.pow(2, r), s -= u
            }
            return (d ? -1 : 1) * a * Math.pow(2, s - r)
        }, e.write = function(t, e, i, r, n, s) {
            var a, o, h, u = 8 * s - n - 1,
                l = (1 << u) - 1,
                c = l >> 1,
                f = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                d = r ? 0 : s - 1,
                p = r ? 1 : -1,
                m = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
            for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (o = isNaN(e) ? 1 : 0, a = l) : (a = Math.floor(Math.log(e) / Math.LN2), e * (h = Math.pow(2, -a)) < 1 && (a--, h *= 2), (e += a + c >= 1 ? f / h : f * Math.pow(2, 1 - c)) * h >= 2 && (a++, h /= 2), a + c >= l ? (o = 0, a = l) : a + c >= 1 ? (o = (e * h - 1) * Math.pow(2, n), a += c) : (o = e * Math.pow(2, c - 1) * Math.pow(2, n), a = 0)); n >= 8; t[i + d] = 255 & o, d += p, o /= 256, n -= 8);
            for (a = a << n | o, u += n; u > 0; t[i + d] = 255 & a, d += p, a /= 256, u -= 8);
            t[i + d - p] |= 128 * m
        }
    },
    705: (t, e, i) => {
        var r, n, s = i.g.MutationObserver || i.g.WebKitMutationObserver;
        if (s) {
            var a = 0,
                o = new s(c),
                h = i.g.document.createTextNode("");
            o.observe(h, {
                characterData: !0
            }), r = function() {
                h.data = a = ++a % 2
            }
        } else if (i.g.setImmediate || void 0 === i.g.MessageChannel) r = "document" in i.g && "onreadystatechange" in i.g.document.createElement("script") ? function() {
            var t = i.g.document.createElement("script");
            t.onreadystatechange = function() {
                c(), t.onreadystatechange = null, t.parentNode.removeChild(t), t = null
            }, i.g.document.documentElement.appendChild(t)
        } : function() {
            setTimeout(c, 0)
        };
        else {
            var u = new i.g.MessageChannel;
            u.port1.onmessage = c, r = function() {
                u.port2.postMessage(0)
            }
        }
        var l = [];

        function c() {
            var t, e;
            n = !0;
            for (var i = l.length; i;) {
                for (e = l, l = [], t = -1; ++t < i;) e[t]();
                i = l.length
            }
            n = !1
        }
        t.exports = function(t) {
            1 !== l.push(t) || n || r()
        }
    },
    733: (t, e, i) => {
        t.exports = function t(e, i, r) {
            function n(a, o) {
                if (!i[a]) {
                    if (!e[a]) {
                        if (s) return s(a, !0);
                        var h = new Error("Cannot find module '" + a + "'");
                        throw h.code = "MODULE_NOT_FOUND", h
                    }
                    var u = i[a] = {
                        exports: {}
                    };
                    e[a][0].call(u.exports, (function(t) {
                        return n(e[a][1][t] || t)
                    }), u, u.exports, t, e, i, r)
                }
                return i[a].exports
            }
            for (var s = void 0, a = 0; a < r.length; a++) n(r[a]);
            return n
        }({
            1: [function(t, e, i) {
                var r = t("./utils"),
                    n = t("./support"),
                    s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                i.encode = function(t) {
                    for (var e, i, n, a, o, h, u, l = [], c = 0, f = t.length, d = f, p = "string" !== r.getTypeOf(t); c < t.length;) d = f - c, n = p ? (e = t[c++], i = c < f ? t[c++] : 0, c < f ? t[c++] : 0) : (e = t.charCodeAt(c++), i = c < f ? t.charCodeAt(c++) : 0, c < f ? t.charCodeAt(c++) : 0), a = e >> 2, o = (3 & e) << 4 | i >> 4, h = 1 < d ? (15 & i) << 2 | n >> 6 : 64, u = 2 < d ? 63 & n : 64, l.push(s.charAt(a) + s.charAt(o) + s.charAt(h) + s.charAt(u));
                    return l.join("")
                }, i.decode = function(t) {
                    var e, i, r, a, o, h, u = 0,
                        l = 0,
                        c = "data:";
                    if (t.substr(0, 5) === c) throw new Error("Invalid base64 input, it looks like a data url.");
                    var f, d = 3 * (t = t.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
                    if (t.charAt(t.length - 1) === s.charAt(64) && d--, t.charAt(t.length - 2) === s.charAt(64) && d--, d % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
                    for (f = n.uint8array ? new Uint8Array(0 | d) : new Array(0 | d); u < t.length;) e = s.indexOf(t.charAt(u++)) << 2 | (a = s.indexOf(t.charAt(u++))) >> 4, i = (15 & a) << 4 | (o = s.indexOf(t.charAt(u++))) >> 2, r = (3 & o) << 6 | (h = s.indexOf(t.charAt(u++))), f[l++] = e, 64 !== o && (f[l++] = i), 64 !== h && (f[l++] = r);
                    return f
                }
            }, {
                "./support": 30,
                "./utils": 32
            }],
            2: [function(t, e, i) {
                var r = t("./external"),
                    n = t("./stream/DataWorker"),
                    s = t("./stream/Crc32Probe"),
                    a = t("./stream/DataLengthProbe");

                function o(t, e, i, r, n) {
                    this.compressedSize = t, this.uncompressedSize = e, this.crc32 = i, this.compression = r, this.compressedContent = n
                }
                o.prototype = {
                    getContentWorker: function() {
                        var t = new n(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),
                            e = this;
                        return t.on("end", (function() {
                            if (this.streamInfo.data_length !== e.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch")
                        })), t
                    },
                    getCompressedWorker: function() {
                        return new n(r.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression)
                    }
                }, o.createWorkerFrom = function(t, e, i) {
                    return t.pipe(new s).pipe(new a("uncompressedSize")).pipe(e.compressWorker(i)).pipe(new a("compressedSize")).withStreamInfo("compression", e)
                }, e.exports = o
            }, {
                "./external": 6,
                "./stream/Crc32Probe": 25,
                "./stream/DataLengthProbe": 26,
                "./stream/DataWorker": 27
            }],
            3: [function(t, e, i) {
                var r = t("./stream/GenericWorker");
                i.STORE = {
                    magic: "\0\0",
                    compressWorker: function() {
                        return new r("STORE compression")
                    },
                    uncompressWorker: function() {
                        return new r("STORE decompression")
                    }
                }, i.DEFLATE = t("./flate")
            }, {
                "./flate": 7,
                "./stream/GenericWorker": 28
            }],
            4: [function(t, e, i) {
                var r = t("./utils"),
                    n = function() {
                        for (var t, e = [], i = 0; i < 256; i++) {
                            t = i;
                            for (var r = 0; r < 8; r++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
                            e[i] = t
                        }
                        return e
                    }();
                e.exports = function(t, e) {
                    return void 0 !== t && t.length ? "string" !== r.getTypeOf(t) ? function(t, e, i, r) {
                        var s = n,
                            a = 0 + i;
                        t ^= -1;
                        for (var o = 0; o < a; o++) t = t >>> 8 ^ s[255 & (t ^ e[o])];
                        return -1 ^ t
                    }(0 | e, t, t.length) : function(t, e, i, r) {
                        var s = n,
                            a = 0 + i;
                        t ^= -1;
                        for (var o = 0; o < a; o++) t = t >>> 8 ^ s[255 & (t ^ e.charCodeAt(o))];
                        return -1 ^ t
                    }(0 | e, t, t.length) : 0
                }
            }, {
                "./utils": 32
            }],
            5: [function(t, e, i) {
                i.base64 = !1, i.binary = !1, i.dir = !1, i.createFolders = !0, i.date = null, i.compression = null, i.compressionOptions = null, i.comment = null, i.unixPermissions = null, i.dosPermissions = null
            }, {}],
            6: [function(t, e, i) {
                var r;
                r = "undefined" != typeof Promise ? Promise : t("lie"), e.exports = {
                    Promise: r
                }
            }, {
                lie: 37
            }],
            7: [function(t, e, i) {
                var r = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array,
                    n = t("pako"),
                    s = t("./utils"),
                    a = t("./stream/GenericWorker"),
                    o = r ? "uint8array" : "array";

                function h(t, e) {
                    a.call(this, "FlateWorker/" + t), this._pako = null, this._pakoAction = t, this._pakoOptions = e, this.meta = {}
                }
                i.magic = "\b\0", s.inherits(h, a), h.prototype.processChunk = function(t) {
                    this.meta = t.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(o, t.data), !1)
                }, h.prototype.flush = function() {
                    a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], !0)
                }, h.prototype.cleanUp = function() {
                    a.prototype.cleanUp.call(this), this._pako = null
                }, h.prototype._createPako = function() {
                    this._pako = new n[this._pakoAction]({
                        raw: !0,
                        level: this._pakoOptions.level || -1
                    });
                    var t = this;
                    this._pako.onData = function(e) {
                        t.push({
                            data: e,
                            meta: t.meta
                        })
                    }
                }, i.compressWorker = function(t) {
                    return new h("Deflate", t)
                }, i.uncompressWorker = function() {
                    return new h("Inflate", {})
                }
            }, {
                "./stream/GenericWorker": 28,
                "./utils": 32,
                pako: 38
            }],
            8: [function(t, e, i) {
                function r(t, e) {
                    var i, r = "";
                    for (i = 0; i < e; i++) r += String.fromCharCode(255 & t), t >>>= 8;
                    return r
                }

                function n(t, e, i, n, a, l) {
                    var c, f, d = t.file,
                        p = t.compression,
                        m = l !== o.utf8encode,
                        g = s.transformTo("string", l(d.name)),
                        y = s.transformTo("string", o.utf8encode(d.name)),
                        _ = d.comment,
                        v = s.transformTo("string", l(_)),
                        b = s.transformTo("string", o.utf8encode(_)),
                        w = y.length !== d.name.length,
                        M = b.length !== _.length,
                        x = "",
                        k = "",
                        E = "",
                        C = d.dir,
                        S = d.date,
                        A = {
                            crc32: 0,
                            compressedSize: 0,
                            uncompressedSize: 0
                        };
                    e && !i || (A.crc32 = t.crc32, A.compressedSize = t.compressedSize, A.uncompressedSize = t.uncompressedSize);
                    var I = 0;
                    e && (I |= 8), m || !w && !M || (I |= 2048);
                    var O = 0,
                        B = 0;
                    C && (O |= 16), "UNIX" === a ? (B = 798, O |= function(t, e) {
                        var i = t;
                        return t || (i = e ? 16893 : 33204), (65535 & i) << 16
                    }(d.unixPermissions, C)) : (B = 20, O |= function(t) {
                        return 63 & (t || 0)
                    }(d.dosPermissions)), c = S.getUTCHours(), c <<= 6, c |= S.getUTCMinutes(), c <<= 5, c |= S.getUTCSeconds() / 2, f = S.getUTCFullYear() - 1980, f <<= 4, f |= S.getUTCMonth() + 1, f <<= 5, f |= S.getUTCDate(), w && (k = r(1, 1) + r(h(g), 4) + y, x += "up" + r(k.length, 2) + k), M && (E = r(1, 1) + r(h(v), 4) + b, x += "uc" + r(E.length, 2) + E);
                    var N = "";
                    return N += "\n\0", N += r(I, 2), N += p.magic, N += r(c, 2), N += r(f, 2), N += r(A.crc32, 4), N += r(A.compressedSize, 4), N += r(A.uncompressedSize, 4), N += r(g.length, 2), N += r(x.length, 2), {
                        fileRecord: u.LOCAL_FILE_HEADER + N + g + x,
                        dirRecord: u.CENTRAL_FILE_HEADER + r(B, 2) + N + r(v.length, 2) + "\0\0\0\0" + r(O, 4) + r(n, 4) + g + x + v
                    }
                }
                var s = t("../utils"),
                    a = t("../stream/GenericWorker"),
                    o = t("../utf8"),
                    h = t("../crc32"),
                    u = t("../signature");

                function l(t, e, i, r) {
                    a.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = e, this.zipPlatform = i, this.encodeFileName = r, this.streamFiles = t, this.accumulate = !1, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = []
                }
                s.inherits(l, a), l.prototype.push = function(t) {
                    var e = t.meta.percent || 0,
                        i = this.entriesCount,
                        r = this._sources.length;
                    this.accumulate ? this.contentBuffer.push(t) : (this.bytesWritten += t.data.length, a.prototype.push.call(this, {
                        data: t.data,
                        meta: {
                            currentFile: this.currentFile,
                            percent: i ? (e + 100 * (i - r - 1)) / i : 100
                        }
                    }))
                }, l.prototype.openedSource = function(t) {
                    this.currentSourceOffset = this.bytesWritten, this.currentFile = t.file.name;
                    var e = this.streamFiles && !t.file.dir;
                    if (e) {
                        var i = n(t, e, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                        this.push({
                            data: i.fileRecord,
                            meta: {
                                percent: 0
                            }
                        })
                    } else this.accumulate = !0
                }, l.prototype.closedSource = function(t) {
                    this.accumulate = !1;
                    var e = this.streamFiles && !t.file.dir,
                        i = n(t, e, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                    if (this.dirRecords.push(i.dirRecord), e) this.push({
                        data: function(t) {
                            return u.DATA_DESCRIPTOR + r(t.crc32, 4) + r(t.compressedSize, 4) + r(t.uncompressedSize, 4)
                        }(t),
                        meta: {
                            percent: 100
                        }
                    });
                    else
                        for (this.push({
                                data: i.fileRecord,
                                meta: {
                                    percent: 0
                                }
                            }); this.contentBuffer.length;) this.push(this.contentBuffer.shift());
                    this.currentFile = null
                }, l.prototype.flush = function() {
                    for (var t = this.bytesWritten, e = 0; e < this.dirRecords.length; e++) this.push({
                        data: this.dirRecords[e],
                        meta: {
                            percent: 100
                        }
                    });
                    var i = this.bytesWritten - t,
                        n = function(t, e, i, n, a) {
                            var o = s.transformTo("string", a(n));
                            return u.CENTRAL_DIRECTORY_END + "\0\0\0\0" + r(t, 2) + r(t, 2) + r(e, 4) + r(i, 4) + r(o.length, 2) + o
                        }(this.dirRecords.length, i, t, this.zipComment, this.encodeFileName);
                    this.push({
                        data: n,
                        meta: {
                            percent: 100
                        }
                    })
                }, l.prototype.prepareNextSource = function() {
                    this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume()
                }, l.prototype.registerPrevious = function(t) {
                    this._sources.push(t);
                    var e = this;
                    return t.on("data", (function(t) {
                        e.processChunk(t)
                    })), t.on("end", (function() {
                        e.closedSource(e.previous.streamInfo), e._sources.length ? e.prepareNextSource() : e.end()
                    })), t.on("error", (function(t) {
                        e.error(t)
                    })), this
                }, l.prototype.resume = function() {
                    return !!a.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0))
                }, l.prototype.error = function(t) {
                    var e = this._sources;
                    if (!a.prototype.error.call(this, t)) return !1;
                    for (var i = 0; i < e.length; i++) try {
                        e[i].error(t)
                    } catch (t) {}
                    return !0
                }, l.prototype.lock = function() {
                    a.prototype.lock.call(this);
                    for (var t = this._sources, e = 0; e < t.length; e++) t[e].lock()
                }, e.exports = l
            }, {
                "../crc32": 4,
                "../signature": 23,
                "../stream/GenericWorker": 28,
                "../utf8": 31,
                "../utils": 32
            }],
            9: [function(t, e, i) {
                var r = t("../compressions"),
                    n = t("./ZipFileWorker");
                i.generateWorker = function(t, e, i) {
                    var s = new n(e.streamFiles, i, e.platform, e.encodeFileName),
                        a = 0;
                    try {
                        t.forEach((function(t, i) {
                            a++;
                            var n = function(t, e) {
                                    var i = t || e,
                                        n = r[i];
                                    if (!n) throw new Error(i + " is not a valid compression method !");
                                    return n
                                }(i.options.compression, e.compression),
                                o = i.options.compressionOptions || e.compressionOptions || {},
                                h = i.dir,
                                u = i.date;
                            i._compressWorker(n, o).withStreamInfo("file", {
                                name: t,
                                dir: h,
                                date: u,
                                comment: i.comment || "",
                                unixPermissions: i.unixPermissions,
                                dosPermissions: i.dosPermissions
                            }).pipe(s)
                        })), s.entriesCount = a
                    } catch (t) {
                        s.error(t)
                    }
                    return s
                }
            }, {
                "../compressions": 3,
                "./ZipFileWorker": 8
            }],
            10: [function(t, e, i) {
                function r() {
                    if (!(this instanceof r)) return new r;
                    if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
                    this.files = Object.create(null), this.comment = null, this.root = "", this.clone = function() {
                        var t = new r;
                        for (var e in this) "function" != typeof this[e] && (t[e] = this[e]);
                        return t
                    }
                }(r.prototype = t("./object")).loadAsync = t("./load"), r.support = t("./support"), r.defaults = t("./defaults"), r.version = "3.10.1", r.loadAsync = function(t, e) {
                    return (new r).loadAsync(t, e)
                }, r.external = t("./external"), e.exports = r
            }, {
                "./defaults": 5,
                "./external": 6,
                "./load": 11,
                "./object": 15,
                "./support": 30
            }],
            11: [function(t, e, i) {
                var r = t("./utils"),
                    n = t("./external"),
                    s = t("./utf8"),
                    a = t("./zipEntries"),
                    o = t("./stream/Crc32Probe"),
                    h = t("./nodejsUtils");

                function u(t) {
                    return new n.Promise((function(e, i) {
                        var r = t.decompressed.getContentWorker().pipe(new o);
                        r.on("error", (function(t) {
                            i(t)
                        })).on("end", (function() {
                            r.streamInfo.crc32 !== t.decompressed.crc32 ? i(new Error("Corrupted zip : CRC32 mismatch")) : e()
                        })).resume()
                    }))
                }
                e.exports = function(t, e) {
                    var i = this;
                    return e = r.extend(e || {}, {
                        base64: !1,
                        checkCRC32: !1,
                        optimizedBinaryString: !1,
                        createFolders: !1,
                        decodeFileName: s.utf8decode
                    }), h.isNode && h.isStream(t) ? n.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : r.prepareContent("the loaded zip file", t, !0, e.optimizedBinaryString, e.base64).then((function(t) {
                        var i = new a(e);
                        return i.load(t), i
                    })).then((function(t) {
                        var i = [n.Promise.resolve(t)],
                            r = t.files;
                        if (e.checkCRC32)
                            for (var s = 0; s < r.length; s++) i.push(u(r[s]));
                        return n.Promise.all(i)
                    })).then((function(t) {
                        for (var n = t.shift(), s = n.files, a = 0; a < s.length; a++) {
                            var o = s[a],
                                h = o.fileNameStr,
                                u = r.resolve(o.fileNameStr);
                            i.file(u, o.decompressed, {
                                binary: !0,
                                optimizedBinaryString: !0,
                                date: o.date,
                                dir: o.dir,
                                comment: o.fileCommentStr.length ? o.fileCommentStr : null,
                                unixPermissions: o.unixPermissions,
                                dosPermissions: o.dosPermissions,
                                createFolders: e.createFolders
                            }), o.dir || (i.file(u).unsafeOriginalName = h)
                        }
                        return n.zipComment.length && (i.comment = n.zipComment), i
                    }))
                }
            }, {
                "./external": 6,
                "./nodejsUtils": 14,
                "./stream/Crc32Probe": 25,
                "./utf8": 31,
                "./utils": 32,
                "./zipEntries": 33
            }],
            12: [function(t, e, i) {
                var r = t("../utils"),
                    n = t("../stream/GenericWorker");

                function s(t, e) {
                    n.call(this, "Nodejs stream input adapter for " + t), this._upstreamEnded = !1, this._bindStream(e)
                }
                r.inherits(s, n), s.prototype._bindStream = function(t) {
                    var e = this;
                    (this._stream = t).pause(), t.on("data", (function(t) {
                        e.push({
                            data: t,
                            meta: {
                                percent: 0
                            }
                        })
                    })).on("error", (function(t) {
                        e.isPaused ? this.generatedError = t : e.error(t)
                    })).on("end", (function() {
                        e.isPaused ? e._upstreamEnded = !0 : e.end()
                    }))
                }, s.prototype.pause = function() {
                    return !!n.prototype.pause.call(this) && (this._stream.pause(), !0)
                }, s.prototype.resume = function() {
                    return !!n.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0)
                }, e.exports = s
            }, {
                "../stream/GenericWorker": 28,
                "../utils": 32
            }],
            13: [function(t, e, i) {
                var r = t("readable-stream").Readable;

                function n(t, e, i) {
                    r.call(this, e), this._helper = t;
                    var n = this;
                    t.on("data", (function(t, e) {
                        n.push(t) || n._helper.pause(), i && i(e)
                    })).on("error", (function(t) {
                        n.emit("error", t)
                    })).on("end", (function() {
                        n.push(null)
                    }))
                }
                t("../utils").inherits(n, r), n.prototype._read = function() {
                    this._helper.resume()
                }, e.exports = n
            }, {
                "../utils": 32,
                "readable-stream": 16
            }],
            14: [function(t, e, i) {
                e.exports = {
                    isNode: "undefined" != typeof Buffer,
                    newBufferFrom: function(t, e) {
                        if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(t, e);
                        if ("number" == typeof t) throw new Error('The "data" argument must not be a number');
                        return new Buffer(t, e)
                    },
                    allocBuffer: function(t) {
                        if (Buffer.alloc) return Buffer.alloc(t);
                        var e = new Buffer(t);
                        return e.fill(0), e
                    },
                    isBuffer: function(t) {
                        return Buffer.isBuffer(t)
                    },
                    isStream: function(t) {
                        return t && "function" == typeof t.on && "function" == typeof t.pause && "function" == typeof t.resume
                    }
                }
            }, {}],
            15: [function(t, e, i) {
                function r(t, e, i) {
                    var r, n = s.getTypeOf(e),
                        o = s.extend(i || {}, h);
                    o.date = o.date || new Date, null !== o.compression && (o.compression = o.compression.toUpperCase()), "string" == typeof o.unixPermissions && (o.unixPermissions = parseInt(o.unixPermissions, 8)), o.unixPermissions && 16384 & o.unixPermissions && (o.dir = !0), o.dosPermissions && 16 & o.dosPermissions && (o.dir = !0), o.dir && (t = m(t)), o.createFolders && (r = p(t)) && g.call(this, r, !0);
                    var c = "string" === n && !1 === o.binary && !1 === o.base64;
                    i && void 0 !== i.binary || (o.binary = !c), (e instanceof u && 0 === e.uncompressedSize || o.dir || !e || 0 === e.length) && (o.base64 = !1, o.binary = !0, e = "", o.compression = "STORE", n = "string");
                    var y;
                    y = e instanceof u || e instanceof a ? e : f.isNode && f.isStream(e) ? new d(t, e) : s.prepareContent(t, e, o.binary, o.optimizedBinaryString, o.base64);
                    var _ = new l(t, y, o);
                    this.files[t] = _
                }
                var n = t("./utf8"),
                    s = t("./utils"),
                    a = t("./stream/GenericWorker"),
                    o = t("./stream/StreamHelper"),
                    h = t("./defaults"),
                    u = t("./compressedObject"),
                    l = t("./zipObject"),
                    c = t("./generate"),
                    f = t("./nodejsUtils"),
                    d = t("./nodejs/NodejsStreamInputAdapter"),
                    p = function(t) {
                        "/" === t.slice(-1) && (t = t.substring(0, t.length - 1));
                        var e = t.lastIndexOf("/");
                        return 0 < e ? t.substring(0, e) : ""
                    },
                    m = function(t) {
                        return "/" !== t.slice(-1) && (t += "/"), t
                    },
                    g = function(t, e) {
                        return e = void 0 !== e ? e : h.createFolders, t = m(t), this.files[t] || r.call(this, t, null, {
                            dir: !0,
                            createFolders: e
                        }), this.files[t]
                    };

                function y(t) {
                    return "[object RegExp]" === Object.prototype.toString.call(t)
                }
                var _ = {
                    load: function() {
                        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                    },
                    forEach: function(t) {
                        var e, i, r;
                        for (e in this.files) r = this.files[e], (i = e.slice(this.root.length, e.length)) && e.slice(0, this.root.length) === this.root && t(i, r)
                    },
                    filter: function(t) {
                        var e = [];
                        return this.forEach((function(i, r) {
                            t(i, r) && e.push(r)
                        })), e
                    },
                    file: function(t, e, i) {
                        if (1 !== arguments.length) return t = this.root + t, r.call(this, t, e, i), this;
                        if (y(t)) {
                            var n = t;
                            return this.filter((function(t, e) {
                                return !e.dir && n.test(t)
                            }))
                        }
                        var s = this.files[this.root + t];
                        return s && !s.dir ? s : null
                    },
                    folder: function(t) {
                        if (!t) return this;
                        if (y(t)) return this.filter((function(e, i) {
                            return i.dir && t.test(e)
                        }));
                        var e = this.root + t,
                            i = g.call(this, e),
                            r = this.clone();
                        return r.root = i.name, r
                    },
                    remove: function(t) {
                        t = this.root + t;
                        var e = this.files[t];
                        if (e || ("/" !== t.slice(-1) && (t += "/"), e = this.files[t]), e && !e.dir) delete this.files[t];
                        else
                            for (var i = this.filter((function(e, i) {
                                    return i.name.slice(0, t.length) === t
                                })), r = 0; r < i.length; r++) delete this.files[i[r].name];
                        return this
                    },
                    generate: function() {
                        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                    },
                    generateInternalStream: function(t) {
                        var e, i = {};
                        try {
                            if ((i = s.extend(t || {}, {
                                    streamFiles: !1,
                                    compression: "STORE",
                                    compressionOptions: null,
                                    type: "",
                                    platform: "DOS",
                                    comment: null,
                                    mimeType: "application/zip",
                                    encodeFileName: n.utf8encode
                                })).type = i.type.toLowerCase(), i.compression = i.compression.toUpperCase(), "binarystring" === i.type && (i.type = "string"), !i.type) throw new Error("No output type specified.");
                            s.checkSupport(i.type), "darwin" !== i.platform && "freebsd" !== i.platform && "linux" !== i.platform && "sunos" !== i.platform || (i.platform = "UNIX"), "win32" === i.platform && (i.platform = "DOS");
                            var r = i.comment || this.comment || "";
                            e = c.generateWorker(this, i, r)
                        } catch (t) {
                            (e = new a("error")).error(t)
                        }
                        return new o(e, i.type || "string", i.mimeType)
                    },
                    generateAsync: function(t, e) {
                        return this.generateInternalStream(t).accumulate(e)
                    },
                    generateNodeStream: function(t, e) {
                        return (t = t || {}).type || (t.type = "nodebuffer"), this.generateInternalStream(t).toNodejsStream(e)
                    }
                };
                e.exports = _
            }, {
                "./compressedObject": 2,
                "./defaults": 5,
                "./generate": 9,
                "./nodejs/NodejsStreamInputAdapter": 12,
                "./nodejsUtils": 14,
                "./stream/GenericWorker": 28,
                "./stream/StreamHelper": 29,
                "./utf8": 31,
                "./utils": 32,
                "./zipObject": 35
            }],
            16: [function(t, e, i) {
                e.exports = t("stream")
            }, {
                stream: void 0
            }],
            17: [function(t, e, i) {
                var r = t("./DataReader");

                function n(t) {
                    r.call(this, t);
                    for (var e = 0; e < this.data.length; e++) t[e] = 255 & t[e]
                }
                t("../utils").inherits(n, r), n.prototype.byteAt = function(t) {
                    return this.data[this.zero + t]
                }, n.prototype.lastIndexOfSignature = function(t) {
                    for (var e = t.charCodeAt(0), i = t.charCodeAt(1), r = t.charCodeAt(2), n = t.charCodeAt(3), s = this.length - 4; 0 <= s; --s)
                        if (this.data[s] === e && this.data[s + 1] === i && this.data[s + 2] === r && this.data[s + 3] === n) return s - this.zero;
                    return -1
                }, n.prototype.readAndCheckSignature = function(t) {
                    var e = t.charCodeAt(0),
                        i = t.charCodeAt(1),
                        r = t.charCodeAt(2),
                        n = t.charCodeAt(3),
                        s = this.readData(4);
                    return e === s[0] && i === s[1] && r === s[2] && n === s[3]
                }, n.prototype.readData = function(t) {
                    if (this.checkOffset(t), 0 === t) return [];
                    var e = this.data.slice(this.zero + this.index, this.zero + this.index + t);
                    return this.index += t, e
                }, e.exports = n
            }, {
                "../utils": 32,
                "./DataReader": 18
            }],
            18: [function(t, e, i) {
                var r = t("../utils");

                function n(t) {
                    this.data = t, this.length = t.length, this.index = 0, this.zero = 0
                }
                n.prototype = {
                    checkOffset: function(t) {
                        this.checkIndex(this.index + t)
                    },
                    checkIndex: function(t) {
                        if (this.length < this.zero + t || t < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + t + "). Corrupted zip ?")
                    },
                    setIndex: function(t) {
                        this.checkIndex(t), this.index = t
                    },
                    skip: function(t) {
                        this.setIndex(this.index + t)
                    },
                    byteAt: function() {},
                    readInt: function(t) {
                        var e, i = 0;
                        for (this.checkOffset(t), e = this.index + t - 1; e >= this.index; e--) i = (i << 8) + this.byteAt(e);
                        return this.index += t, i
                    },
                    readString: function(t) {
                        return r.transformTo("string", this.readData(t))
                    },
                    readData: function() {},
                    lastIndexOfSignature: function() {},
                    readAndCheckSignature: function() {},
                    readDate: function() {
                        var t = this.readInt(4);
                        return new Date(Date.UTC(1980 + (t >> 25 & 127), (t >> 21 & 15) - 1, t >> 16 & 31, t >> 11 & 31, t >> 5 & 63, (31 & t) << 1))
                    }
                }, e.exports = n
            }, {
                "../utils": 32
            }],
            19: [function(t, e, i) {
                var r = t("./Uint8ArrayReader");

                function n(t) {
                    r.call(this, t)
                }
                t("../utils").inherits(n, r), n.prototype.readData = function(t) {
                    this.checkOffset(t);
                    var e = this.data.slice(this.zero + this.index, this.zero + this.index + t);
                    return this.index += t, e
                }, e.exports = n
            }, {
                "../utils": 32,
                "./Uint8ArrayReader": 21
            }],
            20: [function(t, e, i) {
                var r = t("./DataReader");

                function n(t) {
                    r.call(this, t)
                }
                t("../utils").inherits(n, r), n.prototype.byteAt = function(t) {
                    return this.data.charCodeAt(this.zero + t)
                }, n.prototype.lastIndexOfSignature = function(t) {
                    return this.data.lastIndexOf(t) - this.zero
                }, n.prototype.readAndCheckSignature = function(t) {
                    return t === this.readData(4)
                }, n.prototype.readData = function(t) {
                    this.checkOffset(t);
                    var e = this.data.slice(this.zero + this.index, this.zero + this.index + t);
                    return this.index += t, e
                }, e.exports = n
            }, {
                "../utils": 32,
                "./DataReader": 18
            }],
            21: [function(t, e, i) {
                var r = t("./ArrayReader");

                function n(t) {
                    r.call(this, t)
                }
                t("../utils").inherits(n, r), n.prototype.readData = function(t) {
                    if (this.checkOffset(t), 0 === t) return new Uint8Array(0);
                    var e = this.data.subarray(this.zero + this.index, this.zero + this.index + t);
                    return this.index += t, e
                }, e.exports = n
            }, {
                "../utils": 32,
                "./ArrayReader": 17
            }],
            22: [function(t, e, i) {
                var r = t("../utils"),
                    n = t("../support"),
                    s = t("./ArrayReader"),
                    a = t("./StringReader"),
                    o = t("./NodeBufferReader"),
                    h = t("./Uint8ArrayReader");
                e.exports = function(t) {
                    var e = r.getTypeOf(t);
                    return r.checkSupport(e), "string" !== e || n.uint8array ? "nodebuffer" === e ? new o(t) : n.uint8array ? new h(r.transformTo("uint8array", t)) : new s(r.transformTo("array", t)) : new a(t)
                }
            }, {
                "../support": 30,
                "../utils": 32,
                "./ArrayReader": 17,
                "./NodeBufferReader": 19,
                "./StringReader": 20,
                "./Uint8ArrayReader": 21
            }],
            23: [function(t, e, i) {
                i.LOCAL_FILE_HEADER = "PK", i.CENTRAL_FILE_HEADER = "PK", i.CENTRAL_DIRECTORY_END = "PK", i.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK", i.ZIP64_CENTRAL_DIRECTORY_END = "PK", i.DATA_DESCRIPTOR = "PK\b"
            }, {}],
            24: [function(t, e, i) {
                var r = t("./GenericWorker"),
                    n = t("../utils");

                function s(t) {
                    r.call(this, "ConvertWorker to " + t), this.destType = t
                }
                n.inherits(s, r), s.prototype.processChunk = function(t) {
                    this.push({
                        data: n.transformTo(this.destType, t.data),
                        meta: t.meta
                    })
                }, e.exports = s
            }, {
                "../utils": 32,
                "./GenericWorker": 28
            }],
            25: [function(t, e, i) {
                var r = t("./GenericWorker"),
                    n = t("../crc32");

                function s() {
                    r.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0)
                }
                t("../utils").inherits(s, r), s.prototype.processChunk = function(t) {
                    this.streamInfo.crc32 = n(t.data, this.streamInfo.crc32 || 0), this.push(t)
                }, e.exports = s
            }, {
                "../crc32": 4,
                "../utils": 32,
                "./GenericWorker": 28
            }],
            26: [function(t, e, i) {
                var r = t("../utils"),
                    n = t("./GenericWorker");

                function s(t) {
                    n.call(this, "DataLengthProbe for " + t), this.propName = t, this.withStreamInfo(t, 0)
                }
                r.inherits(s, n), s.prototype.processChunk = function(t) {
                    if (t) {
                        var e = this.streamInfo[this.propName] || 0;
                        this.streamInfo[this.propName] = e + t.data.length
                    }
                    n.prototype.processChunk.call(this, t)
                }, e.exports = s
            }, {
                "../utils": 32,
                "./GenericWorker": 28
            }],
            27: [function(t, e, i) {
                var r = t("../utils"),
                    n = t("./GenericWorker");

                function s(t) {
                    n.call(this, "DataWorker");
                    var e = this;
                    this.dataIsReady = !1, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = !1, t.then((function(t) {
                        e.dataIsReady = !0, e.data = t, e.max = t && t.length || 0, e.type = r.getTypeOf(t), e.isPaused || e._tickAndRepeat()
                    }), (function(t) {
                        e.error(t)
                    }))
                }
                r.inherits(s, n), s.prototype.cleanUp = function() {
                    n.prototype.cleanUp.call(this), this.data = null
                }, s.prototype.resume = function() {
                    return !!n.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = !0, r.delay(this._tickAndRepeat, [], this)), !0)
                }, s.prototype._tickAndRepeat = function() {
                    this._tickScheduled = !1, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (r.delay(this._tickAndRepeat, [], this), this._tickScheduled = !0))
                }, s.prototype._tick = function() {
                    if (this.isPaused || this.isFinished) return !1;
                    var t = null,
                        e = Math.min(this.max, this.index + 16384);
                    if (this.index >= this.max) return this.end();
                    switch (this.type) {
                        case "string":
                            t = this.data.substring(this.index, e);
                            break;
                        case "uint8array":
                            t = this.data.subarray(this.index, e);
                            break;
                        case "array":
                        case "nodebuffer":
                            t = this.data.slice(this.index, e)
                    }
                    return this.index = e, this.push({
                        data: t,
                        meta: {
                            percent: this.max ? this.index / this.max * 100 : 0
                        }
                    })
                }, e.exports = s
            }, {
                "../utils": 32,
                "./GenericWorker": 28
            }],
            28: [function(t, e, i) {
                function r(t) {
                    this.name = t || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = !0, this.isFinished = !1, this.isLocked = !1, this._listeners = {
                        data: [],
                        end: [],
                        error: []
                    }, this.previous = null
                }
                r.prototype = {
                    push: function(t) {
                        this.emit("data", t)
                    },
                    end: function() {
                        if (this.isFinished) return !1;
                        this.flush();
                        try {
                            this.emit("end"), this.cleanUp(), this.isFinished = !0
                        } catch (t) {
                            this.emit("error", t)
                        }
                        return !0
                    },
                    error: function(t) {
                        return !this.isFinished && (this.isPaused ? this.generatedError = t : (this.isFinished = !0, this.emit("error", t), this.previous && this.previous.error(t), this.cleanUp()), !0)
                    },
                    on: function(t, e) {
                        return this._listeners[t].push(e), this
                    },
                    cleanUp: function() {
                        this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = []
                    },
                    emit: function(t, e) {
                        if (this._listeners[t])
                            for (var i = 0; i < this._listeners[t].length; i++) this._listeners[t][i].call(this, e)
                    },
                    pipe: function(t) {
                        return t.registerPrevious(this)
                    },
                    registerPrevious: function(t) {
                        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                        this.streamInfo = t.streamInfo, this.mergeStreamInfo(), this.previous = t;
                        var e = this;
                        return t.on("data", (function(t) {
                            e.processChunk(t)
                        })), t.on("end", (function() {
                            e.end()
                        })), t.on("error", (function(t) {
                            e.error(t)
                        })), this
                    },
                    pause: function() {
                        return !this.isPaused && !this.isFinished && (this.isPaused = !0, this.previous && this.previous.pause(), !0)
                    },
                    resume: function() {
                        if (!this.isPaused || this.isFinished) return !1;
                        var t = this.isPaused = !1;
                        return this.generatedError && (this.error(this.generatedError), t = !0), this.previous && this.previous.resume(), !t
                    },
                    flush: function() {},
                    processChunk: function(t) {
                        this.push(t)
                    },
                    withStreamInfo: function(t, e) {
                        return this.extraStreamInfo[t] = e, this.mergeStreamInfo(), this
                    },
                    mergeStreamInfo: function() {
                        for (var t in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, t) && (this.streamInfo[t] = this.extraStreamInfo[t])
                    },
                    lock: function() {
                        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                        this.isLocked = !0, this.previous && this.previous.lock()
                    },
                    toString: function() {
                        var t = "Worker " + this.name;
                        return this.previous ? this.previous + " -> " + t : t
                    }
                }, e.exports = r
            }, {}],
            29: [function(t, e, i) {
                var r = t("../utils"),
                    n = t("./ConvertWorker"),
                    s = t("./GenericWorker"),
                    a = t("../base64"),
                    o = t("../support"),
                    h = t("../external"),
                    u = null;
                if (o.nodestream) try {
                    u = t("../nodejs/NodejsStreamOutputAdapter")
                } catch (t) {}

                function l(t, e, i) {
                    var a = e;
                    switch (e) {
                        case "blob":
                        case "arraybuffer":
                            a = "uint8array";
                            break;
                        case "base64":
                            a = "string"
                    }
                    try {
                        this._internalType = a, this._outputType = e, this._mimeType = i, r.checkSupport(a), this._worker = t.pipe(new n(a)), t.lock()
                    } catch (t) {
                        this._worker = new s("error"), this._worker.error(t)
                    }
                }
                l.prototype = {
                    accumulate: function(t) {
                        return function(t, e) {
                            return new h.Promise((function(i, n) {
                                var s = [],
                                    o = t._internalType,
                                    h = t._outputType,
                                    u = t._mimeType;
                                t.on("data", (function(t, i) {
                                    s.push(t), e && e(i)
                                })).on("error", (function(t) {
                                    s = [], n(t)
                                })).on("end", (function() {
                                    try {
                                        var t = function(t, e, i) {
                                            switch (t) {
                                                case "blob":
                                                    return r.newBlob(r.transformTo("arraybuffer", e), i);
                                                case "base64":
                                                    return a.encode(e);
                                                default:
                                                    return r.transformTo(t, e)
                                            }
                                        }(h, function(t, e) {
                                            var i, r = 0,
                                                n = null,
                                                s = 0;
                                            for (i = 0; i < e.length; i++) s += e[i].length;
                                            switch (t) {
                                                case "string":
                                                    return e.join("");
                                                case "array":
                                                    return Array.prototype.concat.apply([], e);
                                                case "uint8array":
                                                    for (n = new Uint8Array(s), i = 0; i < e.length; i++) n.set(e[i], r), r += e[i].length;
                                                    return n;
                                                case "nodebuffer":
                                                    return Buffer.concat(e);
                                                default:
                                                    throw new Error("concat : unsupported type '" + t + "'")
                                            }
                                        }(o, s), u);
                                        i(t)
                                    } catch (t) {
                                        n(t)
                                    }
                                    s = []
                                })).resume()
                            }))
                        }(this, t)
                    },
                    on: function(t, e) {
                        var i = this;
                        return "data" === t ? this._worker.on(t, (function(t) {
                            e.call(i, t.data, t.meta)
                        })) : this._worker.on(t, (function() {
                            r.delay(e, arguments, i)
                        })), this
                    },
                    resume: function() {
                        return r.delay(this._worker.resume, [], this._worker), this
                    },
                    pause: function() {
                        return this._worker.pause(), this
                    },
                    toNodejsStream: function(t) {
                        if (r.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
                        return new u(this, {
                            objectMode: "nodebuffer" !== this._outputType
                        }, t)
                    }
                }, e.exports = l
            }, {
                "../base64": 1,
                "../external": 6,
                "../nodejs/NodejsStreamOutputAdapter": 13,
                "../support": 30,
                "../utils": 32,
                "./ConvertWorker": 24,
                "./GenericWorker": 28
            }],
            30: [function(t, e, i) {
                if (i.base64 = !0, i.array = !0, i.string = !0, i.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, i.nodebuffer = "undefined" != typeof Buffer, i.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) i.blob = !1;
                else {
                    var r = new ArrayBuffer(0);
                    try {
                        i.blob = 0 === new Blob([r], {
                            type: "application/zip"
                        }).size
                    } catch (t) {
                        try {
                            var n = new(self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
                            n.append(r), i.blob = 0 === n.getBlob("application/zip").size
                        } catch (t) {
                            i.blob = !1
                        }
                    }
                }
                try {
                    i.nodestream = !!t("readable-stream").Readable
                } catch (t) {
                    i.nodestream = !1
                }
            }, {
                "readable-stream": 16
            }],
            31: [function(t, e, i) {
                for (var r = t("./utils"), n = t("./support"), s = t("./nodejsUtils"), a = t("./stream/GenericWorker"), o = new Array(256), h = 0; h < 256; h++) o[h] = 252 <= h ? 6 : 248 <= h ? 5 : 240 <= h ? 4 : 224 <= h ? 3 : 192 <= h ? 2 : 1;

                function u() {
                    a.call(this, "utf-8 decode"), this.leftOver = null
                }

                function l() {
                    a.call(this, "utf-8 encode")
                }
                o[254] = o[254] = 1, i.utf8encode = function(t) {
                    return n.nodebuffer ? s.newBufferFrom(t, "utf-8") : function(t) {
                        var e, i, r, s, a, o = t.length,
                            h = 0;
                        for (s = 0; s < o; s++) 55296 == (64512 & (i = t.charCodeAt(s))) && s + 1 < o && 56320 == (64512 & (r = t.charCodeAt(s + 1))) && (i = 65536 + (i - 55296 << 10) + (r - 56320), s++), h += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4;
                        for (e = n.uint8array ? new Uint8Array(h) : new Array(h), s = a = 0; a < h; s++) 55296 == (64512 & (i = t.charCodeAt(s))) && s + 1 < o && 56320 == (64512 & (r = t.charCodeAt(s + 1))) && (i = 65536 + (i - 55296 << 10) + (r - 56320), s++), i < 128 ? e[a++] = i : (i < 2048 ? e[a++] = 192 | i >>> 6 : (i < 65536 ? e[a++] = 224 | i >>> 12 : (e[a++] = 240 | i >>> 18, e[a++] = 128 | i >>> 12 & 63), e[a++] = 128 | i >>> 6 & 63), e[a++] = 128 | 63 & i);
                        return e
                    }(t)
                }, i.utf8decode = function(t) {
                    return n.nodebuffer ? r.transformTo("nodebuffer", t).toString("utf-8") : function(t) {
                        var e, i, n, s, a = t.length,
                            h = new Array(2 * a);
                        for (e = i = 0; e < a;)
                            if ((n = t[e++]) < 128) h[i++] = n;
                            else if (4 < (s = o[n])) h[i++] = 65533, e += s - 1;
                        else {
                            for (n &= 2 === s ? 31 : 3 === s ? 15 : 7; 1 < s && e < a;) n = n << 6 | 63 & t[e++], s--;
                            1 < s ? h[i++] = 65533 : n < 65536 ? h[i++] = n : (n -= 65536, h[i++] = 55296 | n >> 10 & 1023, h[i++] = 56320 | 1023 & n)
                        }
                        return h.length !== i && (h.subarray ? h = h.subarray(0, i) : h.length = i), r.applyFromCharCode(h)
                    }(t = r.transformTo(n.uint8array ? "uint8array" : "array", t))
                }, r.inherits(u, a), u.prototype.processChunk = function(t) {
                    var e = r.transformTo(n.uint8array ? "uint8array" : "array", t.data);
                    if (this.leftOver && this.leftOver.length) {
                        if (n.uint8array) {
                            var s = e;
                            (e = new Uint8Array(s.length + this.leftOver.length)).set(this.leftOver, 0), e.set(s, this.leftOver.length)
                        } else e = this.leftOver.concat(e);
                        this.leftOver = null
                    }
                    var a = function(t, e) {
                            var i;
                            for ((e = e || t.length) > t.length && (e = t.length), i = e - 1; 0 <= i && 128 == (192 & t[i]);) i--;
                            return i < 0 || 0 === i ? e : i + o[t[i]] > e ? i : e
                        }(e),
                        h = e;
                    a !== e.length && (n.uint8array ? (h = e.subarray(0, a), this.leftOver = e.subarray(a, e.length)) : (h = e.slice(0, a), this.leftOver = e.slice(a, e.length))), this.push({
                        data: i.utf8decode(h),
                        meta: t.meta
                    })
                }, u.prototype.flush = function() {
                    this.leftOver && this.leftOver.length && (this.push({
                        data: i.utf8decode(this.leftOver),
                        meta: {}
                    }), this.leftOver = null)
                }, i.Utf8DecodeWorker = u, r.inherits(l, a), l.prototype.processChunk = function(t) {
                    this.push({
                        data: i.utf8encode(t.data),
                        meta: t.meta
                    })
                }, i.Utf8EncodeWorker = l
            }, {
                "./nodejsUtils": 14,
                "./stream/GenericWorker": 28,
                "./support": 30,
                "./utils": 32
            }],
            32: [function(t, e, i) {
                var r = t("./support"),
                    n = t("./base64"),
                    s = t("./nodejsUtils"),
                    a = t("./external");

                function o(t) {
                    return t
                }

                function h(t, e) {
                    for (var i = 0; i < t.length; ++i) e[i] = 255 & t.charCodeAt(i);
                    return e
                }
                t("setimmediate"), i.newBlob = function(t, e) {
                    i.checkSupport("blob");
                    try {
                        return new Blob([t], {
                            type: e
                        })
                    } catch (i) {
                        try {
                            var r = new(self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder);
                            return r.append(t), r.getBlob(e)
                        } catch (t) {
                            throw new Error("Bug : can't construct the Blob.")
                        }
                    }
                };
                var u = {
                    stringifyByChunk: function(t, e, i) {
                        var r = [],
                            n = 0,
                            s = t.length;
                        if (s <= i) return String.fromCharCode.apply(null, t);
                        for (; n < s;) "array" === e || "nodebuffer" === e ? r.push(String.fromCharCode.apply(null, t.slice(n, Math.min(n + i, s)))) : r.push(String.fromCharCode.apply(null, t.subarray(n, Math.min(n + i, s)))), n += i;
                        return r.join("")
                    },
                    stringifyByChar: function(t) {
                        for (var e = "", i = 0; i < t.length; i++) e += String.fromCharCode(t[i]);
                        return e
                    },
                    applyCanBeUsed: {
                        uint8array: function() {
                            try {
                                return r.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length
                            } catch (t) {
                                return !1
                            }
                        }(),
                        nodebuffer: function() {
                            try {
                                return r.nodebuffer && 1 === String.fromCharCode.apply(null, s.allocBuffer(1)).length
                            } catch (t) {
                                return !1
                            }
                        }()
                    }
                };

                function l(t) {
                    var e = 65536,
                        r = i.getTypeOf(t),
                        n = !0;
                    if ("uint8array" === r ? n = u.applyCanBeUsed.uint8array : "nodebuffer" === r && (n = u.applyCanBeUsed.nodebuffer), n)
                        for (; 1 < e;) try {
                            return u.stringifyByChunk(t, r, e)
                        } catch (t) {
                            e = Math.floor(e / 2)
                        }
                    return u.stringifyByChar(t)
                }

                function c(t, e) {
                    for (var i = 0; i < t.length; i++) e[i] = t[i];
                    return e
                }
                i.applyFromCharCode = l;
                var f = {};
                f.string = {
                    string: o,
                    array: function(t) {
                        return h(t, new Array(t.length))
                    },
                    arraybuffer: function(t) {
                        return f.string.uint8array(t).buffer
                    },
                    uint8array: function(t) {
                        return h(t, new Uint8Array(t.length))
                    },
                    nodebuffer: function(t) {
                        return h(t, s.allocBuffer(t.length))
                    }
                }, f.array = {
                    string: l,
                    array: o,
                    arraybuffer: function(t) {
                        return new Uint8Array(t).buffer
                    },
                    uint8array: function(t) {
                        return new Uint8Array(t)
                    },
                    nodebuffer: function(t) {
                        return s.newBufferFrom(t)
                    }
                }, f.arraybuffer = {
                    string: function(t) {
                        return l(new Uint8Array(t))
                    },
                    array: function(t) {
                        return c(new Uint8Array(t), new Array(t.byteLength))
                    },
                    arraybuffer: o,
                    uint8array: function(t) {
                        return new Uint8Array(t)
                    },
                    nodebuffer: function(t) {
                        return s.newBufferFrom(new Uint8Array(t))
                    }
                }, f.uint8array = {
                    string: l,
                    array: function(t) {
                        return c(t, new Array(t.length))
                    },
                    arraybuffer: function(t) {
                        return t.buffer
                    },
                    uint8array: o,
                    nodebuffer: function(t) {
                        return s.newBufferFrom(t)
                    }
                }, f.nodebuffer = {
                    string: l,
                    array: function(t) {
                        return c(t, new Array(t.length))
                    },
                    arraybuffer: function(t) {
                        return f.nodebuffer.uint8array(t).buffer
                    },
                    uint8array: function(t) {
                        return c(t, new Uint8Array(t.length))
                    },
                    nodebuffer: o
                }, i.transformTo = function(t, e) {
                    if (e = e || "", !t) return e;
                    i.checkSupport(t);
                    var r = i.getTypeOf(e);
                    return f[r][t](e)
                }, i.resolve = function(t) {
                    for (var e = t.split("/"), i = [], r = 0; r < e.length; r++) {
                        var n = e[r];
                        "." === n || "" === n && 0 !== r && r !== e.length - 1 || (".." === n ? i.pop() : i.push(n))
                    }
                    return i.join("/")
                }, i.getTypeOf = function(t) {
                    return "string" == typeof t ? "string" : "[object Array]" === Object.prototype.toString.call(t) ? "array" : r.nodebuffer && s.isBuffer(t) ? "nodebuffer" : r.uint8array && t instanceof Uint8Array ? "uint8array" : r.arraybuffer && t instanceof ArrayBuffer ? "arraybuffer" : void 0
                }, i.checkSupport = function(t) {
                    if (!r[t.toLowerCase()]) throw new Error(t + " is not supported by this platform")
                }, i.MAX_VALUE_16BITS = 65535, i.MAX_VALUE_32BITS = -1, i.pretty = function(t) {
                    var e, i, r = "";
                    for (i = 0; i < (t || "").length; i++) r += "\\x" + ((e = t.charCodeAt(i)) < 16 ? "0" : "") + e.toString(16).toUpperCase();
                    return r
                }, i.delay = function(t, e, i) {
                    setImmediate((function() {
                        t.apply(i || null, e || [])
                    }))
                }, i.inherits = function(t, e) {
                    function i() {}
                    i.prototype = e.prototype, t.prototype = new i
                }, i.extend = function() {
                    var t, e, i = {};
                    for (t = 0; t < arguments.length; t++)
                        for (e in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], e) && void 0 === i[e] && (i[e] = arguments[t][e]);
                    return i
                }, i.prepareContent = function(t, e, s, o, u) {
                    return a.Promise.resolve(e).then((function(t) {
                        return r.blob && (t instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(t))) && "undefined" != typeof FileReader ? new a.Promise((function(e, i) {
                            var r = new FileReader;
                            r.onload = function(t) {
                                e(t.target.result)
                            }, r.onerror = function(t) {
                                i(t.target.error)
                            }, r.readAsArrayBuffer(t)
                        })) : t
                    })).then((function(e) {
                        var l = i.getTypeOf(e);
                        return l ? ("arraybuffer" === l ? e = i.transformTo("uint8array", e) : "string" === l && (u ? e = n.decode(e) : s && !0 !== o && (e = function(t) {
                            return h(t, r.uint8array ? new Uint8Array(t.length) : new Array(t.length))
                        }(e))), e) : a.Promise.reject(new Error("Can't read the data of '" + t + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))
                    }))
                }
            }, {
                "./base64": 1,
                "./external": 6,
                "./nodejsUtils": 14,
                "./support": 30,
                setimmediate: 54
            }],
            33: [function(t, e, i) {
                var r = t("./reader/readerFor"),
                    n = t("./utils"),
                    s = t("./signature"),
                    a = t("./zipEntry"),
                    o = t("./support");

                function h(t) {
                    this.files = [], this.loadOptions = t
                }
                h.prototype = {
                    checkSignature: function(t) {
                        if (!this.reader.readAndCheckSignature(t)) {
                            this.reader.index -= 4;
                            var e = this.reader.readString(4);
                            throw new Error("Corrupted zip or bug: unexpected signature (" + n.pretty(e) + ", expected " + n.pretty(t) + ")")
                        }
                    },
                    isSignature: function(t, e) {
                        var i = this.reader.index;
                        this.reader.setIndex(t);
                        var r = this.reader.readString(4) === e;
                        return this.reader.setIndex(i), r
                    },
                    readBlockEndOfCentral: function() {
                        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
                        var t = this.reader.readData(this.zipCommentLength),
                            e = o.uint8array ? "uint8array" : "array",
                            i = n.transformTo(e, t);
                        this.zipComment = this.loadOptions.decodeFileName(i)
                    },
                    readBlockZip64EndOfCentral: function() {
                        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
                        for (var t, e, i, r = this.zip64EndOfCentralSize - 44; 0 < r;) t = this.reader.readInt(2), e = this.reader.readInt(4), i = this.reader.readData(e), this.zip64ExtensibleData[t] = {
                            id: t,
                            length: e,
                            value: i
                        }
                    },
                    readBlockZip64EndOfCentralLocator: function() {
                        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported")
                    },
                    readLocalFiles: function() {
                        var t, e;
                        for (t = 0; t < this.files.length; t++) e = this.files[t], this.reader.setIndex(e.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), e.readLocalPart(this.reader), e.handleUTF8(), e.processAttributes()
                    },
                    readCentralDir: function() {
                        var t;
                        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(t = new a({
                            zip64: this.zip64
                        }, this.loadOptions)).readCentralPart(this.reader), this.files.push(t);
                        if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length)
                    },
                    readEndOfCentral: function() {
                        var t = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
                        if (t < 0) throw this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
                        this.reader.setIndex(t);
                        var e = t;
                        if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === n.MAX_VALUE_16BITS || this.diskWithCentralDirStart === n.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === n.MAX_VALUE_16BITS || this.centralDirRecords === n.MAX_VALUE_16BITS || this.centralDirSize === n.MAX_VALUE_32BITS || this.centralDirOffset === n.MAX_VALUE_32BITS) {
                            if (this.zip64 = !0, (t = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
                            if (this.reader.setIndex(t), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral()
                        }
                        var i = this.centralDirOffset + this.centralDirSize;
                        this.zip64 && (i += 20, i += 12 + this.zip64EndOfCentralSize);
                        var r = e - i;
                        if (0 < r) this.isSignature(e, s.CENTRAL_FILE_HEADER) || (this.reader.zero = r);
                        else if (r < 0) throw new Error("Corrupted zip: missing " + Math.abs(r) + " bytes.")
                    },
                    prepareReader: function(t) {
                        this.reader = r(t)
                    },
                    load: function(t) {
                        this.prepareReader(t), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles()
                    }
                }, e.exports = h
            }, {
                "./reader/readerFor": 22,
                "./signature": 23,
                "./support": 30,
                "./utils": 32,
                "./zipEntry": 34
            }],
            34: [function(t, e, i) {
                var r = t("./reader/readerFor"),
                    n = t("./utils"),
                    s = t("./compressedObject"),
                    a = t("./crc32"),
                    o = t("./utf8"),
                    h = t("./compressions"),
                    u = t("./support");

                function l(t, e) {
                    this.options = t, this.loadOptions = e
                }
                l.prototype = {
                    isEncrypted: function() {
                        return 1 == (1 & this.bitFlag)
                    },
                    useUTF8: function() {
                        return 2048 == (2048 & this.bitFlag)
                    },
                    readLocalPart: function(t) {
                        var e, i;
                        if (t.skip(22), this.fileNameLength = t.readInt(2), i = t.readInt(2), this.fileName = t.readData(this.fileNameLength), t.skip(i), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
                        if (null === (e = function(t) {
                                for (var e in h)
                                    if (Object.prototype.hasOwnProperty.call(h, e) && h[e].magic === t) return h[e];
                                return null
                            }(this.compressionMethod))) throw new Error("Corrupted zip : compression " + n.pretty(this.compressionMethod) + " unknown (inner file : " + n.transformTo("string", this.fileName) + ")");
                        this.decompressed = new s(this.compressedSize, this.uncompressedSize, this.crc32, e, t.readData(this.compressedSize))
                    },
                    readCentralPart: function(t) {
                        this.versionMadeBy = t.readInt(2), t.skip(2), this.bitFlag = t.readInt(2), this.compressionMethod = t.readString(2), this.date = t.readDate(), this.crc32 = t.readInt(4), this.compressedSize = t.readInt(4), this.uncompressedSize = t.readInt(4);
                        var e = t.readInt(2);
                        if (this.extraFieldsLength = t.readInt(2), this.fileCommentLength = t.readInt(2), this.diskNumberStart = t.readInt(2), this.internalFileAttributes = t.readInt(2), this.externalFileAttributes = t.readInt(4), this.localHeaderOffset = t.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
                        t.skip(e), this.readExtraFields(t), this.parseZIP64ExtraField(t), this.fileComment = t.readData(this.fileCommentLength)
                    },
                    processAttributes: function() {
                        this.unixPermissions = null, this.dosPermissions = null;
                        var t = this.versionMadeBy >> 8;
                        this.dir = !!(16 & this.externalFileAttributes), 0 == t && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == t && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = !0)
                    },
                    parseZIP64ExtraField: function() {
                        if (this.extraFields[1]) {
                            var t = r(this.extraFields[1].value);
                            this.uncompressedSize === n.MAX_VALUE_32BITS && (this.uncompressedSize = t.readInt(8)), this.compressedSize === n.MAX_VALUE_32BITS && (this.compressedSize = t.readInt(8)), this.localHeaderOffset === n.MAX_VALUE_32BITS && (this.localHeaderOffset = t.readInt(8)), this.diskNumberStart === n.MAX_VALUE_32BITS && (this.diskNumberStart = t.readInt(4))
                        }
                    },
                    readExtraFields: function(t) {
                        var e, i, r, n = t.index + this.extraFieldsLength;
                        for (this.extraFields || (this.extraFields = {}); t.index + 4 < n;) e = t.readInt(2), i = t.readInt(2), r = t.readData(i), this.extraFields[e] = {
                            id: e,
                            length: i,
                            value: r
                        };
                        t.setIndex(n)
                    },
                    handleUTF8: function() {
                        var t = u.uint8array ? "uint8array" : "array";
                        if (this.useUTF8()) this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment);
                        else {
                            var e = this.findExtraFieldUnicodePath();
                            if (null !== e) this.fileNameStr = e;
                            else {
                                var i = n.transformTo(t, this.fileName);
                                this.fileNameStr = this.loadOptions.decodeFileName(i)
                            }
                            var r = this.findExtraFieldUnicodeComment();
                            if (null !== r) this.fileCommentStr = r;
                            else {
                                var s = n.transformTo(t, this.fileComment);
                                this.fileCommentStr = this.loadOptions.decodeFileName(s)
                            }
                        }
                    },
                    findExtraFieldUnicodePath: function() {
                        var t = this.extraFields[28789];
                        if (t) {
                            var e = r(t.value);
                            return 1 !== e.readInt(1) || a(this.fileName) !== e.readInt(4) ? null : o.utf8decode(e.readData(t.length - 5))
                        }
                        return null
                    },
                    findExtraFieldUnicodeComment: function() {
                        var t = this.extraFields[25461];
                        if (t) {
                            var e = r(t.value);
                            return 1 !== e.readInt(1) || a(this.fileComment) !== e.readInt(4) ? null : o.utf8decode(e.readData(t.length - 5))
                        }
                        return null
                    }
                }, e.exports = l
            }, {
                "./compressedObject": 2,
                "./compressions": 3,
                "./crc32": 4,
                "./reader/readerFor": 22,
                "./support": 30,
                "./utf8": 31,
                "./utils": 32
            }],
            35: [function(t, e, i) {
                function r(t, e, i) {
                    this.name = t, this.dir = i.dir, this.date = i.date, this.comment = i.comment, this.unixPermissions = i.unixPermissions, this.dosPermissions = i.dosPermissions, this._data = e, this._dataBinary = i.binary, this.options = {
                        compression: i.compression,
                        compressionOptions: i.compressionOptions
                    }
                }
                var n = t("./stream/StreamHelper"),
                    s = t("./stream/DataWorker"),
                    a = t("./utf8"),
                    o = t("./compressedObject"),
                    h = t("./stream/GenericWorker");
                r.prototype = {
                    internalStream: function(t) {
                        var e = null,
                            i = "string";
                        try {
                            if (!t) throw new Error("No output type specified.");
                            var r = "string" === (i = t.toLowerCase()) || "text" === i;
                            "binarystring" !== i && "text" !== i || (i = "string"), e = this._decompressWorker();
                            var s = !this._dataBinary;
                            s && !r && (e = e.pipe(new a.Utf8EncodeWorker)), !s && r && (e = e.pipe(new a.Utf8DecodeWorker))
                        } catch (t) {
                            (e = new h("error")).error(t)
                        }
                        return new n(e, i, "")
                    },
                    async: function(t, e) {
                        return this.internalStream(t).accumulate(e)
                    },
                    nodeStream: function(t, e) {
                        return this.internalStream(t || "nodebuffer").toNodejsStream(e)
                    },
                    _compressWorker: function(t, e) {
                        if (this._data instanceof o && this._data.compression.magic === t.magic) return this._data.getCompressedWorker();
                        var i = this._decompressWorker();
                        return this._dataBinary || (i = i.pipe(new a.Utf8EncodeWorker)), o.createWorkerFrom(i, t, e)
                    },
                    _decompressWorker: function() {
                        return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h ? this._data : new s(this._data)
                    }
                };
                for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l = function() {
                        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")
                    }, c = 0; c < u.length; c++) r.prototype[u[c]] = l;
                e.exports = r
            }, {
                "./compressedObject": 2,
                "./stream/DataWorker": 27,
                "./stream/GenericWorker": 28,
                "./stream/StreamHelper": 29,
                "./utf8": 31
            }],
            36: [function(t, e, r) {
                (function(t) {
                    var i, r, n = t.MutationObserver || t.WebKitMutationObserver;
                    if (n) {
                        var s = 0,
                            a = new n(l),
                            o = t.document.createTextNode("");
                        a.observe(o, {
                            characterData: !0
                        }), i = function() {
                            o.data = s = ++s % 2
                        }
                    } else if (t.setImmediate || void 0 === t.MessageChannel) i = "document" in t && "onreadystatechange" in t.document.createElement("script") ? function() {
                        var e = t.document.createElement("script");
                        e.onreadystatechange = function() {
                            l(), e.onreadystatechange = null, e.parentNode.removeChild(e), e = null
                        }, t.document.documentElement.appendChild(e)
                    } : function() {
                        setTimeout(l, 0)
                    };
                    else {
                        var h = new t.MessageChannel;
                        h.port1.onmessage = l, i = function() {
                            h.port2.postMessage(0)
                        }
                    }
                    var u = [];

                    function l() {
                        var t, e;
                        r = !0;
                        for (var i = u.length; i;) {
                            for (e = u, u = [], t = -1; ++t < i;) e[t]();
                            i = u.length
                        }
                        r = !1
                    }
                    e.exports = function(t) {
                        1 !== u.push(t) || r || i()
                    }
                }).call(this, void 0 !== i.g ? i.g : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {}],
            37: [function(t, e, i) {
                var r = t("immediate");

                function n() {}
                var s = {},
                    a = ["REJECTED"],
                    o = ["FULFILLED"],
                    h = ["PENDING"];

                function u(t) {
                    if ("function" != typeof t) throw new TypeError("resolver must be a function");
                    this.state = h, this.queue = [], this.outcome = void 0, t !== n && d(this, t)
                }

                function l(t, e, i) {
                    this.promise = t, "function" == typeof e && (this.onFulfilled = e, this.callFulfilled = this.otherCallFulfilled), "function" == typeof i && (this.onRejected = i, this.callRejected = this.otherCallRejected)
                }

                function c(t, e, i) {
                    r((function() {
                        var r;
                        try {
                            r = e(i)
                        } catch (r) {
                            return s.reject(t, r)
                        }
                        r === t ? s.reject(t, new TypeError("Cannot resolve promise with itself")) : s.resolve(t, r)
                    }))
                }

                function f(t) {
                    var e = t && t.then;
                    if (t && ("object" == typeof t || "function" == typeof t) && "function" == typeof e) return function() {
                        e.apply(t, arguments)
                    }
                }

                function d(t, e) {
                    var i = !1;

                    function r(e) {
                        i || (i = !0, s.reject(t, e))
                    }

                    function n(e) {
                        i || (i = !0, s.resolve(t, e))
                    }
                    var a = p((function() {
                        e(n, r)
                    }));
                    "error" === a.status && r(a.value)
                }

                function p(t, e) {
                    var i = {};
                    try {
                        i.value = t(e), i.status = "success"
                    } catch (t) {
                        i.status = "error", i.value = t
                    }
                    return i
                }(e.exports = u).prototype.finally = function(t) {
                    if ("function" != typeof t) return this;
                    var e = this.constructor;
                    return this.then((function(i) {
                        return e.resolve(t()).then((function() {
                            return i
                        }))
                    }), (function(i) {
                        return e.resolve(t()).then((function() {
                            throw i
                        }))
                    }))
                }, u.prototype.catch = function(t) {
                    return this.then(null, t)
                }, u.prototype.then = function(t, e) {
                    if ("function" != typeof t && this.state === o || "function" != typeof e && this.state === a) return this;
                    var i = new this.constructor(n);
                    return this.state !== h ? c(i, this.state === o ? t : e, this.outcome) : this.queue.push(new l(i, t, e)), i
                }, l.prototype.callFulfilled = function(t) {
                    s.resolve(this.promise, t)
                }, l.prototype.otherCallFulfilled = function(t) {
                    c(this.promise, this.onFulfilled, t)
                }, l.prototype.callRejected = function(t) {
                    s.reject(this.promise, t)
                }, l.prototype.otherCallRejected = function(t) {
                    c(this.promise, this.onRejected, t)
                }, s.resolve = function(t, e) {
                    var i = p(f, e);
                    if ("error" === i.status) return s.reject(t, i.value);
                    var r = i.value;
                    if (r) d(t, r);
                    else {
                        t.state = o, t.outcome = e;
                        for (var n = -1, a = t.queue.length; ++n < a;) t.queue[n].callFulfilled(e)
                    }
                    return t
                }, s.reject = function(t, e) {
                    t.state = a, t.outcome = e;
                    for (var i = -1, r = t.queue.length; ++i < r;) t.queue[i].callRejected(e);
                    return t
                }, u.resolve = function(t) {
                    return t instanceof this ? t : s.resolve(new this(n), t)
                }, u.reject = function(t) {
                    var e = new this(n);
                    return s.reject(e, t)
                }, u.all = function(t) {
                    var e = this;
                    if ("[object Array]" !== Object.prototype.toString.call(t)) return this.reject(new TypeError("must be an array"));
                    var i = t.length,
                        r = !1;
                    if (!i) return this.resolve([]);
                    for (var a = new Array(i), o = 0, h = -1, u = new this(n); ++h < i;) l(t[h], h);
                    return u;

                    function l(t, n) {
                        e.resolve(t).then((function(t) {
                            a[n] = t, ++o !== i || r || (r = !0, s.resolve(u, a))
                        }), (function(t) {
                            r || (r = !0, s.reject(u, t))
                        }))
                    }
                }, u.race = function(t) {
                    if ("[object Array]" !== Object.prototype.toString.call(t)) return this.reject(new TypeError("must be an array"));
                    var e = t.length,
                        i = !1;
                    if (!e) return this.resolve([]);
                    for (var r, a = -1, o = new this(n); ++a < e;) r = t[a], this.resolve(r).then((function(t) {
                        i || (i = !0, s.resolve(o, t))
                    }), (function(t) {
                        i || (i = !0, s.reject(o, t))
                    }));
                    return o
                }
            }, {
                immediate: 36
            }],
            38: [function(t, e, i) {
                var r = {};
                (0, t("./lib/utils/common").assign)(r, t("./lib/deflate"), t("./lib/inflate"), t("./lib/zlib/constants")), e.exports = r
            }, {
                "./lib/deflate": 39,
                "./lib/inflate": 40,
                "./lib/utils/common": 41,
                "./lib/zlib/constants": 44
            }],
            39: [function(t, e, i) {
                var r = t("./zlib/deflate"),
                    n = t("./utils/common"),
                    s = t("./utils/strings"),
                    a = t("./zlib/messages"),
                    o = t("./zlib/zstream"),
                    h = Object.prototype.toString,
                    u = 0,
                    l = -1,
                    c = 0,
                    f = 8;

                function d(t) {
                    if (!(this instanceof d)) return new d(t);
                    this.options = n.assign({
                        level: l,
                        method: f,
                        chunkSize: 16384,
                        windowBits: 15,
                        memLevel: 8,
                        strategy: c,
                        to: ""
                    }, t || {});
                    var e = this.options;
                    e.raw && 0 < e.windowBits ? e.windowBits = -e.windowBits : e.gzip && 0 < e.windowBits && e.windowBits < 16 && (e.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new o, this.strm.avail_out = 0;
                    var i = r.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
                    if (i !== u) throw new Error(a[i]);
                    if (e.header && r.deflateSetHeader(this.strm, e.header), e.dictionary) {
                        var p;
                        if (p = "string" == typeof e.dictionary ? s.string2buf(e.dictionary) : "[object ArrayBuffer]" === h.call(e.dictionary) ? new Uint8Array(e.dictionary) : e.dictionary, (i = r.deflateSetDictionary(this.strm, p)) !== u) throw new Error(a[i]);
                        this._dict_set = !0
                    }
                }

                function p(t, e) {
                    var i = new d(e);
                    if (i.push(t, !0), i.err) throw i.msg || a[i.err];
                    return i.result
                }
                d.prototype.push = function(t, e) {
                    var i, a, o = this.strm,
                        l = this.options.chunkSize;
                    if (this.ended) return !1;
                    a = e === ~~e ? e : !0 === e ? 4 : 0, "string" == typeof t ? o.input = s.string2buf(t) : "[object ArrayBuffer]" === h.call(t) ? o.input = new Uint8Array(t) : o.input = t, o.next_in = 0, o.avail_in = o.input.length;
                    do {
                        if (0 === o.avail_out && (o.output = new n.Buf8(l), o.next_out = 0, o.avail_out = l), 1 !== (i = r.deflate(o, a)) && i !== u) return this.onEnd(i), !(this.ended = !0);
                        0 !== o.avail_out && (0 !== o.avail_in || 4 !== a && 2 !== a) || ("string" === this.options.to ? this.onData(s.buf2binstring(n.shrinkBuf(o.output, o.next_out))) : this.onData(n.shrinkBuf(o.output, o.next_out)))
                    } while ((0 < o.avail_in || 0 === o.avail_out) && 1 !== i);
                    return 4 === a ? (i = r.deflateEnd(this.strm), this.onEnd(i), this.ended = !0, i === u) : 2 !== a || (this.onEnd(u), !(o.avail_out = 0))
                }, d.prototype.onData = function(t) {
                    this.chunks.push(t)
                }, d.prototype.onEnd = function(t) {
                    t === u && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = n.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg
                }, i.Deflate = d, i.deflate = p, i.deflateRaw = function(t, e) {
                    return (e = e || {}).raw = !0, p(t, e)
                }, i.gzip = function(t, e) {
                    return (e = e || {}).gzip = !0, p(t, e)
                }
            }, {
                "./utils/common": 41,
                "./utils/strings": 42,
                "./zlib/deflate": 46,
                "./zlib/messages": 51,
                "./zlib/zstream": 53
            }],
            40: [function(t, e, i) {
                var r = t("./zlib/inflate"),
                    n = t("./utils/common"),
                    s = t("./utils/strings"),
                    a = t("./zlib/constants"),
                    o = t("./zlib/messages"),
                    h = t("./zlib/zstream"),
                    u = t("./zlib/gzheader"),
                    l = Object.prototype.toString;

                function c(t) {
                    if (!(this instanceof c)) return new c(t);
                    this.options = n.assign({
                        chunkSize: 16384,
                        windowBits: 0,
                        to: ""
                    }, t || {});
                    var e = this.options;
                    e.raw && 0 <= e.windowBits && e.windowBits < 16 && (e.windowBits = -e.windowBits, 0 === e.windowBits && (e.windowBits = -15)), !(0 <= e.windowBits && e.windowBits < 16) || t && t.windowBits || (e.windowBits += 32), 15 < e.windowBits && e.windowBits < 48 && 0 == (15 & e.windowBits) && (e.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new h, this.strm.avail_out = 0;
                    var i = r.inflateInit2(this.strm, e.windowBits);
                    if (i !== a.Z_OK) throw new Error(o[i]);
                    this.header = new u, r.inflateGetHeader(this.strm, this.header)
                }

                function f(t, e) {
                    var i = new c(e);
                    if (i.push(t, !0), i.err) throw i.msg || o[i.err];
                    return i.result
                }
                c.prototype.push = function(t, e) {
                    var i, o, h, u, c, f, d = this.strm,
                        p = this.options.chunkSize,
                        m = this.options.dictionary,
                        g = !1;
                    if (this.ended) return !1;
                    o = e === ~~e ? e : !0 === e ? a.Z_FINISH : a.Z_NO_FLUSH, "string" == typeof t ? d.input = s.binstring2buf(t) : "[object ArrayBuffer]" === l.call(t) ? d.input = new Uint8Array(t) : d.input = t, d.next_in = 0, d.avail_in = d.input.length;
                    do {
                        if (0 === d.avail_out && (d.output = new n.Buf8(p), d.next_out = 0, d.avail_out = p), (i = r.inflate(d, a.Z_NO_FLUSH)) === a.Z_NEED_DICT && m && (f = "string" == typeof m ? s.string2buf(m) : "[object ArrayBuffer]" === l.call(m) ? new Uint8Array(m) : m, i = r.inflateSetDictionary(this.strm, f)), i === a.Z_BUF_ERROR && !0 === g && (i = a.Z_OK, g = !1), i !== a.Z_STREAM_END && i !== a.Z_OK) return this.onEnd(i), !(this.ended = !0);
                        d.next_out && (0 !== d.avail_out && i !== a.Z_STREAM_END && (0 !== d.avail_in || o !== a.Z_FINISH && o !== a.Z_SYNC_FLUSH) || ("string" === this.options.to ? (h = s.utf8border(d.output, d.next_out), u = d.next_out - h, c = s.buf2string(d.output, h), d.next_out = u, d.avail_out = p - u, u && n.arraySet(d.output, d.output, h, u, 0), this.onData(c)) : this.onData(n.shrinkBuf(d.output, d.next_out)))), 0 === d.avail_in && 0 === d.avail_out && (g = !0)
                    } while ((0 < d.avail_in || 0 === d.avail_out) && i !== a.Z_STREAM_END);
                    return i === a.Z_STREAM_END && (o = a.Z_FINISH), o === a.Z_FINISH ? (i = r.inflateEnd(this.strm), this.onEnd(i), this.ended = !0, i === a.Z_OK) : o !== a.Z_SYNC_FLUSH || (this.onEnd(a.Z_OK), !(d.avail_out = 0))
                }, c.prototype.onData = function(t) {
                    this.chunks.push(t)
                }, c.prototype.onEnd = function(t) {
                    t === a.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = n.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg
                }, i.Inflate = c, i.inflate = f, i.inflateRaw = function(t, e) {
                    return (e = e || {}).raw = !0, f(t, e)
                }, i.ungzip = f
            }, {
                "./utils/common": 41,
                "./utils/strings": 42,
                "./zlib/constants": 44,
                "./zlib/gzheader": 47,
                "./zlib/inflate": 49,
                "./zlib/messages": 51,
                "./zlib/zstream": 53
            }],
            41: [function(t, e, i) {
                var r = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
                i.assign = function(t) {
                    for (var e = Array.prototype.slice.call(arguments, 1); e.length;) {
                        var i = e.shift();
                        if (i) {
                            if ("object" != typeof i) throw new TypeError(i + "must be non-object");
                            for (var r in i) i.hasOwnProperty(r) && (t[r] = i[r])
                        }
                    }
                    return t
                }, i.shrinkBuf = function(t, e) {
                    return t.length === e ? t : t.subarray ? t.subarray(0, e) : (t.length = e, t)
                };
                var n = {
                        arraySet: function(t, e, i, r, n) {
                            if (e.subarray && t.subarray) t.set(e.subarray(i, i + r), n);
                            else
                                for (var s = 0; s < r; s++) t[n + s] = e[i + s]
                        },
                        flattenChunks: function(t) {
                            var e, i, r, n, s, a;
                            for (e = r = 0, i = t.length; e < i; e++) r += t[e].length;
                            for (a = new Uint8Array(r), e = n = 0, i = t.length; e < i; e++) s = t[e], a.set(s, n), n += s.length;
                            return a
                        }
                    },
                    s = {
                        arraySet: function(t, e, i, r, n) {
                            for (var s = 0; s < r; s++) t[n + s] = e[i + s]
                        },
                        flattenChunks: function(t) {
                            return [].concat.apply([], t)
                        }
                    };
                i.setTyped = function(t) {
                    t ? (i.Buf8 = Uint8Array, i.Buf16 = Uint16Array, i.Buf32 = Int32Array, i.assign(i, n)) : (i.Buf8 = Array, i.Buf16 = Array, i.Buf32 = Array, i.assign(i, s))
                }, i.setTyped(r)
            }, {}],
            42: [function(t, e, i) {
                var r = t("./common"),
                    n = !0,
                    s = !0;
                try {
                    String.fromCharCode.apply(null, [0])
                } catch (t) {
                    n = !1
                }
                try {
                    String.fromCharCode.apply(null, new Uint8Array(1))
                } catch (t) {
                    s = !1
                }
                for (var a = new r.Buf8(256), o = 0; o < 256; o++) a[o] = 252 <= o ? 6 : 248 <= o ? 5 : 240 <= o ? 4 : 224 <= o ? 3 : 192 <= o ? 2 : 1;

                function h(t, e) {
                    if (e < 65537 && (t.subarray && s || !t.subarray && n)) return String.fromCharCode.apply(null, r.shrinkBuf(t, e));
                    for (var i = "", a = 0; a < e; a++) i += String.fromCharCode(t[a]);
                    return i
                }
                a[254] = a[254] = 1, i.string2buf = function(t) {
                    var e, i, n, s, a, o = t.length,
                        h = 0;
                    for (s = 0; s < o; s++) 55296 == (64512 & (i = t.charCodeAt(s))) && s + 1 < o && 56320 == (64512 & (n = t.charCodeAt(s + 1))) && (i = 65536 + (i - 55296 << 10) + (n - 56320), s++), h += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4;
                    for (e = new r.Buf8(h), s = a = 0; a < h; s++) 55296 == (64512 & (i = t.charCodeAt(s))) && s + 1 < o && 56320 == (64512 & (n = t.charCodeAt(s + 1))) && (i = 65536 + (i - 55296 << 10) + (n - 56320), s++), i < 128 ? e[a++] = i : (i < 2048 ? e[a++] = 192 | i >>> 6 : (i < 65536 ? e[a++] = 224 | i >>> 12 : (e[a++] = 240 | i >>> 18, e[a++] = 128 | i >>> 12 & 63), e[a++] = 128 | i >>> 6 & 63), e[a++] = 128 | 63 & i);
                    return e
                }, i.buf2binstring = function(t) {
                    return h(t, t.length)
                }, i.binstring2buf = function(t) {
                    for (var e = new r.Buf8(t.length), i = 0, n = e.length; i < n; i++) e[i] = t.charCodeAt(i);
                    return e
                }, i.buf2string = function(t, e) {
                    var i, r, n, s, o = e || t.length,
                        u = new Array(2 * o);
                    for (i = r = 0; i < o;)
                        if ((n = t[i++]) < 128) u[r++] = n;
                        else if (4 < (s = a[n])) u[r++] = 65533, i += s - 1;
                    else {
                        for (n &= 2 === s ? 31 : 3 === s ? 15 : 7; 1 < s && i < o;) n = n << 6 | 63 & t[i++], s--;
                        1 < s ? u[r++] = 65533 : n < 65536 ? u[r++] = n : (n -= 65536, u[r++] = 55296 | n >> 10 & 1023, u[r++] = 56320 | 1023 & n)
                    }
                    return h(u, r)
                }, i.utf8border = function(t, e) {
                    var i;
                    for ((e = e || t.length) > t.length && (e = t.length), i = e - 1; 0 <= i && 128 == (192 & t[i]);) i--;
                    return i < 0 || 0 === i ? e : i + a[t[i]] > e ? i : e
                }
            }, {
                "./common": 41
            }],
            43: [function(t, e, i) {
                e.exports = function(t, e, i, r) {
                    for (var n = 65535 & t | 0, s = t >>> 16 & 65535 | 0, a = 0; 0 !== i;) {
                        for (i -= a = 2e3 < i ? 2e3 : i; s = s + (n = n + e[r++] | 0) | 0, --a;);
                        n %= 65521, s %= 65521
                    }
                    return n | s << 16 | 0
                }
            }, {}],
            44: [function(t, e, i) {
                e.exports = {
                    Z_NO_FLUSH: 0,
                    Z_PARTIAL_FLUSH: 1,
                    Z_SYNC_FLUSH: 2,
                    Z_FULL_FLUSH: 3,
                    Z_FINISH: 4,
                    Z_BLOCK: 5,
                    Z_TREES: 6,
                    Z_OK: 0,
                    Z_STREAM_END: 1,
                    Z_NEED_DICT: 2,
                    Z_ERRNO: -1,
                    Z_STREAM_ERROR: -2,
                    Z_DATA_ERROR: -3,
                    Z_BUF_ERROR: -5,
                    Z_NO_COMPRESSION: 0,
                    Z_BEST_SPEED: 1,
                    Z_BEST_COMPRESSION: 9,
                    Z_DEFAULT_COMPRESSION: -1,
                    Z_FILTERED: 1,
                    Z_HUFFMAN_ONLY: 2,
                    Z_RLE: 3,
                    Z_FIXED: 4,
                    Z_DEFAULT_STRATEGY: 0,
                    Z_BINARY: 0,
                    Z_TEXT: 1,
                    Z_UNKNOWN: 2,
                    Z_DEFLATED: 8
                }
            }, {}],
            45: [function(t, e, i) {
                var r = function() {
                    for (var t, e = [], i = 0; i < 256; i++) {
                        t = i;
                        for (var r = 0; r < 8; r++) t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
                        e[i] = t
                    }
                    return e
                }();
                e.exports = function(t, e, i, n) {
                    var s = r,
                        a = n + i;
                    t ^= -1;
                    for (var o = n; o < a; o++) t = t >>> 8 ^ s[255 & (t ^ e[o])];
                    return -1 ^ t
                }
            }, {}],
            46: [function(t, e, i) {
                var r, n = t("../utils/common"),
                    s = t("./trees"),
                    a = t("./adler32"),
                    o = t("./crc32"),
                    h = t("./messages"),
                    u = 0,
                    l = 0,
                    c = -2,
                    f = 2,
                    d = 8,
                    p = 286,
                    m = 30,
                    g = 19,
                    y = 2 * p + 1,
                    _ = 15,
                    v = 3,
                    b = 258,
                    w = b + v + 1,
                    M = 42,
                    x = 113;

                function k(t, e) {
                    return t.msg = h[e], e
                }

                function E(t) {
                    return (t << 1) - (4 < t ? 9 : 0)
                }

                function C(t) {
                    for (var e = t.length; 0 <= --e;) t[e] = 0
                }

                function S(t) {
                    var e = t.state,
                        i = e.pending;
                    i > t.avail_out && (i = t.avail_out), 0 !== i && (n.arraySet(t.output, e.pending_buf, e.pending_out, i, t.next_out), t.next_out += i, e.pending_out += i, t.total_out += i, t.avail_out -= i, e.pending -= i, 0 === e.pending && (e.pending_out = 0))
                }

                function A(t, e) {
                    s._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, e), t.block_start = t.strstart, S(t.strm)
                }

                function I(t, e) {
                    t.pending_buf[t.pending++] = e
                }

                function O(t, e) {
                    t.pending_buf[t.pending++] = e >>> 8 & 255, t.pending_buf[t.pending++] = 255 & e
                }

                function B(t, e) {
                    var i, r, n = t.max_chain_length,
                        s = t.strstart,
                        a = t.prev_length,
                        o = t.nice_match,
                        h = t.strstart > t.w_size - w ? t.strstart - (t.w_size - w) : 0,
                        u = t.window,
                        l = t.w_mask,
                        c = t.prev,
                        f = t.strstart + b,
                        d = u[s + a - 1],
                        p = u[s + a];
                    t.prev_length >= t.good_match && (n >>= 2), o > t.lookahead && (o = t.lookahead);
                    do {
                        if (u[(i = e) + a] === p && u[i + a - 1] === d && u[i] === u[s] && u[++i] === u[s + 1]) {
                            s += 2, i++;
                            do {} while (u[++s] === u[++i] && u[++s] === u[++i] && u[++s] === u[++i] && u[++s] === u[++i] && u[++s] === u[++i] && u[++s] === u[++i] && u[++s] === u[++i] && u[++s] === u[++i] && s < f);
                            if (r = b - (f - s), s = f - b, a < r) {
                                if (t.match_start = e, o <= (a = r)) break;
                                d = u[s + a - 1], p = u[s + a]
                            }
                        }
                    } while ((e = c[e & l]) > h && 0 != --n);
                    return a <= t.lookahead ? a : t.lookahead
                }

                function N(t) {
                    var e, i, r, s, h, u, l, c, f, d, p = t.w_size;
                    do {
                        if (s = t.window_size - t.lookahead - t.strstart, t.strstart >= p + (p - w)) {
                            for (n.arraySet(t.window, t.window, p, p, 0), t.match_start -= p, t.strstart -= p, t.block_start -= p, e = i = t.hash_size; r = t.head[--e], t.head[e] = p <= r ? r - p : 0, --i;);
                            for (e = i = p; r = t.prev[--e], t.prev[e] = p <= r ? r - p : 0, --i;);
                            s += p
                        }
                        if (0 === t.strm.avail_in) break;
                        if (u = t.strm, l = t.window, c = t.strstart + t.lookahead, d = void 0, (f = s) < (d = u.avail_in) && (d = f), i = 0 === d ? 0 : (u.avail_in -= d, n.arraySet(l, u.input, u.next_in, d, c), 1 === u.state.wrap ? u.adler = a(u.adler, l, d, c) : 2 === u.state.wrap && (u.adler = o(u.adler, l, d, c)), u.next_in += d, u.total_in += d, d), t.lookahead += i, t.lookahead + t.insert >= v)
                            for (h = t.strstart - t.insert, t.ins_h = t.window[h], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[h + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[h + v - 1]) & t.hash_mask, t.prev[h & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = h, h++, t.insert--, !(t.lookahead + t.insert < v)););
                    } while (t.lookahead < w && 0 !== t.strm.avail_in)
                }

                function L(t, e) {
                    for (var i, r;;) {
                        if (t.lookahead < w) {
                            if (N(t), t.lookahead < w && e === u) return 1;
                            if (0 === t.lookahead) break
                        }
                        if (i = 0, t.lookahead >= v && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + v - 1]) & t.hash_mask, i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 !== i && t.strstart - i <= t.w_size - w && (t.match_length = B(t, i)), t.match_length >= v)
                            if (r = s._tr_tally(t, t.strstart - t.match_start, t.match_length - v), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= v) {
                                for (t.match_length--; t.strstart++, t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + v - 1]) & t.hash_mask, i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart, 0 != --t.match_length;);
                                t.strstart++
                            } else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
                        else r = s._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
                        if (r && (A(t, !1), 0 === t.strm.avail_out)) return 1
                    }
                    return t.insert = t.strstart < v - 1 ? t.strstart : v - 1, 4 === e ? (A(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (A(t, !1), 0 === t.strm.avail_out) ? 1 : 2
                }

                function P(t, e) {
                    for (var i, r, n;;) {
                        if (t.lookahead < w) {
                            if (N(t), t.lookahead < w && e === u) return 1;
                            if (0 === t.lookahead) break
                        }
                        if (i = 0, t.lookahead >= v && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + v - 1]) & t.hash_mask, i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = v - 1, 0 !== i && t.prev_length < t.max_lazy_match && t.strstart - i <= t.w_size - w && (t.match_length = B(t, i), t.match_length <= 5 && (1 === t.strategy || t.match_length === v && 4096 < t.strstart - t.match_start) && (t.match_length = v - 1)), t.prev_length >= v && t.match_length <= t.prev_length) {
                            for (n = t.strstart + t.lookahead - v, r = s._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - v), t.lookahead -= t.prev_length - 1, t.prev_length -= 2; ++t.strstart <= n && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + v - 1]) & t.hash_mask, i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 != --t.prev_length;);
                            if (t.match_available = 0, t.match_length = v - 1, t.strstart++, r && (A(t, !1), 0 === t.strm.avail_out)) return 1
                        } else if (t.match_available) {
                            if ((r = s._tr_tally(t, 0, t.window[t.strstart - 1])) && A(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out) return 1
                        } else t.match_available = 1, t.strstart++, t.lookahead--
                    }
                    return t.match_available && (r = s._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < v - 1 ? t.strstart : v - 1, 4 === e ? (A(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (A(t, !1), 0 === t.strm.avail_out) ? 1 : 2
                }

                function z(t, e, i, r, n) {
                    this.good_length = t, this.max_lazy = e, this.nice_length = i, this.max_chain = r, this.func = n
                }

                function R() {
                    this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = d, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new n.Buf16(2 * y), this.dyn_dtree = new n.Buf16(2 * (2 * m + 1)), this.bl_tree = new n.Buf16(2 * (2 * g + 1)), C(this.dyn_ltree), C(this.dyn_dtree), C(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new n.Buf16(_ + 1), this.heap = new n.Buf16(2 * p + 1), C(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new n.Buf16(2 * p + 1), C(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0
                }

                function T(t) {
                    var e;
                    return t && t.state ? (t.total_in = t.total_out = 0, t.data_type = f, (e = t.state).pending = 0, e.pending_out = 0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = e.wrap ? M : x, t.adler = 2 === e.wrap ? 0 : 1, e.last_flush = u, s._tr_init(e), l) : k(t, c)
                }

                function j(t) {
                    var e = T(t);
                    return e === l && function(t) {
                        t.window_size = 2 * t.w_size, C(t.head), t.max_lazy_match = r[t.level].max_lazy, t.good_match = r[t.level].good_length, t.nice_match = r[t.level].nice_length, t.max_chain_length = r[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert = 0, t.match_length = t.prev_length = v - 1, t.match_available = 0, t.ins_h = 0
                    }(t.state), e
                }

                function F(t, e, i, r, s, a) {
                    if (!t) return c;
                    var o = 1;
                    if (-1 === e && (e = 6), r < 0 ? (o = 0, r = -r) : 15 < r && (o = 2, r -= 16), s < 1 || 9 < s || i !== d || r < 8 || 15 < r || e < 0 || 9 < e || a < 0 || 4 < a) return k(t, c);
                    8 === r && (r = 9);
                    var h = new R;
                    return (t.state = h).strm = t, h.wrap = o, h.gzhead = null, h.w_bits = r, h.w_size = 1 << h.w_bits, h.w_mask = h.w_size - 1, h.hash_bits = s + 7, h.hash_size = 1 << h.hash_bits, h.hash_mask = h.hash_size - 1, h.hash_shift = ~~((h.hash_bits + v - 1) / v), h.window = new n.Buf8(2 * h.w_size), h.head = new n.Buf16(h.hash_size), h.prev = new n.Buf16(h.w_size), h.lit_bufsize = 1 << s + 6, h.pending_buf_size = 4 * h.lit_bufsize, h.pending_buf = new n.Buf8(h.pending_buf_size), h.d_buf = 1 * h.lit_bufsize, h.l_buf = 3 * h.lit_bufsize, h.level = e, h.strategy = a, h.method = i, j(t)
                }
                r = [new z(0, 0, 0, 0, (function(t, e) {
                    var i = 65535;
                    for (i > t.pending_buf_size - 5 && (i = t.pending_buf_size - 5);;) {
                        if (t.lookahead <= 1) {
                            if (N(t), 0 === t.lookahead && e === u) return 1;
                            if (0 === t.lookahead) break
                        }
                        t.strstart += t.lookahead, t.lookahead = 0;
                        var r = t.block_start + i;
                        if ((0 === t.strstart || t.strstart >= r) && (t.lookahead = t.strstart - r, t.strstart = r, A(t, !1), 0 === t.strm.avail_out)) return 1;
                        if (t.strstart - t.block_start >= t.w_size - w && (A(t, !1), 0 === t.strm.avail_out)) return 1
                    }
                    return t.insert = 0, 4 === e ? (A(t, !0), 0 === t.strm.avail_out ? 3 : 4) : (t.strstart > t.block_start && (A(t, !1), t.strm.avail_out), 1)
                })), new z(4, 4, 8, 4, L), new z(4, 5, 16, 8, L), new z(4, 6, 32, 32, L), new z(4, 4, 16, 16, P), new z(8, 16, 32, 32, P), new z(8, 16, 128, 128, P), new z(8, 32, 128, 256, P), new z(32, 128, 258, 1024, P), new z(32, 258, 258, 4096, P)], i.deflateInit = function(t, e) {
                    return F(t, e, d, 15, 8, 0)
                }, i.deflateInit2 = F, i.deflateReset = j, i.deflateResetKeep = T, i.deflateSetHeader = function(t, e) {
                    return t && t.state ? 2 !== t.state.wrap ? c : (t.state.gzhead = e, l) : c
                }, i.deflate = function(t, e) {
                    var i, n, a, h;
                    if (!t || !t.state || 5 < e || e < 0) return t ? k(t, c) : c;
                    if (n = t.state, !t.output || !t.input && 0 !== t.avail_in || 666 === n.status && 4 !== e) return k(t, 0 === t.avail_out ? -5 : c);
                    if (n.strm = t, i = n.last_flush, n.last_flush = e, n.status === M)
                        if (2 === n.wrap) t.adler = 0, I(n, 31), I(n, 139), I(n, 8), n.gzhead ? (I(n, (n.gzhead.text ? 1 : 0) + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)), I(n, 255 & n.gzhead.time), I(n, n.gzhead.time >> 8 & 255), I(n, n.gzhead.time >> 16 & 255), I(n, n.gzhead.time >> 24 & 255), I(n, 9 === n.level ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0), I(n, 255 & n.gzhead.os), n.gzhead.extra && n.gzhead.extra.length && (I(n, 255 & n.gzhead.extra.length), I(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (t.adler = o(t.adler, n.pending_buf, n.pending, 0)), n.gzindex = 0, n.status = 69) : (I(n, 0), I(n, 0), I(n, 0), I(n, 0), I(n, 0), I(n, 9 === n.level ? 2 : 2 <= n.strategy || n.level < 2 ? 4 : 0), I(n, 3), n.status = x);
                        else {
                            var f = d + (n.w_bits - 8 << 4) << 8;
                            f |= (2 <= n.strategy || n.level < 2 ? 0 : n.level < 6 ? 1 : 6 === n.level ? 2 : 3) << 6, 0 !== n.strstart && (f |= 32), f += 31 - f % 31, n.status = x, O(n, f), 0 !== n.strstart && (O(n, t.adler >>> 16), O(n, 65535 & t.adler)), t.adler = 1
                        } if (69 === n.status)
                        if (n.gzhead.extra) {
                            for (a = n.pending; n.gzindex < (65535 & n.gzhead.extra.length) && (n.pending !== n.pending_buf_size || (n.gzhead.hcrc && n.pending > a && (t.adler = o(t.adler, n.pending_buf, n.pending - a, a)), S(t), a = n.pending, n.pending !== n.pending_buf_size));) I(n, 255 & n.gzhead.extra[n.gzindex]), n.gzindex++;
                            n.gzhead.hcrc && n.pending > a && (t.adler = o(t.adler, n.pending_buf, n.pending - a, a)), n.gzindex === n.gzhead.extra.length && (n.gzindex = 0, n.status = 73)
                        } else n.status = 73;
                    if (73 === n.status)
                        if (n.gzhead.name) {
                            a = n.pending;
                            do {
                                if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > a && (t.adler = o(t.adler, n.pending_buf, n.pending - a, a)), S(t), a = n.pending, n.pending === n.pending_buf_size)) {
                                    h = 1;
                                    break
                                }
                                h = n.gzindex < n.gzhead.name.length ? 255 & n.gzhead.name.charCodeAt(n.gzindex++) : 0, I(n, h)
                            } while (0 !== h);
                            n.gzhead.hcrc && n.pending > a && (t.adler = o(t.adler, n.pending_buf, n.pending - a, a)), 0 === h && (n.gzindex = 0, n.status = 91)
                        } else n.status = 91;
                    if (91 === n.status)
                        if (n.gzhead.comment) {
                            a = n.pending;
                            do {
                                if (n.pending === n.pending_buf_size && (n.gzhead.hcrc && n.pending > a && (t.adler = o(t.adler, n.pending_buf, n.pending - a, a)), S(t), a = n.pending, n.pending === n.pending_buf_size)) {
                                    h = 1;
                                    break
                                }
                                h = n.gzindex < n.gzhead.comment.length ? 255 & n.gzhead.comment.charCodeAt(n.gzindex++) : 0, I(n, h)
                            } while (0 !== h);
                            n.gzhead.hcrc && n.pending > a && (t.adler = o(t.adler, n.pending_buf, n.pending - a, a)), 0 === h && (n.status = 103)
                        } else n.status = 103;
                    if (103 === n.status && (n.gzhead.hcrc ? (n.pending + 2 > n.pending_buf_size && S(t), n.pending + 2 <= n.pending_buf_size && (I(n, 255 & t.adler), I(n, t.adler >> 8 & 255), t.adler = 0, n.status = x)) : n.status = x), 0 !== n.pending) {
                        if (S(t), 0 === t.avail_out) return n.last_flush = -1, l
                    } else if (0 === t.avail_in && E(e) <= E(i) && 4 !== e) return k(t, -5);
                    if (666 === n.status && 0 !== t.avail_in) return k(t, -5);
                    if (0 !== t.avail_in || 0 !== n.lookahead || e !== u && 666 !== n.status) {
                        var p = 2 === n.strategy ? function(t, e) {
                            for (var i;;) {
                                if (0 === t.lookahead && (N(t), 0 === t.lookahead)) {
                                    if (e === u) return 1;
                                    break
                                }
                                if (t.match_length = 0, i = s._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, i && (A(t, !1), 0 === t.strm.avail_out)) return 1
                            }
                            return t.insert = 0, 4 === e ? (A(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (A(t, !1), 0 === t.strm.avail_out) ? 1 : 2
                        }(n, e) : 3 === n.strategy ? function(t, e) {
                            for (var i, r, n, a, o = t.window;;) {
                                if (t.lookahead <= b) {
                                    if (N(t), t.lookahead <= b && e === u) return 1;
                                    if (0 === t.lookahead) break
                                }
                                if (t.match_length = 0, t.lookahead >= v && 0 < t.strstart && (r = o[n = t.strstart - 1]) === o[++n] && r === o[++n] && r === o[++n]) {
                                    a = t.strstart + b;
                                    do {} while (r === o[++n] && r === o[++n] && r === o[++n] && r === o[++n] && r === o[++n] && r === o[++n] && r === o[++n] && r === o[++n] && n < a);
                                    t.match_length = b - (a - n), t.match_length > t.lookahead && (t.match_length = t.lookahead)
                                }
                                if (t.match_length >= v ? (i = s._tr_tally(t, 1, t.match_length - v), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (i = s._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), i && (A(t, !1), 0 === t.strm.avail_out)) return 1
                            }
                            return t.insert = 0, 4 === e ? (A(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (A(t, !1), 0 === t.strm.avail_out) ? 1 : 2
                        }(n, e) : r[n.level].func(n, e);
                        if (3 !== p && 4 !== p || (n.status = 666), 1 === p || 3 === p) return 0 === t.avail_out && (n.last_flush = -1), l;
                        if (2 === p && (1 === e ? s._tr_align(n) : 5 !== e && (s._tr_stored_block(n, 0, 0, !1), 3 === e && (C(n.head), 0 === n.lookahead && (n.strstart = 0, n.block_start = 0, n.insert = 0))), S(t), 0 === t.avail_out)) return n.last_flush = -1, l
                    }
                    return 4 !== e ? l : n.wrap <= 0 ? 1 : (2 === n.wrap ? (I(n, 255 & t.adler), I(n, t.adler >> 8 & 255), I(n, t.adler >> 16 & 255), I(n, t.adler >> 24 & 255), I(n, 255 & t.total_in), I(n, t.total_in >> 8 & 255), I(n, t.total_in >> 16 & 255), I(n, t.total_in >> 24 & 255)) : (O(n, t.adler >>> 16), O(n, 65535 & t.adler)), S(t), 0 < n.wrap && (n.wrap = -n.wrap), 0 !== n.pending ? l : 1)
                }, i.deflateEnd = function(t) {
                    var e;
                    return t && t.state ? (e = t.state.status) !== M && 69 !== e && 73 !== e && 91 !== e && 103 !== e && e !== x && 666 !== e ? k(t, c) : (t.state = null, e === x ? k(t, -3) : l) : c
                }, i.deflateSetDictionary = function(t, e) {
                    var i, r, s, o, h, u, f, d, p = e.length;
                    if (!t || !t.state) return c;
                    if (2 === (o = (i = t.state).wrap) || 1 === o && i.status !== M || i.lookahead) return c;
                    for (1 === o && (t.adler = a(t.adler, e, p, 0)), i.wrap = 0, p >= i.w_size && (0 === o && (C(i.head), i.strstart = 0, i.block_start = 0, i.insert = 0), d = new n.Buf8(i.w_size), n.arraySet(d, e, p - i.w_size, i.w_size, 0), e = d, p = i.w_size), h = t.avail_in, u = t.next_in, f = t.input, t.avail_in = p, t.next_in = 0, t.input = e, N(i); i.lookahead >= v;) {
                        for (r = i.strstart, s = i.lookahead - (v - 1); i.ins_h = (i.ins_h << i.hash_shift ^ i.window[r + v - 1]) & i.hash_mask, i.prev[r & i.w_mask] = i.head[i.ins_h], i.head[i.ins_h] = r, r++, --s;);
                        i.strstart = r, i.lookahead = v - 1, N(i)
                    }
                    return i.strstart += i.lookahead, i.block_start = i.strstart, i.insert = i.lookahead, i.lookahead = 0, i.match_length = i.prev_length = v - 1, i.match_available = 0, t.next_in = u, t.input = f, t.avail_in = h, i.wrap = o, l
                }, i.deflateInfo = "pako deflate (from Nodeca project)"
            }, {
                "../utils/common": 41,
                "./adler32": 43,
                "./crc32": 45,
                "./messages": 51,
                "./trees": 52
            }],
            47: [function(t, e, i) {
                e.exports = function() {
                    this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1
                }
            }, {}],
            48: [function(t, e, i) {
                e.exports = function(t, e) {
                    var i, r, n, s, a, o, h, u, l, c, f, d, p, m, g, y, _, v, b, w, M, x, k, E, C;
                    i = t.state, r = t.next_in, E = t.input, n = r + (t.avail_in - 5), s = t.next_out, C = t.output, a = s - (e - t.avail_out), o = s + (t.avail_out - 257), h = i.dmax, u = i.wsize, l = i.whave, c = i.wnext, f = i.window, d = i.hold, p = i.bits, m = i.lencode, g = i.distcode, y = (1 << i.lenbits) - 1, _ = (1 << i.distbits) - 1;
                    t: do {
                        p < 15 && (d += E[r++] << p, p += 8, d += E[r++] << p, p += 8), v = m[d & y];
                        e: for (;;) {
                            if (d >>>= b = v >>> 24, p -= b, 0 == (b = v >>> 16 & 255)) C[s++] = 65535 & v;
                            else {
                                if (!(16 & b)) {
                                    if (0 == (64 & b)) {
                                        v = m[(65535 & v) + (d & (1 << b) - 1)];
                                        continue e
                                    }
                                    if (32 & b) {
                                        i.mode = 12;
                                        break t
                                    }
                                    t.msg = "invalid literal/length code", i.mode = 30;
                                    break t
                                }
                                w = 65535 & v, (b &= 15) && (p < b && (d += E[r++] << p, p += 8), w += d & (1 << b) - 1, d >>>= b, p -= b), p < 15 && (d += E[r++] << p, p += 8, d += E[r++] << p, p += 8), v = g[d & _];
                                i: for (;;) {
                                    if (d >>>= b = v >>> 24, p -= b, !(16 & (b = v >>> 16 & 255))) {
                                        if (0 == (64 & b)) {
                                            v = g[(65535 & v) + (d & (1 << b) - 1)];
                                            continue i
                                        }
                                        t.msg = "invalid distance code", i.mode = 30;
                                        break t
                                    }
                                    if (M = 65535 & v, p < (b &= 15) && (d += E[r++] << p, (p += 8) < b && (d += E[r++] << p, p += 8)), h < (M += d & (1 << b) - 1)) {
                                        t.msg = "invalid distance too far back", i.mode = 30;
                                        break t
                                    }
                                    if (d >>>= b, p -= b, (b = s - a) < M) {
                                        if (l < (b = M - b) && i.sane) {
                                            t.msg = "invalid distance too far back", i.mode = 30;
                                            break t
                                        }
                                        if (k = f, (x = 0) === c) {
                                            if (x += u - b, b < w) {
                                                for (w -= b; C[s++] = f[x++], --b;);
                                                x = s - M, k = C
                                            }
                                        } else if (c < b) {
                                            if (x += u + c - b, (b -= c) < w) {
                                                for (w -= b; C[s++] = f[x++], --b;);
                                                if (x = 0, c < w) {
                                                    for (w -= b = c; C[s++] = f[x++], --b;);
                                                    x = s - M, k = C
                                                }
                                            }
                                        } else if (x += c - b, b < w) {
                                            for (w -= b; C[s++] = f[x++], --b;);
                                            x = s - M, k = C
                                        }
                                        for (; 2 < w;) C[s++] = k[x++], C[s++] = k[x++], C[s++] = k[x++], w -= 3;
                                        w && (C[s++] = k[x++], 1 < w && (C[s++] = k[x++]))
                                    } else {
                                        for (x = s - M; C[s++] = C[x++], C[s++] = C[x++], C[s++] = C[x++], 2 < (w -= 3););
                                        w && (C[s++] = C[x++], 1 < w && (C[s++] = C[x++]))
                                    }
                                    break
                                }
                            }
                            break
                        }
                    } while (r < n && s < o);
                    r -= w = p >> 3, d &= (1 << (p -= w << 3)) - 1, t.next_in = r, t.next_out = s, t.avail_in = r < n ? n - r + 5 : 5 - (r - n), t.avail_out = s < o ? o - s + 257 : 257 - (s - o), i.hold = d, i.bits = p
                }
            }, {}],
            49: [function(t, e, i) {
                var r = t("../utils/common"),
                    n = t("./adler32"),
                    s = t("./crc32"),
                    a = t("./inffast"),
                    o = t("./inftrees"),
                    h = 0,
                    u = -2,
                    l = 1,
                    c = 852,
                    f = 592;

                function d(t) {
                    return (t >>> 24 & 255) + (t >>> 8 & 65280) + ((65280 & t) << 8) + ((255 & t) << 24)
                }

                function p() {
                    this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new r.Buf16(320), this.work = new r.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0
                }

                function m(t) {
                    var e;
                    return t && t.state ? (e = t.state, t.total_in = t.total_out = e.total = 0, t.msg = "", e.wrap && (t.adler = 1 & e.wrap), e.mode = l, e.last = 0, e.havedict = 0, e.dmax = 32768, e.head = null, e.hold = 0, e.bits = 0, e.lencode = e.lendyn = new r.Buf32(c), e.distcode = e.distdyn = new r.Buf32(f), e.sane = 1, e.back = -1, h) : u
                }

                function g(t) {
                    var e;
                    return t && t.state ? ((e = t.state).wsize = 0, e.whave = 0, e.wnext = 0, m(t)) : u
                }

                function y(t, e) {
                    var i, r;
                    return t && t.state ? (r = t.state, e < 0 ? (i = 0, e = -e) : (i = 1 + (e >> 4), e < 48 && (e &= 15)), e && (e < 8 || 15 < e) ? u : (null !== r.window && r.wbits !== e && (r.window = null), r.wrap = i, r.wbits = e, g(t))) : u
                }

                function _(t, e) {
                    var i, r;
                    return t ? (r = new p, (t.state = r).window = null, (i = y(t, e)) !== h && (t.state = null), i) : u
                }
                var v, b, w = !0;

                function M(t) {
                    if (w) {
                        var e;
                        for (v = new r.Buf32(512), b = new r.Buf32(32), e = 0; e < 144;) t.lens[e++] = 8;
                        for (; e < 256;) t.lens[e++] = 9;
                        for (; e < 280;) t.lens[e++] = 7;
                        for (; e < 288;) t.lens[e++] = 8;
                        for (o(1, t.lens, 0, 288, v, 0, t.work, {
                                bits: 9
                            }), e = 0; e < 32;) t.lens[e++] = 5;
                        o(2, t.lens, 0, 32, b, 0, t.work, {
                            bits: 5
                        }), w = !1
                    }
                    t.lencode = v, t.lenbits = 9, t.distcode = b, t.distbits = 5
                }

                function x(t, e, i, n) {
                    var s, a = t.state;
                    return null === a.window && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0, a.window = new r.Buf8(a.wsize)), n >= a.wsize ? (r.arraySet(a.window, e, i - a.wsize, a.wsize, 0), a.wnext = 0, a.whave = a.wsize) : (n < (s = a.wsize - a.wnext) && (s = n), r.arraySet(a.window, e, i - n, s, a.wnext), (n -= s) ? (r.arraySet(a.window, e, i - n, n, 0), a.wnext = n, a.whave = a.wsize) : (a.wnext += s, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += s))), 0
                }
                i.inflateReset = g, i.inflateReset2 = y, i.inflateResetKeep = m, i.inflateInit = function(t) {
                    return _(t, 15)
                }, i.inflateInit2 = _, i.inflate = function(t, e) {
                    var i, c, f, p, m, g, y, _, v, b, w, k, E, C, S, A, I, O, B, N, L, P, z, R, T = 0,
                        j = new r.Buf8(4),
                        F = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                    if (!t || !t.state || !t.output || !t.input && 0 !== t.avail_in) return u;
                    12 === (i = t.state).mode && (i.mode = 13), m = t.next_out, f = t.output, y = t.avail_out, p = t.next_in, c = t.input, g = t.avail_in, _ = i.hold, v = i.bits, b = g, w = y, P = h;
                    t: for (;;) switch (i.mode) {
                        case l:
                            if (0 === i.wrap) {
                                i.mode = 13;
                                break
                            }
                            for (; v < 16;) {
                                if (0 === g) break t;
                                g--, _ += c[p++] << v, v += 8
                            }
                            if (2 & i.wrap && 35615 === _) {
                                j[i.check = 0] = 255 & _, j[1] = _ >>> 8 & 255, i.check = s(i.check, j, 2, 0), v = _ = 0, i.mode = 2;
                                break
                            }
                            if (i.flags = 0, i.head && (i.head.done = !1), !(1 & i.wrap) || (((255 & _) << 8) + (_ >> 8)) % 31) {
                                t.msg = "incorrect header check", i.mode = 30;
                                break
                            }
                            if (8 != (15 & _)) {
                                t.msg = "unknown compression method", i.mode = 30;
                                break
                            }
                            if (v -= 4, L = 8 + (15 & (_ >>>= 4)), 0 === i.wbits) i.wbits = L;
                            else if (L > i.wbits) {
                                t.msg = "invalid window size", i.mode = 30;
                                break
                            }
                            i.dmax = 1 << L, t.adler = i.check = 1, i.mode = 512 & _ ? 10 : 12, v = _ = 0;
                            break;
                        case 2:
                            for (; v < 16;) {
                                if (0 === g) break t;
                                g--, _ += c[p++] << v, v += 8
                            }
                            if (i.flags = _, 8 != (255 & i.flags)) {
                                t.msg = "unknown compression method", i.mode = 30;
                                break
                            }
                            if (57344 & i.flags) {
                                t.msg = "unknown header flags set", i.mode = 30;
                                break
                            }
                            i.head && (i.head.text = _ >> 8 & 1), 512 & i.flags && (j[0] = 255 & _, j[1] = _ >>> 8 & 255, i.check = s(i.check, j, 2, 0)), v = _ = 0, i.mode = 3;
                        case 3:
                            for (; v < 32;) {
                                if (0 === g) break t;
                                g--, _ += c[p++] << v, v += 8
                            }
                            i.head && (i.head.time = _), 512 & i.flags && (j[0] = 255 & _, j[1] = _ >>> 8 & 255, j[2] = _ >>> 16 & 255, j[3] = _ >>> 24 & 255, i.check = s(i.check, j, 4, 0)), v = _ = 0, i.mode = 4;
                        case 4:
                            for (; v < 16;) {
                                if (0 === g) break t;
                                g--, _ += c[p++] << v, v += 8
                            }
                            i.head && (i.head.xflags = 255 & _, i.head.os = _ >> 8), 512 & i.flags && (j[0] = 255 & _, j[1] = _ >>> 8 & 255, i.check = s(i.check, j, 2, 0)), v = _ = 0, i.mode = 5;
                        case 5:
                            if (1024 & i.flags) {
                                for (; v < 16;) {
                                    if (0 === g) break t;
                                    g--, _ += c[p++] << v, v += 8
                                }
                                i.length = _, i.head && (i.head.extra_len = _), 512 & i.flags && (j[0] = 255 & _, j[1] = _ >>> 8 & 255, i.check = s(i.check, j, 2, 0)), v = _ = 0
                            } else i.head && (i.head.extra = null);
                            i.mode = 6;
                        case 6:
                            if (1024 & i.flags && (g < (k = i.length) && (k = g), k && (i.head && (L = i.head.extra_len - i.length, i.head.extra || (i.head.extra = new Array(i.head.extra_len)), r.arraySet(i.head.extra, c, p, k, L)), 512 & i.flags && (i.check = s(i.check, c, k, p)), g -= k, p += k, i.length -= k), i.length)) break t;
                            i.length = 0, i.mode = 7;
                        case 7:
                            if (2048 & i.flags) {
                                if (0 === g) break t;
                                for (k = 0; L = c[p + k++], i.head && L && i.length < 65536 && (i.head.name += String.fromCharCode(L)), L && k < g;);
                                if (512 & i.flags && (i.check = s(i.check, c, k, p)), g -= k, p += k, L) break t
                            } else i.head && (i.head.name = null);
                            i.length = 0, i.mode = 8;
                        case 8:
                            if (4096 & i.flags) {
                                if (0 === g) break t;
                                for (k = 0; L = c[p + k++], i.head && L && i.length < 65536 && (i.head.comment += String.fromCharCode(L)), L && k < g;);
                                if (512 & i.flags && (i.check = s(i.check, c, k, p)), g -= k, p += k, L) break t
                            } else i.head && (i.head.comment = null);
                            i.mode = 9;
                        case 9:
                            if (512 & i.flags) {
                                for (; v < 16;) {
                                    if (0 === g) break t;
                                    g--, _ += c[p++] << v, v += 8
                                }
                                if (_ !== (65535 & i.check)) {
                                    t.msg = "header crc mismatch", i.mode = 30;
                                    break
                                }
                                v = _ = 0
                            }
                            i.head && (i.head.hcrc = i.flags >> 9 & 1, i.head.done = !0), t.adler = i.check = 0, i.mode = 12;
                            break;
                        case 10:
                            for (; v < 32;) {
                                if (0 === g) break t;
                                g--, _ += c[p++] << v, v += 8
                            }
                            t.adler = i.check = d(_), v = _ = 0, i.mode = 11;
                        case 11:
                            if (0 === i.havedict) return t.next_out = m, t.avail_out = y, t.next_in = p, t.avail_in = g, i.hold = _, i.bits = v, 2;
                            t.adler = i.check = 1, i.mode = 12;
                        case 12:
                            if (5 === e || 6 === e) break t;
                        case 13:
                            if (i.last) {
                                _ >>>= 7 & v, v -= 7 & v, i.mode = 27;
                                break
                            }
                            for (; v < 3;) {
                                if (0 === g) break t;
                                g--, _ += c[p++] << v, v += 8
                            }
                            switch (i.last = 1 & _, v -= 1, 3 & (_ >>>= 1)) {
                                case 0:
                                    i.mode = 14;
                                    break;
                                case 1:
                                    if (M(i), i.mode = 20, 6 !== e) break;
                                    _ >>>= 2, v -= 2;
                                    break t;
                                case 2:
                                    i.mode = 17;
                                    break;
                                case 3:
                                    t.msg = "invalid block type", i.mode = 30
                            }
                            _ >>>= 2, v -= 2;
                            break;
                        case 14:
                            for (_ >>>= 7 & v, v -= 7 & v; v < 32;) {
                                if (0 === g) break t;
                                g--, _ += c[p++] << v, v += 8
                            }
                            if ((65535 & _) != (_ >>> 16 ^ 65535)) {
                                t.msg = "invalid stored block lengths", i.mode = 30;
                                break
                            }
                            if (i.length = 65535 & _, v = _ = 0, i.mode = 15, 6 === e) break t;
                        case 15:
                            i.mode = 16;
                        case 16:
                            if (k = i.length) {
                                if (g < k && (k = g), y < k && (k = y), 0 === k) break t;
                                r.arraySet(f, c, p, k, m), g -= k, p += k, y -= k, m += k, i.length -= k;
                                break
                            }
                            i.mode = 12;
                            break;
                        case 17:
                            for (; v < 14;) {
                                if (0 === g) break t;
                                g--, _ += c[p++] << v, v += 8
                            }
                            if (i.nlen = 257 + (31 & _), _ >>>= 5, v -= 5, i.ndist = 1 + (31 & _), _ >>>= 5, v -= 5, i.ncode = 4 + (15 & _), _ >>>= 4, v -= 4, 286 < i.nlen || 30 < i.ndist) {
                                t.msg = "too many length or distance symbols", i.mode = 30;
                                break
                            }
                            i.have = 0, i.mode = 18;
                        case 18:
                            for (; i.have < i.ncode;) {
                                for (; v < 3;) {
                                    if (0 === g) break t;
                                    g--, _ += c[p++] << v, v += 8
                                }
                                i.lens[F[i.have++]] = 7 & _, _ >>>= 3, v -= 3
                            }
                            for (; i.have < 19;) i.lens[F[i.have++]] = 0;
                            if (i.lencode = i.lendyn, i.lenbits = 7, z = {
                                    bits: i.lenbits
                                }, P = o(0, i.lens, 0, 19, i.lencode, 0, i.work, z), i.lenbits = z.bits, P) {
                                t.msg = "invalid code lengths set", i.mode = 30;
                                break
                            }
                            i.have = 0, i.mode = 19;
                        case 19:
                            for (; i.have < i.nlen + i.ndist;) {
                                for (; A = (T = i.lencode[_ & (1 << i.lenbits) - 1]) >>> 16 & 255, I = 65535 & T, !((S = T >>> 24) <= v);) {
                                    if (0 === g) break t;
                                    g--, _ += c[p++] << v, v += 8
                                }
                                if (I < 16) _ >>>= S, v -= S, i.lens[i.have++] = I;
                                else {
                                    if (16 === I) {
                                        for (R = S + 2; v < R;) {
                                            if (0 === g) break t;
                                            g--, _ += c[p++] << v, v += 8
                                        }
                                        if (_ >>>= S, v -= S, 0 === i.have) {
                                            t.msg = "invalid bit length repeat", i.mode = 30;
                                            break
                                        }
                                        L = i.lens[i.have - 1], k = 3 + (3 & _), _ >>>= 2, v -= 2
                                    } else if (17 === I) {
                                        for (R = S + 3; v < R;) {
                                            if (0 === g) break t;
                                            g--, _ += c[p++] << v, v += 8
                                        }
                                        v -= S, L = 0, k = 3 + (7 & (_ >>>= S)), _ >>>= 3, v -= 3
                                    } else {
                                        for (R = S + 7; v < R;) {
                                            if (0 === g) break t;
                                            g--, _ += c[p++] << v, v += 8
                                        }
                                        v -= S, L = 0, k = 11 + (127 & (_ >>>= S)), _ >>>= 7, v -= 7
                                    }
                                    if (i.have + k > i.nlen + i.ndist) {
                                        t.msg = "invalid bit length repeat", i.mode = 30;
                                        break
                                    }
                                    for (; k--;) i.lens[i.have++] = L
                                }
                            }
                            if (30 === i.mode) break;
                            if (0 === i.lens[256]) {
                                t.msg = "invalid code -- missing end-of-block", i.mode = 30;
                                break
                            }
                            if (i.lenbits = 9, z = {
                                    bits: i.lenbits
                                }, P = o(1, i.lens, 0, i.nlen, i.lencode, 0, i.work, z), i.lenbits = z.bits, P) {
                                t.msg = "invalid literal/lengths set", i.mode = 30;
                                break
                            }
                            if (i.distbits = 6, i.distcode = i.distdyn, z = {
                                    bits: i.distbits
                                }, P = o(2, i.lens, i.nlen, i.ndist, i.distcode, 0, i.work, z), i.distbits = z.bits, P) {
                                t.msg = "invalid distances set", i.mode = 30;
                                break
                            }
                            if (i.mode = 20, 6 === e) break t;
                        case 20:
                            i.mode = 21;
                        case 21:
                            if (6 <= g && 258 <= y) {
                                t.next_out = m, t.avail_out = y, t.next_in = p, t.avail_in = g, i.hold = _, i.bits = v, a(t, w), m = t.next_out, f = t.output, y = t.avail_out, p = t.next_in, c = t.input, g = t.avail_in, _ = i.hold, v = i.bits, 12 === i.mode && (i.back = -1);
                                break
                            }
                            for (i.back = 0; A = (T = i.lencode[_ & (1 << i.lenbits) - 1]) >>> 16 & 255, I = 65535 & T, !((S = T >>> 24) <= v);) {
                                if (0 === g) break t;
                                g--, _ += c[p++] << v, v += 8
                            }
                            if (A && 0 == (240 & A)) {
                                for (O = S, B = A, N = I; A = (T = i.lencode[N + ((_ & (1 << O + B) - 1) >> O)]) >>> 16 & 255, I = 65535 & T, !(O + (S = T >>> 24) <= v);) {
                                    if (0 === g) break t;
                                    g--, _ += c[p++] << v, v += 8
                                }
                                _ >>>= O, v -= O, i.back += O
                            }
                            if (_ >>>= S, v -= S, i.back += S, i.length = I, 0 === A) {
                                i.mode = 26;
                                break
                            }
                            if (32 & A) {
                                i.back = -1, i.mode = 12;
                                break
                            }
                            if (64 & A) {
                                t.msg = "invalid literal/length code", i.mode = 30;
                                break
                            }
                            i.extra = 15 & A, i.mode = 22;
                        case 22:
                            if (i.extra) {
                                for (R = i.extra; v < R;) {
                                    if (0 === g) break t;
                                    g--, _ += c[p++] << v, v += 8
                                }
                                i.length += _ & (1 << i.extra) - 1, _ >>>= i.extra, v -= i.extra, i.back += i.extra
                            }
                            i.was = i.length, i.mode = 23;
                        case 23:
                            for (; A = (T = i.distcode[_ & (1 << i.distbits) - 1]) >>> 16 & 255, I = 65535 & T, !((S = T >>> 24) <= v);) {
                                if (0 === g) break t;
                                g--, _ += c[p++] << v, v += 8
                            }
                            if (0 == (240 & A)) {
                                for (O = S, B = A, N = I; A = (T = i.distcode[N + ((_ & (1 << O + B) - 1) >> O)]) >>> 16 & 255, I = 65535 & T, !(O + (S = T >>> 24) <= v);) {
                                    if (0 === g) break t;
                                    g--, _ += c[p++] << v, v += 8
                                }
                                _ >>>= O, v -= O, i.back += O
                            }
                            if (_ >>>= S, v -= S, i.back += S, 64 & A) {
                                t.msg = "invalid distance code", i.mode = 30;
                                break
                            }
                            i.offset = I, i.extra = 15 & A, i.mode = 24;
                        case 24:
                            if (i.extra) {
                                for (R = i.extra; v < R;) {
                                    if (0 === g) break t;
                                    g--, _ += c[p++] << v, v += 8
                                }
                                i.offset += _ & (1 << i.extra) - 1, _ >>>= i.extra, v -= i.extra, i.back += i.extra
                            }
                            if (i.offset > i.dmax) {
                                t.msg = "invalid distance too far back", i.mode = 30;
                                break
                            }
                            i.mode = 25;
                        case 25:
                            if (0 === y) break t;
                            if (k = w - y, i.offset > k) {
                                if ((k = i.offset - k) > i.whave && i.sane) {
                                    t.msg = "invalid distance too far back", i.mode = 30;
                                    break
                                }
                                E = k > i.wnext ? (k -= i.wnext, i.wsize - k) : i.wnext - k, k > i.length && (k = i.length), C = i.window
                            } else C = f, E = m - i.offset, k = i.length;
                            for (y < k && (k = y), y -= k, i.length -= k; f[m++] = C[E++], --k;);
                            0 === i.length && (i.mode = 21);
                            break;
                        case 26:
                            if (0 === y) break t;
                            f[m++] = i.length, y--, i.mode = 21;
                            break;
                        case 27:
                            if (i.wrap) {
                                for (; v < 32;) {
                                    if (0 === g) break t;
                                    g--, _ |= c[p++] << v, v += 8
                                }
                                if (w -= y, t.total_out += w, i.total += w, w && (t.adler = i.check = i.flags ? s(i.check, f, w, m - w) : n(i.check, f, w, m - w)), w = y, (i.flags ? _ : d(_)) !== i.check) {
                                    t.msg = "incorrect data check", i.mode = 30;
                                    break
                                }
                                v = _ = 0
                            }
                            i.mode = 28;
                        case 28:
                            if (i.wrap && i.flags) {
                                for (; v < 32;) {
                                    if (0 === g) break t;
                                    g--, _ += c[p++] << v, v += 8
                                }
                                if (_ !== (4294967295 & i.total)) {
                                    t.msg = "incorrect length check", i.mode = 30;
                                    break
                                }
                                v = _ = 0
                            }
                            i.mode = 29;
                        case 29:
                            P = 1;
                            break t;
                        case 30:
                            P = -3;
                            break t;
                        case 31:
                            return -4;
                        default:
                            return u
                    }
                    return t.next_out = m, t.avail_out = y, t.next_in = p, t.avail_in = g, i.hold = _, i.bits = v, (i.wsize || w !== t.avail_out && i.mode < 30 && (i.mode < 27 || 4 !== e)) && x(t, t.output, t.next_out, w - t.avail_out) ? (i.mode = 31, -4) : (b -= t.avail_in, w -= t.avail_out, t.total_in += b, t.total_out += w, i.total += w, i.wrap && w && (t.adler = i.check = i.flags ? s(i.check, f, w, t.next_out - w) : n(i.check, f, w, t.next_out - w)), t.data_type = i.bits + (i.last ? 64 : 0) + (12 === i.mode ? 128 : 0) + (20 === i.mode || 15 === i.mode ? 256 : 0), (0 == b && 0 === w || 4 === e) && P === h && (P = -5), P)
                }, i.inflateEnd = function(t) {
                    if (!t || !t.state) return u;
                    var e = t.state;
                    return e.window && (e.window = null), t.state = null, h
                }, i.inflateGetHeader = function(t, e) {
                    var i;
                    return t && t.state ? 0 == (2 & (i = t.state).wrap) ? u : ((i.head = e).done = !1, h) : u
                }, i.inflateSetDictionary = function(t, e) {
                    var i, r = e.length;
                    return t && t.state ? 0 !== (i = t.state).wrap && 11 !== i.mode ? u : 11 === i.mode && n(1, e, r, 0) !== i.check ? -3 : x(t, e, r, r) ? (i.mode = 31, -4) : (i.havedict = 1, h) : u
                }, i.inflateInfo = "pako inflate (from Nodeca project)"
            }, {
                "../utils/common": 41,
                "./adler32": 43,
                "./crc32": 45,
                "./inffast": 48,
                "./inftrees": 50
            }],
            50: [function(t, e, i) {
                var r = t("../utils/common"),
                    n = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                    s = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                    a = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                    o = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
                e.exports = function(t, e, i, h, u, l, c, f) {
                    var d, p, m, g, y, _, v, b, w, M = f.bits,
                        x = 0,
                        k = 0,
                        E = 0,
                        C = 0,
                        S = 0,
                        A = 0,
                        I = 0,
                        O = 0,
                        B = 0,
                        N = 0,
                        L = null,
                        P = 0,
                        z = new r.Buf16(16),
                        R = new r.Buf16(16),
                        T = null,
                        j = 0;
                    for (x = 0; x <= 15; x++) z[x] = 0;
                    for (k = 0; k < h; k++) z[e[i + k]]++;
                    for (S = M, C = 15; 1 <= C && 0 === z[C]; C--);
                    if (C < S && (S = C), 0 === C) return u[l++] = 20971520, u[l++] = 20971520, f.bits = 1, 0;
                    for (E = 1; E < C && 0 === z[E]; E++);
                    for (S < E && (S = E), x = O = 1; x <= 15; x++)
                        if (O <<= 1, (O -= z[x]) < 0) return -1;
                    if (0 < O && (0 === t || 1 !== C)) return -1;
                    for (R[1] = 0, x = 1; x < 15; x++) R[x + 1] = R[x] + z[x];
                    for (k = 0; k < h; k++) 0 !== e[i + k] && (c[R[e[i + k]]++] = k);
                    if (_ = 0 === t ? (L = T = c, 19) : 1 === t ? (L = n, P -= 257, T = s, j -= 257, 256) : (L = a, T = o, -1), x = E, y = l, I = k = N = 0, m = -1, g = (B = 1 << (A = S)) - 1, 1 === t && 852 < B || 2 === t && 592 < B) return 1;
                    for (;;) {
                        for (v = x - I, w = c[k] < _ ? (b = 0, c[k]) : c[k] > _ ? (b = T[j + c[k]], L[P + c[k]]) : (b = 96, 0), d = 1 << x - I, E = p = 1 << A; u[y + (N >> I) + (p -= d)] = v << 24 | b << 16 | w | 0, 0 !== p;);
                        for (d = 1 << x - 1; N & d;) d >>= 1;
                        if (0 !== d ? (N &= d - 1, N += d) : N = 0, k++, 0 == --z[x]) {
                            if (x === C) break;
                            x = e[i + c[k]]
                        }
                        if (S < x && (N & g) !== m) {
                            for (0 === I && (I = S), y += E, O = 1 << (A = x - I); A + I < C && !((O -= z[A + I]) <= 0);) A++, O <<= 1;
                            if (B += 1 << A, 1 === t && 852 < B || 2 === t && 592 < B) return 1;
                            u[m = N & g] = S << 24 | A << 16 | y - l | 0
                        }
                    }
                    return 0 !== N && (u[y + N] = x - I << 24 | 64 << 16 | 0), f.bits = S, 0
                }
            }, {
                "../utils/common": 41
            }],
            51: [function(t, e, i) {
                e.exports = {
                    2: "need dictionary",
                    1: "stream end",
                    0: "",
                    "-1": "file error",
                    "-2": "stream error",
                    "-3": "data error",
                    "-4": "insufficient memory",
                    "-5": "buffer error",
                    "-6": "incompatible version"
                }
            }, {}],
            52: [function(t, e, i) {
                var r = t("../utils/common");

                function n(t) {
                    for (var e = t.length; 0 <= --e;) t[e] = 0
                }
                var s = 256,
                    a = 286,
                    o = 30,
                    h = 15,
                    u = 16,
                    l = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
                    c = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
                    f = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                    d = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                    p = new Array(576);
                n(p);
                var m = new Array(60);
                n(m);
                var g = new Array(512);
                n(g);
                var y = new Array(256);
                n(y);
                var _ = new Array(29);
                n(_);
                var v, b, w, M = new Array(o);

                function x(t, e, i, r, n) {
                    this.static_tree = t, this.extra_bits = e, this.extra_base = i, this.elems = r, this.max_length = n, this.has_stree = t && t.length
                }

                function k(t, e) {
                    this.dyn_tree = t, this.max_code = 0, this.stat_desc = e
                }

                function E(t) {
                    return t < 256 ? g[t] : g[256 + (t >>> 7)]
                }

                function C(t, e) {
                    t.pending_buf[t.pending++] = 255 & e, t.pending_buf[t.pending++] = e >>> 8 & 255
                }

                function S(t, e, i) {
                    t.bi_valid > u - i ? (t.bi_buf |= e << t.bi_valid & 65535, C(t, t.bi_buf), t.bi_buf = e >> u - t.bi_valid, t.bi_valid += i - u) : (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += i)
                }

                function A(t, e, i) {
                    S(t, i[2 * e], i[2 * e + 1])
                }

                function I(t, e) {
                    for (var i = 0; i |= 1 & t, t >>>= 1, i <<= 1, 0 < --e;);
                    return i >>> 1
                }

                function O(t, e, i) {
                    var r, n, s = new Array(h + 1),
                        a = 0;
                    for (r = 1; r <= h; r++) s[r] = a = a + i[r - 1] << 1;
                    for (n = 0; n <= e; n++) {
                        var o = t[2 * n + 1];
                        0 !== o && (t[2 * n] = I(s[o]++, o))
                    }
                }

                function B(t) {
                    var e;
                    for (e = 0; e < a; e++) t.dyn_ltree[2 * e] = 0;
                    for (e = 0; e < o; e++) t.dyn_dtree[2 * e] = 0;
                    for (e = 0; e < 19; e++) t.bl_tree[2 * e] = 0;
                    t.dyn_ltree[512] = 1, t.opt_len = t.static_len = 0, t.last_lit = t.matches = 0
                }

                function N(t) {
                    8 < t.bi_valid ? C(t, t.bi_buf) : 0 < t.bi_valid && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0
                }

                function L(t, e, i, r) {
                    var n = 2 * e,
                        s = 2 * i;
                    return t[n] < t[s] || t[n] === t[s] && r[e] <= r[i]
                }

                function P(t, e, i) {
                    for (var r = t.heap[i], n = i << 1; n <= t.heap_len && (n < t.heap_len && L(e, t.heap[n + 1], t.heap[n], t.depth) && n++, !L(e, r, t.heap[n], t.depth));) t.heap[i] = t.heap[n], i = n, n <<= 1;
                    t.heap[i] = r
                }

                function z(t, e, i) {
                    var r, n, a, o, h = 0;
                    if (0 !== t.last_lit)
                        for (; r = t.pending_buf[t.d_buf + 2 * h] << 8 | t.pending_buf[t.d_buf + 2 * h + 1], n = t.pending_buf[t.l_buf + h], h++, 0 === r ? A(t, n, e) : (A(t, (a = y[n]) + s + 1, e), 0 !== (o = l[a]) && S(t, n -= _[a], o), A(t, a = E(--r), i), 0 !== (o = c[a]) && S(t, r -= M[a], o)), h < t.last_lit;);
                    A(t, 256, e)
                }

                function R(t, e) {
                    var i, r, n, s = e.dyn_tree,
                        a = e.stat_desc.static_tree,
                        o = e.stat_desc.has_stree,
                        u = e.stat_desc.elems,
                        l = -1;
                    for (t.heap_len = 0, t.heap_max = 573, i = 0; i < u; i++) 0 !== s[2 * i] ? (t.heap[++t.heap_len] = l = i, t.depth[i] = 0) : s[2 * i + 1] = 0;
                    for (; t.heap_len < 2;) s[2 * (n = t.heap[++t.heap_len] = l < 2 ? ++l : 0)] = 1, t.depth[n] = 0, t.opt_len--, o && (t.static_len -= a[2 * n + 1]);
                    for (e.max_code = l, i = t.heap_len >> 1; 1 <= i; i--) P(t, s, i);
                    for (n = u; i = t.heap[1], t.heap[1] = t.heap[t.heap_len--], P(t, s, 1), r = t.heap[1], t.heap[--t.heap_max] = i, t.heap[--t.heap_max] = r, s[2 * n] = s[2 * i] + s[2 * r], t.depth[n] = (t.depth[i] >= t.depth[r] ? t.depth[i] : t.depth[r]) + 1, s[2 * i + 1] = s[2 * r + 1] = n, t.heap[1] = n++, P(t, s, 1), 2 <= t.heap_len;);
                    t.heap[--t.heap_max] = t.heap[1],
                        function(t, e) {
                            var i, r, n, s, a, o, u = e.dyn_tree,
                                l = e.max_code,
                                c = e.stat_desc.static_tree,
                                f = e.stat_desc.has_stree,
                                d = e.stat_desc.extra_bits,
                                p = e.stat_desc.extra_base,
                                m = e.stat_desc.max_length,
                                g = 0;
                            for (s = 0; s <= h; s++) t.bl_count[s] = 0;
                            for (u[2 * t.heap[t.heap_max] + 1] = 0, i = t.heap_max + 1; i < 573; i++) m < (s = u[2 * u[2 * (r = t.heap[i]) + 1] + 1] + 1) && (s = m, g++), u[2 * r + 1] = s, l < r || (t.bl_count[s]++, a = 0, p <= r && (a = d[r - p]), o = u[2 * r], t.opt_len += o * (s + a), f && (t.static_len += o * (c[2 * r + 1] + a)));
                            if (0 !== g) {
                                do {
                                    for (s = m - 1; 0 === t.bl_count[s];) s--;
                                    t.bl_count[s]--, t.bl_count[s + 1] += 2, t.bl_count[m]--, g -= 2
                                } while (0 < g);
                                for (s = m; 0 !== s; s--)
                                    for (r = t.bl_count[s]; 0 !== r;) l < (n = t.heap[--i]) || (u[2 * n + 1] !== s && (t.opt_len += (s - u[2 * n + 1]) * u[2 * n], u[2 * n + 1] = s), r--)
                            }
                        }(t, e), O(s, l, t.bl_count)
                }

                function T(t, e, i) {
                    var r, n, s = -1,
                        a = e[1],
                        o = 0,
                        h = 7,
                        u = 4;
                    for (0 === a && (h = 138, u = 3), e[2 * (i + 1) + 1] = 65535, r = 0; r <= i; r++) n = a, a = e[2 * (r + 1) + 1], ++o < h && n === a || (o < u ? t.bl_tree[2 * n] += o : 0 !== n ? (n !== s && t.bl_tree[2 * n]++, t.bl_tree[32]++) : o <= 10 ? t.bl_tree[34]++ : t.bl_tree[36]++, s = n, u = (o = 0) === a ? (h = 138, 3) : n === a ? (h = 6, 3) : (h = 7, 4))
                }

                function j(t, e, i) {
                    var r, n, s = -1,
                        a = e[1],
                        o = 0,
                        h = 7,
                        u = 4;
                    for (0 === a && (h = 138, u = 3), r = 0; r <= i; r++)
                        if (n = a, a = e[2 * (r + 1) + 1], !(++o < h && n === a)) {
                            if (o < u)
                                for (; A(t, n, t.bl_tree), 0 != --o;);
                            else 0 !== n ? (n !== s && (A(t, n, t.bl_tree), o--), A(t, 16, t.bl_tree), S(t, o - 3, 2)) : o <= 10 ? (A(t, 17, t.bl_tree), S(t, o - 3, 3)) : (A(t, 18, t.bl_tree), S(t, o - 11, 7));
                            s = n, u = (o = 0) === a ? (h = 138, 3) : n === a ? (h = 6, 3) : (h = 7, 4)
                        }
                }
                n(M);
                var F = !1;

                function U(t, e, i, n) {
                    S(t, 0 + (n ? 1 : 0), 3),
                        function(t, e, i, n) {
                            N(t), C(t, i), C(t, ~i), r.arraySet(t.pending_buf, t.window, e, i, t.pending), t.pending += i
                        }(t, e, i)
                }
                i._tr_init = function(t) {
                    F || (function() {
                        var t, e, i, r, n, s = new Array(h + 1);
                        for (r = i = 0; r < 28; r++)
                            for (_[r] = i, t = 0; t < 1 << l[r]; t++) y[i++] = r;
                        for (y[i - 1] = r, r = n = 0; r < 16; r++)
                            for (M[r] = n, t = 0; t < 1 << c[r]; t++) g[n++] = r;
                        for (n >>= 7; r < o; r++)
                            for (M[r] = n << 7, t = 0; t < 1 << c[r] - 7; t++) g[256 + n++] = r;
                        for (e = 0; e <= h; e++) s[e] = 0;
                        for (t = 0; t <= 143;) p[2 * t + 1] = 8, t++, s[8]++;
                        for (; t <= 255;) p[2 * t + 1] = 9, t++, s[9]++;
                        for (; t <= 279;) p[2 * t + 1] = 7, t++, s[7]++;
                        for (; t <= 287;) p[2 * t + 1] = 8, t++, s[8]++;
                        for (O(p, 287, s), t = 0; t < o; t++) m[2 * t + 1] = 5, m[2 * t] = I(t, 5);
                        v = new x(p, l, 257, a, h), b = new x(m, c, 0, o, h), w = new x(new Array(0), f, 0, 19, 7)
                    }(), F = !0), t.l_desc = new k(t.dyn_ltree, v), t.d_desc = new k(t.dyn_dtree, b), t.bl_desc = new k(t.bl_tree, w), t.bi_buf = 0, t.bi_valid = 0, B(t)
                }, i._tr_stored_block = U, i._tr_flush_block = function(t, e, i, r) {
                    var n, a, o = 0;
                    0 < t.level ? (2 === t.strm.data_type && (t.strm.data_type = function(t) {
                        var e, i = 4093624447;
                        for (e = 0; e <= 31; e++, i >>>= 1)
                            if (1 & i && 0 !== t.dyn_ltree[2 * e]) return 0;
                        if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return 1;
                        for (e = 32; e < s; e++)
                            if (0 !== t.dyn_ltree[2 * e]) return 1;
                        return 0
                    }(t)), R(t, t.l_desc), R(t, t.d_desc), o = function(t) {
                        var e;
                        for (T(t, t.dyn_ltree, t.l_desc.max_code), T(t, t.dyn_dtree, t.d_desc.max_code), R(t, t.bl_desc), e = 18; 3 <= e && 0 === t.bl_tree[2 * d[e] + 1]; e--);
                        return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e
                    }(t), n = t.opt_len + 3 + 7 >>> 3, (a = t.static_len + 3 + 7 >>> 3) <= n && (n = a)) : n = a = i + 5, i + 4 <= n && -1 !== e ? U(t, e, i, r) : 4 === t.strategy || a === n ? (S(t, 2 + (r ? 1 : 0), 3), z(t, p, m)) : (S(t, 4 + (r ? 1 : 0), 3), function(t, e, i, r) {
                        var n;
                        for (S(t, e - 257, 5), S(t, i - 1, 5), S(t, r - 4, 4), n = 0; n < r; n++) S(t, t.bl_tree[2 * d[n] + 1], 3);
                        j(t, t.dyn_ltree, e - 1), j(t, t.dyn_dtree, i - 1)
                    }(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, o + 1), z(t, t.dyn_ltree, t.dyn_dtree)), B(t), r && N(t)
                }, i._tr_tally = function(t, e, i) {
                    return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255, t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e, t.pending_buf[t.l_buf + t.last_lit] = 255 & i, t.last_lit++, 0 === e ? t.dyn_ltree[2 * i]++ : (t.matches++, e--, t.dyn_ltree[2 * (y[i] + s + 1)]++, t.dyn_dtree[2 * E(e)]++), t.last_lit === t.lit_bufsize - 1
                }, i._tr_align = function(t) {
                    S(t, 2, 3), A(t, 256, p),
                        function(t) {
                            16 === t.bi_valid ? (C(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : 8 <= t.bi_valid && (t.pending_buf[t.pending++] = 255 & t.bi_buf, t.bi_buf >>= 8, t.bi_valid -= 8)
                        }(t)
                }
            }, {
                "../utils/common": 41
            }],
            53: [function(t, e, i) {
                e.exports = function() {
                    this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0
                }
            }, {}],
            54: [function(t, e, r) {
                (function(t) {
                    ! function(t, e) {
                        if (!t.setImmediate) {
                            var i, r, n, s, a = 1,
                                o = {},
                                h = !1,
                                u = t.document,
                                l = Object.getPrototypeOf && Object.getPrototypeOf(t);
                            l = l && l.setTimeout ? l : t, i = "[object process]" === {}.toString.call(t.process) ? function(t) {
                                process.nextTick((function() {
                                    f(t)
                                }))
                            } : function() {
                                if (t.postMessage && !t.importScripts) {
                                    var e = !0,
                                        i = t.onmessage;
                                    return t.onmessage = function() {
                                        e = !1
                                    }, t.postMessage("", "*"), t.onmessage = i, e
                                }
                            }() ? (s = "setImmediate$" + Math.random() + "$", t.addEventListener ? t.addEventListener("message", d, !1) : t.attachEvent("onmessage", d), function(e) {
                                t.postMessage(s + e, "*")
                            }) : t.MessageChannel ? ((n = new MessageChannel).port1.onmessage = function(t) {
                                f(t.data)
                            }, function(t) {
                                n.port2.postMessage(t)
                            }) : u && "onreadystatechange" in u.createElement("script") ? (r = u.documentElement, function(t) {
                                var e = u.createElement("script");
                                e.onreadystatechange = function() {
                                    f(t), e.onreadystatechange = null, r.removeChild(e), e = null
                                }, r.appendChild(e)
                            }) : function(t) {
                                setTimeout(f, 0, t)
                            }, l.setImmediate = function(t) {
                                "function" != typeof t && (t = new Function("" + t));
                                for (var e = new Array(arguments.length - 1), r = 0; r < e.length; r++) e[r] = arguments[r + 1];
                                var n = {
                                    callback: t,
                                    args: e
                                };
                                return o[a] = n, i(a), a++
                            }, l.clearImmediate = c
                        }

                        function c(t) {
                            delete o[t]
                        }

                        function f(t) {
                            if (h) setTimeout(f, 0, t);
                            else {
                                var i = o[t];
                                if (i) {
                                    h = !0;
                                    try {
                                        ! function(t) {
                                            var i = t.callback,
                                                r = t.args;
                                            switch (r.length) {
                                                case 0:
                                                    i();
                                                    break;
                                                case 1:
                                                    i(r[0]);
                                                    break;
                                                case 2:
                                                    i(r[0], r[1]);
                                                    break;
                                                case 3:
                                                    i(r[0], r[1], r[2]);
                                                    break;
                                                default:
                                                    i.apply(e, r)
                                            }
                                        }(i)
                                    } finally {
                                        c(t), h = !1
                                    }
                                }
                            }
                        }

                        function d(e) {
                            e.source === t && "string" == typeof e.data && 0 === e.data.indexOf(s) && f(+e.data.slice(s.length))
                        }
                    }("undefined" == typeof self ? void 0 === t ? this : t : self)
                }).call(this, void 0 !== i.g ? i.g : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {}]
        }, {}, [10])(10)
    },
    389: (t, e, i) => {
        var r = i(705);

        function n() {}
        var s = {},
            a = ["REJECTED"],
            o = ["FULFILLED"],
            h = ["PENDING"];

        function u(t) {
            if ("function" != typeof t) throw new TypeError("resolver must be a function");
            this.state = h, this.queue = [], this.outcome = void 0, t !== n && d(this, t)
        }

        function l(t, e, i) {
            this.promise = t, "function" == typeof e && (this.onFulfilled = e, this.callFulfilled = this.otherCallFulfilled), "function" == typeof i && (this.onRejected = i, this.callRejected = this.otherCallRejected)
        }

        function c(t, e, i) {
            r((function() {
                var r;
                try {
                    r = e(i)
                } catch (e) {
                    return s.reject(t, e)
                }
                r === t ? s.reject(t, new TypeError("Cannot resolve promise with itself")) : s.resolve(t, r)
            }))
        }

        function f(t) {
            var e = t && t.then;
            if (t && ("object" == typeof t || "function" == typeof t) && "function" == typeof e) return function() {
                e.apply(t, arguments)
            }
        }

        function d(t, e) {
            var i = !1;

            function r(e) {
                i || (i = !0, s.reject(t, e))
            }

            function n(e) {
                i || (i = !0, s.resolve(t, e))
            }
            var a = p((function() {
                e(n, r)
            }));
            "error" === a.status && r(a.value)
        }

        function p(t, e) {
            var i = {};
            try {
                i.value = t(e), i.status = "success"
            } catch (t) {
                i.status = "error", i.value = t
            }
            return i
        }
        t.exports = u, u.prototype.finally = function(t) {
            if ("function" != typeof t) return this;
            var e = this.constructor;
            return this.then((function(i) {
                return e.resolve(t()).then((function() {
                    return i
                }))
            }), (function(i) {
                return e.resolve(t()).then((function() {
                    throw i
                }))
            }))
        }, u.prototype.catch = function(t) {
            return this.then(null, t)
        }, u.prototype.then = function(t, e) {
            if ("function" != typeof t && this.state === o || "function" != typeof e && this.state === a) return this;
            var i = new this.constructor(n);
            return this.state !== h ? c(i, this.state === o ? t : e, this.outcome) : this.queue.push(new l(i, t, e)), i
        }, l.prototype.callFulfilled = function(t) {
            s.resolve(this.promise, t)
        }, l.prototype.otherCallFulfilled = function(t) {
            c(this.promise, this.onFulfilled, t)
        }, l.prototype.callRejected = function(t) {
            s.reject(this.promise, t)
        }, l.prototype.otherCallRejected = function(t) {
            c(this.promise, this.onRejected, t)
        }, s.resolve = function(t, e) {
            var i = p(f, e);
            if ("error" === i.status) return s.reject(t, i.value);
            var r = i.value;
            if (r) d(t, r);
            else {
                t.state = o, t.outcome = e;
                for (var n = -1, a = t.queue.length; ++n < a;) t.queue[n].callFulfilled(e)
            }
            return t
        }, s.reject = function(t, e) {
            t.state = a, t.outcome = e;
            for (var i = -1, r = t.queue.length; ++i < r;) t.queue[i].callRejected(e);
            return t
        }, u.resolve = function(t) {
            return t instanceof this ? t : s.resolve(new this(n), t)
        }, u.reject = function(t) {
            var e = new this(n);
            return s.reject(e, t)
        }, u.all = function(t) {
            var e = this;
            if ("[object Array]" !== Object.prototype.toString.call(t)) return this.reject(new TypeError("must be an array"));
            var i = t.length,
                r = !1;
            if (!i) return this.resolve([]);
            for (var a = new Array(i), o = 0, h = -1, u = new this(n); ++h < i;) l(t[h], h);
            return u;

            function l(t, n) {
                e.resolve(t).then((function(t) {
                    a[n] = t, ++o !== i || r || (r = !0, s.resolve(u, a))
                }), (function(t) {
                    r || (r = !0, s.reject(u, t))
                }))
            }
        }, u.race = function(t) {
            if ("[object Array]" !== Object.prototype.toString.call(t)) return this.reject(new TypeError("must be an array"));
            var e = t.length,
                i = !1;
            if (!e) return this.resolve([]);
            for (var r, a = -1, o = new this(n); ++a < e;) r = t[a], this.resolve(r).then((function(t) {
                i || (i = !0, s.resolve(o, t))
            }), (function(t) {
                i || (i = !0, s.reject(o, t))
            }));
            return o
        }
    },
    392: (t, e, i) => {
        i(718);
        var r = i(941).s;

        function n(t) {
            var e = new r;
            return (e.write(t) + e.end()).replace(/\0/g, "").trim()
        }
        t.exports = function t(e, i) {
            if (!e) return n;
            try {
                new TextDecoder(e.trim())
            } catch (a) {
                var r = s.exec(e);
                return r && !i ? t("windows-" + r[1], !0) : n
            }
            return function(t) {
                var i = new TextDecoder(e);
                return (i.decode(t, {
                    stream: !0
                }) + i.decode()).replace(/\0/g, "").trim()
            }
        };
        var s = /^(?:ANSI\s)?(\d+)$/m
    },
    462: (t, e, i) => {
        var r = i(392);

        function n(t, e, i, r, n) {
            var s = n(t.slice(e, e + i));
            switch (r) {
                case "N":
                case "F":
                case "O":
                    return parseFloat(s, 10);
                case "D":
                    return new Date(s.slice(0, 4), parseInt(s.slice(4, 6), 10) - 1, s.slice(6, 8));
                case "L":
                    return "y" === s.toLowerCase() || "t" === s.toLowerCase();
                default:
                    return s
            }
        }

        function s(t, e, i, r) {
            for (var s, a, o = {}, h = 0, u = i.length; h < u;) s = n(t, e, (a = i[h]).len, a.dataType, r), e += a.len, void 0 !== s && (o[a.name] = s), h++;
            return o
        }
        t.exports = function(t, e) {
            for (var i = r(e), n = function(t) {
                    var e = {};
                    return e.lastUpdated = new Date(t.readUInt8(1) + 1900, t.readUInt8(2), t.readUInt8(3)), e.records = t.readUInt32LE(4), e.headerLen = t.readUInt16LE(8), e.recLen = t.readUInt16LE(10), e
                }(t), a = function(t, e, i) {
                    for (var r = [], n = 32; n < e && (r.push({
                            name: i(t.slice(n, n + 11)),
                            dataType: String.fromCharCode(t.readUInt8(n + 11)),
                            len: t.readUInt8(n + 16),
                            decimal: t.readUInt8(n + 17)
                        }), 13 !== t.readUInt8(n + 32));) n += 32;
                    return r
                }(t, n.headerLen - 1, i), o = 2 + (a.length + 1 << 5), h = n.recLen, u = n.records, l = []; u;) l.push(s(t, o, a, i)), o += h, u--;
            return l
        }
    },
    472: (t, e, i) => {
        i.r(e), i.d(e, {
            default: () => ii
        });
        var r = 1,
            n = 2,
            s = 3,
            a = 5,
            o = 6378137,
            h = 6356752.314,
            u = .0066943799901413165,
            l = 484813681109536e-20,
            c = Math.PI / 2,
            f = 1e-10,
            d = .017453292519943295,
            p = 57.29577951308232,
            m = Math.PI / 4,
            g = 2 * Math.PI,
            y = 3.14159265359,
            _ = {
                greenwich: 0,
                lisbon: -9.131906111111,
                paris: 2.337229166667,
                bogota: -74.080916666667,
                madrid: -3.687938888889,
                rome: 12.452333333333,
                bern: 7.439583333333,
                jakarta: 106.807719444444,
                ferro: -17.666666666667,
                brussels: 4.367975,
                stockholm: 18.058277777778,
                athens: 23.7163375,
                oslo: 10.722916666667
            };
        const v = {
            ft: {
                to_meter: .3048
            },
            "us-ft": {
                to_meter: 1200 / 3937
            }
        };
        var b = /[\s_\-\/\(\)]/g;

        function w(t, e) {
            if (t[e]) return t[e];
            for (var i, r = Object.keys(t), n = e.toLowerCase().replace(b, ""), s = -1; ++s < r.length;)
                if ((i = r[s]).toLowerCase().replace(b, "") === n) return t[i]
        }

        function M(t) {
            var e, i, r, n = {},
                s = t.split("+").map((function(t) {
                    return t.trim()
                })).filter((function(t) {
                    return t
                })).reduce((function(t, e) {
                    var i = e.split("=");
                    return i.push(!0), t[i[0].toLowerCase()] = i[1], t
                }), {}),
                a = {
                    proj: "projName",
                    datum: "datumCode",
                    rf: function(t) {
                        n.rf = parseFloat(t)
                    },
                    lat_0: function(t) {
                        n.lat0 = t * d
                    },
                    lat_1: function(t) {
                        n.lat1 = t * d
                    },
                    lat_2: function(t) {
                        n.lat2 = t * d
                    },
                    lat_ts: function(t) {
                        n.lat_ts = t * d
                    },
                    lon_0: function(t) {
                        n.long0 = t * d
                    },
                    lon_1: function(t) {
                        n.long1 = t * d
                    },
                    lon_2: function(t) {
                        n.long2 = t * d
                    },
                    alpha: function(t) {
                        n.alpha = parseFloat(t) * d
                    },
                    gamma: function(t) {
                        n.rectified_grid_angle = parseFloat(t)
                    },
                    lonc: function(t) {
                        n.longc = t * d
                    },
                    x_0: function(t) {
                        n.x0 = parseFloat(t)
                    },
                    y_0: function(t) {
                        n.y0 = parseFloat(t)
                    },
                    k_0: function(t) {
                        n.k0 = parseFloat(t)
                    },
                    k: function(t) {
                        n.k0 = parseFloat(t)
                    },
                    a: function(t) {
                        n.a = parseFloat(t)
                    },
                    b: function(t) {
                        n.b = parseFloat(t)
                    },
                    r_a: function() {
                        n.R_A = !0
                    },
                    zone: function(t) {
                        n.zone = parseInt(t, 10)
                    },
                    south: function() {
                        n.utmSouth = !0
                    },
                    towgs84: function(t) {
                        n.datum_params = t.split(",").map((function(t) {
                            return parseFloat(t)
                        }))
                    },
                    to_meter: function(t) {
                        n.to_meter = parseFloat(t)
                    },
                    units: function(t) {
                        n.units = t;
                        var e = w(v, t);
                        e && (n.to_meter = e.to_meter)
                    },
                    from_greenwich: function(t) {
                        n.from_greenwich = t * d
                    },
                    pm: function(t) {
                        var e = w(_, t);
                        n.from_greenwich = (e || parseFloat(t)) * d
                    },
                    nadgrids: function(t) {
                        "@null" === t ? n.datumCode = "none" : n.nadgrids = t
                    },
                    axis: function(t) {
                        var e = "ewnsud";
                        3 === t.length && -1 !== e.indexOf(t.substr(0, 1)) && -1 !== e.indexOf(t.substr(1, 1)) && -1 !== e.indexOf(t.substr(2, 1)) && (n.axis = t)
                    },
                    approx: function() {
                        n.approx = !0
                    }
                };
            for (e in s) i = s[e], e in a ? "function" == typeof(r = a[e]) ? r(i) : n[r] = i : n[e] = i;
            return "string" == typeof n.datumCode && "WGS84" !== n.datumCode && (n.datumCode = n.datumCode.toLowerCase()), n
        }
        const x = function(t) {
            return new O(t).output()
        };
        var k = 1,
            E = /\s/,
            C = /[A-Za-z]/,
            S = /[A-Za-z84_]/,
            A = /[,\]]/,
            I = /[\d\.E\-\+]/;

        function O(t) {
            if ("string" != typeof t) throw new Error("not a string");
            this.text = t.trim(), this.level = 0, this.place = 0, this.root = null, this.stack = [], this.currentObject = null, this.state = k
        }

        function B(t, e, i) {
            Array.isArray(e) && (i.unshift(e), e = null);
            var r = e ? {} : t,
                n = i.reduce((function(t, e) {
                    return N(e, t), t
                }), r);
            e && (t[e] = n)
        }

        function N(t, e) {
            if (Array.isArray(t)) {
                var i = t.shift();
                if ("PARAMETER" === i && (i = t.shift()), 1 === t.length) return Array.isArray(t[0]) ? (e[i] = {}, void N(t[0], e[i])) : void(e[i] = t[0]);
                if (t.length)
                    if ("TOWGS84" !== i) {
                        if ("AXIS" === i) return i in e || (e[i] = []), void e[i].push(t);
                        var r;
                        switch (Array.isArray(i) || (e[i] = {}), i) {
                            case "UNIT":
                            case "PRIMEM":
                            case "VERT_DATUM":
                                return e[i] = {
                                    name: t[0].toLowerCase(),
                                    convert: t[1]
                                }, void(3 === t.length && N(t[2], e[i]));
                            case "SPHEROID":
                            case "ELLIPSOID":
                                return e[i] = {
                                    name: t[0],
                                    a: t[1],
                                    rf: t[2]
                                }, void(4 === t.length && N(t[3], e[i]));
                            case "PROJECTEDCRS":
                            case "PROJCRS":
                            case "GEOGCS":
                            case "GEOCCS":
                            case "PROJCS":
                            case "LOCAL_CS":
                            case "GEODCRS":
                            case "GEODETICCRS":
                            case "GEODETICDATUM":
                            case "EDATUM":
                            case "ENGINEERINGDATUM":
                            case "VERT_CS":
                            case "VERTCRS":
                            case "VERTICALCRS":
                            case "COMPD_CS":
                            case "COMPOUNDCRS":
                            case "ENGINEERINGCRS":
                            case "ENGCRS":
                            case "FITTED_CS":
                            case "LOCAL_DATUM":
                            case "DATUM":
                                return t[0] = ["name", t[0]], void B(e, i, t);
                            default:
                                for (r = -1; ++r < t.length;)
                                    if (!Array.isArray(t[r])) return N(t, e[i]);
                                return B(e, i, t)
                        }
                    } else e[i] = t;
                else e[i] = !0
            } else e[t] = !0
        }
        O.prototype.readCharicter = function() {
            var t = this.text[this.place++];
            if (4 !== this.state)
                for (; E.test(t);) {
                    if (this.place >= this.text.length) return;
                    t = this.text[this.place++]
                }
            switch (this.state) {
                case k:
                    return this.neutral(t);
                case 2:
                    return this.keyword(t);
                case 4:
                    return this.quoted(t);
                case 5:
                    return this.afterquote(t);
                case 3:
                    return this.number(t);
                case -1:
                    return
            }
        }, O.prototype.afterquote = function(t) {
            if ('"' === t) return this.word += '"', void(this.state = 4);
            if (A.test(t)) return this.word = this.word.trim(), void this.afterItem(t);
            throw new Error("havn't handled \"" + t + '" in afterquote yet, index ' + this.place)
        }, O.prototype.afterItem = function(t) {
            return "," === t ? (null !== this.word && this.currentObject.push(this.word), this.word = null, void(this.state = k)) : "]" === t ? (this.level--, null !== this.word && (this.currentObject.push(this.word), this.word = null), this.state = k, this.currentObject = this.stack.pop(), void(this.currentObject || (this.state = -1))) : void 0
        }, O.prototype.number = function(t) {
            if (!I.test(t)) {
                if (A.test(t)) return this.word = parseFloat(this.word), void this.afterItem(t);
                throw new Error("havn't handled \"" + t + '" in number yet, index ' + this.place)
            }
            this.word += t
        }, O.prototype.quoted = function(t) {
            '"' !== t ? this.word += t : this.state = 5
        }, O.prototype.keyword = function(t) {
            if (S.test(t)) this.word += t;
            else {
                if ("[" === t) {
                    var e = [];
                    return e.push(this.word), this.level++, null === this.root ? this.root = e : this.currentObject.push(e), this.stack.push(this.currentObject), this.currentObject = e, void(this.state = k)
                }
                if (!A.test(t)) throw new Error("havn't handled \"" + t + '" in keyword yet, index ' + this.place);
                this.afterItem(t)
            }
        }, O.prototype.neutral = function(t) {
            if (C.test(t)) return this.word = t, void(this.state = 2);
            if ('"' === t) return this.word = "", void(this.state = 4);
            if (I.test(t)) return this.word = t, void(this.state = 3);
            if (!A.test(t)) throw new Error("havn't handled \"" + t + '" in neutral yet, index ' + this.place);
            this.afterItem(t)
        }, O.prototype.output = function() {
            for (; this.place < this.text.length;) this.readCharicter();
            if (-1 === this.state) return this.root;
            throw new Error('unable to parse string "' + this.text + '". State is ' + this.state)
        };
        var L = .017453292519943295;

        function P(t) {
            return t * L
        }

        function z(t) {
            var e = x(t),
                i = e.shift(),
                r = e.shift();
            e.unshift(["name", r]), e.unshift(["type", i]);
            var n = {};
            return N(e, n),
                function(t) {
                    if ("GEOGCS" === t.type ? t.projName = "longlat" : "LOCAL_CS" === t.type ? (t.projName = "identity", t.local = !0) : "object" == typeof t.PROJECTION ? t.projName = Object.keys(t.PROJECTION)[0] : t.projName = t.PROJECTION, t.AXIS) {
                        for (var e = "", i = 0, r = t.AXIS.length; i < r; ++i) {
                            var n = [t.AXIS[i][0].toLowerCase(), t.AXIS[i][1].toLowerCase()]; - 1 !== n[0].indexOf("north") || ("y" === n[0] || "lat" === n[0]) && "north" === n[1] ? e += "n" : -1 !== n[0].indexOf("south") || ("y" === n[0] || "lat" === n[0]) && "south" === n[1] ? e += "s" : -1 !== n[0].indexOf("east") || ("x" === n[0] || "lon" === n[0]) && "east" === n[1] ? e += "e" : -1 === n[0].indexOf("west") && ("x" !== n[0] && "lon" !== n[0] || "west" !== n[1]) || (e += "w")
                        }
                        2 === e.length && (e += "u"), 3 === e.length && (t.axis = e)
                    }
                    t.UNIT && (t.units = t.UNIT.name.toLowerCase(), "metre" === t.units && (t.units = "meter"), t.UNIT.convert && ("GEOGCS" === t.type ? t.DATUM && t.DATUM.SPHEROID && (t.to_meter = t.UNIT.convert * t.DATUM.SPHEROID.a) : t.to_meter = t.UNIT.convert));
                    var s = t.GEOGCS;

                    function a(e) {
                        return e * (t.to_meter || 1)
                    }
                    "GEOGCS" === t.type && (s = t), s && (s.DATUM ? t.datumCode = s.DATUM.name.toLowerCase() : t.datumCode = s.name.toLowerCase(), "d_" === t.datumCode.slice(0, 2) && (t.datumCode = t.datumCode.slice(2)), "new_zealand_geodetic_datum_1949" !== t.datumCode && "new_zealand_1949" !== t.datumCode || (t.datumCode = "nzgd49"), "wgs_1984" !== t.datumCode && "world_geodetic_system_1984" !== t.datumCode || ("Mercator_Auxiliary_Sphere" === t.PROJECTION && (t.sphere = !0), t.datumCode = "wgs84"), "_ferro" === t.datumCode.slice(-6) && (t.datumCode = t.datumCode.slice(0, -6)), "_jakarta" === t.datumCode.slice(-8) && (t.datumCode = t.datumCode.slice(0, -8)), ~t.datumCode.indexOf("belge") && (t.datumCode = "rnb72"), s.DATUM && s.DATUM.SPHEROID && (t.ellps = s.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk"), "international" === t.ellps.toLowerCase().slice(0, 13) && (t.ellps = "intl"), t.a = s.DATUM.SPHEROID.a, t.rf = parseFloat(s.DATUM.SPHEROID.rf, 10)), s.DATUM && s.DATUM.TOWGS84 && (t.datum_params = s.DATUM.TOWGS84), ~t.datumCode.indexOf("osgb_1936") && (t.datumCode = "osgb36"), ~t.datumCode.indexOf("osni_1952") && (t.datumCode = "osni52"), (~t.datumCode.indexOf("tm65") || ~t.datumCode.indexOf("geodetic_datum_of_1965")) && (t.datumCode = "ire65"), "ch1903+" === t.datumCode && (t.datumCode = "ch1903"), ~t.datumCode.indexOf("israel") && (t.datumCode = "isr93")), t.b && !isFinite(t.b) && (t.b = t.a), [
                        ["standard_parallel_1", "Standard_Parallel_1"],
                        ["standard_parallel_1", "Latitude of 1st standard parallel"],
                        ["standard_parallel_2", "Standard_Parallel_2"],
                        ["standard_parallel_2", "Latitude of 2nd standard parallel"],
                        ["false_easting", "False_Easting"],
                        ["false_easting", "False easting"],
                        ["false-easting", "Easting at false origin"],
                        ["false_northing", "False_Northing"],
                        ["false_northing", "False northing"],
                        ["false_northing", "Northing at false origin"],
                        ["central_meridian", "Central_Meridian"],
                        ["central_meridian", "Longitude of natural origin"],
                        ["central_meridian", "Longitude of false origin"],
                        ["latitude_of_origin", "Latitude_Of_Origin"],
                        ["latitude_of_origin", "Central_Parallel"],
                        ["latitude_of_origin", "Latitude of natural origin"],
                        ["latitude_of_origin", "Latitude of false origin"],
                        ["scale_factor", "Scale_Factor"],
                        ["k0", "scale_factor"],
                        ["latitude_of_center", "Latitude_Of_Center"],
                        ["latitude_of_center", "Latitude_of_center"],
                        ["lat0", "latitude_of_center", P],
                        ["longitude_of_center", "Longitude_Of_Center"],
                        ["longitude_of_center", "Longitude_of_center"],
                        ["longc", "longitude_of_center", P],
                        ["x0", "false_easting", a],
                        ["y0", "false_northing", a],
                        ["long0", "central_meridian", P],
                        ["lat0", "latitude_of_origin", P],
                        ["lat0", "standard_parallel_1", P],
                        ["lat1", "standard_parallel_1", P],
                        ["lat2", "standard_parallel_2", P],
                        ["azimuth", "Azimuth"],
                        ["alpha", "azimuth", P],
                        ["srsCode", "name"]
                    ].forEach((function(e) {
                        return function(t, e) {
                            var i = e[0],
                                r = e[1];
                            !(i in t) && r in t && (t[i] = t[r], 3 === e.length && (t[i] = e[2](t[i])))
                        }(t, e)
                    })), t.long0 || !t.longc || "Albers_Conic_Equal_Area" !== t.projName && "Lambert_Azimuthal_Equal_Area" !== t.projName || (t.long0 = t.longc), t.lat_ts || !t.lat1 || "Stereographic_South_Pole" !== t.projName && "Polar Stereographic (variant B)" !== t.projName ? !t.lat_ts && t.lat0 && "Polar_Stereographic" === t.projName && (t.lat_ts = t.lat0, t.lat0 = P(t.lat0 > 0 ? 90 : -90)) : (t.lat0 = P(t.lat1 > 0 ? 90 : -90), t.lat_ts = t.lat1)
                }(n), n
        }

        function R(t) {
            var e = this;
            if (2 === arguments.length) {
                var i = arguments[1];
                "string" == typeof i ? "+" === i.charAt(0) ? R[t] = M(arguments[1]) : R[t] = z(arguments[1]) : R[t] = i
            } else if (1 === arguments.length) {
                if (Array.isArray(t)) return t.map((function(t) {
                    Array.isArray(t) ? R.apply(e, t) : R(t)
                }));
                if ("string" == typeof t) {
                    if (t in R) return R[t]
                } else "EPSG" in t ? R["EPSG:" + t.EPSG] = t : "ESRI" in t ? R["ESRI:" + t.ESRI] = t : "IAU2000" in t ? R["IAU2000:" + t.IAU2000] = t : console.log(t);
                return
            }
        }! function(t) {
            t("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"), t("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees"), t("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"), t.WGS84 = t["EPSG:4326"], t["EPSG:3785"] = t["EPSG:3857"], t.GOOGLE = t["EPSG:3857"], t["EPSG:900913"] = t["EPSG:3857"], t["EPSG:102113"] = t["EPSG:3857"]
        }(R);
        const T = R;
        var j = ["PROJECTEDCRS", "PROJCRS", "GEOGCS", "GEOCCS", "PROJCS", "LOCAL_CS", "GEODCRS", "GEODETICCRS", "GEODETICDATUM", "ENGCRS", "ENGINEERINGCRS"],
            F = ["3857", "900913", "3785", "102113"];

        function U(t, e) {
            var i, r;
            if (t = t || {}, !e) return t;
            for (r in e) void 0 !== (i = e[r]) && (t[r] = i);
            return t
        }

        function D(t, e, i) {
            var r = t * e;
            return i / Math.sqrt(1 - r * r)
        }

        function q(t) {
            return t < 0 ? -1 : 1
        }

        function G(t) {
            return Math.abs(t) <= y ? t : t - q(t) * g
        }

        function W(t, e, i) {
            var r = t * i,
                n = .5 * t;
            return r = Math.pow((1 - r) / (1 + r), n), Math.tan(.5 * (c - e)) / r
        }

        function Z(t, e) {
            for (var i, r, n = .5 * t, s = c - 2 * Math.atan(e), a = 0; a <= 15; a++)
                if (i = t * Math.sin(s), s += r = c - 2 * Math.atan(e * Math.pow((1 - i) / (1 + i), n)) - s, Math.abs(r) <= 1e-10) return s;
            return -9999
        }

        function H(t) {
            return t
        }
        var J = [{
                init: function() {
                    var t = this.b / this.a;
                    this.es = 1 - t * t, "x0" in this || (this.x0 = 0), "y0" in this || (this.y0 = 0), this.e = Math.sqrt(this.es), this.lat_ts ? this.sphere ? this.k0 = Math.cos(this.lat_ts) : this.k0 = D(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) : this.k0 || (this.k ? this.k0 = this.k : this.k0 = 1)
                },
                forward: function(t) {
                    var e, i, r = t.x,
                        n = t.y;
                    if (n * p > 90 && n * p < -90 && r * p > 180 && r * p < -180) return null;
                    if (Math.abs(Math.abs(n) - c) <= f) return null;
                    if (this.sphere) e = this.x0 + this.a * this.k0 * G(r - this.long0), i = this.y0 + this.a * this.k0 * Math.log(Math.tan(m + .5 * n));
                    else {
                        var s = Math.sin(n),
                            a = W(this.e, n, s);
                        e = this.x0 + this.a * this.k0 * G(r - this.long0), i = this.y0 - this.a * this.k0 * Math.log(a)
                    }
                    return t.x = e, t.y = i, t
                },
                inverse: function(t) {
                    var e, i, r = t.x - this.x0,
                        n = t.y - this.y0;
                    if (this.sphere) i = c - 2 * Math.atan(Math.exp(-n / (this.a * this.k0)));
                    else {
                        var s = Math.exp(-n / (this.a * this.k0));
                        if (-9999 === (i = Z(this.e, s))) return null
                    }
                    return e = G(this.long0 + r / (this.a * this.k0)), t.x = e, t.y = i, t
                },
                names: ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"]
            }, {
                init: function() {},
                forward: H,
                inverse: H,
                names: ["longlat", "identity"]
            }],
            K = {},
            X = [];

        function $(t, e) {
            var i = X.length;
            return t.names ? (X[i] = t, t.names.forEach((function(t) {
                K[t.toLowerCase()] = i
            })), this) : (console.log(e), !0)
        }
        const Q = {
            start: function() {
                J.forEach($)
            },
            add: $,
            get: function(t) {
                if (!t) return !1;
                var e = t.toLowerCase();
                return void 0 !== K[e] && X[K[e]] ? X[K[e]] : void 0
            }
        };
        var V = {
                MERIT: {
                    a: 6378137,
                    rf: 298.257,
                    ellipseName: "MERIT 1983"
                },
                SGS85: {
                    a: 6378136,
                    rf: 298.257,
                    ellipseName: "Soviet Geodetic System 85"
                },
                GRS80: {
                    a: 6378137,
                    rf: 298.257222101,
                    ellipseName: "GRS 1980(IUGG, 1980)"
                },
                IAU76: {
                    a: 6378140,
                    rf: 298.257,
                    ellipseName: "IAU 1976"
                },
                airy: {
                    a: 6377563.396,
                    b: 6356256.91,
                    ellipseName: "Airy 1830"
                },
                APL4: {
                    a: 6378137,
                    rf: 298.25,
                    ellipseName: "Appl. Physics. 1965"
                },
                NWL9D: {
                    a: 6378145,
                    rf: 298.25,
                    ellipseName: "Naval Weapons Lab., 1965"
                },
                mod_airy: {
                    a: 6377340.189,
                    b: 6356034.446,
                    ellipseName: "Modified Airy"
                },
                andrae: {
                    a: 6377104.43,
                    rf: 300,
                    ellipseName: "Andrae 1876 (Den., Iclnd.)"
                },
                aust_SA: {
                    a: 6378160,
                    rf: 298.25,
                    ellipseName: "Australian Natl & S. Amer. 1969"
                },
                GRS67: {
                    a: 6378160,
                    rf: 298.247167427,
                    ellipseName: "GRS 67(IUGG 1967)"
                },
                bessel: {
                    a: 6377397.155,
                    rf: 299.1528128,
                    ellipseName: "Bessel 1841"
                },
                bess_nam: {
                    a: 6377483.865,
                    rf: 299.1528128,
                    ellipseName: "Bessel 1841 (Namibia)"
                },
                clrk66: {
                    a: 6378206.4,
                    b: 6356583.8,
                    ellipseName: "Clarke 1866"
                },
                clrk80: {
                    a: 6378249.145,
                    rf: 293.4663,
                    ellipseName: "Clarke 1880 mod."
                },
                clrk80ign: {
                    a: 6378249.2,
                    b: 6356515,
                    rf: 293.4660213,
                    ellipseName: "Clarke 1880 (IGN)"
                },
                clrk58: {
                    a: 6378293.645208759,
                    rf: 294.2606763692654,
                    ellipseName: "Clarke 1858"
                },
                CPM: {
                    a: 6375738.7,
                    rf: 334.29,
                    ellipseName: "Comm. des Poids et Mesures 1799"
                },
                delmbr: {
                    a: 6376428,
                    rf: 311.5,
                    ellipseName: "Delambre 1810 (Belgium)"
                },
                engelis: {
                    a: 6378136.05,
                    rf: 298.2566,
                    ellipseName: "Engelis 1985"
                },
                evrst30: {
                    a: 6377276.345,
                    rf: 300.8017,
                    ellipseName: "Everest 1830"
                },
                evrst48: {
                    a: 6377304.063,
                    rf: 300.8017,
                    ellipseName: "Everest 1948"
                },
                evrst56: {
                    a: 6377301.243,
                    rf: 300.8017,
                    ellipseName: "Everest 1956"
                },
                evrst69: {
                    a: 6377295.664,
                    rf: 300.8017,
                    ellipseName: "Everest 1969"
                },
                evrstSS: {
                    a: 6377298.556,
                    rf: 300.8017,
                    ellipseName: "Everest (Sabah & Sarawak)"
                },
                fschr60: {
                    a: 6378166,
                    rf: 298.3,
                    ellipseName: "Fischer (Mercury Datum) 1960"
                },
                fschr60m: {
                    a: 6378155,
                    rf: 298.3,
                    ellipseName: "Fischer 1960"
                },
                fschr68: {
                    a: 6378150,
                    rf: 298.3,
                    ellipseName: "Fischer 1968"
                },
                helmert: {
                    a: 6378200,
                    rf: 298.3,
                    ellipseName: "Helmert 1906"
                },
                hough: {
                    a: 6378270,
                    rf: 297,
                    ellipseName: "Hough"
                },
                intl: {
                    a: 6378388,
                    rf: 297,
                    ellipseName: "International 1909 (Hayford)"
                },
                kaula: {
                    a: 6378163,
                    rf: 298.24,
                    ellipseName: "Kaula 1961"
                },
                lerch: {
                    a: 6378139,
                    rf: 298.257,
                    ellipseName: "Lerch 1979"
                },
                mprts: {
                    a: 6397300,
                    rf: 191,
                    ellipseName: "Maupertius 1738"
                },
                new_intl: {
                    a: 6378157.5,
                    b: 6356772.2,
                    ellipseName: "New International 1967"
                },
                plessis: {
                    a: 6376523,
                    rf: 6355863,
                    ellipseName: "Plessis 1817 (France)"
                },
                krass: {
                    a: 6378245,
                    rf: 298.3,
                    ellipseName: "Krassovsky, 1942"
                },
                SEasia: {
                    a: 6378155,
                    b: 6356773.3205,
                    ellipseName: "Southeast Asia"
                },
                walbeck: {
                    a: 6376896,
                    b: 6355834.8467,
                    ellipseName: "Walbeck"
                },
                WGS60: {
                    a: 6378165,
                    rf: 298.3,
                    ellipseName: "WGS 60"
                },
                WGS66: {
                    a: 6378145,
                    rf: 298.25,
                    ellipseName: "WGS 66"
                },
                WGS7: {
                    a: 6378135,
                    rf: 298.26,
                    ellipseName: "WGS 72"
                }
            },
            Y = V.WGS84 = {
                a: 6378137,
                rf: 298.257223563,
                ellipseName: "WGS 84"
            };
        V.sphere = {
            a: 6370997,
            b: 6370997,
            ellipseName: "Normal Sphere (r=6370997)"
        };
        var tt = {
            wgs84: {
                towgs84: "0,0,0",
                ellipse: "WGS84",
                datumName: "WGS84"
            },
            ch1903: {
                towgs84: "674.374,15.056,405.346",
                ellipse: "bessel",
                datumName: "swiss"
            },
            ggrs87: {
                towgs84: "-199.87,74.79,246.62",
                ellipse: "GRS80",
                datumName: "Greek_Geodetic_Reference_System_1987"
            },
            nad83: {
                towgs84: "0,0,0",
                ellipse: "GRS80",
                datumName: "North_American_Datum_1983"
            },
            nad27: {
                nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
                ellipse: "clrk66",
                datumName: "North_American_Datum_1927"
            },
            potsdam: {
                towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7",
                ellipse: "bessel",
                datumName: "Potsdam Rauenberg 1950 DHDN"
            },
            carthage: {
                towgs84: "-263.0,6.0,431.0",
                ellipse: "clark80",
                datumName: "Carthage 1934 Tunisia"
            },
            hermannskogel: {
                towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
                ellipse: "bessel",
                datumName: "Hermannskogel"
            },
            osni52: {
                towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
                ellipse: "airy",
                datumName: "Irish National"
            },
            ire65: {
                towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
                ellipse: "mod_airy",
                datumName: "Ireland 1965"
            },
            rassadiran: {
                towgs84: "-133.63,-157.5,-158.62",
                ellipse: "intl",
                datumName: "Rassadiran"
            },
            nzgd49: {
                towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
                ellipse: "intl",
                datumName: "New Zealand Geodetic Datum 1949"
            },
            osgb36: {
                towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
                ellipse: "airy",
                datumName: "Airy 1830"
            },
            s_jtsk: {
                towgs84: "589,76,480",
                ellipse: "bessel",
                datumName: "S-JTSK (Ferro)"
            },
            beduaram: {
                towgs84: "-106,-87,188",
                ellipse: "clrk80",
                datumName: "Beduaram"
            },
            gunung_segara: {
                towgs84: "-403,684,41",
                ellipse: "bessel",
                datumName: "Gunung Segara Jakarta"
            },
            rnb72: {
                towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
                ellipse: "intl",
                datumName: "Reseau National Belge 1972"
            }
        };
        var et = {};

        function it(t) {
            if (0 === t.length) return null;
            var e = "@" === t[0];
            return e && (t = t.slice(1)), "null" === t ? {
                name: "null",
                mandatory: !e,
                grid: null,
                isNull: !0
            } : {
                name: t,
                mandatory: !e,
                grid: et[t] || null,
                isNull: !1
            }
        }

        function rt(t) {
            return t / 3600 * Math.PI / 180
        }

        function nt(t, e, i) {
            return String.fromCharCode.apply(null, new Uint8Array(t.buffer.slice(e, i)))
        }

        function st(t) {
            return t.map((function(t) {
                return [rt(t.longitudeShift), rt(t.latitudeShift)]
            }))
        }

        function at(t, e, i) {
            return {
                name: nt(t, e + 8, e + 16).trim(),
                parent: nt(t, e + 24, e + 24 + 8).trim(),
                lowerLatitude: t.getFloat64(e + 72, i),
                upperLatitude: t.getFloat64(e + 88, i),
                lowerLongitude: t.getFloat64(e + 104, i),
                upperLongitude: t.getFloat64(e + 120, i),
                latitudeInterval: t.getFloat64(e + 136, i),
                longitudeInterval: t.getFloat64(e + 152, i),
                gridNodeCount: t.getInt32(e + 168, i)
            }
        }

        function ot(t, e, i, r) {
            for (var n = e + 176, s = [], a = 0; a < i.gridNodeCount; a++) {
                var o = {
                    latitudeShift: t.getFloat32(n + 16 * a, r),
                    longitudeShift: t.getFloat32(n + 16 * a + 4, r),
                    latitudeAccuracy: t.getFloat32(n + 16 * a + 8, r),
                    longitudeAccuracy: t.getFloat32(n + 16 * a + 12, r)
                };
                s.push(o)
            }
            return s
        }

        function ht(t, e) {
            if (!(this instanceof ht)) return new ht(t);
            e = e || function(t) {
                if (t) throw t
            };
            var i = function(t) {
                if (! function(t) {
                        return "string" == typeof t
                    }(t)) return t;
                if (function(t) {
                        return t in T
                    }(t)) return T[t];
                if (function(t) {
                        return j.some((function(e) {
                            return t.indexOf(e) > -1
                        }))
                    }(t)) {
                    var e = z(t);
                    if (function(t) {
                            var e = w(t, "authority");
                            if (e) {
                                var i = w(e, "epsg");
                                return i && F.indexOf(i) > -1
                            }
                        }(e)) return T["EPSG:3857"];
                    var i = function(t) {
                        var e = w(t, "extension");
                        if (e) return w(e, "proj4")
                    }(e);
                    return i ? M(i) : e
                }
                return function(t) {
                    return "+" === t[0]
                }(t) ? M(t) : void 0
            }(t);
            if ("object" == typeof i) {
                var o = ht.projections.get(i.projName);
                if (o) {
                    if (i.datumCode && "none" !== i.datumCode) {
                        var h = w(tt, i.datumCode);
                        h && (i.datum_params = i.datum_params || (h.towgs84 ? h.towgs84.split(",") : null), i.ellps = h.ellipse, i.datumName = h.datumName ? h.datumName : i.datumCode)
                    }
                    i.k0 = i.k0 || 1, i.axis = i.axis || "enu", i.ellps = i.ellps || "wgs84", i.lat1 = i.lat1 || i.lat0;
                    var u, c, d, p, m, g, y = function(t, e, i, r, n) {
                            if (!t) {
                                var s = w(V, r);
                                s || (s = Y), t = s.a, e = s.b, i = s.rf
                            }
                            return i && !e && (e = (1 - 1 / i) * t), (0 === i || Math.abs(t - e) < f) && (n = !0, e = t), {
                                a: t,
                                b: e,
                                rf: i,
                                sphere: n
                            }
                        }(i.a, i.b, i.rf, i.ellps, i.sphere),
                        _ = (u = y.a, c = y.b, y.rf, m = ((d = u * u) - (p = c * c)) / d, g = 0, i.R_A ? (d = (u *= 1 - m * (.16666666666666666 + m * (.04722222222222222 + .022156084656084655 * m))) * u, m = 0) : g = Math.sqrt(m), {
                            es: m,
                            e: g,
                            ep2: (d - p) / p
                        }),
                        v = function(t) {
                            return void 0 === t ? null : t.split(",").map(it)
                        }(i.nadgrids),
                        b = i.datum || function(t, e, i, o, h, u, c) {
                            var f = {};
                            return f.datum_type = void 0 === t || "none" === t ? a : 4, e && (f.datum_params = e.map(parseFloat), 0 === f.datum_params[0] && 0 === f.datum_params[1] && 0 === f.datum_params[2] || (f.datum_type = r), f.datum_params.length > 3 && (0 === f.datum_params[3] && 0 === f.datum_params[4] && 0 === f.datum_params[5] && 0 === f.datum_params[6] || (f.datum_type = n, f.datum_params[3] *= l, f.datum_params[4] *= l, f.datum_params[5] *= l, f.datum_params[6] = f.datum_params[6] / 1e6 + 1))), c && (f.datum_type = s, f.grids = c), f.a = i, f.b = o, f.es = h, f.ep2 = u, f
                        }(i.datumCode, i.datum_params, y.a, y.b, _.es, _.ep2, v);
                    U(this, i), U(this, o), this.a = y.a, this.b = y.b, this.rf = y.rf, this.sphere = y.sphere, this.es = _.es, this.e = _.e, this.ep2 = _.ep2, this.datum = b, this.init(), e(null, this)
                } else e(t)
            } else e(t)
        }
        ht.projections = Q, ht.projections.start();
        const ut = ht;

        function lt(t, e, i) {
            var r, n, s, a, o = t.x,
                h = t.y,
                u = t.z ? t.z : 0;
            if (h < -c && h > -1.001 * c) h = -c;
            else if (h > c && h < 1.001 * c) h = c;
            else {
                if (h < -c) return {
                    x: -1 / 0,
                    y: -1 / 0,
                    z: t.z
                };
                if (h > c) return {
                    x: 1 / 0,
                    y: 1 / 0,
                    z: t.z
                }
            }
            return o > Math.PI && (o -= 2 * Math.PI), n = Math.sin(h), a = Math.cos(h), s = n * n, {
                x: ((r = i / Math.sqrt(1 - e * s)) + u) * a * Math.cos(o),
                y: (r + u) * a * Math.sin(o),
                z: (r * (1 - e) + u) * n
            }
        }

        function ct(t, e, i, r) {
            var n, s, a, o, h, u, l, c, f, d, p, m, g, y, _, v = t.x,
                b = t.y,
                w = t.z ? t.z : 0;
            if (n = Math.sqrt(v * v + b * b), s = Math.sqrt(v * v + b * b + w * w), n / i < 1e-12) {
                if (y = 0, s / i < 1e-12) return _ = -r, {
                    x: t.x,
                    y: t.y,
                    z: t.z
                }
            } else y = Math.atan2(b, v);
            a = w / s, c = (o = n / s) * (1 - e) * (h = 1 / Math.sqrt(1 - e * (2 - e) * o * o)), f = a * h, g = 0;
            do {
                g++, u = e * (l = i / Math.sqrt(1 - e * f * f)) / (l + (_ = n * c + w * f - l * (1 - e * f * f))), m = (p = a * (h = 1 / Math.sqrt(1 - u * (2 - u) * o * o))) * c - (d = o * (1 - u) * h) * f, c = d, f = p
            } while (m * m > 1e-24 && g < 30);
            return {
                x: y,
                y: Math.atan(p / Math.abs(d)),
                z: _
            }
        }

        function ft(t) {
            return t === r || t === n
        }

        function dt(t, e, i) {
            if (null === t.grids || 0 === t.grids.length) return console.log("Grid shift grids not found"), -1;
            for (var r = {
                    x: -i.x,
                    y: i.y
                }, n = {
                    x: Number.NaN,
                    y: Number.NaN
                }, s = [], a = 0; a < t.grids.length; a++) {
                var o = t.grids[a];
                if (s.push(o.name), o.isNull) {
                    n = r;
                    break
                }
                if (o.mandatory, null !== o.grid) {
                    var h = o.grid.subgrids[0],
                        u = (Math.abs(h.del[1]) + Math.abs(h.del[0])) / 1e4,
                        l = h.ll[0] - u,
                        c = h.ll[1] - u,
                        f = h.ll[0] + (h.lim[0] - 1) * h.del[0] + u,
                        d = h.ll[1] + (h.lim[1] - 1) * h.del[1] + u;
                    if (!(c > r.y || l > r.x || d < r.y || f < r.x || (n = pt(r, e, h), isNaN(n.x)))) break
                } else if (o.mandatory) return console.log("Unable to find mandatory grid '" + o.name + "'"), -1
            }
            return isNaN(n.x) ? (console.log("Failed to find a grid shift table for location '" + -r.x * p + " " + r.y * p + " tried: '" + s + "'"), -1) : (i.x = -n.x, i.y = n.y, 0)
        }

        function pt(t, e, i) {
            var r = {
                x: Number.NaN,
                y: Number.NaN
            };
            if (isNaN(t.x)) return r;
            var n = {
                x: t.x,
                y: t.y
            };
            n.x -= i.ll[0], n.y -= i.ll[1], n.x = G(n.x - Math.PI) + Math.PI;
            var s = mt(n, i);
            if (e) {
                if (isNaN(s.x)) return r;
                s.x = n.x - s.x, s.y = n.y - s.y;
                var a, o, h = 9;
                do {
                    if (o = mt(s, i), isNaN(o.x)) {
                        console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
                        break
                    }
                    a = {
                        x: n.x - (o.x + s.x),
                        y: n.y - (o.y + s.y)
                    }, s.x += a.x, s.y += a.y
                } while (h-- && Math.abs(a.x) > 1e-12 && Math.abs(a.y) > 1e-12);
                if (h < 0) return console.log("Inverse grid shift iterator failed to converge."), r;
                r.x = G(s.x + i.ll[0]), r.y = s.y + i.ll[1]
            } else isNaN(s.x) || (r.x = t.x + s.x, r.y = t.y + s.y);
            return r
        }

        function mt(t, e) {
            var i, r = {
                    x: t.x / e.del[0],
                    y: t.y / e.del[1]
                },
                n = Math.floor(r.x),
                s = Math.floor(r.y),
                a = r.x - 1 * n,
                o = r.y - 1 * s,
                h = {
                    x: Number.NaN,
                    y: Number.NaN
                };
            if (n < 0 || n >= e.lim[0]) return h;
            if (s < 0 || s >= e.lim[1]) return h;
            i = s * e.lim[0] + n;
            var u = e.cvs[i][0],
                l = e.cvs[i][1];
            i++;
            var c = e.cvs[i][0],
                f = e.cvs[i][1];
            i += e.lim[0];
            var d = e.cvs[i][0],
                p = e.cvs[i][1];
            i--;
            var m = e.cvs[i][0],
                g = e.cvs[i][1],
                y = a * o,
                _ = a * (1 - o),
                v = (1 - a) * (1 - o),
                b = (1 - a) * o;
            return h.x = v * u + _ * c + b * m + y * d, h.y = v * l + _ * f + b * g + y * p, h
        }

        function gt(t, e, i) {
            var r, n, s, a = i.x,
                o = i.y,
                h = i.z || 0,
                u = {};
            for (s = 0; s < 3; s++)
                if (!e || 2 !== s || void 0 !== i.z) switch (0 === s ? (r = a, n = -1 !== "ew".indexOf(t.axis[s]) ? "x" : "y") : 1 === s ? (r = o, n = -1 !== "ns".indexOf(t.axis[s]) ? "y" : "x") : (r = h, n = "z"), t.axis[s]) {
                    case "e":
                    case "n":
                        u[n] = r;
                        break;
                    case "w":
                    case "s":
                        u[n] = -r;
                        break;
                    case "u":
                        void 0 !== i[n] && (u.z = r);
                        break;
                    case "d":
                        void 0 !== i[n] && (u.z = -r);
                        break;
                    default:
                        return null
                }
            return u
        }

        function yt(t) {
            var e = {
                x: t[0],
                y: t[1]
            };
            return t.length > 2 && (e.z = t[2]), t.length > 3 && (e.m = t[3]), e
        }

        function _t(t) {
            if ("function" == typeof Number.isFinite) {
                if (Number.isFinite(t)) return;
                throw new TypeError("coordinates must be finite numbers")
            }
            if ("number" != typeof t || t != t || !isFinite(t)) throw new TypeError("coordinates must be finite numbers")
        }

        function vt(t, e, i, l) {
            var c, f = void 0 !== (i = Array.isArray(i) ? yt(i) : {
                x: i.x,
                y: i.y,
                z: i.z,
                m: i.m
            }).z;
            if (function(t) {
                    _t(t.x), _t(t.y)
                }(i), t.datum && e.datum && function(t, e) {
                    return (t.datum.datum_type === r || t.datum.datum_type === n || t.datum.datum_type === s) && "WGS84" !== e.datumCode || (e.datum.datum_type === r || e.datum.datum_type === n || e.datum.datum_type === s) && "WGS84" !== t.datumCode
                }(t, e) && (i = vt(t, c = new ut("WGS84"), i, l), t = c), l && "enu" !== t.axis && (i = gt(t, !1, i)), "longlat" === t.projName) i = {
                x: i.x * d,
                y: i.y * d,
                z: i.z || 0
            };
            else if (t.to_meter && (i = {
                    x: i.x * t.to_meter,
                    y: i.y * t.to_meter,
                    z: i.z || 0
                }), !(i = t.inverse(i))) return;
            if (t.from_greenwich && (i.x += t.from_greenwich), i = function(t, e, i) {
                    if (function(t, e) {
                            return t.datum_type === e.datum_type && !(t.a !== e.a || Math.abs(t.es - e.es) > 5e-11) && (t.datum_type === r ? t.datum_params[0] === e.datum_params[0] && t.datum_params[1] === e.datum_params[1] && t.datum_params[2] === e.datum_params[2] : t.datum_type !== n || t.datum_params[0] === e.datum_params[0] && t.datum_params[1] === e.datum_params[1] && t.datum_params[2] === e.datum_params[2] && t.datum_params[3] === e.datum_params[3] && t.datum_params[4] === e.datum_params[4] && t.datum_params[5] === e.datum_params[5] && t.datum_params[6] === e.datum_params[6])
                        }(t, e)) return i;
                    if (t.datum_type === a || e.datum_type === a) return i;
                    var l = t.a,
                        c = t.es;
                    if (t.datum_type === s) {
                        if (0 !== dt(t, !1, i)) return;
                        l = o, c = u
                    }
                    var f = e.a,
                        d = e.b,
                        p = e.es;
                    return e.datum_type === s && (f = o, d = h, p = u), c !== p || l !== f || ft(t.datum_type) || ft(e.datum_type) ? (i = lt(i, c, l), ft(t.datum_type) && (i = function(t, e, i) {
                        if (e === r) return {
                            x: t.x + i[0],
                            y: t.y + i[1],
                            z: t.z + i[2]
                        };
                        if (e === n) {
                            var s = i[0],
                                a = i[1],
                                o = i[2],
                                h = i[3],
                                u = i[4],
                                l = i[5],
                                c = i[6];
                            return {
                                x: c * (t.x - l * t.y + u * t.z) + s,
                                y: c * (l * t.x + t.y - h * t.z) + a,
                                z: c * (-u * t.x + h * t.y + t.z) + o
                            }
                        }
                    }(i, t.datum_type, t.datum_params)), ft(e.datum_type) && (i = function(t, e, i) {
                        if (e === r) return {
                            x: t.x - i[0],
                            y: t.y - i[1],
                            z: t.z - i[2]
                        };
                        if (e === n) {
                            var s = i[0],
                                a = i[1],
                                o = i[2],
                                h = i[3],
                                u = i[4],
                                l = i[5],
                                c = i[6],
                                f = (t.x - s) / c,
                                d = (t.y - a) / c,
                                p = (t.z - o) / c;
                            return {
                                x: f + l * d - u * p,
                                y: -l * f + d + h * p,
                                z: u * f - h * d + p
                            }
                        }
                    }(i, e.datum_type, e.datum_params)), i = ct(i, p, f, d), e.datum_type !== s || 0 === dt(e, !0, i) ? i : void 0) : i
                }(t.datum, e.datum, i)) return e.from_greenwich && (i = {
                x: i.x - e.from_greenwich,
                y: i.y,
                z: i.z || 0
            }), "longlat" === e.projName ? i = {
                x: i.x * p,
                y: i.y * p,
                z: i.z || 0
            } : (i = e.forward(i), e.to_meter && (i = {
                x: i.x / e.to_meter,
                y: i.y / e.to_meter,
                z: i.z || 0
            })), l && "enu" !== e.axis ? gt(e, !0, i) : (f || delete i.z, i)
        }
        var bt = ut("WGS84");

        function wt(t, e, i, r) {
            var n, s, a;
            return Array.isArray(i) ? (n = vt(t, e, i, r) || {
                x: NaN,
                y: NaN
            }, i.length > 2 ? void 0 !== t.name && "geocent" === t.name || void 0 !== e.name && "geocent" === e.name ? "number" == typeof n.z ? [n.x, n.y, n.z].concat(i.splice(3)) : [n.x, n.y, i[2]].concat(i.splice(3)) : [n.x, n.y].concat(i.splice(2)) : [n.x, n.y]) : (s = vt(t, e, i, r), 2 === (a = Object.keys(i)).length || a.forEach((function(r) {
                if (void 0 !== t.name && "geocent" === t.name || void 0 !== e.name && "geocent" === e.name) {
                    if ("x" === r || "y" === r || "z" === r) return
                } else if ("x" === r || "y" === r) return;
                s[r] = i[r]
            })), s)
        }

        function Mt(t) {
            return t instanceof ut ? t : t.oProj ? t.oProj : ut(t)
        }
        const xt = function(t, e, i) {
            t = Mt(t);
            var r, n = !1;
            return void 0 === e ? (e = t, t = bt, n = !0) : (void 0 !== e.x || Array.isArray(e)) && (i = e, e = t, t = bt, n = !0), e = Mt(e), i ? wt(t, e, i) : (r = {
                forward: function(i, r) {
                    return wt(t, e, i, r)
                },
                inverse: function(i, r) {
                    return wt(e, t, i, r)
                }
            }, n && (r.oProj = e), r)
        };
        var kt = 6,
            Et = "AJSAJS",
            Ct = "AFAFAF",
            St = 65,
            At = 73,
            It = 79,
            Ot = 86,
            Bt = 90;
        const Nt = {
            forward: Lt,
            inverse: function(t) {
                var e = Tt(Ft(t.toUpperCase()));
                return e.lat && e.lon ? [e.lon, e.lat, e.lon, e.lat] : [e.left, e.bottom, e.right, e.top]
            },
            toPoint: Pt
        };

        function Lt(t, e) {
            return e = e || 5,
                function(t, e) {
                    var i, r, n, s, a, o, h, u, l, c, f, d = "00000" + t.easting,
                        p = "00000" + t.northing;
                    return t.zoneNumber + t.zoneLetter + (l = t.easting, c = t.northing, f = jt(t.zoneNumber), i = Math.floor(l / 1e5), r = Math.floor(c / 1e5) % 20, n = f - 1, s = Et.charCodeAt(n), a = Ct.charCodeAt(n), u = !1, (o = s + i - 1) > Bt && (o = o - Bt + St - 1, u = !0), (o === At || s < At && o > At || (o > At || s < At) && u) && o++, (o === It || s < It && o > It || (o > It || s < It) && u) && ++o === At && o++, o > Bt && (o = o - Bt + St - 1), (h = a + r) > Ot ? (h = h - Ot + St - 1, u = !0) : u = !1, (h === At || a < At && h > At || (h > At || a < At) && u) && h++, (h === It || a < It && h > It || (h > It || a < It) && u) && ++h === At && h++, h > Ot && (h = h - Ot + St - 1), String.fromCharCode(o) + String.fromCharCode(h)) + d.substr(d.length - 5, e) + p.substr(p.length - 5, e)
                }(function(t) {
                    var e, i, r, n, s, a, o, h = t.lat,
                        u = t.lon,
                        l = 6378137,
                        c = .00669438,
                        f = .9996,
                        d = zt(h),
                        p = zt(u);
                    o = Math.floor((u + 180) / 6) + 1, 180 === u && (o = 60), h >= 56 && h < 64 && u >= 3 && u < 12 && (o = 32), h >= 72 && h < 84 && (u >= 0 && u < 9 ? o = 31 : u >= 9 && u < 21 ? o = 33 : u >= 21 && u < 33 ? o = 35 : u >= 33 && u < 42 && (o = 37)), a = zt(6 * (o - 1) - 180 + 3), e = .006739496752268451, i = l / Math.sqrt(1 - c * Math.sin(d) * Math.sin(d)), r = Math.tan(d) * Math.tan(d), n = e * Math.cos(d) * Math.cos(d);
                    var m, g, y = f * i * ((s = Math.cos(d) * (p - a)) + (1 - r + n) * s * s * s / 6 + (5 - 18 * r + r * r + 72 * n - 58 * e) * s * s * s * s * s / 120) + 5e5,
                        _ = f * (l * (.9983242984503243 * d - .002514607064228144 * Math.sin(2 * d) + 2639046602129982e-21 * Math.sin(4 * d) - 3.418046101696858e-9 * Math.sin(6 * d)) + i * Math.tan(d) * (s * s / 2 + (5 - r + 9 * n + 4 * n * n) * s * s * s * s / 24 + (61 - 58 * r + r * r + 600 * n - 2.2240339282485886) * s * s * s * s * s * s / 720));
                    return h < 0 && (_ += 1e7), {
                        northing: Math.round(_),
                        easting: Math.round(y),
                        zoneNumber: o,
                        zoneLetter: (m = h, g = "Z", 84 >= m && m >= 72 ? g = "X" : 72 > m && m >= 64 ? g = "W" : 64 > m && m >= 56 ? g = "V" : 56 > m && m >= 48 ? g = "U" : 48 > m && m >= 40 ? g = "T" : 40 > m && m >= 32 ? g = "S" : 32 > m && m >= 24 ? g = "R" : 24 > m && m >= 16 ? g = "Q" : 16 > m && m >= 8 ? g = "P" : 8 > m && m >= 0 ? g = "N" : 0 > m && m >= -8 ? g = "M" : -8 > m && m >= -16 ? g = "L" : -16 > m && m >= -24 ? g = "K" : -24 > m && m >= -32 ? g = "J" : -32 > m && m >= -40 ? g = "H" : -40 > m && m >= -48 ? g = "G" : -48 > m && m >= -56 ? g = "F" : -56 > m && m >= -64 ? g = "E" : -64 > m && m >= -72 ? g = "D" : -72 > m && m >= -80 && (g = "C"), g)
                    }
                }({
                    lat: t[1],
                    lon: t[0]
                }), e)
        }

        function Pt(t) {
            var e = Tt(Ft(t.toUpperCase()));
            return e.lat && e.lon ? [e.lon, e.lat] : [(e.left + e.right) / 2, (e.top + e.bottom) / 2]
        }

        function zt(t) {
            return t * (Math.PI / 180)
        }

        function Rt(t) {
            return t / Math.PI * 180
        }

        function Tt(t) {
            var e = t.northing,
                i = t.easting,
                r = t.zoneLetter,
                n = t.zoneNumber;
            if (n < 0 || n > 60) return null;
            var s, a, o, h, u, l, c, f, d, p = .9996,
                m = 6378137,
                g = .00669438,
                y = (1 - Math.sqrt(.99330562)) / (1 + Math.sqrt(.99330562)),
                _ = i - 5e5,
                v = e;
            r < "N" && (v -= 1e7), c = 6 * (n - 1) - 180 + 3, s = .006739496752268451, d = (f = v / p / 6367449.145945056) + (3 * y / 2 - 27 * y * y * y / 32) * Math.sin(2 * f) + (21 * y * y / 16 - 55 * y * y * y * y / 32) * Math.sin(4 * f) + 151 * y * y * y / 96 * Math.sin(6 * f), a = m / Math.sqrt(1 - g * Math.sin(d) * Math.sin(d)), o = Math.tan(d) * Math.tan(d), h = s * Math.cos(d) * Math.cos(d), u = .99330562 * m / Math.pow(1 - g * Math.sin(d) * Math.sin(d), 1.5), l = _ / (a * p);
            var b = d - a * Math.tan(d) / u * (l * l / 2 - (5 + 3 * o + 10 * h - 4 * h * h - 9 * s) * l * l * l * l / 24 + (61 + 90 * o + 298 * h + 45 * o * o - 1.6983531815716497 - 3 * h * h) * l * l * l * l * l * l / 720);
            b = Rt(b);
            var w, M = (l - (1 + 2 * o + h) * l * l * l / 6 + (5 - 2 * h + 28 * o - 3 * h * h + 8 * s + 24 * o * o) * l * l * l * l * l / 120) / Math.cos(d);
            if (M = c + Rt(M), t.accuracy) {
                var x = Tt({
                    northing: t.northing + t.accuracy,
                    easting: t.easting + t.accuracy,
                    zoneLetter: t.zoneLetter,
                    zoneNumber: t.zoneNumber
                });
                w = {
                    top: x.lat,
                    right: x.lon,
                    bottom: b,
                    left: M
                }
            } else w = {
                lat: b,
                lon: M
            };
            return w
        }

        function jt(t) {
            var e = t % kt;
            return 0 === e && (e = kt), e
        }

        function Ft(t) {
            if (t && 0 === t.length) throw "MGRSPoint coverting from nothing";
            for (var e, i = t.length, r = null, n = "", s = 0; !/[A-Z]/.test(e = t.charAt(s));) {
                if (s >= 2) throw "MGRSPoint bad conversion from: " + t;
                n += e, s++
            }
            var a = parseInt(n, 10);
            if (0 === s || s + 3 > i) throw "MGRSPoint bad conversion from: " + t;
            var o = t.charAt(s++);
            if (o <= "A" || "B" === o || "Y" === o || o >= "Z" || "I" === o || "O" === o) throw "MGRSPoint zone letter " + o + " not handled: " + t;
            r = t.substring(s, s += 2);
            for (var h = jt(a), u = function(t, e) {
                    for (var i = Et.charCodeAt(e - 1), r = 1e5, n = !1; i !== t.charCodeAt(0);) {
                        if (++i === At && i++, i === It && i++, i > Bt) {
                            if (n) throw "Bad character: " + t;
                            i = St, n = !0
                        }
                        r += 1e5
                    }
                    return r
                }(r.charAt(0), h), l = function(t, e) {
                    if (t > "V") throw "MGRSPoint given invalid Northing " + t;
                    for (var i = Ct.charCodeAt(e - 1), r = 0, n = !1; i !== t.charCodeAt(0);) {
                        if (++i === At && i++, i === It && i++, i > Ot) {
                            if (n) throw "Bad character: " + t;
                            i = St, n = !0
                        }
                        r += 1e5
                    }
                    return r
                }(r.charAt(1), h); l < Ut(o);) l += 2e6;
            var c = i - s;
            if (c % 2 != 0) throw "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + t;
            var f, d, p, m = c / 2,
                g = 0,
                y = 0;
            return m > 0 && (f = 1e5 / Math.pow(10, m), d = t.substring(s, s + m), g = parseFloat(d) * f, p = t.substring(s + m), y = parseFloat(p) * f), {
                easting: g + u,
                northing: y + l,
                zoneLetter: o,
                zoneNumber: a,
                accuracy: f
            }
        }

        function Ut(t) {
            var e;
            switch (t) {
                case "C":
                    e = 11e5;
                    break;
                case "D":
                    e = 2e6;
                    break;
                case "E":
                    e = 28e5;
                    break;
                case "F":
                    e = 37e5;
                    break;
                case "G":
                    e = 46e5;
                    break;
                case "H":
                    e = 55e5;
                    break;
                case "J":
                    e = 64e5;
                    break;
                case "K":
                    e = 73e5;
                    break;
                case "L":
                    e = 82e5;
                    break;
                case "M":
                    e = 91e5;
                    break;
                case "N":
                    e = 0;
                    break;
                case "P":
                    e = 8e5;
                    break;
                case "Q":
                    e = 17e5;
                    break;
                case "R":
                    e = 26e5;
                    break;
                case "S":
                    e = 35e5;
                    break;
                case "T":
                    e = 44e5;
                    break;
                case "U":
                    e = 53e5;
                    break;
                case "V":
                    e = 62e5;
                    break;
                case "W":
                    e = 7e6;
                    break;
                case "X":
                    e = 79e5;
                    break;
                default:
                    e = -1
            }
            if (e >= 0) return e;
            throw "Invalid zone letter: " + t
        }

        function Dt(t, e, i) {
            if (!(this instanceof Dt)) return new Dt(t, e, i);
            if (Array.isArray(t)) this.x = t[0], this.y = t[1], this.z = t[2] || 0;
            else if ("object" == typeof t) this.x = t.x, this.y = t.y, this.z = t.z || 0;
            else if ("string" == typeof t && void 0 === e) {
                var r = t.split(",");
                this.x = parseFloat(r[0], 10), this.y = parseFloat(r[1], 10), this.z = parseFloat(r[2], 10) || 0
            } else this.x = t, this.y = e, this.z = i || 0;
            console.warn("proj4.Point will be removed in version 3, use proj4.toPoint")
        }
        Dt.fromMGRS = function(t) {
            return new Dt(Pt(t))
        }, Dt.prototype.toMGRS = function(t) {
            return Lt([this.x, this.y], t)
        };
        const qt = Dt;
        var Gt = .046875,
            Wt = .01953125,
            Zt = .01068115234375;

        function Ht(t) {
            var e = [];
            e[0] = 1 - t * (.25 + t * (Gt + t * (Wt + t * Zt))), e[1] = t * (.75 - t * (Gt + t * (Wt + t * Zt)));
            var i = t * t;
            return e[2] = i * (.46875 - t * (.013020833333333334 + .007120768229166667 * t)), i *= t, e[3] = i * (.3645833333333333 - .005696614583333333 * t), e[4] = i * t * .3076171875, e
        }

        function Jt(t, e, i, r) {
            return i *= e, e *= e, r[0] * t - i * (r[1] + e * (r[2] + e * (r[3] + e * r[4])))
        }

        function Kt(t, e, i) {
            for (var r = 1 / (1 - e), n = t, s = 20; s; --s) {
                var a = Math.sin(n),
                    o = 1 - e * a * a;
                if (n -= o = (Jt(n, a, Math.cos(n), i) - t) * (o * Math.sqrt(o)) * r, Math.abs(o) < f) return n
            }
            return n
        }
        const Xt = {
            init: function() {
                this.x0 = void 0 !== this.x0 ? this.x0 : 0, this.y0 = void 0 !== this.y0 ? this.y0 : 0, this.long0 = void 0 !== this.long0 ? this.long0 : 0, this.lat0 = void 0 !== this.lat0 ? this.lat0 : 0, this.es && (this.en = Ht(this.es), this.ml0 = Jt(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en))
            },
            forward: function(t) {
                var e, i, r, n = t.x,
                    s = t.y,
                    a = G(n - this.long0),
                    o = Math.sin(s),
                    h = Math.cos(s);
                if (this.es) {
                    var u = h * a,
                        l = Math.pow(u, 2),
                        c = this.ep2 * Math.pow(h, 2),
                        d = Math.pow(c, 2),
                        p = Math.abs(h) > f ? Math.tan(s) : 0,
                        m = Math.pow(p, 2),
                        g = Math.pow(m, 2);
                    e = 1 - this.es * Math.pow(o, 2), u /= Math.sqrt(e);
                    var y = Jt(s, o, h, this.en);
                    i = this.a * (this.k0 * u * (1 + l / 6 * (1 - m + c + l / 20 * (5 - 18 * m + g + 14 * c - 58 * m * c + l / 42 * (61 + 179 * g - g * m - 479 * m))))) + this.x0, r = this.a * (this.k0 * (y - this.ml0 + o * a * u / 2 * (1 + l / 12 * (5 - m + 9 * c + 4 * d + l / 30 * (61 + g - 58 * m + 270 * c - 330 * m * c + l / 56 * (1385 + 543 * g - g * m - 3111 * m)))))) + this.y0
                } else {
                    var _ = h * Math.sin(a);
                    if (Math.abs(Math.abs(_) - 1) < f) return 93;
                    if (i = .5 * this.a * this.k0 * Math.log((1 + _) / (1 - _)) + this.x0, r = h * Math.cos(a) / Math.sqrt(1 - Math.pow(_, 2)), (_ = Math.abs(r)) >= 1) {
                        if (_ - 1 > f) return 93;
                        r = 0
                    } else r = Math.acos(r);
                    s < 0 && (r = -r), r = this.a * this.k0 * (r - this.lat0) + this.y0
                }
                return t.x = i, t.y = r, t
            },
            inverse: function(t) {
                var e, i, r, n, s = (t.x - this.x0) * (1 / this.a),
                    a = (t.y - this.y0) * (1 / this.a);
                if (this.es)
                    if (i = Kt(e = this.ml0 + a / this.k0, this.es, this.en), Math.abs(i) < c) {
                        var o = Math.sin(i),
                            h = Math.cos(i),
                            u = Math.abs(h) > f ? Math.tan(i) : 0,
                            l = this.ep2 * Math.pow(h, 2),
                            d = Math.pow(l, 2),
                            p = Math.pow(u, 2),
                            m = Math.pow(p, 2);
                        e = 1 - this.es * Math.pow(o, 2);
                        var g = s * Math.sqrt(e) / this.k0,
                            y = Math.pow(g, 2);
                        r = i - (e *= u) * y / (1 - this.es) * .5 * (1 - y / 12 * (5 + 3 * p - 9 * l * p + l - 4 * d - y / 30 * (61 + 90 * p - 252 * l * p + 45 * m + 46 * l - y / 56 * (1385 + 3633 * p + 4095 * m + 1574 * m * p)))), n = G(this.long0 + g * (1 - y / 6 * (1 + 2 * p + l - y / 20 * (5 + 28 * p + 24 * m + 8 * l * p + 6 * l - y / 42 * (61 + 662 * p + 1320 * m + 720 * m * p)))) / h)
                    } else r = c * q(a), n = 0;
                else {
                    var _ = Math.exp(s / this.k0),
                        v = .5 * (_ - 1 / _),
                        b = this.lat0 + a / this.k0,
                        w = Math.cos(b);
                    e = Math.sqrt((1 - Math.pow(w, 2)) / (1 + Math.pow(v, 2))), r = Math.asin(e), a < 0 && (r = -r), n = 0 === v && 0 === w ? 0 : G(Math.atan2(v, w) + this.long0)
                }
                return t.x = n, t.y = r, t
            },
            names: ["Fast_Transverse_Mercator", "Fast Transverse Mercator"]
        };

        function $t(t) {
            var e = Math.exp(t);
            return (e - 1 / e) / 2
        }

        function Qt(t, e) {
            t = Math.abs(t), e = Math.abs(e);
            var i = Math.max(t, e),
                r = Math.min(t, e) / (i || 1);
            return i * Math.sqrt(1 + Math.pow(r, 2))
        }

        function Vt(t, e) {
            for (var i, r = 2 * Math.cos(2 * e), n = t.length - 1, s = t[n], a = 0; --n >= 0;) i = r * s - a + t[n], a = s, s = i;
            return e + i * Math.sin(2 * e)
        }

        function Yt(t, e, i) {
            for (var r, n, s = Math.sin(e), a = Math.cos(e), o = $t(i), h = function(t) {
                    var e = Math.exp(t);
                    return (e + 1 / e) / 2
                }(i), u = 2 * a * h, l = -2 * s * o, c = t.length - 1, f = t[c], d = 0, p = 0, m = 0; --c >= 0;) r = p, n = d, f = u * (p = f) - r - l * (d = m) + t[c], m = l * p - n + u * d;
            return [(u = s * h) * f - (l = a * o) * m, u * m + l * f]
        }
        const te = {
                init: function() {
                    if (!this.approx && (isNaN(this.es) || this.es <= 0)) throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');
                    this.approx && (Xt.init.apply(this), this.forward = Xt.forward, this.inverse = Xt.inverse), this.x0 = void 0 !== this.x0 ? this.x0 : 0, this.y0 = void 0 !== this.y0 ? this.y0 : 0, this.long0 = void 0 !== this.long0 ? this.long0 : 0, this.lat0 = void 0 !== this.lat0 ? this.lat0 : 0, this.cgb = [], this.cbg = [], this.utg = [], this.gtu = [];
                    var t = this.es / (1 + Math.sqrt(1 - this.es)),
                        e = t / (2 - t),
                        i = e;
                    this.cgb[0] = e * (2 + e * (-2 / 3 + e * (e * (116 / 45 + e * (26 / 45 + e * (-2854 / 675))) - 2))), this.cbg[0] = e * (e * (2 / 3 + e * (4 / 3 + e * (-82 / 45 + e * (32 / 45 + e * (4642 / 4725))))) - 2), i *= e, this.cgb[1] = i * (7 / 3 + e * (e * (-227 / 45 + e * (2704 / 315 + e * (2323 / 945))) - 1.6)), this.cbg[1] = i * (5 / 3 + e * (-16 / 15 + e * (-13 / 9 + e * (904 / 315 + e * (-1522 / 945))))), i *= e, this.cgb[2] = i * (56 / 15 + e * (-136 / 35 + e * (-1262 / 105 + e * (73814 / 2835)))), this.cbg[2] = i * (-26 / 15 + e * (34 / 21 + e * (1.6 + e * (-12686 / 2835)))), i *= e, this.cgb[3] = i * (4279 / 630 + e * (-332 / 35 + e * (-399572 / 14175))), this.cbg[3] = i * (1237 / 630 + e * (e * (-24832 / 14175) - 2.4)), i *= e, this.cgb[4] = i * (4174 / 315 + e * (-144838 / 6237)), this.cbg[4] = i * (-734 / 315 + e * (109598 / 31185)), i *= e, this.cgb[5] = i * (601676 / 22275), this.cbg[5] = i * (444337 / 155925), i = Math.pow(e, 2), this.Qn = this.k0 / (1 + e) * (1 + i * (1 / 4 + i * (1 / 64 + i / 256))), this.utg[0] = e * (e * (2 / 3 + e * (-37 / 96 + e * (1 / 360 + e * (81 / 512 + e * (-96199 / 604800))))) - .5), this.gtu[0] = e * (.5 + e * (-2 / 3 + e * (5 / 16 + e * (41 / 180 + e * (-127 / 288 + e * (7891 / 37800)))))), this.utg[1] = i * (-1 / 48 + e * (-1 / 15 + e * (437 / 1440 + e * (-46 / 105 + e * (1118711 / 3870720))))), this.gtu[1] = i * (13 / 48 + e * (e * (557 / 1440 + e * (281 / 630 + e * (-1983433 / 1935360))) - .6)), i *= e, this.utg[2] = i * (-17 / 480 + e * (37 / 840 + e * (209 / 4480 + e * (-5569 / 90720)))), this.gtu[2] = i * (61 / 240 + e * (-103 / 140 + e * (15061 / 26880 + e * (167603 / 181440)))), i *= e, this.utg[3] = i * (-4397 / 161280 + e * (11 / 504 + e * (830251 / 7257600))), this.gtu[3] = i * (49561 / 161280 + e * (-179 / 168 + e * (6601661 / 7257600))), i *= e, this.utg[4] = i * (-4583 / 161280 + e * (108847 / 3991680)), this.gtu[4] = i * (34729 / 80640 + e * (-3418889 / 1995840)), i *= e, this.utg[5] = i * (-20648693 / 638668800), this.gtu[5] = .6650675310896665 * i;
                    var r = Vt(this.cbg, this.lat0);
                    this.Zb = -this.Qn * (r + function(t, e) {
                        for (var i, r = 2 * Math.cos(e), n = t.length - 1, s = t[n], a = 0; --n >= 0;) i = r * s - a + t[n], a = s, s = i;
                        return Math.sin(e) * i
                    }(this.gtu, 2 * r))
                },
                forward: function(t) {
                    var e = G(t.x - this.long0),
                        i = t.y;
                    i = Vt(this.cbg, i);
                    var r = Math.sin(i),
                        n = Math.cos(i),
                        s = Math.sin(e),
                        a = Math.cos(e);
                    i = Math.atan2(r, a * n), e = Math.atan2(s * n, Qt(r, n * a)), e = function(t) {
                        var e = Math.abs(t);
                        return e = function(t) {
                            var e = 1 + t,
                                i = e - 1;
                            return 0 === i ? t : t * Math.log(e) / i
                        }(e * (1 + e / (Qt(1, e) + 1))), t < 0 ? -e : e
                    }(Math.tan(e));
                    var o, h, u = Yt(this.gtu, 2 * i, 2 * e);
                    return i += u[0], e += u[1], Math.abs(e) <= 2.623395162778 ? (o = this.a * (this.Qn * e) + this.x0, h = this.a * (this.Qn * i + this.Zb) + this.y0) : (o = 1 / 0, h = 1 / 0), t.x = o, t.y = h, t
                },
                inverse: function(t) {
                    var e, i, r = (t.x - this.x0) * (1 / this.a),
                        n = (t.y - this.y0) * (1 / this.a);
                    if (n = (n - this.Zb) / this.Qn, r /= this.Qn, Math.abs(r) <= 2.623395162778) {
                        var s = Yt(this.utg, 2 * n, 2 * r);
                        n += s[0], r += s[1], r = Math.atan($t(r));
                        var a = Math.sin(n),
                            o = Math.cos(n),
                            h = Math.sin(r),
                            u = Math.cos(r);
                        n = Math.atan2(a * u, Qt(h, u * o)), e = G((r = Math.atan2(h, u * o)) + this.long0), i = Vt(this.cgb, n)
                    } else e = 1 / 0, i = 1 / 0;
                    return t.x = e, t.y = i, t
                },
                names: ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc", "Transverse_Mercator", "Transverse Mercator", "tmerc"]
            },
            ee = {
                init: function() {
                    var t = function(t, e) {
                        if (void 0 === t) {
                            if ((t = Math.floor(30 * (G(e) + Math.PI) / Math.PI) + 1) < 0) return 0;
                            if (t > 60) return 60
                        }
                        return t
                    }(this.zone, this.long0);
                    if (void 0 === t) throw new Error("unknown utm zone");
                    this.lat0 = 0, this.long0 = (6 * Math.abs(t) - 183) * d, this.x0 = 5e5, this.y0 = this.utmSouth ? 1e7 : 0, this.k0 = .9996, te.init.apply(this), this.forward = te.forward, this.inverse = te.inverse
                },
                names: ["Universal Transverse Mercator System", "utm"],
                dependsOn: "etmerc"
            };

        function ie(t, e) {
            return Math.pow((1 - t) / (1 + t), e)
        }
        const re = {
                init: function() {
                    var t = Math.sin(this.lat0),
                        e = Math.cos(this.lat0);
                    e *= e, this.rc = Math.sqrt(1 - this.es) / (1 - this.es * t * t), this.C = Math.sqrt(1 + this.es * e * e / (1 - this.es)), this.phic0 = Math.asin(t / this.C), this.ratexp = .5 * this.C * this.e, this.K = Math.tan(.5 * this.phic0 + m) / (Math.pow(Math.tan(.5 * this.lat0 + m), this.C) * ie(this.e * t, this.ratexp))
                },
                forward: function(t) {
                    var e = t.x,
                        i = t.y;
                    return t.y = 2 * Math.atan(this.K * Math.pow(Math.tan(.5 * i + m), this.C) * ie(this.e * Math.sin(i), this.ratexp)) - c, t.x = this.C * e, t
                },
                inverse: function(t) {
                    for (var e = t.x / this.C, i = t.y, r = Math.pow(Math.tan(.5 * i + m) / this.K, 1 / this.C), n = 20; n > 0 && (i = 2 * Math.atan(r * ie(this.e * Math.sin(t.y), -.5 * this.e)) - c, !(Math.abs(i - t.y) < 1e-14)); --n) t.y = i;
                    return n ? (t.x = e, t.y = i, t) : null
                },
                names: ["gauss"]
            },
            ne = {
                init: function() {
                    re.init.apply(this), this.rc && (this.sinc0 = Math.sin(this.phic0), this.cosc0 = Math.cos(this.phic0), this.R2 = 2 * this.rc, this.title || (this.title = "Oblique Stereographic Alternative"))
                },
                forward: function(t) {
                    var e, i, r, n;
                    return t.x = G(t.x - this.long0), re.forward.apply(this, [t]), e = Math.sin(t.y), i = Math.cos(t.y), r = Math.cos(t.x), n = this.k0 * this.R2 / (1 + this.sinc0 * e + this.cosc0 * i * r), t.x = n * i * Math.sin(t.x), t.y = n * (this.cosc0 * e - this.sinc0 * i * r), t.x = this.a * t.x + this.x0, t.y = this.a * t.y + this.y0, t
                },
                inverse: function(t) {
                    var e, i, r, n, s;
                    if (t.x = (t.x - this.x0) / this.a, t.y = (t.y - this.y0) / this.a, t.x /= this.k0, t.y /= this.k0, s = Math.sqrt(t.x * t.x + t.y * t.y)) {
                        var a = 2 * Math.atan2(s, this.R2);
                        e = Math.sin(a), i = Math.cos(a), n = Math.asin(i * this.sinc0 + t.y * e * this.cosc0 / s), r = Math.atan2(t.x * e, s * this.cosc0 * i - t.y * this.sinc0 * e)
                    } else n = this.phic0, r = 0;
                    return t.x = r, t.y = n, re.inverse.apply(this, [t]), t.x = G(t.x + this.long0), t
                },
                names: ["Stereographic_North_Pole", "Oblique_Stereographic", "Polar_Stereographic", "sterea", "Oblique Stereographic Alternative", "Double_Stereographic"]
            },
            se = {
                init: function() {
                    this.coslat0 = Math.cos(this.lat0), this.sinlat0 = Math.sin(this.lat0), this.sphere ? 1 === this.k0 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= f && (this.k0 = .5 * (1 + q(this.lat0) * Math.sin(this.lat_ts))) : (Math.abs(this.coslat0) <= f && (this.lat0 > 0 ? this.con = 1 : this.con = -1), this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e)), 1 === this.k0 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= f && (this.k0 = .5 * this.cons * D(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / W(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts))), this.ms1 = D(this.e, this.sinlat0, this.coslat0), this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - c, this.cosX0 = Math.cos(this.X0), this.sinX0 = Math.sin(this.X0))
                },
                forward: function(t) {
                    var e, i, r, n, s, a, o = t.x,
                        h = t.y,
                        u = Math.sin(h),
                        l = Math.cos(h),
                        d = G(o - this.long0);
                    return Math.abs(Math.abs(o - this.long0) - Math.PI) <= f && Math.abs(h + this.lat0) <= f ? (t.x = NaN, t.y = NaN, t) : this.sphere ? (e = 2 * this.k0 / (1 + this.sinlat0 * u + this.coslat0 * l * Math.cos(d)), t.x = this.a * e * l * Math.sin(d) + this.x0, t.y = this.a * e * (this.coslat0 * u - this.sinlat0 * l * Math.cos(d)) + this.y0, t) : (i = 2 * Math.atan(this.ssfn_(h, u, this.e)) - c, n = Math.cos(i), r = Math.sin(i), Math.abs(this.coslat0) <= f ? (s = W(this.e, h * this.con, this.con * u), a = 2 * this.a * this.k0 * s / this.cons, t.x = this.x0 + a * Math.sin(o - this.long0), t.y = this.y0 - this.con * a * Math.cos(o - this.long0), t) : (Math.abs(this.sinlat0) < f ? (e = 2 * this.a * this.k0 / (1 + n * Math.cos(d)), t.y = e * r) : (e = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * r + this.cosX0 * n * Math.cos(d))), t.y = e * (this.cosX0 * r - this.sinX0 * n * Math.cos(d)) + this.y0), t.x = e * n * Math.sin(d) + this.x0, t))
                },
                inverse: function(t) {
                    var e, i, r, n, s;
                    t.x -= this.x0, t.y -= this.y0;
                    var a = Math.sqrt(t.x * t.x + t.y * t.y);
                    if (this.sphere) {
                        var o = 2 * Math.atan(a / (2 * this.a * this.k0));
                        return e = this.long0, i = this.lat0, a <= f ? (t.x = e, t.y = i, t) : (i = Math.asin(Math.cos(o) * this.sinlat0 + t.y * Math.sin(o) * this.coslat0 / a), e = Math.abs(this.coslat0) < f ? this.lat0 > 0 ? G(this.long0 + Math.atan2(t.x, -1 * t.y)) : G(this.long0 + Math.atan2(t.x, t.y)) : G(this.long0 + Math.atan2(t.x * Math.sin(o), a * this.coslat0 * Math.cos(o) - t.y * this.sinlat0 * Math.sin(o))), t.x = e, t.y = i, t)
                    }
                    if (Math.abs(this.coslat0) <= f) {
                        if (a <= f) return i = this.lat0, e = this.long0, t.x = e, t.y = i, t;
                        t.x *= this.con, t.y *= this.con, r = a * this.cons / (2 * this.a * this.k0), i = this.con * Z(this.e, r), e = this.con * G(this.con * this.long0 + Math.atan2(t.x, -1 * t.y))
                    } else n = 2 * Math.atan(a * this.cosX0 / (2 * this.a * this.k0 * this.ms1)), e = this.long0, a <= f ? s = this.X0 : (s = Math.asin(Math.cos(n) * this.sinX0 + t.y * Math.sin(n) * this.cosX0 / a), e = G(this.long0 + Math.atan2(t.x * Math.sin(n), a * this.cosX0 * Math.cos(n) - t.y * this.sinX0 * Math.sin(n)))), i = -1 * Z(this.e, Math.tan(.5 * (c + s)));
                    return t.x = e, t.y = i, t
                },
                names: ["stere", "Stereographic_South_Pole", "Polar Stereographic (variant B)"],
                ssfn_: function(t, e, i) {
                    return e *= i, Math.tan(.5 * (c + t)) * Math.pow((1 - e) / (1 + e), .5 * i)
                }
            },
            ae = {
                init: function() {
                    var t = this.lat0;
                    this.lambda0 = this.long0;
                    var e = Math.sin(t),
                        i = this.a,
                        r = 1 / this.rf,
                        n = 2 * r - Math.pow(r, 2),
                        s = this.e = Math.sqrt(n);
                    this.R = this.k0 * i * Math.sqrt(1 - n) / (1 - n * Math.pow(e, 2)), this.alpha = Math.sqrt(1 + n / (1 - n) * Math.pow(Math.cos(t), 4)), this.b0 = Math.asin(e / this.alpha);
                    var a = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2)),
                        o = Math.log(Math.tan(Math.PI / 4 + t / 2)),
                        h = Math.log((1 + s * e) / (1 - s * e));
                    this.K = a - this.alpha * o + this.alpha * s / 2 * h
                },
                forward: function(t) {
                    var e = Math.log(Math.tan(Math.PI / 4 - t.y / 2)),
                        i = this.e / 2 * Math.log((1 + this.e * Math.sin(t.y)) / (1 - this.e * Math.sin(t.y))),
                        r = -this.alpha * (e + i) + this.K,
                        n = 2 * (Math.atan(Math.exp(r)) - Math.PI / 4),
                        s = this.alpha * (t.x - this.lambda0),
                        a = Math.atan(Math.sin(s) / (Math.sin(this.b0) * Math.tan(n) + Math.cos(this.b0) * Math.cos(s))),
                        o = Math.asin(Math.cos(this.b0) * Math.sin(n) - Math.sin(this.b0) * Math.cos(n) * Math.cos(s));
                    return t.y = this.R / 2 * Math.log((1 + Math.sin(o)) / (1 - Math.sin(o))) + this.y0, t.x = this.R * a + this.x0, t
                },
                inverse: function(t) {
                    for (var e = t.x - this.x0, i = t.y - this.y0, r = e / this.R, n = 2 * (Math.atan(Math.exp(i / this.R)) - Math.PI / 4), s = Math.asin(Math.cos(this.b0) * Math.sin(n) + Math.sin(this.b0) * Math.cos(n) * Math.cos(r)), a = Math.atan(Math.sin(r) / (Math.cos(this.b0) * Math.cos(r) - Math.sin(this.b0) * Math.tan(n))), o = this.lambda0 + a / this.alpha, h = 0, u = s, l = -1e3, c = 0; Math.abs(u - l) > 1e-7;) {
                        if (++c > 20) return;
                        h = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + s / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(u)) / 2)), l = u, u = 2 * Math.atan(Math.exp(h)) - Math.PI / 2
                    }
                    return t.x = o, t.y = u, t
                },
                names: ["somerc"]
            };
        var oe = 1e-7;
        const he = {
                init: function() {
                    var t, e, i, r, n, s, a, o, h, u, l, p, y, _ = 0,
                        v = 0,
                        b = 0,
                        w = 0,
                        M = 0,
                        x = 0,
                        k = 0;
                    this.no_off = (y = "object" == typeof(p = this).PROJECTION ? Object.keys(p.PROJECTION)[0] : p.PROJECTION, "no_uoff" in p || "no_off" in p || -1 !== ["Hotine_Oblique_Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin"].indexOf(y)), this.no_rot = "no_rot" in this;
                    var E = !1;
                    "alpha" in this && (E = !0);
                    var C = !1;
                    if ("rectified_grid_angle" in this && (C = !0), E && (k = this.alpha), C && (_ = this.rectified_grid_angle * d), E || C) v = this.longc;
                    else if (b = this.long1, M = this.lat1, w = this.long2, x = this.lat2, Math.abs(M - x) <= oe || (t = Math.abs(M)) <= oe || Math.abs(t - c) <= oe || Math.abs(Math.abs(this.lat0) - c) <= oe || Math.abs(Math.abs(x) - c) <= oe) throw new Error;
                    var S = 1 - this.es;
                    e = Math.sqrt(S), Math.abs(this.lat0) > f ? (o = Math.sin(this.lat0), i = Math.cos(this.lat0), t = 1 - this.es * o * o, this.B = i * i, this.B = Math.sqrt(1 + this.es * this.B * this.B / S), this.A = this.B * this.k0 * e / t, (n = (r = this.B * e / (i * Math.sqrt(t))) * r - 1) <= 0 ? n = 0 : (n = Math.sqrt(n), this.lat0 < 0 && (n = -n)), this.E = n += r, this.E *= Math.pow(W(this.e, this.lat0, o), this.B)) : (this.B = 1 / e, this.A = this.k0, this.E = r = n = 1), E || C ? (E ? (l = Math.asin(Math.sin(k) / r), C || (_ = k)) : (l = _, k = Math.asin(r * Math.sin(l))), this.lam0 = v - Math.asin(.5 * (n - 1 / n) * Math.tan(l)) / this.B) : (s = Math.pow(W(this.e, M, Math.sin(M)), this.B), a = Math.pow(W(this.e, x, Math.sin(x)), this.B), n = this.E / s, h = (a - s) / (a + s), u = ((u = this.E * this.E) - a * s) / (u + a * s), (t = b - w) < -Math.pi ? w -= g : t > Math.pi && (w += g), this.lam0 = G(.5 * (b + w) - Math.atan(u * Math.tan(.5 * this.B * (b - w)) / h) / this.B), l = Math.atan(2 * Math.sin(this.B * G(b - this.lam0)) / (n - 1 / n)), _ = k = Math.asin(r * Math.sin(l))), this.singam = Math.sin(l), this.cosgam = Math.cos(l), this.sinrot = Math.sin(_), this.cosrot = Math.cos(_), this.rB = 1 / this.B, this.ArB = this.A * this.rB, this.BrA = 1 / this.ArB, this.A, this.B, this.no_off ? this.u_0 = 0 : (this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(r * r - 1) / Math.cos(k))), this.lat0 < 0 && (this.u_0 = -this.u_0)), n = .5 * l, this.v_pole_n = this.ArB * Math.log(Math.tan(m - n)), this.v_pole_s = this.ArB * Math.log(Math.tan(m + n))
                },
                forward: function(t) {
                    var e, i, r, n, s, a, o, h, u = {};
                    if (t.x = t.x - this.lam0, Math.abs(Math.abs(t.y) - c) > f) {
                        if (e = .5 * ((s = this.E / Math.pow(W(this.e, t.y, Math.sin(t.y)), this.B)) - (a = 1 / s)), i = .5 * (s + a), n = Math.sin(this.B * t.x), r = (e * this.singam - n * this.cosgam) / i, Math.abs(Math.abs(r) - 1) < f) throw new Error;
                        h = .5 * this.ArB * Math.log((1 - r) / (1 + r)), a = Math.cos(this.B * t.x), o = Math.abs(a) < oe ? this.A * t.x : this.ArB * Math.atan2(e * this.cosgam + n * this.singam, a)
                    } else h = t.y > 0 ? this.v_pole_n : this.v_pole_s, o = this.ArB * t.y;
                    return this.no_rot ? (u.x = o, u.y = h) : (o -= this.u_0, u.x = h * this.cosrot + o * this.sinrot, u.y = o * this.cosrot - h * this.sinrot), u.x = this.a * u.x + this.x0, u.y = this.a * u.y + this.y0, u
                },
                inverse: function(t) {
                    var e, i, r, n, s, a, o, h = {};
                    if (t.x = (t.x - this.x0) * (1 / this.a), t.y = (t.y - this.y0) * (1 / this.a), this.no_rot ? (i = t.y, e = t.x) : (i = t.x * this.cosrot - t.y * this.sinrot, e = t.y * this.cosrot + t.x * this.sinrot + this.u_0), n = .5 * ((r = Math.exp(-this.BrA * i)) - 1 / r), s = .5 * (r + 1 / r), o = ((a = Math.sin(this.BrA * e)) * this.cosgam + n * this.singam) / s, Math.abs(Math.abs(o) - 1) < f) h.x = 0, h.y = o < 0 ? -c : c;
                    else {
                        if (h.y = this.E / Math.sqrt((1 + o) / (1 - o)), h.y = Z(this.e, Math.pow(h.y, 1 / this.B)), h.y === 1 / 0) throw new Error;
                        h.x = -this.rB * Math.atan2(n * this.cosgam - a * this.singam, Math.cos(this.BrA * e))
                    }
                    return h.x += this.lam0, h
                },
                names: ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Two_Point_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "Oblique_Mercator", "omerc"]
            },
            ue = {
                init: function() {
                    if (this.lat2 || (this.lat2 = this.lat1), this.k0 || (this.k0 = 1), this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, !(Math.abs(this.lat1 + this.lat2) < f)) {
                        var t = this.b / this.a;
                        this.e = Math.sqrt(1 - t * t);
                        var e = Math.sin(this.lat1),
                            i = Math.cos(this.lat1),
                            r = D(this.e, e, i),
                            n = W(this.e, this.lat1, e),
                            s = Math.sin(this.lat2),
                            a = Math.cos(this.lat2),
                            o = D(this.e, s, a),
                            h = W(this.e, this.lat2, s),
                            u = W(this.e, this.lat0, Math.sin(this.lat0));
                        Math.abs(this.lat1 - this.lat2) > f ? this.ns = Math.log(r / o) / Math.log(n / h) : this.ns = e, isNaN(this.ns) && (this.ns = e), this.f0 = r / (this.ns * Math.pow(n, this.ns)), this.rh = this.a * this.f0 * Math.pow(u, this.ns), this.title || (this.title = "Lambert Conformal Conic")
                    }
                },
                forward: function(t) {
                    var e = t.x,
                        i = t.y;
                    Math.abs(2 * Math.abs(i) - Math.PI) <= f && (i = q(i) * (c - 2e-10));
                    var r, n, s = Math.abs(Math.abs(i) - c);
                    if (s > f) r = W(this.e, i, Math.sin(i)), n = this.a * this.f0 * Math.pow(r, this.ns);
                    else {
                        if ((s = i * this.ns) <= 0) return null;
                        n = 0
                    }
                    var a = this.ns * G(e - this.long0);
                    return t.x = this.k0 * (n * Math.sin(a)) + this.x0, t.y = this.k0 * (this.rh - n * Math.cos(a)) + this.y0, t
                },
                inverse: function(t) {
                    var e, i, r, n, s, a = (t.x - this.x0) / this.k0,
                        o = this.rh - (t.y - this.y0) / this.k0;
                    this.ns > 0 ? (e = Math.sqrt(a * a + o * o), i = 1) : (e = -Math.sqrt(a * a + o * o), i = -1);
                    var h = 0;
                    if (0 !== e && (h = Math.atan2(i * a, i * o)), 0 !== e || this.ns > 0) {
                        if (i = 1 / this.ns, r = Math.pow(e / (this.a * this.f0), i), -9999 === (n = Z(this.e, r))) return null
                    } else n = -c;
                    return s = G(h / this.ns + this.long0), t.x = s, t.y = n, t
                },
                names: ["Lambert Tangential Conformal Conic Projection", "Lambert_Conformal_Conic", "Lambert_Conformal_Conic_1SP", "Lambert_Conformal_Conic_2SP", "lcc", "Lambert Conic Conformal (1SP)", "Lambert Conic Conformal (2SP)"]
            },
            le = {
                init: function() {
                    this.a = 6377397.155, this.es = .006674372230614, this.e = Math.sqrt(this.es), this.lat0 || (this.lat0 = .863937979737193), this.long0 || (this.long0 = .4334234309119251), this.k0 || (this.k0 = .9999), this.s45 = .785398163397448, this.s90 = 2 * this.s45, this.fi0 = this.lat0, this.e2 = this.es, this.e = Math.sqrt(this.e2), this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2)), this.uq = 1.04216856380474, this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa), this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2), this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g, this.k1 = this.k0, this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2)), this.s0 = 1.37008346281555, this.n = Math.sin(this.s0), this.ro0 = this.k1 * this.n0 / Math.tan(this.s0), this.ad = this.s90 - this.uq
                },
                forward: function(t) {
                    var e, i, r, n, s, a, o, h = t.x,
                        u = t.y,
                        l = G(h - this.long0);
                    return e = Math.pow((1 + this.e * Math.sin(u)) / (1 - this.e * Math.sin(u)), this.alfa * this.e / 2), i = 2 * (Math.atan(this.k * Math.pow(Math.tan(u / 2 + this.s45), this.alfa) / e) - this.s45), r = -l * this.alfa, n = Math.asin(Math.cos(this.ad) * Math.sin(i) + Math.sin(this.ad) * Math.cos(i) * Math.cos(r)), s = Math.asin(Math.cos(i) * Math.sin(r) / Math.cos(n)), a = this.n * s, o = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(n / 2 + this.s45), this.n), t.y = o * Math.cos(a) / 1, t.x = o * Math.sin(a) / 1, this.czech || (t.y *= -1, t.x *= -1), t
                },
                inverse: function(t) {
                    var e, i, r, n, s, a, o, h = t.x;
                    t.x = t.y, t.y = h, this.czech || (t.y *= -1, t.x *= -1), s = Math.sqrt(t.x * t.x + t.y * t.y), n = Math.atan2(t.y, t.x) / Math.sin(this.s0), r = 2 * (Math.atan(Math.pow(this.ro0 / s, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45), e = Math.asin(Math.cos(this.ad) * Math.sin(r) - Math.sin(this.ad) * Math.cos(r) * Math.cos(n)), i = Math.asin(Math.cos(r) * Math.sin(n) / Math.cos(e)), t.x = this.long0 - i / this.alfa, a = e, o = 0;
                    var u = 0;
                    do {
                        t.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(e / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(a)) / (1 - this.e * Math.sin(a)), this.e / 2)) - this.s45), Math.abs(a - t.y) < 1e-10 && (o = 1), a = t.y, u += 1
                    } while (0 === o && u < 15);
                    return u >= 15 ? null : t
                },
                names: ["Krovak", "krovak"]
            };

        function ce(t, e, i, r, n) {
            return t * n - e * Math.sin(2 * n) + i * Math.sin(4 * n) - r * Math.sin(6 * n)
        }

        function fe(t) {
            return 1 - .25 * t * (1 + t / 16 * (3 + 1.25 * t))
        }

        function de(t) {
            return .375 * t * (1 + .25 * t * (1 + .46875 * t))
        }

        function pe(t) {
            return .05859375 * t * t * (1 + .75 * t)
        }

        function me(t) {
            return t * t * t * (35 / 3072)
        }

        function ge(t, e, i) {
            var r = e * i;
            return t / Math.sqrt(1 - r * r)
        }

        function ye(t) {
            return Math.abs(t) < c ? t : t - q(t) * Math.PI
        }

        function _e(t, e, i, r, n) {
            var s, a;
            s = t / e;
            for (var o = 0; o < 15; o++)
                if (s += a = (t - (e * s - i * Math.sin(2 * s) + r * Math.sin(4 * s) - n * Math.sin(6 * s))) / (e - 2 * i * Math.cos(2 * s) + 4 * r * Math.cos(4 * s) - 6 * n * Math.cos(6 * s)), Math.abs(a) <= 1e-10) return s;
            return NaN
        }
        const ve = {
            init: function() {
                this.sphere || (this.e0 = fe(this.es), this.e1 = de(this.es), this.e2 = pe(this.es), this.e3 = me(this.es), this.ml0 = this.a * ce(this.e0, this.e1, this.e2, this.e3, this.lat0))
            },
            forward: function(t) {
                var e, i, r = t.x,
                    n = t.y;
                if (r = G(r - this.long0), this.sphere) e = this.a * Math.asin(Math.cos(n) * Math.sin(r)), i = this.a * (Math.atan2(Math.tan(n), Math.cos(r)) - this.lat0);
                else {
                    var s = Math.sin(n),
                        a = Math.cos(n),
                        o = ge(this.a, this.e, s),
                        h = Math.tan(n) * Math.tan(n),
                        u = r * Math.cos(n),
                        l = u * u,
                        c = this.es * a * a / (1 - this.es);
                    e = o * u * (1 - l * h * (1 / 6 - (8 - h + 8 * c) * l / 120)), i = this.a * ce(this.e0, this.e1, this.e2, this.e3, n) - this.ml0 + o * s / a * l * (.5 + (5 - h + 6 * c) * l / 24)
                }
                return t.x = e + this.x0, t.y = i + this.y0, t
            },
            inverse: function(t) {
                t.x -= this.x0, t.y -= this.y0;
                var e, i, r = t.x / this.a,
                    n = t.y / this.a;
                if (this.sphere) {
                    var s = n + this.lat0;
                    e = Math.asin(Math.sin(s) * Math.cos(r)), i = Math.atan2(Math.tan(r), Math.cos(s))
                } else {
                    var a = _e(this.ml0 / this.a + n, this.e0, this.e1, this.e2, this.e3);
                    if (Math.abs(Math.abs(a) - c) <= f) return t.x = this.long0, t.y = c, n < 0 && (t.y *= -1), t;
                    var o = ge(this.a, this.e, Math.sin(a)),
                        h = o * o * o / this.a / this.a * (1 - this.es),
                        u = Math.pow(Math.tan(a), 2),
                        l = r * this.a / o,
                        d = l * l;
                    e = a - o * Math.tan(a) / h * l * l * (.5 - (1 + 3 * u) * l * l / 24), i = l * (1 - d * (u / 3 + (1 + 3 * u) * u * d / 15)) / Math.cos(a)
                }
                return t.x = G(i + this.long0), t.y = ye(e), t
            },
            names: ["Cassini", "Cassini_Soldner", "cass"]
        };

        function be(t, e) {
            var i;
            return t > 1e-7 ? (1 - t * t) * (e / (1 - (i = t * e) * i) - .5 / t * Math.log((1 - i) / (1 + i))) : 2 * e
        }
        const we = {
            init: function() {
                var t, e = Math.abs(this.lat0);
                if (Math.abs(e - c) < f ? this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE : Math.abs(e) < f ? this.mode = this.EQUIT : this.mode = this.OBLIQ, this.es > 0) switch (this.qp = be(this.e, 1), this.mmf = .5 / (1 - this.es), this.apa = function(t) {
                        var e, i = [];
                        return i[0] = .3333333333333333 * t, e = t * t, i[0] += .17222222222222222 * e, i[1] = .06388888888888888 * e, e *= t, i[0] += .10257936507936508 * e, i[1] += .0664021164021164 * e, i[2] = .016415012942191543 * e, i
                    }(this.es), this.mode) {
                    case this.N_POLE:
                    case this.S_POLE:
                        this.dd = 1;
                        break;
                    case this.EQUIT:
                        this.rq = Math.sqrt(.5 * this.qp), this.dd = 1 / this.rq, this.xmf = 1, this.ymf = .5 * this.qp;
                        break;
                    case this.OBLIQ:
                        this.rq = Math.sqrt(.5 * this.qp), t = Math.sin(this.lat0), this.sinb1 = be(this.e, t) / this.qp, this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1), this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * t * t) * this.rq * this.cosb1), this.ymf = (this.xmf = this.rq) / this.dd, this.xmf *= this.dd
                } else this.mode === this.OBLIQ && (this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0))
            },
            forward: function(t) {
                var e, i, r, n, s, a, o, h, u, l, d = t.x,
                    p = t.y;
                if (d = G(d - this.long0), this.sphere) {
                    if (s = Math.sin(p), l = Math.cos(p), r = Math.cos(d), this.mode === this.OBLIQ || this.mode === this.EQUIT) {
                        if ((i = this.mode === this.EQUIT ? 1 + l * r : 1 + this.sinph0 * s + this.cosph0 * l * r) <= f) return null;
                        e = (i = Math.sqrt(2 / i)) * l * Math.sin(d), i *= this.mode === this.EQUIT ? s : this.cosph0 * s - this.sinph0 * l * r
                    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
                        if (this.mode === this.N_POLE && (r = -r), Math.abs(p + this.lat0) < f) return null;
                        i = m - .5 * p, e = (i = 2 * (this.mode === this.S_POLE ? Math.cos(i) : Math.sin(i))) * Math.sin(d), i *= r
                    }
                } else {
                    switch (o = 0, h = 0, u = 0, r = Math.cos(d), n = Math.sin(d), s = Math.sin(p), a = be(this.e, s), this.mode !== this.OBLIQ && this.mode !== this.EQUIT || (o = a / this.qp, h = Math.sqrt(1 - o * o)), this.mode) {
                        case this.OBLIQ:
                            u = 1 + this.sinb1 * o + this.cosb1 * h * r;
                            break;
                        case this.EQUIT:
                            u = 1 + h * r;
                            break;
                        case this.N_POLE:
                            u = c + p, a = this.qp - a;
                            break;
                        case this.S_POLE:
                            u = p - c, a = this.qp + a
                    }
                    if (Math.abs(u) < f) return null;
                    switch (this.mode) {
                        case this.OBLIQ:
                        case this.EQUIT:
                            u = Math.sqrt(2 / u), i = this.mode === this.OBLIQ ? this.ymf * u * (this.cosb1 * o - this.sinb1 * h * r) : (u = Math.sqrt(2 / (1 + h * r))) * o * this.ymf, e = this.xmf * u * h * n;
                            break;
                        case this.N_POLE:
                        case this.S_POLE:
                            a >= 0 ? (e = (u = Math.sqrt(a)) * n, i = r * (this.mode === this.S_POLE ? u : -u)) : e = i = 0
                    }
                }
                return t.x = this.a * e + this.x0, t.y = this.a * i + this.y0, t
            },
            inverse: function(t) {
                t.x -= this.x0, t.y -= this.y0;
                var e, i, r, n, s, a, o, h, u, l, d = t.x / this.a,
                    p = t.y / this.a;
                if (this.sphere) {
                    var m, g = 0,
                        y = 0;
                    if ((i = .5 * (m = Math.sqrt(d * d + p * p))) > 1) return null;
                    switch (i = 2 * Math.asin(i), this.mode !== this.OBLIQ && this.mode !== this.EQUIT || (y = Math.sin(i), g = Math.cos(i)), this.mode) {
                        case this.EQUIT:
                            i = Math.abs(m) <= f ? 0 : Math.asin(p * y / m), d *= y, p = g * m;
                            break;
                        case this.OBLIQ:
                            i = Math.abs(m) <= f ? this.lat0 : Math.asin(g * this.sinph0 + p * y * this.cosph0 / m), d *= y * this.cosph0, p = (g - Math.sin(i) * this.sinph0) * m;
                            break;
                        case this.N_POLE:
                            p = -p, i = c - i;
                            break;
                        case this.S_POLE:
                            i -= c
                    }
                    e = 0 !== p || this.mode !== this.EQUIT && this.mode !== this.OBLIQ ? Math.atan2(d, p) : 0
                } else {
                    if (o = 0, this.mode === this.OBLIQ || this.mode === this.EQUIT) {
                        if (d /= this.dd, p *= this.dd, (a = Math.sqrt(d * d + p * p)) < f) return t.x = this.long0, t.y = this.lat0, t;
                        n = 2 * Math.asin(.5 * a / this.rq), r = Math.cos(n), d *= n = Math.sin(n), this.mode === this.OBLIQ ? (o = r * this.sinb1 + p * n * this.cosb1 / a, s = this.qp * o, p = a * this.cosb1 * r - p * this.sinb1 * n) : (o = p * n / a, s = this.qp * o, p = a * r)
                    } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
                        if (this.mode === this.N_POLE && (p = -p), !(s = d * d + p * p)) return t.x = this.long0, t.y = this.lat0, t;
                        o = 1 - s / this.qp, this.mode === this.S_POLE && (o = -o)
                    }
                    e = Math.atan2(d, p), l = (h = Math.asin(o)) + h, i = h + (u = this.apa)[0] * Math.sin(l) + u[1] * Math.sin(l + l) + u[2] * Math.sin(l + l + l)
                }
                return t.x = G(this.long0 + e), t.y = i, t
            },
            names: ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"],
            S_POLE: 1,
            N_POLE: 2,
            EQUIT: 3,
            OBLIQ: 4
        };

        function Me(t) {
            return Math.abs(t) > 1 && (t = t > 1 ? 1 : -1), Math.asin(t)
        }
        const xe = {
                init: function() {
                    Math.abs(this.lat1 + this.lat2) < f || (this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e3 = Math.sqrt(this.es), this.sin_po = Math.sin(this.lat1), this.cos_po = Math.cos(this.lat1), this.t1 = this.sin_po, this.con = this.sin_po, this.ms1 = D(this.e3, this.sin_po, this.cos_po), this.qs1 = be(this.e3, this.sin_po), this.sin_po = Math.sin(this.lat2), this.cos_po = Math.cos(this.lat2), this.t2 = this.sin_po, this.ms2 = D(this.e3, this.sin_po, this.cos_po), this.qs2 = be(this.e3, this.sin_po), this.sin_po = Math.sin(this.lat0), this.cos_po = Math.cos(this.lat0), this.t3 = this.sin_po, this.qs0 = be(this.e3, this.sin_po), Math.abs(this.lat1 - this.lat2) > f ? this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1) : this.ns0 = this.con, this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1, this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0)
                },
                forward: function(t) {
                    var e = t.x,
                        i = t.y;
                    this.sin_phi = Math.sin(i), this.cos_phi = Math.cos(i);
                    var r = be(this.e3, this.sin_phi),
                        n = this.a * Math.sqrt(this.c - this.ns0 * r) / this.ns0,
                        s = this.ns0 * G(e - this.long0),
                        a = n * Math.sin(s) + this.x0,
                        o = this.rh - n * Math.cos(s) + this.y0;
                    return t.x = a, t.y = o, t
                },
                inverse: function(t) {
                    var e, i, r, n, s, a;
                    return t.x -= this.x0, t.y = this.rh - t.y + this.y0, this.ns0 >= 0 ? (e = Math.sqrt(t.x * t.x + t.y * t.y), r = 1) : (e = -Math.sqrt(t.x * t.x + t.y * t.y), r = -1), n = 0, 0 !== e && (n = Math.atan2(r * t.x, r * t.y)), r = e * this.ns0 / this.a, this.sphere ? a = Math.asin((this.c - r * r) / (2 * this.ns0)) : (i = (this.c - r * r) / this.ns0, a = this.phi1z(this.e3, i)), s = G(n / this.ns0 + this.long0), t.x = s, t.y = a, t
                },
                names: ["Albers_Conic_Equal_Area", "Albers", "aea"],
                phi1z: function(t, e) {
                    var i, r, n, s, a = Me(.5 * e);
                    if (t < f) return a;
                    for (var o = t * t, h = 1; h <= 25; h++)
                        if (a += s = .5 * (n = 1 - (r = t * (i = Math.sin(a))) * r) * n / Math.cos(a) * (e / (1 - o) - i / n + .5 / t * Math.log((1 - r) / (1 + r))), Math.abs(s) <= 1e-7) return a;
                    return null
                }
            },
            ke = {
                init: function() {
                    this.sin_p14 = Math.sin(this.lat0), this.cos_p14 = Math.cos(this.lat0), this.infinity_dist = 1e3 * this.a, this.rc = 1
                },
                forward: function(t) {
                    var e, i, r, n, s, a, o, h = t.x,
                        u = t.y;
                    return r = G(h - this.long0), e = Math.sin(u), i = Math.cos(u), n = Math.cos(r), (s = this.sin_p14 * e + this.cos_p14 * i * n) > 0 || Math.abs(s) <= f ? (a = this.x0 + 1 * this.a * i * Math.sin(r) / s, o = this.y0 + 1 * this.a * (this.cos_p14 * e - this.sin_p14 * i * n) / s) : (a = this.x0 + this.infinity_dist * i * Math.sin(r), o = this.y0 + this.infinity_dist * (this.cos_p14 * e - this.sin_p14 * i * n)), t.x = a, t.y = o, t
                },
                inverse: function(t) {
                    var e, i, r, n, s, a;
                    return t.x = (t.x - this.x0) / this.a, t.y = (t.y - this.y0) / this.a, t.x /= this.k0, t.y /= this.k0, (e = Math.sqrt(t.x * t.x + t.y * t.y)) ? (n = Math.atan2(e, this.rc), i = Math.sin(n), a = Me((r = Math.cos(n)) * this.sin_p14 + t.y * i * this.cos_p14 / e), s = Math.atan2(t.x * i, e * this.cos_p14 * r - t.y * this.sin_p14 * i), s = G(this.long0 + s)) : (a = this.phic0, s = 0), t.x = s, t.y = a, t
                },
                names: ["gnom"]
            },
            Ee = {
                init: function() {
                    this.sphere || (this.k0 = D(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)))
                },
                forward: function(t) {
                    var e, i, r = t.x,
                        n = t.y,
                        s = G(r - this.long0);
                    if (this.sphere) e = this.x0 + this.a * s * Math.cos(this.lat_ts), i = this.y0 + this.a * Math.sin(n) / Math.cos(this.lat_ts);
                    else {
                        var a = be(this.e, Math.sin(n));
                        e = this.x0 + this.a * this.k0 * s, i = this.y0 + this.a * a * .5 / this.k0
                    }
                    return t.x = e, t.y = i, t
                },
                inverse: function(t) {
                    var e, i;
                    return t.x -= this.x0, t.y -= this.y0, this.sphere ? (e = G(this.long0 + t.x / this.a / Math.cos(this.lat_ts)), i = Math.asin(t.y / this.a * Math.cos(this.lat_ts))) : (i = function(t, e) {
                        var i = 1 - (1 - t * t) / (2 * t) * Math.log((1 - t) / (1 + t));
                        if (Math.abs(Math.abs(e) - i) < 1e-6) return e < 0 ? -1 * c : c;
                        for (var r, n, s, a, o = Math.asin(.5 * e), h = 0; h < 30; h++)
                            if (n = Math.sin(o), s = Math.cos(o), a = t * n, o += r = Math.pow(1 - a * a, 2) / (2 * s) * (e / (1 - t * t) - n / (1 - a * a) + .5 / t * Math.log((1 - a) / (1 + a))), Math.abs(r) <= 1e-10) return o;
                        return NaN
                    }(this.e, 2 * t.y * this.k0 / this.a), e = G(this.long0 + t.x / (this.a * this.k0))), t.x = e, t.y = i, t
                },
                names: ["cea"]
            },
            Ce = {
                init: function() {
                    this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Equidistant Cylindrical (Plate Carre)", this.rc = Math.cos(this.lat_ts)
                },
                forward: function(t) {
                    var e = t.x,
                        i = t.y,
                        r = G(e - this.long0),
                        n = ye(i - this.lat0);
                    return t.x = this.x0 + this.a * r * this.rc, t.y = this.y0 + this.a * n, t
                },
                inverse: function(t) {
                    var e = t.x,
                        i = t.y;
                    return t.x = G(this.long0 + (e - this.x0) / (this.a * this.rc)), t.y = ye(this.lat0 + (i - this.y0) / this.a), t
                },
                names: ["Equirectangular", "Equidistant_Cylindrical", "eqc"]
            },
            Se = {
                init: function() {
                    this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = fe(this.es), this.e1 = de(this.es), this.e2 = pe(this.es), this.e3 = me(this.es), this.ml0 = this.a * ce(this.e0, this.e1, this.e2, this.e3, this.lat0)
                },
                forward: function(t) {
                    var e, i, r, n = t.x,
                        s = t.y,
                        a = G(n - this.long0);
                    if (r = a * Math.sin(s), this.sphere) Math.abs(s) <= f ? (e = this.a * a, i = -1 * this.a * this.lat0) : (e = this.a * Math.sin(r) / Math.tan(s), i = this.a * (ye(s - this.lat0) + (1 - Math.cos(r)) / Math.tan(s)));
                    else if (Math.abs(s) <= f) e = this.a * a, i = -1 * this.ml0;
                    else {
                        var o = ge(this.a, this.e, Math.sin(s)) / Math.tan(s);
                        e = o * Math.sin(r), i = this.a * ce(this.e0, this.e1, this.e2, this.e3, s) - this.ml0 + o * (1 - Math.cos(r))
                    }
                    return t.x = e + this.x0, t.y = i + this.y0, t
                },
                inverse: function(t) {
                    var e, i, r, n, s, a, o, h, u;
                    if (r = t.x - this.x0, n = t.y - this.y0, this.sphere)
                        if (Math.abs(n + this.a * this.lat0) <= f) e = G(r / this.a + this.long0), i = 0;
                        else {
                            var l;
                            for (a = this.lat0 + n / this.a, o = r * r / this.a / this.a + a * a, h = a, s = 20; s; --s)
                                if (h += u = -1 * (a * (h * (l = Math.tan(h)) + 1) - h - .5 * (h * h + o) * l) / ((h - a) / l - 1), Math.abs(u) <= f) {
                                    i = h;
                                    break
                                } e = G(this.long0 + Math.asin(r * Math.tan(h) / this.a) / Math.sin(i))
                        }
                    else if (Math.abs(n + this.ml0) <= f) i = 0, e = G(this.long0 + r / this.a);
                    else {
                        var c, d, p, m, g;
                        for (a = (this.ml0 + n) / this.a, o = r * r / this.a / this.a + a * a, h = a, s = 20; s; --s)
                            if (g = this.e * Math.sin(h), c = Math.sqrt(1 - g * g) * Math.tan(h), d = this.a * ce(this.e0, this.e1, this.e2, this.e3, h), p = this.e0 - 2 * this.e1 * Math.cos(2 * h) + 4 * this.e2 * Math.cos(4 * h) - 6 * this.e3 * Math.cos(6 * h), h -= u = (a * (c * (m = d / this.a) + 1) - m - .5 * c * (m * m + o)) / (this.es * Math.sin(2 * h) * (m * m + o - 2 * a * m) / (4 * c) + (a - m) * (c * p - 2 / Math.sin(2 * h)) - p), Math.abs(u) <= f) {
                                i = h;
                                break
                            } c = Math.sqrt(1 - this.es * Math.pow(Math.sin(i), 2)) * Math.tan(i), e = G(this.long0 + Math.asin(r * c / this.a) / Math.sin(i))
                    }
                    return t.x = e, t.y = i, t
                },
                names: ["Polyconic", "poly"]
            },
            Ae = {
                init: function() {
                    this.A = [], this.A[1] = .6399175073, this.A[2] = -.1358797613, this.A[3] = .063294409, this.A[4] = -.02526853, this.A[5] = .0117879, this.A[6] = -.0055161, this.A[7] = .0026906, this.A[8] = -.001333, this.A[9] = 67e-5, this.A[10] = -34e-5, this.B_re = [], this.B_im = [], this.B_re[1] = .7557853228, this.B_im[1] = 0, this.B_re[2] = .249204646, this.B_im[2] = .003371507, this.B_re[3] = -.001541739, this.B_im[3] = .04105856, this.B_re[4] = -.10162907, this.B_im[4] = .01727609, this.B_re[5] = -.26623489, this.B_im[5] = -.36249218, this.B_re[6] = -.6870983, this.B_im[6] = -1.1651967, this.C_re = [], this.C_im = [], this.C_re[1] = 1.3231270439, this.C_im[1] = 0, this.C_re[2] = -.577245789, this.C_im[2] = -.007809598, this.C_re[3] = .508307513, this.C_im[3] = -.112208952, this.C_re[4] = -.15094762, this.C_im[4] = .18200602, this.C_re[5] = 1.01418179, this.C_im[5] = 1.64497696, this.C_re[6] = 1.9660549, this.C_im[6] = 2.5127645, this.D = [], this.D[1] = 1.5627014243, this.D[2] = .5185406398, this.D[3] = -.03333098, this.D[4] = -.1052906, this.D[5] = -.0368594, this.D[6] = .007317, this.D[7] = .0122, this.D[8] = .00394, this.D[9] = -.0013
                },
                forward: function(t) {
                    var e, i = t.x,
                        r = t.y - this.lat0,
                        n = i - this.long0,
                        s = r / l * 1e-5,
                        a = n,
                        o = 1,
                        h = 0;
                    for (e = 1; e <= 10; e++) o *= s, h += this.A[e] * o;
                    var u, c = h,
                        f = a,
                        d = 1,
                        p = 0,
                        m = 0,
                        g = 0;
                    for (e = 1; e <= 6; e++) u = p * c + d * f, d = d * c - p * f, p = u, m = m + this.B_re[e] * d - this.B_im[e] * p, g = g + this.B_im[e] * d + this.B_re[e] * p;
                    return t.x = g * this.a + this.x0, t.y = m * this.a + this.y0, t
                },
                inverse: function(t) {
                    var e, i, r = t.x,
                        n = t.y,
                        s = r - this.x0,
                        a = (n - this.y0) / this.a,
                        o = s / this.a,
                        h = 1,
                        u = 0,
                        c = 0,
                        f = 0;
                    for (e = 1; e <= 6; e++) i = u * a + h * o, h = h * a - u * o, u = i, c = c + this.C_re[e] * h - this.C_im[e] * u, f = f + this.C_im[e] * h + this.C_re[e] * u;
                    for (var d = 0; d < this.iterations; d++) {
                        var p, m = c,
                            g = f,
                            y = a,
                            _ = o;
                        for (e = 2; e <= 6; e++) p = g * c + m * f, m = m * c - g * f, g = p, y += (e - 1) * (this.B_re[e] * m - this.B_im[e] * g), _ += (e - 1) * (this.B_im[e] * m + this.B_re[e] * g);
                        m = 1, g = 0;
                        var v = this.B_re[1],
                            b = this.B_im[1];
                        for (e = 2; e <= 6; e++) p = g * c + m * f, m = m * c - g * f, g = p, v += e * (this.B_re[e] * m - this.B_im[e] * g), b += e * (this.B_im[e] * m + this.B_re[e] * g);
                        var w = v * v + b * b;
                        c = (y * v + _ * b) / w, f = (_ * v - y * b) / w
                    }
                    var M = c,
                        x = f,
                        k = 1,
                        E = 0;
                    for (e = 1; e <= 9; e++) k *= M, E += this.D[e] * k;
                    var C = this.lat0 + E * l * 1e5,
                        S = this.long0 + x;
                    return t.x = S, t.y = C, t
                },
                names: ["New_Zealand_Map_Grid", "nzmg"]
            },
            Ie = {
                init: function() {},
                forward: function(t) {
                    var e = t.x,
                        i = t.y,
                        r = G(e - this.long0),
                        n = this.x0 + this.a * r,
                        s = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + i / 2.5)) * 1.25;
                    return t.x = n, t.y = s, t
                },
                inverse: function(t) {
                    t.x -= this.x0, t.y -= this.y0;
                    var e = G(this.long0 + t.x / this.a),
                        i = 2.5 * (Math.atan(Math.exp(.8 * t.y / this.a)) - Math.PI / 4);
                    return t.x = e, t.y = i, t
                },
                names: ["Miller_Cylindrical", "mill"]
            },
            Oe = {
                init: function() {
                    this.sphere ? (this.n = 1, this.m = 0, this.es = 0, this.C_y = Math.sqrt((this.m + 1) / this.n), this.C_x = this.C_y / (this.m + 1)) : this.en = Ht(this.es)
                },
                forward: function(t) {
                    var e, i, r = t.x,
                        n = t.y;
                    if (r = G(r - this.long0), this.sphere) {
                        if (this.m)
                            for (var s = this.n * Math.sin(n), a = 20; a; --a) {
                                var o = (this.m * n + Math.sin(n) - s) / (this.m + Math.cos(n));
                                if (n -= o, Math.abs(o) < f) break
                            } else n = 1 !== this.n ? Math.asin(this.n * Math.sin(n)) : n;
                        e = this.a * this.C_x * r * (this.m + Math.cos(n)), i = this.a * this.C_y * n
                    } else {
                        var h = Math.sin(n),
                            u = Math.cos(n);
                        i = this.a * Jt(n, h, u, this.en), e = this.a * r * u / Math.sqrt(1 - this.es * h * h)
                    }
                    return t.x = e, t.y = i, t
                },
                inverse: function(t) {
                    var e, i, r;
                    return t.x -= this.x0, i = t.x / this.a, t.y -= this.y0, e = t.y / this.a, this.sphere ? (e /= this.C_y, i /= this.C_x * (this.m + Math.cos(e)), this.m ? e = Me((this.m * e + Math.sin(e)) / this.n) : 1 !== this.n && (e = Me(Math.sin(e) / this.n)), i = G(i + this.long0), e = ye(e)) : (e = Kt(t.y / this.a, this.es, this.en), (r = Math.abs(e)) < c ? (r = Math.sin(e), i = G(this.long0 + t.x * Math.sqrt(1 - this.es * r * r) / (this.a * Math.cos(e)))) : r - f < c && (i = this.long0)), t.x = i, t.y = e, t
                },
                names: ["Sinusoidal", "sinu"]
            },
            Be = {
                init: function() {},
                forward: function(t) {
                    for (var e = t.x, i = t.y, r = G(e - this.long0), n = i, s = Math.PI * Math.sin(i);;) {
                        var a = -(n + Math.sin(n) - s) / (1 + Math.cos(n));
                        if (n += a, Math.abs(a) < f) break
                    }
                    n /= 2, Math.PI / 2 - Math.abs(i) < f && (r = 0);
                    var o = .900316316158 * this.a * r * Math.cos(n) + this.x0,
                        h = 1.4142135623731 * this.a * Math.sin(n) + this.y0;
                    return t.x = o, t.y = h, t
                },
                inverse: function(t) {
                    var e, i;
                    t.x -= this.x0, t.y -= this.y0, i = t.y / (1.4142135623731 * this.a), Math.abs(i) > .999999999999 && (i = .999999999999), e = Math.asin(i);
                    var r = G(this.long0 + t.x / (.900316316158 * this.a * Math.cos(e)));
                    r < -Math.PI && (r = -Math.PI), r > Math.PI && (r = Math.PI), i = (2 * e + Math.sin(2 * e)) / Math.PI, Math.abs(i) > 1 && (i = 1);
                    var n = Math.asin(i);
                    return t.x = r, t.y = n, t
                },
                names: ["Mollweide", "moll"]
            },
            Ne = {
                init: function() {
                    Math.abs(this.lat1 + this.lat2) < f || (this.lat2 = this.lat2 || this.lat1, this.temp = this.b / this.a, this.es = 1 - Math.pow(this.temp, 2), this.e = Math.sqrt(this.es), this.e0 = fe(this.es), this.e1 = de(this.es), this.e2 = pe(this.es), this.e3 = me(this.es), this.sinphi = Math.sin(this.lat1), this.cosphi = Math.cos(this.lat1), this.ms1 = D(this.e, this.sinphi, this.cosphi), this.ml1 = ce(this.e0, this.e1, this.e2, this.e3, this.lat1), Math.abs(this.lat1 - this.lat2) < f ? this.ns = this.sinphi : (this.sinphi = Math.sin(this.lat2), this.cosphi = Math.cos(this.lat2), this.ms2 = D(this.e, this.sinphi, this.cosphi), this.ml2 = ce(this.e0, this.e1, this.e2, this.e3, this.lat2), this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1)), this.g = this.ml1 + this.ms1 / this.ns, this.ml0 = ce(this.e0, this.e1, this.e2, this.e3, this.lat0), this.rh = this.a * (this.g - this.ml0))
                },
                forward: function(t) {
                    var e, i = t.x,
                        r = t.y;
                    if (this.sphere) e = this.a * (this.g - r);
                    else {
                        var n = ce(this.e0, this.e1, this.e2, this.e3, r);
                        e = this.a * (this.g - n)
                    }
                    var s = this.ns * G(i - this.long0),
                        a = this.x0 + e * Math.sin(s),
                        o = this.y0 + this.rh - e * Math.cos(s);
                    return t.x = a, t.y = o, t
                },
                inverse: function(t) {
                    var e, i, r, n;
                    t.x -= this.x0, t.y = this.rh - t.y + this.y0, this.ns >= 0 ? (i = Math.sqrt(t.x * t.x + t.y * t.y), e = 1) : (i = -Math.sqrt(t.x * t.x + t.y * t.y), e = -1);
                    var s = 0;
                    return 0 !== i && (s = Math.atan2(e * t.x, e * t.y)), this.sphere ? (n = G(this.long0 + s / this.ns), r = ye(this.g - i / this.a), t.x = n, t.y = r, t) : (r = _e(this.g - i / this.a, this.e0, this.e1, this.e2, this.e3), n = G(this.long0 + s / this.ns), t.x = n, t.y = r, t)
                },
                names: ["Equidistant_Conic", "eqdc"]
            },
            Le = {
                init: function() {
                    this.R = this.a
                },
                forward: function(t) {
                    var e, i, r = t.x,
                        n = t.y,
                        s = G(r - this.long0);
                    Math.abs(n) <= f && (e = this.x0 + this.R * s, i = this.y0);
                    var a = Me(2 * Math.abs(n / Math.PI));
                    (Math.abs(s) <= f || Math.abs(Math.abs(n) - c) <= f) && (e = this.x0, i = n >= 0 ? this.y0 + Math.PI * this.R * Math.tan(.5 * a) : this.y0 + Math.PI * this.R * -Math.tan(.5 * a));
                    var o = .5 * Math.abs(Math.PI / s - s / Math.PI),
                        h = o * o,
                        u = Math.sin(a),
                        l = Math.cos(a),
                        d = l / (u + l - 1),
                        p = d * d,
                        m = d * (2 / u - 1),
                        g = m * m,
                        y = Math.PI * this.R * (o * (d - g) + Math.sqrt(h * (d - g) * (d - g) - (g + h) * (p - g))) / (g + h);
                    s < 0 && (y = -y), e = this.x0 + y;
                    var _ = h + d;
                    return y = Math.PI * this.R * (m * _ - o * Math.sqrt((g + h) * (h + 1) - _ * _)) / (g + h), i = n >= 0 ? this.y0 + y : this.y0 - y, t.x = e, t.y = i, t
                },
                inverse: function(t) {
                    var e, i, r, n, s, a, o, h, u, l, c, d;
                    return t.x -= this.x0, t.y -= this.y0, c = Math.PI * this.R, s = (r = t.x / c) * r + (n = t.y / c) * n, c = 3 * (n * n / (h = -2 * (a = -Math.abs(n) * (1 + s)) + 1 + 2 * n * n + s * s) + (2 * (o = a - 2 * n * n + r * r) * o * o / h / h / h - 9 * a * o / h / h) / 27) / (u = (a - o * o / 3 / h) / h) / (l = 2 * Math.sqrt(-u / 3)), Math.abs(c) > 1 && (c = c >= 0 ? 1 : -1), d = Math.acos(c) / 3, i = t.y >= 0 ? (-l * Math.cos(d + Math.PI / 3) - o / 3 / h) * Math.PI : -(-l * Math.cos(d + Math.PI / 3) - o / 3 / h) * Math.PI, e = Math.abs(r) < f ? this.long0 : G(this.long0 + Math.PI * (s - 1 + Math.sqrt(1 + 2 * (r * r - n * n) + s * s)) / 2 / r), t.x = e, t.y = i, t
                },
                names: ["Van_der_Grinten_I", "VanDerGrinten", "vandg"]
            },
            Pe = {
                init: function() {
                    this.sin_p12 = Math.sin(this.lat0), this.cos_p12 = Math.cos(this.lat0)
                },
                forward: function(t) {
                    var e, i, r, n, s, a, o, h, u, l, d, p, m, g, y, _, v, b, w, M, x, k, E = t.x,
                        C = t.y,
                        S = Math.sin(t.y),
                        A = Math.cos(t.y),
                        I = G(E - this.long0);
                    return this.sphere ? Math.abs(this.sin_p12 - 1) <= f ? (t.x = this.x0 + this.a * (c - C) * Math.sin(I), t.y = this.y0 - this.a * (c - C) * Math.cos(I), t) : Math.abs(this.sin_p12 + 1) <= f ? (t.x = this.x0 + this.a * (c + C) * Math.sin(I), t.y = this.y0 + this.a * (c + C) * Math.cos(I), t) : (b = this.sin_p12 * S + this.cos_p12 * A * Math.cos(I), v = (_ = Math.acos(b)) ? _ / Math.sin(_) : 1, t.x = this.x0 + this.a * v * A * Math.sin(I), t.y = this.y0 + this.a * v * (this.cos_p12 * S - this.sin_p12 * A * Math.cos(I)), t) : (e = fe(this.es), i = de(this.es), r = pe(this.es), n = me(this.es), Math.abs(this.sin_p12 - 1) <= f ? (s = this.a * ce(e, i, r, n, c), a = this.a * ce(e, i, r, n, C), t.x = this.x0 + (s - a) * Math.sin(I), t.y = this.y0 - (s - a) * Math.cos(I), t) : Math.abs(this.sin_p12 + 1) <= f ? (s = this.a * ce(e, i, r, n, c), a = this.a * ce(e, i, r, n, C), t.x = this.x0 + (s + a) * Math.sin(I), t.y = this.y0 + (s + a) * Math.cos(I), t) : (o = S / A, h = ge(this.a, this.e, this.sin_p12), u = ge(this.a, this.e, S), l = Math.atan((1 - this.es) * o + this.es * h * this.sin_p12 / (u * A)), w = 0 === (d = Math.atan2(Math.sin(I), this.cos_p12 * Math.tan(l) - this.sin_p12 * Math.cos(I))) ? Math.asin(this.cos_p12 * Math.sin(l) - this.sin_p12 * Math.cos(l)) : Math.abs(Math.abs(d) - Math.PI) <= f ? -Math.asin(this.cos_p12 * Math.sin(l) - this.sin_p12 * Math.cos(l)) : Math.asin(Math.sin(I) * Math.cos(l) / Math.sin(d)), p = this.e * this.sin_p12 / Math.sqrt(1 - this.es), _ = h * w * (1 - (M = w * w) * (y = (m = this.e * this.cos_p12 * Math.cos(d) / Math.sqrt(1 - this.es)) * m) * (1 - y) / 6 + (x = M * w) / 8 * (g = p * m) * (1 - 2 * y) + (k = x * w) / 120 * (y * (4 - 7 * y) - 3 * p * p * (1 - 7 * y)) - k * w / 48 * g), t.x = this.x0 + _ * Math.sin(d), t.y = this.y0 + _ * Math.cos(d), t))
                },
                inverse: function(t) {
                    var e, i, r, n, s, a, o, h, u, l, d, p, m, g, y, _, v, b, w, M, x, k, E;
                    if (t.x -= this.x0, t.y -= this.y0, this.sphere) {
                        if ((e = Math.sqrt(t.x * t.x + t.y * t.y)) > 2 * c * this.a) return;
                        return i = e / this.a, r = Math.sin(i), n = Math.cos(i), s = this.long0, Math.abs(e) <= f ? a = this.lat0 : (a = Me(n * this.sin_p12 + t.y * r * this.cos_p12 / e), o = Math.abs(this.lat0) - c, s = Math.abs(o) <= f ? this.lat0 >= 0 ? G(this.long0 + Math.atan2(t.x, -t.y)) : G(this.long0 - Math.atan2(-t.x, t.y)) : G(this.long0 + Math.atan2(t.x * r, e * this.cos_p12 * n - t.y * this.sin_p12 * r))), t.x = s, t.y = a, t
                    }
                    return h = fe(this.es), u = de(this.es), l = pe(this.es), d = me(this.es), Math.abs(this.sin_p12 - 1) <= f ? (a = _e(((p = this.a * ce(h, u, l, d, c)) - (e = Math.sqrt(t.x * t.x + t.y * t.y))) / this.a, h, u, l, d), s = G(this.long0 + Math.atan2(t.x, -1 * t.y)), t.x = s, t.y = a, t) : Math.abs(this.sin_p12 + 1) <= f ? (p = this.a * ce(h, u, l, d, c), a = _e(((e = Math.sqrt(t.x * t.x + t.y * t.y)) - p) / this.a, h, u, l, d), s = G(this.long0 + Math.atan2(t.x, t.y)), t.x = s, t.y = a, t) : (e = Math.sqrt(t.x * t.x + t.y * t.y), y = Math.atan2(t.x, t.y), m = ge(this.a, this.e, this.sin_p12), _ = Math.cos(y), b = -(v = this.e * this.cos_p12 * _) * v / (1 - this.es), w = 3 * this.es * (1 - b) * this.sin_p12 * this.cos_p12 * _ / (1 - this.es), k = 1 - b * (x = (M = e / m) - b * (1 + b) * Math.pow(M, 3) / 6 - w * (1 + 3 * b) * Math.pow(M, 4) / 24) * x / 2 - M * x * x * x / 6, g = Math.asin(this.sin_p12 * Math.cos(x) + this.cos_p12 * Math.sin(x) * _), s = G(this.long0 + Math.asin(Math.sin(y) * Math.sin(x) / Math.cos(g))), E = Math.sin(g), a = Math.atan2((E - this.es * k * this.sin_p12) * Math.tan(g), E * (1 - this.es)), t.x = s, t.y = a, t)
                },
                names: ["Azimuthal_Equidistant", "aeqd"]
            },
            ze = {
                init: function() {
                    this.sin_p14 = Math.sin(this.lat0), this.cos_p14 = Math.cos(this.lat0)
                },
                forward: function(t) {
                    var e, i, r, n, s, a, o, h = t.x,
                        u = t.y;
                    return r = G(h - this.long0), e = Math.sin(u), i = Math.cos(u), n = Math.cos(r), ((s = this.sin_p14 * e + this.cos_p14 * i * n) > 0 || Math.abs(s) <= f) && (a = 1 * this.a * i * Math.sin(r), o = this.y0 + 1 * this.a * (this.cos_p14 * e - this.sin_p14 * i * n)), t.x = a, t.y = o, t
                },
                inverse: function(t) {
                    var e, i, r, n, s, a, o;
                    return t.x -= this.x0, t.y -= this.y0, i = Me((e = Math.sqrt(t.x * t.x + t.y * t.y)) / this.a), r = Math.sin(i), n = Math.cos(i), a = this.long0, Math.abs(e) <= f ? (o = this.lat0, t.x = a, t.y = o, t) : (o = Me(n * this.sin_p14 + t.y * r * this.cos_p14 / e), s = Math.abs(this.lat0) - c, Math.abs(s) <= f ? (a = this.lat0 >= 0 ? G(this.long0 + Math.atan2(t.x, -t.y)) : G(this.long0 - Math.atan2(-t.x, t.y)), t.x = a, t.y = o, t) : (a = G(this.long0 + Math.atan2(t.x * r, e * this.cos_p14 * n - t.y * this.sin_p14 * r)), t.x = a, t.y = o, t))
                },
                names: ["ortho"]
            };
        var Re = 1,
            Te = 2,
            je = 3,
            Fe = 4;

        function Ue(t, e, i, r) {
            var n;
            return t < f ? (r.value = Re, n = 0) : (n = Math.atan2(e, i), Math.abs(n) <= m ? r.value = Re : n > m && n <= c + m ? (r.value = Te, n -= c) : n > c + m || n <= -(c + m) ? (r.value = je, n = n >= 0 ? n - y : n + y) : (r.value = Fe, n += c)), n
        }

        function De(t, e) {
            var i = t + e;
            return i < -y ? i += g : i > +y && (i -= g), i
        }
        const qe = {
            init: function() {
                this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.lat0 = this.lat0 || 0, this.long0 = this.long0 || 0, this.lat_ts = this.lat_ts || 0, this.title = this.title || "Quadrilateralized Spherical Cube", this.lat0 >= c - m / 2 ? this.face = 5 : this.lat0 <= -(c - m / 2) ? this.face = 6 : Math.abs(this.long0) <= m ? this.face = 1 : Math.abs(this.long0) <= c + m ? this.face = this.long0 > 0 ? 2 : 4 : this.face = 3, 0 !== this.es && (this.one_minus_f = 1 - (this.a - this.b) / this.a, this.one_minus_f_squared = this.one_minus_f * this.one_minus_f)
            },
            forward: function(t) {
                var e, i, r, n, s, a, o = {
                        x: 0,
                        y: 0
                    },
                    h = {
                        value: 0
                    };
                if (t.x -= this.long0, e = 0 !== this.es ? Math.atan(this.one_minus_f_squared * Math.tan(t.y)) : t.y, i = t.x, 5 === this.face) n = c - e, i >= m && i <= c + m ? (h.value = Re, r = i - c) : i > c + m || i <= -(c + m) ? (h.value = Te, r = i > 0 ? i - y : i + y) : i > -(c + m) && i <= -m ? (h.value = je, r = i + c) : (h.value = Fe, r = i);
                else if (6 === this.face) n = c + e, i >= m && i <= c + m ? (h.value = Re, r = -i + c) : i < m && i >= -m ? (h.value = Te, r = -i) : i < -m && i >= -(c + m) ? (h.value = je, r = -i - c) : (h.value = Fe, r = i > 0 ? -i + y : -i - y);
                else {
                    var u, l, f, d, p, g;
                    2 === this.face ? i = De(i, +c) : 3 === this.face ? i = De(i, +y) : 4 === this.face && (i = De(i, -c)), d = Math.sin(e), p = Math.cos(e), g = Math.sin(i), u = p * Math.cos(i), l = p * g, f = d, 1 === this.face ? r = Ue(n = Math.acos(u), f, l, h) : 2 === this.face ? r = Ue(n = Math.acos(l), f, -u, h) : 3 === this.face ? r = Ue(n = Math.acos(-u), f, -l, h) : 4 === this.face ? r = Ue(n = Math.acos(-l), f, u, h) : (n = r = 0, h.value = Re)
                }
                return a = Math.atan(12 / y * (r + Math.acos(Math.sin(r) * Math.cos(m)) - c)), s = Math.sqrt((1 - Math.cos(n)) / (Math.cos(a) * Math.cos(a)) / (1 - Math.cos(Math.atan(1 / Math.cos(r))))), h.value === Te ? a += c : h.value === je ? a += y : h.value === Fe && (a += 1.5 * y), o.x = s * Math.cos(a), o.y = s * Math.sin(a), o.x = o.x * this.a + this.x0, o.y = o.y * this.a + this.y0, t.x = o.x, t.y = o.y, t
            },
            inverse: function(t) {
                var e, i, r, n, s, a, o, h, u, l, f, d, p = {
                        lam: 0,
                        phi: 0
                    },
                    m = {
                        value: 0
                    };
                if (t.x = (t.x - this.x0) / this.a, t.y = (t.y - this.y0) / this.a, i = Math.atan(Math.sqrt(t.x * t.x + t.y * t.y)), e = Math.atan2(t.y, t.x), t.x >= 0 && t.x >= Math.abs(t.y) ? m.value = Re : t.y >= 0 && t.y >= Math.abs(t.x) ? (m.value = Te, e -= c) : t.x < 0 && -t.x >= Math.abs(t.y) ? (m.value = je, e = e < 0 ? e + y : e - y) : (m.value = Fe, e += c), u = y / 12 * Math.tan(e), s = Math.sin(u) / (Math.cos(u) - 1 / Math.sqrt(2)), a = Math.atan(s), (o = 1 - (r = Math.cos(e)) * r * (n = Math.tan(i)) * n * (1 - Math.cos(Math.atan(1 / Math.cos(a))))) < -1 ? o = -1 : o > 1 && (o = 1), 5 === this.face) h = Math.acos(o), p.phi = c - h, m.value === Re ? p.lam = a + c : m.value === Te ? p.lam = a < 0 ? a + y : a - y : m.value === je ? p.lam = a - c : p.lam = a;
                else if (6 === this.face) h = Math.acos(o), p.phi = h - c, m.value === Re ? p.lam = -a + c : m.value === Te ? p.lam = -a : m.value === je ? p.lam = -a - c : p.lam = a < 0 ? -a - y : -a + y;
                else {
                    var g, _, v;
                    u = (g = o) * g, _ = (u += (v = u >= 1 ? 0 : Math.sqrt(1 - u) * Math.sin(a)) * v) >= 1 ? 0 : Math.sqrt(1 - u), m.value === Te ? (u = _, _ = -v, v = u) : m.value === je ? (_ = -_, v = -v) : m.value === Fe && (u = _, _ = v, v = -u), 2 === this.face ? (u = g, g = -_, _ = u) : 3 === this.face ? (g = -g, _ = -_) : 4 === this.face && (u = g, g = _, _ = -u), p.phi = Math.acos(-v) - c, p.lam = Math.atan2(_, g), 2 === this.face ? p.lam = De(p.lam, -c) : 3 === this.face ? p.lam = De(p.lam, -y) : 4 === this.face && (p.lam = De(p.lam, +c))
                }
                return 0 !== this.es && (l = p.phi < 0 ? 1 : 0, f = Math.tan(p.phi), d = this.b / Math.sqrt(f * f + this.one_minus_f_squared), p.phi = Math.atan(Math.sqrt(this.a * this.a - d * d) / (this.one_minus_f * d)), l && (p.phi = -p.phi)), p.lam += this.long0, t.x = p.lam, t.y = p.phi, t
            },
            names: ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"]
        };
        var Ge = [
                [1, 22199e-21, -715515e-10, 31103e-10],
                [.9986, -482243e-9, -24897e-9, -13309e-10],
                [.9954, -83103e-8, -448605e-10, -9.86701e-7],
                [.99, -.00135364, -59661e-9, 36777e-10],
                [.9822, -.00167442, -449547e-11, -572411e-11],
                [.973, -.00214868, -903571e-10, 1.8736e-8],
                [.96, -.00305085, -900761e-10, 164917e-11],
                [.9427, -.00382792, -653386e-10, -26154e-10],
                [.9216, -.00467746, -10457e-8, 481243e-11],
                [.8962, -.00536223, -323831e-10, -543432e-11],
                [.8679, -.00609363, -113898e-9, 332484e-11],
                [.835, -.00698325, -640253e-10, 9.34959e-7],
                [.7986, -.00755338, -500009e-10, 9.35324e-7],
                [.7597, -.00798324, -35971e-9, -227626e-11],
                [.7186, -.00851367, -701149e-10, -86303e-10],
                [.6732, -.00986209, -199569e-9, 191974e-10],
                [.6213, -.010418, 883923e-10, 624051e-11],
                [.5722, -.00906601, 182e-6, 624051e-11],
                [.5322, -.00677797, 275608e-9, 624051e-11]
            ],
            We = [
                [-520417e-23, .0124, 121431e-23, -845284e-16],
                [.062, .0124, -1.26793e-9, 4.22642e-10],
                [.124, .0124, 5.07171e-9, -1.60604e-9],
                [.186, .0123999, -1.90189e-8, 6.00152e-9],
                [.248, .0124002, 7.10039e-8, -2.24e-8],
                [.31, .0123992, -2.64997e-7, 8.35986e-8],
                [.372, .0124029, 9.88983e-7, -3.11994e-7],
                [.434, .0123893, -369093e-11, -4.35621e-7],
                [.4958, .0123198, -102252e-10, -3.45523e-7],
                [.5571, .0121916, -154081e-10, -5.82288e-7],
                [.6176, .0119938, -241424e-10, -5.25327e-7],
                [.6769, .011713, -320223e-10, -5.16405e-7],
                [.7346, .0113541, -397684e-10, -6.09052e-7],
                [.7903, .0109107, -489042e-10, -104739e-11],
                [.8435, .0103431, -64615e-9, -1.40374e-9],
                [.8936, .00969686, -64636e-9, -8547e-9],
                [.9394, .00840947, -192841e-9, -42106e-10],
                [.9761, .00616527, -256e-6, -42106e-10],
                [1, .00328947, -319159e-9, -42106e-10]
            ],
            Ze = .8487,
            He = 1.3523,
            Je = p / 5,
            Ke = 1 / Je,
            Xe = function(t, e) {
                return t[0] + e * (t[1] + e * (t[2] + e * t[3]))
            };
        const $e = {
                init: function() {
                    this.x0 = this.x0 || 0, this.y0 = this.y0 || 0, this.long0 = this.long0 || 0, this.es = 0, this.title = this.title || "Robinson"
                },
                forward: function(t) {
                    var e = G(t.x - this.long0),
                        i = Math.abs(t.y),
                        r = Math.floor(i * Je);
                    r < 0 ? r = 0 : r >= 18 && (r = 17);
                    var n = {
                        x: Xe(Ge[r], i = p * (i - Ke * r)) * e,
                        y: Xe(We[r], i)
                    };
                    return t.y < 0 && (n.y = -n.y), n.x = n.x * this.a * Ze + this.x0, n.y = n.y * this.a * He + this.y0, n
                },
                inverse: function(t) {
                    var e = {
                        x: (t.x - this.x0) / (this.a * Ze),
                        y: Math.abs(t.y - this.y0) / (this.a * He)
                    };
                    if (e.y >= 1) e.x /= Ge[18][0], e.y = t.y < 0 ? -c : c;
                    else {
                        var i = Math.floor(18 * e.y);
                        for (i < 0 ? i = 0 : i >= 18 && (i = 17);;)
                            if (We[i][0] > e.y) --i;
                            else {
                                if (!(We[i + 1][0] <= e.y)) break;
                                ++i
                            } var r = We[i],
                            n = 5 * (e.y - r[0]) / (We[i + 1][0] - r[0]);
                        n = function(t, e, i, r) {
                            for (var n = e; r; --r) {
                                var s = t(n);
                                if (n -= s, Math.abs(s) < 1e-10) break
                            }
                            return n
                        }((function(t) {
                            return (Xe(r, t) - e.y) / function(t, e) {
                                return t[1] + e * (2 * t[2] + 3 * e * t[3])
                            }(r, t)
                        }), n, 0, 100), e.x /= Xe(Ge[i], n), e.y = (5 * i + n) * d, t.y < 0 && (e.y = -e.y)
                    }
                    return e.x = G(e.x + this.long0), e
                },
                names: ["Robinson", "robin"]
            },
            Qe = {
                init: function() {
                    this.name = "geocent"
                },
                forward: function(t) {
                    return lt(t, this.es, this.a)
                },
                inverse: function(t) {
                    return ct(t, this.es, this.a, this.b)
                },
                names: ["Geocentric", "geocentric", "geocent", "Geocent"]
            };
        var Ve = {
            h: {
                def: 1e5,
                num: !0
            },
            azi: {
                def: 0,
                num: !0,
                degrees: !0
            },
            tilt: {
                def: 0,
                num: !0,
                degrees: !0
            },
            long0: {
                def: 0,
                num: !0
            },
            lat0: {
                def: 0,
                num: !0
            }
        };
        const Ye = {
                init: function() {
                    if (Object.keys(Ve).forEach(function(t) {
                            if (void 0 === this[t]) this[t] = Ve[t].def;
                            else {
                                if (Ve[t].num && isNaN(this[t])) throw new Error("Invalid parameter value, must be numeric " + t + " = " + this[t]);
                                Ve[t].num && (this[t] = parseFloat(this[t]))
                            }
                            Ve[t].degrees && (this[t] = this[t] * d)
                        }.bind(this)), Math.abs(Math.abs(this.lat0) - c) < f ? this.mode = this.lat0 < 0 ? 1 : 0 : Math.abs(this.lat0) < f ? this.mode = 2 : (this.mode = 3, this.sinph0 = Math.sin(this.lat0), this.cosph0 = Math.cos(this.lat0)), this.pn1 = this.h / this.a, this.pn1 <= 0 || this.pn1 > 1e10) throw new Error("Invalid height");
                    this.p = 1 + this.pn1, this.rp = 1 / this.p, this.h1 = 1 / this.pn1, this.pfact = (this.p + 1) * this.h1, this.es = 0;
                    var t = this.tilt,
                        e = this.azi;
                    this.cg = Math.cos(e), this.sg = Math.sin(e), this.cw = Math.cos(t), this.sw = Math.sin(t)
                },
                forward: function(t) {
                    t.x -= this.long0;
                    var e, i, r, n, s = Math.sin(t.y),
                        a = Math.cos(t.y),
                        o = Math.cos(t.x);
                    switch (this.mode) {
                        case 3:
                            i = this.sinph0 * s + this.cosph0 * a * o;
                            break;
                        case 2:
                            i = a * o;
                            break;
                        case 1:
                            i = -s;
                            break;
                        case 0:
                            i = s
                    }
                    switch (e = (i = this.pn1 / (this.p - i)) * a * Math.sin(t.x), this.mode) {
                        case 3:
                            i *= this.cosph0 * s - this.sinph0 * a * o;
                            break;
                        case 2:
                            i *= s;
                            break;
                        case 0:
                            i *= -a * o;
                            break;
                        case 1:
                            i *= a * o
                    }
                    return n = 1 / ((r = i * this.cg + e * this.sg) * this.sw * this.h1 + this.cw), e = (e * this.cg - i * this.sg) * this.cw * n, i = r * n, t.x = e * this.a, t.y = i * this.a, t
                },
                inverse: function(t) {
                    t.x /= this.a, t.y /= this.a;
                    var e, i, r, n = {
                        x: t.x,
                        y: t.y
                    };
                    r = 1 / (this.pn1 - t.y * this.sw), e = this.pn1 * t.x * r, i = this.pn1 * t.y * this.cw * r, t.x = e * this.cg + i * this.sg, t.y = i * this.cg - e * this.sg;
                    var s = Qt(t.x, t.y);
                    if (Math.abs(s) < f) n.x = 0, n.y = t.y;
                    else {
                        var a, o;
                        switch (o = 1 - s * s * this.pfact, o = (this.p - Math.sqrt(o)) / (this.pn1 / s + s / this.pn1), a = Math.sqrt(1 - o * o), this.mode) {
                            case 3:
                                n.y = Math.asin(a * this.sinph0 + t.y * o * this.cosph0 / s), t.y = (a - this.sinph0 * Math.sin(n.y)) * s, t.x *= o * this.cosph0;
                                break;
                            case 2:
                                n.y = Math.asin(t.y * o / s), t.y = a * s, t.x *= o;
                                break;
                            case 0:
                                n.y = Math.asin(a), t.y = -t.y;
                                break;
                            case 1:
                                n.y = -Math.asin(a)
                        }
                        n.x = Math.atan2(t.x, t.y)
                    }
                    return t.x = n.x + this.long0, t.y = n.y, t
                },
                names: ["Tilted_Perspective", "tpers"]
            },
            ti = {
                init: function() {
                    if (this.flip_axis = "x" === this.sweep ? 1 : 0, this.h = Number(this.h), this.radius_g_1 = this.h / this.a, this.radius_g_1 <= 0 || this.radius_g_1 > 1e10) throw new Error;
                    if (this.radius_g = 1 + this.radius_g_1, this.C = this.radius_g * this.radius_g - 1, 0 !== this.es) {
                        var t = 1 - this.es,
                            e = 1 / t;
                        this.radius_p = Math.sqrt(t), this.radius_p2 = t, this.radius_p_inv2 = e, this.shape = "ellipse"
                    } else this.radius_p = 1, this.radius_p2 = 1, this.radius_p_inv2 = 1, this.shape = "sphere";
                    this.title || (this.title = "Geostationary Satellite View")
                },
                forward: function(t) {
                    var e, i, r, n, s = t.x,
                        a = t.y;
                    if (s -= this.long0, "ellipse" === this.shape) {
                        a = Math.atan(this.radius_p2 * Math.tan(a));
                        var o = this.radius_p / Qt(this.radius_p * Math.cos(a), Math.sin(a));
                        if (i = o * Math.cos(s) * Math.cos(a), r = o * Math.sin(s) * Math.cos(a), n = o * Math.sin(a), (this.radius_g - i) * i - r * r - n * n * this.radius_p_inv2 < 0) return t.x = Number.NaN, t.y = Number.NaN, t;
                        e = this.radius_g - i, this.flip_axis ? (t.x = this.radius_g_1 * Math.atan(r / Qt(n, e)), t.y = this.radius_g_1 * Math.atan(n / e)) : (t.x = this.radius_g_1 * Math.atan(r / e), t.y = this.radius_g_1 * Math.atan(n / Qt(r, e)))
                    } else "sphere" === this.shape && (e = Math.cos(a), i = Math.cos(s) * e, r = Math.sin(s) * e, n = Math.sin(a), e = this.radius_g - i, this.flip_axis ? (t.x = this.radius_g_1 * Math.atan(r / Qt(n, e)), t.y = this.radius_g_1 * Math.atan(n / e)) : (t.x = this.radius_g_1 * Math.atan(r / e), t.y = this.radius_g_1 * Math.atan(n / Qt(r, e))));
                    return t.x = t.x * this.a, t.y = t.y * this.a, t
                },
                inverse: function(t) {
                    var e, i, r, n, s = -1,
                        a = 0,
                        o = 0;
                    if (t.x = t.x / this.a, t.y = t.y / this.a, "ellipse" === this.shape) {
                        this.flip_axis ? (o = Math.tan(t.y / this.radius_g_1), a = Math.tan(t.x / this.radius_g_1) * Qt(1, o)) : (a = Math.tan(t.x / this.radius_g_1), o = Math.tan(t.y / this.radius_g_1) * Qt(1, a));
                        var h = o / this.radius_p;
                        if (e = a * a + h * h + s * s, (r = (i = 2 * this.radius_g * s) * i - 4 * e * this.C) < 0) return t.x = Number.NaN, t.y = Number.NaN, t;
                        n = (-i - Math.sqrt(r)) / (2 * e), s = this.radius_g + n * s, a *= n, o *= n, t.x = Math.atan2(a, s), t.y = Math.atan(o * Math.cos(t.x) / s), t.y = Math.atan(this.radius_p_inv2 * Math.tan(t.y))
                    } else if ("sphere" === this.shape) {
                        if (this.flip_axis ? (o = Math.tan(t.y / this.radius_g_1), a = Math.tan(t.x / this.radius_g_1) * Math.sqrt(1 + o * o)) : (a = Math.tan(t.x / this.radius_g_1), o = Math.tan(t.y / this.radius_g_1) * Math.sqrt(1 + a * a)), e = a * a + o * o + s * s, (r = (i = 2 * this.radius_g * s) * i - 4 * e * this.C) < 0) return t.x = Number.NaN, t.y = Number.NaN, t;
                        n = (-i - Math.sqrt(r)) / (2 * e), s = this.radius_g + n * s, a *= n, o *= n, t.x = Math.atan2(a, s), t.y = Math.atan(o * Math.cos(t.x) / s)
                    }
                    return t.x = t.x + this.long0, t
                },
                names: ["Geostationary Satellite View", "Geostationary_Satellite", "geos"]
            };
        var ei;
        xt.defaultDatum = "WGS84", xt.Proj = ut, xt.WGS84 = new xt.Proj("WGS84"), xt.Point = qt, xt.toPoint = yt, xt.defs = T, xt.nadgrid = function(t, e) {
            var i = new DataView(e),
                r = function(t) {
                    var e = t.getInt32(8, !1);
                    return 11 !== e && (11 !== (e = t.getInt32(8, !0)) && console.warn("Failed to detect nadgrid endian-ness, defaulting to little-endian"), !0)
                }(i),
                n = function(t, e) {
                    return {
                        nFields: t.getInt32(8, e),
                        nSubgridFields: t.getInt32(24, e),
                        nSubgrids: t.getInt32(40, e),
                        shiftType: nt(t, 56, 64).trim(),
                        fromSemiMajorAxis: t.getFloat64(120, e),
                        fromSemiMinorAxis: t.getFloat64(136, e),
                        toSemiMajorAxis: t.getFloat64(152, e),
                        toSemiMinorAxis: t.getFloat64(168, e)
                    }
                }(i, r);
            n.nSubgrids > 1 && console.log("Only single NTv2 subgrids are currently supported, subsequent sub grids are ignored");
            var s = function(t, e, i) {
                    for (var r = [], n = 0; n < e.nSubgrids; n++) {
                        var s = at(t, 176, i),
                            a = ot(t, 176, s, i),
                            o = Math.round(1 + (s.upperLongitude - s.lowerLongitude) / s.longitudeInterval),
                            h = Math.round(1 + (s.upperLatitude - s.lowerLatitude) / s.latitudeInterval);
                        r.push({
                            ll: [rt(s.lowerLongitude), rt(s.lowerLatitude)],
                            del: [rt(s.longitudeInterval), rt(s.latitudeInterval)],
                            lim: [o, h],
                            count: s.gridNodeCount,
                            cvs: st(a)
                        })
                    }
                    return r
                }(i, n, r),
                a = {
                    header: n,
                    subgrids: s
                };
            return et[t] = a, a
        }, xt.transform = vt, xt.mgrs = Nt, xt.version = "__VERSION__", (ei = xt).Proj.projections.add(Xt), ei.Proj.projections.add(te), ei.Proj.projections.add(ee), ei.Proj.projections.add(ne), ei.Proj.projections.add(se), ei.Proj.projections.add(ae), ei.Proj.projections.add(he), ei.Proj.projections.add(ue), ei.Proj.projections.add(le), ei.Proj.projections.add(ve), ei.Proj.projections.add(we), ei.Proj.projections.add(xe), ei.Proj.projections.add(ke), ei.Proj.projections.add(Ee), ei.Proj.projections.add(Ce), ei.Proj.projections.add(Se), ei.Proj.projections.add(Ae), ei.Proj.projections.add(Ie), ei.Proj.projections.add(Oe), ei.Proj.projections.add(Be), ei.Proj.projections.add(Ne), ei.Proj.projections.add(Le), ei.Proj.projections.add(Pe), ei.Proj.projections.add(ze), ei.Proj.projections.add(qe), ei.Proj.projections.add($e), ei.Proj.projections.add(Qe), ei.Proj.projections.add(Ye), ei.Proj.projections.add(ti);
        const ii = xt
    },
    830: (t, e, i) => {
        const r = i(389),
            n = i(208),
            s = i(764).lW;
        t.exports = function(t, e) {
            return new r((function(i, r) {
                const a = n(t, e),
                    o = new XMLHttpRequest;
                o.open("GET", a, !0), "prj" !== e && "cpg" !== e && (o.responseType = "arraybuffer"), o.addEventListener("load", (function() {
                    return o.status > 399 ? "prj" === e || "cpg" === e ? i(!1) : r(new Error(o.status)) : i("prj" !== e && "cpg" !== e ? s.from(o.response) : o.response)
                }), !1), o.send()
            }))
        }
    },
    78: (t, e, i) => {
        const r = i(830),
            n = i(208),
            s = i(764).lW;
        t.exports = async function(t, e) {
            if (!i.g.fetch) return r(t, e);
            const a = n(t, e),
                o = "prj" === e || "cpg" === e;
            try {
                const t = await fetch(a);
                if (t.status > 399) throw new Error(t.statusText);
                if (o) return t.text();
                const e = await t.arrayBuffer();
                return s.from(e)
            } catch (t) {
                if (console.log("ERROR", t, e), o || "dbf" === e) return !1;
                throw t
            }
        }
    },
    208: (t, e, i) => {
        const r = i.g.URL;
        t.exports = (t, e) => {
            if (!e) return t;
            const i = new r(t);
            return i.pathname = `${i.pathname}.${e}`, i.href
        }
    },
    3: (t, e, i) => {
        let r = i(472);
        r.default && (r = r.default);
        const n = i(555),
            s = i(78),
            a = i(415),
            o = i(462),
            h = i(389),
            u = i(79),
            l = i(764).lW,
            c = i.g.URL,
            f = new u({
                max: 20
            });

        function d(t) {
            if (!t) throw new Error("forgot to pass buffer");
            return l.isBuffer(t) ? t : p(t) ? l.from(t) : p(t.buffer) ? 1 === t.BYTES_PER_ELEMENT ? l.from(t) : l.from(t.buffer) : void 0
        }

        function p(t) {
            return t instanceof i.g.ArrayBuffer || "[object ArrayBuffer]" === Object.prototype.toString.call(t)
        }

        function m(t, e) {
            return "string" == typeof t && f.has(t) ? h.resolve(f.get(t)) : m.getShapefile(t, e).then((function(e) {
                return "string" == typeof t && f.set(t, e), e
            }))
        }
        m.combine = function([t, e]) {
            const i = {
                type: "FeatureCollection",
                features: []
            };
            let r = 0;
            const n = t.length;
            for (e || (e = []); r < n;) i.features.push({
                type: "Feature",
                geometry: t[r],
                properties: e[r] || {}
            }), r++;
            return i
        }, m.parseZip = async function(t, e) {
            let i;
            t = d(t);
            const s = await n(t),
                h = [];
            for (i in e = e || [], s) - 1 === i.indexOf("__MACOSX") && ("shp" === i.slice(-3).toLowerCase() ? (h.push(i.slice(0, -4)), s[i.slice(0, -3) + i.slice(-3).toLowerCase()] = s[i]) : "prj" === i.slice(-3).toLowerCase() ? s[i.slice(0, -3) + i.slice(-3).toLowerCase()] = r(s[i]) : "json" === i.slice(-4).toLowerCase() || e.indexOf(i.split(".").pop()) > -1 ? h.push(i.slice(0, -3) + i.slice(-3).toLowerCase()) : "dbf" !== i.slice(-3).toLowerCase() && "cpg" !== i.slice(-3).toLowerCase() || (s[i.slice(0, -3) + i.slice(-3).toLowerCase()] = s[i]));
            if (!h.length) throw new Error("no layers founds");
            const u = h.map((function(t) {
                let i, r;
                const n = t.lastIndexOf(".");
                return n > -1 && t.slice(n).indexOf("json") > -1 ? (i = JSON.parse(s[t]), i.fileName = t.slice(0, n)) : e.indexOf(t.slice(n + 1)) > -1 ? (i = s[t], i.fileName = t) : (s[t + ".dbf"] && (r = o(s[t + ".dbf"], s[t + ".cpg"])), i = m.combine([a(s[t + ".shp"], s[t + ".prj"]), r]), i.fileName = t), i
            }));
            return 1 === u.length ? u[0] : u
        };
        const g = async t => {
            const e = await h.all([s(t, "shp"), s(t, "prj")]);
            let i = !1;
            try {
                e[1] && (i = r(e[1]))
            } catch (t) {
                i = !1
            }
            return a(e[0], i)
        }, y = async t => {
            const [e, i] = await h.all([s(t, "dbf"), s(t, "cpg")]);
            if (e) return o(e, i)
        };
        m.getShapefile = async function(t, e) {
            if ("string" != typeof t) return m.parseZip(t);
            if (((t, e) => ".zip" === new c(t).pathname.slice(-4).toLowerCase())(t)) return async function(t, e) {
                const i = await s(t);
                return m.parseZip(i, e)
            }(t, e);
            const i = await h.all([g(t), y(t)]);
            return m.combine(i)
        }, m.parseShp = function(t, e) {
            if (t = d(t), l.isBuffer(e) && (e = e.toString()), "string" == typeof e) try {
                e = r(e)
            } catch (t) {
                e = !1
            }
            return a(t, e)
        }, m.parseDbf = function(t, e) {
            return t = d(t), o(t, e)
        }, t.exports = m
    },
    415: t => {
        function e(t, e) {
            return ! function(t) {
                let e = 0,
                    i = 1;
                const r = t.length;
                let n, s;
                for (; i < r;) n = s || t[0], s = t[i], e += (s[0] - n[0]) * (s[1] + n[1]), i++;
                return e > 0
            }(e) && t.length ? t[t.length - 1].push(e) : t.push([e]), t
        }
        r.prototype.parsePoint = function(t) {
            return {
                type: "Point",
                coordinates: this.parseCoord(t, 0)
            }
        }, r.prototype.parseZPoint = function(t) {
            const e = this.parsePoint(t);
            return e.coordinates.push(t.readDoubleLE(16)), e
        }, r.prototype.parsePointArray = function(t, e, i) {
            const r = [];
            let n = 0;
            for (; n < i;) r.push(this.parseCoord(t, e)), e += 16, n++;
            return r
        }, r.prototype.parseZPointArray = function(t, e, i, r) {
            let n = 0;
            for (; n < i;) r[n].push(t.readDoubleLE(e)), n++, e += 8;
            return r
        }, r.prototype.parseArrayGroup = function(t, e, i, r, n) {
            const s = [];
            let a, o, h = 0,
                u = 0;
            for (; h < r;) h++, i += 4, a = u, u = h === r ? n : t.readInt32LE(i), o = u - a, o && (s.push(this.parsePointArray(t, e, o)), e += o << 4);
            return s
        }, r.prototype.parseZArrayGroup = function(t, e, i, r) {
            let n = 0;
            for (; n < i;) r[n] = this.parseZPointArray(t, e, r[n].length, r[n]), e += r[n].length << 3, n++;
            return r
        }, r.prototype.parseMultiPoint = function(t) {
            const e = {},
                i = t.readInt32LE(32, !0);
            if (!i) return null;
            const r = this.parseCoord(t, 0),
                n = this.parseCoord(t, 16);
            return e.bbox = [r[0], r[1], n[0], n[1]], 1 === i ? (e.type = "Point", e.coordinates = this.parseCoord(t, 36)) : (e.type = "MultiPoint", e.coordinates = this.parsePointArray(t, 36, i)), e
        }, r.prototype.parseZMultiPoint = function(t) {
            const e = this.parseMultiPoint(t);
            if (!e) return null;
            let i;
            if ("Point" === e.type) return e.coordinates.push(t.readDoubleLE(72)), e;
            i = e.coordinates.length;
            const r = 52 + (i << 4);
            return e.coordinates = this.parseZPointArray(t, r, i, e.coordinates), e
        }, r.prototype.parsePolyline = function(t) {
            const e = {},
                i = t.readInt32LE(32);
            if (!i) return null;
            const r = this.parseCoord(t, 0),
                n = this.parseCoord(t, 16);
            e.bbox = [r[0], r[1], n[0], n[1]];
            const s = t.readInt32LE(36);
            let a, o;
            return 1 === i ? (e.type = "LineString", a = 44, e.coordinates = this.parsePointArray(t, a, s)) : (e.type = "MultiLineString", a = 40 + (i << 2), o = 40, e.coordinates = this.parseArrayGroup(t, a, 40, i, s)), e
        }, r.prototype.parseZPolyline = function(t) {
            const e = this.parsePolyline(t);
            if (!e) return null;
            const i = e.coordinates.length;
            let r;
            return "LineString" === e.type ? (r = 60 + (i << 4), e.coordinates = this.parseZPointArray(t, r, i, e.coordinates), e) : (r = 56 + (e.coordinates.reduce((function(t, e) {
                return t + e.length
            }), 0) << 4) + (i << 2), e.coordinates = this.parseZArrayGroup(t, r, i, e.coordinates), e)
        }, r.prototype.polyFuncs = function(t) {
            return t ? "LineString" === t.type ? (t.type = "Polygon", t.coordinates = [t.coordinates], t) : (t.coordinates = t.coordinates.reduce(e, []), 1 === t.coordinates.length ? (t.type = "Polygon", t.coordinates = t.coordinates[0], t) : (t.type = "MultiPolygon", t)) : t
        }, r.prototype.parsePolygon = function(t) {
            return this.polyFuncs(this.parsePolyline(t))
        }, r.prototype.parseZPolygon = function(t) {
            return this.polyFuncs(this.parseZPolyline(t))
        };
        const i = {
            1: "parsePoint",
            3: "parsePolyline",
            5: "parsePolygon",
            8: "parseMultiPoint",
            11: "parseZPoint",
            13: "parseZPolyline",
            15: "parseZPolygon",
            18: "parseZMultiPoint"
        };

        function r(t, e) {
            if (!(this instanceof r)) return new r(t, e);
            this.buffer = t, this.headers = this.parseHeader(), this.headers.length < this.buffer.byteLength && (this.buffer = this.buffer.slice(0, this.headers.length)), this.shpFuncs(e), this.rows = this.getRows()
        }
        r.prototype.shpFuncs = function(t) {
            let e = this.headers.shpCode;
            if (e > 20 && (e -= 20), !(e in i)) throw new Error("I don't know that shp type");
            var r;
            this.parseFunc = this[i[e]], this.parseCoord = (r = t) ? function(t, e) {
                const i = [t.readDoubleLE(e), t.readDoubleLE(e + 8)];
                return r.inverse(i)
            } : function(t, e) {
                return [t.readDoubleLE(e), t.readDoubleLE(e + 8)]
            }
        }, r.prototype.getShpCode = function() {
            return this.parseHeader().shpCode
        }, r.prototype.parseHeader = function() {
            const t = this.buffer.slice(0, 100);
            return {
                length: t.readInt32BE(24) << 1,
                version: t.readInt32LE(28),
                shpCode: t.readInt32LE(32),
                bbox: [t.readDoubleLE(36), t.readDoubleLE(44), t.readDoubleLE(52), t.readDoubleLE(52)]
            }
        }, r.prototype.getRows = function() {
            let t = 100;
            const e = this.buffer.byteLength,
                i = [];
            let r;
            for (; t < e && (r = this.getRow(t), r);) t += 8, t += r.len, r.type ? i.push(this.parseFunc(r.data)) : i.push(null);
            return i
        }, r.prototype.getRow = function(t) {
            const e = this.buffer.slice(t, t + 12),
                i = e.readInt32BE(4) << 1,
                r = e.readInt32BE(0);
            return 0 === i ? {
                id: r,
                len: i,
                type: 0
            } : {
                id: r,
                len: i,
                data: this.buffer.slice(t + 12, t + i + 8),
                type: e.readInt32LE(8)
            }
        }, t.exports = function(t, e) {
            return new r(t, e).rows
        }
    },
    555: (t, e, i) => {
        const r = i(733);
        t.exports = async t => {
            const e = new r;
            await e.loadAsync(t);
            const i = e.file(/.+/),
                n = {};
            return await Promise.all(i.map((async t => {
                let e;
                e = "shp" === t.name.slice(-3).toLowerCase() || "dbf" === t.name.slice(-3).toLowerCase() ? await t.async("nodebuffer") : await t.async("text"), n[t.name] = e
            }))), n
        }
    },
    79: t => {
        ! function() {
            function e(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }

            function i() {
                return 1
            }
            t.exports ? t.exports = s : this.LRUCache = s;
            var r = !1;

            function n(t) {
                r || "string" == typeof t || "number" == typeof t || (r = !0, console.error(new TypeError("LRU: key must be a string or number. Almost certainly a bug! " + typeof t).stack))
            }

            function s(t) {
                if (!(this instanceof s)) return new s(t);
                "number" == typeof t && (t = {
                    max: t
                }), t || (t = {}), this._max = t.max, (!this._max || "number" != typeof this._max || this._max <= 0) && (this._max = 1 / 0), this._lengthCalculator = t.length || i, "function" != typeof this._lengthCalculator && (this._lengthCalculator = i), this._allowStale = t.stale || !1, this._maxAge = t.maxAge || null, this._dispose = t.dispose, this.reset()
            }

            function a(t, e, i) {
                n(e);
                var r = t._cache[e];
                return r && (o(t, r) ? (l(t, r), t._allowStale || (r = void 0)) : i && function(t, e) {
                    u(t, e), e.lu = t._mru++, t._lruList[e.lu] = e
                }(t, r), r && (r = r.value)), r
            }

            function o(t, e) {
                if (!e || !e.maxAge && !t._maxAge) return !1;
                var i = Date.now() - e.now;
                return e.maxAge ? i > e.maxAge : t._maxAge && i > t._maxAge
            }

            function h(t) {
                for (; t._lru < t._mru && t._length > t._max;) l(t, t._lruList[t._lru])
            }

            function u(t, e) {
                for (delete t._lruList[e.lu]; t._lru < t._mru && !t._lruList[t._lru];) t._lru++
            }

            function l(t, e) {
                e && (t._dispose && t._dispose(e.key, e.value), t._length -= e.length, t._itemCount--, delete t._cache[e.key], u(t, e))
            }

            function c(t, e, i, r, n, s) {
                this.key = t, this.value = e, this.lu = i, this.length = r, this.now = n, s && (this.maxAge = s)
            }
            Object.defineProperty(s.prototype, "max", {
                set: function(t) {
                    (!t || "number" != typeof t || t <= 0) && (t = 1 / 0), this._max = t, this._length > this._max && h(this)
                },
                get: function() {
                    return this._max
                },
                enumerable: !0
            }), Object.defineProperty(s.prototype, "lengthCalculator", {
                set: function(t) {
                    if ("function" != typeof t)
                        for (var e in this._lengthCalculator = i, this._length = this._itemCount, this._cache) this._cache[e].length = 1;
                    else
                        for (var e in this._lengthCalculator = t, this._length = 0, this._cache) this._cache[e].length = this._lengthCalculator(this._cache[e].value), this._length += this._cache[e].length;
                    this._length > this._max && h(this)
                },
                get: function() {
                    return this._lengthCalculator
                },
                enumerable: !0
            }), Object.defineProperty(s.prototype, "length", {
                get: function() {
                    return this._length
                },
                enumerable: !0
            }), Object.defineProperty(s.prototype, "itemCount", {
                get: function() {
                    return this._itemCount
                },
                enumerable: !0
            }), s.prototype.forEach = function(t, e) {
                e = e || this;
                for (var i = 0, r = this._itemCount, n = this._mru - 1; n >= 0 && i < r; n--)
                    if (this._lruList[n]) {
                        i++;
                        var s = this._lruList[n];
                        o(this, s) && (l(this, s), this._allowStale || (s = void 0)), s && t.call(e, s.value, s.key, this)
                    }
            }, s.prototype.keys = function() {
                for (var t = new Array(this._itemCount), e = 0, i = this._mru - 1; i >= 0 && e < this._itemCount; i--)
                    if (this._lruList[i]) {
                        var r = this._lruList[i];
                        t[e++] = r.key
                    } return t
            }, s.prototype.values = function() {
                for (var t = new Array(this._itemCount), e = 0, i = this._mru - 1; i >= 0 && e < this._itemCount; i--)
                    if (this._lruList[i]) {
                        var r = this._lruList[i];
                        t[e++] = r.value
                    } return t
            }, s.prototype.reset = function() {
                if (this._dispose && this._cache)
                    for (var t in this._cache) this._dispose(t, this._cache[t].value);
                this._cache = Object.create(null), this._lruList = Object.create(null), this._mru = 0, this._lru = 0, this._length = 0, this._itemCount = 0
            }, s.prototype.dump = function() {
                for (var t = [], e = 0, i = this._mru - 1; i >= 0 && e < this._itemCount; i--)
                    if (this._lruList[i]) {
                        var r = this._lruList[i];
                        o(this, r) || (++e, t.push({
                            k: r.key,
                            v: r.value,
                            e: r.now + (r.maxAge || 0)
                        }))
                    } return t
            }, s.prototype.dumpLru = function() {
                return this._lruList
            }, s.prototype.set = function(t, i, r) {
                r = r || this._maxAge, n(t);
                var s = r ? Date.now() : 0,
                    a = this._lengthCalculator(i);
                if (e(this._cache, t)) return a > this._max ? (l(this, this._cache[t]), !1) : (this._dispose && this._dispose(t, this._cache[t].value), this._cache[t].now = s, this._cache[t].maxAge = r, this._cache[t].value = i, this._length += a - this._cache[t].length, this._cache[t].length = a, this.get(t), this._length > this._max && h(this), !0);
                var o = new c(t, i, this._mru++, a, s, r);
                return o.length > this._max ? (this._dispose && this._dispose(t, i), !1) : (this._length += o.length, this._lruList[o.lu] = this._cache[t] = o, this._itemCount++, this._length > this._max && h(this), !0)
            }, s.prototype.has = function(t) {
                return n(t), !!e(this._cache, t) && !o(this, this._cache[t])
            }, s.prototype.get = function(t) {
                return n(t), a(this, t, !0)
            }, s.prototype.peek = function(t) {
                return n(t), a(this, t, !1)
            }, s.prototype.pop = function() {
                var t = this._lruList[this._lru];
                return l(this, t), t || null
            }, s.prototype.del = function(t) {
                n(t), l(this, this._cache[t])
            }, s.prototype.load = function(t) {
                this.reset();
                for (var e = Date.now(), i = t.length - 1; i >= 0; i--) {
                    var r = t[i];
                    n(r.k);
                    var s = r.e || 0;
                    if (0 === s) this.set(r.k, r.v);
                    else {
                        var a = s - e;
                        a > 0 && this.set(r.k, r.v, a)
                    }
                }
            }
        }()
    },
    941: (t, e, i) => {
        var r = i(764).lW,
            n = r.isEncoding || function(t) {
                switch (t && t.toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                    case "raw":
                        return !0;
                    default:
                        return !1
                }
            },
            s = e.s = function(t) {
                switch (this.encoding = (t || "utf8").toLowerCase().replace(/[-_]/, ""), function(t) {
                        if (t && !n(t)) throw new Error("Unknown encoding: " + t)
                    }(t), this.encoding) {
                    case "utf8":
                        this.surrogateSize = 3;
                        break;
                    case "ucs2":
                    case "utf16le":
                        this.surrogateSize = 2, this.detectIncompleteChar = o;
                        break;
                    case "base64":
                        this.surrogateSize = 3, this.detectIncompleteChar = h;
                        break;
                    default:
                        return void(this.write = a)
                }
                this.charBuffer = new r(6), this.charReceived = 0, this.charLength = 0
            };

        function a(t) {
            return t.toString(this.encoding)
        }

        function o(t) {
            this.charReceived = t.length % 2, this.charLength = this.charReceived ? 2 : 0
        }

        function h(t) {
            this.charReceived = t.length % 3, this.charLength = this.charReceived ? 3 : 0
        }
        s.prototype.write = function(t) {
            for (var e = ""; this.charLength;) {
                var i = t.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : t.length;
                if (t.copy(this.charBuffer, this.charReceived, 0, i), this.charReceived += i, this.charReceived < this.charLength) return "";
                if (t = t.slice(i, t.length), !((r = (e = this.charBuffer.slice(0, this.charLength).toString(this.encoding)).charCodeAt(e.length - 1)) >= 55296 && r <= 56319)) {
                    if (this.charReceived = this.charLength = 0, 0 === t.length) return e;
                    break
                }
                this.charLength += this.surrogateSize, e = ""
            }
            this.detectIncompleteChar(t);
            var r, n = t.length;
            if (this.charLength && (t.copy(this.charBuffer, 0, t.length - this.charReceived, n), n -= this.charReceived), n = (e += t.toString(this.encoding, 0, n)).length - 1, (r = e.charCodeAt(n)) >= 55296 && r <= 56319) {
                var s = this.surrogateSize;
                return this.charLength += s, this.charReceived += s, this.charBuffer.copy(this.charBuffer, s, 0, s), t.copy(this.charBuffer, 0, 0, s), e.substring(0, n)
            }
            return e
        }, s.prototype.detectIncompleteChar = function(t) {
            for (var e = t.length >= 3 ? 3 : t.length; e > 0; e--) {
                var i = t[t.length - e];
                if (1 == e && i >> 5 == 6) {
                    this.charLength = 2;
                    break
                }
                if (e <= 2 && i >> 4 == 14) {
                    this.charLength = 3;
                    break
                }
                if (e <= 3 && i >> 3 == 30) {
                    this.charLength = 4;
                    break
                }
            }
            this.charReceived = e
        }, s.prototype.end = function(t) {
            var e = "";
            if (t && t.length && (e = this.write(t)), this.charReceived) {
                var i = this.charReceived,
                    r = this.charBuffer,
                    n = this.encoding;
                e += r.slice(0, i).toString(n)
            }
            return e
        }
    },
    718: (t, e, i) => {
        t.exports = i(141)
    },
    141: function(t, e, i) {
        ! function(e) {
            function r(t, e, i) {
                return e <= t && t <= i
            }
            t.exports && !e["encoding-indexes"] && i(982);
            var n = Math.floor;

            function s(t) {
                if (void 0 === t) return {};
                if (t === Object(t)) return t;
                throw TypeError("Could not convert argument to dictionary")
            }

            function a(t) {
                return 0 <= t && t <= 127
            }
            var o = a,
                h = -1;

            function u(t) {
                this.tokens = [].slice.call(t), this.tokens.reverse()
            }
            u.prototype = {
                endOfStream: function() {
                    return !this.tokens.length
                },
                read: function() {
                    return this.tokens.length ? this.tokens.pop() : h
                },
                prepend: function(t) {
                    if (Array.isArray(t))
                        for (var e = t; e.length;) this.tokens.push(e.pop());
                    else this.tokens.push(t)
                },
                push: function(t) {
                    if (Array.isArray(t))
                        for (var e = t; e.length;) this.tokens.unshift(e.shift());
                    else this.tokens.unshift(t)
                }
            };
            var l = -1;

            function c(t, e) {
                if (t) throw TypeError("Decoder error");
                return e || 65533
            }

            function f(t) {
                throw TypeError("The code point " + t + " could not be encoded.")
            }

            function d(t) {
                return t = String(t).trim().toLowerCase(), Object.prototype.hasOwnProperty.call(m, t) ? m[t] : null
            }
            var p = [{
                    encodings: [{
                        labels: ["unicode-1-1-utf-8", "utf-8", "utf8"],
                        name: "UTF-8"
                    }],
                    heading: "The Encoding"
                }, {
                    encodings: [{
                        labels: ["866", "cp866", "csibm866", "ibm866"],
                        name: "IBM866"
                    }, {
                        labels: ["csisolatin2", "iso-8859-2", "iso-ir-101", "iso8859-2", "iso88592", "iso_8859-2", "iso_8859-2:1987", "l2", "latin2"],
                        name: "ISO-8859-2"
                    }, {
                        labels: ["csisolatin3", "iso-8859-3", "iso-ir-109", "iso8859-3", "iso88593", "iso_8859-3", "iso_8859-3:1988", "l3", "latin3"],
                        name: "ISO-8859-3"
                    }, {
                        labels: ["csisolatin4", "iso-8859-4", "iso-ir-110", "iso8859-4", "iso88594", "iso_8859-4", "iso_8859-4:1988", "l4", "latin4"],
                        name: "ISO-8859-4"
                    }, {
                        labels: ["csisolatincyrillic", "cyrillic", "iso-8859-5", "iso-ir-144", "iso8859-5", "iso88595", "iso_8859-5", "iso_8859-5:1988"],
                        name: "ISO-8859-5"
                    }, {
                        labels: ["arabic", "asmo-708", "csiso88596e", "csiso88596i", "csisolatinarabic", "ecma-114", "iso-8859-6", "iso-8859-6-e", "iso-8859-6-i", "iso-ir-127", "iso8859-6", "iso88596", "iso_8859-6", "iso_8859-6:1987"],
                        name: "ISO-8859-6"
                    }, {
                        labels: ["csisolatingreek", "ecma-118", "elot_928", "greek", "greek8", "iso-8859-7", "iso-ir-126", "iso8859-7", "iso88597", "iso_8859-7", "iso_8859-7:1987", "sun_eu_greek"],
                        name: "ISO-8859-7"
                    }, {
                        labels: ["csiso88598e", "csisolatinhebrew", "hebrew", "iso-8859-8", "iso-8859-8-e", "iso-ir-138", "iso8859-8", "iso88598", "iso_8859-8", "iso_8859-8:1988", "visual"],
                        name: "ISO-8859-8"
                    }, {
                        labels: ["csiso88598i", "iso-8859-8-i", "logical"],
                        name: "ISO-8859-8-I"
                    }, {
                        labels: ["csisolatin6", "iso-8859-10", "iso-ir-157", "iso8859-10", "iso885910", "l6", "latin6"],
                        name: "ISO-8859-10"
                    }, {
                        labels: ["iso-8859-13", "iso8859-13", "iso885913"],
                        name: "ISO-8859-13"
                    }, {
                        labels: ["iso-8859-14", "iso8859-14", "iso885914"],
                        name: "ISO-8859-14"
                    }, {
                        labels: ["csisolatin9", "iso-8859-15", "iso8859-15", "iso885915", "iso_8859-15", "l9"],
                        name: "ISO-8859-15"
                    }, {
                        labels: ["iso-8859-16"],
                        name: "ISO-8859-16"
                    }, {
                        labels: ["cskoi8r", "koi", "koi8", "koi8-r", "koi8_r"],
                        name: "KOI8-R"
                    }, {
                        labels: ["koi8-ru", "koi8-u"],
                        name: "KOI8-U"
                    }, {
                        labels: ["csmacintosh", "mac", "macintosh", "x-mac-roman"],
                        name: "macintosh"
                    }, {
                        labels: ["dos-874", "iso-8859-11", "iso8859-11", "iso885911", "tis-620", "windows-874"],
                        name: "windows-874"
                    }, {
                        labels: ["cp1250", "windows-1250", "x-cp1250"],
                        name: "windows-1250"
                    }, {
                        labels: ["cp1251", "windows-1251", "x-cp1251"],
                        name: "windows-1251"
                    }, {
                        labels: ["ansi_x3.4-1968", "ascii", "cp1252", "cp819", "csisolatin1", "ibm819", "iso-8859-1", "iso-ir-100", "iso8859-1", "iso88591", "iso_8859-1", "iso_8859-1:1987", "l1", "latin1", "us-ascii", "windows-1252", "x-cp1252"],
                        name: "windows-1252"
                    }, {
                        labels: ["cp1253", "windows-1253", "x-cp1253"],
                        name: "windows-1253"
                    }, {
                        labels: ["cp1254", "csisolatin5", "iso-8859-9", "iso-ir-148", "iso8859-9", "iso88599", "iso_8859-9", "iso_8859-9:1989", "l5", "latin5", "windows-1254", "x-cp1254"],
                        name: "windows-1254"
                    }, {
                        labels: ["cp1255", "windows-1255", "x-cp1255"],
                        name: "windows-1255"
                    }, {
                        labels: ["cp1256", "windows-1256", "x-cp1256"],
                        name: "windows-1256"
                    }, {
                        labels: ["cp1257", "windows-1257", "x-cp1257"],
                        name: "windows-1257"
                    }, {
                        labels: ["cp1258", "windows-1258", "x-cp1258"],
                        name: "windows-1258"
                    }, {
                        labels: ["x-mac-cyrillic", "x-mac-ukrainian"],
                        name: "x-mac-cyrillic"
                    }],
                    heading: "Legacy single-byte encodings"
                }, {
                    encodings: [{
                        labels: ["chinese", "csgb2312", "csiso58gb231280", "gb2312", "gb_2312", "gb_2312-80", "gbk", "iso-ir-58", "x-gbk"],
                        name: "GBK"
                    }, {
                        labels: ["gb18030"],
                        name: "gb18030"
                    }],
                    heading: "Legacy multi-byte Chinese (simplified) encodings"
                }, {
                    encodings: [{
                        labels: ["big5", "big5-hkscs", "cn-big5", "csbig5", "x-x-big5"],
                        name: "Big5"
                    }],
                    heading: "Legacy multi-byte Chinese (traditional) encodings"
                }, {
                    encodings: [{
                        labels: ["cseucpkdfmtjapanese", "euc-jp", "x-euc-jp"],
                        name: "EUC-JP"
                    }, {
                        labels: ["csiso2022jp", "iso-2022-jp"],
                        name: "ISO-2022-JP"
                    }, {
                        labels: ["csshiftjis", "ms932", "ms_kanji", "shift-jis", "shift_jis", "sjis", "windows-31j", "x-sjis"],
                        name: "Shift_JIS"
                    }],
                    heading: "Legacy multi-byte Japanese encodings"
                }, {
                    encodings: [{
                        labels: ["cseuckr", "csksc56011987", "euc-kr", "iso-ir-149", "korean", "ks_c_5601-1987", "ks_c_5601-1989", "ksc5601", "ksc_5601", "windows-949"],
                        name: "EUC-KR"
                    }],
                    heading: "Legacy multi-byte Korean encodings"
                }, {
                    encodings: [{
                        labels: ["csiso2022kr", "hz-gb-2312", "iso-2022-cn", "iso-2022-cn-ext", "iso-2022-kr"],
                        name: "replacement"
                    }, {
                        labels: ["utf-16be"],
                        name: "UTF-16BE"
                    }, {
                        labels: ["utf-16", "utf-16le"],
                        name: "UTF-16LE"
                    }, {
                        labels: ["x-user-defined"],
                        name: "x-user-defined"
                    }],
                    heading: "Legacy miscellaneous encodings"
                }],
                m = {};
            p.forEach((function(t) {
                t.encodings.forEach((function(t) {
                    t.labels.forEach((function(e) {
                        m[e] = t
                    }))
                }))
            }));
            var g, y, _ = {},
                v = {};

            function b(t, e) {
                return e && e[t] || null
            }

            function w(t, e) {
                var i = e.indexOf(t);
                return -1 === i ? null : i
            }

            function M(t) {
                if (!("encoding-indexes" in e)) throw Error("Indexes missing. Did you forget to include encoding-indexes.js first?");
                return e["encoding-indexes"][t]
            }
            var x = "utf-8";

            function k(t, e) {
                if (!(this instanceof k)) throw TypeError("Called as a function. Did you forget 'new'?");
                t = void 0 !== t ? String(t) : x, e = s(e), this._encoding = null, this._decoder = null, this._ignoreBOM = !1, this._BOMseen = !1, this._error_mode = "replacement", this._do_not_flush = !1;
                var i = d(t);
                if (null === i || "replacement" === i.name) throw RangeError("Unknown encoding: " + t);
                if (!v[i.name]) throw Error("Decoder not present. Did you forget to include encoding-indexes.js first?");
                var r = this;
                return r._encoding = i, Boolean(e.fatal) && (r._error_mode = "fatal"), Boolean(e.ignoreBOM) && (r._ignoreBOM = !0), Object.defineProperty || (this.encoding = r._encoding.name.toLowerCase(), this.fatal = "fatal" === r._error_mode, this.ignoreBOM = r._ignoreBOM), r
            }

            function E(t, i) {
                if (!(this instanceof E)) throw TypeError("Called as a function. Did you forget 'new'?");
                i = s(i), this._encoding = null, this._encoder = null, this._do_not_flush = !1, this._fatal = Boolean(i.fatal) ? "fatal" : "replacement";
                var r = this;
                if (Boolean(i.NONSTANDARD_allowLegacyEncoding)) {
                    var n = d(t = void 0 !== t ? String(t) : x);
                    if (null === n || "replacement" === n.name) throw RangeError("Unknown encoding: " + t);
                    if (!_[n.name]) throw Error("Encoder not present. Did you forget to include encoding-indexes.js first?");
                    r._encoding = n
                } else r._encoding = d("utf-8"), void 0 !== t && "console" in e && console.warn("TextEncoder constructor called with encoding label, which is ignored.");
                return Object.defineProperty || (this.encoding = r._encoding.name.toLowerCase()), r
            }

            function C(t) {
                var e = t.fatal,
                    i = 0,
                    n = 0,
                    s = 0,
                    a = 128,
                    o = 191;
                this.handler = function(t, u) {
                    if (u === h && 0 !== s) return s = 0, c(e);
                    if (u === h) return l;
                    if (0 === s) {
                        if (r(u, 0, 127)) return u;
                        if (r(u, 194, 223)) s = 1, i = 31 & u;
                        else if (r(u, 224, 239)) 224 === u && (a = 160), 237 === u && (o = 159), s = 2, i = 15 & u;
                        else {
                            if (!r(u, 240, 244)) return c(e);
                            240 === u && (a = 144), 244 === u && (o = 143), s = 3, i = 7 & u
                        }
                        return null
                    }
                    if (!r(u, a, o)) return i = s = n = 0, a = 128, o = 191, t.prepend(u), c(e);
                    if (a = 128, o = 191, i = i << 6 | 63 & u, (n += 1) !== s) return null;
                    var f = i;
                    return i = s = n = 0, f
                }
            }

            function S(t) {
                t.fatal, this.handler = function(t, e) {
                    if (e === h) return l;
                    if (o(e)) return e;
                    var i, n;
                    r(e, 128, 2047) ? (i = 1, n = 192) : r(e, 2048, 65535) ? (i = 2, n = 224) : r(e, 65536, 1114111) && (i = 3, n = 240);
                    for (var s = [(e >> 6 * i) + n]; i > 0;) {
                        var a = e >> 6 * (i - 1);
                        s.push(128 | 63 & a), i -= 1
                    }
                    return s
                }
            }

            function A(t, e) {
                var i = e.fatal;
                this.handler = function(e, r) {
                    if (r === h) return l;
                    if (a(r)) return r;
                    var n = t[r - 128];
                    return null === n ? c(i) : n
                }
            }

            function I(t, e) {
                e.fatal, this.handler = function(e, i) {
                    if (i === h) return l;
                    if (o(i)) return i;
                    var r = w(i, t);
                    return null === r && f(i), r + 128
                }
            }

            function O(t) {
                var e = t.fatal,
                    i = 0,
                    n = 0,
                    s = 0;
                this.handler = function(t, o) {
                    if (o === h && 0 === i && 0 === n && 0 === s) return l;
                    var u;
                    if (o !== h || 0 === i && 0 === n && 0 === s || (i = 0, n = 0, s = 0, c(e)), 0 !== s) {
                        u = null, r(o, 48, 57) && (u = function(t) {
                            if (t > 39419 && t < 189e3 || t > 1237575) return null;
                            if (7457 === t) return 59335;
                            var e, i = 0,
                                r = 0,
                                n = M("gb18030-ranges");
                            for (e = 0; e < n.length; ++e) {
                                var s = n[e];
                                if (!(s[0] <= t)) break;
                                i = s[0], r = s[1]
                            }
                            return r + t - i
                        }(10 * (126 * (10 * (i - 129) + n - 48) + s - 129) + o - 48));
                        var f = [n, s, o];
                        return i = 0, n = 0, s = 0, null === u ? (t.prepend(f), c(e)) : u
                    }
                    if (0 !== n) return r(o, 129, 254) ? (s = o, null) : (t.prepend([n, o]), i = 0, n = 0, c(e));
                    if (0 !== i) {
                        if (r(o, 48, 57)) return n = o, null;
                        var d = i,
                            p = null;
                        i = 0;
                        var m = o < 127 ? 64 : 65;
                        return (r(o, 64, 126) || r(o, 128, 254)) && (p = 190 * (d - 129) + (o - m)), null === (u = null === p ? null : b(p, M("gb18030"))) && a(o) && t.prepend(o), null === u ? c(e) : u
                    }
                    return a(o) ? o : 128 === o ? 8364 : r(o, 129, 254) ? (i = o, null) : c(e)
                }
            }

            function B(t, e) {
                t.fatal, this.handler = function(t, i) {
                    if (i === h) return l;
                    if (o(i)) return i;
                    if (58853 === i) return f(i);
                    if (e && 8364 === i) return 128;
                    var r = w(i, M("gb18030"));
                    if (null !== r) {
                        var s = r % 190;
                        return [n(r / 190) + 129, s + (s < 63 ? 64 : 65)]
                    }
                    if (e) return f(i);
                    r = function(t) {
                        if (59335 === t) return 7457;
                        var e, i = 0,
                            r = 0,
                            n = M("gb18030-ranges");
                        for (e = 0; e < n.length; ++e) {
                            var s = n[e];
                            if (!(s[1] <= t)) break;
                            i = s[1], r = s[0]
                        }
                        return r + t - i
                    }(i);
                    var a = n(r / 10 / 126 / 10),
                        u = n((r -= 10 * a * 126 * 10) / 10 / 126),
                        c = n((r -= 10 * u * 126) / 10);
                    return [a + 129, u + 48, c + 129, r - 10 * c + 48]
                }
            }

            function N(t) {
                var e = t.fatal,
                    i = 0;
                this.handler = function(t, n) {
                    if (n === h && 0 !== i) return i = 0, c(e);
                    if (n === h && 0 === i) return l;
                    if (0 !== i) {
                        var s = i,
                            o = null;
                        i = 0;
                        var u = n < 127 ? 64 : 98;
                        switch ((r(n, 64, 126) || r(n, 161, 254)) && (o = 157 * (s - 129) + (n - u)), o) {
                            case 1133:
                                return [202, 772];
                            case 1135:
                                return [202, 780];
                            case 1164:
                                return [234, 772];
                            case 1166:
                                return [234, 780]
                        }
                        var f = null === o ? null : b(o, M("big5"));
                        return null === f && a(n) && t.prepend(n), null === f ? c(e) : f
                    }
                    return a(n) ? n : r(n, 129, 254) ? (i = n, null) : c(e)
                }
            }

            function L(t) {
                t.fatal, this.handler = function(t, e) {
                    if (e === h) return l;
                    if (o(e)) return e;
                    var i = function(t) {
                        y = y || M("big5").map((function(t, e) {
                            return e < 5024 ? null : t
                        }));
                        var e = y;
                        return 9552 === t || 9566 === t || 9569 === t || 9578 === t || 21313 === t || 21317 === t ? e.lastIndexOf(t) : w(t, e)
                    }(e);
                    if (null === i) return f(e);
                    var r = n(i / 157) + 129;
                    if (r < 161) return f(e);
                    var s = i % 157;
                    return [r, s + (s < 63 ? 64 : 98)]
                }
            }

            function P(t) {
                var e = t.fatal,
                    i = !1,
                    n = 0;
                this.handler = function(t, s) {
                    if (s === h && 0 !== n) return n = 0, c(e);
                    if (s === h && 0 === n) return l;
                    if (142 === n && r(s, 161, 223)) return n = 0, 65216 + s;
                    if (143 === n && r(s, 161, 254)) return i = !0, n = s, null;
                    if (0 !== n) {
                        var o = n;
                        n = 0;
                        var u = null;
                        return r(o, 161, 254) && r(s, 161, 254) && (u = b(94 * (o - 161) + (s - 161), M(i ? "jis0212" : "jis0208"))), i = !1, r(s, 161, 254) || t.prepend(s), null === u ? c(e) : u
                    }
                    return a(s) ? s : 142 === s || 143 === s || r(s, 161, 254) ? (n = s, null) : c(e)
                }
            }

            function z(t) {
                t.fatal, this.handler = function(t, e) {
                    if (e === h) return l;
                    if (o(e)) return e;
                    if (165 === e) return 92;
                    if (8254 === e) return 126;
                    if (r(e, 65377, 65439)) return [142, e - 65377 + 161];
                    8722 === e && (e = 65293);
                    var i = w(e, M("jis0208"));
                    return null === i ? f(e) : [n(i / 94) + 161, i % 94 + 161]
                }
            }

            function R(t) {
                var e = t.fatal,
                    i = 0,
                    n = 0,
                    s = !1;
                this.handler = function(t, a) {
                    switch (i) {
                        default:
                        case 0:
                            return 27 === a ? (i = 5, null) : r(a, 0, 127) && 14 !== a && 15 !== a && 27 !== a ? (s = !1, a) : a === h ? l : (s = !1, c(e));
                        case 1:
                            return 27 === a ? (i = 5, null) : 92 === a ? (s = !1, 165) : 126 === a ? (s = !1, 8254) : r(a, 0, 127) && 14 !== a && 15 !== a && 27 !== a && 92 !== a && 126 !== a ? (s = !1, a) : a === h ? l : (s = !1, c(e));
                        case 2:
                            return 27 === a ? (i = 5, null) : r(a, 33, 95) ? (s = !1, 65344 + a) : a === h ? l : (s = !1, c(e));
                        case 3:
                            return 27 === a ? (i = 5, null) : r(a, 33, 126) ? (s = !1, n = a, i = 4, null) : a === h ? l : (s = !1, c(e));
                        case 4:
                            if (27 === a) return i = 5, c(e);
                            if (r(a, 33, 126)) {
                                i = 3;
                                var o = b(94 * (n - 33) + a - 33, M("jis0208"));
                                return null === o ? c(e) : o
                            }
                            return a === h ? (i = 3, t.prepend(a), c(e)) : (i = 3, c(e));
                        case 5:
                            return 36 === a || 40 === a ? (n = a, i = 6, null) : (t.prepend(a), s = !1, i = 0, c(e));
                        case 6:
                            var u = n;
                            n = 0;
                            var f = null;
                            if (40 === u && 66 === a && (f = 0), 40 === u && 74 === a && (f = 1), 40 === u && 73 === a && (f = 2), 36 !== u || 64 !== a && 66 !== a || (f = 3), null !== f) {
                                i = i = f;
                                var d = s;
                                return s = !0, d ? c(e) : null
                            }
                            return t.prepend([u, a]), s = !1, i = 0, c(e)
                    }
                }
            }

            function T(t) {
                t.fatal;
                var e = 0;
                this.handler = function(t, i) {
                    if (i === h && 0 !== e) return t.prepend(i), e = 0, [27, 40, 66];
                    if (i === h && 0 === e) return l;
                    if (!(0 !== e && 1 !== e || 14 !== i && 15 !== i && 27 !== i)) return f(65533);
                    if (0 === e && o(i)) return i;
                    if (1 === e && (o(i) && 92 !== i && 126 !== i || 165 == i || 8254 == i)) {
                        if (o(i)) return i;
                        if (165 === i) return 92;
                        if (8254 === i) return 126
                    }
                    if (o(i) && 0 !== e) return t.prepend(i), e = 0, [27, 40, 66];
                    if ((165 === i || 8254 === i) && 1 !== e) return t.prepend(i), e = 1, [27, 40, 74];
                    8722 === i && (i = 65293);
                    var r = w(i, M("jis0208"));
                    return null === r ? f(i) : 2 !== e ? (t.prepend(i), e = 2, [27, 36, 66]) : [n(r / 94) + 33, r % 94 + 33]
                }
            }

            function j(t) {
                var e = t.fatal,
                    i = 0;
                this.handler = function(t, n) {
                    if (n === h && 0 !== i) return i = 0, c(e);
                    if (n === h && 0 === i) return l;
                    if (0 !== i) {
                        var s = i,
                            o = null;
                        i = 0;
                        var u = n < 127 ? 64 : 65,
                            f = s < 160 ? 129 : 193;
                        if ((r(n, 64, 126) || r(n, 128, 252)) && (o = 188 * (s - f) + n - u), r(o, 8836, 10715)) return 48508 + o;
                        var d = null === o ? null : b(o, M("jis0208"));
                        return null === d && a(n) && t.prepend(n), null === d ? c(e) : d
                    }
                    return a(n) || 128 === n ? n : r(n, 161, 223) ? 65216 + n : r(n, 129, 159) || r(n, 224, 252) ? (i = n, null) : c(e)
                }
            }

            function F(t) {
                t.fatal, this.handler = function(t, e) {
                    if (e === h) return l;
                    if (o(e) || 128 === e) return e;
                    if (165 === e) return 92;
                    if (8254 === e) return 126;
                    if (r(e, 65377, 65439)) return e - 65377 + 161;
                    8722 === e && (e = 65293);
                    var i = function(t) {
                        return g = g || M("jis0208").map((function(t, e) {
                            return r(e, 8272, 8835) ? null : t
                        })), g.indexOf(t)
                    }(e);
                    if (null === i) return f(e);
                    var s = n(i / 188),
                        a = i % 188;
                    return [s + (s < 31 ? 129 : 193), a + (a < 63 ? 64 : 65)]
                }
            }

            function U(t) {
                var e = t.fatal,
                    i = 0;
                this.handler = function(t, n) {
                    if (n === h && 0 !== i) return i = 0, c(e);
                    if (n === h && 0 === i) return l;
                    if (0 !== i) {
                        var s = i,
                            o = null;
                        i = 0, r(n, 65, 254) && (o = 190 * (s - 129) + (n - 65));
                        var u = null === o ? null : b(o, M("euc-kr"));
                        return null === o && a(n) && t.prepend(n), null === u ? c(e) : u
                    }
                    return a(n) ? n : r(n, 129, 254) ? (i = n, null) : c(e)
                }
            }

            function D(t) {
                t.fatal, this.handler = function(t, e) {
                    if (e === h) return l;
                    if (o(e)) return e;
                    var i = w(e, M("euc-kr"));
                    return null === i ? f(e) : [n(i / 190) + 129, i % 190 + 65]
                }
            }

            function q(t, e) {
                var i = t >> 8,
                    r = 255 & t;
                return e ? [i, r] : [r, i]
            }

            function G(t, e) {
                var i = e.fatal,
                    n = null,
                    s = null;
                this.handler = function(e, a) {
                    if (a === h && (null !== n || null !== s)) return c(i);
                    if (a === h && null === n && null === s) return l;
                    if (null === n) return n = a, null;
                    var o;
                    if (o = t ? (n << 8) + a : (a << 8) + n, n = null, null !== s) {
                        var u = s;
                        return s = null, r(o, 56320, 57343) ? 65536 + 1024 * (u - 55296) + (o - 56320) : (e.prepend(q(o, t)), c(i))
                    }
                    return r(o, 55296, 56319) ? (s = o, null) : r(o, 56320, 57343) ? c(i) : o
                }
            }

            function W(t, e) {
                e.fatal, this.handler = function(e, i) {
                    if (i === h) return l;
                    if (r(i, 0, 65535)) return q(i, t);
                    var n = q(55296 + (i - 65536 >> 10), t),
                        s = q(56320 + (i - 65536 & 1023), t);
                    return n.concat(s)
                }
            }

            function Z(t) {
                t.fatal, this.handler = function(t, e) {
                    return e === h ? l : a(e) ? e : 63360 + e - 128
                }
            }

            function H(t) {
                t.fatal, this.handler = function(t, e) {
                    return e === h ? l : o(e) ? e : r(e, 63360, 63487) ? e - 63360 + 128 : f(e)
                }
            }
            Object.defineProperty && (Object.defineProperty(k.prototype, "encoding", {
                get: function() {
                    return this._encoding.name.toLowerCase()
                }
            }), Object.defineProperty(k.prototype, "fatal", {
                get: function() {
                    return "fatal" === this._error_mode
                }
            }), Object.defineProperty(k.prototype, "ignoreBOM", {
                get: function() {
                    return this._ignoreBOM
                }
            })), k.prototype.decode = function(t, e) {
                var i;
                i = "object" == typeof t && t instanceof ArrayBuffer ? new Uint8Array(t) : "object" == typeof t && "buffer" in t && t.buffer instanceof ArrayBuffer ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : new Uint8Array(0), e = s(e), this._do_not_flush || (this._decoder = v[this._encoding.name]({
                    fatal: "fatal" === this._error_mode
                }), this._BOMseen = !1), this._do_not_flush = Boolean(e.stream);
                for (var r, n = new u(i), a = [];;) {
                    var o = n.read();
                    if (o === h) break;
                    if ((r = this._decoder.handler(n, o)) === l) break;
                    null !== r && (Array.isArray(r) ? a.push.apply(a, r) : a.push(r))
                }
                if (!this._do_not_flush) {
                    do {
                        if ((r = this._decoder.handler(n, n.read())) === l) break;
                        null !== r && (Array.isArray(r) ? a.push.apply(a, r) : a.push(r))
                    } while (!n.endOfStream());
                    this._decoder = null
                }
                return function(t) {
                    var e, i;
                    return e = ["UTF-8", "UTF-16LE", "UTF-16BE"], i = this._encoding.name, -1 === e.indexOf(i) || this._ignoreBOM || this._BOMseen || (t.length > 0 && 65279 === t[0] ? (this._BOMseen = !0, t.shift()) : t.length > 0 && (this._BOMseen = !0)),
                        function(t) {
                            for (var e = "", i = 0; i < t.length; ++i) {
                                var r = t[i];
                                r <= 65535 ? e += String.fromCharCode(r) : (r -= 65536, e += String.fromCharCode(55296 + (r >> 10), 56320 + (1023 & r)))
                            }
                            return e
                        }(t)
                }.call(this, a)
            }, Object.defineProperty && Object.defineProperty(E.prototype, "encoding", {
                get: function() {
                    return this._encoding.name.toLowerCase()
                }
            }), E.prototype.encode = function(t, e) {
                t = void 0 === t ? "" : String(t), e = s(e), this._do_not_flush || (this._encoder = _[this._encoding.name]({
                    fatal: "fatal" === this._fatal
                })), this._do_not_flush = Boolean(e.stream);
                for (var i, r = new u(function(t) {
                        for (var e = String(t), i = e.length, r = 0, n = []; r < i;) {
                            var s = e.charCodeAt(r);
                            if (s < 55296 || s > 57343) n.push(s);
                            else if (56320 <= s && s <= 57343) n.push(65533);
                            else if (55296 <= s && s <= 56319)
                                if (r === i - 1) n.push(65533);
                                else {
                                    var a = e.charCodeAt(r + 1);
                                    if (56320 <= a && a <= 57343) {
                                        var o = 1023 & s,
                                            h = 1023 & a;
                                        n.push(65536 + (o << 10) + h), r += 1
                                    } else n.push(65533)
                                } r += 1
                        }
                        return n
                    }(t)), n = [];;) {
                    var a = r.read();
                    if (a === h) break;
                    if ((i = this._encoder.handler(r, a)) === l) break;
                    Array.isArray(i) ? n.push.apply(n, i) : n.push(i)
                }
                if (!this._do_not_flush) {
                    for (;
                        (i = this._encoder.handler(r, r.read())) !== l;) Array.isArray(i) ? n.push.apply(n, i) : n.push(i);
                    this._encoder = null
                }
                return new Uint8Array(n)
            }, _["UTF-8"] = function(t) {
                return new S(t)
            }, v["UTF-8"] = function(t) {
                return new C(t)
            }, "encoding-indexes" in e && p.forEach((function(t) {
                "Legacy single-byte encodings" === t.heading && t.encodings.forEach((function(t) {
                    var e = t.name,
                        i = M(e.toLowerCase());
                    v[e] = function(t) {
                        return new A(i, t)
                    }, _[e] = function(t) {
                        return new I(i, t)
                    }
                }))
            })), v.GBK = function(t) {
                return new O(t)
            }, _.GBK = function(t) {
                return new B(t, !0)
            }, _.gb18030 = function(t) {
                return new B(t)
            }, v.gb18030 = function(t) {
                return new O(t)
            }, _.Big5 = function(t) {
                return new L(t)
            }, v.Big5 = function(t) {
                return new N(t)
            }, _["EUC-JP"] = function(t) {
                return new z(t)
            }, v["EUC-JP"] = function(t) {
                return new P(t)
            }, _["ISO-2022-JP"] = function(t) {
                return new T(t)
            }, v["ISO-2022-JP"] = function(t) {
                return new R(t)
            }, _.Shift_JIS = function(t) {
                return new F(t)
            }, v.Shift_JIS = function(t) {
                return new j(t)
            }, _["EUC-KR"] = function(t) {
                return new D(t)
            }, v["EUC-KR"] = function(t) {
                return new U(t)
            }, _["UTF-16BE"] = function(t) {
                return new W(!0, t)
            }, v["UTF-16BE"] = function(t) {
                return new G(!0, t)
            }, _["UTF-16LE"] = function(t) {
                return new W(!1, t)
            }, v["UTF-16LE"] = function(t) {
                return new G(!1, t)
            }, _["x-user-defined"] = function(t) {
                return new H(t)
            }, v["x-user-defined"] = function(t) {
                return new Z(t)
            }, e.TextEncoder || (e.TextEncoder = E), e.TextDecoder || (e.TextDecoder = k), t.exports && (t.exports = {
                TextEncoder: e.TextEncoder,
                TextDecoder: e.TextDecoder,
                EncodingIndexes: e["encoding-indexes"]
            })
        }(this || {})
    },
    545: t => {
        t.exports = r, t.exports.parse = r, t.exports.stringify = function t(e) {
            function i(t) {
                return t.join(" ")
            }

            function r(t) {
                return t.map(i).join(", ")
            }

            function n(t) {
                return t.map(r).map(s).join(", ")
            }

            function s(t) {
                return "(" + t + ")"
            }
            switch ("Feature" === e.type && (e = e.geometry), e.type) {
                case "Point":
                    return "POINT (" + i(e.coordinates) + ")";
                case "LineString":
                    return "LINESTRING (" + r(e.coordinates) + ")";
                case "Polygon":
                    return "POLYGON (" + n(e.coordinates) + ")";
                case "MultiPoint":
                    return "MULTIPOINT (" + r(e.coordinates) + ")";
                case "MultiPolygon":
                    return "MULTIPOLYGON (" + e.coordinates.map(n).map(s).join(", ") + ")";
                case "MultiLineString":
                    return "MULTILINESTRING (" + n(e.coordinates) + ")";
                case "GeometryCollection":
                    return "GEOMETRYCOLLECTION (" + e.geometries.map(t).join(", ") + ")";
                default:
                    throw new Error("stringify requires a valid GeoJSON Feature or geometry object as input")
            }
        };
        var e = /[-+]?([0-9]*\.[0-9]+|[0-9]+)([eE][-+]?[0-9]+)?/,
            i = new RegExp("^" + e.source + "(\\s" + e.source + "){1,}");

        function r(t) {
            var e, r = t.split(";"),
                n = r.pop(),
                s = (r.shift() || "").split("=").pop(),
                a = 0;

            function o(t) {
                var e = n.substring(a).match(t);
                return e ? (a += e[0].length, e[0]) : null
            }

            function h() {
                o(/^\s*/)
            }

            function u() {
                h();
                for (var t, e = 0, r = [], n = [r], s = r; t = o(/^(\()/) || o(/^(\))/) || o(/^(,)/) || o(i);) {
                    if ("(" === t) n.push(s), s = [], n[n.length - 1].push(s), e++;
                    else if (")" === t) {
                        if (0 === s.length) return null;
                        if (!(s = n.pop())) return null;
                        if (0 == --e) break
                    } else if ("," === t) s = [], n[n.length - 1].push(s);
                    else {
                        if (t.split(/\s/g).some(isNaN)) return null;
                        Array.prototype.push.apply(s, t.split(/\s/g).map(parseFloat))
                    }
                    h()
                }
                return 0 !== e ? null : r
            }

            function l() {
                for (var t, e, r = []; e = o(i) || o(/^(,)/);) "," === e ? (r.push(t), t = []) : e.split(/\s/g).some(isNaN) || (t || (t = []), Array.prototype.push.apply(t, e.split(/\s/g).map(parseFloat))), h();
                return t ? (r.push(t), r.length ? r : null) : null
            }
            return (e = function t() {
                return function() {
                    if (!o(/^(point(\sz)?)/i)) return null;
                    if (h(), !o(/^(\()/)) return null;
                    var t = l();
                    return t ? (h(), o(/^(\))/) ? {
                        type: "Point",
                        coordinates: t[0]
                    } : null) : null
                }() || function() {
                    if (!o(/^(linestring(\sz)?)/i)) return null;
                    if (h(), !o(/^(\()/)) return null;
                    var t = l();
                    return t && o(/^(\))/) ? {
                        type: "LineString",
                        coordinates: t
                    } : null
                }() || function() {
                    if (!o(/^(polygon(\sz)?)/i)) return null;
                    h();
                    var t = u();
                    return t ? {
                        type: "Polygon",
                        coordinates: t
                    } : null
                }() || function() {
                    if (!o(/^(multipoint)/i)) return null;
                    h();
                    var t = n.substring(n.indexOf("(") + 1, n.length - 1).replace(/\(/g, "").replace(/\)/g, "");
                    n = "MULTIPOINT (" + t + ")";
                    var e = u();
                    return e ? (h(), {
                        type: "MultiPoint",
                        coordinates: e
                    }) : null
                }() || function() {
                    if (!o(/^(multilinestring)/i)) return null;
                    h();
                    var t = u();
                    return t ? (h(), {
                        type: "MultiLineString",
                        coordinates: t
                    }) : null
                }() || function() {
                    if (!o(/^(multipolygon)/i)) return null;
                    h();
                    var t = u();
                    return t ? {
                        type: "MultiPolygon",
                        coordinates: t
                    } : null
                }() || function() {
                    var e, i = [];
                    if (!o(/^(geometrycollection)/i)) return null;
                    if (h(), !o(/^(\()/)) return null;
                    for (; e = t();) i.push(e), h(), o(/^(,)/), h();
                    return o(/^(\))/) ? {
                        type: "GeometryCollection",
                        geometries: i
                    } : null
                }()
            }()) && s.match(/\d+/) && (e.crs = {
                type: "name",
                properties: {
                    name: "urn:ogc:def:crs:EPSG::" + s
                }
            }), e
        }
    },
    252: (t, e, i) => {
        i.g.Buffer = i.g.Buffer || i(764).lW
    },
    692: () => {},
    982: () => {}
},
e = {};

function i(r) {
var n = e[r];
if (void 0 !== n) return n.exports;
var s = e[r] = {
    exports: {}
};
return t[r].call(s.exports, s, s.exports, i), s.exports
}
i.n = t => {
var e = t && t.__esModule ? () => t.default : () => t;
return i.d(e, {
    a: e
}), e
}, i.d = (t, e) => {
for (var r in e) i.o(e, r) && !i.o(t, r) && Object.defineProperty(t, r, {
    enumerable: !0,
    get: e[r]
})
}, i.g = function() {
if ("object" == typeof globalThis) return globalThis;
try {
    return this || new Function("return this")()
} catch (t) {
    if ("object" == typeof window) return window
}
}(), i.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), i.r = t => {
"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
    value: "Module"
}), Object.defineProperty(t, "__esModule", {
    value: !0
})
}, (() => {
const t = window.L;

function e(t) {
    return fetch(t).then((t => t.blob())).then((t => t.text())).catch((t => null))
}

function r(t) {
    return fetch(t).then((t => t.blob())).then((t => t.arrayBuffer())).catch((t => null))
}

function n(t) {
    return "string" == typeof t ? (new DOMParser).parseFromString(t, "text/xml") : t
}
i(252);
var s = i(848),
    a = i(545),
    o = i(311);

function h(t) {
    return t
}

function u(t, e) {
    return "string" == typeof e && (e = t.objects[e]), "GeometryCollection" === e.type ? {
        type: "FeatureCollection",
        features: e.geometries.map((function(e) {
            return l(t, e)
        }))
    } : l(t, e)
}

function l(t, e) {
    var i = e.id,
        r = e.bbox,
        n = null == e.properties ? {} : e.properties,
        s = function(t, e) {
            var i = function(t) {
                    if (null == t) return h;
                    var e, i, r = t.scale[0],
                        n = t.scale[1],
                        s = t.translate[0],
                        a = t.translate[1];
                    return function(t, o) {
                        o || (e = i = 0);
                        var h = 2,
                            u = t.length,
                            l = new Array(u);
                        for (l[0] = (e += t[0]) * r + s, l[1] = (i += t[1]) * n + a; h < u;) l[h] = t[h], ++h;
                        return l
                    }
                }(t.transform),
                r = t.arcs;

            function n(t, e) {
                e.length && e.pop();
                for (var n = r[t < 0 ? ~t : t], s = 0, a = n.length; s < a; ++s) e.push(i(n[s], s));
                t < 0 && function(t, e) {
                    for (var i, r = t.length, n = r - e; n < --r;) i = t[n], t[n++] = t[r], t[r] = i
                }(e, a)
            }

            function s(t) {
                return i(t)
            }

            function a(t) {
                for (var e = [], i = 0, r = t.length; i < r; ++i) n(t[i], e);
                return e.length < 2 && e.push(e[0]), e
            }

            function o(t) {
                for (var e = a(t); e.length < 4;) e.push(e[0]);
                return e
            }

            function u(t) {
                return t.map(o)
            }
            return function t(e) {
                var i, r = e.type;
                switch (r) {
                    case "GeometryCollection":
                        return {
                            type: r, geometries: e.geometries.map(t)
                        };
                    case "Point":
                        i = s(e.coordinates);
                        break;
                    case "MultiPoint":
                        i = e.coordinates.map(s);
                        break;
                    case "LineString":
                        i = a(e.arcs);
                        break;
                    case "MultiLineString":
                        i = e.arcs.map(a);
                        break;
                    case "Polygon":
                        i = u(e.arcs);
                        break;
                    case "MultiPolygon":
                        i = e.arcs.map(u);
                        break;
                    default:
                        return null
                }
                return {
                    type: r,
                    coordinates: i
                }
            }(e)
        }(t, e);
    return null == i && null == r ? {
        type: "Feature",
        properties: n,
        geometry: s
    } : null == r ? {
        type: "Feature",
        id: i,
        properties: n,
        geometry: s
    } : {
        type: "Feature",
        id: i,
        bbox: r,
        properties: n,
        geometry: s
    }
}
var c = i(597),
    f = i(3),
    d = i.n(f),
    p = i(733),
    m = i.n(p);

function g(t, e) {
    let i = n(t);
    return i ? (0, c.kml)(i) : null
}
async function y(i, r, n) {
    let s = n || t.geoJson(null, {
        ...r.layerOptions
    });
    const a = (o = await e(i), JSON.parse(o) || null);
    var o;
    try {
        return s.addData(a), s
    } catch (t) {
        throw Error("GeoJSON not valid")
    }
}
async function _(i, r, n) {
    let s = n || t.geoJson(null, {
        ...r.layerOptions
    });
    const a = function(t, e) {
        let i = "string" == typeof t ? JSON.parse(t) : t;
        for (let t in i.objects) {
            let e = u(i, i.objects[t]);
            return e.features ? e.features : e
        }
    }(await e(i), r.parserOptions);
    try {
        return s.addData(a), s
    } catch (t) {
        throw Error("topoJSON not valid")
    }
}
async function v(i, r, n) {
    let a = n || t.geoJson(null, {
        ...r.layerOptions
    });
    const o = function(t, e) {
        let i;
        return e = e || {}, (0, s.csv2geojson)(t, e, ((t, e) => {
            i = t ? null : e
        })), i
    }(await e(i), r.parserOptions);
    try {
        return a.addData(o), a
    } catch (t) {
        throw Error("Spatial data in CSV not valid")
    }
}
async function b(i, r, s) {
    let a = s || t.geoJson(null, {
        ...r.layerOptions
    });
    const o = function(t, e, i) {
        let r = n(t);
        return r ? (0, c.gpx)(r) : null
    }(await e(i), r.parserOptions);
    try {
        return a.addData(o), a
    } catch (t) {
        throw Error("GPX not valid")
    }
}
async function w(i, r, n) {
    let s = n || t.geoJson(null, {
        ...r.layerOptions
    });
    const a = g(await e(i), r.parserOptions);
    try {
        return s.addData(a), s
    } catch (t) {
        throw Error("KML not valid")
    }
}
async function M(e, i, n) {
    let s = n || t.geoJson(null, {
        ...i.layerOptions
    });
    const a = await r(e),
        o = await async function(t, e) {
            const {
                files: i
            } = await m().loadAsync(t);
            let r;
            for (const t in i) t.endsWith(".kml") && (r = i[t]);
            return g(await r.async("text"))
        }(a, i.parserOptions);
    try {
        return s.addData(o), s
    } catch (t) {
        throw Error("KMZ not valid")
    }
}
async function x(i, r, n) {
    let s = n || t.geoJson(null, {
        ...r.layerOptions
    });
    const o = (h = await e(i), r.parserOptions, (0, a.parse)(h) || null);
    var h;
    try {
        return s.addData(o), s
    } catch (t) {
        throw Error("WKT not valid")
    }
}
async function k(i, r, n) {
    let s = n || t.geoJson(null, {
        ...r.layerOptions
    });
    const a = function(t, e) {
        e = e || {};
        let i = (0, o.decode)(t, e.precision),
            r = {
                type: "LineString",
                coordinates: []
            };
        if (!i.length) return null;
        for (let t = 0; t < i.length; t++) r.coordinates[t] = [i[t][1], i[t][0]];
        return r
    }(await e(i), r.parserOptions);
    try {
        return s.addData(a), s
    } catch (t) {
        throw Error("Polyline not valid")
    }
}
async function E(e, i, n) {
    let s = n || t.geoJson(null, {
        ...i.layerOptions
    });
    const a = await r(e),
        o = await async function(t) {
            return await d()(t) || null
        }(a);
    try {
        return s.addData(o), s
    } catch (t) {
        throw Error("Shapefile not Valid")
    }
}

function C(t) {
    return t.toLowerCase().split(".").at(-1)
}

function S(t) {
    return t.toLowerCase().split(".").at(0)
}

function A(t) {
    const e = {
        stroke: "color",
        "stroke-opacity": "opacity",
        "stroke-width": "weight",
        fill: "fillColor",
        "fill-opacity": "fillOpacity"
    };
    let i = {};
    for (const r in t.properties) {
        const n = e[r] || null;
        n && (i[n] = t.properties[r])
    }
    return i
}
t.Control.BetterFileLayer = t.Control.extend({
    options: {
        position: "topleft",
        fileSizeLimit: 1024,
        importOptions: {
            csv: {
                delimiter: ";",
                latfield: "LAT",
                lonfield: "LONG"
            }
        },
        text: {
            title: "Import a layer"
        }
    },
    initialize(e) {
        (e = e || {}).text = t.Util.extend(this.options.text, e.text), t.Util.setOptions(this, e)
    },
    onAdd() {
        if (this.options.button) return t.DomEvent.addListener(this.options.button, "change", this._load, this), this._enableDragAndDrop(), t.DomUtil.create("div");
        const e = t.DomUtil.create("div", "leaflet-control"),
            i = t.DomUtil.create("div", "leaflet-control-better-filelayer", e),
            r = t.DomUtil.create("input", "", i);
        return r.title = this.options.text.title, r.type = "file", r.multiple = !0, this.options.formats ? r.accept = this.options.formats.join(",") : r.accept = ".gpx,.kml,.kmz,.geojson,.json,.csv,.topojson,.wkt,.shp,.shx,.prj,.dbf,.zip", t.DomEvent.addListener(r, "change", this._load, this), this._enableDragAndDrop(), e
    },
    _enableDragAndDrop() {
        const e = this._map.getContainer();
        t.DomEvent.addListener(e, "dragover", t.DomEvent.stopPropagation).addListener(e, "dragover", t.DomEvent.preventDefault).addListener(e, "drop", t.DomEvent.stopPropagation).addListener(e, "drop", t.DomEvent.preventDefault).addListener(e, "drop", this._load, this)
    },
    _disableDragAndDrop() {
        const e = this._map.getContainer();
        t.DomEvent.removeListener(e, "dragover", t.DomEvent.stopPropagation).removeListener(e, "dragover", t.DomEvent.preventDefault).removeListener(e, "drop", t.DomEvent.stopPropagation).removeListener(e, "drop", t.DomEvent.preventDefault).removeListener(e, "drop", this._load, this)
    },
    async _load(e) {
        const i = {
            geojson: y,
            json: y,
            kml: w,
            kmz: M,
            csv: v,
            wkt: x,
            gpx: b,
            topojson: _,
            polyline: k,
            zip: E
        };
        let r;
        switch (e.type) {
            case "drop":
                r = Array.of(...e.dataTransfer.files);
                break;
            case "change":
                r = Array.of(...e.target.files);
                break;
            default:
                r = []
        }
        if (!r.length) return;
        const n = function(t) {
            let e = {};
            const i = ["shp", "shx", "dbf", "prj"];
            for (const r of t) i.includes(C(r.name)) && (Object.hasOwnProperty.call(e, S(r.name)) || (e[S(r.name)] = []), e[S(r.name)].push(r));
            return e
        }(r);
        if (Object.keys(n).length) {
            const t = await async function(t) {
                const e = [];
                for (const i in t) {
                    const r = new(m());
                    for (const e of t[i]) r.file(e.name, e.arrayBuffer());
                    const n = await r.generateAsync({
                            type: "blob"
                        }),
                        s = new File([n], `${i}.zip`, {
                            type: "application/zip"
                        });
                    e.push(s)
                }
                return e
            }(n), e = function(t) {
                const e = [],
                    i = ["shp", "shx", "dbf", "prj"];
                for (let r = 0; r <= t.length - 1; r++) i.includes(C(t[r].name)) || e.push(t[r]);
                return e
            }(r);
            r = [...e, ...t]
        }
        for (const e of r) {
            const r = i[C(e.name)] || null;
            if (r) {
                if ((e.size / 1024).toFixed(4) > this.options.fileSizeLimit) {
                    this._map.fire("bfl:filesizelimit", {
                        layer: e.name
                    }, this);
                    continue
                }
                const i = this.options.importOptions[C(e.name)] || {},
                    n = {
                        name: S(e.name),
                        id: t.Util.stamp({}).toString(),
                        zIndex: 999,
                        style: t => {
                            const e = A(t);
                            if (Object.keys(e).length) return e
                        },
                        onEachFeature: (t, e) => {
                            if (t.properties) {
                                const i = Object.keys(t.properties).map((e => ["marker-size", "marker-symbol", "marker-color", "stroke", "stroke-opacity", "stroke-width", "fill", "fill-opacity", "styleHash", "styleUrl", "styleMapHash", "stroke-dasharray"].includes(e) ? null : `<span> <b>${e}</b> : ${t.properties[e]} </span>`));
                                e.bindPopup(`\n                  <div style="display:flex;flex-direction:column;gap:5px"> \n                      ${i.join("")}\n                  </div>\n                `, {
                                    maxHeight: 240
                                })
                            }
                        }
                    };
                this.options.style && (n.style = this.options.style), this.options.onEachFeature && (n.onEachFeature = this.options.onEachFeature);
                const s = {
                    parserOptions: i,
                    layerOptions: n
                };
                try {
                    const t = await r(URL.createObjectURL(e), s, this.options.layer || null);
                    if (!t.getLayers().length) {
                        this._map.fire("bfl:layerisempty", {
                            layer: e.name
                        }, this);
                        continue
                    }
                    const i = t.addTo(this._map);
                    this._map.fitBounds(t.getBounds()), this._map.fire("bfl:layerloaded", {
                        layer: i
                    }, this)
                } catch (t) {
                    this._map.fire("bfl:layerloaderror", {
                        layer: e.name
                    }, this)
                }
            } else this._map.fire("bfl:filenotsupported", {
                layer: e.name
            })
        }
    },
    onRemove() {
        this._disableDragAndDrop()
    }
}), t.Map.mergeOptions({
    betterFileLayerControl: !1
}), t.Map.addInitHook((function() {
    this.options.betterFileLayerControl && t.Control.betterFileLayer().addTo(this)
})), t.Control.betterFileLayer = e => new t.Control.BetterFileLayer(e)
})();