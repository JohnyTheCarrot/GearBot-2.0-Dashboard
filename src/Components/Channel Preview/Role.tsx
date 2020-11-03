import React from "react";
import "../../scss/Channel Preview/generic.scss";
import "../../scss/Channel Preview/colors.scss";
import "../../scss/Channel Preview/role.scss";
import {ReactComponent as SVGClose} from "../../SVG/close.svg";
import {DiscordRole} from "../../Other/Types";

type RoleProps = {
    role: DiscordRole;
    removeRole: (role: DiscordRole) => void;
}

export default class Role extends React.Component<RoleProps, {}> {
    render() {
        return (
            <div
                className="role text-color"
                style={{border: `1px solid #${this.props.role.color.toString(16)}`}}
            >
                <div
                    className="ball pointer-cursor"
                    style={{backgroundColor: `#${this.props.role.color.toString(16)}`}}
                    onClick={() => this.props.removeRole(this.props.role)}
                >
                    <SVGClose width={8} height={8} style={{margin: "auto"}}/>
                </div>
                <p>{this.props.role.name}</p>
            </div>
        );
    }
}