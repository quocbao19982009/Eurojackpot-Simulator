import { setAlert, removeAlert } from "../slices/alertSlice";
import { v4 as uuidv4 } from "uuid";

enum severity {
  error = "error",
  success = "success",
  warning = "warning",
}

export const createAlert =
  (message: string, alertType = severity.error, timeout: number = 5000) =>
  (dispatch: any) => {
    const id = uuidv4();

    dispatch(setAlert({ message, id, alertType }));

    setTimeout(() => dispatch(removeAlert(id)), timeout);
  };

export const closeAlert = (id: string) => (dispatch: any) => {
  dispatch(removeAlert(id));
};
