import React from "react";
import "../../scss/Channel Preview/generic.scss";
import "../../scss/Channel Preview/colors.scss";
import "../../scss/Channel Preview/permissions-display.scss";
import { Channel, DiscordMember, GuildEntry } from "../../Other/Types";
import { hasPermission, PERMISSION } from "../../Other/Permissions";

type PermissionsDisplayProps = {
  guild: GuildEntry;
  channel: Channel;
  member: DiscordMember;
}

export default class PermissionsDisplay extends React.Component<PermissionsDisplayProps, {}> {
  render() {
    return (
      <div className="permissions-display full-height fill-width tertiary">
        {hasPermission(this.props.guild, this.props.channel, this.props.member, PERMISSION.CREATE_INSTANT_INVITE)}
      </div>
    );
  }
}