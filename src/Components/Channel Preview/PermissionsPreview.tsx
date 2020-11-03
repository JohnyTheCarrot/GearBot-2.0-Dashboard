import React from "react";
import "../../scss/Channel Preview/generic.scss";
import "../../scss/Channel Preview/colors.scss";
import "../../scss/Channel Preview/permissions-preview.scss";
import { GuildEntry } from "../../Other/Types";
import { getGuildBanner } from "../../Other/Utils";

type PermissionsPreviewProps = {
  guild: GuildEntry;
}

export default class PermissionsPreview extends React.Component<PermissionsPreviewProps, {}> {
  render() {
    return (
      <div className="permissions-preview full-height fill-width tertiary">

      </div>
    );
  }
}