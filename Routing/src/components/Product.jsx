import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useParams } from "react-router-dom";
import ProductList from "./ProductList";

const Product = () => {
  const [data, setData] = useState([]);
  const { id } = useParams(); 

  useEffect(() => {
    async function fetch() {
      const result = await axios.get("https://fakestoreapi.com/products");
      setData(result.data);
    }
    fetch();
  }, []);

  return (
    <div>
      {!id && <ProductList data={data} />}
      <Outlet />
    </div>
  );
};

export default Product;
