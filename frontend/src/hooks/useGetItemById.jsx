import { useState, useEffect } from "react";
import axios from "axios";

const useGetItemById = (id) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchItem(id);
    }
  }, [id]);

  const fetchItem = async (itemId) => {
    setLoading(true);
    setError(null);
    try {
      const API_URL = import.meta.env.VITE_BACK_END_URL;
      const response = await axios.get(`${API_URL}/items/${itemId}`);
      setItem(response.data);
    } catch (error) {
      console.error(error);
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return { item, loading, error, fetchItem };
};

export default useGetItemById;
