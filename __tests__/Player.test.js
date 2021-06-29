const Potion = require('../lib/Potion');

jest.mock('../lib/Potion');

const Player = require('../lib/Player');
const { test, expect } = require('@jest/globals');

test('create a player object with 3 number properties: health, strength, agility', () => {
    const player = new Player('Dave');

    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

test('get player stats as an object', () => {
    const player = new Player('Dave');

    expect(player.getStats()).toHaveProperty('potion');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

test ('get invotory from player or return false', () => {
    const player = new Player('Dave');
    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

test ('get player health value in string', () => {
    const player = new Player('Dave');
    expect(player.getHealth()).toEqual(
        expect.stringContaining(player.health.toString())
    );
});

test ('check if player is dead or alive', () => {
    const player = new Player ('Dave');
    expect(player.isAlive()).toBeTruthy();

    player.health = 0; // updating value of player's health halfway through the test to check for both conditions
    expect(player.isAlive()).toBeFalsy();
});

test ('check if player health is subtracting correctly', () => {
    const player = new Player('Dave');
    const oldHealth = player.health;

    player.reduceHealth(5);
    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(9999);
    expect(player.health).toBe(0);
});

test("get player's attack value", () => {
    const player = new Player('Dave');
    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

test("add a potion to the inventory", () => {
    const player = new Player('Dave');
    const oldCount = player.inventory.length;

    player.addPotion(new Potion());
    
    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

test("use a potion fron inventory", () => {
    const player = new Player('Dave');
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);

    expect(player.inventory.length).toBeLessThan(oldCount);
})