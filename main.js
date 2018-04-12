require.config({
    paths: {
        backbone:"./node_modules/backbone/backbone",
        jquery:"/node_modules/jquery/dist/jquery",
        underscore:"/node_modules/underscore/underscore-min",
        text:"/node_modules/requirejs-text/text"
    }
});

require([
    'StudentForm'
],function (Example) {
  new Example();
});