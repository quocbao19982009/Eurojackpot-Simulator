enum severity {
  error = "error",
  success = "success",
  warning = "warning",
}

interface alertModels {
  message: string;
  id: string;
  alertType: severity;
}

export default alertModels;
