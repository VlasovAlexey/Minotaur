import {
	r as s,
	h as e,
	g as t
} from "./p-416d80af.js"
import {
	m as a
} from "./p-ede9ed58.js"
class r {
	constructor(e) {
		s(this, e), this.services = null, this.releaseClass = "microbit-release", this.shortPressClass = "microbit-short-press", this.longPressClass = "microbit-long-press", this.className = this.releaseClass, a.addListener(this)
	}
	async servicesUpdated() {
		if (!this.services || !this.services.buttonService) return void(this.className = this.releaseClass);
		const s = this.services.buttonService;
		await s.addEventListener("buttonbstatechanged", s => this.setClassName(s.detail)), this.setClassName(await s.readButtonBState())
	}
	setClassName(s) {
		this.className = 1 === s ? this.shortPressClass : 2 === s ? this.longPressClass : this.releaseClass
	}
	render() {
		return e("span", {
			class: this.className
		}, e("slot", null))
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
	r as microbit_button_b
};