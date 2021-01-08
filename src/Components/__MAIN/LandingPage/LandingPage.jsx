import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom'


import Layout from '../../_GENERAL_SUBCOMPONENTS/Layout/Layout'

//STYLE
import './LandingPage.scss'

export default class LandingPage extends PureComponent {

    state={
        login: false,
        welcome: true,
        credentials: {
            name: '',
            password: ''
        },
        user: ''
    }

    showLogin(user){
        this.setState({user: user, login: true})
    }

    hiddenLogin(){
        this.setState({login: false})
    }



    fillForm = (e) => {
        let credentials = {...this.state.credentials},
            currentId = e.currentTarget.id
        credentials[currentId] = e.currentTarget.value
        this.setState({credentials : credentials})
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({welcome: false})
        }, 5500)
    }

    render() {
        return (
            <>
            <div className="welcome" style={{display: this.state.welcome? 'flex' : 'none'}}>
                <pre>...Hello Striver</pre>
            </div>
            <div id='landing-page' style={{opacity: this.state.welcome? '0' : '1'}}>
                <Layout/>
                <div className="staff-candidate">
                    <div className="staff" onClick={()=>this.showLogin('staff')}>
                        <p>Staff</p>
                    </div>
                    <div className="candidate" onClick={()=>this.showLogin('candidate')}>
                        <p>Candidate</p>
                    </div>
                </div>
                <div className="login" style={{display: this.state.login? 'inline-flex' : 'none'}}>
                    <i className="fas fa-chevron-left" onClick={()=>this.hiddenLogin()}></i>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' onChange={this.fillForm} placeholder='Name'/>
                    <label htmlFor="password">Password/Token</label>
                    <input type="password" id='password' onChange={this.fillForm} placeholder='Password / Token'/>
                    {
                        this.state.user === 'staff'
                        ? <Link to={`/${this.state.credentials.password}`}>Confirm</Link>
                        : <Link to={`/exam/${this.state.credentials.password}`}>Confirm</Link>
                    }
                    
                    
                </div>
            </div>
            </>
        )
    }
}
