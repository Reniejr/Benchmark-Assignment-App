import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom'
import { getExams } from '../../../../UTILITIES/Fetch/Fetch'

//PERSONAL COMPONENTS
import Layout from '../../../_GENERAL_SUBCOMPONENTS/Layout/Layout'

//STYLE
import './HomePage.scss'

export default class HomePage extends PureComponent {

    state={
        exam:{},
        show: false
    }

    getExamDetail = async () => {
        let id = this.props.match.params.examId
        let result = await getExams(process.env.REACT_APP_SERVER_OFFLINE, id)
        this.setState({exam : result})
    }

    componentDidMount(){
        this.getExamDetail()
        setTimeout(() => {
            this.setState({show : true})
        }, 500);
    }

    render() {
        return (
            <div id='homepage'>
                <Layout/>
                <div className="exam-details" style={{opacity: this.state.show? '1' : '0'}}>
                    <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1189.89 330.82"><defs></defs><polyline class="cls-1" points="0.39 330.5 270.39 0.5 1189.89 0.5"/></svg>
                    <svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1189.89 330.82"><defs></defs><polyline class="cls-1" points="0.39 330.5 270.39 0.5 1189.89 0.5"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1189.89 330.82"><defs></defs><g id="Livello_2" data-name="Livello 2"><g id="Down"><polyline class="cls-1" points="0.39 0.32 270.39 330.32 1189.89 330.32"/></g></g></svg>                
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1189.89 330.82"><defs></defs><g id="Livello_2" data-name="Livello 2"><g id="Down"><polyline class="cls-1" points="0.39 0.32 270.39 330.32 1189.89 330.32"/></g></g></svg>                
                    <p className='infos'>Candidate <br/><span>{this.state.exam.candidateName}</span> </p>
                    <p className='infos'>Id exam <br/><span style={{fontSize: '1.5rem'}}>{this.state.exam.id}</span> </p>
                    <p className='infos'><span>{parseInt(this.state.exam.examDuration) / 60} : {parseInt(this.state.exam.examDuration) % 60 === 0 ? '00' : parseInt(this.state.exam.examDuration) % 60}</span> <br/> Duration</p>
                    <p className='infos'><span>{this.state.exam.quantity}</span> <br/> Questions </p>
                    <div className="title">
                        <h1>{this.state.exam.name}</h1>
                        {this.state.exam.isCompleted 
                        ? <p style={{color: '#00ff84'}}>Completed</p>
                        : <p style={{color: 'red'}}>Not Completed</p>
                        }
                    </div>
                </div>
                <div className="start">
                    <Link to={`/exam/${this.state.exam.id}/quest/0`}>
                        Start
                    </Link>
                </div>
            </div>
        )
    }
}
