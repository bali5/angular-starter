import rollup      from 'rollup'

import json        from 'rollup-plugin-json'
import nodeResolve from 'rollup-plugin-node-resolve'
import babel       from 'rollup-plugin-babel'
import commonjs    from 'rollup-plugin-commonjs'
import uglify      from 'rollup-plugin-uglify'

//paths are relative to the execution path
export default {
  entry: 'build/scripts/main.aot.js',
  dest: 'build/scripts/app.js', // output a single application bundle
  sourceMap: false,
  format: 'iife',
  onwarn: function(warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }

    // console.warn everything else
    console.warn( warning.message );
  },
  plugins: [
    json(),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    uglify()
  ]
}