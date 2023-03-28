package handler

import (
	"api-fiber-gorm/database"
	"api-fiber-gorm/model"
	"github.com/gofiber/fiber/v2"
)
// GetAllNoticias devuelve todas las noticias
func GetAllNoticias(c *fiber.Ctx) error {
	db := database.DB
	var noticias []model.Noticia
	result := db.Find(&noticias)

	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No se encontraron noticias", "data": nil})
	}

	// Crear un slice para almacenar los datos de las noticias
	data := make([]fiber.Map, len(noticias))

	// Recorrer las noticias y devolver la imagen en su formato original
	for i, noticia := range noticias {
		data[i] = fiber.Map{
			"ID":        noticia.ID,
			"Titulo":    noticia.Titulo,
			"Contenido": noticia.Contenido,
			"Imagen":    noticia.Imagen,
		}
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Todas las noticias", "data": data})
}

// GetNoticiaByID devuelve una noticia por su ID
func GetNoticiaByID(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB

	var noticia model.Noticia
	result := db.First(&noticia, id)

	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No se encontró la noticia", "data": nil})
	}

	// Crear un objeto con los datos de la noticia
	data := fiber.Map{
		"ID":        noticia.ID,
		"Titulo":    noticia.Titulo,
		"Contenido": noticia.Contenido,
		"Imagen":    noticia.Imagen,
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Noticia encontrada", "data": data})
}

// CreateNoticia crea una nueva noticia
func CreateNoticia(c *fiber.Ctx) error {
	db := database.DB
	noticia := new(model.Noticia)

	if err := c.BodyParser(noticia); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Error al parsear la solicitud", "data": nil})
	}

	result := db.Create(&noticia)

	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Error al crear la noticia", "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Noticia creada", "data": noticia})
}

// UpdateNoticiaByID actualiza una noticia existente
func UpdateNoticiaByID(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB

	var noticia model.Noticia
	result := db.First(&noticia, id)

	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No se encontró la noticia", "data": nil})
	}

	if err := c.BodyParser(&noticia); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Error al parsear la solicitud", "data": nil})
	}

	result = db.Save(&noticia)

	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Error al actualizar la noticia", "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Noticia actualizada", "data": noticia})
}

// DeleteNoticia elimina una noticia por su ID
func DeleteNoticia(c *fiber.Ctx) error {
	db := database.DB
	id := c.Params("id")

	// Buscar noticia por ID
	var noticia model.Noticia
	result := db.Find(&noticia, id)

	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Noticia no encontrada", "data": nil})
	}

	// Eliminar noticia
	db.Delete(&noticia)

	return c.JSON(fiber.Map{"status": "success", "message": "Noticia eliminada correctamente", "data": nil})
}
