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
      <p className={styles.text}>RateLimit Demo</p>
      <button
        onClick={getData}
        className={styles.button}
      >
        FetchData from API
      </button>
      {
        status === 429 ? <p className={styles.text}><span className={styles.limit}>{status} Too many requests.</span></p> :
        status === 200 ? <p className={styles.text}><span className={styles.ok}>{status}</span></p> :
        status === 100 ? <p className={styles.text}><span className={styles.loader}></span></p>
                       : <p className={styles.text}><span className={styles.default}>{status}</span></p>
      }
    </div>
  )
}
