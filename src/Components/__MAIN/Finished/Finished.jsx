import React, { PureComponent } from 'react'

//UTILITIES
import {getExams} from '../../../UTILITIES/Fetch/Fetch'

//PErSONAL COMPONENTS
import Layout from '../../_GENERAL_SUBCOMPONENTS/Layout/Layout'
//STYLE
import './Finished.scss'

export default class Finished extends PureComponent {

    state={
        exam:{},
        questions:[],
        correctAnswers:[],
        userAnswers:[]
    }

    getExamDetail = async () => {
        let id = this.props.match.params.examId,
            allAnswers = [],
            correctAnswers = [],
            userAnswersIndex = [],
            userAnswers = []
            
        let result = await getExams(process.env.REACT_APP_SERVER_OFFLINE, id),
            questions = result.questions,
            answerList = result.answerList
            answerList.map( item => userAnswersIndex.push(item.answer))
            questions.map( quest => allAnswers.push(quest.answers))
            
            allAnswers.map( array => {
                let correct = array.find( answer => answer.isCorrect === true)
                correctAnswers.push(correct)   
            })

            allAnswers.map( (array, index) => {
                let user = array[userAnswersIndex[index]]
                userAnswers.push(user)
            })

        console.log(correctAnswers, userAnswers)
        this.setState({exam : result, questions: questions, correctAnswers : correctAnswers, userAnswers : userAnswers})
    }

    componentDidMount(){
        this.getExamDetail()
    }

    render() {
        return (
            <div className='finished-exam'>
                <Layout/>
                <div className="result">
                    <div className="exam-info">
                        <p>Exam Info</p>
                        <ul>
                            <li>Name : <br/><span>{this.state.exam.candidateName}</span></li>
                            <li>Exam ID : <br/><span>{this.state.exam.id}</span></li>
                            <li>Time : <br/><span> of {parseInt(this.state.exam.examDuration) / 60} : {parseInt(this.state.exam.examDuration) % 60 === 0 ? '00' : parseInt(this.state.exam.examDuration) % 60}</span></li>
                            <li>Questions : <br/><span>{this.state.exam.quantity}</span> </li>
                        </ul>
                    </div>
                    <div className="exam-result">
                        <ul className='questions-list'>
                            {this.state.questions.map((quest, index) => {
                                return(
                                    <li key={index}>
                                        <div className="list-header">
                                            <span>{index + 1}</span>
                                            <span> {quest.text}</span>
                                        </div>
                                        <div className="answers">
                                            <span>Correct : <button>{this.state.correctAnswers[index].text}</button></span>
                                            <span>Your : 
                                                <button 
                                                    style={{color: this.state.correctAnswers[index] === this.state.userAnswers[index] ? '#00f75e' : 'red', 
                                                    borderColor : this.state.correctAnswers[index] === this.state.userAnswers[index] ? '#00f75e' : 'red'}}
                                                >
                                                    {this.state.userAnswers[index].text}
                                                </button></span>
                                        </div>
                                    </li>
                                )
                            })}
                            <li className='score'><span>Score : </span> <span>{this.state.exam.actualScore}</span> </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
