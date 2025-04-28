import { useState } from "react";
import axios from "axios";

const useDeleteItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);

  const deleteItem = async (id) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const API_URL = import.meta.env.VITE_BACK_END_URL;
      const response = await axios.delete(`${API_URL}/items/${id}`);
      setDeletedItem(response.data.item);
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
    setDeletedItem(null);
  };

  return { deleteItem, loading, error, success, deletedItem, resetState };
};

export default useDeleteItem;
