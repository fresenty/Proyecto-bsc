package database

import (
	"api-fiber-gorm/config"
	"api-fiber-gorm/model"
	"fmt"
	"strconv"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// ConnectDB connect to db
func ConnectDB() {
	var err error
	p := config.Config("DB_PORT")
	port, err := strconv.ParseUint(p, 10, 32)
	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", config.Config("DB_HOST"), port, config.Config("DB_USER"), config.Config("DB_PASSWORD"), config.Config("DB_NAME"))
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	fmt.Println("Connection Opened to Database")
	DB.AutoMigrate(
		&model.UserType{}, &model.User{},
	)

	//DB.Create(&model.UserType{Role: "academico"})  // init database !import!
	//DB.Create(&model.UserType{Role: "empresario"}) // init database !import!
	//DB.Create(&model.UserType{Role: "admin"})      // init database !import!
	//DB.Create(&model.Noticia{})
	//DB.Create(&model.Academico{})
	DB.AutoMigrate(&model.Academico{})
	//DB.Create(&model.Empresario{})
	DB.AutoMigrate(&model.Empresario{})
	//DB.Create(&model.User{})
	//DB.AutoMigrate(&model.User{})
	//DB.Create(&model.Inscripcion{})
	DB.AutoMigrate(&model.Inscripcion{})
	//DB.Create(&model.HomeContent{})
	//DB.AutoMigrate(&model.HomeContent{})

	fmt.Println("Database Migrated")
}
