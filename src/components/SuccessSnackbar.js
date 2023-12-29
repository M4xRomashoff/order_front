import { useDispatch, useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import { clearSnackbar } from "../actions/snackbarActions";
import { Fragment} from "react";
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import {Alert} from "@mui/material";



export default function SuccessSnackbar() {
    const dispatch = useDispatch();

    const { successSnackbarMessage, successSnackbarOpen } = useSelector(
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
            open={successSnackbarOpen}
            autoHideDuration={4000}
            onClose={handleClose}
            action={action}        >
            <Alert style={{fontSize:10}} onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {successSnackbarMessage}
            </Alert>
        </Snackbar>
    );
}

