import React from "react";
import {ReactComponent as GearBot} from "../SVG/gearbot.svg";
import {getString} from "../Language/LanguageHandler";

import "../scss/pages/login-required.scss"
import {loginUrl} from "../Other/Constants";

export default class LoginRequired extends React.Component {
    render()
    {
        return (
            <div className="page-login-required">
                <div className="show-off">
                    <div className="bg">
                        <GearBot className="svg_home-showoff-bg" />
                    </div>
                    <div className="content">
                        <div>
                            <h1>Login Required to Continue</h1>
                            <p>This page requires you to log into the dashboard before continuing.</p>
                            <a className="button primary" style={{width: "fit-content", marginTop: 20}} href={loginUrl}>
                                <span>Login</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
