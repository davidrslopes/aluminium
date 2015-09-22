module.exports = function(grunt) {

	grunt.initConfig(
		{
			// Read the configuration file
			pkg: grunt.file.readJSON("package.json"),

			/***************************************************************************
			 * Dependencies - Copy Bower/JS dependencies to the theme"s folders
			 ***************************************************************************/

			bowercopy: {
				options: {
					srcPrefix: "bower_components",
					//runBower: true,
				},
				jquery: {
					src: "jquery/dist",
					dest: "src/vendor/jquery"
				},
				bootstrap: {
					options: {
						srcPrefix: "bower_components/bootstrap/dist",
						destPrefix: "src/vendor/bootstrap"
					},
					files: {
						"css/bootstrap.css": "css/bootstrap.css",
						"css/bootstrap.css.map": "css/bootstrap.css.map",
						"js/bootstrap.js": "js/bootstrap.js"
					}
				},
				fontawesome_fonts: {
					src: "fontawesome/fonts",
					dest: "assets/fonts"
				},
				fontawesome_css: {
					 options: {
						srcPrefix: "bower_components/fontawesome/css",
						destPrefix: "src/vendor/fontawesome/css"
					},
					files: { "font-awesome.css": "font-awesome.css" }
				},
				ionicons_fonts: {
					src: "ionicons/fonts",
					dest: "assets/fonts"
				},
				ionicons_css: {
					 options: {
						srcPrefix: "bower_components/ionicons/css",
						destPrefix: "src/vendor/ionicons/css"
					},
					files: { "ionicons.css": "ionicons.css" }
				}
			}, // bowercopy

			/***************************************************************************
			 * LESS & CSS
			 ***************************************************************************/

			// LESS to CSS
			less: {
				development: {
					files: {"src/css/style.css": "src/less/style.less"}
				}
			}, //less

			// Minify & concat CSS
			cssmin: {
				options: {
					keepSpecialComments: 0,
				},
				combine: {
					files: {
						'assets/css/style.min.css': [
							'src/vendor/bootstrap/css/bootstrap.css',
							'src/vendor/fontawesome/css/font-awesome.css',
							'src/vendor/ionicons/css/ionicons.css',
							'src/css/style.css'
						]
					},
				}
			}, // cssmin

			/***************************************************************************
			 * Javascript
			 ***************************************************************************/

			// Join JS files
			concat: {
				options: {
					stripBanners: true,
				},
				jsfiles: {
					src: [
							'src/vendor/jquery/jquery.js',
							'src/vendor/bootstrap/js/bootstrap.js',
							'src/js/script.js',
						],
					dest: 'build/js/script.js', // unminified version for debugging
					nonull: true,
				},
			}, // concat

			// Minify JS
			uglify: {
				jsfiles: {
					files: {
						'assets/js/script.min.js': ['build/js/script.js']
					}
				},
			}, // uglify


			/***************************************************************************
			 * Images
			 ***************************************************************************/

			imagemin: {
				dynamic: {
					options: {
						cache: false
					},
					files: [{
						expand: true,                       // Enable dynamic expansion
						cwd: 'src/img/',                    // Src matches are relative to this path
						src: ['**/*.{png,jpg,gif,svg}'],    // Actual patterns to match
						dest: 'assets/img/'                 // Destination path prefix
					}]
				}
			}, // imagemin

			/***************************************************************************
			 * Watch
			 ***************************************************************************/

			 watch: {
				options: {
					livereload: true, // Live Reload enabled - https://github.com/gruntjs/grunt-contrib-watch/blob/master/docs/watch-examples.md#enabling-live-reload-in-your-html
				},
				php:{
					files: ['*.php', '**/*.php'],
				},
				html:{
					files: ['*.html', '**/*.html'],
				},
				lessfiles: {
					files: ['*.less', '**/*.less'],
					tasks: ['less']
				},
				cssfiles: {
					files: ['src/css/*.css'],
					tasks: ['cssmin']
				},
				jsfiles: {
					files: ['src/js/*.js'],
					tasks: ['concat', 'uglify']
				},
				images: {
					files: ['src/img/**/*.{png,jpg,gif,svg}'],
					tasks: ['imagemin']
				},
			}, // watch
		}
	)

	// Load tasks
	grunt.loadNpmTasks("grunt-bowercopy");
	grunt.loadNpmTasks("grunt-contrib-imagemin");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register commands
	grunt.registerTask("default", ["less", "cssmin", "concat", "uglify", "imagemin", "watch"]);
	grunt.registerTask("update", ["bowercopy", "less", "cssmin", "concat", "uglify", "imagemin"]);
};