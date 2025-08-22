import { SettingTab } from "@typora-community-plugin/core"
import type GithubPusherPlugin from "./main"
import { DEFAULT_SETTINGS } from "./settings"
import { i18n } from "./i18n"

export class GithubPusherSettingTab extends SettingTab {

    get name() {
        return 'GitHub Pusher'
    }

    constructor(private plugin: GithubPusherPlugin) {
        super()
    }

    show() {
        const { plugin } = this
        const { t } = i18n

        this.containerEl.innerHTML = ''

        // Token
        this.addSetting(setting => {
            setting.addName(t.token)
            setting.addDescription(t.tokenDesc)
            setting.addText(input => {
                input.value = plugin.settings.get('token')
                input.placeholder = 'ghp_xxxxxxx'
                input.oninput = () => {
                    plugin.settings.set('token', input.value)
                }
            })
        })

        // Repository URL
        this.addSetting(setting => {
            setting.addName(t.repoUrl)
            setting.addDescription(t.repoUrlDesc)
            setting.addText(input => {
                input.value = plugin.settings.get('repoUrl')
                input.placeholder = 'https://github.com/username/repo'
                input.oninput = () => {
                    plugin.settings.set('repoUrl', input.value)
                }
            })
        })

        // Target Directory
        this.addSetting(setting => {
            setting.addName(t.targetDir)
            setting.addDescription(t.targetDirDesc)
            setting.addText(input => {
                input.value = plugin.settings.get('targetDir')
                input.placeholder = '_posts/'
                input.oninput = () => {
                    plugin.settings.set('targetDir', input.value ?? DEFAULT_SETTINGS.targetDir)
                }
            })
        })

        // Commit Message
        this.addSetting(setting => {
            setting.addName(t.commitMessage)
            setting.addDescription(t.commitMessageDesc)
            setting.addText(input => {
                input.value = plugin.settings.get('commitMessage')
                input.placeholder = DEFAULT_SETTINGS.commitMessage
                input.oninput = () => {
                    plugin.settings.set('commitMessage', input.value ?? DEFAULT_SETTINGS.commitMessage)
                }
            })
        })

        // Branch
        this.addSetting(setting => {
            setting.addName(t.branch)
            setting.addDescription(t.branchDesc)
            setting.addText(input => {
                input.value = plugin.settings.get('branch')
                input.placeholder = DEFAULT_SETTINGS.branch
                input.oninput = () => {
                    plugin.settings.set('branch', input.value ?? DEFAULT_SETTINGS.branch)
                }
            })
        })

        super.show()
    }
}
