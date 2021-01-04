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

  console.log("Data:", data);

  if (data !== undefined) {
    return (
      <div>
        {
          data.allProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))
        }
      </div>
    );
  } else {
    return (
      <div>
        Rendering...
      </div>
    )
  }

};

export default ProductList;