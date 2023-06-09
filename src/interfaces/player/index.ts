import { ParentAccessRequestInterface } from 'interfaces/parent-access-request';
import { PlayerProfileInterface } from 'interfaces/player-profile';
import { AcademyInterface } from 'interfaces/academy';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PlayerInterface {
  id?: string;
  name: string;
  status: string;
  academy_id: string;
  user_id: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  parent_access_request?: ParentAccessRequestInterface[];
  player_profile?: PlayerProfileInterface[];
  academy?: AcademyInterface;
  user?: UserInterface;
  _count?: {
    parent_access_request?: number;
    player_profile?: number;
  };
}

export interface PlayerGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  status?: string;
  academy_id?: string;
  user_id?: string;
}
