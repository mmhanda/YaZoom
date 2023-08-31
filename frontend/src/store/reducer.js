
const initialState = {
  identity: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DUMMY_ACTION':
      return {
        ...state
      };
    default: return state;
  }
};

export default reducer;