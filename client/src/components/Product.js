import React from 'react';

const Product = (props) => {
    const { product } = props;
    return (
        <div>
            <div>
                <b>{product.title}</b>: only {product.qty}!
      </div>
        </div>
    );
};

export default Product;