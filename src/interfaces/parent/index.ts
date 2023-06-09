import { ParentAccessRequestInterface } from 'interfaces/parent-access-request';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ParentInterface {
  id?: string;
  name: string;
  user_id: string;
  created_at?: Date | string;
  updated_at?: Date | string;
  parent_access_request?: ParentAccessRequestInterface[];
  user?: UserInterface;
  _count?: {
    parent_access_request?: number;
  };
}

export interface ParentGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  user_id?: string;
}
