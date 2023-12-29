import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import {showSuccessSnackbar, showErrorSnackbar} from "../actions/snackbarActions";
import {useDispatch} from "react-redux";

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
        dispatch(showSuccessSnackbar("Данные загружены"));
      },
      (error) => {dispatch(showErrorSnackbar(error.toString()))

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, [dispatch]);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default BoardAdmin;
