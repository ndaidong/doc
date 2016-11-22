module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    singleRun: true,
    browsers: [
      'PhantomJS'
    ],
    files: [
      '../dist/doc.min.js', 'specs/*.js'
    ],
    exclude: [],
    preprocessors: {}
  });
};
