import { useState, useEffect } from 'react';
import axios from 'axios';

/*
  Modified fetch hook using axios and a supplied parameter
*/
export const useFetchParam = (url, query = '', initialValue) => {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url, { params: { param: query } });
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
  }, [url, query]);

  return { loading, data };
};
