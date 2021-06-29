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
}

module.exports = Game;