const reducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_DEST':
            return {
                ...state,
                dest: action.payload
            }
        case 'LOAD_GAME':
            return {
                ...state,
                game: action.payload
            }
        case 'UPDATE_PROMPT':
            return {
                ...state,
                prompt: action.payload
            }
        case 'TRIGGER_SUBMIT':
            return {
                ...state,
                submit: action.payload
            }
        default:
            return state
    }
}

export default reducer