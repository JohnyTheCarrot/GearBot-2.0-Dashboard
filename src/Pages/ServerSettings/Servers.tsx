import React from "react";
import {Redirect} from "react-router-dom";
import {CurrentUserContext, defaultGuildSettingsTab} from "../../Other/Constants";
import GuildList from "../GuildList";
import GuildPage from "./GuildPage";
import SettingsOverview from "./SettingsOverview";
import {DiscordGuild, DiscordUser} from "../../Other/Types";
import {setShouldDisconnect, shouldDisconnect} from "../../App";
import LoadingScreen from "../../Components/LoadingScreen";
import {getWebSocketUrl} from "../../Other/Utils";
import LoginRequired from "../LoginRequired";
import Cookies from 'js-cookie';
import ServerSettings from "./ServerSettings";

type ServersProps = {
	match: {
		params: {
			guildid?: string;
			tab?: string;
		};
	};
};

export default class Servers extends React.Component<ServersProps, {}> {
	render () {
		return (
			<CurrentUserContext.Consumer>
				{(value) => {
					if (value === undefined)
						return <LoadingScreen/>

					if (value === null)
						return <LoginRequired/>

					return (
						<ServersAuthenticated
							user={value}
							guildid={this.props.match.params.guildid}
							tab={this.props.match.params.tab}
						/>
					)
				}}
			</CurrentUserContext.Consumer>
		)
	}
}

let ws: WebSocket;
let availableServersCache: DiscordGuild[] | undefined = undefined;
let gearbotServersCache: DiscordGuild[] | undefined = undefined;

type ServersAuthenticatedProps = {
	user: DiscordUser;
	guildid?: string;
	tab?: string;
}

type ServersAuthenticatedState = {
	websocketConnected: boolean;
	available_servers?: DiscordGuild[];
	gearbot_servers?: DiscordGuild[];
};

class ServersAuthenticated extends React.Component<
	ServersAuthenticatedProps,
	ServersAuthenticatedState
> {
	constructor(props: ServersAuthenticatedProps) {
		super(props);
		this.state = {
			websocketConnected: ws !== undefined && ws.readyState === ws.OPEN,
			available_servers: availableServersCache,
			gearbot_servers: gearbotServersCache
		};
		this.connectWebSocket = this.connectWebSocket.bind(this);
	}

	connectWebSocket() {
		if (ws !== undefined) {
			console.log("wsclosed", ws.readyState === ws.CLOSED);
			console.log("wsclosing", ws.readyState === ws.CLOSING);
		}
		if (
			ws === undefined ||
			ws.readyState === ws.CLOSED ||
			ws.readyState === ws.CLOSING
		) {
			ws = new WebSocket(getWebSocketUrl());
			ws.onopen = () => {
				this.setState({websocketConnected: true});
				ws.send(JSON.stringify({
					type: "Identify",
					token: Cookies.get("token")
				}))
			}
			ws.onmessage = (message) => {
				const data = JSON.parse(message.data);
				const type = data["type"]
				console.log(data);
				switch(type)
				{
					case "Welcome":
						ws.send(JSON.stringify({
							"type": "GuildList"
						}));
						break;
					case "GuildList":
						this.setState({
							available_servers: data["available_servers"],
							gearbot_servers: data["gearbot_servers"]
						})
						gearbotServersCache = data["gearbot_servers"]
						availableServersCache = data["available_servers"]
						break;
				}
			}
			ws.onclose = () => {
				if (!this.state.websocketConnected) return;
				this.setState({websocketConnected: false});
				setTimeout(this.connectWebSocket, 2000);
			};
		}
	}

	componentDidMount() {
		this.connectWebSocket();
	}

	componentWillUnmount() {
		console.log(shouldDisconnect);
		if (shouldDisconnect) {
			// prevent warning
			ws.onclose = null;
			ws.close();
		} else {
			setShouldDisconnect(true);
		}
	}

	render() {
		let tab = this.props.tab;

		if (!this.state.websocketConnected) return <LoadingScreen instant />;

		if (this.props.guildid === undefined) return (
			<GuildList
				available_servers={this.state.available_servers}
				gearbot_servers={this.state.gearbot_servers}
			/>
		);

		let guild: DiscordGuild | undefined;
		let isGearBotServer: boolean = true;
		guild = (this.state.gearbot_servers || []).find((s) => s.id === this.props.guildid);
		if (!guild)
		{
			guild = (this.state.available_servers || []).find((s) => s.id === this.props.guildid);
			isGearBotServer = false;
		}

		if (tab === undefined)
			return (
				<Redirect
					to={`/servers/${this.props.guildid}/${defaultGuildSettingsTab}`}
				/>
			);

		if (guild !== undefined) {
			if (tab === "settings") return <ServerSettings guild={guild} isGearBotServer={isGearBotServer}/>;
			else if (tab === "overview")
				return <SettingsOverview guild={guild} isGearBotServer={isGearBotServer}/>;
		}

		return (
			<div
				style={{
					placeContent: "center",
					width: "100%",
					alignItems: "center",
					display: "flex",
				}}
			>
				<h1 style={{fontSize: 50}}>404</h1>
			</div>
		);
	}
}
