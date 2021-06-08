import {
    CREEP_BUILDER_ROLE_NAME,
    CREEP_HARVESTER_ROLE_NAME,
    CREEP_TRANSPORTER_ROLE_NAME,
    CREEP_UPGRADER_ROLE_NAME
} from './creeps.const';
import {Builder} from './role/builder';
import {CreepImpl} from './role/creep-impl';
import {Harvester} from './role/harvester';
import {Transporter} from './role/transporter';
import {Upgrader} from './role/upgrader';
import {CreepStateSupervisor} from './state-supervisor';

export class CreepSupervisor {

    private _stateSupervisor = new CreepStateSupervisor();

    constructor() {
    }

    public run(room: Room) {
        this.creepGarbageCollector(room);
        this._stateSupervisor.run();
        this.creepRunner();
    }

    public creepGarbageCollector(room: Room) {
        for (let name in Memory.creeps) {
            if (!Game.creeps[name]) {
                const cache: any = Memory.creeps[name];

                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);

                switch (cache.role) {
                    case CREEP_HARVESTER_ROLE_NAME:
                        Harvester.onDeath(room, cache);
                        break;
                }
            }
        }
    }

    public creepRunner() {
        for(let name in Game.creeps) {
            const creepRaw = Game.creeps[name];
            const role = (creepRaw.memory as any).role;
            let creep: CreepImpl | null = null;

            switch (role) {
                case CREEP_HARVESTER_ROLE_NAME:
                    creep = new Harvester(creepRaw);
                    break;
                case CREEP_TRANSPORTER_ROLE_NAME:
                    creep = new Transporter(creepRaw);
                    break;
                case CREEP_BUILDER_ROLE_NAME:
                    creep = new Builder(creepRaw);
                    break;
                case CREEP_UPGRADER_ROLE_NAME:
                    creep = new Upgrader(creepRaw);
                    break;
            }

            if (!!creep) {
                creep.run();
            }
        }
    }
}
