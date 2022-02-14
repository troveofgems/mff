export const translateSizeOptionLabel = option => {
  switch (option) {
    case "xsm":
      return "X-Small";
    case "sm":
      return "Small";
    case "md":
      return "Medium";
    case "lg":
      return "Large";
    case "xlg":
      return "X-Large";
    case "xxlg":
      return "2x X-Large";
    case "xsmsm":
      return "X-Small - Small";
    case "smmd":
      return "Small - Medium";
    case "mdlg":
      return "Medium - Large";
    case "lgxl":
      return "Large - X-Large";
    case "xlgxxlg":
      return "Extra Large - 2x X-Large";
    default:
      return "Unknown Value";
  }
};