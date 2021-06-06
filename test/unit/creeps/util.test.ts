import {expect} from 'chai';
import {CreepUtils} from '../../../src/creeps/role/util';

describe('CreepUtil', () => {
    before(() => {
    });

    beforeEach(() => {
    });

    it('should calculate creep weight', () => {
        const testCases: {
            creep: {
                store?: { energy: number },
                body: { type: BodyPartConstant }[]
            },
            expected: number
        }[] = [
            {
                creep: {
                    body: [
                        {type: 'move'},
                        {type: 'work'},
                        {type: 'work'},
                        {type: 'attack'}
                    ]
                },
                expected: 3
            },
            {
                creep: {
                    body: [
                        {type: 'move'},
                        {type: 'work'},
                        {type: 'work'},
                        {type: 'attack'},
                        {type: 'carry'},
                        {type: 'carry'},
                        {type: 'carry'}
                    ],
                    store: {
                        energy: 75
                    }
                },
                expected: 5
            }
        ];

        testCases.forEach(testCase => {
            const result = CreepUtils.getWeight(testCase.creep as Creep);

            expect(result).eql(testCase.expected);
        });
    });
});
