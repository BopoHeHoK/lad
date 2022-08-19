"use strict";

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
let eustathiusMaxHp; //начальное здоровье игрока (Евстафия)
let eustathiusHp; //здоровье игрока (Евстафия)
let monsterHp = monster.maxHealth; //здоровье монстра (Лютого)
let difEusHp = 0;
let difMonHp = 0;
let difficultyLvl; //уровень сложности 
let monsterAction; //действие монстра 
let eustathiusAction = 0; //действие игрока 
let endGame = false;
let number = 0;
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
function difficulty() {
    //предлагаем выбрать игроку сложность (от 1 до 3)
    do {
        difficultyLvl = prompt(`Выберите уровень сложности: 1 (${eustathius.maxHealth1} HP), 2 (${eustathius.maxHealth2} HP), 3(${eustathius.maxHealth3} HP)`, 2);
        //в зависимости от выбранного уровня сложности, присваиваем Евстафию определённое количество HealthPoint'ов
        if (+difficultyLvl == 1) return eustathiusHp = eustathius.maxHealth1;
        else if (+difficultyLvl == 2) return eustathiusHp = eustathius.maxHealth2;
        else if (+difficultyLvl == 3) return eustathiusHp = eustathius.maxHealth3;
        else if (difficultyLvl === null) return false; //можно выйти из игры
        else alert("Напишите число от 1 до 3");
    } while (+difficultyLvl != 1 || +difficultyLvl != 2 || +difficultyLvl != 3);
}

function info() {
    eustathiusMaxHp = eustathiusHp;
    document.getElementById("monsterHp").innerHTML = `${monsterHp} / ${monster.maxHealth}`
    document.getElementById("eustathiusHp").innerHTML = `${eustathiusHp} / ${eustathiusMaxHp}`
    document.getElementById("monsterAction1").innerHTML = `${(monster.moves[0]["name"])}`
    monsterAction1.setAttribute("title", `Физический урон: ${(monster.moves[0]["physicalDmg"])}\nМагический урон: ${(monster.moves[0]["magicDmg"])}\nФизическая броня: ${(monster.moves[0]["physicArmorPercents"])}\nМагическая броня: ${(monster.moves[0]["magicArmorPercents"])}\nКулдаун: ${(monster.moves[0]["cooldown"])}`)
    document.getElementById("monsterAction2").innerHTML = `${(monster.moves[1]["name"])}`
    monsterAction2.setAttribute("title", `Физический урон: ${(monster.moves[1]["physicalDmg"])}\nМагический урон: ${(monster.moves[1]["magicDmg"])}\nФизическая броня: ${(monster.moves[1]["physicArmorPercents"])}\nМагическая броня: ${(monster.moves[1]["magicArmorPercents"])}\nКулдаун: ${(monster.moves[1]["cooldown"])}`)
    document.getElementById("monsterAction3").innerHTML = `${(monster.moves[2]["name"])}`
    monsterAction3.setAttribute("title", `Физический урон: ${(monster.moves[2]["physicalDmg"])}\nМагический урон: ${(monster.moves[2]["magicDmg"])}\nФизическая броня: ${(monster.moves[2]["physicArmorPercents"])}\nМагическая броня: ${(monster.moves[2]["magicArmorPercents"])}\nКулдаун: ${(monster.moves[2]["cooldown"])}`)
    document.getElementById("eustathiusAction1").innerHTML = `${(eustathius.moves[0]["name"])}`
    eustathiusAction1.setAttribute("title", `Физический урон: ${(eustathius.moves[0]["physicalDmg"])}\nМагический урон: ${(eustathius.moves[0]["magicDmg"])}\nФизическая броня: ${(eustathius.moves[0]["physicArmorPercents"])}\nМагическая броня: ${(eustathius.moves[0]["magicArmorPercents"])}\nКулдаун: ${(eustathius.moves[0]["cooldown"])}`)
    document.getElementById("eustathiusAction2").innerHTML = `${(eustathius.moves[1]["name"])}`
    eustathiusAction2.setAttribute("title", `Физический урон: ${(eustathius.moves[1]["physicalDmg"])}\nМагический урон: ${(eustathius.moves[1]["magicDmg"])}\nФизическая броня: ${(eustathius.moves[1]["physicArmorPercents"])}\nМагическая броня: ${(eustathius.moves[1]["magicArmorPercents"])}\nКулдаун: ${(eustathius.moves[1]["cooldown"])}`)
    document.getElementById("eustathiusAction3").innerHTML = `${(eustathius.moves[2]["name"])}`
    eustathiusAction3.setAttribute("title", `Физический урон: ${(eustathius.moves[2]["physicalDmg"])}\nМагический урон: ${(eustathius.moves[2]["magicDmg"])}\nФизическая броня: ${(eustathius.moves[2]["physicArmorPercents"])}\nМагическая броня: ${(eustathius.moves[2]["magicArmorPercents"])}\nКулдаун: ${(eustathius.moves[2]["cooldown"])}`)
    document.getElementById("eustathiusAction4").innerHTML = `${(eustathius.moves[3]["name"])}`
    eustathiusAction4.setAttribute("title", `Физический урон: ${(eustathius.moves[3]["physicalDmg"])}\nМагический урон: ${(eustathius.moves[3]["magicDmg"])}\nФизическая броня: ${(eustathius.moves[3]["physicArmorPercents"])}\nМагическая броня: ${(eustathius.moves[3]["magicArmorPercents"])}\nКулдаун: ${(eustathius.moves[3]["cooldown"])}`)
}

function setHP() {
    if (monsterHp > 0)
        document.getElementById("monsterHp").innerHTML = `${monsterHp} / ${monster.maxHealth} (${difMonHp})`
    else
        document.getElementById("monsterHp").innerHTML = `0 / ${monster.maxHealth} (${difMonHp})`
    if (eustathiusHp > 0)
        document.getElementById("eustathiusHp").innerHTML = `${eustathiusHp} / ${eustathiusMaxHp} (${difEusHp})`
    else
        document.getElementById("eustathiusHp").innerHTML = `0 / ${eustathiusMaxHp} (${difEusHp})`
    difEusHp = 0;
    difMonHp = 0;
}

//добавим ход монстру
function aiMove() {

    //переменная для зацикливания в поисках верного результата
    let i = 0;
    //рандомайзер, но в зависимости от кулдаунов 
    for (let j = 0; j <= 0; j--) {
        number = Math.floor(Math.random() * 3)
        j--;
        if (cooldown0Ai == 0 && number == 0) {
            j = 0;
            monsterAction = number;
            break;
        }
        if (cooldown1Ai == 0 && number == 1) {
            j = 0;
            monsterAction = number;
            break;
        }
        if (cooldown2Ai == 0 && number == 2) {
            j = 0;
            monsterAction = number;
            break;
        }
    }
    console.log(monsterAction)
    return monsterAction;
}

function infoBoard() {
    document.getElementById("info").innerHTML =
        `Вас атакует монстр!</br>
        Атака: ${(monster.moves[monsterAction]["name"])}</br>
        Физический урон: ${(monster.moves[monsterAction]["physicalDmg"])};
        Магический урон: ${(monster.moves[monsterAction]["magicDmg"])};
        Физическая броня: ${(monster.moves[monsterAction]["physicArmorPercents"])};
        Магическая броня: ${(monster.moves[monsterAction]["magicArmorPercents"])}`;
}

//сверяем нанесённый урон
function attack() {

    //высчитываем нанесенный урон для физической и магической брони для каждого персонажа
    //для Евстафия
    let physicalDmgByMonster = eustathius.moves[eustathiusAction]["physicArmorPercents"] - monster.moves[monsterAction]["physicalDmg"]
    let magicDmgByMonster = eustathius.moves[eustathiusAction]["magicArmorPercents"] - monster.moves[monsterAction]["magicDmg"]
    //для Лютого
    let physicDmgByEustathius = monster.moves[monsterAction]["physicArmorPercents"] - eustathius.moves[eustathiusAction]["physicalDmg"]
    let magicDmgByEustathius = monster.moves[monsterAction]["magicArmorPercents"] - eustathius.moves[eustathiusAction]["magicDmg"]
    //если удар пробивает броню, наносим урон в виде разницы брони и урона
    if (physicalDmgByMonster <= 0 && magicDmgByMonster <= 0)
        difEusHp = physicalDmgByMonster + magicDmgByMonster
    if (physicalDmgByMonster < 0) eustathiusHp += physicalDmgByMonster;
    if (magicDmgByMonster < 0) eustathiusHp += magicDmgByMonster;
    if (physicDmgByEustathius <= 0 && magicDmgByEustathius <= 0)
        difMonHp = physicDmgByEustathius + magicDmgByEustathius
    if (physicDmgByEustathius < 0) monsterHp += physicDmgByEustathius;
    if (magicDmgByEustathius < 0) monsterHp += magicDmgByEustathius;

}

function btns() {
    if (cooldown0 == 0) {
        document.getElementById("userBtn1").innerHTML = "Использовать";
    }
    if (cooldown1 == 0) {
        document.getElementById("userBtn2").innerHTML = "Использовать";
    }
    if (cooldown2 == 0) {
        document.getElementById("userBtn3").innerHTML = "Использовать";
    }
    if (cooldown3 == 0) {
        document.getElementById("userBtn4").innerHTML = "Использовать";
    }
}

function roundEnd() {
    //завершаем раунд или завершаем игру
    if (eustathiusHp <= 0 && monsterHp <= 0) {
        document.getElementById("info").innerHTML = `Вы оба пали в схватке!`;
        endGame = true;
    } else if (eustathiusHp <= 0) {
        document.getElementById("info").innerHTML = `Вы проиграли!\nЗдоровье монстра: ${monsterHp} HP`;
        endGame = true;
    } else if (monsterHp <= 0) {
        document.getElementById("info").innerHTML = `Славная победа!\nВаше здоровье: ${eustathiusHp} HP`;
        endGame = true;
    } else {
        document.getElementById("info").innerHTML = `Ваше здоровье: ${eustathiusHp} HP\nЗдоровье монстра: ${monsterHp} HP`;
    }
}

//после каждого хода проверяем или увеличиваем кулдауны
function cooldownCheck() {

    //если выбрано действие, запускаем его кулдаун
    if (eustathiusAction == 0) cooldown0 += (eustathius.moves[0]["cooldown"]);
    if (eustathiusAction == 1) cooldown1 += (eustathius.moves[1]["cooldown"]);
    if (eustathiusAction == 2) cooldown2 += (eustathius.moves[2]["cooldown"]);
    if (eustathiusAction == 3) cooldown3 += (eustathius.moves[3]["cooldown"]);
    if (monsterAction == 0) cooldown0Ai += (monster.moves[0]["cooldown"]) + 1;
    if (monsterAction == 1) cooldown1Ai += (monster.moves[1]["cooldown"]) + 1;
    if (monsterAction == 2) cooldown2Ai += (monster.moves[2]["cooldown"]) + 1;

    //если действует кулдаун, уменьшаем его действуеещее в данном ходу значение 
    if (cooldown0 != 0) {
        document.getElementById("userBtn1").innerHTML = `${cooldown0}`;
        cooldown0--;
    }
    if (cooldown1 != 0) {
        document.getElementById("userBtn2").innerHTML = `${cooldown1}`;
        cooldown1--;
    }
    if (cooldown2 != 0) {
        document.getElementById("userBtn3").innerHTML = `${cooldown2}`;
        cooldown2--;
    }
    if (cooldown3 != 0) {
        document.getElementById("userBtn4").innerHTML = `${cooldown3}`;
        cooldown3--;
    }
    if (cooldown0Ai != 0) {
        cooldown0Ai--;
        document.getElementById("aiBtn1").innerHTML = `${cooldown0Ai}`;
    }
    if (cooldown1Ai != 0) {
        cooldown1Ai--;
        document.getElementById("aiBtn2").innerHTML = `${cooldown1Ai}`;
    }
    if (cooldown2Ai != 0) {
        cooldown2Ai--;
        document.getElementById("aiBtn3").innerHTML = `${cooldown2Ai}`;
    }

}


function round() {
    attack();
    roundEnd();
    setHP();
    btns();
    if (endGame == false)
        setTimeout(() => {
            aiMove();
            infoBoard();
        }, 1000);
    cooldownCheck();
}

function move1() {
    if (cooldown0 == 0) {
        eustathiusAction = 0
        round();
    }
}
function move2() {
    if (cooldown1 == 0) {
        eustathiusAction = 1
        round();
    }
}
function move3() {
    if (cooldown2 == 0) {
        eustathiusAction = 2
        round();
    }
}
function move4() {
    if (cooldown3 == 0) {
        eustathiusAction = 3
        round();
    }
}

function game() {
    if (confirm("Хотите начать игру?")) {

        difficulty();
        if (confirm(`Отлично, уровень сложности выбран!\nТеперь у Вас ${eustathiusHp} HP\nМонстр ${monster.name} имеет ${monsterHp} HP\nНачать?!?`)) {

            info();
            aiMove();
            infoBoard();
        }
    }
}

//запускаем игру
game();