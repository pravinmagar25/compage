import {simpleGit, SimpleGit, SimpleGitOptions} from 'simple-git';
import * as fs from "fs";
import {gitOperations} from "./common";

export interface PushToExistingProjectOnGithubRequest {
    createdProjectPath: string,
    repositoryName: string,
    existingProject: string,
    userName: string,
    password: string,
    email: string
}

export const pushToExistingProjectOnGithub = async (pushToExistingProjectOnGithubRequest: PushToExistingProjectOnGithubRequest) => {
    const options: Partial<SimpleGitOptions> = {
        baseDir: pushToExistingProjectOnGithubRequest.existingProject,
        binary: 'git',
        maxConcurrentProcesses: 6,
        trimmed: false,
    };

    // when setting all options in a single object
    const git: SimpleGit = simpleGit(options);

    // add local git config like username and email
    await git.addConfig('user.email', pushToExistingProjectOnGithubRequest.email);
    await git.addConfig('user.name', pushToExistingProjectOnGithubRequest.userName);

    // copy over the new files to this cloned files.
    fs.cpSync(pushToExistingProjectOnGithubRequest.createdProjectPath, pushToExistingProjectOnGithubRequest.existingProject, {recursive: true})
    console.log(`${pushToExistingProjectOnGithubRequest.createdProjectPath} files copied to ${pushToExistingProjectOnGithubRequest.existingProject}`)

    // add, commit and push
    await gitOperations(git);
}