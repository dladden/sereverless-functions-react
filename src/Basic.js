import React, { useEffect, useState } from "react";
import axios from "axios"; //used for fetch requests
const url = "https://sereverless.netlify.app/api/2-basic-api";
//In this example the serverless functions are not used, the data is directly fetched and destructured
//note that with a react application there are 125000 free request after that it is a paid service
const Basic = () => {
  const [products, setProducts] = useState([]); //setting up state for products first equal to empty array

  const fetchData = async () => {
    //this try catch block destructure the data from axios since it resides there as raw data
    try {
      const { data } = await axios.get(url);
      setProducts(data);
    } catch (error) {}
  }; //end fetchData

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="section section-center">
      <div className="title">
        <h2>Basic API (No Functions Needed):</h2>
      </div>
      {/* mapping and destructuring the data*/}
      <div className="products">
        {products.map((product) => {
          const {
            id,
            image: { url },
            price,
            name,
          } = product;
          return (
            <article className="product" key={id}>
              <img src={url} alt={name} />
              <div className="info">
                <h5>{name}</h5>
                <h5 className="price">${price}</h5>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Basic;
