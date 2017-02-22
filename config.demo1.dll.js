/**
 * Created by Dio on 2016/9/23.
 */
var config = require('yylib-react/dist/config/webpack.config');
module.exports = config.webpackdll({
    key:'demo1'//应用标识名，同apps/xxx文件夹名称保持一致
    //根目录
    ,rootPath:__dirname
});