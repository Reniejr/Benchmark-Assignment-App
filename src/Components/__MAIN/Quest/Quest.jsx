import React, { PureComponent } from 'react'
import {Link, useHistory} from 'react-router-dom'

//UTILITIES
import { getQuest, postAnswer } from '../../../UTILITIES/Fetch/Fetch'
import Layout from '../../_GENERAL_SUBCOMPONENTS/Layout/Layout'

//STYLE
import './Quest.scss'

export default class Quest extends PureComponent {

    state={
        quest:{},
        answersList:[],
        duration:0,
        chooseAnswer: {
            answer : 0
        }
    }

    goToFinish = () => {
        this.props.history.push(`/exam/${this.props.match.params.examId}/finished`)
    }

    getQuest = async () => {
        let id = this.props.match.params.examId
        let questIndex = this.props.match.params.questIndex
        if (this.questIndex > 4) {
            this.setState({quest : null, answersList: null, duration: null})
        }else{
            let quest = await getQuest(process.env.REACT_APP_SERVER_OFFLINE, id, questIndex)
            this.setState({quest : quest, answersList : quest.answers, duration: quest.duration})
        }
    }

    timer = (duration) => {
        setInterval(() => {
            this.setState({duration : this.state.duration - 1})
        }, 1000);
    }

    answer = async (answer) => {
        await this.setState({chooseAnswer : {answer : answer}})
        let id = this.props.match.params.examId
        let questIndex = this.props.match.params.questIndex
        await postAnswer(process.env.REACT_APP_SERVER_OFFLINE, id, questIndex, this.state.chooseAnswer)
        questIndex > 4
        ? await this.setState({quest: null})
        : await this.getQuest()
    }

    componentDidMount = async () => {
        let id = this.props.match.params.examId
        let questIndex = this.props.match.params.questIndex
        questIndex > 4
        ? this.setState({quest : null})
        : await this.getQuest()
        this.timer(this.state.duration)
        
    }
    componentDidUpdate = async (prevProps, prevState) => {
        if (prevState.duration !== this.state.duration && prevState.quest !== this.state.quest) {
            if (this.state.duration === 0) {
                let randomNumber = Math.floor(Math.random()*4)
                this.answer(randomNumber)
                await this.props.history.push(`/exam/${this.props.match.params.examId}/quest/${parseInt(this.props.match.params.questIndex) +1}`)
            } 
        }
        if (this.props.match.params.questIndex > 4) {
            let id = this.props.match.params.examId
            let questIndex = '4'
            await postAnswer(process.env.REACT_APP_SERVER_OFFLINE, id, questIndex, this.state.chooseAnswer)
            await this.props.history.push(`/exam/${this.props.match.params.examId}/finished`)
        }
    }

    render() {
        // console.log(this.props)
        let examId = this.props.match.params.examId
        let questIndex = this.props.match.params.questIndex
        return (
            <div className='quest'>
                <Layout/>
                {this.state.quest !== null
                    ? <div className="question-block">
                            <h1>Question n {parseInt(questIndex) +1}</h1>
                            <div className='timer'>
                                <p>{this.state.duration? this.state.duration : 0}</p>
                            </div>
                            <p className='question'>{this.state.quest.text}</p>
                            {this.state.answersList
                                ? this.state.answersList.map( (answer, index) => {
                                return(
                                    <Link key = {index} to={`/exam/${examId}/quest/${parseInt(questIndex) +1}`} onClick={()=>this.answer(index)}>{answer.text}</Link>
                                    )
                                })
                                : <p></p>
                            }
                        </div>
                    : <Link to={`/exam/${examId}/finished`} className='results-page'>Go to Result</Link>
                }
            </div>
        )
    }
}
