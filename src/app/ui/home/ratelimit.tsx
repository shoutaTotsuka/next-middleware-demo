'use client';

import { useState } from 'react';
import styles from './ratelimit.module.css';

export default function RateLimit() {
  const [status, setStatus] = useState<number | undefined>();
  const getData = async () => {
    try {
      const response = await fetch('/api/demo');
      if (response.ok) {
        setStatus(response.status);
      } else {
        throw new Error('Failed to fetch', { cause: response.status });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setStatus(error.cause as number);
      }
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
      {status === 429 ? <p className={styles.limit}>{status} Too many requests, Please try again later.</p>
                      : <p className={styles.ready}>{status}</p>
      }
    </div>
  )
}
