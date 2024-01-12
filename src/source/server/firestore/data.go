package firestore

import (
	"time"

	"github.com/gin-gonic/gin"
)

type Data struct {
	ctx       *gin.Context
	id        string
	csrfToken string
	data      map[string]interface{}
	expiredAt time.Time
}
type Storage interface {
	Get(ctx *gin.Context, id string) (*Data, error)
	Save(ctx *gin.Context, id string, data map[string]interface{}, expiredAt time.Time, csrfToken string) error
	Delete(ctx *gin.Context, id string) error
}

func NewData(ctx *gin.Context, id string, csrfToken string, data map[string]interface{}, storage Storage, expiredAt time.Time) *Data {
	return &Data{
		ctx:       ctx,
		id:        id,
		csrfToken: csrfToken,
		data:      data,
		expiredAt: expiredAt,
	}
}
