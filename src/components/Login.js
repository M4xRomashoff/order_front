import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";
import avatar  from '../common/avatar.png';
import avatarM from '../common/avatar2.png';
import avatarF from '../common/avatar3.png';

const Login = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [user,setUser]=useState({});
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    const { username, password } = formValue;
    setLoading(true);

    dispatch(login({ username, password }))
      .unwrap()
      .then((user) => {
             setUser(user);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handleRegister = () => {
    navigate("/register");
  }


  if (isLoggedIn) {
    if (currentUser.roles.includes("ROLE_ADMIN"))  return <Navigate to="/admin" />;
    else   return <Navigate to="/order" />;
  }

  return (
    <div className="col-md-12 login-form" >
      <div className="card card-container" >
        <img
          src={avatar}
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="username">Имя Пользователя</label>
                <Field
                  name="username"
                  type="text"
                  className={
                    "form-control" +
                    (errors.username && touched.username ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <Field
                  name="password"
                  type="password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Вход</span>
                </button>
              </div>
              <div className="form-group">
                <button
                    type="reset"
                    className="btn btn-secondary btn-block"
                    disabled={loading}
                    onClick={handleRegister}
                >
                  {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Регистрация</span>
                </button>
              </div>

            </Form>
          )}
        </Formik>
      </div>

      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
