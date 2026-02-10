# 我的个人网站

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.x-409EFF?logo=element)](https://element-plus.org/)

一个使用 Vue 3 + Element Plus 构建的现代化个人网站，具有响应式设计和优雅的用户界面。

## ✨ 特性

- 🎨 **现代化设计** - 采用渐变色彩和卡片式布局，视觉效果出色
- 📱 **响应式布局** - 完美适配桌面端、平板和移动设备
- ⚡ **Vue 3** - 使用最新的 Vue 3 Composition API
- 🎯 **Element Plus** - 基于 Element Plus 组件库，UI 组件丰富
- 🎭 **动画效果** - 流畅的过渡动画和悬停效果
- 🚀 **性能优化** - 使用 Vite 构建工具，开发体验优秀

## 🏗️ 项目结构

```
MyWeb/
├── src/
│   ├── components/          # 公共组件
│   │   ├── Navigation.vue   # 导航栏组件
│   │   └── Footer.vue       # 页脚组件
│   ├── views/               # 页面组件
│   │   ├── Home.vue         # 首页
│   │   ├── Portfolio.vue    # 作品展示
│   │   └── Contact.vue      # 联系我
│   ├── assets/              # 静态资源
│   │   └── css/
│   │       └── global.css   # 全局样式
│   ├── App.vue              # 根组件
│   └── main.js              # 入口文件
├── index.html               # HTML 模板
├── package.json             # 项目配置
├── vite.config.js           # Vite 配置
└── README.md                # 项目说明
```

## 🚀 快速开始

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看网站

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📱 页面功能

### 首页 (Home)
- **英雄区域** - 个人介绍和主要技能展示
- **关于我** - 个人故事和专业背景
- **技能展示** - 技术栈和技能水平可视化
- **统计数据** - 项目经验和工作年限

### 作品展示 (Portfolio)
- **项目筛选** - 按类型筛选项目（Web应用、移动应用、UI设计、工具类）
- **项目卡片** - 展示项目缩略图、描述和技术栈
- **项目详情** - 点击查看完整的项目信息
- **响应式网格** - 自适应布局展示项目

### 联系我 (Contact)
- **联系信息** - 邮箱、电话、地址等联系方式
- **联系表单** - 完整的表单验证和提交功能
- **社交媒体** - 社交平台链接
- **工作时间** - 工作时间说明
- **地图位置** - 位置信息展示

## 🎨 设计特色

### 色彩方案
- **主色调**: Element Plus 蓝色 (#409eff)
- **成功色**: 绿色 (#67c23a)
- **警告色**: 橙色 (#e6a23c)
- **危险色**: 红色 (#f56c6c)

### 渐变背景
- **英雄区域**: 紫蓝渐变 (135deg, #667eea 0%, #764ba2 100%)
- **页脚**: 紫蓝渐变 (135deg, #667eea 0%, #764ba2 100%)

### 动画效果
- **悬停动画**: 卡片上浮效果
- **按钮动画**: 点击反馈和悬停效果
- **页面滚动**: 平滑滚动到指定区域
- **加载动画**: 表单提交时的加载状态

## 🛠️ 技术栈

- **前端框架**: Vue 3
- **UI 组件库**: Element Plus
- **构建工具**: Vite
- **样式**: CSS3 + 自定义样式
- **图标**: Element Plus Icons
- **字体**: Inter (Google Fonts)

## 📱 响应式设计

网站采用移动优先的响应式设计：

- **桌面端** (>= 1200px): 完整的多列布局
- **平板端** (768px - 1199px): 适中的布局调整
- **移动端** (< 768px): 单列布局，优化触摸操作

## 🎯 性能优化

- **代码分割**: 按需加载组件
- **图片优化**: 使用占位图片和懒加载
- **CSS 优化**: 使用 CSS 变量和现代特性
- **构建优化**: Vite 的快速构建和热更新

## 🔧 自定义配置

### 修改个人信息
在 `src/views/Home.vue` 中修改：
- 姓名和职业
- 个人描述
- 技能数据
- 统计数据

### 修改项目作品
在 `src/views/Portfolio.vue` 中修改：
- 项目列表
- 项目详情
- 技术栈标签

### 修改联系信息
在 `src/views/Contact.vue` 中修改：
- 联系方式
- 社交媒体链接
- 工作时间

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

MIT 许可证是一个宽松的开源许可证，允许您：
- ✅ 商业使用
- ✅ 修改
- ✅ 分发
- ✅ 私人使用

唯一的要求是保留版权声明和许可证文本。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目！

### 贡献指南

1. Fork 本项目
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📞 联系方式

- **作者**: Frames
- **邮箱**: cyxvvv@gmail.com
- **GitHub**: [@Cyxuan0311](https://github.com/Cyxuan0311)

---

用 ❤️ 和 Vue.js 构建
