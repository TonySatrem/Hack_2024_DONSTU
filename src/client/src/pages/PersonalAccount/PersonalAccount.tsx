import React from 'react'
import TeamMembers from "../../components/TeamMembers/TeamMembers";
import Banner from "../../components/Banner/Banner";
import CssBaseline from "@mui/material/CssBaseline";




export default function PersonalAccount() {
    return (
        <>
            <CssBaseline/>
            <br/>
            <Banner/>
            <br/>
            <TeamMembers/>
        </>
    )
}