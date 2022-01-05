const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_PIZZA_CART':
      const newItems = {
        ...state.items,
        [action.payload.id]: !state.items[action.payload.id]
          ? [action.payload]
          : [...state.items[action.payload.id], action.payload],
      };

      const allPizzas = [].concat.apply([], Object.values(newItems));

      return {
        ...state,
        items: newItems,
        totalCount: allPizzas.length,
        totalPrice: allPizzas.reduce((sum, obj) => sum + obj.price, 0),
      };
    default:
      return state;
  }
}

export default cartReducer;
