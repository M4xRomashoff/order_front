import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import {TextField} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import avatar from "../common/avatar.png";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {clearMessage} from "../slices/message";
import * as Yup from "yup";
import {register, sendMessage} from "../slices/auth";

const Order = () => {
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   UserService.getPublicContent().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response && error.response.data) ||
  //         error.message ||
  //         error.toString();
  //
  //       setContent(_content);
  //     }
  //   );
  // }, []);


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
    message: Yup.string()
        .test(
            "len",
            "Это поле должно содержать хотя бы один символ",
            (val) =>
                val && val.toString().length >= 1
        )
        .required(" Это поле обязательно для заполнения "),
  });

  const handleMessage = (formValue) => {
    const { username, email, message } = formValue;

    setSuccessful(false);

    dispatch(sendMessage({ username, email, message }))
        .unwrap()
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
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
        {currentUser && ( <TextField
              style={{width:'50%', backgroundColor: 'rgb(253,252,252)'}}
              id="outlined-multiline-static"
              multiline
              rows={4}
              defaultValue=""
              variant="standard"
              value={message}
              onChange={(value)=>setMessage(value.target.value)}
          />)}
      </header>
    </div>
  );
};

export default Order;
