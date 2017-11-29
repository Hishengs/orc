const fs = require('fs');
const path = require('path');
const rootDirectoryPath = path.join(__dirname, '../static/doc');

module.exports = app => {
  class DirectoryController extends app.Controller {

    async index (){
      await this.ctx.display('index.html');
    }

    // 创建文件夹
    async create (){
    	const { newDirName, parentPath } = this.ctx.request.body;
    	const dirPath = path.join(parentPath || rootDirectoryPath, newDirName);
    	// 检测文件夹是否已存在
    	if(fs.existsSync(dirPath)){
    		this.ctx.doneWithError('文件夹已存在');
    	}else {
    		fs.mkdirSync(dirPath);
    		this.ctx.done(null);
    	}
    }

    // 删除文件夹
    async remove (){
      const { dirPath } = this.ctx.request.body;
    	try {
    		// 检测是否是空的文件夹，否则不予删除
        fs.rmdirSync(dirPath);
    		this.ctx.done();
    	}catch (e){
    		this.ctx.doneWithError(e.toString());
    	}
    }

    // 遍历文件夹
    async traverse (){
    	try {
    		let { directoryPath } = this.ctx.request.body;
    		directoryPath = directoryPath || rootDirectoryPath;
	    	// 获取文件夹
	    	const getDir = (dirPath) => {
	    		const _files = [];
	    		const files = fs.readdirSync(dirPath);
	    		for(let i=0, ilen=files.length; i<ilen; i++){
	    			_files[i] = {
	    				name: files[i],
	    				path: path.join(dirPath, files[i]),
	    				isDir: fs.statSync(path.join(dirPath, files[i])).isDirectory(),
	    				content: null,
	    			};
	    			if(_files[i].isDir){
	    				_files[i].content = getDir(_files[i].path);
	    			}else {
	    				_files[i].content = fs.readFileSync(_files[i].path, { encoding: 'utf-8' });
	    			}
	    		}
	    		return _files;
	    	};
	    	this.ctx.done(getDir(directoryPath));
    	}catch (e){
    		this.ctx.doneWithError(e.toString());
    	}
    }

    // 重命名文件夹
    async rename (){
      const { oldPath, newPath } = this.ctx.request.body;
      try {
        fs.renameSync(oldPath, newPath);
        this.ctx.done();
      }catch (e){
        this.ctx.doneWithError(e.toString());
      }
    }

  }
  return DirectoryController;
};
