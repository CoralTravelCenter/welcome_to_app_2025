import markup from './markup.html?raw';
import './style.css';
import {getMobileOS, intersectionCallback, mutationCallback} from "./utils.js";


function init() {
    console.log('+++ Init')
    document.body.insertAdjacentHTML('beforeend', markup)

// 1. Определяем страницу где находимся
    const LOCATION = location.pathname


// 2. Выбираем элемент для наблюдения
    const customSection = document.querySelector('.welcome-to-app[data-custom-section="mindbox"]')
    customSection.dataset.location = LOCATION
    const footer = document.querySelector('#footer-column');
    const parentNode = document.querySelector("#hotel-detail-area .ant-row > div > div > div");
    const targetNode = parentNode ? parentNode.children[1] : null

// 3. Создаём MutationObserver
    const mutationObserverConfig = {attributes: true, attributeFilter: ["class"]};
    const mutationObserver = new MutationObserver(mutationsList => mutationCallback(mutationsList, customSection));
    targetNode && mutationObserver.observe(targetNode, mutationObserverConfig);

// 4. Создаём IntersectionObserver
    const intersectionObserverConfig = {root: null, threshold: .1}
    const intersectionObserver = new IntersectionObserver(entries => intersectionCallback(entries), intersectionObserverConfig)
    footer && intersectionObserver.observe(footer);

// 5. Яндекс метрика и редирект
    const deviceOS = getMobileOS();
    const actionButton = customSection && customSection.querySelector('.welcome-to-app__link');
    actionButton.addEventListener('click', () => {
        ym(96674199, 'reachGoal', 'install', {'page': LOCATION})

        if (deviceOS === 'ios') window.open("https://example.com", "_blank");
        if (deviceOS === 'android') window.open("https://example.com", "_blank");
    })
}


if (location.pathname !== "/" && !location.pathname.includes('reservation/add-passenger')) {
    console.log("Код выполняется на этой странице:", window.location.pathname);
    init()
} else {
    console.log("Код не выполняется.")
}




