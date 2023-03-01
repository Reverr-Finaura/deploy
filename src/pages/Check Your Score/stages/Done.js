import { useNavigate } from "react-router-dom";
import styles from "./stages.module.css";

const Done = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.stages_done}>
      <div className={styles.done_img}>
        <img className="" src="/images/Algo-confirm.png" alt="" />
      </div>
      <div className={styles.done_message}>
        <h3>Thank you for filling up !</h3>
        <p>
          Wait for your Start-up to get reviewed by us ! We will get back to you
          in 24 hours.
        </p>
        <button onClick={() => navigate("/dashboard")}>Visit Dashboard</button>
      </div>
    </div>
  );
};

export default Done;
