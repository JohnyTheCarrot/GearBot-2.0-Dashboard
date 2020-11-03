import React from "react";
import "../../scss/Channel Preview/generic.scss";
import "../../scss/Channel Preview/colors.scss";
import "../../scss/Channel Preview/preview-settings.scss";
import {DiscordRole, GuildEntry} from "../../Other/Types";
import Role from "./Role";
import { ReactComponent as Plus } from "../../SVG/plus.svg";
import { ModalContext } from "../../Other/Constants";
import AddRoleModal from "./AddRoleModal";
import {roles} from "../../Pages/Channel Preview/DummyData";
import {processRawRole} from "../../Other/Utils";

type GuildsListProps = {
  guild: GuildEntry;
  removeRole: (role: DiscordRole) => void;
  addRole: (role: DiscordRole) => void;
  currentRoles: DiscordRole[];
}

export default class PreviewSettings extends React.Component<GuildsListProps, {}> {
  addRole() {

  }
  render() {
    return (
      <div className="preview-settings full-height secondary">
        {this.props.currentRoles
            .sort((a, b) => {
              if (a && b)
                return b.position - a.position;
              else
                return -1
            })
            .map((discordRole: DiscordRole, index: number) => {
          return <Role role={discordRole} key={index} removeRole={this.props.removeRole} />
        })}
        <ModalContext.Consumer>
          {value => (
            <div
              className="role button-add pointer-cursor"
              style={{width: 22, border: "1px solid #4f545c"}}
              onClick={() => {
                console.log(value);
                value?.setModal(
                  <AddRoleModal
                    remaining_roles={
                      roles[this.props.guild.id]
                        .map(role => processRawRole(role))
                        .filter(role => !this.props.currentRoles.includes(role))
                    }
                  />
                )
              }}
            >
              <Plus/>
            </div>
          )}
        </ModalContext.Consumer>
      </div>
    );
  }
}