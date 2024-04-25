import styles from './styles.module.scss';

export default function Payment() {
  return (
    <div className={styles.footer__payment}>
        <h3>WE ACCEPT</h3>
        <div className={styles.footer__flexwrap}>
            <img src='../../../images/payment/bkash.webp' alt=''/>
            <img src='../../../images/payment/rocket.webp' alt=''/>
            <img src='../../../images/payment/nagad.webp' alt=''/>
        </div>
    </div>
  )
}
