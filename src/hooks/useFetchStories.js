import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function useFetchStories(token) {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStories = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://storytymeai-e64xw.ondigitalocean.app/api/my-stories?page=${page}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      // Assuming the response structure is:
      // {
      //   "status": "success",
      //   "data": {
      //     "stories": [...],
      //     "pagination": {...}
      //   }
      // }
      if (response.data && response.data.status === "success") {
        setApiData(response.data);
      } else {
        setError("Failed to fetch stories: Invalid response");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  }, [token]);

  const refetchStories = useCallback((page = 1) => {
    return fetchStories(page);
  }, [fetchStories]);

  useEffect(() => {
    if (token) {
      fetchStories();
    } else {
      setError("No token found. Unable to fetch stories.");
    }
  }, [token, fetchStories]);

  return { 
    apiData, 
    loading, 
    error, 
    refetchStories 
  };
}