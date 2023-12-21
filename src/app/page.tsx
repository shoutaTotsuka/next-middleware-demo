import Link from 'next/link';
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Home</h2>
        <p>Next.js on Vercel Middleware demo.</p>
        <Link className={styles.link} href="/about">About</Link>
      </div>
    </main>

  )
}
