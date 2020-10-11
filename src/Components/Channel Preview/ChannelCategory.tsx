import React from "react";
import "../../scss/Channel Preview/generic.scss";
import "../../scss/Channel Preview/colors.scss";
import "../../scss/Channel Preview/channel-list.scss";
import { Channel } from "../../Other/Types";

type ChannelCategoryProps = {
  channel: Channel;
  open?: boolean;
  toggleState: (channel: Channel) => void;
};

export default class ChannelCategory extends React.Component<ChannelCategoryProps, {}> {
  render() {
    return (
      <>
        <div
          className="channel-category fill-width pointer-cursor secondary"
          onClick={() => this.props.toggleState(this.props.channel)}
        >
          <p className="channel-category-name">{(this.props.open ? "v" : "^")} {this.props.channel.name}</p>
        </div>
        {this.props.open && this.props.children}
      </>
    );
  }
}