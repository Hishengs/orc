module.exports = {
  port: 8001, // 端口
  // 模板设置
  view: {
    enabled: true,
    engine: 'nunjucks',
  },
  static: {
    enabled: true,
    path: 'static', // 对应的映射路径
  },
  debugFlag: 'ORC',
  logRequestTime: true
}

