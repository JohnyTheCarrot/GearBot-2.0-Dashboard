import React from "react";
import {DiscordGuild} from "../../Other/Types";
import GuildNavigatorRibbon from "../../Components/GuildNavigatorRibbon";
import {getString} from "../../Language/LanguageHandler";

type ServerSettingsProps = {
    guild: DiscordGuild;
    isGearBotServer: boolean;
}

export default class ServerSettings extends React.Component<ServerSettingsProps, {}> {
    constructor(props: ServerSettingsProps) {
        super(props);
    }

    render() {
        return (
            <div style={{width: "100%"}}>
                <GuildNavigatorRibbon guild={this.props.guild} />
                <h2>{getString("settings")}</h2>
            </div>
        );
    }
}