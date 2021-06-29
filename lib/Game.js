const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

function Game() {
    this.roundNumber = 0;
    this.isPlayerturn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;

    Game.prototype.initializeGame = function() {
        this.enemies.push(new Enemy('goblin', 'sword'));
        this.enemies.push(new Enemy('orc', 'baseball bat'));
        this.enemies.push(new Enemy('skeleton', 'axe'));
        this.currentEnemy = this.enemies[0]; //when the game starts, this would be the first object in the array

        inquirer.prompt({
            type: 'text',
            name: 'name',
            message: 'What is your name?'
        })
        //destructre name from prompt object
        .then(({name}) => {
            this.player = new Player(name);
            this.startNewBattle();
        });
    };
    //startNewBattle() will start a battle and called again anytime a new round starts.
    //want method to do:
    //Establish who will take their turn first based on their agility value
    //Display the player object's stats
    //display the description of the current enemy
    Game.prototype.startNewBattle = function() {
        if(this.player.agility > this.currentEnemy.agility) {
            this.isPlayerturn = true;
        } else {
            this.isPlayerturn = false;
        };

        //display player's stats with getStats() method
        console.log("your stats are as followed");
        console.table(this.player.getStats());

        //display enemy description with getEnemyDescription() method
        console.log(this.currentEnemy.getEnemyDescription());

        this.battle();
    };

    //if player turn
        // prompt user to attack or use a Potion
        //if using Potion: apply selected Potion effect to Player
        //if attacking: subtract health from Enemy based on Player attack value (getAttackValue())

        //if enemy turn:
        //subtract health from Player based on Enemy attack value (getAttackValue())
    Game.prototype.battle = function() {
        if(this.isPlayerturn) {
            inquirer.prompt({
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Attack', 'Use Potion'],
            })
            .then(({action}) => {
                if (action === 'Use Potion') {
                    if(!this.player.getInventory()) {
                        console.log("You don't have any Potions!");
                        //After Player attempted to use a Potion but has an empty inventory
                        return this.checkEndOfBattle();

                    } else {
                        inquirer.prompt({
                            type: 'list',
                            name: 'action',
                            message: 'Which potion would you like to use?',
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`),
                        })
                        .then(({action}) => {
                            const potionDetails = action.split(": ");
                            this.player.usePotion(potionDetails);
                            console.log(`You have used a ${potionDetails[1]} potion.`);
                            //After Player uses a Potion
                            this.checkEndOfBattle();
                        });
                    }
                } else {
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked ${this.currentEnemy.name}!`);
                    console.log(this.currentEnemy.getHealth());

                    //After Player attacks Enemy
                    this.checkEndOfBattle();
                }
            })

        } else {
            const damage = this.currentEnemy.getAttackValue();
            this.player.reduceHealth(damage);

            console.log(`You were attacked by ${this.currentEnemy.name}`);
            console.log(this.player.getHealth());
            
            //after Enemy attacks Player
            this.checkEndOfBattle();
        };
    };
    //checkEndOfBattle() method needs to run immediately after the Player/Enemy has taken their turn.
    //turn can end a few ways:
    // the player uses a Potion
    // the player attemps to use a Potion but has an empty inventory
    //the Player attacks Enemy
    // the Enemy attacks the Player

    //checkEndOfBattle() logic should first verify if both characters are live and can continue fighting
    //if so, switch turn order and run battle() again
    Game.prototype.checkEndOfBattle = function() {
        if(this.player.isAlive() && this.currentEnemy.isAlive()) {
            this.isPlayerturn = !this.isPlayerturn;
            this.battle();
        } 
        //if Player is alive but Enemy has been defeated.
        //Player will be awarded a Potion and roundNumber has been increased
        //If there are no more enemies to fight, Player has won. Otherwise, a new battle will start
        else if(this.player.isAlive() && !this.currentEnemy.isAlive()) {
            console.log(`You have defeated the ${this.currentEnemy.name}!`);

            this.player.addPotion(this.currentEnemy.potion);
            console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion!`);

            this.roundNumber++; //++ increment by 1

            if(this.roundNumber < this.enemies.length) {
                this.currentEnemy = this.enemies[this.roundNumber];
                this.startNewBattle();
            } else {
                console.log("You win!");
            };
        }
        //if Player has been defeated, end game
        else {
            console.log("You have been defeated!");
        }
    };
}

module.exports = Game;