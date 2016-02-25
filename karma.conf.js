module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],

    browsers: ['PhantomJS_Custom' ],

    singleRun: true,

    customLaunchers: {
      'PhantomJS_Custom': {
        base: 'PhantomJS',
      }
    },

    phantomjsLauncher: {
      exitOnResourceError: true
    },

    files: [
      'test/**/*.js'
    ],

    preprocessors: {
      './worker.js': [ 'webpack' ],
      './test/*.js': [ 'webpack' ]
    },

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-phantomjs-launcher')
    ],

    webpack: {
      devtool: 'inline-source-map'
    },
   
    client: {
      mocha: {
        reporter: 'html',
        ui: 'bdd'
      }
    }
  });
};
