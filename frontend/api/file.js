const { http, urlPrefix } = require('./config.js');

module.exports = {
	// 创建
  create (){
    return new Promise((resolve, reject) => {
      http.post(urlPrefix + '/file/create').then(res => {
        resolve(res);
      }).catch(reject);
    });
  },
	// 获取
  fetch (){
    return new Promise((resolve, reject) => {
      http.post(urlPrefix + '/file/fetch').then(res => {
        resolve(res);
      }).catch(reject);
    });
  },
};