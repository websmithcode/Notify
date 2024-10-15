import { useState } from 'react';
import { NotificationData, NotificationParams, RemoveNotification, SendNotification, NotificationTypes } from './Notify'

export type Notify = SendNotification & {
  success: SendNotification;
  info: SendNotification;
  warning: SendNotification;
  error: SendNotification;

  remove: RemoveNotification;
  notifications: NotificationData[];
};

export function useNotify(): Notify {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const notify: Notify = (text: string, {
    type = "info",
    duration = 5000
  }: Partial<NotificationParams> = {}) => {
    const id = crypto.randomUUID();
    const notification = { id, text, type, duration };
    setNotifications([...notifications, notification]);
  }

  const wrapWithType = (type: NotificationTypes) => (text: string, params?: Partial<NotificationParams>) => notify(text, { ...params, type });

  notify.success = wrapWithType("success");
  notify.info = wrapWithType("info");
  notify.warning = wrapWithType("warning");
  notify.error = wrapWithType("error");

  notify.remove = (id: string) => {
    setNotifications(notifications => notifications.filter(n => n.id !== id));
  };

  notify.notifications = notifications;

  return notify;
}