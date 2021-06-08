import {CreepImpl} from './creep-impl';

export interface RoomSourceDistribution {
    [sourceId: string]: number;
}

export class Harvester extends CreepImpl {

    private static _sourcesMemoryKey = 'sources';

    public static onDeath(room: Room, creepMemory: any) {
        (room.memory as any)[Harvester._sourcesMemoryKey][creepMemory.sourceId]--;
    }

    private readonly _sourceId: string;

    constructor(creep: Creep) {
        super(creep);

        this._sourceId = this._getCreepMemory().sourceId;
    }

    run(): void {
        const source = this.selectSource();

        if (!!source) {
            this.harvest(source);
        }
    }

    public selectSource(): Source | null {
        let source = null;

        if (!!this._sourceId) {
            source = this._getRoomSources().find(source => source.id === this._sourceId) || null;
        } else {
            source = this._selectSourceFromSourceDistribution();
        }

        return source;
    }

    public harvest(source: Source) {
        if (this._creep.harvest(source) == ERR_NOT_IN_RANGE) {
            this._creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }

    private _selectSourceFromSourceDistribution(): Source | null {
        const sources = this._getRoomSources();
        const sourceDistribution = this._getRoomSourceDistribution();

        const sourceIds = Object.keys(sourceDistribution);
        let resultSource: Source | null;

        if (sourceIds.length === 0) {
            sources.forEach(source => sourceDistribution[source.id] = 0);
            resultSource = sources[0];
        } else {
            let lowestSourceId = sourceIds[0];
            sourceIds.forEach(sourceId => {
                if (sourceDistribution[lowestSourceId] > sourceDistribution[sourceId]) {
                    lowestSourceId = sourceId;
                }
            });

            resultSource = sources.find(source => source.id === lowestSourceId) || null;
        }

        if (!!resultSource) {
            this._getCreepMemory().sourceId = resultSource.id;
            sourceDistribution[resultSource.id] += 1;
            this._setRoomSourceDistribution(sourceDistribution);
        }

        return resultSource;
    }

    private _getRoomSourceDistribution(): RoomSourceDistribution {
        return (this._creep.room.memory as any)[Harvester._sourcesMemoryKey] as RoomSourceDistribution ||
            {};
    }

    private _setRoomSourceDistribution(sourceDistribution: RoomSourceDistribution) {
        (this._creep.room.memory as any)[Harvester._sourcesMemoryKey] = sourceDistribution;
    }

    private _getRoomSources() {
        return this._creep.room.find(FIND_SOURCES);
    }
}
