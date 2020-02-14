'use strict';
const start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'), 
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    cancel = document.getElementById('cancel'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent');

let incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

class AppData {

  constructor(){
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
  }
  check(){
    if(salaryAmount !== ''){
      start.removeAttribute('disabled');
    }
  }
  start(){
    this.budget = +salaryAmount.value;
    this.getExpInc();
    this.getExpensesMonth();
    this.getInfoDeposit();
    this.getBudget();
    this.getAddExpInc(additionalExpensesItem);
    this.getAddExpInc(additionalIncomeItem);
    this.showResult();
    this.blockInputs();
    this.showClear();
  }
  showResult(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', () => {
      incomePeriodValue.value = this.calcPeriod();
    });
  }
  getExpensesMonth(){
    for(let key in this.expenses){
      this.expensesMonth += +this.expenses[key];
    }
  }
  
  getBudget(){
    const monthDeposit = this.moneyDeposit * this.percentDeposit / 100;
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth(){
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }
  getStatusIncome(){
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    }
    else if (this.budgetDay >= 600) {
      return ('У вас средний уровень дохода');
    }
    else if (this.budgetDay < 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    }
    else {
      return ('Что то пошло не так');
    }
  }
  addBlock(e){
    let elem = document.querySelectorAll(`.${e.target.parentNode.className}-items`),
        item = elem[0],
        cloneItem = item.cloneNode(true);
    cloneItem.querySelectorAll('input')[0].value = '';
    cloneItem.querySelectorAll('input')[1].value = '';
    item.parentNode.insertBefore(cloneItem, e.target);
    item = document.querySelectorAll(`.${e.target.parentNode.className}-items`);
    this.validateNumber();
    this.validateText();
    if(elem.length === 2){
      e.target.style.display = 'none';
    }
  }
  getExpInc(){
    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value,
            itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if(itemTitle !== '' && itemAmount !== ''){
        this[startStr][itemTitle] = itemAmount;
      }
    };

    incomeItems.forEach(count);
    expensesItems.forEach(count);
    
    for(const key in this.income){
      this.incomeMonth += +this.income[key];
    }
  }
  getAddExpInc(add){
    if(typeof add.value === 'string'){
      let addValue = add.value.split(',');
      addValue.forEach(item => {
        item = item.trim();
        if(item !== ''){
          this.addExpenses.push(item);
        }
      });
    }
    else {
      add.forEach(item => {
        item = item.value.trim();
        if(item !== ''){
          this.addIncome.push(item);
        }
      });
    }
  }
  calcSavedMoney(){
    return this.budgetMonth * this.period;
  }
  calcPeriod(){
    return this.budgetMonth * periodSelect.value;
  }
  getPeriodAmount(){
    periodAmount.textContent = periodSelect.value;
  }
  validateNumber(){
    document.querySelectorAll('[placeholder="Сумма"],[placeholder="Процент"]').forEach((item) => {
      item.addEventListener('keydown', function(e){
        if((e.key >= '0' && e.key <= '9') || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Delete' || e.key === 'Backspace'){
          return e.key;
        }
        else e.preventDefault();
      });
    });
  }
  validateText(){
    document.querySelectorAll('[placeholder="Наименование"]').forEach((item) => {
        item.addEventListener('keydown', function(e){
          const reg = /[а-яё]/i;
          if(reg.test(e.key) || e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Delete' ||
          e.key === 'Backspace' || e.key === ' ' || e.key === ',' || e.key === '.'){
            return e.key;
          }
          else e.preventDefault();
        });
    });
  }
  getInfoDeposit(){
    if(this.deposit){
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
      
    }
  }
  changePercent(){
    const validatePercent = () =>{
      if(+depositPercent.value < 0 || +depositPercent.value > 100){
        alert('введите корректное значение в поле "Процент"');
        depositPercent.value = '';
        start.disabled = true;
      } else start.disabled = false;
    };
    const valueSelect = this.value;
    if(valueSelect === 'other'){
      depositPercent.style.display = 'inline-block';
      depositPercent.value = '';
      depositPercent.addEventListener('input', validatePercent);
      
    } else {
      depositPercent.style.display = 'none';
      depositPercent.value = valueSelect;
      depositPercent.removeEventListener('input', validatePercent);
    }
    
  }
  depositHandler(){
    if(depositCheck.checked){
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    }
    if(!depositCheck.checked){
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  blockInputs(){
    document.querySelectorAll('.data input[type="text"]').forEach(item =>{
      item.disabled = true;
    });
  }
  showClear(){
    start.style.display = 'none';
    cancel.style.display = 'block';
    expensesPlus.style.display = 'none';
    incomePlus.style.display = 'none';
  }
  reset(){
    document.querySelectorAll('input[type="text"]').forEach(item =>{
      item.disabled = false;
      item.value = '';
    });
    start.style.display = 'block';
    cancel.style.display = 'none';
    start.disabled = true;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    periodAmount.textContent = 1;
    periodSelect.value = 1;
    expensesPlus.style.display = 'block';
    incomePlus.style.display = 'block';
    document.querySelectorAll('.expenses-items').forEach((item, i) => {
      if (i > 0){
        item.remove();
      }
    });
    document.querySelectorAll('.income-items').forEach((item, i) => {
      if (i > 0){
        item.remove();
      }
    });
  }
  init(){
    start.disabled = true;
    salaryAmount.addEventListener('input', function(e){
    if(e.target.value === ''){
      start.disabled = true;
    }
    else {
      start.disabled = false;
    }
    });
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    this.validateText();
    this.validateNumber();
    expensesPlus.addEventListener('click', this.addBlock.bind(this));
    incomePlus.addEventListener('click', this.addBlock.bind(this));
    periodSelect.addEventListener('input', this.getPeriodAmount.bind(this));
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }
}

const appData = new AppData();
appData.init();