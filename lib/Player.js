const Potion = require('./Potion');
const Character = require('./Character');

class Player extends Character {
    constructor(name = '') {
        //call parent constructor
        super(name);

        this.inventory = [new Potion('health'), new Potion()];
    };

    //return an object with various player properties
    getStats() {
        return {
            potion: this.inventory.length,
            health: this.health,
            agility: this.agility,
            strength: this.strength,
        };
    };

    //return the inventory array or false if empty
    getInventory() {
        if(this.inventory.length) {
            return this.inventory;
        } else {
            return false;
        };
    };

    //add potion to inventory
    addPotion(potion) {
        this.inventory.push(potion);
    };

    //use potion from inventory
    usePotion(index) {
        const potion = this.getInventory().splice(index, 1)[0];

        switch(potion.name) {
            case 'agility':
                this.agility += potion.value;
                break;

            case 'health':
                this.health += potion.value;
                break;
            
            case 'agility':
                this.agility += potion.value;
                break;
        };
    };
}

module.exports = Player;