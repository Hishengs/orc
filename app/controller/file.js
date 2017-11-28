module.exports = app => {
  class FileController extends app.Controller {

    async index (){
      await this.ctx.display('index.html');
    }

    // 创建文件
    async create (){
    	this.ctx.done();
    }

    // 删除文件
    async remove (){
    	this.ctx.done();
    }

    // 获取文件
    async get (){
    	this.ctx.done();
    }

    // 重命名文件
    async rename (){
    	this.ctx.done();
    }

    // 保存文件
    async save (){
        this.ctx.done();
    }

  }
  return FileController;
};
