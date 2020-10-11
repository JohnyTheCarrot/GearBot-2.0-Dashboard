import React from "react";
import "../../scss/Channel Preview/generic.scss";
import "../../scss/Channel Preview/colors.scss";
import "../../scss/Channel Preview/channel-preview.scss";
import GuildsList from "../../Components/Channel Preview/GuildsList";
import ChannelList from "../../Components/Channel Preview/ChannelList";
import PermissionsPreview from "../../Components/Channel Preview/PermissionsPreview";
import PreviewSettings from "../../Components/Channel Preview/PreviewSettings";
import { ChannelType, GuildEntry } from "../../Other/Types";

type ChannelPreviewState = {
  guilds: GuildEntry[];
  selectedGuildIndex?: number;
  selectedGuildID?: string;
};

const dummyData: GuildEntry[] = [
  {
    name: "The Gearbox",
    id: "365498559174410241",
    icon: "a_8b7ebc6c35b4830c9645a7dc5a18c498",
    channels: []
  },
  {
    name: "Test Server 1",
    id: "548295731140755459",
    icon: "737e6bfa63057527cc668e5b3287d797",
    banner: "5021cdc9af66ca179bcafc0977335b64",
    channels: [
      {
        id: "0",
        name: "Test Category",
        position: 0,
        type: ChannelType.GUILD_CATEGORY
      },
      {
        id: "3",
        name: "Test Category 1",
        position: 3,
        type: ChannelType.GUILD_CATEGORY
      },
      {
        id: "6",
        name: "test-channel-6",
        position: 6,
        type: ChannelType.GUILD_TEXT,
        parent_id: "3"
      },
      {
        id: "5",
        name: "test-channel-5",
        position: 5,
        type: ChannelType.GUILD_TEXT,
        parent_id: "3"
      },

      {
        id: "4",
        name: "test-channel-4",
        position: 4,
        type: ChannelType.GUILD_TEXT,
        parent_id: "3"
      },
      {
        id: "2",
        name: "test-channel-2",
        position: 2,
        type: ChannelType.GUILD_TEXT,
        parent_id: "0"
      },
      {
        id: "1",
        name: "test-channel-1",
        position: 1,
        type: ChannelType.GUILD_TEXT,
        parent_id: "0"
      },
    ]
  }
];

export default class ChannelPreview extends React.Component<{}, ChannelPreviewState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      guilds: dummyData
    }
    this.selectGuild = this.selectGuild.bind(this);
  }

  selectGuild(guild: GuildEntry, index: number) {
    this.setState({
      selectedGuildID: guild.id,
      selectedGuildIndex: index,
    })
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
          <ChannelList
            guild={this.state.guilds[this.state.selectedGuildIndex]}
          />
        }
        <PermissionsPreview />
        <PreviewSettings />
      </div>
    );
  }
}