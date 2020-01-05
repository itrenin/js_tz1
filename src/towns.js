import { loadAndSortTowns } from './index';

/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return loadAndSortTowns();
    // let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';
    
    // async function f() {
    //     try {
    //         const response = await fetch(url);
    //         const cities = await response.json();

    //         return cities.sort((a, b) => {
    //             if (a.name > b.name) {
    //                 return 1;
    //             }
    //             if (a.name < b.name) {
    //                 return -1;
    //             }

    //             return 0;
    //         })
    //     } catch (e) {
    //         throw new Error(e.message);
    //     }
    // }
    // return f();
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    let check = full.toLowerCase().indexOf(chunk.toLowerCase()) < 0 ? check = false : check = true;

    return check;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

function run() {
    loadTowns()
        .then((cities) => {
            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'block';
            
            filterInput.addEventListener('keyup', function () {
                // это обработчик нажатия кливиш в текстовом поле
                
                while (filterResult.firstChild) {
                    filterResult.removeChild(filterResult.firstChild);
                }

                if (filterInput.value) {
                    for (const city of cities) {
                        if (isMatching(city.name, filterInput.value)) {
                            filterResult.appendChild(createCityNode(city.name));
                        }                        
                    }
                }                
            });            
        })
        .catch(() => {
            loadingBlock.textContent = 'Не удалось загрузить города';
            loadingBlock.appendChild(createReloadButton());

            const reload = homeworkContainer.querySelector('.reload-button');

            reload.addEventListener('click', (e) => {
                e.preventDefault();
                run();
            })
        });
}

run();

function createCityNode(name) {
    const div = document.createElement('DIV');

    div.classList.add('city');
    div.textContent = name;

    return div;
}

function createReloadButton() {
    const button = document.createElement('BUTTON');

    button.classList.add('reload-button');
    button.textContent = 'Повторить';

    return button;
}
export {
    loadTowns,
    isMatching
};
