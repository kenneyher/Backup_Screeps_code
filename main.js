var myTowers = require('prototype.tower');
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
var roleEUpgrader = require('role.eUpgrader');
var roleExtractor = require('role.extractor');

module.exports.loop = function () {
    

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    for(let spawnName in Game.spawns){
        let spawn = Game.spawns[spawnName];
        let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
        myTowers.play();
        
        if (spawn.memory.room == 'W22S12'){
            var bodyparts = [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
        } else {
            var bodyparts = [WORK, CARRY, MOVE];
        };
    
        var harvesters = _.filter(creepsInRoom, (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(creepsInRoom, (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(creepsInRoom, (creep) => creep.memory.role == 'builder');
        var wallRepairers = _.filter(creepsInRoom, (creep) => creep.memory.role == 'wallRepairer');
        var repairers = _.filter(creepsInRoom, (creep) => creep.memory.role == 'repairer');
        var towerManagers = _.filter(creepsInRoom, (creep) => creep.memory.role == 'towerManager');
        var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
        var eBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'eBuilder');
        var eUpgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'eUpgrader');
        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
        var miners = _.filter(creepsInRoom, (creep) => creep.memory.role == 'miner');
        var lorries = _.filter(creepsInRoom, (creep) => creep.memory.role == 'lorry');
        var extractors = _.filter(creepsInRoom, (creep) => creep.memory.role == 'extractor');

        var names = ['Anacleta', 'Pablito', 'Camilo', 'Adam', 'Frozono', 'Ultra T', 'Gambito', 'Penaldo', 'El Messias', 'MarAnthony', 'Derulo', 'Lollipop', 'Minimi',
        'Lobezno', 'Brayant', 'Kenneth', 'Alex', 'Cris', 'Sinforosia', 'Banana', 'Apple', 'Cafe', 'Feedback', 'Alan Brito', 'Carnaval', 'LittleMe', 'Agateyte',
        'Chorotega', 'Colon', 'Batman', 'Cordoba', 'Cesarus', 'Antonius', 'Juanito', 'Fulanito', 'Sutano', 'SuperCreep', 'BatCreep', 'Bobby', 'AtrapaSueños',
        'DreamCatcher', 'LunaLunera', 'SweetDreams', 'Dulcesuenos', 'Okar', 'Hattori', 'Codecombat', 'Impostor', 'Anonimous', 'Noob', 'Saibot'];
    
        let sources = spawn.room.find(FIND_SOURCES);
        for(let src of sources){
            if(!_.some(creepsInRoom, x => x.memory.role == 'miner' && x.memory.sourceId == src.id)){
                let containers = src.pos.findInRange(FIND_STRUCTURES, 1, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                });
                if(containers.length > 0 && miners.length < 1){
                    if(spawnName == 'Wigans'){
                        var newName = names[Math.round(Math.random() * names.length)];
                        var spwCreepRole = 'miner';
                        var spw = spawn.spawnCreep([WORK, WORK, WORK, MOVE], newName, 
                            {memory: {role: 'miner', sourceId: src.id }});
                        break;
                    }
                }
            }
        }
    
        if(harvesters.length < spawn.memory.minHarvesters) {
            var newName = names[Math.round(Math.random() * names.length)] ;
            var spwCreepRole = 'harvester';
            if(harvesters.length < 1){
                var spw = spawn.spawnCreep([WORK, CARRY, MOVE], newName, 
                {memory: {role: 'harvester'}});
            }else {
                var spw = spawn.spawnCreep(bodyparts, newName, 
                {memory: {role: 'harvester'}});
            }
        }
    // else if(extractors.length < 1) {
    //     var newName = names[Math.round(Math.random() * names.length)];
    //     var spwCreepRole = 'extractor';
    //     var spw = Game.spawns['Wigans'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE], newName, 
    //     {memory: {role: 'extractor'}});
    // }
        else if(upgraders.length < spawn.memory.minUpgraders) {
            var newName = names[Math.round(Math.random() * names.length)] ;
            var spwCreepRole = 'upgrader';
            var spw = spawn.spawnCreep(bodyparts, newName, 
                {memory: {role: spwCreepRole}});
        }
        else if(lorries.length < 1 && spawnName == 'Wigans') {
            if(spawnName == 'Wigans'){
                var newName = names[Math.round(Math.random() * names.length)] ;
                var spwCreepRole = 'lorry';
                var spw = spawn.spawnCreep([CARRY, CARRY, CARRY, CARRY, CARRY, MOVE], newName, 
                {memory: {role: spwCreepRole}});
            }
        }
        else if(builders.length < spawn.memory.minBuilders) {
            var newName = names[Math.round(Math.random() * names.length)] ;
            var spwCreepRole = 'builder';
            var spw = spawn.spawnCreep(bodyparts, newName, 
                {memory: {role: spwCreepRole}});
        }
        // else if(eUpgraders.length < 2) {
        //     var newName = names[Math.round(Math.random() * names.length)];
        //     var spwCreepRole = 'eUpgrader';
        //     var spw = Game.spawns['Wigans'].spawnCreep(bodyparts, newName, 
        //     {memory: {role: 'eUpgrader', target: 'W21S13', working: false}});
        // }
        // else if(eBuilders.length < 4) {
        //     var newName = names[Math.round(Math.random() * names.length)];
        //     var spwCreepRole = 'eBuilder';
        //     var spw = Game.spawns['Wigans'].spawnCreep(bodyparts, newName, 
        //     {memory: {role: spwCreepRole, target: 'W21S13'}});
        // }
        else if(towerManagers.length < spawn.memory.minTowerManagers) {
            var newName = names[Math.round(Math.random() * names.length)] ;
            var spwCreepRole = 'towerManager';
            var spw = spawn.spawnCreep(bodyparts, newName, 
                {memory: {role: spwCreepRole}});
        }
        else if(wallRepairers.length < spawn.memory.minWallRepairers) {
            var newName = names[Math.round(Math.random() * names.length)] ;
            var spwCreepRole = 'wallRepairer';
            var spw = spawn.spawnCreep(bodyparts, newName, 
                {memory: {role: spwCreepRole}});
        }
        else if(repairers.length < spawn.memory.minRepairers) {
            var newName = names[Math.round(Math.random() * names.length)] ;
            var spwCreepRole = 'repairer';
            var spw = spawn.spawnCreep(bodyparts, newName, 
                {memory: {role: spwCreepRole}});
        }
    
        if(spw == OK){
            console.log('' +spawnName + ' is spawning a new creep: ' + newName + ', with role: ' + spwCreepRole);
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
            if(creep.memory.role == 'eUpgrader'){
                roleEUpgrader.run(creep);
            }
            if(creep.memory.role == 'extractor'){
                roleExtractor.run(creep);
            }
        }
    }
    
    
    if(Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
    }
}
