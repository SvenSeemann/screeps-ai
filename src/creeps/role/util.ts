export class CreepUtils {

    public static pickUpDroppedResources(creep: Creep) {
        const nearestResource = CreepUtils.getNearestDroppedEnergy(creep);

        CreepUtils.pickUpEnergy(creep, nearestResource as any);
    }

    public static getEnergy(creep: Creep) {
        const nearestResource = CreepUtils.getNearestAvailableEnergy(creep);

        if (!!nearestResource) {
            if ((nearestResource as Structure).structureType === 'container') {
                CreepUtils.withdrawEnergy(creep, nearestResource as Structure<STRUCTURE_STORAGE>);
            } else {
                CreepUtils.pickUpEnergy(creep, nearestResource as Resource<RESOURCE_ENERGY>);
            }
        }
    }

    public static getWeight(creep: Creep): number {
        let usedCarryParts = !!creep.store && creep.store.energy ?
            Math.ceil(creep.store.energy / 50) :
            0;
        let weight = 0;

        creep.body.forEach(part => {
            switch (part.type) {
                case 'work':
                case 'attack':
                case 'ranged_attack':
                case 'heal':
                case 'tough':
                case 'claim':
                    weight += 1;
                    break;
                case 'carry':
                    if (usedCarryParts > 0) {
                        weight += 1;
                        usedCarryParts--;
                    }
            }
        });

        return weight;
    }

    public static getNearestDroppedEnergy(creep: Creep) {
        const sources = creep.room.find(FIND_DROPPED_RESOURCES);

        return creep.pos.findClosestByPath(sources);
    }

    public static getNearestContainer(creep: Creep) {
        const containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_CONTAINER &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        return creep.pos.findClosestByPath(containers);
    }

    public static getNearestAvailableEnergy(creep: Creep): Resource<RESOURCE_ENERGY> | Structure<STRUCTURE_STORAGE> {
        const nearestDroppedEnergy = CreepUtils.getNearestDroppedEnergy(creep);
        const nearestContainer = CreepUtils.getNearestContainer(creep);
        const targets = [];

        if(!!nearestDroppedEnergy) {
            targets.push(nearestDroppedEnergy);
        }

        if(!!nearestContainer) {
            targets.push(nearestContainer);
        }

        return creep.pos.findClosestByPath(targets) as Resource<RESOURCE_ENERGY> | Structure<STRUCTURE_STORAGE>;
    }

    public static pickUpEnergy(creep: Creep, target: Resource<RESOURCE_ENERGY>) {
        if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }

    public static withdrawEnergy(creep: Creep, target: Structure<STRUCTURE_STORAGE>) {
        if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
}
