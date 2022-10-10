import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Product = () => {
  const [loading, setLoading] = useState(true); //setting up the values for loading view
  const [product, setProduct] = useState(null); //setting up product view first as null
  //   const data = useParams(); //getting back the object data with fetch request set up in index.js
  //     console.log(data);
  const { productID } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/products?id=${productID}`);
      setProduct(data); //the data is still not detructured as it is in the field portion
    } catch (error) {}
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="section section-center">
        <h2>loading...</h2>
      </section>
    );
  }
  const { fields } = product;
  const { name, desc, image, price } = fields; //data fetch from the fields
  //   console.log(name);//checking if we have access to the data
  return (
    <section className="section section-center">
      <Link to="/" className="link">
        back home
      </Link>
      <div className="title">
        <h2>{name}</h2>
      </div>
      <article className="single-product">
        <img className="single-product-img" src={image[0].url} alt={name} />
        <div>
          <h5>{name}</h5>
          <h5 className="price">${price}</h5>
          <p>{desc}</p>
        </div>
      </article>
    </section>
  );
};

export default Product;
