const { http, urlPrefix } = require('./config.js');

module.exports = {
	// 创建
  create (newDirName, parentPath){
    return new Promise((resolve, reject) => {
      http.post(urlPrefix + '/directory/create', { newDirName, parentPath }).then(res => {
        resolve(res);
      }).catch(reject);
    });
  },
	// 遍历
  traverse (){
    return new Promise((resolve, reject) => {
      http.post(urlPrefix + '/directory/traverse').then(res => {
        resolve(res);
      }).catch(reject);
    });
  },
  // 删除
  remove (dirPath){
    return new Promise((resolve, reject) => {
      http.post(urlPrefix + '/directory/remove', { dirPath }).then(res => {
        resolve(res);
      }).catch(reject);
    });
  },
  // 重命名
  rename (oldPath, newPath){
    return new Promise((resolve, reject) => {
      http.post(urlPrefix + '/directory/rename', { oldPath, newPath }).then(res => {
        resolve(res);
      }).catch(reject);
    });
  },
};