import { useState } from "react";
import axios from "axios";

const useCreateItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [newItem, setNewItem] = useState(null);

  const createItem = async (itemData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const API_URL = import.meta.env.VITE_BACK_END_URL;
      const response = await axios.post(`${API_URL}/items`, itemData);
      setNewItem(response.data);
      setSuccess(true);
      return response.data;
    } catch (error) {
      console.error(error);
      setError(error.response ? error.response.data : error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setNewItem(null);
  };

  return { createItem, loading, error, success, newItem, resetState };
};

export default useCreateItem;
