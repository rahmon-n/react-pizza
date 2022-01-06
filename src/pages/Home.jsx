import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Categories, PizzaBlock, SortPopup } from '../components';
import LoadingBlock from '../components/PizzaBlock/LoadingBlock';
import { addPizzaToCart } from '../redux/actions/cart';
import { setCategory, setSortBy } from '../redux/actions/filters';
import { fetchPizzas } from '../redux/actions/pizzas';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности', type: 'popular', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавиту', type: 'name', order: 'asc' },
];

const Arr = Array(12).fill(0);

function Home() {
  const dispatch = useDispatch();
  const pizzas = useSelector(({ pizzasReducer }) => pizzasReducer.pizzas);
  const cartItems = useSelector(({ cartReducer }) => cartReducer.items);
  const isLoaded = useSelector(({ pizzasReducer }) => pizzasReducer.isLoaded);
  const { category, sortBy } = useSelector(({ filtersReducer }) => filtersReducer);

  useEffect(() => {
    dispatch(fetchPizzas(category, sortBy));
  }, [category, sortBy, dispatch]);

  const onSelectCategory = React.useCallback((index) => dispatch(setCategory(index)), [dispatch]);
  const onSelectSort = React.useCallback((type) => dispatch(setSortBy(type)), [dispatch]);
  const addPizzaHandler = (obj) => dispatch(addPizzaToCart(obj));

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories
            activeCategory={category}
            onClickCategory={onSelectCategory}
            items={categoryNames}
          />
          <SortPopup items={sortItems} activeSortType={sortBy.type} onSelectSort={onSelectSort} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoaded
            ? pizzas.map((pizza) => (
                <PizzaBlock
                  onAddPizzaToCart={addPizzaHandler}
                  key={pizza.id}
                  {...pizza}
                  cartItems={cartItems[pizza.id] ? cartItems[pizza.id].items : null}
                />
              ))
            : Arr.map((_, index) => <LoadingBlock key={index} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
