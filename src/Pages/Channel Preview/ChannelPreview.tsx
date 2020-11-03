import React from "react";
import "../../scss/Channel Preview/generic.scss";
import "../../scss/Channel Preview/colors.scss";
import "../../scss/Channel Preview/channel-preview.scss";
import GuildsList from "../../Components/Channel Preview/GuildsList";
import ChannelList from "../../Components/Channel Preview/ChannelList";
import PermissionsPreview from "../../Components/Channel Preview/PermissionsPreview";
import PreviewSettings from "../../Components/Channel Preview/PreviewSettings";
import { DiscordRole, DiscordRoleRaw, GuildEntry } from "../../Other/Types";
import { roles } from "./DummyData";
import { processRawRole } from "../../Other/Utils";

type ChannelPreviewState = {
  guilds: GuildEntry[];
  selectedGuildIndex?: number;
  selectedGuildID?: string;
};

const dummyData: GuildEntry[] = [
  {
    name: "The Gearbox",
    id: "365498559174410241",
    icon: "a_8b7ebc6c35b4830c9645a7dc5a18c498"
  },
  {
    name: "Test Server 1",
    id: "548295731140755459",
    icon: "737e6bfa63057527cc668e5b3287d797",
    banner: "5021cdc9af66ca179bcafc0977335b64",
    currentRoles: roles["548295731140755459"].map((role: DiscordRoleRaw) => processRawRole(role))
  }
];

export default class ChannelPreview extends React.Component<{}, ChannelPreviewState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      guilds: dummyData
    }
    this.selectGuild = this.selectGuild.bind(this);
    this.removeRole = this.removeRole.bind(this);
  }

  selectGuild(guild: GuildEntry, index: number) {
    this.setState({
      selectedGuildID: guild.id,
      selectedGuildIndex: index,
    })
  }

  removeRole(role: DiscordRole) {
    const guild = this.state.guilds[this.state.selectedGuildIndex!!];
    let new_role_array = guild.currentRoles ?? [];
    let index = new_role_array.indexOf(role);
    if (index > -1) {
      new_role_array.splice(index, 1);
    }
    guild.currentRoles = new_role_array;
    let guilds = this.state.guilds;
    guilds[this.state.selectedGuildIndex!!] = guild;
    this.setState({
      guilds: guilds
    });
  }

  addRole(role: DiscordRole) {
    const guild = this.state.guilds[this.state.selectedGuildIndex!!];
    let new_role_array = guild.currentRoles ?? [];
    new_role_array.push(role);
    guild.currentRoles = new_role_array;
    let guilds = this.state.guilds;
    guilds[this.state.selectedGuildIndex!!] = guild;
    this.setState({
      guilds: guilds
    });
  }

  render() {
    return (
      <div className="channel-preview full-width full-height">
        <GuildsList
          guilds={this.state.guilds}
          selectedGuildID={this.state.selectedGuildID}
          selectedGuildIndex={this.state.selectedGuildIndex}
          selectGuild={this.selectGuild}
        />
        {this.state.selectedGuildIndex !== undefined &&
          <div className="base">
            <ChannelList
              guild={this.state.guilds[this.state.selectedGuildIndex]}
            />
            <PermissionsPreview guild={this.state.guilds[this.state.selectedGuildIndex]} />
            <PreviewSettings
              guild={this.state.guilds[this.state.selectedGuildIndex]}
              removeRole={this.removeRole}
              addRole={this.addRole}
              currentRoles={this.state.guilds[this.state.selectedGuildIndex!!].currentRoles ?? []}
            />
          </div>
        }
      </div>
    );
  }
}