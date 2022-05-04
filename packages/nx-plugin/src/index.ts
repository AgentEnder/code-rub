export const projectFilePatterns = ['project.json']

export function registerProjectTargets(f) {
    return ({
        deploy: {
            executor: '@code-rub/nx-plugin:build',
            options: {
            }
        }
    })
}