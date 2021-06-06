export class StructureUtil {

    public static getClosestDamagedStructure(pos: RoomPosition) {
        return pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
    }
}
