const Potion = require('../lib/Potion');

function Player (name = '') {
    this.name = name;
    
    //3 properties: health, agility, and strength with random values
    this.health = Math.floor(Math.random() * 10 + 95); //health value is between 95 and 105
    this.agility = Math.floor(Math.random() * 5 + 7); // agility value is between 7 and 13
    this.strength = Math.floor(Math.random() * 5 + 7); //strength value is between 7 and 13
    
    this.inventory = [new Potion('health'), new Potion()];

    //return an object with various player properties
    Player.prototype.getStats = function() {
        return {
            potion: this.inventory.length,
            health: this.health,
            agility: this.agility,
            strength: this.strength,
        };
    };

    //return the inventory array or false if empty
    Player.prototype.getInventory = function() {
        if(this.inventory.length) {
            return this.inventory;
        } else {
            return false;
        };
    };

    //get player health
    Player.prototype.getHealth = function() {
        return `${this.name}'s health is now ${this.health}!`;
    };

    //check if player is alive/dead
    Player.prototype.isAlive = function() {
        if(this.health === 0) {
            return false;
        } else {
            return true;
        };
    };

    //reduce player's health
    Player.prototype.reduceHealth = function(health) {
        this.health -= health;
        if(this.health < 0) {
            this.health = 0;
        };
    };

    //get player's attack value
    Player.prototype.getAttackValue = function() {
        const min = this.strength - 5;
        const max = this.strength + 5;

        return Math.floor(Math.random() * (max - min) + min);
    };

    //add potion to inventory
    Player.prototype.addPotion = function(potion) {
        this.inventory.push(potion);
    };

    //use potion from inventory
    Player.prototype.usePotion = function(index) {
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