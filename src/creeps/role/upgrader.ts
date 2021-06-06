import {CreepImpl} from './creep-impl';
import {CreepUtils} from './util';

export class Upgrader extends CreepImpl {

    constructor(creep: Creep) {
        super(creep);
    }

    run(): void {
        if(this._getCreepMemory().upgrading && this._creep.store[RESOURCE_ENERGY] == 0) {
            this._getCreepMemory().upgrading = false;
            this._creep.say('🔄 harvest');
        }
        if(!this._getCreepMemory().upgrading && this._creep.store.getFreeCapacity() == 0) {
            this._getCreepMemory().upgrading = true;
            this._creep.say('⚡ upgrade');
        }

        if(this._getCreepMemory().upgrading) {
            if(this._creep.upgradeController(this._creep.room.controller as any) == ERR_NOT_IN_RANGE) {
                this._creep.moveTo(this._creep.room.controller as any, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            CreepUtils.getEnergy(this._creep);
        }
    }
}
