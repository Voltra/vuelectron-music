import { Directive } from "vue";
import { Scrollbar } from "@/js/modules/scrollbars";
import { ScrollbarX } from "@/js/modules/scrollbars/ScrollbarX.ts";
import { ScrollbarY } from "@/js/modules/scrollbars/ScrollbarY.ts";
import type PerfectScrollbar from "perfect-scrollbar";

export interface ScrollableHtmlElement extends HTMLElement {
	$scrollbar?: Scrollbar;
}

export type ScrollbarDirective = Directive<ScrollableHtmlElement, undefined|Partial<PerfectScrollbar.Options>>;

export const vScrollbarXY: ScrollbarDirective = {
	mounted(el, binding) {
		el.$scrollbar = new Scrollbar(el, binding.value || {});
		el.$scrollbar.init();
		el.$scrollbar.update();
	},
	beforeUnmount(el) {
		el.$scrollbar.destroy();
	},
};

export const vScrollbarX: ScrollbarDirective = {
	mounted(el, binding) {
		el.$scrollbar = new ScrollbarX(el, binding.value || {});
		el.$scrollbar.init();
		el.$scrollbar.update();
	},
	beforeUnmount(el) {
		el.$scrollbar.destroy();
	},
};

export const vScrollbarY: ScrollbarDirective = {
	mounted(el, binding) {
		el.$scrollbar = new ScrollbarY(el, binding.value || {});
		el.$scrollbar.init();
		el.$scrollbar.update();
	},
	beforeUnmount(el) {
		el.$scrollbar.destroy();
	},
};

