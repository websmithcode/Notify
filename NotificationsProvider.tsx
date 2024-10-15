import { createContext, ReactNode, useContext } from "react";
import { Notify, useNotify as useNotifyHook } from "./useNotify";
import { NotificationsContainer } from "./Notify";

const NotifyContext = createContext<Notify | null>(null);
export const useNotify = () => useContext(NotifyContext) as Notify;

interface NotificationsProviderProps {
  children: ReactNode;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({ children }) => {
  const notify = useNotifyHook();

  return (
    <NotifyContext.Provider value={notify}>
      {children}
      <NotificationsContainer notifications={notify.notifications} removeNotification={notify.remove} />
    </NotifyContext.Provider>
  );
};