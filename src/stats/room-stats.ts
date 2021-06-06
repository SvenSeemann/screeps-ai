import {CREEP_CONFIGS, CREEP_ROLES} from '../creeps/creeps.const';
import {CreepStateSupervisor} from '../creeps/state-supervisor';

export class RoomStats {

    constructor(
        private _room: Room
    ) {
        this._getCreepRoleStats();
    }

    private _getEnergyStats() {
        const spawnEnergy = 0;
        const storedEnergy = 0;
    }

    private _getCreepRoleStats() {
        const stateSupervisor = new CreepStateSupervisor();
        const x = 2;
        let y = 0;

        CREEP_ROLES.forEach(role => {
            const text = `${stateSupervisor.getRoleCount(role)}/${CREEP_CONFIGS[role].limit} - ${role}`;
            const textStyle: TextStyle = {
                align: 'left',
                color: '#000',
                backgroundColor: 'rgba(255,255,255,0.5)'
            };

            new RoomVisual(this._room.name).text(text, x, y, textStyle);
            y += 1.5;
        });
    }
}
