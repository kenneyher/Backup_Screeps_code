require('prototype.tower');
require('prototype.extraSpawn');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleAttacker = require('role.attacker');
var roleWallRepairer = require('role.wallRepairer');
var roleTManager = require('role.towerManager');
var roleClaimer = require('role.claimer');
var roleExteriorBuilder = require('role.exteriorBuilder');
var roleMiner = require('role.miner');
var roleLorry = require('role.lorry');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    var creepsInMainRoom = Game.spawns['Wigans'].room.find(FIND_MY_CREEPS);
    
    var harvesters = _.filter(creepsInMainRoom, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(creepsInMainRoom, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(creepsInMainRoom, (creep) => creep.memory.role == 'builder');
    var wallRepairers = _.filter(creepsInMainRoom, (creep) => creep.memory.role == 'wallRepairer');
    var repairers = _.filter(creepsInMainRoom, (creep) => creep.memory.role == 'repairer');
    var towerManagers = _.filter(creepsInMainRoom, (creep) => creep.memory.role == 'towerManager');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var eBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'eBuilder');
    var attackers = _.filter(creepsInMainRoom, (creep) => creep.memory.role == 'attacker');
    var miners = _.filter(creepsInMainRoom, (creep) => creep.memory.role == 'miner');
    var lorries = _.filter(creepsInMainRoom, (creep) => creep.memory.role == 'lorry');

    var names = ['Anacleta', 'Pablito', 'Camilo', 'Adam', 'Frozono', 'Ultra T', 'Gambito', 'Penaldo', 'El Messias', 'MarAnthony', 'Derulo', 'Lollipop', 'Minimi',
    'Lobezno', 'Brayant', 'Kenneth', 'Alex', 'Cris', 'Sinforosia', 'Banana', 'Apple', 'Cafe', 'Feedback', 'Alan Brito', 'Carnaval', 'LittleMe', 'Agateyte',
    'Chorotega', 'Colon', 'Batman', 'Cordoba', 'Cesarus', 'Antonius', 'Juanito', 'Fulanito', 'Sutano', 'SuperCreep', 'BatCreep', 'Bobby'];
    
    let sources = Game.spawns.Wigans.room.find(FIND_SOURCES);
    for(let src of sources){
        if(!_.some(creepsInMainRoom, x => x.memory.role == 'miner' && x.memory.sourceId == src.id)){
            let containers = src.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });
            if(containers.length > 0 && miners.length < 1){
                var newName = names[Math.round(Math.random() * names.length)];
                var spwCreepRole = 'miner';
                var spw = Game.spawns['Wigans'].spawnCreep([WORK, WORK, WORK, MOVE], newName, 
                {memory: {role: 'miner', sourceId: src.id }});
                break;
            }
        }
    }
    
    if(harvesters.length < 2) {
        var newName = names[Math.round(Math.random() * names.length)] ;
        var spwCreepRole = 'harvester';
        if(harvesters.length < 2){
            var spw = Game.spawns['Wigans'].spawnCreep([WORK, CARRY, MOVE], newName, 
            {memory: {role: 'harvester'}});
        }else {
            var spw = Game.spawns['Wigans'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE], newName, 
            {memory: {role: 'harvester'}});
        }
    }
    else if(lorries.length < 1 && miners.length > 0){
        var newName = names[Math.round(Math.random() * names.length)];
        var spwCreepRole = 'lorry';
        var spw = Game.spawns['Wigans'].spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], newName, 
            {memory: {role: 'lorry'}});
    }
    else if(towerManagers.length < 2) {
        var newName = names[Math.round(Math.random() * names.length)];
        var spwCreepRole = 'towerManager';
        var spw = Game.spawns['Wigans'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE], newName, 
        {memory: {role: 'towerManager'}});
    }
    else if(upgraders.length < 2) {
        var newName = names[Math.round(Math.random() * names.length)];
        var spwCreepRole = 'upgrader';
        var spw = Game.spawns['Wigans'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], newName, 
        {memory: {role: 'upgrader'}});
    }
    else if(builders.length < 3) {
        var newName = names[Math.round(Math.random() * names.length)];
        var spwCreepRole = 'builder';
        var spw = Game.spawns['Wigans'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], newName, 
        {memory: {role: 'builder'}});
    }
    else if(wallRepairers.length < 2) {
        var newName = names[Math.round(Math.random() * names.length)];
        var spwCreepRole = 'WallRepairer';
        var spw = Game.spawns['Wigans'].spawnCreep([WORK, WORK, CARRY, CARRY,  MOVE], newName, 
        {memory: {role: 'wallRepairer'}});
    }
    else if(repairers.length < 2) {
        var newName = names[Math.round(Math.random() * names.length)];
        var spwCreepRole = 'repairer';
        var spw = Game.spawns['Wigans'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], newName, 
            {memory: {role: 'repairer'}});
    }
    // else if(attackers.length < 0){
    //     var newName = names[Math.round(Math.random() * names.length)];
    //     var spwCreepRole = 'attacker';
    //     var spw = Game.spawns['Wigans'].spawnCreep([ATTACK, MOVE], newName, 
    //         {memory: {role: 'attacker', target: 'W22S13'}});
    // }    
 
    else if(eBuilders.length < 2) {
        var newName = names[Math.round(Math.random() * 32)];
        var spwCreepRole = 'eBuilder';
        var spw = Game.spawns['Wigans'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], newName, 
            {memory: {role: 'eBuilder', target: 'W22S12'}});
    }
    // else if(claimers.length < 1){
    //     var newName = names[Math.round(Math.random() * 32)];
    //     var spwCreepRole = 'claimer';
    //     var spw = Game.spawns['Wigans'].spawnCreep([CLAIM, MOVE], newName, 
    //         {memory: {role: 'claimer', target: 'W21S13'}});
    // }
    else if(eBuilders.length < 2){
        var newName = names[Math.round(Math.random() * 32)];
        var spwCreepRole = 'eBuilder';
        var spw = Game.spawns['Wigans'].spawnCreep([CARRY, MOVE, MOVE, MOVE, MOVE, WORK], newName, 
            {memory: {role: 'eBuilder', target: 'W21S13'}});
    }
    

    if(spw == OK){
        console.log('Spawning a new creep: ' + newName + ', with role: ' + spwCreepRole);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'wallRepairer') {
            roleWallRepairer.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'towerManager') {
            roleTManager.run(creep);
        }
        if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        if(creep.memory.role == 'eBuilder') {
            roleExteriorBuilder.run(creep);
        }
        if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        if(creep.memory.role == 'lorry') {
            roleLorry.run(creep);
        }
    }
    
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for each tower
    for (let tower of towers) {
        // run tower logic
        tower.defend();
    }
    
    if(Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
    }
}
