import {CREEP_CONFIGS, CREEP_ROLES} from '../creeps/creeps.const';
import {CreepStateSupervisor} from '../creeps/state-supervisor';

export class RoomStats {

    private readonly _baseTextStyle: TextStyle = {
        align: 'left',
        color: '#000',
        backgroundColor: 'rgba(255,255,255,0.5)'
    };

    constructor(
        private _room: Room
    ) {
        this._getCreepRoleStats();
        this._getEnergyStats();
    }

    private _getEnergyStats() {
        const availableCreepEnergy = this._room.energyAvailable;
        const availableCreepEnergyLimit = this._room.energyCapacityAvailable;
        const text = `${availableCreepEnergy}/${availableCreepEnergyLimit} - ENERGY AVAILABLE`;
        const y = 8;
        const x = 2;

        new RoomVisual(this._room.name).text(text, x, y, this._baseTextStyle);
    }

    private _getCreepRoleStats() {
        const stateSupervisor = new CreepStateSupervisor();
        const x = 2;
        let y = 0;

        CREEP_ROLES.forEach(role => {
            const text = `${stateSupervisor.getRoleCount(role)}/${CREEP_CONFIGS[role].limit} - ${role}`;

            new RoomVisual(this._room.name).text(text, x, y, this._baseTextStyle);
            y += 1.5;
        });
    }
}
