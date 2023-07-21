import md5 from 'md5';

export const toGravatarHash = (email?: string) =>
  email ? md5(email.trim().toLocaleLowerCase()) : '00000000000000000000000000000000';

export const toGravatarUrl = (email?: string) =>
  `https://gravatar.com/avatar/${toGravatarHash(email)}?s=256`;
