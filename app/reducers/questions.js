import { questions as questionSet } from '../data/questions';
import { getRandomIndex } from '../util.js';
import { REDUCE_TRIES, SET_QUESTION, RESET, SET_ANSWERED } from '../actions/actions';

/**
 * 
 * @param {type} questions
 * @returns {randomQuestion.questionsAnonym$3}
 */
function randomQuestion(questions) {
    let
        currentIndex = getRandomIndex(questions),
        current = questions[currentIndex],
        unanswered = questions.filter((question, index) => {
            return index !== currentIndex;
        });
        
    current.triesLeft = triesAllowed(current);
    current.animate = true;
    current.answered = false;
    current.attempts = [];

    return { current: current, questions: unanswered };
}

/**
 * 
 * @param {Object} question
 * @returns {Number}
 */
function triesAllowed(question) {
    return (question.options.length - 1)
}

/**
 * 
 * @param {type} questionSet
 * @returns {setQuestion.state}
 */
function setInitialQuestion(questionSet) {
    return setQuestion(questionSet, []);
}

/**
 * 
 * @param {type} questionSet
 * @param {type} answeredQuestions
 * @returns {setQuestion.state}
 */
function setQuestion(questionSet, answeredQuestions) {

    let { current, questions} = randomQuestion(questionSet),
        answered = answeredQuestions,
        remaining = questions.length,
        state = { current, questions, answered, remaining };
   
    return state;
}

/**
 * 
 * @type setQuestion.state
 */
let initialState = setInitialQuestion(questionSet);

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ANSWERED:
            return Object.assign(state, { current : Object.assign(state.current,{answered:true,animate:false}) });
        case SET_QUESTION:
            let newState = setQuestion(state.questions, [...state.answered, state.current]);
            return newState;
        case REDUCE_TRIES:
            let newCurrentQuestionState = {
                triesLeft : state.current.triesLeft - 1,
                attempts : [...state.current.attempts,action.payload.attempt],
                animate:false
            }
            return Object.assign(
                state, 
                { 
                    current : Object.assign(state.current,newCurrentQuestionState) 
                }
            );
        case RESET:
            return setInitialQuestion(questionSet);
        default:
            return state;
    }
}