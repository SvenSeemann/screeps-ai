export type CreepRoleConfig = {limit: number, parts: BodyPartConstant[], priority: number};

export const CREEP_CONFIGS: {[roleName: string]: CreepRoleConfig} = {
    HARVESTER: {
        limit: 4,
        parts: [WORK, WORK, WORK, WORK, WORK, MOVE],
        priority: 0
    },
    TRANSPORTER: {
        limit: 6,
        parts: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        priority: 0
    },
    UPGRADER: {
        limit: 14,
        parts: [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        priority: 2
    },
    BUILDER: {
        limit: 4,
        parts: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
        priority: 1
    },
    CONQUEROR: {
        limit: 0,
        parts: [CLAIM, MOVE, MOVE, MOVE, MOVE],
        priority: 3
    }
};

export const CREEP_HARVESTER_ROLE_NAME = 'HARVESTER';
export const CREEP_UPGRADER_ROLE_NAME = 'UPGRADER';
export const CREEP_BUILDER_ROLE_NAME = 'BUILDER';
export const CREEP_TRANSPORTER_ROLE_NAME = 'TRANSPORTER';
export const CREEP_CONQUEROR_ROLE_NAME = 'CONQUEROR';

export const CREEP_ROLES = [
    CREEP_HARVESTER_ROLE_NAME,
    CREEP_TRANSPORTER_ROLE_NAME,
    CREEP_UPGRADER_ROLE_NAME,
    CREEP_BUILDER_ROLE_NAME,
    CREEP_CONQUEROR_ROLE_NAME
];
