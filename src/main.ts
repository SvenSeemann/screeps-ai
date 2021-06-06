import { ErrorMapper } from "utils/ErrorMapper";
import {CreepSupervisor} from './creeps/supervisor';

export const loop = ErrorMapper.wrapLoop(() => {
  new CreepSupervisor().run();
});
