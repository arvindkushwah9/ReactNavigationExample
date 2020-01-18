const initState = {
  vegetables: [],
}

const VegetableReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_VEGETABLE':
      console.log('create project', action.project)
      return state
    case 'LIST_VEGETABLES':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default VegetableReducer