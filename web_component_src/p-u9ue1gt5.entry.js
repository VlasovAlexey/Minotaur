import {
	r as t,
	g as e
} from "./p-416d80af.js";
import {
	m as n
} from "./p-ede9ed58.js";
class r {
	constructor(e) {
		t(this, e), this.deviceInformation = null, this.disconnectedText = "Disconnected", this.noInfo = "No manufacturer name found", n.addListener(this)
	}
	render() {
		return this.deviceInformation ? this.deviceInformation.manufacturer || this.noInfo : this.disconnectedText
	}
	get el() {
		return e(this)
	}
}
export {
	r as microbit_manufacturer
};