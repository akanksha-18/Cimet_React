/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const ProductList = ({ data }) => {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {data.map(product => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              <h3>{product.title}</h3>
            </Link>
            <p>{product.description}</p>
            <img src={product.image} alt={product.title} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
