import { useState, useEffect } from "react";
import axios from "axios";

const useFetchAllItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const API_URL = import.meta.env.VITE_BACK_END_URL;
        const response = await axios.get(`${API_URL}/items`);
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { items, loading, error };
};

export default useFetchAllItems;
