"use strict";

//создаём игру в виде функции
function game() {

  //если пользователь захотел играть, начинаем игру
  if (confirm("Хотите начать игру?")) {

    //необходимые перемнные
    let attemps = 10; //начальное число попыток
    let hiddenNumber = ''; //загаданное число

    //случайным образом выберем длину числа
    function randomInteger(min, max) {
      let randomLenght = Math.floor(Math.random() * (max - min) + min);
      return randomLenght;
    }

    //заполним число уникальными цифрами от 0 до 9
    function randomNumber(min, max) {
      let numberLength = randomInteger(3, 6);//случайная длина
      while (hiddenNumber.toString().length < numberLength) {
        let random = randomInteger(min, max);
        if (!hiddenNumber.includes(random)) {
          hiddenNumber += random;
        }
      }
      return hiddenNumber;
    } randomNumber(0, 9)

    function checkArr() {
      //создадим счётчики
      let right = 0; //счётчик совпавших цифр на своих местах
      let rightArr = []; //массив для угаданных цифр пользователя, которые на своих местах
      let wrong = 0; //счётчик совпавших цифр не на своих местах
      let wrongArr = []; //массив для угаданных цифр пользователя, которые не на своих местах

      //делаем проверку угаданных цифр в числе
      Next:
      for (let i = 0; i < userNumber.toString().length; i++) {
        //если он угадал цифру и её расположение в загаданном числе числе - right++, само число помещается в rightArr
        if (userNumber.toString()[i] == hiddenNumber.toString()[i]) {
          right++; rightArr.push(userNumber.toString()[i]);
        }
        //если он угадал цифру, но не угадал её расположение в загаданном числе числе - wrong++, само число помещается в wrongArr
        else {
          for (let j = 0; j < userNumber.toString().length; j++) {
            if (userNumber.toString()[i] != hiddenNumber.toString()[i] && (userNumber.toString()[i] == hiddenNumber.toString()[j] && userNumber.toString()[i] != hiddenNumber.toString()[i])) {
              wrong++; wrongArr.push(userNumber.toString()[i]); continue Next;
            }
          }
        }
      }

      //после каждой попытки, выводим пользователю угадавших и не угадавших цифр
      if (right != userNumber.toString().length || wrong != 0)
        alert(`Совпавших цифр не на своих местах: ${wrong} (${wrongArr})\nСовпавших цифр на своих местах: ${right} (${rightArr})`);

      if (right == userNumber.toString().length && wrong == 0) return true; //елси всё верно
    }

    function charCheck(str) {
      for (let i = 0; i < str.length; i++) {
        if (str.split(str[i]).length - 1 > 1) {
          return true;
        }
      }
      return false;
    }

    //если у пользователя остались попытки, он может продолжить угадывать число
    Next:
    while (attemps > 0) {

      //получаем число ползователя
      var userNumber = prompt(`Осталось попыток: ${attemps}\nЗапиши число (длина от 3 до 6 цифр), которое мы загадали:`);
      if (userNumber === null) break; //пользователь может в любое время выйти из игры

      if (!userNumber.trim()) {
        alert("Впишите число!")
        continue Next;
      } else if (!isFinite(userNumber)) {
        alert("Можно вписать только цифры!")
        continue Next;
      } else if (userNumber.toString().length < 3 || userNumber.toString().length > 6) {
        alert("Длина числа должна быть от 3 до 6 цифр!")
        continue Next;
      } else if (charCheck(userNumber)) {
        alert("Цифры в числе должны быть уникальными!")
        continue Next;
      } else {
        checkArr
      }
      //сверяем массивы
      //если пользователь не угадал число и у него закончились попытки
      if (attemps == 1) {
        alert(`Вы проиграли!\nВаше число: ${userNumber}\nЗагаданное число: ${hiddenNumber}`);
        game();
      }
      //если пользователь угадал число
      else if (checkArr()) {
        alert(`Вы победили!\nЗагаданное число: ${hiddenNumber}`);
        game(); //предложим игроку сыграть ещё раз game();
      }
      //если пользователь не угадал число, но у него остались попытки
      else {
        attemps--;
      }
    }
  }
  //если игрок отказался играть
  else return false;
}

//запускаем игру
game();
