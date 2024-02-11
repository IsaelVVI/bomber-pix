module.exports = {
    apps: [
        {
            name: 'NuxtAppName',
            port: '3003',
            exec_mode: 'cluster',
            instances: '1',
            script: './.output/server/index.mjs'
        }
    ]
}