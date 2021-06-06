export class TowerHandler {

    constructor(
        private _room: Room
    ) {
        const towers: StructureTower[] = this._room.find(STRUCTURE_TOWER as any) as any;

        for (let tower of towers) {
            const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }
}
