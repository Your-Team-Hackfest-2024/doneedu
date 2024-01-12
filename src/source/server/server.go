package firebase

import (
	"doneedu/base-go/src/source/config"
	serverFirestore "doneedu/base-go/src/source/server/firestore"
	"reflect"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
)

type Server interface {
	Start()
}

type GinServer struct {
	engine         *gin.Engine
	cfg            config.Config
	sessionStorage serverFirestore.Storage
}

func SetupServer(cfg config.Config) (Server, error) {
	storage, err := setupFirestoreSessionAdapter(cfg.GetSessionConfig())
	if err != nil {
		return nil, err
	}
	return newGinServer(cfg, storage)
}
// Masih di sini dulu
func (g *GinServer) Start() {
	g.engine.Run()
}
func newGinServer(cfg config.Config, sessionStorage serverFirestore.Storage) (Server, error) {
	r := gin.Default()

	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterTagNameFunc(func(fld reflect.StructField) string {
			name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
			if name == "-" {
				return ""
			}
			return name
		})
	}

	s := &GinServer{r, cfg, sessionStorage}
	// s.buildRouter()
	return s, nil
}
