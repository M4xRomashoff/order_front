import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { Icon } from "@material-ui/core";
import { clearSnackbar } from "../actions/snackbarActions";
import Toast from "react-bootstrap/Toast";
import {Alert} from "@mui/material";
import { Fragment} from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function ErrorSnackbar() {
    const dispatch = useDispatch();

    const { errorSnackbarMessage, errorSnackbarOpen } = useSelector(
        state => state.ui
    );

    function handleClose() {
        dispatch(clearSnackbar());
    }

    const action = (
        <Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Fragment>
    );

    return (
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'left' }}
            open={errorSnackbarOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            action={action}        >
            <Alert style={{fontSize:10}} onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorSnackbarMessage}
            </Alert>
        </Snackbar>
    );
}