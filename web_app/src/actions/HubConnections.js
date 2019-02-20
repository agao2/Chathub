export const addConnection = hubConnection => ({
    type: 'ADD CONNECTION', 
    connection: hubConnection
})

export const deleteConnection = hubConnection => ({
    type: 'DELETE CONNECTION', 
    connection: hubConnection
})