const reducer = (state, action) => {
    switch(action.type) {
        case 'UPDATE_PROMPT':
            return {
                ...state,
                prompt: action.payload
            }
        default:
            return state
    }
}

export default reducer