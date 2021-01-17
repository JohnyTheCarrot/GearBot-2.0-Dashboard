import React from "react";

import GuildCard from "../Components/GuildCard";
import Selector from "../Components/Selector";
import {getString} from "../Language/LanguageHandler";
import {supportServerInvite} from "../Other/Constants";
import {formatWithElements} from "../Other/Utils";
import {DiscordGuild} from "../Other/Types";

type GuildListProps = {
	available_servers: DiscordGuild[] | undefined
	gearbot_servers: DiscordGuild[] | undefined
};

type GuildListState = {
	width: number;
};

export default class GuildList extends React.Component<
	GuildListProps,
	GuildListState
> {
	render() {
		return (
			<div style={{width: "100%"}}>
				<h1>{getString("servers")}</h1>
				<p>
					{formatWithElements(
						{
							feedback_link: (
								<a href={supportServerInvite}>
									{getString("feedback")}
								</a>
							),
						},
						getString("servers_help")
					)}
				</p>
				<Selector
					title={getString("gearbot_dashboard_available")}
					loading={this.props.gearbot_servers === undefined}
					style={{marginTop: 40}}
				>
					{(this.props.gearbot_servers || []).length === 0 && <p>No guilds available.</p>}
					{(this.props.gearbot_servers || []).map((server: DiscordGuild) => (
						<GuildCard guild={server} key={"server-" + server.id}/>
					))}
				</Selector>
				<Selector
					title={getString("selector_add_gearbot")}
					loading={this.props.available_servers === undefined}
					style={{marginTop: 40, marginBottom: 40}}
				>
					{(this.props.available_servers || []).length === 0 && <p>No guilds available.</p>}
					{(this.props.available_servers || []).map((server: DiscordGuild) => (
						<GuildCard guild={server} key={"server-" + server.id}/>
					))}
				</Selector>
			</div>
		);
	}
}
