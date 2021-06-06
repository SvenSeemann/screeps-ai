export type CreepRoleConfig = {limit: number, parts: BodyPartConstant[], priority: number};

export const CREEP_CONFIGS: {[roleName: string]: CreepRoleConfig} = {
    HARVESTER: {
        limit: 6,
        parts: [WORK, WORK, WORK, WORK, MOVE],
        priority: 0
    },
    TRANSPORTER: {
        limit: 3,
        parts: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        priority: 1
    },
    UPGRADER: {
        limit: 4,
        parts: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
        priority: 2
    },
    BUILDER: {
        limit: 3,
        parts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        priority: 2
    }
};

export const CREEP_HARVESTER_ROLE_NAME = 'HARVESTER';
export const CREEP_UPGRADER_ROLE_NAME = 'UPGRADER';
export const CREEP_BUILDER_ROLE_NAME = 'BUILDER';
export const CREEP_TRANSPORTER_ROLE_NAME = 'TRANSPORTER';

export const CREEP_ROLES = [
    CREEP_HARVESTER_ROLE_NAME,
    CREEP_TRANSPORTER_ROLE_NAME,
    CREEP_UPGRADER_ROLE_NAME,
    CREEP_BUILDER_ROLE_NAME
];
