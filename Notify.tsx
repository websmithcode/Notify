import { useEffect, useRef, useState } from "react";
import styles from "./style.module.css"
import clsx from "clsx";

export type NotificationTypes = "success" | "info" | "warning" | "error";
export type NotificationParams = {
  type: NotificationTypes;
  duration: number;
}
const NotificationTypesObj = {
  success: styles.success,
  info: styles.info,
  warning: styles.warning,
  error: styles.error
};

export type NotificationData = {
  id: string;
  text: string;
} & NotificationParams;

export type SendNotification = (text: string, params?: Partial<NotificationParams>) => void;
export type RemoveNotification = (id: string) => void;

export const Notification = ({ notification, removeNotification: remove }: {
  notification: NotificationData,
  removeNotification: RemoveNotification
}) => {
  const [isShown, setIsShown] = useState(true);
  const [height, setHeight] = useState(0);

  const el = useRef<HTMLDivElement>(null);
  const typeClass = NotificationTypesObj[notification.type];

  const removeNotification = () => {
    if (!isShown) return; // Prevent double click

    setIsShown(false);
    el.current?.addEventListener("animationend", () => remove(notification.id), { once: true });
  }

  useEffect(() => {
    setHeight(el.current?.querySelector("div")?.clientHeight ?? 0);
    const timeout = setTimeout(removeNotification, notification.duration);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className={clsx(
      styles.notificationContainer,
      { [styles.hideNotificationContainer]: !isShown }
    )}
      style={{
        height: height + 10,
      }}
      ref={el}
    >
      <div className={clsx(
        styles.notification,
        typeClass,
      )}>
        <p>{notification.text}</p>
        <button title="Close Notification" onClick={removeNotification}>X</button>
      </div>
    </div>
  );
}

export const NotificationsContainer = ({
  notifications,
  removeNotification
}: {
  notifications: NotificationData[],
  removeNotification: RemoveNotification
}) => {
  return (
    <div className={clsx(styles.notificationsContainer)}>
      {notifications.map(n => (
        <Notification key={n.id} notification={n} removeNotification={removeNotification} />
      ))}
    </div>
  );
}

