const getMessageOnSnackbar = (notification: any) => {
  const {
    type,
    payload: {
      fromFirstName,
      labelName,
      projectName,
      labelCount,
      subType,
      exportSeqNum
    }
  } = notification;

  switch (type) {
    case "inivte":
      return `${fromFirstName} invited you to ${projectName}`;
    case "assign":
      return `${fromFirstName} assigned ${labelCount.toLocaleString(
        "en"
      )} labels to you in ${projectName}`;
    case "thread":
      return `${fromFirstName} created an issue on ${labelName} in ${projectName}`;
    case "comment":
      return `${fromFirstName} replied to an issue on ${labelName} in ${projectName}`;
    case "export":
      return `Export #${exportSeqNum} ${convertExportSubType(
        subType
      )} (${labelCount.toLocaleString("en")} labels in ${projectName})`;
    default:
      return null;
  }
};

const convertExportSubType = (msg: any) => {
  switch (msg) {
    case "started":
      return "in queue";
    case "succeed":
      return "complete";
    case "failed":
      return "failed";
    case "canceled":
      return "canceled";
    default:
      return msg;
  }
};

export default { getMessageOnSnackbar, convertExportSubType };
