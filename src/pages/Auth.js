import React from 'react';
import {Outlet} from "react-router-dom";
import TimeStatus from "../layout/TimeStatus";
import XButton from "../ui/XButton";

const Auth = () => {
    return (
        <>
            <TimeStatus/>
            <XButton
                from={'auth'}
                ui={'<-'}
            />
            <Outlet/>
        </>
    );
};

export default Auth;