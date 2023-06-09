import axios from 'axios';
import queryString from 'query-string';
import { ParentAccessRequestInterface, ParentAccessRequestGetQueryInterface } from 'interfaces/parent-access-request';
import { GetQueryInterface } from '../../interfaces';

export const getParentAccessRequests = async (query?: ParentAccessRequestGetQueryInterface) => {
  const response = await axios.get(`/api/parent-access-requests${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createParentAccessRequest = async (parentAccessRequest: ParentAccessRequestInterface) => {
  const response = await axios.post('/api/parent-access-requests', parentAccessRequest);
  return response.data;
};

export const updateParentAccessRequestById = async (id: string, parentAccessRequest: ParentAccessRequestInterface) => {
  const response = await axios.put(`/api/parent-access-requests/${id}`, parentAccessRequest);
  return response.data;
};

export const getParentAccessRequestById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/parent-access-requests/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteParentAccessRequestById = async (id: string) => {
  const response = await axios.delete(`/api/parent-access-requests/${id}`);
  return response.data;
};
