# pin "toolbox/hello_toolbox_controller", to: File.expand_path("../app/assets/javascripts/toolbox_controllers/hello_toolbox_controller.js", __FILE__)

#pin "toolbox_controllers", to: "javascripts/hello_toolbox_controller.js"

#pin_all_from File.expand_path("../app/assets/javascripts", __dir__)#, under: "coisos"

pin_all_from "app/assets/javascripts/controllers", under: "controllers"