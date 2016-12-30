System.config({
  transpiler: 'traceur',
  defaultJSExtensions: true,
  paths: {
    "npm:": "node_modules/",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  packages: {
    "app": {
      "main": "main.js",
      "defaultExtension": "js"
    },
    "@angular/material": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "rxjs": {
      "defaultExtension": "js"
    },
    "moment": {
      "main": "moment.js",
      "defaultExtension": "js"
    },
    "moment-duration-format": {
      "main": "lib/moment-duration-format.js",
      "defaultExtension": "js"
    },
    "numericjs": {
      "main": "numeric-1.2.6.js",
      "defaultExtension": "js"
    },
    "reflect-metadata": {
      "main": "Reflect.js",
      "defaultExtension": "js"
    },
    "lodash": {
      "main": "lodash.js",
      "defaultExtension": "js"
    },
    "hammerjs": {
      "main": "hammer.js",
      "defaultExtension": "js"
    },
    "redux": {
      "main": "dist/redux.min.js",
      "defaultExtension": "js"
    },
    "redux-logger": {
      "main": "dist/index.js",
      "defaultExtension": "js"
    },
    "ng2-redux": {
      "main": "lib/index.js",
      "defaultExtension": "js"
    },
    "core-js": {
      "main": "shim.js",
      "defaultExtension": "js"
    },
    "zone.js": {
      "main": "dist/zone.min.js",
      "defaultExtension": "js"
    },
    "traceur": {
      "main": "dist/src/traceur.js",
      "defaultExtension": "js"
    },
    "babel": {
      "main": "index.js",
      "defaultExtension": "js"
    },
    "@angular/common": {
      "main": "/bundles/common.umd.js",
      "defaultExtension": "js"
    },
    "@angular/compiler": {
      "main": "/bundles/compiler.umd.js",
      "defaultExtension": "js"
    },
    "@angular/core": {
      "main": "/bundles/core.umd.js",
      "defaultExtension": "js"
    },
    "@angular/forms": {
      "main": "/bundles/forms.umd.js",
      "defaultExtension": "js"
    },
    "@angular/http": {
      "main": "/bundles/http.umd.js",
      "defaultExtension": "js"
    },
    "@angular/platform-browser": {
      "main": "/bundles/platform-browser.umd.js",
      "defaultExtension": "js"
    },
    "@angular/platform-browser-dynamic": {
      "main": "/bundles/platform-browser-dynamic.umd.js",
      "defaultExtension": "js"
    },
    "@angular/router": {
      "main": "/bundles/router.umd.js",
      "defaultExtension": "js"
    },
    "@angular/router-deprecated": {
      "main": "/bundles/router-deprecated.umd.js",
      "defaultExtension": "js"
    },
    "@angular/upgrade": {
      "main": "/bundles/upgrade.umd.js",
      "defaultExtension": "js"
    }
  },

  map: {
    "@angular": "npm:@angular",
    "app": "build/scripts",
    "babel": "npm:babel-core",
    "babel-runtime": "npm:babel-runtime",
    "core-js": "npm:core-js",
    "hammerjs": "npm:hammerjs",
    "lodash": "npm:lodash",
    "moment": "npm:moment",
    "moment-duration-format": "npm:moment-duration-format",
    "ng2-redux": "npm:ng2-redux",
    "numericjs": "npm:numericjs",
    "plugin-babel": "npm:systemjs-plugin-babel",
    "plugin-babel-runtime": "npm:babel-runtime",
    "redux": "npm:redux",
    "redux-logger": "npm:redux-logger",
    "reflect-metadata": "npm:reflect-metadata",
    "rxjs": "npm:rxjs",
    "systemjs-babel-build": "npm:systemjs-plugin-babel/systemjs-babel-browser.js",
    "traceur": "npm:traceur",
    "zone.js": "npm:zone.js"
  }
});
