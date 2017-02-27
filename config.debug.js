System.config({
  transpiler: 'traceur',
  defaultJSExtensions: true,
  paths: {
    "root:": "",
    "npm:": "node_modules/",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  packages: {
    "app": {
      "main": "main.js",
      "defaultExtension": "js"
    },
    "rxjs": {
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
    "@angular-redux/store": {
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
    "@angular/material": {
      "main": "/bundles/material.umd.js",
      "defaultExtension": "js"
    },
    "@ng-bootstrap/ng-bootstrap": {
      "main": "/bundles/ng-bootstrap.js",
      "defaultExtension": "js"
    },
    "moment": {
      "main": "moment.js",
      "defaultExtension": "js"
    }
  },

  map: {
    "@angular": "npm:@angular",
    "app": "root:scripts",
    "core-js": "npm:core-js",
    "hammerjs": "npm:hammerjs",
    "lodash": "npm:lodash",
    "@angular-redux/store": "npm:@angular-redux/store",
    "redux": "npm:redux",
    "reflect-metadata": "npm:reflect-metadata",
    "rxjs": "npm:rxjs",
    "traceur": "npm:traceur",
    "zone.js": "npm:zone.js",
    "@ng-bootstrap": "npm:@ng-bootstrap",
    "moment": "npm:moment"
  }
});
