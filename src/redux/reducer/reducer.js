const initialState = {
  userPseudo: '',
  score: 0,
  increaseScore: 0,
  decreaseScore: 0,
  mission: '',
};

export default function appReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'USER_PSEUDO':
      nextState = {
        ...state,
        userPseudo: action.value,
      };
      return nextState;
    case 'SCORE':
      nextState = {
        ...state,
        score: action.value,
      };
      return nextState;
    case 'INCREASE_SCORE':
      nextState = {
        ...state,
        increaseScore: action.value,
      };
      return nextState;
    case 'DECREASE_SCORE':
      nextState = {
        ...state,
        decreaseScore: action.value,
      };
      return nextState;
    case 'MISSION':
      nextState = {
        ...state,
        mission: action.value,
      };
      return nextState;
    default:
      return state;
  }
}
