class Character {
    constructor(name = '') {
        this.name = name;
    
        //3 properties: health, agility, and strength with random values
        this.health = Math.floor(Math.random() * 10 + 95); //health value is between 95 and 105
        this.agility = Math.floor(Math.random() * 5 + 7); // agility value is between 7 and 13
        this.strength = Math.floor(Math.random() * 5 + 7); //strength value is between 7 and 13
    }

    //get player/enemy's health
    getHealth() {
        return `${this.name}'s health is now ${this.health}!`;
    };

    //check if player/enemy's is alive/dead
    isAlive() {
        if(this.health === 0) {
            return false;
        } else {
            return true;
        };
    };

    //reduce player/enemy's health
    reduceHealth(health) {
        this.health -= health;
        if(this.health < 0) {
            this.health = 0;
        };
    };

    //get player/enemy's attack value
    getAttackValue() {
        const min = this.strength - 5;
        const max = this.strength + 5;

        return Math.floor(Math.random() * (max - min) + min);
    };
}

module.exports = Character;
