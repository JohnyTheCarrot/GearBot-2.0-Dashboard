import { Channel, DiscordMember, GuildEntry } from "./Types";

export enum PERMISSION {
  CREATE_INSTANT_INVITE = 0x00000001,
  MANAGE_CHANNELS = 0x00000010
}

export enum PERMISSION_TYPE {
  TEXT,
  VOICE,
  TEXT_AND_VOICE,
  GUILD
}

export const PERMISSIONS: { [key: string]: [PERMISSION_TYPE, PERMISSION] } = {
  CREATE_INSTANT_INVITE: [PERMISSION_TYPE.TEXT_AND_VOICE, PERMISSION.CREATE_INSTANT_INVITE],
  MANAGE_CHANNELS: [PERMISSION_TYPE.TEXT_AND_VOICE, PERMISSION.MANAGE_CHANNELS]
}

export function hasPermission(guild: GuildEntry, channel: Channel, member: DiscordMember, perm: PERMISSION) {
  console.log(guild.currentRoles);
  return undefined;
}