
const path = require('path');
const  MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry: {         // when single page was then value is- './src/index.js',// entrypoint for webpack
        'hello-world':'./src/hello-world.js',
        'heading':'./src/head.js'
    },
    output:{//it creates bundle to this path
        filename: '[name].[contenthash].js', //[name] will be taken from entry object
        path:  path.resolve(__dirname,'./dist'), //webpack create this folder if doesn't exist
        publicPath:'' //its optional in WP5 but in somecases its required like serving static files from CDN
        // clean:{ // this option is similar to clean-webpack-plugin which removes redundant files
            // dry:true, // with dry it gives warning which all files it removes
            //keep:/\.css/  //except css file it checks other files
       // }
    },
    mode:'production', // this option is available from webpack version 4. It takes 3 values none, development, production
    optimization:{ //this object is used to optimize our bundle , if there is common library or js code then to create common file this obj can be used
        splitChunks:{
            chunks:'all', //all means we r telling webpack to optimize all types of chunks
            minSize: 3000  // if library size is more than 30kb then only webpack extract to different size  for less size it wont do for that minSize can be used 
            // for example for react it wont extract by defult to different file
        }
    },
    module:{
        rules:[//By default webpack cant import image files so we have to create rules it easily imports JSON and JS 
            {
                test: /\.(png|jpg)$/,
                type:'asset/resource'// if we use type:asset then it will automatically detects based om file size if more than 8kb then add asset/resource otherwise asset/inline
                //we can change this 8kb size also by useing below
                // type:'asset'
                //parser:{
                 //   dataUrlCondition:{
                //        maxSize: 3 *1024 // 3KB
               //     }
               // }
              
            },
            {
                test:/\.txt/,
                type:'asset/source'
            },
            {
                test:/\.css/,
                use:[
                    MiniCssExtractPlugin.loader, 'css-loader' //with single rule we can combine multiple loaders together
                    //css-loader- reads the contents of the CSS file and returns this content, but it doesnt do anything
                    // style-loader- takes the CSS and injects it into the page using style tags using style-loader bundles ur CSS together with ur JS into a single resulting file called bundle.js
                    //when we use asset modules then no need to install them as they are present in webpack but for loader we have to install them explicitly
                    // so here we have to install css-loader and style-loader npm packages
                ]
            },
            {
                test:/\.scss/,
                use:[
                    MiniCssExtractPlugin.loader, 'css-loader' ,'sass-loader' //loader squence is important as it executes from right to left
                    // here sass-loader will convert scss to css
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                    options:{  //we have to specify extra options for babel loader
                        presets:['@babel/env'], //Env presets compiles ecmascript 6,7,8,9 down to EcmaScript 5
                        // in other word env preset supports the latest JS standard defined in the latest Ecmascript specification
                        plugins:['@babel/plugin-proposal-class-properties'] //as latest Ecmascript dont support class properties so added this plugin
                        //npm install @babel/core babel-loader @babel/preset-env @babel/plugin-proposal-class-properties --save-dev
                        //when I was doing this change that time browser is supporting for class properties so need of this plugin just for demonstrate purpose added it below
                        // pipe operator was not supporting by browser
                    
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                    options:{  //we have to specify extra options for babel loader
                        presets:['@babel/env'], //Env presets compiles ecmascript 6,7,8,9 down to EcmaScript 5
                        // in other word env preset supports the latest JS standard defined in the latest Ecmascript specification
                        plugins: 
                        [
                            [
                                "@babel/plugin-proposal-pipeline-operator",
                                {
                                    "proposal" : "minimal"
                                }    
                            ]
                        ]//as latest browser dont support pipe operator so I have added this plugin 
        
                    
                    }
                }
            },
            {
                test:/\.hbs$/,
                use:[
                    'handlebars-loader' //this is template engine loader used to generate html from custom template 
            ]
            }

        ]
    },
    plugins:[
      //  new TerserPlugin(), // usually webpack plugins provided as npm packages that u can install from your terminal but tercer plugin is already installed with webpack5
        //this plugin is used to reduce bundle size
        new MiniCssExtractPlugin({
            filename:'[name].[contenthash].css' //contenthash is used to generate new file name when there is content change inside file to avoif caching problem with file content change
        }), // this plugin is used to extract css to seperate file
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns:[   //build patterns removes old files before WP generates new files
                '**/*',// this means remove all the files together with subdirectories inside the output path folder, no matter how many nesting levels there are   
               path.join(process.cwd(),'build/**/*') //if u want to remove the files outside of the outputpath u should specify an absolute pathe to the file patterns 
        ]
        }), //this plugin is used to remove redundant files from bundle, each time when we run build process clean, webpack plugin will clean the outputpath folder
        //BTW with this plugin we can clean multiple folders we just have to provide couple of options when instantiating this plugin in the plugins array
        new HTMLWebpackPlugin( // this plugin is used to update our html file after every build it basically creates new html file
            {
                filename:'hello-world.html',//give custom name to html file
                chunks:['hello-world'], // this array used to specify which javascript bundle is added in this html page
                title:'Hellow World', // When webpack creates html file then it changes title so by using this plugin we can do custom chnages to our html file
                template:'src/page-template.hbs',
                description:'Hello World',
                //minify:false this option is used to whether minify html page or not               
            }
        ),
        new HTMLWebpackPlugin(
            {
                filename:'heading-page.html',//give custom name to html file
                chunks:['heading'], // this array used to specify which javascript bundle is added in this html page
                title:'Hellow Heading', // When webpack creates html file then it changes title so by using this plugin we can do custom chnages to our html file
                template:'src/page-template.hbs',
                description:'Hello Heading',
                minify:false //this option is used to whether minify html page or not               
            },
        )
    
    ]
}