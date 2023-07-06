import style from "./NotificationCard.module.css"
import profile from "../../images/notification-gurl.png"

export default function NotificationCard(){
    return(
        <div className={style.notificationCard}>
            <div className={style.notificationImg}>
                <img className={style.image} src={profile}/>
            </div>

            <div className={style.notificationContent}>
                <div className={style.upperPart}>
                    <h3 className={style.heading}>Jatin Khurana</h3>
                    <small className={style.date}>2 min ago</small>
                </div>
                    <p className={style.para}>Something about this song really puts time into perspective. I remember listening to Robbers a borderline unhealthy amount when I was a teenager.</p>
            </div>
        </div>
    )
}