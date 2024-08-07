import {
	r as s,
	h as e,
	g as t
} from "./p-416d80af.js";
import {
	m as i
} from "./p-ede9ed58.js";
class a {
	constructor(e) {
		s(this, e), this.services = null, this.sensitivity = 1, this.frequency = 20, this.stillClass = "microbit-still", this.movedClass = "microbit-moved", this.className = this.stillClass, i.addListener(this)
	}
	async servicesUpdated() {
		if (!this.services || !this.services.accelerometerService) return void(this.className = this.stillClass);
		const s = this.services.accelerometerService;
		await s.setAccelerometerPeriod(this.frequency);
		const e = await s.readAccelerometerData();
		this.setClassName(e), await s.addEventListener("accelerometerdatachanged", s => this.setClassName(s.detail))
	}
	setClassName(s) {
		this.className = Math.abs(s.x) > this.sensitivity || Math.abs(s.y) > this.sensitivity || Math.abs(s.z) > this.sensitivity ? this.movedClass : this.stillClass
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
	a as microbit_movement
};