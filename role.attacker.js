var roleAttacker = {
    run: function(creep) {
        if (creep.room.name != creep.memory.target) {
            var exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#FF3535'}});
        }
        else {
            var a = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
            if (a !== undefined) {
                creep.attack(a);
            } else {
                if(creep.room.controller) {
                    if(creep.signController(creep.room.controller, "I'm going to claim this room in a few days. I warned ya!") == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }
            }
        }
    }
};
module.exports = roleAttacker;
