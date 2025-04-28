import { useState } from "react";
import axios from "axios";

const useUpdateItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(null);

  const updateItem = async (id, itemData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const API_URL = import.meta.env.VITE_BACK_END_URL;
      const response = await axios.put(`${API_URL}/items/${id}`, itemData);
      setUpdatedItem(response.data);
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
    setUpdatedItem(null);
  };

  return { updateItem, loading, error, success, updatedItem, resetState };
};

export default useUpdateItem;
