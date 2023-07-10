package handler

import (
	"api-fiber-gorm/database"
	"api-fiber-gorm/model"
	"github.com/gofiber/fiber/v2"
)

// GetAllVisitantes devuelve todos los visitantes
func GetAllVisitantes(c *fiber.Ctx) error {
	db := database.DB
	var visitantes []model.Visitante
	result := db.Find(&visitantes)

	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No se encontraron visitantes", "data": nil})
	}

	// Crear un slice para almacenar los datos de los visitantes
	data := make([]fiber.Map, len(visitantes))

	// Recorrer los visitantes y devolver la información
	for i, visitante := range visitantes {
		data[i] = fiber.Map{
			"ID":        visitante.ID,
			"Titulo":    visitante.Titulo,
			"Contenido": visitante.Contenido,
		}
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Todos los visitantes", "data": data})
}

// GetVisitanteByID devuelve un visitante por su ID
func GetVisitanteByID(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB

	var visitante model.Visitante
	result := db.First(&visitante, id)

	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No se encontró el visitante", "data": nil})
	}

	// Crear un objeto con los datos del visitante
	data := fiber.Map{
		"ID":        visitante.ID,
		"Titulo":    visitante.Titulo,
		"Contenido": visitante.Contenido,
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Visitante encontrado", "data": data})
}

// CreateVisitante crea un nuevo visitante
func CreateVisitante(c *fiber.Ctx) error {
	db := database.DB
	visitante := new(model.Visitante)

	if err := c.BodyParser(visitante); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Error al parsear la solicitud", "data": nil})
	}

	result := db.Create(&visitante)

	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Error al crear el visitante", "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Visitante creado", "data": visitante})
}

// UpdateVisitanteByID actualiza un visitante existente
func UpdateVisitanteByID(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB

	var visitante model.Visitante
	result := db.First(&visitante, id)

	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No se encontró el visitante", "data": nil})
	}

	if err := c.BodyParser(&visitante); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Error al parsear la solicitud", "data": nil})
	}

	result = db.Save(&visitante)

	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Error al actualizar el visitante", "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Visitante actualizado", "data": visitante})
}

// DeleteVisitante elimina un visitante por su ID
func DeleteVisitante(c *fiber.Ctx) error {
	db := database.DB
	id := c.Params("id")

	var visitante model.Visitante
	result := db.Find(&visitante, id)

	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Visitante no encontrado", "data": nil})
	}

	db.Delete(&visitante)

	return c.JSON(fiber.Map{"status": "success", "message": "Visitante eliminado correctamente", "data": nil})
}
