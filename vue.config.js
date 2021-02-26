module.exports = {
    lintOnSave: false,    //禁用eslint
    devServer:{
        proxy: {
            "/api": {
              target: "http://182.92.128.115",
            //   是否把路径中的/api 去掉
            //   pathRewrite: {"^/api" : ""}
            }
          }
    }
}