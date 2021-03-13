var roleBuilder = require('role.builder');

var roleTManager = {
    run: function(creep){
        
        if (creep.memory.charging && creep.store[RESOURCE_ENERGY] == 0) { 
            creep.memory.charging = false;
            creep.say('⛏');
        }
        if(!creep.memory.charging && creep.store.getFreeCapacity() == 0) {
            creep.memory.charging = true;
            creep.say('⚡');
        }
        
        if(creep.memory.charging){
            var tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_TOWER)
                && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
            
            if(tower){
                if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(tower, {visualizePathStyle: {stroke: 'f3ff00', lineStyle: 'dotted'}})
                }
            }else{
                roleBuilder.run(creep);
            }
            
        }else if(!creep.memory.charging){
            var sr = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(sr) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sr, {visualizePathStyle: {stroke: '#f1ffa3', lineStyle: 'dotted'}});
            }
        }
    }
};
module.exports = roleTManager;
