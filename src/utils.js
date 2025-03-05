export async function hostReactAppReady(
	selector = "#__next > div",
	timeout = 500,
) {
	return new Promise((resolve) => {
		const waiter = () => {
			const host_el = document.querySelector(selector);
			if (host_el?.getBoundingClientRect().height) {
				resolve();
			} else {
				setTimeout(waiter, timeout);
			}
		};
		waiter();
	});
}

export function mutationCallback(mutationsList, customSection) {
	mutationsList.forEach(({type, attributeName, target}) => {
		if (type === "attributes" && attributeName === "class") {
			const currentClassList = target.classList;
			if (currentClassList.contains("hide")) {
				customSection.classList.add('js-animate')
			} else {
				customSection.classList.remove('js-animate')
			}
		}
	});
}

export function intersectionCallback(entries) {
	entries.forEach(({target, isIntersecting}) => {
		if (isIntersecting) {
			target.classList.add("hide");
		} else {
			target.classList.remove("hide");
		}
	});
}

export function getMobileOS() {
	const userAgent = navigator.userAgent || navigator.vendor || window.opera;
	if (/android/i.test(userAgent)) {
		return "android";
	} else if (/iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
		return "ios";
	}
	return "other";
}
