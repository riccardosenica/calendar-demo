import React from 'react';
import Product from './Product';
import { useQuery, gql } from '@apollo/client';

const FEED_QUERY = gql`
  {
    allProducts{
      title
      qty
    }
  }
`;

const ProductList = () => {

  const { data } = useQuery(FEED_QUERY);

  console.log("Fah!", data);

  return (
    <div>
      {data.allProducts.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;