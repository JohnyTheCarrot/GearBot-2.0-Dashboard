import React from "react";
import "../../scss/Channel Preview/generic.scss";
import "../../scss/Channel Preview/colors.scss";
import "../../scss/Channel Preview/permissions-preview.scss";
import { GuildEntry } from "../../Other/Types";
import PermissionsDisplay from "./PermissionsDisplay";
import { channels } from "../../Pages/Channel Preview/DummyData";

type PermissionsPreviewProps = {
  guild: GuildEntry;
}

export default class PermissionsPreview extends React.Component<PermissionsPreviewProps, {}> {
  render() {
    return (
      <div className="permissions-preview full-height fill-width tertiary">
        <PermissionsDisplay channel={channels[this.props.guild.id][0]} />
      </div>
    );
  }
}