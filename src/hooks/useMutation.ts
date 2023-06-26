import { useState } from 'react';
import axios from 'axios';

export default function useMutation(mutation: string) {
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [data, setData] = useState<any>(undefined);

  async function mutationOperation(variables: any = {}): Promise<void> {
    setLoading(true);
    const {
      data: { data },
    } = await axios.post(
      process.env.GRAPHQL_URL ?? '/api/graphql',
      {
        query: mutation,
        variables,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    if (data !== undefined && data !== null) {
      setData(data);
    }
    setLoading(false);
  }

  return {
    operation: mutationOperation,
    result: { loading, data },
  };
}
