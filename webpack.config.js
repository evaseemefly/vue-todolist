
const path=require('path')
const webpack=require('webpack')

module.exports={
    model:'development',
    devServer:{

    },
    entry: path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    }
}