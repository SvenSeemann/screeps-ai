export abstract class CreepImpl {

    protected constructor(
        protected _creep: Creep
    ) {
    }

    public abstract run(): void;

    protected _getCreepMemory(): any {
        return this._creep.memory;
    }
}
