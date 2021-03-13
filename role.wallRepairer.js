var roleBuilder = require('role.builder');

var roleWallRepairer = {
  
    run: function(creep) {
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        else if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
        }

        if (creep.memory.working) {
            var walls = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_WALL
            });

            var target = undefined;

            for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
                for (let wall of walls) {
                    if (wall.hits / wall.hitsMax < percentage) {
                        target = wall;
                        break;
                    }
                }

                if (target != undefined) {
                    break;
                }
            }

            if (target != undefined) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            else {
                roleBuilder.run(creep);
            }
        }
        else {
            var src = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(creep.harvest(src) == ERR_NOT_IN_RANGE) {
                creep.moveTo(src, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};
module.exports = roleWallRepairer;
