import React from 'react';
import {useRedirect} from "../Hooks/useRedirect";
import "./Header.css"

const HeaderNav = () => {
    const redirect = useRedirect();
    return(
        <div id="Header">
            <div id="Logo" onClick={(e) => redirect("/")}>
                <img src="https://www.innocv.com/wp-content/uploads/2020/11/innocv_logo.svg" alt="Innocv logo"></img>
            </div>
        </div>
    )
}
export default HeaderNav;
