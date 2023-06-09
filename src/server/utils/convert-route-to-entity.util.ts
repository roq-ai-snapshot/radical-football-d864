const mapping: Record<string, string> = {
  academies: 'academy',
  coaches: 'coach',
  parents: 'parent',
  'parent-access-requests': 'parent_access_request',
  players: 'player',
  'player-profiles': 'player_profile',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
