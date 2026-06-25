import React from 'react';
import Card from './Card';

const ProductList = ({ products, onAddToCart }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="product-list">
      {products.map((product) => (
        <Card
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          description={product.description}
          addToCart={() => onAddToCart(product)}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductList;
