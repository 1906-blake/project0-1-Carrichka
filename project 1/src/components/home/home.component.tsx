import React from 'react';
import Logo from '../../assets/ExpeditionUnknown.png';

export class HomeComponent extends React.Component {
    render() {
        return ( 
            <img src={Logo} alt="Logo" />
        );
    }
}