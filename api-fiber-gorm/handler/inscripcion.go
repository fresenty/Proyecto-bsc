package handler

import (
	"api-fiber-gorm/database"
	"api-fiber-gorm/model"

	"github.com/gofiber/fiber/v2"
)

// CreateInscripcion crea una nueva inscripción en el sistema
func CreateInscripcion(c *fiber.Ctx) error {
	inscripcion := new(model.Inscripcion)
	if err := c.BodyParser(inscripcion); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid request", "data": nil})
	}

	db := database.DB
	if err := db.Create(&inscripcion).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Inscripcion could not be created", "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Inscripcion created", "data": inscripcion})
}

// GetAllInscripciones obtiene todas las inscripciones del sistema
func GetAllInscripciones(c *fiber.Ctx) error {
	db := database.DB
	var inscripciones []model.Inscripcion
	if err := db.Find(&inscripciones).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Inscripciones could not be found", "data": nil})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "Inscripciones found", "data": inscripciones})
}


// GetInscripcionByID obtiene una inscripción por su ID
func GetInscripcionByID(c *fiber.Ctx) error {
	inscripcionID := c.Params("id")
	db := database.DB
	var inscripcion model.Inscripcion
	if err := db.First(&inscripcion, inscripcionID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Inscripción no encontrada", "data": nil})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "Inscripción encontrada", "data": inscripcion})
}

// UpdateInscripcionByID actualiza una inscripción por su ID
func UpdateInscripcionByID(c *fiber.Ctx) error {
	inscripcionID := c.Params("id")
	db := database.DB
	var inscripcion model.Inscripcion
	if err := db.First(&inscripcion, inscripcionID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Inscripción not found", "data": nil})
	}
	if err := c.BodyParser(&inscripcion); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid request", "data": nil})
	}
	if err := db.Save(&inscripcion).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Inscripción could not be updated", "data": nil})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "Inscripción updated", "data": inscripcion})
}

// DeleteInscripcion elimina una inscripción por su ID
func DeleteInscripcion(c *fiber.Ctx) error {
	inscripcionID := c.Params("id")
	db := database.DB
	var inscripcion model.Inscripcion
	if err := db.First(&inscripcion, inscripcionID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Inscripción not found", "data": nil})
	}
	if err := db.Delete(&inscripcion).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Inscripción could not be deleted", "data": nil})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "Inscripción deleted", "data": inscripcion})
}
