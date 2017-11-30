const { http, urlPrefix } = require('./config.js');

module.exports = {
  // 创建
  create (newFileName, parentPath){
    return new Promise((resolve, reject) => {
      http.post(urlPrefix + '/file/create', { newFileName, parentPath }).then(res => {
        resolve(res);
      }).catch(reject);
    });
  },
  // 获取
  fetch (filePath){
    return new Promise((resolve, reject) => {
      http.post(urlPrefix + '/file/fetch', { filePath }).then(res => {
        resolve(res);
      }).catch(reject);
    });
  },
  // 删除
  remove (filePath){
    return new Promise((resolve, reject) => {
      http.post(urlPrefix + '/file/remove', { filePath }).then(res => {
        resolve(res);
      }).catch(reject);
    });
  },
  // 重命名
  rename (oldPath, newPath){
    return new Promise((resolve, reject) => {
      http.post(urlPrefix + '/file/rename', { oldPath, newPath }).then(res => {
        resolve(res);
      }).catch(reject);
    });
  },
  // 保存
  save (filePath, data){
    return new Promise((resolve, reject) => {
      http.post(urlPrefix + '/file/save', { filePath, data }).then(res => {
        resolve(res);
      }).catch(reject);
    });
  },
};