'use client';

import styles from './ratelimit.module.css';

export default function RateLimit() {
  const getData = async () => {
    try {
      const response = await fetch('/api/demo');
      if (!response.ok) {
        throw new Error('Failed to fetch', { cause: response });
      }
      const data = await response.json();
      console.log(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error);
        console.error(error.cause);
      }
    }
  }

  return (
    <div>
      <p className={styles.text}>RateLimit Demo</p>
      <button onClick={getData} className={styles.button}>FetchData from API</button>
    </div>
  )
}
