import React from "react";
import "../../scss/Channel Preview/generic.scss";
import "../../scss/Channel Preview/colors.scss";
import "../../scss/Channel Preview/channel-list.scss";
import { Channel, ChannelType, GuildEntry } from "../../Other/Types";
import ChannelEntry from "./Channel";
import ChannelCategory from "./ChannelCategory";
import { channels } from "../../Pages/Channel Preview/DummyData";
import { getGuildBanner } from "../../Other/Utils";

type GuildsListProps = {
  guild: GuildEntry;
}

type GuildsListState = {
  scrollTop: number;
  category_states: { [key: number]: boolean };
};

export default class ChannelList extends React.Component<GuildsListProps, GuildsListState> {
  channelList: React.RefObject<any>;
  constructor(props: GuildsListProps) {
    super(props);
    this.channelList = React.createRef();
    this.state = {
      scrollTop: 0,
      category_states: {}
    };

    this.contentOnScroll = this.contentOnScroll.bind(this);
    this.toggleState = this.toggleState.bind(this);
  }

  contentOnScroll() {
    this.setState({
      scrollTop: this.channelList.current.scrollTop
    });
  }

  toggleState(channel: Channel) {
    let new_category_states = this.state.category_states;
    new_category_states[channel.position!!] = !new_category_states[channel.position!!];
    this.setState({
      category_states: new_category_states
    })
  }

  render() {
    let hasBanner = this.props.guild.banner !== undefined && this.props.guild.banner !== null;
    const sorted_channels = channels[this.props.guild.id].sort(
      (a: Channel, b: Channel) => {
        if (a.position && b.position)
          return a.position - b.position;
        else return 1;
      }
    );
    return (
      <>
        <div className="channel-list full-height secondary">
          <div>
            <div className="channels fill-width">
              {
                hasBanner && this.state.scrollTop < 90
                  ?
                  <NameWithBanner guild={this.props.guild} scrollTop={this.state.scrollTop} />
                  :
                  <NameWithoutBanner guild={this.props.guild} />
              }
              <div className="scrollview-y full-height" ref={this.channelList} onScroll={this.contentOnScroll}>
                <div className={"content secondary " + (hasBanner ? "banner-padding" : "")} style={{
                  color: "#a7a7a7"
                }}>
                  {sorted_channels.map((channel: Channel, index: number) => {
                    if (channel.type === ChannelType.GUILD_CATEGORY)
                      return <ChannelCategory
                        channel={channel}
                        open={this.state.category_states[channel.position!!]}
                        toggleState={this.toggleState}
                        key={"category-" + index}
                      >
                        {sorted_channels
                          .filter(child_channel => child_channel.parent_id === channel.id)
                          .map((channel: Channel, index: number) => <ChannelEntry key={"channel-" + index} channel={channel} />)
                        }
                      </ChannelCategory>
                    else if (channel.parent_id === undefined)
                      return <ChannelEntry key={"channel-" + index} channel={channel} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

type NameWithBannerProps = {
  guild: GuildEntry;
  scrollTop: number;
}

class NameWithBanner extends React.Component<NameWithBannerProps, {}> {
  render() {
    return (
      <div className="banner full-width">
        <h1 className="channel-list-title">{this.props.guild.name}</h1>
        <div className="banner-img-parent">
          <img
            className="banner-img"
            src={getGuildBanner(this.props.guild, 512)}
            draggable={false}
            style={{
              transform: "scale(" + (1 + (this.props.scrollTop / 90)) + ")",
              opacity: 1 - (this.props.scrollTop / 90)
            }}
          />
        </div>
      </div>
    );
  }
}

type NameWithoutBannerProps = {
  guild: GuildEntry;
}

class NameWithoutBanner extends React.Component<NameWithoutBannerProps, {}> {
  render() {
    return (
      <div className="header full-width">
        <h1 className="channel-list-title text-color">{this.props.guild.name}</h1>
      </div>
    );
  }
}