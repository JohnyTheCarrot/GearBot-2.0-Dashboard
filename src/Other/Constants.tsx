/** @format */

import {
	GearRawRoute,
	FooterLink,
	NavBarTab,
	Theme,
	DiscordUser,
	DiscordGuild,
} from "./Types";
import {getString} from "../Language/LanguageHandler";
import React from "react";
import {getApiUrl} from "./Utils";

export const navBarMobileThreshold = 1100;

export const botInvite =
	"https://discord.com/oauth2/authorize?client_id=349977940198555660&scope=bot&permissions=1476783350";

export const loginUrl = getApiUrl("api/discord/login");

export const supportServerInvite = "https://discord.gg/EKautd5";

export const defaultTheme: Theme = "dark";

export const permissionLevels: string[] = [
	"Public",
	"Trusted",
	"Mod",
	"Admin",
	"Specific People",
	"Server Owner",
	"Disabled",
];

export const dummyUser: DiscordUser = {
	name: "AEnterprise",
	discriminator: "4693",
	id: "106354106196570112",
	avatar: "a_830b0d2082e9b84d00816eae9324d29e",
	public_flags: 772
};

export const DiscordFlags: { [key: string]: number } = {
	STAFF: 1 << 0,
	DISCORD_PARTNER: 1 << 1,
	HYPESQUAD_EVENTS: 1 << 2,
	HOUSE_BRAVERY: 1 << 6,
	HOUSE_BRILLIANCE: 1 << 7,
	HOUSE_BALANCE: 1 << 8,
	BUG_HUNTER_LEVEL_1: 1 << 3,
	BUG_HUNTER_LEVEL_2: 1 << 14,
	VERIFIED_BOT_DEVELOPER: 1 << 17,
	EARLY_SUPPORTER: 1 << 9,
};

export type DiscordBadgeObject = {
	name: string;
	img: string;
};

export const DiscordBadges: { [key: string]: DiscordBadgeObject } = {
	STAFF: {
		name: "Discord Staff",
		img: "4358ad1fb423b346324516453750f569",
	},
	DISCORD_PARTNER: {
		name: "Discord Partner",
		img: "33fedf082addb91d88abc272b4b18daa",
	},
	HYPESQUAD_EVENTS: {
		name: "HypeSquad Events",
		img: "6c73f47daf179ffade99f501bfc5101b",
	},
	BUG_HUNTER_LEVEL_1: {
		name: "Discord Bug Hunter",
		img: "f61b8981e92feead854f52e5a1ba14f0",
	},
	HOUSE_BALANCE: {
		name: "HypeSquad Balance",
		img: "9fdc63ef8a3cc1617c7586286c34e4f1",
	},
	HOUSE_BRILLIANCE: {
		name: "HypeSquad Brilliance",
		img: "48cf0556d93901c8cb16317be2436523",
	},
	HOUSE_BRAVERY: {
		name: "HypeSquad Bravery",
		img: "64ae1208b6aefc0a0c3681e6be36f0ff",
	},
	EARLY_SUPPORTER: {
		name: "Early Supporter",
		img: "23e59d799436a73c024819f84ea0b627",
	},
	BUG_HUNTER_LEVEL_2: {
		name: "Discord Bug Hunter",
		img: "9286332d6e947c91fa91569efce431b0",
	},
	VERIFIED_BOT_DEVELOPER: {
		name: "Verified Bot Developer",
		img: "45cd06af582dcd3c6b79370b4e3630de",
	},
};

export const defaultGuildSettingsTab = "overview";

export const dummyGuild: DiscordGuild = {
	name: "The Gearbox",
	owner: dummyUser,
	id: "365498559174410241",
	icon: "a_8b7ebc6c35b4830c9645a7dc5a18c498",
	features: ["PARTNERED", "VERIFIED"]
};

export const navBarTabs: NavBarTab[] = [
	{
		name: getString("add_gearbot"),
		external: true,
		href: botInvite,
	},
	{
		name: getString("documentation"),
		external: false,
		href: "/docs",
	},
	{
		name: getString("commands"),
		external: false,
		href: "/commands",
	},
	{
		name: getString("meet_the_team"),
		external: false,
		href: "/team",
	},
];

export const routes: GearRawRoute[] = [
	{
		path: "/",
		exact: true,
		component_file_name: "Home",
	},
	{
		path: "/docs/:section/:subsection",
		exact: true,
		component_file_name: "Documentation",
	},
	{
		path: "/docs/:section",
		exact: true,
		component_file_name: "Documentation",
	},
	{
		path: "/docs",
		exact: true,
		component_file_name: "Documentation",
	},
	{
		path: "/servers",
		exact: true,
		component_file_name: "ServerSettings/Servers",
	},
	{
		path: "/servers/:guildid",
		exact: true,
		component_file_name: "ServerSettings/Servers",
	},
	{
		path: "/servers/:guildid/:tab",
		exact: true,
		component_file_name: "ServerSettings/Servers",
	},
	{
		path: "/commands",
		exact: true,
		component_file_name: "Commands",
	},
	{
		path: "/team",
		exact: true,
		component_file_name: "MeetTheTeam",
	},
	{
		path: "/__development",
		exact: true,
		component_file_name: "Development",
	},
	{
		path: "/privacy_policy",
		exact: true,
		component_file_name: "PrivacyPolicy",
	},
];

export const footerLinks: FooterLink[] = [
	{
		external: false,
		href: "/",
		name: getString("home"),
	},
	{
		external: true,
		href: botInvite,
		name: getString("add_gearbot"),
	},
	{
		external: false,
		href: "/commands",
		name: getString("commands"),
	},
	{
		external: false,
		href: "/docs",
		name: getString("documentation"),
	},
	{
		external: false,
		href: "/team",
		name: getString("meet_the_team"),
	},
	{
		external: false,
		href: "/privacy_policy",
		name: getString("privacy_policy"),
	},
	{
		external: false,
		href: "/docs/Other/Supporting%20GearBot",
		name: getString("support_gearbot"),
	},
];

// contexts

export const ThemeContext = React.createContext(defaultTheme as Theme);

export const ChangeThemeContext = React.createContext((theme: Theme) => {});

export const CurrentUserContext = React.createContext(undefined as DiscordUser | undefined | null);