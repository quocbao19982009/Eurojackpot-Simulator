import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { Alert as AlertUI } from "@mui/material";
import { Backdrop } from "@mui/material";
import { closeAlert } from "../../actions/alertAction";

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
  });

  return (
    <>
      (
      <Backdrop
        sx={{ color: "#fff", zIndex: 99 }}
        open={open}
        onClick={handleClose}
      >
        {alerts.map((alert) => (
          <AlertUI severity="error" key={alert.id}>
            {alert.message}
          </AlertUI>
        ))}
      </Backdrop>
      )
    </>
  );
};

export default Alert;
