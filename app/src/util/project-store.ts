import {CreateProjectRequest, ProjectEntity} from "../routes/models";
import {uuid} from "uuidv4";
import {ProjectResource, ProjectResourceSpec} from "../store/models";
import {NAMESPACE} from "./constants";
import {createProjectResource, getProjectResource, listProjectResources} from "../store/project-client";

// createProjectResource creates projectResource on k8s cluster.
const convertCreateProjectRequestToProjectResource = (userName: string, createProjectRequest: CreateProjectRequest) => {
    const projectResource: ProjectResourceSpec = {
        id: uuid(),
        name: createProjectRequest.project.name,
        metadata: JSON.stringify(createProjectRequest.metadata),
        user: createProjectRequest.user,
        yaml: JSON.stringify(createProjectRequest.yaml),
        repository: createProjectRequest.repository,
        //TODO needs to be parameterized
        version: "v1",
    }
    return JSON.stringify(projectResource)
}

// convertListOfProjectResourceToListOfProjectEntity converts projectResourceList to ProjectEntityList
const convertListOfProjectResourceToListOfProjectEntity = (projectResources: ProjectResource[]) => {
    let projectEntities: ProjectEntity[] = []
    for (let i = 0; i < projectResources.length; i++) {
        let projectEntity: ProjectEntity = {
            id: projectResources[i].spec.id,
            // metadata: projectResources[i].spec.metadata,
            name: projectResources[i].spec.name,
            repository: projectResources[i].spec.repository,
            user: projectResources[i].spec.user,
            version: projectResources[i].spec.version,
            yaml: JSON.parse(JSON.stringify(projectResources[i].spec.yaml))
        }
        projectEntities.push(projectEntity)
    }
    return projectEntities
}

// getProjects returns all projects for userName supplied
export const listProjects = async (userName: string) => {
    let listOfProjectResource = await listProjectResources(NAMESPACE, userName);
    if (listOfProjectResource) {
        return convertListOfProjectResourceToListOfProjectEntity(JSON.parse(JSON.stringify(listOfProjectResource)));
    }
    return [];
}

// getProject returns specific project for userName and projectName supplied
export const getProject = async (userName: string, name: string) => {
    // TODO I may need to apply labelSelector here
    const projectResource = await getProjectResource(NAMESPACE, name);
    if (projectResource) {
        return JSON.stringify(projectResource)
    }
    return [];
}

// createProject creates projectResource on k8s cluster.
export const createProject = async (userName: string, createProjectRequest: CreateProjectRequest) => {
    const projectResource = convertCreateProjectRequestToProjectResource(userName, createProjectRequest);
    await createProjectResource(NAMESPACE, projectResource);
}