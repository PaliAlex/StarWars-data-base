import React from 'react';
import {PlanetList } from '../sw-components';
import {withRouter} from 'react-router-dom';

    const PlanetsPage = ({history})=>{
        return(
            <PlanetList
                onItemSelected={(itemId)=>{
                    const newPath = itemId;
                    history.push(newPath);
                }} />
        );
    };


export default withRouter(PlanetsPage);