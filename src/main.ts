import { Plugin, PluginSettings } from '@typora-community-plugin/core'
import { GithubPusherSettingTab } from './setting-tab'
import { DEFAULT_SETTINGS, GithubPusherSettings } from './settings'
import { i18n } from './i18n'
import { fs } from '@typora-community-plugin/core'
import { GithubPusher } from './github-pusher'
import { Notice } from '@typora-community-plugin/core'


export default class GithubPusherPlugin extends Plugin<GithubPusherSettings> {

  async onload() {
    const { app } = this

    // 注册插件设置管理
    this.registerSettings(
      new PluginSettings(app, this.manifest, { version: 1 })
    )

    // 设置默认值
    this.settings.setDefault(DEFAULT_SETTINGS)

    // 注册配置面板
    this.registerSettingTab(new GithubPusherSettingTab(this))

    // 创建GitHub推送器实例
    const githubPusher = new GithubPusher(this)

    this.register(
      this.app.workspace.on('file-menu', async ({ menu, path }) => {
        try {
          const stats = await fs.stat(path)
          const isFile = stats.isFile()
          if (isFile) {
            menu.insertItemAfter('[data-action="open"]', item => {
              item
                .setKey('veik.githubpusher:push-to-github')
                .setTitle(i18n.t.pushToGithub)
                .onClick(async () => {
                  // 先校验配置项
                  const validation = githubPusher.validateSettings()
                  if (!validation.valid) {
                    new Notice(`${i18n.t.configIncomplete}: ${validation.missingFields.join(', ')}`, 2000)
                    return
                  }

                  const process = new Notice(i18n.t.pushProcess, 0)
                  const result = await githubPusher.pushToGithub(path)

                  if (result.success) {
                    new Notice(result.message, 2000)
                    process.close()
                    console.log(result.message)
                  } else {
                    new Notice(result.message, 2000)
                    process.close()
                    console.error(result.message, result.error)
                  }
                })
            })
          }
        } catch (error) {
          console.log(error)
        }
      })

    )
  }
}
