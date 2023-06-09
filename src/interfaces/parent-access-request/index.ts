import { ParentInterface } from 'interfaces/parent';
import { PlayerInterface } from 'interfaces/player';
import { GetQueryInterface } from 'interfaces';

export interface ParentAccessRequestInterface {
  id?: string;
  parent_id: string;
  player_id: string;
  status: string;
  created_at?: Date | string;
  updated_at?: Date | string;

  parent?: ParentInterface;
  player?: PlayerInterface;
  _count?: {};
}

export interface ParentAccessRequestGetQueryInterface extends GetQueryInterface {
  id?: string;
  parent_id?: string;
  player_id?: string;
  status?: string;
}
