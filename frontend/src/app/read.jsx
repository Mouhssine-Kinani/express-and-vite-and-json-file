import { useState, useEffect } from "react";
import useFetchAllItems from "../hooks/getAllItems.jsx";

function Read() {
  const { items, loading, error } = useFetchAllItems();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <h1>All items</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <h2>{item.title}</h2>
            {item.article}
          </li>
        ))}
      </ul>
    </>
  );
}
export default Read;
