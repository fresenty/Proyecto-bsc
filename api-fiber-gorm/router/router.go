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

    // HomeContent
	home := api.Group("/home")
	home.Get("/", handler.GetAllHomeContent)
	home.Get("/:id", handler.GetHomeContentByID)
	home.Post("/", handler.CreateHomeContent)
	home.Put("/:id", handler.UpdateHomeContentByID)
	home.Delete("/:id", handler.DeleteHomeContentByID)

	// Academicos
	academicos := api.Group("/academicos")
	academicos.Get("/", handler.GetAllAcademicos)
	academicos.Get("/:id", handler.GetAcademicoByID)
	academicos.Post("/", handler.CreateAcademico)
	academicos.Put("/:id", handler.UpdateAcademicoByID)
	academicos.Delete("/:id", handler.DeleteAcademico)

	// Empresarios
    empresarios := api.Group("/empresarios")
    empresarios.Post("/", handler.CreateEmpresario)
    empresarios.Get("/", handler.GetAllEmpresarios)
    empresarios.Get("/:id", handler.GetEmpresarioByID)
    empresarios.Put("/:id", handler.UpdateEmpresarioByID)
    empresarios.Delete("/:id", handler.DeleteEmpresario)

	// Inscripciones
	inscripciones := api.Group("/inscripciones")
	inscripciones.Post("/", handler.CreateInscripcion)
	inscripciones.Get("/", handler.GetAllInscripciones)
	inscripciones.Put("/iscomplete/:id_user", handler.UpdateIsComplete)
	inscripciones.Get("/:id", handler.GetInscripcionByUserID)
	inscripciones.Put("/:id", handler.UpdateInscripcionByID)
	inscripciones.Delete("/:id", handler.DeleteInscripcion)

}