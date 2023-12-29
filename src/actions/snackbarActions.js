export const showSuccessSnackbar = message => {
    return dispatch => {
        dispatch({ type: "SNACKBAR_SUCCESS", message });
    };
};
export const showErrorSnackbar = message => {
    return dispatch => {
        dispatch({ type: "SNACKBAR_ERROR", message });
    };
};


export const clearSnackbar = () => {
    return dispatch => {
        dispatch({ type: "SNACKBAR_CLEAR" });
    };
};