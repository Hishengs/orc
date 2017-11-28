const { http, urlPrefix } = require('./config.js');

module.exports = {
	// 创建
  create (newDirName){
    return new Promise((resolve, reject) => {
      http.post(urlPrefix + '/directory/create', { newDirName }).then(res => {
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
};