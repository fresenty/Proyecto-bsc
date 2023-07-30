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
	
	// Update all inscripciones
	var empresarios []model.Empresario
	result = db.Where("deleted_at IS NULL").Find(&empresarios)
	if (result.Error != nil) {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Can't find cursos empresarios", "data": nil})
	}
	by := len(empresarios)

	var users []model.User
	result = db.Where("deleted_at IS NULL").Where("user_type_id = ?", 2).Find(&users)
	if (result.Error != nil) {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Can't find users empresarios", "data": nil})
	}

	for _, user := range users {
		var ins model.Inscripcion
		result = db.Where("deleted_at IS NULL").Where("id_user = ?", user.ID).First(&ins)
		if (result.Error != nil) {
			return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Can't find inscripcion", "data": nil})
		}
		devided := ins.Complete
		percent := float64(devided*100)/float64(by)
		ins.PercentCourse = percent
		db.Save(&ins)
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Empresario creado", "data": empresario})
}

// GetAllEmpresarios devuelve todos los empresarios
func GetAllEmpresarios(c *fiber.Ctx) error {
	db := database.DB
	var empresarios []model.Empresario
	result := db.Order("id ASC").Where("deleted_at IS NULL").Find(&empresarios)

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

	// Actualizar inscripciones empresarios
	var inscripciones []model.Inscripcion
	query := "SELECT * FROM \"inscripcions\" as \"i\" JOIN \"users\" as \"u\" ON \"i\".\"id_user\" = \"u\".\"id\" WHERE \"i\".\"deleted_at\" IS NULL AND \"u\".\"user_type_id\" = 2"
	
	if result := db.Raw(query).Scan(&inscripciones); result.Error != nil {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Usuarios empresarioa no encontrados", "data": nil})
	}

	var empresarios []model.Empresario
	
	if result := db.Where("deleted_at IS NULL").Find(&empresarios); result.Error != nil {
		print("ha ha")
		//return c.Status(404).JSON(fiber.Map{"status": "error", "message": "This user is not academico", "data": nil})
	}
	by := len(empresarios)
	for _, inscripcion := range inscripciones {
		if (inscripcion.Complete > 1) {
			inscripcion.Complete -= 1
			if result := db.Save(&inscripcion); result.Error != nil {
				return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No se actualizó inscripción", "data": nil})
			}
		}
		devided := inscripcion.Complete
		total := float64(devided*100/by)
	
		inscripcion.PercentCourse = total
	}

	return c.JSON(fiber.Map{"status": "success", "message": "Empresario eliminado correctamente", "data": nil})
}
