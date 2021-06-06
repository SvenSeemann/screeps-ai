import {CreepImpl} from './creep-impl';
import {CreepUtils} from './util';

export class Transporter extends CreepImpl {

    constructor(creep: Creep) {
        super(creep);
    }

    run(): void {
        if(this._creep.store.getFreeCapacity() > 0) {
            CreepUtils.pickUpDroppedResources(this._creep);
        }
        else {
            this.deliverResources();
        }
    }

    public getDeliveryTarget() {
        const deliveryTargets: StructureConstant[] = [
            STRUCTURE_SPAWN,
            STRUCTURE_EXTENSION,
            STRUCTURE_TOWER,
            STRUCTURE_CONTAINER
        ];
        const possibleTargets = this._creep.room.find(FIND_STRUCTURES, {
            filter: (structure: StructureStorage) => {
                return deliveryTargets.indexOf(structure.structureType) > -1 &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });

        let highestPriorityTarget = null;
        for (let deliveryTarget of deliveryTargets) {
            const result = possibleTargets
                .find(possibleTarget => possibleTarget.structureType == deliveryTarget);

            if (result) {
                highestPriorityTarget = result;
            }

            if (highestPriorityTarget) {
                break;
            }
        };

        return highestPriorityTarget;
    }

    public deliverResources() {
        const target = this.getDeliveryTarget();
        if(target) {
            if(this._creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this._creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
}
