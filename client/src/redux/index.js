const initial={
    statuses:[],
    search_metadata:{},
    loaded:0
}

export default function rootReducer(state=initial,{type,payload}){
    switch(type){
        case 'ADD-DATA':
            return {...payload};
        case 'ADD-LOADED-COUNT':
            let loadCount=state.loaded ? state.loaded+payload : payload
            return {...state, loadCount}
        default:
            return state;
}
}