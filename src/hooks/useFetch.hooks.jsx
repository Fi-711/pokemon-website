import { useState, useEffect } from 'react';
import axios from 'axios';

/*
  Axios based fetch hook for get requests - combined loading stater with a spinner
*/
export const useFetch = (url, initialValue) => {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { loading, data };
};
