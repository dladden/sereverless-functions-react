//This example combines the airtable logic and the product logic into one function
require("dotenv").config();
const Airtable = require("airtable-node");
//using air table
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base("appYTk17DlQj5jWth")
  .table("products");

//Using the "event" object
exports.handler = async (event, context, cb) => {
  //event log shows information about the object
  //   console.log(event);
  //   console.log(context);
  const { id } = event.queryStringParameters; //query the string parameters (object always exists) but checking the id!
  if (id) {
    try {
      const product = await airtable.retrieve(id); //awaiting response from airtable with id
      // console.log(product);
      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with id "${id}" was found`, //awaiting response no product was found
        };
      }
      return {
        statusCode: 200,
        //(not that the final data is not destructured and raw if the id checks-out)
        body: JSON.stringify(product), //if id exists this is the out put
      };
    } catch (error) {
      return {
        statusCode: 404,
        body: `Error, no product with id "${id}" was found`,
      };
    }
  }
  try {
    const { records } = await airtable.list();
    // console.log(data);
    const products = records.map((product) => {
      const { id } = product;
      const { name, image, price } = product.fields;
      const url = image[0].url;
      return { id, name, url, price };
    });
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Server Error",
    };
  }
};
