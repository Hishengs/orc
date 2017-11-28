module.exports = app => {
  class HomeController extends app.Controller {

    async index (){
      await this.ctx.display('index.html');
    }

  }
  return HomeController;
};
