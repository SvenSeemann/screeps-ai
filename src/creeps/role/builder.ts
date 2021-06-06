import {StructureUtil} from '../../structures/util';
import {CreepImpl} from './creep-impl';
import {CreepUtils} from './util';

export class Builder extends CreepImpl {

    constructor(creep: Creep) {
        super(creep);
    }

    run(): void {
        if(
            (
                this._getCreepMemory().building ||
                this._getCreepMemory().repairing
            ) &&
            this._creep.store[RESOURCE_ENERGY] == 0
        ) {
            this._getCreepMemory().building = false;
            this._getCreepMemory().repairing = false;
            this._creep.say('🔄 supply');
        }

        if(
            (
                !this._getCreepMemory().building &&
                !this._getCreepMemory().repairing
            ) &&
            this._creep.store.getFreeCapacity() == 0
        ) {
            const constructionTarget = this.getBuildTarget();
            const repairTarget = this.getRepairTarget();


            if(!!constructionTarget) {
                this._getCreepMemory().building = true;
                this._getCreepMemory().repairing = false;
                this._creep.say('🚧 build');
            } else if(!!repairTarget) {
                this._getCreepMemory().repairing = true;
                this._getCreepMemory().building = false;
                this._creep.say('🚧 repair');
            }
        }

        if(this._getCreepMemory().building) {
            this.build();
        } else if(this._getCreepMemory().repairing) {
            this.repair();
        } else {
            CreepUtils.getEnergy(this._creep);
        }
    }

    public getBuildTarget() {
        return this._creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    }

    public build() {
        const target = this.getBuildTarget();

        if(target) {
            if(this._creep.build(target) == ERR_NOT_IN_RANGE) {
                this._creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }

    public getRepairTarget() {
        //TODO: sort repair targets by prio
        return StructureUtil.getClosestDamagedStructure(this._creep.pos);
    }

    public repair() {
        const closestDamagedStructure = this.getRepairTarget();

        if(closestDamagedStructure) {
            if(this._creep.repair(closestDamagedStructure) == ERR_NOT_IN_RANGE) {
                this._creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
}
