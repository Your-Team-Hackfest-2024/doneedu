package main

import (
	"doneedu/base-go/src/source/config"
	serverSet "doneedu/base-go/src/source/server"

	"log"

	"github.com/joho/godotenv"
)

func main() {
	//test connection with firebase
	if err := godotenv.Load(); err != nil {
		log.Println("Error loading .env file")
	}

	cfg, err := config.SetupAppConfig()
	if err != nil {
		panic(err)
	}
	server, err := serverSet.SetupServer(cfg)
	if err != nil {
		panic(err)
	}
    server.Start()
}
