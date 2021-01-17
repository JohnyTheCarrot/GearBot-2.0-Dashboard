import React from "react";
import GuildNavigatorRibbon from "../../Components/GuildNavigatorRibbon";
import {getString} from "../../Language/LanguageHandler";
import {DiscordGuild, DiscordUser, LogEntry} from "../../Other/Types";
import LargeUserProfile from "../../Components/LargeUserProfile";
import {CurrentUserContext} from "../../Other/Constants";


import "../../scss/pages/settings-overview.scss";
import "../../scss/pages/settings.scss";
import "../../scss/svgs.scss";
import {formatWithElements} from "../../Other/Utils";
import LogEntryComponent from "../../Components/LogEntryComponent";

type SettingsOverviewStatisticProps = {
	title: string;
	options: {[key: string]: any}
}

class SettingsOverviewStatistic extends React.Component<SettingsOverviewStatisticProps, {}> {
	render () {
		return (
			<div>
				<h2 className="stat-list-title">{this.props.title}</h2>
				<div className="stats-statistics">
					{Object.keys(this.props.options).map((option_key: string) => (
						<div className="statistic-box" key={"option-" + option_key}>
							<h4>{option_key}</h4>
							<p>{this.props.options[option_key]}</p>
						</div>
					))}
				</div>
			</div>
		)
	}
}

const dummyUsers: DiscordUser[] = [
	{
		name: "JohnyTheCarrot",
		discriminator: "0001",
		id: "132819036282159104",
		avatar: "a_a67e3bde75af413fb65402372117dea9",
		public_flags: 772
	},
	{
		name: "AEnterprise",
		discriminator: "4693",
		id: "106354106196570112",
		avatar: "a_830b0d2082e9b84d00816eae9324d29e",
		public_flags: 0
	},
];

const dummyLastLogEntries: LogEntry[] = [
	{
		logType: "BAN",
		author: dummyUsers[1],
		target: dummyUsers[0],
		reason: "Being the big bad."
	},
	{
		logType: "BAN",
		author: dummyUsers[1],
		target: dummyUsers[0],
		reason: "Being the big bad."
	},
	{
		logType: "BAN",
		author: dummyUsers[1],
		target: dummyUsers[0],
		reason: "Being the big bad."
	},
	{
		logType: "BAN",
		author: dummyUsers[1],
		target: dummyUsers[0],
		reason: "Being the big bad."
	},
	{
		logType: "BAN",
		author: dummyUsers[1],
		target: dummyUsers[0],
		reason: "Being the big bad."
	}
]

type SettingsOverviewProps = {
	guild: DiscordGuild;
	isGearBotServer: boolean;
};
export default class SettingsOverview extends React.Component<
	SettingsOverviewProps,
	{}
> {
	render() {
		const timestamp = (BigInt(this.props.guild.id) >> BigInt(22)) + BigInt(1420070400000);

		return (
			<div style={{width: "100%"}}>
				<GuildNavigatorRibbon guild={this.props.guild} />
				<h2 className="guild-settings-overview__title">{getString("overview")}</h2>
				<p>{formatWithElements(
					{'feedback_link': <a href="#">{getString("feedback")}</a>},
					getString("overview_feedback")
				)}</p>
				<div className="guild-settings__content">
					{/*server owner*/}
					<div>
						<h3 className="overview-section">{getString("server_owner")}</h3>
						<CurrentUserContext.Consumer>
							{value => {
								if (!value) return <></>;
								return <LargeUserProfile user={value}/>
							}}
						</CurrentUserContext.Consumer>
					</div>
					{/*guild statistics*/}
					<div className="overview-stats">
						<SettingsOverviewStatistic title="Basics" options={{
							"Server Members": (42375).toLocaleString(),
							"Online Members": (8565).toLocaleString(),
							"Other Members": (42375 - 8565).toLocaleString()
						}}/>
						<SettingsOverviewStatistic title="Moderation" options={{
							"Infractions in the last 24h": (15).toLocaleString(),
							"Admins": (2).toLocaleString(),
							"Moderators": (9).toLocaleString()
						}}/>
						<SettingsOverviewStatistic title="Other" options={{
							"Custom Commands": (10).toLocaleString(),
							"Censored Words": (5).toLocaleString(),
							"Self Roles": (12).toLocaleString()
						}}/>
					</div>
					<div className="overview-infractions-list">
						{/*latest infractions*/}
						<div className="overview-infractions">
							<h3>{getString("latest_infractions")}</h3>
							{dummyLastLogEntries.map((logEntry: LogEntry, index: number) => {
								return <LogEntryComponent key={index} logEntry={logEntry} />;
							})}
						</div>
						{/*next infractions to expire*/}
						<div className="overview-infractions">
							<h3>{getString("next_infractions_to_expire")}</h3>
							{dummyLastLogEntries.map((logEntry: LogEntry, index: number) => {
								return <LogEntryComponent key={index} logEntry={logEntry} />;
							})}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
