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