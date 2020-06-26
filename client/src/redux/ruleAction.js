export const addSearchedData=data=>{
    return {
        type:'ADD-DATA',
        payload:data
    }
}
export const loadedDataCount=data=>{
    return {
        type:'ADD-LOADED-COUNT',
        payload:data
    }
}