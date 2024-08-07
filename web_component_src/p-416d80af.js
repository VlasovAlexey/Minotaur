const t = window,
	e = document,
	n = {
		t: 0,
		s: "",
		jmp: t => t(),
		raf: t => requestAnimationFrame(t),
		ael: (t, e, n, s) => t.addEventListener(e, n, s),
		rel: (t, e, n, s) => t.removeEventListener(e, n, s)
	},
	s = new WeakMap,
	o = t => s.get(t),
	l = (t, e) => s.set(e.o = t, e),
	r = (t, e) => e in t,
	i = t => console.error(t),
	c = new Map,
	a = t.__stencil_cssshim;
let f = 0,
	u = !1;
const $ = [],
	m = [],
	p = [],
	d = (t, e) => s => {
		t.push(s), u || (u = !0, e && 4 & n.t ? b(y) : n.raf(y))
	},
	h = (t, e) => {
		let n = 0,
			s = 0;
		for (; n < t.length && (s = performance.now()) < e;) try {
			t[n++](s)
		} catch (t) {
			i(t)
		}
		n === t.length ? t.length = 0 : 0 !== n && t.splice(0, n)
	},
	y = () => {
		f++, (t => {
			for (let e = 0; e < t.length; e++) try {
				t[e](performance.now())
			} catch (t) {
				i(t)
			}
			t.length = 0
		})($);
		const t = 2 == (6 & n.t) ? performance.now() + 10 * Math.ceil(f * (1 / 22)) : 1 / 0;
		h(m, t), h(p, t), m.length > 0 && (p.push(...m), m.length = 0), (u = $.length + m.length + p.length > 0) ? n.raf(y) : f = 0
	},
	b = t => Promise.resolve().then(t),
	w = d(m, !0),
	g = {},
	_ = t => null != t,
	v = t => t.toLowerCase(),
	j = t => ["object", "function"].includes(typeof t),
	k = () => t.CSS && t.CSS.supports && t.CSS.supports("color", "var(--c)") ? Promise.resolve() : __sc_import_microbit("./p-3ea8955c.js"),
	R = async () => {
		{
			const n = Array.from(e.querySelectorAll("script")).find(t => t.src.includes("/microbit.esm.js") || "microbit" === t.getAttribute("data-namespace")),
				s = new URL(".", new URL(n.getAttribute("data-resources-url") || n.src, t.location.href));
			return M(s.href), window.customElements || await __sc_import_microbit("./p-860d8016.js"), s.href
		}
	}, M = n => {
		const s = `__sc_import_${"microbit".replace(/\s|-/g,"_")}`;
		try {
			t[s] = new Function("w", "return import(w);")
		} catch (o) {
			const l = new Map;
			t[s] = o => {
				const r = new URL(o, n).href;
				let i = l.get(r);
				if (!i) {
					const n = e.createElement("script");
					n.type = "module", n.src = URL.createObjectURL(new Blob([`import * as m from '${r}'; window.${s}.m = m;`], {
						type: "application/javascript"
					})), i = new Promise(e => {
						n.onload = () => {
							e(t[s].m), n.remove()
						}
					}), l.set(r, i), e.head.appendChild(n)
				}
				return i
			}
		}
	}, U = (t, e, ...n) => {
		let s, o, l = null,
			r = !1,
			i = !1,
			c = [];
		const a = e => {
			for (let n = 0; n < e.length; n++) l = e[n], Array.isArray(l) ? a(l) : null != l && "boolean" != typeof l && ((r = "function" != typeof t && !j(l)) && (l = String(l)), r && i ? c[c.length - 1].l += l : c.push(r ? {
				t: 0,
				l
			} : l), i = r)
		};
		if (a(n), e) {
			s = e.key || void 0, o = e.name;
			{
				const t = e.className || e.class;
				t && (e.class = "object" != typeof t ? t : Object.keys(t).filter(e => t[e]).join(" "))
			}
		}
		if ("function" == typeof t) return t(e, c, O);
		const f = {
			t: 0,
			i: t,
			u: c.length > 0 ? c : null,
			$: void 0,
			p: e
		};
		return f.h = s, f.g = o, f
	}, L = {}, O = {
		forEach: (t, e) => t.map(x).forEach(e),
		map: (t, e) => t.map(x).map(e).map(P)
	}, x = t => ({
		vattrs: t.p,
		vchildren: t.u,
		vkey: t.h,
		vname: t.g,
		vtag: t.i,
		vtext: t.l
	}), P = t => ({
		t: 0,
		p: t.vattrs,
		u: t.vchildren,
		h: t.vkey,
		g: t.vname,
		i: t.vtag,
		l: t.vtext
	}), A = (t, e, s, o, l, i) => {
		if (s !== o)
			if ("class" !== e || l)
				if ("style" === e) {
					for (const e in s) o && null != o[e] || (e.includes("-") ? t.style.removeProperty(e) : t.style[e] = "");
					for (const e in o) s && o[e] === s[e] || (e.includes("-") ? t.style.setProperty(e, o[e]) : t.style[e] = o[e])
				} else if ("key" === e);
		else if ("ref" === e) o && o(t);
		else if (e.startsWith("on") && !r(t, e)) e = r(t, v(e)) ? v(e.substring(2)) : v(e[2]) + e.substring(3), s && n.rel(t, e, s, !1), o && n.ael(t, e, o, !1);
		else {
			const n = r(t, e),
				s = j(o);
			if ((n || s && null !== o) && !l) try {
				t[e] = null == o && -1 === t.tagName.indexOf("-") ? "" : o
			} catch (t) {}
			null == o || !1 === o ? t.removeAttribute(e) : (!n || 4 & i || l) && !s && (o = !0 === o ? "" : o.toString(), t.setAttribute(e, o))
		} else {
			const e = E(s),
				n = E(t.className).filter(t => !e.includes(t));
			t.className = n.concat(E(o).filter(t => !n.includes(t))).join(" ")
		}
	}, E = t => t ? t.split(" ") : [], F = (t, e, n, s) => {
		const o = 11 === e.$.nodeType && e.$.host ? e.$.host : e.$,
			l = t && t.p || g,
			r = e.p || g;
		for (s in l) null == r[s] && null != l[s] && A(o, s, l[s], void 0, n, e.t);
		for (s in r) A(o, s, l[s], r[s], n, e.t)
	};
let T, C, N = !1,
	S = !1,
	q = !1;
const B = (t, n, s) => {
		let o, l, r, i = n.u[s],
			c = 0;
		if (N || (q = !0, "slot" === i.i && (i.t |= i.u ? 2 : 1)), _(i.l)) i.$ = e.createTextNode(i.l);
		else if (1 & i.t) i.$ = e.createTextNode("");
		else if (o = i.$ = e.createElement(2 & i.t ? "slot-fb" : i.i), F(null, i, !1), i.u)
			for (c = 0; c < i.u.length; ++c)(l = B(t, i, c, o)) && o.appendChild(l);
		return i.$["s-hn"] = C, 3 & i.t && (i.$["s-sr"] = !0, i.$["s-cr"] = T, i.$["s-sn"] = i.g || "", (r = t && t.u && t.u[s]) && r.i === i.i && t.$ && H(t.$, !1)), i.$
	},
	H = (t, e) => {
		n.t |= 1;
		const s = t.childNodes;
		for (let t = s.length - 1; t >= 0; t--) {
			const n = s[t];
			n["s-hn"] !== C && n["s-ol"] && (G(n).insertBefore(n, D(n)), n["s-ol"].remove(), n["s-ol"] = void 0, q = !0), e && H(n, e)
		}
		n.t &= -2
	},
	V = (t, e, n, s, o, l) => {
		let r, i = t["s-cr"] && t["s-cr"].parentNode || t;
		for (; o <= l; ++o) s[o] && (r = B(null, n, o, t)) && (s[o].$ = r, i.insertBefore(r, D(e)))
	},
	W = (t, e, n, s) => {
		for (; e <= n; ++e) _(t[e]) && (s = t[e].$, X(t[e], !0), S = !0, s["s-ol"] ? s["s-ol"].remove() : H(s, !0), s.remove())
	},
	z = (t, e) => t.i === e.i && ("slot" === t.i ? t.g === e.g : t.h === e.h),
	D = t => t && t["s-ol"] || t,
	G = t => (t["s-ol"] ? t["s-ol"] : t).parentNode,
	I = (t, e) => {
		const n = e.$ = t.$,
			s = t.u,
			o = e.u;
		let l;
		_(e.l) ? (l = n["s-cr"]) ? l.parentNode.textContent = e.l : t.l !== e.l && (n.textContent = e.l) : ("slot" === e.i || F(t, e, !1), _(s) && _(o) ? ((t, e, n, s) => {
			let o, l, r = 0,
				i = 0,
				c = 0,
				a = 0,
				f = e.length - 1,
				u = e[0],
				$ = e[f],
				m = s.length - 1,
				p = s[0],
				d = s[m];
			for (; r <= f && i <= m;)
				if (null == u) u = e[++r];
				else if (null == $) $ = e[--f];
			else if (null == p) p = s[++i];
			else if (null == d) d = s[--m];
			else if (z(u, p)) I(u, p), u = e[++r], p = s[++i];
			else if (z($, d)) I($, d), $ = e[--f], d = s[--m];
			else if (z(u, d)) "slot" !== u.i && "slot" !== d.i || H(u.$.parentNode, !1), I(u, d), t.insertBefore(u.$, $.$.nextSibling), u = e[++r], d = s[--m];
			else if (z($, p)) "slot" !== u.i && "slot" !== d.i || H($.$.parentNode, !1), I($, p), t.insertBefore($.$, u.$), $ = e[--f], p = s[++i];
			else {
				for (c = -1, a = r; a <= f; ++a)
					if (e[a] && _(e[a].h) && e[a].h === p.h) {
						c = a;
						break
					} c >= 0 ? ((l = e[c]).i !== p.i ? o = B(e && e[i], n, c, t) : (I(l, p), e[c] = void 0, o = l.$), p = s[++i]) : (o = B(e && e[i], n, i, t), p = s[++i]), o && G(u.$).insertBefore(o, D(u.$))
			}
			r > f ? V(t, null == s[m + 1] ? null : s[m + 1].$, n, s, i, m) : i > m && W(e, r, f)
		})(n, s, e, o) : _(o) ? (_(t.l) && (n.textContent = ""), V(n, null, e, o, 0, o.length - 1)) : _(s) && W(s, 0, s.length - 1))
	},
	J = (t, e, n, s, o, l, r, i) => {
		for (s = 0, o = (n = t.childNodes).length; s < o; s++)
			if (1 === (e = n[s]).nodeType) {
				if (e["s-sr"])
					for (r = e["s-sn"], e.hidden = !1, l = 0; l < o; l++)
						if (n[l]["s-hn"] !== e["s-hn"])
							if (i = n[l].nodeType, "" !== r) {
								if (1 === i && r === n[l].getAttribute("slot")) {
									e.hidden = !0;
									break
								}
							} else if (1 === i || 3 === i && "" !== n[l].textContent.trim()) {
					e.hidden = !0;
					break
				}
				J(e)
			}
	},
	K = [],
	Q = t => {
		let e, n, s, o, l = t.childNodes,
			r = l.length,
			i = 0,
			c = 0,
			a = 0;
		for (r = l.length; i < r; i++) {
			if ((e = l[i])["s-sr"] && (n = e["s-cr"]))
				for (o = e["s-sn"], c = (s = n.parentNode.childNodes).length - 1; c >= 0; c--)(n = s[c])["s-cn"] || n["s-nr"] || n["s-hn"] === e["s-hn"] || ((3 === (a = n.nodeType) || 8 === a) && "" === o || 1 === a && null === n.getAttribute("slot") && "" === o || 1 === a && n.getAttribute("slot") === o) && (K.some(t => t.nodeToRelocate === n) || (S = !0, n["s-sn"] = o, K.push({
					slotRefNode: e,
					nodeToRelocate: n
				})));
			1 === e.nodeType && Q(e)
		}
	},
	X = (t, e) => {
		t && (t.p && t.p.ref && t.p.ref(e ? null : t.$), t.u && t.u.forEach(t => {
			X(t, e)
		}))
	},
	Y = (t, e, n) => {
		e.t |= 16;
		const s = e.o,
			o = () => Z(t, e, n, s);
		return (() => (() => w(o))())()
	},
	Z = (t, s, o, l) => {
		s.t &= -17, s.t |= 4;
		try {
			((t, s, o, l) => {
				C = v(t.tagName);
				const r = s._ || {
						t: 0
					},
					i = (t => t && t.i === L)(l) ? l : U(null, null, l);
				if (i.i = null, i.t |= 4, s._ = i, i.$ = r.$ = t, T = t["s-cr"], N = !1, q = S = !1, I(r, i), q) {
					Q(i.$);
					for (let t = 0; t < K.length; t++) {
						const n = K[t];
						if (!n.nodeToRelocate["s-ol"]) {
							const t = e.createTextNode("");
							t["s-nr"] = n.nodeToRelocate, n.nodeToRelocate.parentNode.insertBefore(n.nodeToRelocate["s-ol"] = t, n.nodeToRelocate)
						}
					}
					n.t |= 1;
					for (let t = 0; t < K.length; t++) {
						const e = K[t],
							n = e.slotRefNode.parentNode;
						let s = e.slotRefNode.nextSibling,
							o = e.nodeToRelocate["s-ol"];
						for (; o = o.previousSibling;) {
							let t = o["s-nr"];
							if (t && t["s-sn"] === e.nodeToRelocate["s-sn"] && n === t.parentNode && (!(t = t.nextSibling) || !t["s-nr"])) {
								s = t;
								break
							}
						}(!s && n !== e.nodeToRelocate.parentNode || e.nodeToRelocate.nextSibling !== s) && e.nodeToRelocate !== s && n.insertBefore(e.nodeToRelocate, s)
					}
					n.t &= -2
				}
				S && J(i.$), K.length = 0
			})(t, s, 0, l.render && l.render())
		} catch (t) {
			i(t)
		}
		s.t &= -5, a && a.updateHost(t), s.t |= 2, tt(t, s)
	},
	tt = (t, s) => {
		if (!t["s-al"]) {
			const o = s.v;
			64 & s.t || (s.t |= 64, t.classList.add("hydrated"), s.j(t), o || (e.documentElement.classList.add("hydrated"), setTimeout(() => n.t |= 2, 999)))
		}
	},
	et = (t, e, s) => {
		if (e.k) {
			t.watchers && (e.R = t.watchers);
			const l = Object.entries(e.k),
				r = t.prototype;
			if (l.forEach(([t, [n]]) => {
					(31 & n || 2 & s && 32 & n) && Object.defineProperty(r, t, {
						get() {
							return ((t, e) => o(t).M.get(e))(this, t)
						},
						set(n) {
							((t, e, n, s) => {
								const l = o(this),
									r = l.U,
									c = l.M.get(e),
									a = l.t;
								if (!((n = ((t, e) => null == t || j(t) ? t : 2 & e ? parseFloat(t) : 1 & e ? String(t) : t)(n, s.k[e][0])) === c || 8 & a && void 0 !== c) && (l.M.set(e, n), l.o)) {
									if (s.R && 128 & a) {
										const t = s.R[e];
										t && t.forEach(t => {
											try {
												l.o[t].call(l.o, n, c, e)
											} catch (t) {
												i(t)
											}
										})
									}
									2 == (22 & a) && Y(r, l, s)
								}
							})(0, t, n, e)
						},
						configurable: !0,
						enumerable: !0
					})
				}), 1 & s) {
				const e = new Map;
				r.attributeChangedCallback = function(t, s, o) {
					n.jmp(() => {
						const n = e.get(t);
						this[n] = (null !== o || "boolean" != typeof this[n]) && o
					})
				}, t.observedAttributes = l.filter(([t, e]) => 15 & e[0]).map(([t, n]) => {
					const s = n[1] || t;
					return e.set(s, t), s
				})
			}
		}
		return t
	},
	nt = (l, r = {}) => {
		const f = [],
			u = r.exclude || [],
			$ = e.head,
			m = t.customElements,
			p = $.querySelector("meta[charset]"),
			d = e.createElement("style");
		Object.assign(n, r), n.s = new URL(r.resourcesUrl || "./", e.baseURI).href, r.syncQueue && (n.t |= 4), l.forEach(t => t[1].forEach(l => {
			const r = {
					t: l[0],
					L: l[1],
					k: l[2],
					O: l[3],
					R: {}
				},
				$ = r.L;
			r.P = t[0], u.includes($) || m.get($) || (f.push($), m.define($, et(class extends HTMLElement {
				constructor(t) {
					super(t), (t => {
						{
							const e = {
								t: 0,
								U: t,
								M: new Map
							};
							e.A = new Promise(t => e.j = t), s.set(t, e)
						}
					})(t = this)
				}
				connectedCallback() {
					n.jmp(() => ((t, s) => {
						if (0 == (1 & n.t)) {
							const n = o(t);
							if (!(1 & n.t)) {
								let o;
								n.t |= 1, o || !!(4 & s.t) && ((t, n) => {
									let s;
									s = "", (n = t["s-cr"] = e.createComment(""))["s-cn"] = !0, t.insertBefore(n, t.firstChild)
								})(t), s.k && Object.entries(s.k).forEach(([e, [n]]) => {
									if (31 & n && t.hasOwnProperty(e)) {
										const n = t[e];
										delete t[e], t[e] = n
									}
								}), (async (t, e, n, s, o) => {
									if (0 == (32 & e.t)) {
										e.t |= 32, (o = (t => {
											const e = t.L.replace(/-/g, "_"),
												n = t.P,
												s = c.get(n);
											return s ? s[e] : __sc_import_microbit(`./${n}.entry.js`).then(t => (c.set(n, t), t[e]), i)
										})(n)).then && (o = await o), o.isProxied || (n.R = o.watchers, et(o, n, 2), o.isProxied = !0), e.t |= 8;
										try {
											new o(e)
										} catch (t) {
											i(t)
										}
										e.t &= -9, e.t |= 128
									}(() => Y(t, e, n))()
								})(t, n, s)
							}
						}
					})(this, r))
				}
				disconnectedCallback() {
					n.jmp(() => (() => {
						0 == (1 & n.t) && a && a.removeHost(this)
					})())
				}
				"s-init"() {
					const t = o(this);
					t.o && tt(this, t)
				}
				"s-hmr"(t) {}
				forceUpdate() {
					((t, e) => {
						{
							const n = o(t);
							2 & n.t && Y(t, n, e)
						}
					})(this, r)
				}
				componentOnReady() {
					return o(this).A
				}
			}, r, 1)))
		})), d.innerHTML = f + "{visibility:hidden}.hydrated{visibility:inherit}", d.setAttribute("data-styles", ""), $.insertBefore(d, p ? p.nextSibling : $.firstChild)
	},
	st = t => o(t).U;
export {
	k as a, nt as b, st as g, U as h, R as p, l as r
};