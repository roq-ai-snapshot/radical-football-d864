import { PlayerInterface } from 'interfaces/player';
import { CoachInterface } from 'interfaces/coach';
import { GetQueryInterface } from 'interfaces';

export interface PlayerProfileInterface {
  id?: string;
  player_id: string;
  coach_id: string;
  notes?: string;
  created_at?: Date | string;
  updated_at?: Date | string;

  player?: PlayerInterface;
  coach?: CoachInterface;
  _count?: {};
}

export interface PlayerProfileGetQueryInterface extends GetQueryInterface {
  id?: string;
  player_id?: string;
  coach_id?: string;
  notes?: string;
}
