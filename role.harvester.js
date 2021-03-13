var roleUpgrader = require('role.upgrader');

var roleHarvester = {
  
    run: function(creep) {
        
	if (creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = false;
        }
        else if (!creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
            creep.memory.harvesting = true;
        }

        if (creep.memory.harvesting) {
            var str = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION
                             || s.structureType == STRUCTURE_TOWER)
                             && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });

            if (str) {
                if (creep.transfer(str, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(str, {visualizePathStyle: {stroke: '#84ff75'}});
                }
            } else{
                roleUpgrader.run(creep);
            }
        }
        else {
            var sr = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(sr) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sr, {visualizePathStyle: {stroke: '#eaff75'}});
            }
        }
    }
};

module.exports = roleHarvester;

