import { Scrollbar } from "@/js/modules/scrollbars/Scrollbar.js";
import type PerfectScrollbar from "perfect-scrollbar";

const attribute = "data-scrollbar-no-x";

export class ScrollbarY extends Scrollbar {
	constructor(el: HTMLElement, options: Partial<PerfectScrollbar.Options> = {}) {
		super(el, {
			...options,
			suppressScrollY: true,
		});
	}

	public init() {
		super.init();

		this.el.setAttribute(attribute, "true");
	}


	public destroy() {
		this.el.removeAttribute(attribute);

		super.destroy();
	}
}
