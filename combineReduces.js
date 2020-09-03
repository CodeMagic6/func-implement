export default function combineReducers(reducers){
  return function combination(state = {}, action){
    let nextState = {}
    for(let key in reducers) {
      let recuder = reducers[key];
      nextState[key] = reducer(state[key], action);
      hasChanged = hasChanged || nextState[key] !== state[key];
    }
    hasChanged = hasChanged || Object.keys(state).length !== Object.keys(nextState).length;
    return hasChanged ? nextState: state;
  }
}
