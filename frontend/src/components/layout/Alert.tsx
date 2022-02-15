import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../store/store";
import { closeAlert } from "../../actions/alertAction";

import { Alert as AlertUI, AlertTitle } from "@mui/material";
import { Backdrop } from "@mui/material";

const Alert = () => {
  const dispatch = useDispatch();

  const alerts = useSelector((state: RootState) => state.alert.alert);

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
    dispatch(closeAlert(alerts[0].id));
  };

  useEffect(() => {
    if (alerts.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [alerts.length]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: 9999 }}
        open={open}
        onClick={handleClose}
      >
        {alerts.map((alert) => (
          <AlertUI severity={`${alert.alertType}` || "success"} key={alert.id}>
            <AlertTitle>{alert.alertType.toLocaleUpperCase()}</AlertTitle>
            {alert.message}
          </AlertUI>
        ))}
      </Backdrop>
    </>
  );
};

export default Alert;
