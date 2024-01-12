package config

import "github.com/joeshaw/envdecode"

type AppConfig struct {
	AppName string `env:"APP_NAME,default=doneedu"`
}
type Config interface {
	GetSessionConfig() SessionConfig
	GetAppConfig() AppConfig
}

type ConfigSet struct {
	session SessionConfig
	app     AppConfig
}

func (c ConfigSet) GetAppConfig() AppConfig {
	return c.app
}

func SetupAppConfig() (Config, error) {
	var app AppConfig
	err := envdecode.StrictDecode(&app)
	if err != nil {
		return nil, err
	}
	return ConfigSet{
		app:     app,
		session: setupSessionConfig(app.AppName),
	}, nil
}
