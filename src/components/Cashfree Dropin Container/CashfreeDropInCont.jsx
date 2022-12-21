
import { cashfreeSandbox, cashfreeProd } from 'cashfree-dropjs';
import { useState } from 'react';
import { dropinComponents } from './DropInComments';
import styles from "./CashfreeDropInCont.module.css"

function CashfreeDropInCont() {
  const [orderToken, setOrderToken] = useState('7RyleyCOzRftapYCmSDb');
  const [checkedState, setCheckedState] = useState(
    new Array(dropinComponents.length).fill(false)
  );
  const [style, setStyle] = useState({});
  const [isProd, setIsProd] = useState(false);
  const [components, setComponents] = useState([]);
  const cbs = (data) => {
    if (data.order && data.order.status === 'PAID') {
      alert('order is paid. Call api to verify');
    }
  };
  const cbf = (data) => {
    alert(data.order.errorText || 'OK');
  };
  const renderDropin = () => {
    if (orderToken === '') {
      alert('Order Token is empty');
      return;
    }
    if (!components.length) {
      alert('No drop in specified');
      return;
    }
    let parent = document.getElementById('drop_in_container');
    parent.innerHTML = '';
    let cashfree;
    if (isProd) {
      cashfree = new cashfreeProd.Cashfree();
    } else {
      cashfree = new cashfreeSandbox.Cashfree();
    }
    console.log('before Initialisation');
    cashfree.initialiseDropin(parent, {
      orderToken,
      onSuccess: cbs,
      onFailure: cbf,
      components,
      style
    });
    console.log('after Initialisation');
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    let comp = [];
    updatedCheckedState.forEach((item, index) => {
      if (item) {
        comp.push(dropinComponents[index].id);
      }
    });
    setComponents(comp);
  };

  const handleStyleChange = () => (e) => {
    setStyle({
      ...style,
      [e.target.id]: e.target.value
    });
  };
  return (
    <div className={styles.App}>
      <header className={styles.App_header}>
        <p
          className={styles.App_link}
        >
          Cashfree Dropin
        </p>
      </header>
      <div className={`${styles.mt_1} ${styles.mb_1}`}>
        <span className={`${styles.order_token} ${styles.mr_8}`}>Order Token :</span>
        <input
          type="text"
          placeholder="order_token"
          id="orderToken"
          value={orderToken}
          className={styles.inputText}
          onChange={(e) => setOrderToken(e.target.value)}
        />
      </div>
      <p className={styles.order_token}>Choose components</p>
      <ul className={styles.toppings_list}>
        {dropinComponents.map(({ name, id }, index) => {
          return (
            <>
              <input
                type="checkbox"
                id={`custom-checkbox-${index}`}
                name={name}
                value={id}
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
                key={id}
              />
              <label className={styles.mr_8} htmlFor={`custom-checkbox-${index}`}>
                {name}
              </label>
            </>
          );
        })}
      </ul>
      <div style={{display:"none"}}>
        <p className={styles.order_token}>Style your Dropin</p>
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="backgroundColor"
          key="backgroundColor"
          placeholder="Background Color"
          onChange={handleStyleChange()}
        />
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="theme"
          key="theme"
          placeholder="Theme"
          onChange={handleStyleChange()}
        />
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="color"
          key="color"
          placeholder="Color"
          onChange={handleStyleChange()}
        />
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="errorColor"
          key="errorColor"
          placeholder="Error Color"
          onChange={handleStyleChange()}
        />
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="fontSize"
          key="fontSize"
          placeholder="Font Size"
          onChange={handleStyleChange()}
        />
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="fontFamily"
          key="fontFamily"
          placeholder="Font Family"
          onChange={handleStyleChange()}
        />
      </div>
      <div className={styles.mt_2}>
        <input
          type="checkbox"
          name="prod"
          id="prod-check"
          checked={isProd}
          onChange={() => setIsProd(!isProd)}
        />
        <label className={styles.mr_8} htmlFor="prod-check">
          Production Mode
        </label>
      </div>
      <button className={`${styles.btn_render} ${styles.mt_2}`} onClick={renderDropin}>
        Render
      </button>
      <div
        className={styles.dropin_parent}
        id="drop_in_container"
      >
        Your component will come here
      </div>
    </div>
  );
}

export default CashfreeDropInCont;
