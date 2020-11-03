import React from "react";
import {DiscordRole} from "../../Other/Types";
import "../../scss/Modals/add-role-modal.scss";

type AddRoleModalProps = {
  remaining_roles: DiscordRole[];
}

export default class AddRoleModal extends React.Component<AddRoleModalProps, { }> {
  render() {
    return (
      <div className="add-role-modal">
        <div className="search-bar">
          <b>ROLE:</b>
          <input/>
        </div>
      </div>
    );
  }
}