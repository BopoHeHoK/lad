"use strict";

//создаём игру в виде функции
function game(){

  //для начала игры, запросим разрешение пользователя
  function start(){
    if(confirm("Хотите начать игру?")) return true;
    else return false;
  }

  //если пользователь захотел играть, начинаем игру
  if(start()){

    //необходимые перемнные
    let attemps = 10; //начальное число попыток
    let hiddenArr = []; //создаем число, которое должен угадать пользователь
    let userArr = []; //массив для числа пользователя

    //используем рандомайзер для заполнения массива, который представляет число
    let random3to6 = Math.floor(Math.random() * 3) + 3
    for(let i = 0; i <= random3to6; i++) hiddenArr.push(Math.floor(Math.random() * 9) + 1);
  
    let hiddenNumber = hiddenArr.join(''); //представим число в виде строчки

    alert(hiddenNumber); //проверка числа

    //если у пользователя остались попытки, он может продолжить угадывать число
    while(attemps > 0){

      //получаем число ползователя
      var userNumber = prompt(`Осталось попыток: ${attemps}\nЗапиши число (длина от 3 до 6 цифр), которое мы загодали:`);
      if(userNumber === null) break; //пользователь может в любое время выйти из игры
      userArr = Array.from(String(+userNumber), Number); //представляем число пользователя в виде массива цифр

      //сверяем массивы
      function checkArr(){

        //создадим счётчики
        let right = 0; //счётчик совпавших цифр на своих местах
        let rightArr = []; //массив для угаданных цифр пользователя, которые на своих местах
        let wrong = 0; //счётчик совпавших цифр не на своих местах
        let wrongArr = []; //массив для угаданных цифр пользователя, которые не на своих местах

        //делаем проверку угаданных цифр в числе
        Next:
        for(let i = 0; i < userArr.length; i++){
          //если он угадал цифру и её расположение в загаданном числе числе - right++, само число помещается в rightArr
          if(userArr[i] == hiddenArr[i]) {right++; rightArr.push(userArr[i]);}
          //если он угадал цифру, но не угадал её расположение в загаданном числе числе - wrong++, само число помещается в wrongArr
          else{
            for(let j = 0; j < userArr.length; j++){
              if(userArr[i] != hiddenArr[i] && (userArr[i] == hiddenArr[j] && userArr[i] != hiddenArr[i])) {wrong++; wrongArr.push(userArr[i]); continue Next;}
            }
          }
        }

        //после каждой попытки, выводим пользователю угадавших и не угадавших цифр
        if(right != userArr.length || wrong != 0)
          alert(`Совпавших цифр не на своих местах: ${wrong} (${wrongArr})\nСовпавших цифр на своих местах: ${right} (${rightArr})`);

        if(right == userArr.length && wrong == 0) return true; //елси всё верно
      }

      //если пользователь угадал число
       if(checkArr()){
         alert(`Вы победили!\nЗагаданное число: ${hiddenNumber}`);
         game(); //предложим игроку сыграть ещё раз game();
       }
       //если пользователь не угадал число, но у него остались попытки
       else{
         attemps--;
       }
       //если пользователь не угадал число и у него закончились попытки
       if(attemps == 0){
         alert(`Вы проиграли!\nВаше число: ${userNumber}\nЗагаданное число: ${hiddenNumber}`);
         game();
       }
    }
  }
  //если игрок отказался играть
  else return false;
}

//запускаем игру
game();
