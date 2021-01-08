import React, { PureComponent } from 'react'
import {Switch, Route} from 'react-router-dom'

//PERSONAL COMPONENTS
import Quest from '../Quest/Quest'
import LandingPage from '../LandingPage/LandingPage'
import Staff from '../Staff/Staff'
import Finished from '../Finished/Finished'


//STYLE
import './RouterWeb.scss'
import HomePage from '../Candidate/HomePage/HomePage'

export default class RouterWeb extends PureComponent {
    render() {
        return (
            <div id='router-web'>
                <Switch>
                    <Route path='/' exact render={(props) => <LandingPage {...props}/>}/>
                    <Route path='/exam/:examId' exact render={(props) => <HomePage {...props}/>}/>
                    <Route path='/:userId' exact render={(props) => <Staff {...props}/>}/>
                    <Route path='/exam/:examId/quest/:questIndex' render={(props) => <Quest {...props}/>}/>
                    <Route path='/exam/:examId/finished' render={(props) => <Finished {...props}/>}/>
                </Switch>
            </div>
        )
    }
}
