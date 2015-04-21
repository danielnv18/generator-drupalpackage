core = 7.x
api = 2

; Drupal Core
projects[drupal][version] = "7.36"

; =====================================
; Contrib Modules
; =====================================

; By default, store all contrib modules in the "contrib" subdirectory of
; sites/all/modules.
defaults[projects][subdir] = "contrib"

<% if(isFull) { %>
projects[admin_menu][version] = "3.0-rc4"
projects[admin_views][version] = "1.2"
projects[backup_migrate][version] = "2.8"
projects[better_exposed_filters][version] = "3.0-beta4"
projects[ckeditor][version] = "1.13"
projects[ctools][version] = "1.4"
projects[date][version] = "2.7"
projects[devel][version] = "1.5"
projects[entity][version] = "1.5"
projects[entityreference][version] = "1.1"
projects[fast_404][version] = "1.3"
projects[features][version] = "2.2"
projects[field_collection][version] = "1.0-beta7"
projects[field_group][version] = "1.4"
projects[google_analytics][version] = "1.4"
projects[imagefield_crop][version] = "1.1"
projects[jquery_update][version] = "2.4"
projects[libraries][version] = "2.2"
projects[link][version] = "1.3"
projects[manualcrop][version] = "7.x-1.5"
projects[media][version] = "1.4"
projects[metatag][version] = "1.0-beta7"
projects[migrate_d2d][version] = "7.x-2.1"
projects[module_filter][version] = "2.0-alpha2"
projects[node_export][version] = "3.0"
projects[pathauto][version] = "1.2"
projects[pathologic][version] = "2.12"
projects[migrate_d2d][version] = "2.1-beta1"
projects[rules][version] = "2.7"
projects[strongarm][version] = "2.0"
projects[token][version] = "1.5"
projects[uuid][version] = "1.0-alpha6"
projects[uuid_features] = "1.0-alpha4"
projects[variable][version] = 2.4
projects[viewreference][version] = "3.4"
projects[views][version] = "3.8"
projects[views_bulk_operations][version] = "3.2"
projects[views_field_view][version] = "1.1"
projects[webform][version] = "3.19"


; =====================================
; Contrib Themes
; =====================================

projects[omega][subdir] = ""
projects[omega][version] = "4.3"
projects[adminimal_theme][version] = "1.2"

; =====================================
; Libraries
; =====================================

libraries[ckeditor][download][type] = "get"
libraries[ckeditor][download][url] = "http://download.cksource.com/CKEditor/CKEditor/CKEditor%204.4.4/ckeditor_4.4.4_standard.zip"
libraries[ckeditor][destination] = "modules/contrib/ckeditor"
libraries[ckeditor][type] = "library"
<% } %>
