package handler

import (
	"api-fiber-gorm/database"
	"api-fiber-gorm/model"

	"github.com/gofiber/fiber/v2"
)

// CreateEmpresario crea un nuevo empresario
func CreateEmpresario(c *fiber.Ctx) error {
	db := database.DB
	empresario := new(model.Empresario)

	if err := c.BodyParser(empresario); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Error al parsear la solicitud", "data": nil})
	}

	result := db.Create(&empresario)

	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Error al crear el empresario", "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Empresario creado", "data": empresario})
}

// GetAllEmpresarios devuelve todos los empresarios
func GetAllEmpresarios(c *fiber.Ctx) error {
	db := database.DB
	var empresarios []model.Empresario
	result := db.Find(&empresarios)

	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No se encontraron empresarios", "data": nil})
	}

	// Crear un slice para almacenar los datos de los empresarios
	data := make([]fiber.Map, len(empresarios))

	// Recorrer los empresarios y devolver la información necesaria
	for i, empresario := range empresarios {
		data[i] = fiber.Map{
			"ID":        empresario.ID,
			"Titulo":    empresario.Titulo,
			"Contenido": empresario.Contenido,
		}
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Todos los empresarios", "data": data})
}

// GetEmpresarioByID devuelve un empresario por su ID
func GetEmpresarioByID(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB

	var empresario model.Empresario
	result := db.First(&empresario, id)

	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No se encontró el empresario", "data": nil})
	}

	// Crear un objeto con los datos del empresario
	data := fiber.Map{
		"ID":        empresario.ID,
		"Titulo":    empresario.Titulo,
		"Contenido": empresario.Contenido,
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Empresario encontrado", "data": data})
}

// UpdateEmpresarioByID actualiza un empresario existente
func UpdateEmpresarioByID(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB

	var empresario model.Empresario
	result := db.First(&empresario, id)

	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No se encontró el empresario", "data": nil})
	}

	if err := c.BodyParser(&empresario); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Error al parsear la solicitud", "data": nil})
	}

	result = db.Save(&empresario)

	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Error al actualizar el empresario", "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Empresario actualizado", "data": empresario})
}

// DeleteEmpresario elimina un empresario por su ID
func DeleteEmpresario(c *fiber.Ctx) error {
	db := database.DB
	id := c.Params("id")

	// Buscar empresario por ID
	var empresario model.Empresario
	result := db.Find(&empresario, id)

	if result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Empresario no encontrado", "data": nil})
	}

	// Eliminar empresario
	db.Delete(&empresario)

	return c.JSON(fiber.Map{"status": "success", "message": "Empresario eliminado correctamente", "data": nil})
}
