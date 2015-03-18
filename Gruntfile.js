module.exports = function(grunt) {

	// show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),

		watch: {
			sass: {
				files: ['**/**/*.{scss,sass}'],
				tasks: ['sass:dev', 'autoprefixer:dev']
			},
			options: {
				livereload: true,
			}
		},

		sass: {
			dev: {
				options: {
					sourceMap: true,
					outputStyle: 'nested'
				},
				files: {
					'public/style.css': 'assets/stylesheets/style.scss'
				}
			}
		},

		autoprefixer: {
			dev: {
				options: {
					map: true
				},
				src: 'public/style.css',
				dest: 'public/style.css'
			}
		},

		express: {
			dev: {
				options: {
					script: 'server.js'
				}
			}
		},

		modernizr: {
      dev: {
  	    // [REQUIRED] Path to the build you're using for development.
  	    'devFile' : 'assets/js/modernizr-dev.js',

  	    // [REQUIRED] Path to save out the built file.
  	    'outputFile' : 'public/js/modernizr.js',

  	    // Based on default settings on http://modernizr.com/download/
  	    'extra' : {
  	      'shiv' : true,
  	      'printshiv' : false,
  	      'load' : false,
  	      'mq' : false,
  	      'cssclasses' : true
  	    },

  	    // Based on default settings on http://modernizr.com/download/
  	    'extensibility' : {
  	      'addtest' : false,
  	      'prefixed' : true,
  	      'teststyles' : false,
  	      'testprops' : true,
  	      'testallprops' : true,
  	      'hasevents' : true,
  	      'prefixes' : true,
  	      'domprefixes' : true
  	    },

  	    // By default, source is uglified before saving
  	    'uglify' : true,

  	    // Define any tests you want to implicitly include.
  	    'tests' : [
  	      'csstransforms',
					'csstransitions',
					'css-pointerevents',
  	      'touch'
  	    ],

  	    // By default, this task will crawl your project for references to Modernizr tests.
  	    // Set to false to disable.
  	    'parseFiles' : false,

  	    // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
  	    // You can override this by defining a 'files' array below.
  	    // 'files' : ['assets/css/screen.css'],

  	    // When parseFiles = true, matchCommunityTests = true will attempt to
  	    // match user-contributed tests.
  	    'matchCommunityTests' : true,

  	    // Have custom Modernizr tests? Add paths to their location here.
  	    'customTests' : []
      }
	  }

	});

	// Default task(s).
	grunt.registerTask( 'styles', ['sass:dev', 'autoprefixer:dev'] );
	grunt.registerTask( 'default', ['modernizr:dev', 'styles', 'express:dev', 'watch'] );
};
