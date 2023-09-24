import { Scrollbar } from "@/js/modules/scrollbars/Scrollbar.js";
import type PerfectScrollbar from "perfect-scrollbar";

const attribute = "data-scrollbar-no-y";

export class ScrollbarX extends Scrollbar {
	constructor(el: HTMLElement, options: Partial<PerfectScrollbar.Options> = {}) {
		super(el, {
			...options,
			suppressScrollY: true,
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
