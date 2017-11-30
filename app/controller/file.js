const fs = require('fs');
const path = require('path');
const rootDirectoryPath = path.join(__dirname, '../static/doc');

module.exports = app => {
  class FileController extends app.Controller {

    async index (){
      await this.ctx.display('index.html');
    }

    // 创建文件
    async create (){
      const { newFileName, parentPath } = this.ctx.request.body;
      const filePath = path.join(parentPath || rootDirectoryPath, newFileName);
      // 检测文件夹是否已存在
      if(fs.existsSync(filePath)){
        this.ctx.doneWithError('文件已存在');
      }else {
        fs.writeFileSync(filePath, '');
        this.ctx.done(null);
      }
    }

    // 删除文件
    async remove (){
    	const { filePath } = this.ctx.request.body;
      try {
        fs.unlinkSync(filePath);
        this.ctx.done();
      }catch (e){
        this.ctx.doneWithError(e.toString());
      }
    }
 
    // 获取文件
    async fetch (){
    	const { filePath } = this.ctx.request.body;
      try {
        const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
        this.ctx.done(data);
      }catch (e){
        this.ctx.doneWithError(e.toString());
      }
    }

    // 重命名文件
    async rename (){
    	const { oldPath, newPath } = this.ctx.request.body;
      try {
        fs.renameSync(oldPath, newPath);
        this.ctx.done();
      }catch (e){
        this.ctx.doneWithError(e.toString());
      }
    }

    // 保存文件
    async save (){
      const { filePath, data } = this.ctx.request.body;
      try {
        fs.writeFileSync(filePath, data);
        this.ctx.done();
      }catch (e){
        this.ctx.doneWithError(e.toString());
      }
    }

  }
  return FileController;
};
