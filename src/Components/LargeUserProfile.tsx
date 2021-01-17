import React from "react";
import {DiscordUser} from "../Other/Types";
import {getProfilePicture} from "../Other/Utils";
import Grid from "./Grid";

import "../scss/Components/large-user-profile.scss";
import {DiscordBadges, DiscordFlags} from "../Other/Constants";

type LargeUserProfileProps = {
  user: DiscordUser
};

export default class LargeUserProfile extends React.Component<LargeUserProfileProps, {}> {
    render() {
        return (
            <div className="large-user-profile">
                <img
                    src={getProfilePicture(this.props.user, false, 128)}
                    alt="avatar"
                />
                <Grid gap={10} className="info">
                    <div>
                        <span>{this.props.user.name}</span>
                        <span className="discriminator">#{this.props.user.discriminator}</span>
                    </div>
                    <div className="badges">
                        {Object.keys(DiscordFlags)
                            .filter(flag_key => this.props.user.public_flags & DiscordFlags[flag_key])
                            .map(flag_key => {
                                return <img
                                    key={"badge-"+flag_key}
                                    width={28}
                                    height={28}
                                    src={`https://discord.com/assets/${DiscordBadges[flag_key].img}.svg`}
                                    alt={DiscordBadges[flag_key].name}
                                />
                            }
                        )}
                    </div>
                </Grid>
            </div>
        )
    }
}