import { message, Upload } from 'ant-design-vue';

export const beforeUploadPDF = (file: File) => {
  return new Promise((resolve, reject) => {
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error('只能上传 PDF 文件', 3).then(() => {
        return Upload.LIST_IGNORE;
      });
    } else {
      resolve(file);
    }
  });
};

export const beforeUploadZip = (file: File) => {
  return new Promise((resolve, reject) => {
    const isZip = file.type === 'application/zip';
    if (!isZip) {
      message.error('只能上传 Zip 格式的压缩包', 3).then(() => {
        return Upload.LIST_IGNORE;
      });
    } else {
      resolve(file);
    }
  });
};
