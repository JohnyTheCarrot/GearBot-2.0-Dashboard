import React from "react";
import "../../scss/Channel Preview/generic.scss";
import "../../scss/Channel Preview/colors.scss";
import "../../scss/Channel Preview/channel-list.scss";
import { Channel } from "../../Other/Types";

type ChannelEntryProps = {
  channel: Channel;
};

export default class ChannelEntry extends React.Component<ChannelEntryProps, {}> {
  render() {
    return (
      <div className="channel fill-width pointer-cursor secondary" >
        <p className="channel-name">{this.props.channel.name}</p>
      </ div>
    );
  }
}