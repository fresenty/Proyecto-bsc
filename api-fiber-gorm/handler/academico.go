package handler

import (
	"api-fiber-gorm/database"
	"api-fiber-gorm/model"

	"github.com/gofiber/fiber/v2"
)

// CreateAcademico crea un nuevo academico
func CreateAcademico(c *fiber.Ctx) error {
	db := database.DB
	academico := new(model.Academico)
   
	if err := c.BodyParser(academico); err != nil {
	return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Error al parsear la solicitud", "data": nil})
	}
   
	result := db.Create(&academico)
   
	if result.Error != nil {
	return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Error al crear el academico", "data": nil})
	}

	// Update all inscripciones
	var academicos []model.Academico
	result = db.Find(&academicos)
	if (result.Error != nil) {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Can't find cursos academicos", "data": nil})
	}
	by := len(academicos)

	var users []model.User
	result = db.Where("user_type_id = ?", 1).Find(&users)
	if (result.Error != nil) {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Can't find users academicos", "data": nil})
	}

	for _, user := range users {
		var ins model.Inscripcion
		result = db.Where("id_user = ?", user.ID).First(&ins)
		if (result.Error != nil) {
			return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Can't find inscripcion", "data": nil})
		}
		devided := ins.Complete
		percent := float64(devided*100)/float64(by)
		ins.PercentCourse = percent
		db.Save(&ins)
	}
   
	return c.JSON(fiber.Map{"status": "success", "message": "Academico creado", "data": academico})
   }

   
// GetAllAcademicos devuelve todos los academicos
func GetAllAcademicos(c *fiber.Ctx) error {
 db := database.DB
 var academicos []model.Academico
 result := db.Order("id ASC").Find(&academicos)

 if result.Error != nil {
 return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No se encontraron academicos", "data": nil})
 }

 // Crear un slice para almacenar los datos de los academicos
 data := make([]fiber.Map, len(academicos))

 // Recorrer los academicos y devolver la información necesaria
 for i, academico := range academicos {
 data[i] = fiber.Map{
 "ID": academico.ID,
 "Titulo": academico.Titulo,
 "Contenido": academico.Contenido,
 }
 }

 return c.JSON(fiber.Map{"status": "success", "message": "Todos los academicos", "data": data})
}


// GetAcademicoByID devuelve un academico por su ID
func GetAcademicoByID(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB
   
	var academico model.Academico
	result := db.First(&academico, id)
   
	if result.Error != nil {
	return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No se encontró el academico", "data": nil})
	}
   
	// Crear un objeto con los datos del academico
	data := fiber.Map{
	"ID": academico.ID,
	"Titulo": academico.Titulo,
	"Contenido": academico.Contenido,
	}
   
	return c.JSON(fiber.Map{"status": "success", "message": "Academico encontrado", "data": data})
   }
   


   // UpdateAcademicoByID actualiza un academico existente
   func UpdateAcademicoByID(c *fiber.Ctx) error {
	id := c.Params("id")
	db := database.DB
   
	var academico model.Academico
	result := db.First(&academico, id)
   
	if result.Error != nil {
	return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No se encontró el academico", "data": nil})
	}
   
	if err := c.BodyParser(&academico); err != nil {
	return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Error al parsear la solicitud", "data": nil})
	}
   
	result = db.Save(&academico)
   
	if result.Error != nil {
	return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Error al actualizar el academico", "data": nil})
	}
   
	return c.JSON(fiber.Map{"status": "success", "message": "Academico actualizado", "data": academico})
   }
   

   // DeleteAcademico elimina un academico por su ID
func DeleteAcademico(c *fiber.Ctx) error {
	db := database.DB
	id := c.Params("id")
   
	// Buscar academico por ID
	var academico model.Academico
	result := db.Find(&academico, id)
   
	if result.Error != nil {
	return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Academico no encontrado", "data": nil})
	}
   
	// Eliminar academico
	db.Delete(&academico)
   
	return c.JSON(fiber.Map{"status": "success", "message": "Academico eliminado correctamente", "data": nil})
   }
   