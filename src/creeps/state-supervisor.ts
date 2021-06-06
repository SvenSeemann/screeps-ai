import {CREEP_CONFIGS, CREEP_ROLES, CreepRoleConfig} from './creeps.const';

export class CreepStateSupervisor {

    public run() {
        this.creepState();
    }

    public getRolesGroupedByPriority() {
        return CREEP_ROLES.reduce(
            (previous, current) => {
                if (previous[ CREEP_CONFIGS[current].priority]) {
                    previous[ CREEP_CONFIGS[current].priority].push(current);
                } else {
                    previous[ CREEP_CONFIGS[current].priority] = [current];
                }

                return previous;
            },
            [] as string[][]
        )
    }

    public neededCreepCount(roleName: string) {
        const existing = this.getRoleCount(roleName);
        const wanted =  CREEP_CONFIGS[roleName].limit;

        return wanted - existing;
    }

    public getCreepCost(parts: BodyPartConstant[]) {
        return parts.reduce(
            (previous, current) => {
                const partCosts = {
                    [MOVE]: 50,
                    [WORK]: 100,
                    [CARRY]: 50,
                    [ATTACK]: 80,
                    [RANGED_ATTACK]: 150,
                    [HEAL]: 250,
                    [TOUGH]: 10,
                    [CLAIM]: 600
                };

                return previous += partCosts[current];
            },
            0
        )
    }

    public creepState() {
        const rolesGroupedByPriority = this.getRolesGroupedByPriority();


        for(let priorityGroup of rolesGroupedByPriority) {
            let groupComplete = true;

            for(let role of priorityGroup) {
                this.roleState(role, CREEP_CONFIGS[role]);

                const ncc = this.neededCreepCount(role);

                if(ncc > 0) {
                    groupComplete = false;
                }
            }

            if(!groupComplete) {
                break;
            }
        }

        for(let role of CREEP_ROLES) {
            this.neededCreepCount(role)
        }
    }

    public roleState(roleName: string, config: CreepRoleConfig) {
        const roleCount = this.getRoleCount(roleName);

        if (roleCount < config.limit) {
            const name = roleName + '_' + Game.time;

            Game.spawns['Spawn1'].spawnCreep(config.parts, name, {memory: {role: roleName} as any});
        }
    }

    public getRoleCount(roleName: string) {
        return _.filter(Game.creeps, creep => (creep.memory as any).role === roleName).length;
    }
}
