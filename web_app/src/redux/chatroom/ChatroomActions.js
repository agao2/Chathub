import axios from 'axios'

export const actions = {
    CREATE_CHATROOM: "ADD CONNECTION",
    GET_CHATROOMS: "GET CHATROOMS",
    REQUEST_FAILED: "REQUEST FAILED",
    REQUEST_SUCESS: "REQUEST SUCCESS"
}


export const createChatroom = chatroom => ({
    type: actions.CREATE_CHATROOM,
    chatroom: chatroom
})

export const getChatrooms = () => {
    return async (dispatch) => {
        dispatch({ type: actions.GET_CHATROOMS})
        try {
            const res = await axios.get('/api/chatrooms');
            return dispatch({ type: actions.REQUEST_SUCESS, chatrooms: res.data })
        } catch (err) {
            return dispatch({ type: actions.REQUEST_FAILED, chatrooms: {} })
        }
    }
}