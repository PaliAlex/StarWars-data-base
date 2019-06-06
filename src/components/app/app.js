import React, {Component} from 'react';
import Header from '../header';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import RandomPlanet from'../random-planet';
import ErrorBoundry from '../error-boundry'
import './app.css';
import {Record} from "../item-details/item-details";
import { PeoplePage, PlanetsPage, StarshipsPage, SecretPage, LoginPage } from '../pages';
import { PlanetDetails, StarshipDetails} from '../sw-components/details';

import {SwapiServiceProvider} from '../swapi-service-context';

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';



export default class App extends Component{

        swapiService = new SwapiService();
        state = {
            showRandomPlanet: true,
            hasError:false,
            isLoggedIn: false,
        };

        onLogin = () =>{
            this.setState({
                isLoggedIn:true
            })
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

            const {isLoggedIn} = this.state;
        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
                    <Router>
                        <div className="stardb-app">
                            <Header />
                            <RandomPlanet/>
                            <Switch>
                                <Route path="/"
                                       render={()=> <h2>Welcome to StarDB</h2> }
                                       exact/>

                                <Route path="/people/:id?" component={PeoplePage}/>


                                <Route path="/planets" exact component={PlanetsPage}/>
                                <Route path="/planets/:id"
                                       render={({match})=>{
                                           const {id}= match.params;
                                           return  <PlanetDetails itemId={id}/>
                                       }}
                                />


                                <Route path="/starships" exact component={StarshipsPage}/>
                                <Route path="/starships/:id"
                                render={({match})=>{
                                    const {id}= match.params;
                                  return  <StarshipDetails itemId={id}/>
                                }}
                                />
                                <Route path="/login"
                                       render={()=>(
                                    <LoginPage isLoggedIn={isLoggedIn}
                                                onLogin={this.onLogin}/>
                                       )}/>
                                <Route path="/secret"
                                       render={()=>(
                                    <SecretPage isLoggedIn={isLoggedIn}/>
                                       )} />
                                <Route render={() => <h2>Page not found</h2>}/>
                            </Switch>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    };
}