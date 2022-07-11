export const StatusTypes = {
  online: 'online',
  offline: 'offline',
  away: 'away',
  busy: 'busy',
};

export type StatusTypes = keyof typeof StatusTypes;