package model

import (
	"time"

	"gorm.io/gorm"
)

// Estructura de modelo para el tipo de usuario
type UserType struct {
	gorm.Model
	Role string `gorm:"uniqueIndex; not null" json:"role"`
}

// Estructura de modelo para los usuarios
type User struct {
    gorm.Model
    Username     string `gorm:"not null; uniqueIndex" json:"username"`
    Email        string `gorm:"not null; uniqueIndex" json:"email"`
    Password     string `gorm:"not null" json:"password"`
    FirstName    string `json:"firstname"`
    LastName     string `json:"lastname"`
    PercentCourse float64 `json:"percent_course"`
    UserTypeId int      `gorm:"default:1" json:"user_type_id"`
    UserType   UserType `gorm:"foreignKey:UserTypeId; constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}

// Estructura de modelo para contenido de academico
type Academico struct {
	gorm.Model
	ID        uint   `gorm:"primaryKey"`
	Titulo    string `gorm:"not null" json:"Titulo"`
	Contenido string `gorm:"not null" json:"Contenido"`
	UserID    uint   `gorm:"default:1" json:"UserID"`
	UserI   User  `gorm:"foreignKey:UserID; constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
   }

// Estructura de modelo para las noticias
type Noticia struct {
	ID        uint   `gorm:"primaryKey"`
	Titulo    string `gorm:"not null"`
	Contenido string `gorm:"not null"`
	Imagen    string `gorm:"not null"`
}

// Estructura de modelo para la informacion de Home
type HomeContent struct {
    ID        uint      `gorm:"primaryKey"`
    Title     string    `json:"title"`
    Content   string    `json:"content"`
    Image     string    `json:"image"`
	Title2     string    `json:"title2"`
    Content2   string    `json:"content2"`
    Title3     string    `json:"title3"`
	Content3   string    `json:"content3"`
	Title4     string    `json:"title4"`
    Content4   string    `json:"content4"`
    Image2     string    `json:"image2"`
	Title5     string    `json:"title5"`
    Content5   string    `json:"content5"`
    Image3     string    `json:"image3"`
	Title6     string    `json:"title6"`
    Content6  string    `json:"content6"`
    Image4     string    `json:"image4"`
	Title7     string    `json:"title7"`
    Content7  string    `json:"content7"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}