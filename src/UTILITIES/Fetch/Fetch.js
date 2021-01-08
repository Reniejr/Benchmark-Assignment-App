//GET FETCH
export const getExams = async (baseUrl, id) => {
    let url;
    id? url = `${baseUrl}${id}` : url = baseUrl
    let response = await fetch(url),
        result = await response.json()
    console.log(result)
    return result
}

//GET QUEST
export const getQuest = async (baseUrl, id, index) => {
    let url = `${baseUrl}${id}`
    let response = await fetch(url),
        result = await response.json(),
        quest = result.questions[index]
    console.log(quest)
    return quest
}

//POST ANSWER
export const postAnswer = async (baseUrl, id, quest, answer) => {
    let url = `${baseUrl}${id}/answer/?questIndex=${quest}`,
        response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(answer),
            headers : new Headers({
                'Content-Type' : 'application/json'
            })
        }),
        result = await response.json()
    console.log(result)
    return result
}