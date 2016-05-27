module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: [ 'jasmine' ],
    reporters: [ 'progress' ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    singleRun: true,
    browsers: [
      'Chrome',
      'Opera',
      'Firefox'
    ],
    files: [
      '../src/vdom.js', 'specs/*.js'
    ],
    exclude: [],
    preprocessors: {}
  });
};
