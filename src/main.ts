import {ErrorMapper} from 'utils/ErrorMapper';
import {CreepSupervisor} from './creeps/supervisor';
import {RoomStats} from './stats/room-stats';
import {TowerHandler} from './structures/tower-handler';

export const loop = ErrorMapper.wrapLoop(() => {
  new CreepSupervisor().run();

  const rooms = Game.rooms;
  const roomNames = Object.keys(rooms);

  roomNames.forEach(roomName => {
    new TowerHandler(rooms[roomName]);
    new RoomStats(rooms[roomName]);
  });
});
