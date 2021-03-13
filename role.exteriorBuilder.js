var roleHarvester = require('role.harvester');

var roleExteriorBuilder = {
    
    run: function(creep){
        
        if(creep.memory.target && creep.room.name != creep.memory.target){
            var exit = creep.room.findExitTo(creep.memory.target);
            // move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#75ff83'}});
        }
        else if(creep.memory.target && creep.room.name == creep.memory.target){
            
            if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.building = false;
                creep.say('🔄 harvest');
	        }
	        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	            creep.memory.building = true;
	            creep.say('🚧 build');
	        }

	        if(creep.memory.building) {
	            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(targets.length) {
                    if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }else{
                    roleHarvester.run(creep);
                }
	        }
	        else {
	            var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
	        }
        }
    }
};
module.exports = roleExteriorBuilder;
