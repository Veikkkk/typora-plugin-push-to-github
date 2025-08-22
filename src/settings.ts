// 定义插件设置接口
export interface GithubPusherSettings {
    token: string
    repoUrl: string
    targetDir: string
    commitMessage: string
    branch: string
}

// 默认值
export const DEFAULT_SETTINGS: GithubPusherSettings = {
    token: '',
    repoUrl: '',
    targetDir: '',
    commitMessage: 'Update articles',
    branch: 'main',
}