package handler

import (
	"api-fiber-gorm/database"
	"api-fiber-gorm/model"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

func hashPassword(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
    return string(bytes), err
}

func validToken(t *jwt.Token, id string) bool {
    n, err := strconv.Atoi(id)
    if err != nil {
        return false
    }

    claims := t.Claims.(jwt.MapClaims)
    uid := int(claims["user_id"].(float64))

    if uid != n {
        return false
    }

    return true
}

func validUser(id string, p string) bool {
    db := database.DB
    var user model.User
    db.First(&user, id)
    if user.Username == "" {
        return false
    }
    if !CheckPasswordHash(p, user.Password) {
        return false
    }
    return true
}

// GetUser get userdata of user authenticate
func GetUser(c *fiber.Ctx) error {
    user_id, err := c.ParamsInt("id")

    if err != nil {
        return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Not found id", "data": nil})
    }

    if u_id := GetUserIdOfToken(c); u_id != user_id {
        return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Forbidden action", "data": nil})
    }

    db := database.DB
    var user model.User
    db.Find(&user, user_id)

    user.Password = ""
    return c.JSON(fiber.Map{"status": "success", "message": "User found", "data": user})
}
func getConnectedUserType(c *fiber.Ctx) (string, error) {
	
	token := c.Get("Authorization")
	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		
		return []byte("mi_clave_secreta"), nil
	})

	if err != nil {
		return "", err
	}

	// Extraemos el tipo de usuario del token o de cualquier otro campo relevante
	userType := claims["user_type"].(string)

	return userType, nil
}

// CreateUser crea un nuevo usuario
func CreateUser(c *fiber.Ctx) error {
	db := database.DB
	user := new(model.User)
	if err := c.BodyParser(user); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Review your input", "data": err})
	}

	hash, err := hashPassword(user.Password)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't hash password", "data": err})
	}

	user.Password = hash

	if err := db.Create(&user).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't create user", "data": err})
	}

    // Crear inscripción
    inscripcion := new(model.Inscripcion)
    inscripcion.IDUser = int(user.ID)
    inscripcion.Duser = *user
    inscripcion.Complete = 0
    inscripcion.PercentCourse = 0.0

    if err := db.Create(&inscripcion).Error; err != nil {
        return c.Status(500).JSON(fiber.Map{"status": "error", "message": "No se pudo crear la inscripción", "data": err})
}

	return c.Status(201).JSON(fiber.Map{"status": "success", "message": "Created user", "data": user})
}



// DeleteUser deletes a user by ID
func DeleteUser(c *fiber.Ctx) error {
 db := database.DB
 id := c.Params("id")

 var user model.User
 db.First(&user, id)
 if user.Username == "" {
  return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No user found with given ID", "data": nil})
 }

 db.Delete(&user)
 return c.JSON(fiber.Map{"status": "success", "message": "User successfully deleted", "data": nil})
}

// UpdateUser updates a user by ID
func UpdateUser(c *fiber.Ctx) error {
    db := database.DB
    id := c.Params("id")

    var user model.User
    db.First(&user, id)
    if user.Username == "" {
        return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No user found with given ID", "data": nil})
    }

    if err := c.BodyParser(&user); err != nil {
        return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't parse body", "data": err})
    }

    db.Save(&user)
    return c.JSON(fiber.Map{"status": "success", "message": "User successfully updated", "data": user})
}

// GetAllUsers returns all users
func GetAllUsers(c *fiber.Ctx) error {
    db := database.DB
    var users []model.User
    db.Find(&users)
    return c.JSON(fiber.Map{"status": "success", "message": "All users", "data": users})
}

// GetUserByID returns a user by ID
func GetUserByID(c *fiber.Ctx) error {
    db := database.DB
    id := c.Params("id")

    var user model.User
    db.First(&user, id)
    if user.Username == "" {
        return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No user found with given ID", "data": nil})
    }

    return c.JSON(fiber.Map{"status": "success", "message": "User found", "data": user})
}
