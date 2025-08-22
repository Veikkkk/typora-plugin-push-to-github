import type GithubPusherPlugin from './main'
import { i18n } from './i18n'
import * as fs from 'fs'
import type { GithubPusherSettings } from './settings'

export interface PushResult {
    success: boolean
    message: string
    error?: string
}

export class GithubPusher {
    constructor(private plugin: GithubPusherPlugin) { }

    validateSettings(): { valid: boolean, missingFields: string[] } {
        const requiredFields = [
            { key: 'token', name: i18n.t.token },
            { key: 'repoUrl', name: i18n.t.repoUrl },
            { key: 'targetDir', name: i18n.t.targetDir },
            { key: 'commitMessage', name: i18n.t.commitMessage },
            { key: 'branch', name: i18n.t.branch }
        ]

        const missingFields: string[] = []

        for (const field of requiredFields) {
            const value = this.plugin.settings.get(field.key as keyof GithubPusherSettings)
            if (!value || value.trim() === '') {
                missingFields.push(field.name)
            }
        }

        return {
            valid: missingFields.length === 0,
            missingFields
        }
    }


    async pushToGithub(filePath: string): Promise<PushResult> {
        try {
            // 获取插件设置
            const token = this.plugin.settings.get('token')
            const repoUrl = this.plugin.settings.get('repoUrl')
            const targetDir = this.plugin.settings.get('targetDir')
            const commitMessage = this.plugin.settings.get('commitMessage')
            const branch = this.plugin.settings.get('branch')

            // 推送文件到GitHub
            await this.pushToGithubAPI(filePath, token, repoUrl, targetDir, commitMessage, branch)

            return {
                success: true,
                message: i18n.t.pushSuccess || 'File pushed successfully'
            }

        } catch (error) {
            console.error('Push failed:', error)
            return {
                success: false,
                message: i18n.t.pushFailed || 'Push failed',
                error: error instanceof Error ? error.message : String(error)
            }
        }
    }

    private async pushToGithubAPI(
        filePath: string,
        token: string,
        repoUrl: string,
        targetDir: string,
        commitMessage: string,
        branch: string
    ): Promise<void> {
        try {
            // 获取API URL
            const apiUrl = this.getApiUrl(filePath, repoUrl, targetDir)

            // 获取文件的base64内容
            const content = await this.getBase64(filePath)

            // 准备请求数据
            const requestData = {
                message: commitMessage,
                content: content,
                branch: branch
            }

            // 发送PUT请求到GitHub API
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${token}`,
                    'User-Agent': 'Typora-Plugin-Push-to-Github'
                },
                body: JSON.stringify(requestData)
            })

            if (!response.ok) {
                let errorText = await response.text();
                throw new Error(`PUT Failed: ${response.status} ${response.statusText} - ${errorText || 'Unknown error'}`)
            }

        } catch (error) {
            console.error('Push Failed:', error)
            throw error
        }
    }


    async getBase64(filePath: string): Promise<string> {
        try {
            // 读取文件内容
            const fileBuffer = await fs.promises.readFile(filePath)

            // 将文件内容转换为base64字符串
            const base64String = fileBuffer.toString('base64')

            return base64String
        } catch (error) {
            console.error('Failed to read file:', error)
            throw new Error(`Failed to read file: ${filePath}: ${error instanceof Error ? error.message : String(error)}`)
        }
    }

    private getApiUrl(filePath: string, repoUrl: string, targetDir: string): string {
        let repoPath = repoUrl.replace(/^https:\/\/github\.com\//, "").replace(/\/$/, "");
        const fileName = filePath.split(/[\\/]/).pop() || "";
        let dir = targetDir ? targetDir.replace(/^\/+|\/+$/g, "") + "/" : "";
        const url = `https://api.github.com/repos/${repoPath}/contents/${dir}${fileName}`;
        return url;
    }
}
