import { Alert, Snackbar } from "@mui/material";
import { useAuth } from "../context/AuthContext";

function Notification() {
    const {notification, handleCloseNotification} = useAuth();

    return (
        <Snackbar
        open={notification.open}
        autoHideDuration={6000} 
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 
        >
            <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
                {notification.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification
