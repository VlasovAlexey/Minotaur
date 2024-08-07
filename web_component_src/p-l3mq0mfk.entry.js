import {
	r as t,
	g as s
} from "./p-416d80af.js";
import {
	m as i
} from "./p-ede9ed58.js";
class e {
	constructor(s) {
		t(this, s), this.services = null, this.idTemplate = "microbit-matrix-${row}-${column}", this.offClass = "microbit-matrix-off", this.onClass = "microbit-matrix-on", i.addListener(this)
	}
	async servicesUpdated() {
		const t = [
			[],
			[],
			[],
			[],
			[]
		];
		for (let s = 0; s < 5; s++)
			for (let i = 0; i < 5; i++) {
				const e = this.idTemplate.replace("${row}", s.toString()).replace("${column}", i.toString()),
					a = document.getElementById(e);
				a && (t[s][i] = a, a.onclick = () => this.toggle(s, i), a.classList.toggle(this.onClass, !1), a.classList.toggle(this.offClass, !1))
			}
		this.elements = t, this.services && this.services.ledService && (this.matrix = await this.services.ledService.readMatrixState(), await this.updateMatrix())
	}
	async toggle(t, s) {
		this.matrix[t][s] = !this.matrix[t][s], await this.services.ledService.writeMatrixState(this.matrix), this.updateMatrix()
	}
	updateMatrix() {
		this.matrix.forEach((t, s) => {
			t.forEach((t, i) => {
				const e = this.elements[s][i];
				e && (e.classList.toggle(this.onClass, t), e.classList.toggle(this.offClass, !t))
			})
		})
	}
	get el() {
		return s(this)
	}
	static get watchers() {
		return {
			services: ["servicesUpdated"]
		}
	}
}
export {
	e as microbit_matrix
};