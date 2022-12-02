package rest

import (
	"github.com/kube-tarian/compage/core/internal/converter"
	"github.com/kube-tarian/compage/core/internal/core"
	"time"
)

// GetProject converts core.ProjectInput to *core.Project.
func GetProject(input core.ProjectInput) (*core.Project, error) {
	compageYaml, err := converter.GetCompageYaml(input.Yaml)
	if err != nil {
		return nil, err
	}

	return &core.Project{
		CompageYaml:    compageYaml,
		Name:           input.ProjectName,
		RepositoryName: input.RepositoryName,
		Metadata:       converter.GetMetadata(input.Metadata),
		ModificationDetails: core.ModificationDetails{
			CreatedBy: input.UserName,
			UpdatedBy: input.UserName,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
	}, nil
}