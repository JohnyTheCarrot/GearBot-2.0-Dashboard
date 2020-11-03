import React from "react";
import "../../scss/Channel Preview/generic.scss";
import "../../scss/Channel Preview/colors.scss";
import "../../scss/Channel Preview/permissions-display.scss";
import { GuildEntry } from "../../Other/Types";

type PermissionsDisplayProps = {
  guild: GuildEntry;
}

export default class PermissionsDisplay extends React.Component<PermissionsDisplayProps, {}> {
  render() {
    return (
      <div className="permissions-display full-height fill-width tertiary">

      </div>
    );
  }
}