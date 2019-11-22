/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {

    let result = [];

    for (let i = 0; i < array.length; i++) {
        result.push(fn(array[i], i, array));
    }
  
    return result;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
  
    let i = 0;
    let result = initial || array[i++];
  
    while (i < array.length) {
        result = fn(result, array[i], i, array);
        i++;
    }

    return result;
  
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let array =[];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            array.push(key.toUpperCase());
        }   
    }

    return array;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    let result = [];

    if (from < 0) {
        from = array.length - Math.abs(from);
    }
    if (from > array.length) {
        return result;
    }
    if (to < 0) {
        to = array.length - Math.abs(to);
    }
    for (let i = 0; i < array.length; i++) {
        if (i >= from && i < to) {
            result.push(array[i]);
        }
    }  
  
    return result;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let handler = {
        set: function (target, name, value) {
            target[name] = value*value;
            
            return target[name];
        }
    }
  
    obj = new Proxy(obj, handler);

    return obj;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
