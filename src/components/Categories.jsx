import React from 'react';

const Categories = React.memo(function Categories({ items, onClickCategory, activeCategory }) {
  const onSelectItem = (index) => {
    onClickCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        <li
          className={activeCategory === null ? 'active' : null}
          onClick={() => onSelectItem(null)}>
          Все
        </li>
        {items &&
          items.map((name, index) => (
            <li
              onClick={() => onSelectItem(index)}
              className={activeCategory === index ? 'active' : null}
              key={`${name}_${index}`}>
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
});
export default Categories;
