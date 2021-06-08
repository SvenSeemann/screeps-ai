export class TowerHandler {

    constructor(
        private _room: Room
    ) {
        const towers: StructureTower[] = this._room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_TOWER;
            }
        }) as StructureTower[];

        for (let tower of towers) {
            const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }
}
