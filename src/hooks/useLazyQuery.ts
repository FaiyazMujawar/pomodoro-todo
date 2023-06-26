import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useLazyQuery<T>(query: string) {
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [data, setData] = useState<T | undefined>(undefined);

  async function lazyQueryOperation(variables: any = {}) {
    setLoading(true);
    const { data } = await axios.post(
      process.env.GRAPHQL_URL ?? '/api/graphql',
      {
        query,
        variables,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (data.data !== undefined && data.data !== null) {
      setData(data.data);
    }
    setLoading(false);
  }

  return {
    operation: lazyQueryOperation,
    result: { loading, data },
  };
}
