import { Scrollbar } from "@/js/modules/scrollbars/Scrollbar.js";
import type PerfectScrollbar from "perfect-scrollbar";

const attribute = "data-scrollbar-no-x";

export class ScrollbarY extends Scrollbar {
	constructor(el: HTMLElement, options: Partial<PerfectScrollbar.Options> = {}) {
		super(el, {
			...options,
			suppressScrollX: true,
		});
	}

	override init() {
		super.init();

		this.el.setAttribute(attribute, "true");
	}


	override destroy() {
		this.el.removeAttribute(attribute);

		super.destroy();
	}
}
