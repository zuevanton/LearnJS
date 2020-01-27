'use strict';
let money = 30000, 
    income = 'фриланс', 
    addExpenses = 'Интернет, Бензин, Кофе', 
    deposit = true, 
    mission = 200000, 
    period = 6;

console.log(typeof (money));
console.log(typeof (income));
console.log(typeof (deposit));

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money / 30;
console.log(budgetDay);

// узнаем информацию у пользователя
money = +prompt('Ваш месячный доход?');
addExpenses = +prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1   = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2   = +prompt('Во сколько это обойдется?');

// рассчитываем бюджет на месяц
let budgetMonth = money - amount1 - amount2;
console.log('бюджет на месяц ', budgetMonth);

// рассчитываем через сколько будет достигнута цель (missoin)
console.log('цель будет достигнута через ' + Math.ceil(mission / budgetMonth) + ' месяцев');

// исправляем бюджет на день(budgetDay) согласно новой информации
console.log('дневной бюджет составляет: ' + Math.floor(budgetMonth / 30));

// определяем уровень дохода
if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
}
else if (budgetDay >= 600) {
  console.log('У вас средний уровень дохода');
}
else if (budgetDay < 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
}
else {
  console.log('Что то пошло не так');
}
