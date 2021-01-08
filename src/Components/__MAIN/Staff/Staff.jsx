import React, { PureComponent } from 'react'
import {Link} from 'react-router-dom'
import {Modal} from 'react-bootstrap'

//UTILITIES
import {getExams, postExam} from '../../../UTILITIES/Fetch/Fetch'

//STYLE
import './Staff.scss'
import Layout from '../../_GENERAL_SUBCOMPONENTS/Layout/Layout'


export default class Staff extends PureComponent {

    state={
        showExams : false,
        sideBar : false,
        exams:[],
        newExam : {
            candidateName : '',
            name: '',
            quantity: ''
        },
        showModal: false
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

    fillForm = (e) => {
        let newExam = {...this.state.newExam},
            currentId = e.currentTarget.id
        newExam[currentId] = e.currentTarget.value
        this.setState({newExam : newExam})
    }

    showModal(){
        this.setState({showModal : !this.state.showModal})
    }

    postExam = async () => {
        await postExam(process.env.REACT_APP_SERVER_OFFLINE, this.state.newExam)
        let exams = await getExams(process.env.REACT_APP_SERVER_OFFLINE)
        await this.setState({exams : exams})
        await this.setState({showModal : !this.state.showModal})
    }

    componentDidMount = async () => {
        setTimeout(() => {
            this.setState({sideBar : true})
        }, 500);
        let exams = await getExams(process.env.REACT_APP_SERVER_OFFLINE)
        this.setState({exams : exams})
    }

    componentDidUpdate = (prevProps, prevState) =>{
        if (prevState.exams !== this.state.exams) {
            
        }
    }

    render() {
        return (
            <div id='staff'>
                <Layout/>
                <Modal.Dialog style={{display : this.state.showModal? 'block' : 'none'}}>
                    <Modal.Header >
                        <Modal.Title>Add Exam </Modal.Title>
                        <button onClick={()=>this.showModal()}>x</button>
                    </Modal.Header>

                    <Modal.Body>
                        <label htmlFor="candidateName">Name</label>
                        <input type="text" id='candidateName' placeholder='Name' onChange={this.fillForm}/>
                        <label htmlFor="name">Type</label>
                        <input type="text" id='name' placeholder='Type' onChange={this.fillForm}/>
                        <label htmlFor="quantity">Questions</label>
                        <input type="number" id='quantity' onChange={this.fillForm}/>
                        <button onClick={()=>this.postExam()}>Create New Exam</button>
                    </Modal.Body>
                </Modal.Dialog>
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
                    <button onClick={()=>this.showModal()}>Add Exam</button>
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
