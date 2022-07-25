export const statusTypes = {
  online: 'online',
  offline: 'offline',
  away: 'away',
  busy: 'busy',
  active: 'active',
  inactive: 'inactive',
  pending: 'pending',
};

export type StatusTypes = keyof typeof statusTypes;