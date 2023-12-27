'use client';

import { useState } from 'react';
import styles from './ratelimit.module.css';

export default function RateLimit() {
  const [status, setStatus] = useState<number | null>();
  const getData = async () => {
    setStatus(100);
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
      <p className={styles.text}>RateLimit Demo (5 requests from the same IP in 10 seconds.)</p>
      <button
        onClick={getData}
        className={styles.button}
      >
        FetchData from API
      </button>
      {
        status === 429 ? <p className={styles.status}><span className={styles.limit}>{status} Too many requests, Try again later.</span></p> :
        status === 200 ? <p className={styles.status}><span className={styles.ok}>{status}</span></p> :
        status === 100 ? <p className={styles.status}><span className={styles.loading}></span></p>
                       : <p className={styles.status}><span className={styles.default}>{status}</span></p>
      }
    </div>
  )
}
