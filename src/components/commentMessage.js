import React, { useState, Fragment } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useDispatch, useSelector} from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import UserService from "../services/user.service";
import {showErrorSnackbar, showSuccessSnackbar} from "../actions/snackbarActions";




export default function CommentMessage({data,setData, getNewRequests,getOldRequests}) {
   const [comment, setComment] = useState('');
    const dispatch = useDispatch();

    const handleSave = () => {
        UserService.saveComment(data.id, comment).then(
            (response) => {
                dispatch(showSuccessSnackbar("Данные загружены"));
                getNewRequests();
                getOldRequests();
            },
            (error) => {dispatch(showErrorSnackbar(error.toString()))
            }
        );

    setData({});
    }

    const handleClose = () => {
    setData({});
    }

    function emailTo(){
        window.open(`mailto:${data.email}`);
        setData({});
    }

    return (
        <Fragment>
            <Dialog open={data.id !== undefined} onClose={handleClose}>
                <DialogTitle>Комментировать Сообщение</DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>

                    <div  >
                        <label htmlFor="comment" className='mb-0'>Сообщение</label>
                        <input
                            className={'border border-none w-100'}
                            name="comment"
                            type="text"
                            value={comment}
                            onChange={(value)=>setComment(value.target.value)}
                        />
                    </div>


                </DialogContent>

                <DialogActions sx={{ justifyContent: "center" }}>
                    <Button color="error"  onClick={handleClose}>Отмена</Button>
                    <Button color="warning"  onClick={emailTo}>email</Button>
                    <LoadingButton
                        size="small"
                        onClick={handleSave}
                        endIcon={<SendIcon />}
                        variant='text'

                    >
                        <span>Сохранить</span>
                    </LoadingButton>
                </DialogActions>
            </Dialog>

        </Fragment>
    );
}
