import { useState, createContext, useContext } from "react";


const NotificationContext = createContext({
    showNotification: () => { }
});


const Notification = ({ notificationData }) => {
    return (
        <div>
            <h4>Aviso:</h4>
            <p>{notificationData.text}</p>
        </div>
    );
};

export const NotificationProvider = ({ children }) => {
       const [notificationData, setNotificationData] = useState({
        type: 'success',
        text: 'probando'
    });

       const showNotification = (type, text) => {
        setNotificationData({ type, text });
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            <Notification notificationData={notificationData}/>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    return useContext(NotificationContext);
};
