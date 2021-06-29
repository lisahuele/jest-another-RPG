const Potion = require('../lib/Potion');

function Enemy (name, weapon) {
    this.name = name;
    this.weapon = weapon;
    this.potion = new Potion();

    //3 properties: health, agility, and strength with random values
    this.health = Math.floor(Math.random() * 10 + 85); //health value is between 85 and 95
    this.agility = Math.floor(Math.random() * 5 + 5); // agility value is between 5 and 10
    this.strength = Math.floor(Math.random() * 5 + 5); //strength value is between 5 and 10

    Enemy.prototype.getHealth = function() {
        return `The ${this.name}'s health is now ${this.health}!`;
    };
      
    Enemy.prototype.isAlive = function() {
        if (this.health === 0) {
          return false;
        }
        return true;
    };
      
    Enemy.prototype.getAttackValue = function() {
        const min = this.strength - 5;
        const max = this.strength + 5;
      
        return Math.floor(Math.random() * (max - min) + min);
    };
      
    Enemy.prototype.reduceHealth = function(health) {
        this.health -= health;
      
        if (this.health < 0) {
          this.health = 0;
        }
    };

    Enemy.prototype.getEnemyDescription = function() {
        return `A ${this.name} holding a ${this.weapon} has appeared!`;
    }
    

};

module.exports = Enemy;