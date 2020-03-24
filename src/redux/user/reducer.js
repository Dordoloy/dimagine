const initialState = {userPseudo: ''};

export default function userPseudoReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'USER_PSEUDO':
      nextState = {
        ...state,
        userPseudo: action.value,
      };
      return nextState;
    default:
      return state;
  }
}
