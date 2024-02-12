import { useState, createContext, useContext, useEffect } from "react";

const NotificationContext = createContext({
    showNotification: () => { }
});

const  color = {
    success: 'orangeRed',
    error: 'red',
    warning: 'blue',
    info: 'white'
}

const Notification = ({ notificationData }) => {
    const notificationStyles = {
        position: 'absolute',
        top: 100,
        right: 30,
        backgroundColor: color[notificationData.type],
        color: 'white',
        padding: 20,
        borderRadius: 15,
    };

    return (
        <div style={notificationStyles}>
            <h4>Mensaje importante:</h4>
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

    // Eliminar la notificación después de 2 segundos
    useEffect(() => {
        const timer = setTimeout(() => {
            setNotificationData({ type: '', text: '' });
        }, 2000);

        // Limpiar el temporizador cuando el componente se desmonte o la notificación cambie
        return () => clearTimeout(timer);
    }, [notificationData]);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {notificationData.text && <Notification notificationData={notificationData}/>}
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    return useContext(NotificationContext);
};
