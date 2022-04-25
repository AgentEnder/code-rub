export const projectFilePatterns = ['project.json']

export function registerProjectTargets(f) {
    return ({
        deploy: {
            executor: '@nrwl/workspace:run-commands',
            options: {
                command: 'echo "not npm-publish"'
            }
        }
    })
}