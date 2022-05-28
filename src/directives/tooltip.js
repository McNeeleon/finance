let tooltip;

const mouseover = (v, el) => {
	createTooltipe(v, el);
};
const mouseout = () => {
	if (tooltip) {
		tooltip.remove();
	}
};

export default {
	mounted(el, binding) {
		el.addEventListener('mouseover', () => {
			mouseover(binding.value, el);
		});
		el.addEventListener('mouseout', mouseout);
	},

	unmounted(el) {
		el.removeEventListener('mouseover', mouseover);
		el.removeEventListener('mouseout', mouseout);
	},
};

function createTooltipe(text, el) {
	tooltip = document.createElement('div');
	tooltip.classList.add('vtooltip');
	tooltip.innerHTML = text;
	el.after(tooltip);

	const coorRoof = el.getBoundingClientRect();

	let top = coorRoof.top - tooltip.offsetHeight - 5;
	if (top < 0) {
		top = coorRoof.top + el.offsetHeight + 5;
	}

	let left = coorRoof.left + (el.offsetWidth - tooltip.offsetWidth) / 2;
	if (left < 0) {
		left = 0;
	}
	tooltip.style.top = top + 'px';
	tooltip.style.left = left + 'px';

	return tooltip;
}
