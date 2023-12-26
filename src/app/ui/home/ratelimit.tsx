'use client';

import { useState } from 'react';
import styles from './ratelimit.module.css';

export default function RateLimit() {
  const [limit, setLimit] = useState<boolean>(false);
  const getData = async () => {
    let status: number = 200;
    try {
      const response = await fetch('/api/demo');
      if (!response.ok) {
        throw new Error('Failed to fetch', { cause: response.status });
      }
      const data = await response.json();
      console.log(data);
      status = response.status;
    } catch (error: unknown) {
      if (error instanceof Error) {
        status = error.cause as number;
      }
    } finally {
      setLimit(status === 429)
    }
  }

  return (
    <div>
      <p className={styles.text}>RateLimit Demo</p>
      <button
        onClick={getData}
        className={styles.button}
      >
        FetchData from API
      </button>
      {limit && <p className={styles.limit}>Too many requests, Please try again later</p>}
    </div>
  )
}
