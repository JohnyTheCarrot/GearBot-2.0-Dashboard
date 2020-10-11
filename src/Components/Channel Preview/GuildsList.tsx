import React from "react";
import "../../scss/Channel Preview/generic.scss";
import "../../scss/Channel Preview/colors.scss";
import "../../scss/Channel Preview/guilds-list.scss";
import { ReactComponent as GearBot } from "../../SVG/gearbot.svg";
import GuildListEntry from "./GuildListEntry";
import { GuildEntry } from "../../Other/Types";

type GuildsListProps = {
  guilds: GuildEntry[];
  selectedGuildID?: string;
  selectedGuildIndex?: number;
  selectGuild: (guild: GuildEntry, index: number) => void;
}

export default class GuildsList extends React.Component<GuildsListProps, {}> {
  render() {
    return (
      <div className="guilds-list full-height primary">
        <div className="guild-list-entry pointer-cursor secondary">
          <GearBot width={30} height={35} className="gearbot-logo logo-fill text" />
        </div>
        <div className="separator tertiary" />
        {this.props.guilds.map((guild: GuildEntry, index: number) => (
          <GuildListEntry
            guildEntry={guild}
            key={index}
            index={index}
            selected={
              this.props.selectedGuildIndex !== undefined && (index === this.props.selectedGuildIndex)
            }
            onClick={this.props.selectGuild}
          />
        ))}
      </div>
    );
  }
}