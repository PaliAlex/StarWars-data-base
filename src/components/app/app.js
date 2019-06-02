import React, {Component} from 'react';

import Header from '../header';

import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import SwapiService from '../../services/swapi-service';

import ErrorBoundry from '../error-boundry'
import './app.css';
import ItemDetails , {Record} from "../item-details/item-details";
import { PersonList, PlanetList, StarshipList, PersonDetails, PlanetDetails, StarshipDetails} from '../sw-components/index'

import {SwapiServiceProvider} from '../swapi-service-context';


export default class App extends Component{

        swapiService = new SwapiService();
        state = {
            showRandomPlanet: true,
            hasError:false
        };

        toggleRandomPlanet = () =>
        {this.setState((state) => {
            return {
            showRandomPlanet: !state.showRandomPlanet
            }
            });
        };

        componentDidCatch(){
            this.setState({hasError:true});
        }
    render(){
           if (this.state.hasError){
                return <ErrorIndicator/>
            }
        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
                    <div className="stardb-app">
                        <Header />
                        <PersonDetails itemId={11}/>
                        <PersonList/>
                        <PlanetDetails itemId={1}/>
                        <PlanetList/>
                        <StarshipDetails itemId={11}/>
                        <StarshipList/>

                        {/*<PersonList/>*/}
                        {/*<PlanetList/>*/}
                        {/*<StarshipList/>*/}
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    };
}