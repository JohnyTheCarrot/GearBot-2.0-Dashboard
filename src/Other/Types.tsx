/** @format */

import React from "react";

export type DiscordUser = {
  username: string;
  discriminator: string;
  id: string;
  avatar: string;
};

export type Theme = "dark" | "light";

export interface GearTeamMember extends DiscordUser {
  socials: {
    github?: string;
    twitter?: string;
    personalSite?: string;
  };
}

export type DiscordGuild = {
  name: string;
  owner: DiscordUser;
  id: string;
  icon?: string;
};

export type NavBarTab = {
  name: string;
  external?: boolean;
  admin_only?: boolean;
  href: string;
};

export type GearRawRoute = {
  exact: boolean;
  path: string;
  component_file_name: string;
};

export type GearPromisedRoute = {
  exact: boolean;
  path: string;
  component: () => Promise<{
    default: React.ComponentType<any>;
  }>;
};

export type GearResolvedRoute = {
  exact: boolean;
  path: string;
  Component: any;
};

export type FooterLink = {
  external: boolean;
  href: string;
  name: string;
};

export type Command = {
  aliases: string[];
  commandlevel: number;
  description: string;
  example: string;
  subcommands: { [key: string]: Command };
};

export type LogType = "BAN" | "KICK";

export type LogEntry = {
  logType: LogType;
  author: DiscordUser;
  target: DiscordUser;
  duration?: number;
  reason: string;
};

// Channel Preview

// either 0 (role) or 1 (member)
export enum PermissionOverwriteType {
  ROLE = 0,
  MEMBER = 1
};

export enum ChannelType {
  GUILD_TEXT = 0,
  DM = 1,
  GUILD_VOICE = 2,
  GROUP_DM = 3,
  GUILD_CATEGORY = 4,
  GUILD_NEWS = 5,
  GUILD_STORE = 6
};

export type PermissionOverwrite = {
  id: string;
  type: PermissionOverwriteType;
  allow: number;
  deny: number;
};

export type Channel = {
  id: string;
  name: string;
  type: ChannelType;
  parent_id?: string;
  user_limit?: number;
  rate_limit_per_user?: number;
  nsfw?: boolean;
  position?: number;
  permission_overwrites?: PermissionOverwrite[];
};

export type GuildEntry = {
  name: string;
  id: string;
  icon?: string | null;
  banner?: string | null;
  channels: Channel[];
};

