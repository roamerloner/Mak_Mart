import Link from 'next/link';
import styles from './styles.module.scss';

export default function Ad() {
  return (
    <Link href="/browse">
        <div classname="{styles.ad}"> </div>
    </Link>
  )
}
