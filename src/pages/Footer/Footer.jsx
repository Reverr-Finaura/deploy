import React from "react";
import styles from "../Footer/footer.module.css";

const Footer = () => {
  return (
    // <div>
      <section id={styles.footer}>
        <div className={styles.footer__main}>
          <div className={styles.footer__main_left}>
            <div>
              <img
                // style={{ outerWidth: "70px" }}
                src="/images/logo.png"
                alt=""
              />
              <p className={styles.footer__main_brand_name}>Reverr</p>
            </div>
            <div className={styles.footer__main_brand_content}>
              <p>
                A highly scalable, fast and secure blockchain platform for
                distributed apps, enterprise use cases and the new internet
                economy.
                <br />
                <br />
                support@reverrapp.com
              </p>
            </div>
          </div>
          <div className={styles.footer__main_right}>
            <div className={styles.footer__main_links}>
              <div>
                <p>
                  <b>Quick Links</b>
                </p>
              </div>
              <div className={styles.footer__main_link}>
                <a href="/about">About</a>
              </div>
              <div className={styles.footer__main_link}>
                <a>Technology</a>
              </div>
              <div className={styles.footer__main_link}>
                <a href="/contactus">Contact</a>
              </div>
              <div className={styles.footer__main_link}>
                <a href="/blog">Blog</a>
              </div>
            </div>
            <div className={styles.footer__main_links}>
              <div>
                <p>
                  <b>Template</b>
                </p>
              </div>
              <div className={styles.footer__main_link}>
                <a>Licensing</a>
              </div>
              <div className={styles.footer__main_link}>
                <a>Styles Guide</a>
              </div>
              <div className={styles.footer__main_link}>
                <a>Changelog</a>
              </div>
            </div>
            <div className={styles.footer__main_social}>
              <div>
                <p>
                  <b>Social</b>
                </p>
              </div>
              <div className={styles.footer__main_social_links}>
                <div className={styles.footer__main_social_link}>
                  <a href="https://www.instagram.com/reel/CgXFLbqpY01/?igshid=YmMyMTA2M2Y=">
                    <img src="/images/image 11.png" alt="instagram" />
                  </a>
                </div>
                <div className={styles.footer__main_social_link}>
                  <a href="https://www.facebook.com/Reverr-104710632324714/">
                    <img src="./images/image 12.png" alt="facebook" />
                  </a>
                </div>
                <div className={styles.footer__main_social_link}>
                  <a>
                    <img src="/images/image 13.png" alt="twitter" />
                  </a>
                </div>
                <div className={styles.footer__main_social_link}>
                  <a href="https://www.linkedin.com/company/reverr/">
                    <img src="/images/image 14.png" alt="linkedIn" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    // </div>
  );
};

export default Footer;
