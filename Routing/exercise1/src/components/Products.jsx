import React from "react";
import { Link } from 'react-router-dom';


export default function Products() {
  const products = [
  {
    id: 101, name: "Astray red Dragonic",
  },
  {
    id: 102, name: "Ying Long"
  },
  {
    id: 103, name: "Star Destroyer"
  }
]
  return (
  <>
    <h2> Danh sách sản phẩm</h2>
    <ul>
      {products.map((p)=>(
        <li key = {p.id}>
          <Link to={`/san-pham/${p.id}`}>{p.name}</Link>
        </li>
      ))}
    </ul>
  </>
  )
}