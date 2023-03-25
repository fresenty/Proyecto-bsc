package router

import (
	"api-fiber-gorm/handler"
	"api-fiber-gorm/middleware"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

// SetupRoutes setup router api
func SetupRoutes(app *fiber.App) {

	// allowedRoles := []string{"admin"}

	// Middleware
	api := app.Group("/api", logger.New())
	api.Get("/", handler.Hello)
	api.Get("/admin", middleware.ProtectedByRole("admin"), handler.HelloAdmin)
	api.Get("/academico", middleware.ProtectedByRole("academico"), handler.HelloAcademico)
	api.Get("/empresario", middleware.ProtectedByRole("empresario"), handler.HelloEmpresario)

	// Auth
	auth := api.Group("/auth")
	auth.Post("/login", handler.Login)

	// User
	user := api.Group("/users")
	user.Post("/", handler.CreateUser)
	user.Get("/:id", middleware.Protected(), handler.GetUser)

	// UserType
	usertype := api.Group("/roles")
	usertype.Get("/", handler.GetAllRoles)

	// Noticias
	noticias := api.Group("/noticias")
	noticias.Get("/", handler.GetAllNoticias)
	noticias.Get("/:id", handler.GetNoticiaByID)
	noticias.Post("/", handler.CreateNoticia)
	noticias.Put("/:id", handler.UpdateNoticiaByID)
	noticias.Delete("/:id", handler.DeleteNoticia)
}
