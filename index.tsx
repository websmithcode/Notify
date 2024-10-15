import { createContext, useContext, useState } from 'react';
import { NotificationsContainer, NotificationTypes } from './Notify'



const NotifyContext = createContext(null);
export const useNotify = () => useContext(NotifyContext);

export const NotificationsProvider = ({ children }) => {
  const notify = useNotify();

  return (
    <NotifyContext.Provider value={notify}>
      {children}
      <NotificationsContainer notifications={notify.notifications} removeNotification={notify.remove} />
    </NotifyContext.Provider>
  );
};

export { NotificationsContainer };
export type { NotificationTypes };