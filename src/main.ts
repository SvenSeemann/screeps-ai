import {ErrorMapper} from 'utils/ErrorMapper';
import {CreepSupervisor} from './creeps/supervisor';
import {RoomStats} from './stats/room-stats';
import {TowerHandler} from './structures/tower-handler';

export const loop = ErrorMapper.wrapLoop(() => {
  const rooms = Game.rooms;
  const roomNames = Object.keys(rooms);

  roomNames.forEach(roomName => {
    const room = rooms[roomName];

    new CreepSupervisor().run(room);
    new TowerHandler(room);
    new RoomStats(room);
  });
});
