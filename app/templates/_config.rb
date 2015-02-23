##
## This file is only needed for Compass/Sass integration. If you are not using
## Compass, you may safely ignore or delete this file.
##
## If you'd like to learn more about Sass and Compass, see the sass/README.txt
## file for more information.
##

# Default to development if environment is not set.
saved = environment
if (environment.nil?)
  environment = :development
else
  environment = saved
end

# Location of the theme's resources.
# Location of the theme's resources.
css_dir = "src/themes/<%= projectName %>/css"
sass_dir = "src/sass"
images_dir = "src/themes/<%= projectName %>/images"
generated_images_dir = images_dir + "/generated"
javascripts_dir = "src/themes/<%= projectName %>/js"
disable_warnings = true

# Require any additional compass plugins installed on your system.
require 'compass-normalize'
require 'rgbapng'
require 'toolkit'
require 'breakpoint'
require 'singularitygs'
require 'susy'
require 'sass-globbing'

##
## You probably don't need to edit anything below this.
##

# You can select your preferred output style here (:expanded, :nested, :compact
# or :compressed).
output_style = (environment == :production) ? :expanded : :nested

# To enable relative paths to assets via compass helper functions. Since Drupal
# themes can be installed in multiple locations, we don't need to worry about
# the absolute path to the theme from the server omega.
relative_assets = true

# Output source maps in development mode.
sass_options = (environment == :production) ? {} : {:sourcemap => true}
