import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom'

//UTILITIES
import {getExams} from '../../../UTILITIES/Fetch/Fetch'

//STYLE
import './Staff.scss'
import Layout from '../../_GENERAL_SUBCOMPONENTS/Layout/Layout'


export default class Staff extends PureComponent {

    state={
        showExams : false,
        sideBar : false,
        exams:[]
    }

    showExams(){
        this.setState({showExams : true})
        const exams = document.querySelectorAll('.exam')
        let timeout = 0
        exams.forEach(item => {
            setTimeout(() => {
                item.style.marginLeft = '0'
            }, timeout);
            timeout = timeout + 200
        })
    }

    componentDidMount = async () => {
        setTimeout(() => {
            this.setState({sideBar : true})
        }, 500);
        let exams = await getExams(process.env.REACT_APP_SERVER_OFFLINE)
        this.setState({exams : exams})
    }

    render() {
        return (
            <div id='staff'>
                <Layout/>
                <nav className='side-bar' style={{right: this.state.sideBar? '0' : ''}}>
                    <div className="staff-info">
                        <div className="info">
                            <ul>
                                <li>Name</li>
                                <li>Lastname</li>
                                <li>Role</li>
                            </ul>
                        </div>
                        <div className="picture">
                            <img src="" alt=""/>
                        </div>
                    </div>
                    <ul className='batch-list'>
                        <li onClick={() => this.showExams()}>batch</li>
                        <li>batch</li>
                        <li>batch</li>
                        <li>batch</li>
                    </ul>
                </nav>
                <ul className='exam-list'>
                    {this.state.exams.map(exam => {
                        return(
                            <li className='exam' key={exam.id}>
                                <span>{exam.candidateName}</span>
                                <span>{exam.name}</span>
                                <span>{parseInt(exam.examDuration) / 60} : {parseInt(exam.examDuration) % 60 === 0 ? '00' : parseInt(exam.examDuration) % 60}</span>
                                <span style={{color: exam.isCompleted? '#00ff84' : 'red'}}>{exam.isCompleted? 'Completed' : 'Not Completed'}</span>
                                <span>{exam.quantity} questions</span>
                                <span><Link to={`/exam/${exam.id}`}>SHOW</Link></span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
