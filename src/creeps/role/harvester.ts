import {CreepImpl} from './creep-impl';

export class Harvester extends CreepImpl {

    private static _sourcesMemoryKey = 'sources';

    constructor(creep: Creep) {
        super(creep);
    }

    run(): void {
        this.selectSource();

        const sources = this._creep.room.find(FIND_SOURCES);

        if(this._creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            this._creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }

    public getSourcesMemory(room: Room) {
        return (room.memory as any)[Harvester._sourcesMemoryKey];
    }



    public selectSource() {
        const sources = this._creep.room.find(FIND_SOURCES);
    }

    public harvest() {

    }
}
