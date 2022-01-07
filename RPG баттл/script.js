"use strict";

//создаём игру в виде функции
function game(){

  //для начала игры, запросим разрешение пользователя
  function start(){
    if(confirm("Хотите начать игру?")) return true;
    else return false;
  }

  //полученные данные
  if(start()){
    const monster = {
      maxHealth: 10,
      name: "Лютый",
      moves: [
          {
              "name": "Удар когтистой лапой",
              "physicalDmg": 3, // физический урон
              "magicDmg": 0,    // магический урон
              "physicArmorPercents": 20, // физическая броня
              "magicArmorPercents": 20,  // магическая броня
              "cooldown": 0     // ходов на восстановление
          },
          {
              "name": "Огненное дыхание",
              "physicalDmg": 0,
              "magicDmg": 4,
              "physicArmorPercents": 0,
              "magicArmorPercents": 0,
              "cooldown": 3
          },
          {
              "name": "Удар хвостом",
              "physicalDmg": 2,
              "magicDmg": 0,
              "physicArmorPercents": 50,
              "magicArmorPercents": 0,
              "cooldown": 2
          },
      ]
    }
    const eustathius = {
      maxHealth1: 16,
      maxHealth2: 13,
      maxHealth3: 10,
      name: "Евстафий",
      moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4
        },
      ]
    }
    //добавим переменные, которые нам будут необходимы 
    let eustathiusHp; //здоровье игрока (Евстафия)
    let monsterHp = monster.maxHealth; //здоровье монстра (Лютого)
    let difficultyLvl; //уровень сложности 
    let monsterAction; //действие монстра 
    let eustathiusAction; //действие игрока 
    //кулдауны игрока
    let cooldown0 = 0;
    let cooldown1 = 0;
    let cooldown2 = 0;
    let cooldown3 = 0;
    //кулдауны компьютера(рандом)
    let cooldown0Ai = 0;
    let cooldown1Ai = 0;
    let cooldown2Ai = 0;

    //если пользователь захотел играть, даём ему выбрать сложность
    function difficulty(){
        //предлагаем выбрать игроку сложность (от 1 до 3)
        do {
            difficultyLvl = prompt(`Выберите уровень сложности: 1 (${eustathius.maxHealth1} HP), 2 (${eustathius.maxHealth2} HP), 3(${eustathius.maxHealth3} HP)`);
            //в зависимости от выбранного уровня сложности, присваиваем Евстафию определённое количество HealthPoint'ов
            if(+difficultyLvl == 1) return eustathiusHp = eustathius.maxHealth1;
            else if(+difficultyLvl == 2) return eustathiusHp = eustathius.maxHealth2;
            else if(+difficultyLvl == 3) return eustathiusHp = eustathius.maxHealth3;
            else if(difficultyLvl === null) return false; //можно выйти из игры
            else alert("Напишите число от 1 до 3");
        } while(+difficultyLvl != 1 || +difficultyLvl != 2 || +difficultyLvl != 3);
    } difficulty();

    //показываем здоровье игроку
    confirm(`Отлично, уровень сложности выбран!\nТеперь у Вас ${eustathiusHp} HP\nМонстр ${monster.name} имеет ${monsterHp} HP\nПродолжить?!?`)
    
    //пока оба оппонента живы, игра продолжается
    while(eustathiusHp > 0 && monsterHp > 0){

      //добавим ход монстру
      function aiMove(){

        //переменная для зацикливания в поисках верного результата
        let i = 1;
        //рандомайзер, но в зависимости от кулдаунов 
        while(i > 0){
          monsterAction = Math.floor(Math.random() * 3)
          i--;
          if(cooldown0Ai > 0 && monsterAction == 0) i = 1; //если есть хотя бы один кулдаун, выбор действия отменяется
          if(cooldown1Ai > 0 && monsterAction == 1) i = 1;
          if(cooldown2Ai > 0 && monsterAction == 2) i = 1;
          if(!(cooldown0Ai > 0 || cooldown1Ai > 0 || cooldown2Ai > 0)) return monsterAction; //если всё чисто, возвращаем выбор
        }

      } aiMove();

      //добавим ход игроку
      function playerMove(){

        //показываем игроку ход монстра и даём выбрать ход
        do {
          eustathiusAction = prompt(`Ваше здоровье: ${eustathiusHp} HP\nЗдоровье монстра: ${monsterHp} HP
          \nВас атакует монстр! 
          Атака: ${(monster.moves[monsterAction]["name"])}
          Физический урон: ${(monster.moves[monsterAction]["physicalDmg"])}
          Магический урон: ${(monster.moves[monsterAction]["magicDmg"])}
          Физическая броня: ${(monster.moves[monsterAction]["physicArmorPercents"])}
          Магическая броня: ${(monster.moves[monsterAction]["magicArmorPercents"])}
          Кулдаун: ${(monster.moves[monsterAction]["cooldown"])}
          \nВыберите ответное действие: 
          (1)   Атака: ${(eustathius.moves[0]["name"])}
                  Фу: ${(eustathius.moves[0]["physicalDmg"])} Му: ${(eustathius.moves[0]["magicDmg"])} Фб: ${(eustathius.moves[0]["physicArmorPercents"])} Мб: ${(eustathius.moves[0]["magicArmorPercents"])} Кд: ${(eustathius.moves[0]["cooldown"])}
          (2)   Атака: ${(eustathius.moves[1]["name"])}
                  Фу: ${(eustathius.moves[1]["physicalDmg"])} Му: ${(eustathius.moves[1]["magicDmg"])} Фб: ${(eustathius.moves[1]["physicArmorPercents"])} Мб: ${(eustathius.moves[1]["magicArmorPercents"])} Кд: ${(eustathius.moves[1]["cooldown"])}
          (3)   Атака: ${(eustathius.moves[2]["name"])}
                  Фу: ${(eustathius.moves[2]["physicalDmg"])} Му: ${(eustathius.moves[2]["magicDmg"])} Фб: ${(eustathius.moves[2]["physicArmorPercents"])} Мб: ${(eustathius.moves[2]["magicArmorPercents"])} Кд: ${(eustathius.moves[2]["cooldown"])}
          (4)   Атака: ${(eustathius.moves[3]["name"])}
                  Фу: ${(eustathius.moves[3]["physicalDmg"])} Му: ${(eustathius.moves[3]["magicDmg"])} Фб: ${(eustathius.moves[3]["physicArmorPercents"])} Мб: ${(eustathius.moves[3]["magicArmorPercents"])} Кд: ${(eustathius.moves[3]["cooldown"])}
          `);

          //отменяем выбор, если действие находиться в кудауне
          if(cooldown0 > 0 && eustathiusAction == 1){
            alert(`Вы не можете использовать это действие, так как оно находиться на перезарядке (Осталось ходов для использования: ${cooldown0})`)
            continue;
          }
          if(cooldown1 > 0 && eustathiusAction == 2){
            alert(`Вы не можете использовать это действие, так как оно находиться на перезарядке (Осталось ходов для использования: ${cooldown1})`)
            continue;
          }
          if(cooldown2 > 0 && eustathiusAction == 3){
            alert(`Вы не можете использовать это действие, так как оно находиться на перезарядке (Осталось ходов для использования: ${cooldown2})`)
            continue;
          }
          if(cooldown3 > 0 && eustathiusAction == 4){
            alert(`Вы не можете использовать это действие, так как оно находиться на перезарядке (Осталось ходов для использования: ${cooldown3})}`)
            continue;
          }

          //если всё верно, возвращаем выбор игрока в виде цифры от 1 до 4
          if(eustathiusAction == 1) return eustathiusAction = 0;
          else if(eustathiusAction == 2) return eustathiusAction = 1;
          else if(eustathiusAction == 3) return eustathiusAction = 2;
          else if(eustathiusAction == 4) return eustathiusAction = 3;
          else if(eustathiusAction === null) return false; //можно выйти из игры
          else alert("Напишите число от 1 до 4"); 

          //цикл не завершиться, пока мы не получим выбор игрока, или он не прекратит игру
        } while(eustathiusAction != 1 || eustathiusAction != 2 || eustathiusAction != 3 || eustathiusAction != 4);

      } playerMove();

      //сверяем нанесённый урон
      function attack(){

        //высчитываем нанесенный урон для физической и магической брони для каждого персонажа
        //для Евстафия
        let physicalDmgByMonster = eustathius.moves[eustathiusAction]["physicArmorPercents"] - monster.moves[monsterAction]["physicalDmg"]
        let magicDmgByMonster = eustathius.moves[eustathiusAction]["magicArmorPercents"] - monster.moves[monsterAction]["magicDmg"]
        //для Лютого
        let physicDmgByEustathius = monster.moves[monsterAction]["physicArmorPercents"] - eustathius.moves[eustathiusAction]["physicalDmg"]
        let magicDmgByEustathius = monster.moves[monsterAction]["magicArmorPercents"] - eustathius.moves[eustathiusAction]["magicDmg"]
    
        //если удар пробивает броню, наносим урон в виде разницы брони и урона
        if(physicalDmgByMonster < 0) eustathiusHp += physicalDmgByMonster;
        if(magicDmgByMonster < 0) eustathiusHp += magicDmgByMonster;
        if(physicDmgByEustathius < 0) monsterHp += physicDmgByEustathius;
        if(magicDmgByEustathius < 0) monsterHp += magicDmgByEustathius;

      } attack();

      function roundEnd(){

        //завершаем раунд или завершаем игру
        if(eustathiusHp <= 0 && monsterHp <= 0 ){
          alert(`Вы оба пали в схватке!`);
          game();
        } else if(eustathiusHp <= 0){
          alert(`Вы проиграли!\nЗдоровье монстра: ${monsterHp} HP`);
          game();
        } else if(monsterHp <= 0){
          alert(`Славная победа!\nВаше здоровье: ${eustathiusHp} HP`);
          game();
        } else {
          alert(`Ваше здоровье: ${eustathiusHp} HP\nЗдоровье монстра: ${monsterHp} HP`);
        }

      } roundEnd();

      //после каждого хода проверяем или увеличиваем кулдауны
      function cooldownCheck(){

        //если действует кулдаун, уменьшаем его действуеещее в данном ходу значение 
        if(cooldown0 != 0) cooldown0 --;
        if(cooldown1 != 0) cooldown1 --;
        if(cooldown2 != 0) cooldown2 --;
        if(cooldown3 != 0) cooldown3 --;
        if(cooldown0Ai != 0) cooldown0Ai --;
        if(cooldown1Ai != 0) cooldown1Ai --;
        if(cooldown2Ai != 0) cooldown2Ai --;
        //если выбрано действие, запускаем его кулдаун
        if(eustathiusAction == 0) cooldown0 += (eustathius.moves[0]["cooldown"]);
        if(eustathiusAction == 1) cooldown1 += (eustathius.moves[1]["cooldown"]);
        if(eustathiusAction == 2) cooldown2 += (eustathius.moves[2]["cooldown"]);
        if(eustathiusAction == 3) cooldown3 += (eustathius.moves[3]["cooldown"]);
        if(monsterAction == 0) cooldown0Ai += (monster.moves[0]["cooldown"]);
        if(monsterAction == 1) cooldown1Ai += (monster.moves[1]["cooldown"]);
        if(monsterAction == 2) cooldown2Ai += (monster.moves[2]["cooldown"]);

      } cooldownCheck();  
    }
  }
}

//запускаем игру
game();

