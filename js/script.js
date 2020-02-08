'use strict';
let booksList = document.querySelector('.books'),
    book1 = booksList.getElementsByClassName('book')[1],
    book2 = booksList.getElementsByClassName('book')[0],
    book3 = booksList.getElementsByClassName('book')[4],
    book4 = booksList.getElementsByClassName('book')[3],
    book5 = booksList.getElementsByClassName('book')[5],
    book6 = booksList.getElementsByClassName('book')[2],
    adv   = document.querySelector('.adv'),
    chaptersBook2 = book2.querySelectorAll('li'),
    chaptersBook5 = book5.querySelectorAll('li'),
    newChapter = document.createElement('li');
// console.log(book1, book2, book3, book4, book5, book6)

booksList.appendChild(book6);
booksList.insertBefore(book1, book2);
booksList.insertBefore(book3, book4);
document.body.style.backgroundImage = 'url("./image/you-dont-know-js.jpg")';
book3.querySelector('a').textContent = 'Книга 3. this и Прототипы Объектов';
adv.remove();

book2.querySelector('ul').insertBefore(chaptersBook2[6], chaptersBook2[4]);
book2.querySelector('ul').insertBefore(chaptersBook2[8], chaptersBook2[4]);
book2.querySelector('ul').insertBefore(chaptersBook2[2], chaptersBook2[10]);

book5.querySelector('ul').insertBefore(chaptersBook5[9], chaptersBook5[2]);
book5.querySelector('ul').insertBefore(chaptersBook5[2], chaptersBook5[5]);
book5.querySelector('ul').insertBefore(chaptersBook5[5], chaptersBook5[8]);

newChapter.textContent = 'Глава 8: За пределами ES6';
book6.querySelector('ul').insertBefore(newChapter, book6.querySelectorAll('li')[9]);