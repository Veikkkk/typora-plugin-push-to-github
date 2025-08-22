import { I18n } from '@typora-community-plugin/core'

export const i18n = new I18n({
    resources: {
        'en': {
            pushToGithub: 'Push to GitHub',
            token: 'Token (classic)',
            tokenDesc: 'GitHub personal access token with repository permissions.',
            repoUrl: 'Repository URL',
            repoUrlDesc: 'Example: https://github.com/username/myblog',
            targetDir: 'Target Directory',
            targetDirDesc: 'Directory in the repo where files will be pushed, e.g., _posts/',
            commitMessage: 'Commit Message',
            commitMessageDesc: 'Message used when committing changes',
            branch: 'Branch',
            branchDesc: 'Branch to push to, e.g., main',
            tokenRequired: 'Token is required',
            repoUrlRequired: 'Repository URL is required',
            pushSuccess: 'Pushed successfully',
            pushFailed: 'Push failed',
            configIncomplete: 'Configuration incomplete',
            missingFields: 'Missing fields',
        },
        'zh-cn': {
            pushToGithub: '推送到 GitHub',
            token: '令牌 (classic)',
            tokenDesc: 'GitHub 创建的拥有仓库权限的个人访问令牌。',
            repoUrl: '仓库链接',
            repoUrlDesc: '例如：https://github.com/username/myblog',
            targetDir: '推送目录',
            targetDirDesc: '在仓库中推送文件的目录，例如：_posts/',
            commitMessage: '提交信息',
            commitMessageDesc: '提交更改时使用的说明',
            branch: '分支',
            branchDesc: '推送到的分支，例如：main',
            tokenRequired: '需要设置令牌',
            repoUrlRequired: '需要设置仓库链接',
            pushSuccess: '推送成功',
            pushFailed: '推送失败',
            configIncomplete: '配置不完整',
            missingFields: '缺失的配置项',
        }
    }
})
