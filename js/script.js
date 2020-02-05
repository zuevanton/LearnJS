'use strict';
function dateOut(){
  
  let fullDate = document.querySelector('.long-date'),
      shortDate = document.querySelector('.short-date'),
      date = new Date(),
      hour = date.getHours(),
      minute = date.getMinutes(),
      second = date.getSeconds(),
      longFormatDate = new Intl.DateTimeFormat('ru', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      shortFormatDate = new Intl.DateTimeFormat('ru', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      }),
      formatTime = new Intl.DateTimeFormat('ru', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

  const getLongDateFormat = function (){
    return longFormatDate.format(date);
  };

  const getShortDateFormat = function(){
    return shortFormatDate.format(date);
  };

  const getShortTimeFormat = function(){
   return formatTime.format(date);
  };

  function num2str(n, textForms) {  
    n = Math.abs(n) % 100;
    let n1 = n % 10;
    if (n > 10 && n < 20) { 
     return textForms[2];
    }
    if (n1 > 1 && n1 < 5) 
    { 
      return textForms[1]; 
    }
    if (n1 === 1) { 
     return textForms[0]; 
    }
     return textForms[2];
  }
  
  let hourDeclension = ' ' + num2str(hour, ['час', 'часа', 'часов']) + ' ',
  minuteDeclension = ' ' + num2str(minute, ['минута', 'минуты', 'минут']) + ' ',
  secondDeclension = ' ' + num2str(second, ['секунда', 'секунды', 'секунд']) + ' ';



  shortDate.innerHTML = getShortDateFormat() + ' - ' + getShortTimeFormat();
  fullDate.innerHTML = 'Сегодня ' + getLongDateFormat() + ', ' + hour + hourDeclension + minute +
  minuteDeclension + second + secondDeclension;

}

setInterval(function(){
  dateOut();
}, 1000);
