'use strict';
// создаем переменные
let lang = 'ru',
    ruWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    enWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// выводим дни недели через if
console.log('задание 1 а');
if (lang === 'ru'){
  ruWeek.forEach(element => console.log(element));
}
else enWeek.forEach(element => console.log(element));

// через switch
console.log('задание 1 b');
switch(lang) {
  case 'ru':
    ruWeek.forEach(element => console.log(element));
    break;
  case 'en':
    enWeek.forEach(element => console.log(element));
}

// через многомерный массив
console.log('задание 1 c');
let week = {
  ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
};
week[lang].forEach(element => console.log(element));

// задание 2 
let namePerson = 'Максим',
    result = namePerson === 'Артем' ? console.log('Директор') : namePerson === 'Максим' ? console.log('преподаватель') : console.log('студент');