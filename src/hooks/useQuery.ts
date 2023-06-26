import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useQuery<T>(query: string, variables: any = {}) {
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    setLoading(true);

    axios
      .post(
        process.env.GRAPHQL_URL ?? '/api/graphql',
        {
          query,
          variables,
        },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => {
        const { data } = response.data;

        if (data !== undefined && data !== null) {
          setData(data);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return { loading, data };
}
