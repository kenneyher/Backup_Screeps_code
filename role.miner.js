var roleMiner = {
    run: function (creep) {
        let src = Game.getObjectById(creep.memory.sourceId);
        let container = src.pos.findInRange(FIND_STRUCTURES, 1, {
            filter: s => s.structureType == STRUCTURE_CONTAINER
        })[0];

        if (creep.pos.isEqualTo(container.pos)) {
            creep.harvest(src);
        } else {
            creep.moveTo(container);
        }
    }
};
module.exports = roleMiner;
