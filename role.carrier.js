//Note: This is still in progress, it should pickup all the dropped resources and also the resources that are in tombstones

var roleCarrier = {
    
    run: function(creep){
        if(creep.memory.carrying && creep.store.getCapacity == _.sum(creep.store)){
            creep.memory.carrying = true;
            creep.say('🎒');
        }
        else if(!creep.memory.carrying && 0 == _.sum(creep.store)){
            creep.memory.carrying = false;
            creep.say('🔍');
        }
        
        if(creep.memory.carrying){
            var storage = creep.room.storage;
            creep.moveTo(storage);
            for(const resourceType in creep.store){
                creep.transfer(storage, resourceType);
            }
        }else{
            var droppedResource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            var e = creep.pickup(droppedResource);
            if(e == ERR_NOT_IN_RANGE){
                creep.moveTo(droppedResource);
            }
        }
    }
};
module.exports = roleCarrier;
