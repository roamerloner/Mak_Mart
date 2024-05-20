import styles from "./styles.module.scss";
import { BiRightArrowAlt } from "react-icons/bi";

export default function AnimatedBtn({ type, text, icon, effecttype }) {
  return (
	<button style={{ margin: "10px" }} className={styles.effect1}>
      {text}
    </button>
);
}
