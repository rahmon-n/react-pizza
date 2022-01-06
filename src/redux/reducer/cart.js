const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => sum + obj.price, 0);

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_PIZZA_CART':
      const currentPizzaItems = !state.items[action.payload.id]
        ? [action.payload]
        : [...state.items[action.payload.id].items, action.payload];

      const newItems = {
        ...state.items,
        [action.payload.id]: {
          items: currentPizzaItems,
          totalPrice: getTotalPrice(currentPizzaItems),
        },
      };

      const items = Object.values(newItems).map((obj) => obj.items);
      const allPizzas = [].concat.apply([], items);

      return {
        ...state,
        items: newItems,
        totalCount: allPizzas.length,
        totalPrice: getTotalPrice(allPizzas),
      };
    default:
      return state;
  }
}

export default cartReducer;
