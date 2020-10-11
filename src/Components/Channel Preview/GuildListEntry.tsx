import React from "react";
import "../../scss/Channel Preview/generic.scss";
import "../../scss/Channel Preview/colors.scss";
import { GuildEntry } from "../../Other/Types";
import { getGuildIcon } from "../../Other/Utils";

type GuildListEntryProps = {
  guildEntry: GuildEntry;
  selected?: boolean;
  index: number;
  onClick?: (guild: GuildEntry, index: number) => void;
}

export default class GuildListEntry extends React.Component<GuildListEntryProps, {}> {
  constructor(props: GuildListEntryProps) {
    super(props);
    this.toggleSelect = this.toggleSelect.bind(this);
  }
  toggleSelect() {
    if (this.props.onClick)
      this.props.onClick(this.props.guildEntry, this.props.index);
  }
  render() {
    let classes = this.props.selected ? " selected" : "";
    return (
      <div>
        {this.props.selected &&
          <div className="selected-line accent" />
        }
        <div
          className={"guild-list-entry secondary pointer-cursor" + classes}
          onClick={this.toggleSelect}
          data-tooltip={this.props.guildEntry.name}
          data-tooltip-location="right"
        >
          <img src={getGuildIcon(this.props.guildEntry, 64)} width={48} height={48} draggable={false} />
        </div>
      </div>
    );
  }
}