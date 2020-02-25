const getConvertedFileSize = (fileSize: any) => {
  if (fileSize >= 1024 * 1024) {
    return Math.round(fileSize / (1024 * 1024))
      .toString()
      .concat(" ", "MB");
  }
  if (fileSize >= 1024) {
    return Math.round(fileSize / 1024)
      .toString()
      .concat(" ", "KB");
  }

  return fileSize > 0 ? fileSize.toString().concat(" ", "byte") : "0 Byte";
};

const exportToJson = (objectData: any, filename: any) => {
  const contentType = "application/json;charset=utf-8;";
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    const blob = new Blob(
      [decodeURIComponent(encodeURI(JSON.stringify(objectData)))],
      { type: contentType }
    );
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    const a = document.createElement("a");
    a.download = filename;
    a.href =
      // tslint:disable-next-line: prefer-template
      "data:" +
      contentType +
      "," +
      encodeURIComponent(JSON.stringify(objectData));
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

const downloadViaPath = (filePath: string, fileName: string) => {
  const a = document.createElement("a");
  a.download = fileName;
  a.href = filePath;
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export default { getConvertedFileSize, exportToJson, downloadViaPath };
