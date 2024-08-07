import {
	r as e,
	h as s,
	g as t
} from "./p-416d80af.js";
import {
	m as i
} from "./p-ede9ed58.js";
class r {
	constructor(s) {
		e(this, s), this.services = null, this.disabled = !0, this.data = "", i.addListener(this)
	}
	async servicesUpdated() {
		this.disabled = !this.services || !this.services.uartService;
		const e = this.services.uartService;
		e ? await e.addEventListener("receiveText", e => this.data += e.detail) : this.data = ""
	}
	render() {
		return s("span", {
			style: {
				whiteSpace: "pre"
			}
		}, this.data)
	}
	get el() {
		return t(this)
	}
	static get watchers() {
		return {
			services: ["servicesUpdated"]
		}
	}
}
export {
	r as microbit_receive
};