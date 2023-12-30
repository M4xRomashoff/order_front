import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import {TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {clearMessage} from "../slices/message";
import * as Yup from "yup";
import {showSuccessSnackbar, showErrorSnackbar} from "../actions/snackbarActions";



const Order = () => {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
        .test(
            "len",
            "Это поле должно содержать от 2 до 40 символов.",
            (val) =>
                val && val.toString().length >= 2 && val.toString().length <= 40
        )
        .required("This field is required!"),
    email: Yup.string()
        .email("Это не похоже на адрес эл. почты")
        .required(" Это поле обязательно для заполнения "),
  });

  const handleMessage = (formValue) => {
    const { username, email} = formValue;

    setSuccessful(false);
    UserService.requestMessage(username, email, message)
          .then(() => {
              dispatch(showSuccessSnackbar("Заявка зарегистрирована"));
              window.alert('Заявка зарегистрирована');
              setMessage('');
          })
          .catch((error) => {
              dispatch(showErrorSnackbar(error.toString()))
          });
  };

  const handleUserMessage = () => {
    const email = currentUser.email;
    const username = currentUser.username;
    UserService.requestMessage(username, email, message)
        .then(() => {
            dispatch(showSuccessSnackbar("Заявка зарегистрирована"));
            window.alert('Заявка зарегистрирована');
            setMessage('');
        })
        .catch((error) => {
            dispatch(showErrorSnackbar(error.toString()))
        });
  };




  return (
    <div className="container">
      <header className="jumbotron">
        <h2>Заявка</h2>
          <h6> {currentUser?.username} Напишите подробно , что вас беспокоит. Мы отправим ответ на вашу электронную почту {currentUser?.email} </h6>

        {!currentUser && (
            <div >
              <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleMessage}
              >
                {({ errors, touched }) => (
                    <Form>
                      {!successful && (
                          <div >
                            <div className="form-group m-0 p-0" style={{maxWidth:'300px'}}>
                              <label htmlFor="username" className='mb-0'>Имя </label>
                              <Field
                                  name="username"
                                  type="text"
                                  className={
                                      "form-control" +
                                      (errors.username && touched.username
                                          ? " is-invalid"
                                          : "")
                                  }
                              />
                              <ErrorMessage
                                  name="username"
                                  component="div"
                                  className="invalid-feedback"
                              />
                            </div>

                            <div className="form-group m-0 p-0" style={{maxWidth:'300px'}}>
                              <label htmlFor="email" className='mb-0'>Эл. Почта</label>
                              <Field
                                  name="email"
                                  type="email"
                                  className={
                                      "form-control" +
                                      (errors.email && touched.email ? " is-invalid" : "")
                                  }
                              />
                              <ErrorMessage
                                  name="email"
                                  component="div"
                                  className="invalid-feedback"
                              />
                            </div>

                            <div className="form-group m-0 p-0" style={{maxWidth:'500px'}}>
                              <label htmlFor="message" className='mb-0'>Сообщение</label>
                              <Field
                                  name="message"
                                  type="text"
                                  value={message}
                                  onChange={(value)=>setMessage(value.target.value)}
                                  className={
                                      "form-control" +
                                      (errors.message && touched.message
                                          ? " is-invalid"
                                          : "")
                                  }
                              />
                              <ErrorMessage
                                  name="message"
                                  component="div"
                                  className="invalid-feedback"
                              />
                            </div>

                            <div className="form-group m-0 p-0">
                              <button type="submit" className="btn btn-primary btn-block mt-4" style={{maxWidth:'100px'}}>
                                Отправить
                              </button>
                            </div>
                          </div>
                      )}
                    </Form>
                )}
              </Formik>
            </div>
        )}
        {currentUser && (
            <>
            <TextField
              style={{width:'50%', backgroundColor: 'rgb(253,252,252)'}}
              id="outlined-multiline-static"
              multiline
              rows={4}
              defaultValue=""
              variant="standard"
              value={message}
              onChange={(value)=>setMessage(value.target.value)}
          />
          <div >
            <button className="btn btn-primary btn-block mt-4" style={{maxWidth:'100px'}} onClick={handleUserMessage}>
              Отправить
            </button>
          </div>
          </>

        )}
      </header>
    </div>
  );
};

export default Order;
