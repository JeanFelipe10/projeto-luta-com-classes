// Knight ou Sorcerer
// LittleMonster ou BigMonster
class Character {

    _life = 1;
    maxLife = 1;
    attack = 0;
    defende = 0;

    constructor(name) {
        this.name = name;
    }

    get life() { 
        return this._life; 
    }

    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character {
    constructor(name) {
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 0;
        this.maxLife = this.life;
    }
}

class Sorcerer extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxLife = this.life;
    }
}

class LittleMonster extends Character {
    constructor() {
        super("Little Monster");
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = this.life;
    }
}

class BigMonster extends Character {
    constructor() {
        super("Big Monster");
        this.life = 120;
        this.attack = 16;
        this.defense = 6;
        this.maxLife = this.life;
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1EL, fighter2EL, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1EL = fighter1EL;
        this.fighter2EL = fighter2EL;
        this.log = logObject;
}

   start() {
        this.update();
        
        this.fighter1EL.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2EL.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }


    update() {
        // fighter 1
        this.fighter1EL.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1EL.querySelector('.lifebar .bar').style.width = `${f1Pct}%`;


        // fighter 2
        this.fighter2EL.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2EL.querySelector('.lifebar .bar').style.width = `${f2Pct}%`;
    }

    doAttack(attacking, attacked) {
       if (attacking.life <= 0 || attacked.life <= 0) {
        this.log.addMessage('Atacando cachorro morto.');
        return;
       } 

       let attackFactor = (Math.random() * 2).toFixed(2);
       let defenseFactor = (Math.random() * 2).toFixed(2);

       let actualAttack = attacking.attack * attackFactor;
       let actualDefense = attacked.defense * defenseFactor;

       if (actualAttack > actualDefense) {
        attacked.life -= actualAttack;
        this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`)
       } else {
        this.log.addMessage(`${attacked.name} conseguiu defender...`);
       }

        this.update();
    }
}
    
class Log {
    list = [];
    
    constructor(listEL) {
        this.listEL = listEL;
    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }

    render() {
        this.listEL.innerHTML = '';

        for(let i in this.list) {
            this.listEL.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}