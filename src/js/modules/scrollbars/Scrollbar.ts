import PerfectScrollbar from "perfect-scrollbar";
import { bindMethods } from "@/js/utils/object.ts";

const events = ["resize", "orientationchange"];

export class Scrollbar {
	protected scrollbar?: PerfectScrollbar;

	constructor(protected el: HTMLElement, protected options: Partial<PerfectScrollbar.Options> = {}) {
		bindMethods(this, ["update", "init", "destroy"]);
	}

	update() {
		this.scrollbar?.update();
	}

	init() {
		this.scrollbar = new PerfectScrollbar(this.el, {
			wheelPropagation: true,
			...this.options,
		});

		events.forEach(event => {
			window.addEventListener(event, this.update, {
				passive: true,
			});
		});
	}

	destroy() {
		events.forEach(event => {
			window.removeEventListener(event, this.update);
		});

		this.scrollbar?.destroy();
	}
}
