const path = require('path');
const validateFileTypeAndSize = require('./validateFileTypeAndSize.js');

const parsePublishApiRequestFiles = ({file}, isUpdate) => {
  // make sure a file was provided
  if (!file && !isUpdate) {
    throw new Error('no file with key of [file] found in request');
  }
  if (!file.path) {
    throw new Error('no file path found');
  }
  if (!file.type) {
    throw new Error('no file type found');
  }
  if (!file.size) {
    throw new Error('no file size found');
  }
  // validate the file name
  if (!file.name) {
    throw new Error('no file name found');
  }
  if (file.name.indexOf('.') < 0) {
    throw new Error('no file extension found in file name');
  }
  if (file.name.indexOf('.') === 0) {
    throw new Error('file name cannot start with "."');
  }
  if (/'/.test(file.name)) {
    throw new Error('apostrophes are not allowed in the file name');
  }

  // validate the file
  if (file) validateFileTypeAndSize(file);
  // return results
  return {
    fileName     : file.name,
    filePath     : file.path,
    fileExtension: path.extname(file.path),
    fileType     : file.type,
  };
};

const parsePublishApiRequestThumbnail = ({thumbnail}) => {
  if (!thumbnail) {
    return;
  }
  return {
    thumbnailFileName: thumbnail.name,
    thumbnailFilePath: thumbnail.path,
    thumbnailFileType: thumbnail.type,
  };
};

module.exports = {
  parsePublishApiRequestFiles,
  parsePublishApiRequestThumbnail,
};
