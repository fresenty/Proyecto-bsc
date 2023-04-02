package handler

import (
	"api-fiber-gorm/database"
	"api-fiber-gorm/model"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

// GetAllHomeContent obtiene todos los contenidos de la sección Home
func GetAllHomeContent(c *fiber.Ctx) error {
	db := database.DB
	var contents []model.HomeContent
	if err := db.Find(&contents).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Content could not be found", "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Content found", "data": contents})
}

// GetHomeContentByID obtiene el titulo, contenido e imagen de un contenido por su ID
func GetHomeContentByID(c *fiber.Ctx) error {
	contentID, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "ID no válido", "data": nil})
	}

	db := database.DB
	var content model.HomeContent
	if err := db.First(&content, contentID).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Contenido no encontrado", "data": nil})
	}

	homeContent := fiber.Map{
		"title":   content.Title,
		"content": content.Content,
		"image":   content.Image,
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Contenido encontrado", "data": homeContent})
}

// CreateHomeContent crea un nuevo contenido para la sección Home
func CreateHomeContent(c *fiber.Ctx) error {
	content := new(model.HomeContent)
	if err := c.BodyParser(content); err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid request", "data": nil})
	}

	db := database.DB
	if err := db.Create(&content).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Content could not be created", "data": nil})
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Content created", "data": content})
}

// UpdateHomeContentByID actualiza el titulo, contenido e imagen de un contenido por su ID
func UpdateHomeContentByID(c *fiber.Ctx) error {
    contentID, err := strconv.Atoi(c.Params("id"))
    if err != nil {
        return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid ID", "data": nil})
    }

    db := database.DB
    var content model.HomeContent
    if err := db.First(&content, contentID).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Content not found", "data": nil})
    }

    // Actualiza los valores del contenido
    content.Title = c.FormValue("title")
    content.Content = c.FormValue("content")
    content.Image = c.FormValue("image")

    if err := db.Save(&content).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Content could not be updated", "data": nil})
    }

    return c.JSON(fiber.Map{"status": "success", "message": "Content updated", "data": content})
}

// DeleteHomeContentByID elimina un contenido por su ID
func DeleteHomeContentByID(c *fiber.Ctx) error {
    contentID, err := strconv.Atoi(c.Params("id"))
    if err != nil {
        return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid ID", "data": nil})
    }

    db := database.DB
    var content model.HomeContent
    if err := db.First(&content, contentID).Error; err != nil {
        return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Content not found", "data": nil})
    }

    if err := db.Delete(&content).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Content could not be deleted", "data": nil})
    }

    return c.JSON(fiber.Map{"status": "success", "message": "Content deleted", "data": content})
}
