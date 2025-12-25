export const messages = {
  zh: {
    app: {
      profile: {
        name: 'Frames',
        title: 'C/C++ & AI基础设施 & HPC 爱好者',
        description: '专注于高性能计算和AI基础设施'
      },
      menuItems: [
        { key: 'home', name: '首页', href: '#home', icon: 'HomeIcon' },
        { key: 'about', name: '关于我', href: '#about', icon: 'UserIcon' },
        { key: 'skills', name: '技能', href: '#skills', icon: 'CodeBracketIcon' },
        { key: 'portfolio', name: '作品展示', href: '#portfolio', icon: 'BriefcaseIcon' },
        { key: 'blog', name: '个人博客', href: '#blog', icon: 'DocumentTextIcon' },
        { key: 'games', name: '游戏', href: '#games', icon: 'SparklesIcon' },
        { key: 'contact', name: '联系我', href: '#contact', icon: 'EnvelopeIcon' }
      ],
      tabs: [
        { id: 'home', name: '首页', icon: 'HomeIcon' },
        { id: 'about', name: '关于我', icon: 'UserIcon' },
        { id: 'skills', name: '技能', icon: 'CodeBracketIcon' },
        { id: 'portfolio', name: '作品', icon: 'BriefcaseIcon' },
        { id: 'blog', name: '博客', icon: 'DocumentTextIcon' },
        { id: 'games', name: '游戏', icon: 'SparklesIcon' },
        { id: 'contact', name: '联系', icon: 'EnvelopeIcon' }
      ],
      socialLinks: [
        {
          key: 'github',
          text: 'GitHub',
          tooltip: 'GitHub',
          href: 'https://github.com/Cyxuan0311',
          class: 'github',
          icon: 'CodeBracketIcon'
        },
        {
          key: 'email',
          text: '邮箱',
          tooltip: '邮箱',
          href: 'mailto:cyxvvv@gmail.com',
          class: 'email',
          icon: 'EnvelopeIcon'
        }
      ],
      loadingText: '加载中...',
      languageButton: 'English'
    },
    home: {
      timezone: 'CST (UTC+8)',
      hero: {
        title: '你好，我是 Frames',
        subtitle: 'C/C++ & AI基础设施 & HPC 爱好者',
        description: '来自中国武汉，专注于高性能计算和AI基础设施的研究与开发',
        actions: {
          primary: '了解更多',
          secondary: '联系我'
        }
      },
      sections: {
        coreSkills: '核心技能',
        latestProjects: '最新项目',
        quickNav: '快速导航'
      },
      coreSkills: [
        {
          name: 'C/C++',
          description: '高性能编程语言，专注系统级开发',
          icon: 'CodeBracketIcon'
        },
        {
          name: 'AI基础设施',
          description: '机器学习平台和分布式训练系统',
          icon: 'CpuChipIcon'
        },
        {
          name: 'HPC',
          description: '高性能计算和并行处理技术',
          icon: 'BoltIcon'
        },
        {
          name: '容器化',
          description: 'Docker和Kubernetes容器编排',
          icon: 'CubeIcon'
        }
      ],
      featuredProjects: [
        {
          id: 1,
          title: 'Paker - C++包管理器',
          description: '为C++项目设计的包控制器，提供简单易用的包管理方式，支持CMake集成',
          icon: 'CodeBracketIcon',
          gradient: 'linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%)',
          technologies: ['C++17', 'CMake', 'Package Management', 'CLI']
        },
        {
          id: 2,
          title: 'cuOP - CUDA算子库',
          description: '支持CUDA的算子库，提供智能内存控制和JIT编译功能，专为高性能GPU计算设计',
          icon: 'CpuChipIcon',
          gradient: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)',
          technologies: ['CUDA', 'C++', 'HPC', 'JIT', 'GPU Computing']
        },
        {
          id: 3,
          title: 'FTB - 文件浏览器',
          description: '基于FTXUI和Linux的C++文件浏览器，提供现代化的终端文件管理体验',
          icon: 'ComputerDesktopIcon',
          gradient: 'linear-gradient(135deg, #d69e2e 0%, #b7791f 100%)',
          technologies: ['C++', 'FTXUI', 'Linux', 'CMake', 'Terminal UI']
        }
      ],
      quickNav: [
        {
          target: 'about',
          title: '关于我',
          description: '了解我的背景和经历',
          icon: 'UserIcon'
        },
        {
          target: 'skills',
          title: '技能专长',
          description: '查看我的技术栈',
          icon: 'CodeBracketIcon'
        },
        {
          target: 'portfolio',
          title: '作品展示',
          description: '浏览我的项目作品',
          icon: 'BriefcaseIcon'
        },
        {
          target: 'blog',
          title: '技术博客',
          description: '阅读我的技术文章',
          icon: 'DocumentTextIcon'
        },
        {
          target: 'contact',
          title: '联系我',
          description: '与我取得联系',
          icon: 'EnvelopeIcon'
        }
      ],
      viewAll: '查看所有项目 →',
      loadingText: '加载中...',
      scrollTopTitle: '回到顶部',
      weatherOptions: [
        { temperature: 22, description: '多云', location: '武汉' },
        { temperature: 25, description: '晴天', location: '武汉' },
        { temperature: 18, description: '小雨', location: '武汉' },
        { temperature: 28, description: '晴天', location: '武汉' }
      ]
    },
    about: {
      pageHeader: {
        title: '关于我',
        subtitle: '了解我的背景、经历和专业技能'
      },
      intro: {
        title: '你好，我是 Frames',
        highlights: [
          {
            icon: 'HandRaisedIcon',
            text: '你好，我是 <strong>Frames</strong>，来自中国武汉。'
          },
          {
            icon: 'EyeIcon',
            text: '我对 <span class="tech-tag cpp-tag">C/C++</span>、<span class="tech-tag ai-tag">AI基础设施</span> 和 <span class="tech-tag hpc-tag">HPC</span> 充满热情。'
          },
          {
            icon: 'AcademicCapIcon',
            text: '目前正在大学学习，专注于高性能计算和AI基础设施的研究。'
          },
          {
            icon: 'EnvelopeIcon',
            text: '联系我：<a href="mailto:cyxvvv@gmail.com">cyxvvv@gmail.com</a>'
          },
          {
            icon: 'HeartIcon',
            text: '我喜欢阅读和看电影，在代码之外享受生活的美好。'
          }
        ]
      },
      stats: [
        { number: 'C/C++', label: '核心语言' },
        { number: 'AI', label: '基础设施' },
        { number: 'HPC', label: '高性能计算' }
      ],
      education: {
        title: '教育背景',
        timeline: [
          {
            year: '2021 - 至今',
            title: '计算机科学与技术',
            school: '武汉纺织大学',
            description: '专注于高性能计算和人工智能方向的学习与研究'
          }
        ]
      },
      techStack: {
        title: '技术栈',
        categories: [
          { title: '编程语言', img: 'https://skillicons.dev/icons?i=c,cpp,python,go', alt: '编程语言' },
          { title: 'AI & 机器学习', img: 'https://skillicons.dev/icons?i=pytorch,tensorflow,docker,kubernetes', alt: 'AI & 机器学习' },
          { title: '开发工具', img: 'https://skillicons.dev/icons?i=git,mysql,postgres,cmake', alt: '开发工具' },
          { title: '操作系统', img: 'https://skillicons.dev/icons?i=linux,ubuntu', alt: '操作系统' },
          { title: '编辑器', img: 'https://skillicons.dev/icons?i=vscode,sublime,vim', alt: '编辑器' }
        ]
      },
      interests: {
        title: '兴趣爱好',
        items: [
          { icon: 'BookOpenIcon', title: '阅读', description: '喜欢阅读技术书籍和科幻小说' },
          { icon: 'FilmIcon', title: '电影', description: '享受各种类型的电影，特别是科幻片' },
          { icon: 'BoltIcon', title: '运动', description: '喜欢跑步和健身，保持身体健康' },
          { icon: 'MusicalNoteIcon', title: '音乐', description: '热爱各种音乐，特别是古典音乐' }
        ]
      }
    },
    skills: {
      pageHeader: {
        title: '技能专长',
        subtitle: '我的技术栈和专业能力'
      },
      techShowcaseTitle: '技术栈概览',
      techIconRows: [
        { src: 'https://skillicons.dev/icons?i=c,cpp,python,go', alt: '编程语言' },
        { src: 'https://skillicons.dev/icons?i=pytorch,tensorflow,docker,kubernetes', alt: 'AI & 机器学习' },
        { src: 'https://skillicons.dev/icons?i=git,mysql,postgres,cmake', alt: '开发工具' },
        { src: 'https://skillicons.dev/icons?i=linux,ubuntu', alt: '操作系统' },
        { src: 'https://skillicons.dev/icons?i=vscode,sublime,vim', alt: '编辑器' }
      ],
      categories: [
        {
          key: 'programming',
          name: '编程语言',
          icon: 'CodeBracketIcon',
          color: '#3182ce',
          skills: [
            { name: 'C/C++', level: 95 },
            { name: 'Python', level: 90 },
            { name: 'Go', level: 80 },
            { name: 'Shell Script', level: 75 }
          ]
        },
        {
          key: 'ai',
          name: 'AI & 机器学习',
          icon: 'CpuChipIcon',
          color: '#38a169',
          skills: [
            { name: 'PyTorch', level: 90 },
            { name: 'TensorFlow', level: 85 },
            { name: 'CUDA', level: 80 },
            { name: 'OpenMP', level: 75 }
          ]
        },
        {
          key: 'containers',
          name: '容器化 & 编排',
          icon: 'CubeIcon',
          color: '#d69e2e',
          skills: [
            { name: 'Docker', level: 90 },
            { name: 'Kubernetes', level: 85 },
            { name: 'Podman', level: 70 },
            { name: 'Helm', level: 75 }
          ]
        },
        {
          key: 'database',
          name: '数据库 & 存储',
          icon: 'CircleStackIcon',
          color: '#e53e3e',
          skills: [
            { name: 'MySQL', level: 85 },
            { name: 'PostgreSQL', level: 80 },
            { name: 'Redis', level: 75 },
            { name: 'MongoDB', level: 70 }
          ]
        },
        {
          key: 'tools',
          name: '开发工具',
          icon: 'WrenchScrewdriverIcon',
          color: '#805ad5',
          skills: [
            { name: 'Git', level: 95 },
            { name: 'CMake', level: 90 },
            { name: 'Make', level: 85 },
            { name: 'GDB', level: 80 }
          ]
        },
        {
          key: 'os',
          name: '操作系统',
          icon: 'ComputerDesktopIcon',
          color: '#dd6b20',
          skills: [
            { name: 'Linux', level: 95 },
            { name: 'Ubuntu', level: 90 },
            { name: 'CentOS', level: 85 },
            { name: 'Arch Linux', level: 80 }
          ]
        }
      ]
    },
    portfolio: {
      sectionTitle: '作品展示',
      sectionSubtitle: '我的精选项目和工作成果',
      filters: [
        { key: 'all', label: '全部' },
        { key: 'cpp', label: 'C++项目' },
        { key: 'hpc', label: 'HPC/GPU' },
        { key: 'java', label: 'Java应用' },
        { key: 'tool', label: '工具类' }
      ],
      overlayLabel: '查看详情',
      demoLabel: '演示',
      codeLabel: '代码',
      modal: {
        descriptionTitle: '项目描述',
        featuresTitle: '主要功能',
        techTitle: '技术栈',
        demoButton: '查看演示',
        codeButton: '查看代码'
      },
      projects: [
        {
          id: 1,
          title: 'Paker - C++包管理器',
          category: 'C++开发',
          type: 'cpp',
          description: '为C++项目设计的包控制器，提供简单易用的包管理方式，支持CMake集成',
          fullDescription: 'Paker是一个现代化的C++包管理工具，旨在简化C++项目的依赖管理。支持CMake集成，提供简单的命令行接口，让开发者能够轻松管理项目依赖。项目使用C++17标准开发，采用模块化设计，支持多种包格式。',
          icon: 'CodeBracketIcon',
          color: '#3182ce',
          gradient: 'linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%)',
          date: '2025年9月',
          role: '核心开发者',
          technologies: ['C++17', 'CMake', 'Package Management', 'CLI'],
          features: ['CMake集成支持', '命令行接口', '依赖解析', '包版本管理', '模块化架构', '跨平台支持'],
          demoUrl: 'https://github.com/Cyxuan0311/Paker',
          githubUrl: 'https://github.com/Cyxuan0311/Paker'
        },
        {
          id: 2,
          title: 'cuOP - CUDA算子库',
          category: 'HPC/GPU计算',
          type: 'hpc',
          description: '支持CUDA的算子库，提供智能内存控制和JIT编译功能，专为高性能GPU计算设计',
          fullDescription: 'cuOP是一个高性能的CUDA算子库，专为GPU计算优化。支持智能内存管理、JIT编译和多种GPU操作。项目使用现代C++和CUDA技术，为HPC应用提供高效的GPU计算能力。',
          icon: 'CpuChipIcon',
          color: '#38a169',
          gradient: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)',
          date: '2025年9月',
          role: '核心开发者',
          technologies: ['CUDA', 'C++', 'HPC', 'JIT', 'GPU Computing'],
          features: ['智能内存管理', 'JIT编译支持', 'GPU操作优化', '高性能计算', 'CUDA集成', '多GPU支持'],
          demoUrl: 'https://github.com/Cyxuan0311/cuOP',
          githubUrl: 'https://github.com/Cyxuan0311/cuOP'
        },
        {
          id: 3,
          title: 'FTB - 文件浏览器',
          category: '终端应用',
          type: 'tool',
          description: '基于FTXUI和Linux的C++文件浏览器，提供现代化的终端文件管理体验',
          fullDescription: 'FTB是一个基于FTXUI库开发的现代化终端文件浏览器。使用C++和CMake构建，提供直观的文件管理界面，支持Linux平台。项目展示了现代C++在终端应用开发中的应用。',
          icon: 'ComputerDesktopIcon',
          color: '#d69e2e',
          gradient: 'linear-gradient(135deg, #d69e2e 0%, #b7791f 100%)',
          date: '2025年9月',
          role: '核心开发者',
          technologies: ['C++', 'FTXUI', 'Linux', 'CMake', 'Terminal UI'],
          features: ['终端UI界面', '文件系统操作', 'FTXUI集成', '跨平台支持', '键盘快捷键', '文件预览'],
          demoUrl: 'https://github.com/Cyxuan0311/FTB',
          githubUrl: 'https://github.com/Cyxuan0311/FTB'
        },
        {
          id: 4,
          title: 'Nexus - 代码编辑器',
          category: '桌面应用',
          type: 'tool',
          description: '基于Qt5的XML/Markdown/编程语言结构编辑器，提供可视化的代码结构展示',
          fullDescription: 'Nexus是一个基于Qt5开发的代码编辑器，专门用于显示XML、Markdown和编程语言的结构。使用C++17和CMake构建，提供直观的代码结构可视化功能。',
          icon: 'WrenchScrewdriverIcon',
          color: '#805ad5',
          gradient: 'linear-gradient(135deg, #805ad5 0%, #6b46c1 100%)',
          date: '2025年9月',
          role: '核心开发者',
          technologies: ['C++17', 'Qt5', 'CMake', 'XML Parser', 'Markdown'],
          features: ['Qt5界面架构', 'XML/Markdown解析', '代码结构可视化', '语法高亮', '文件管理', '插件系统'],
          demoUrl: 'https://github.com/Cyxuan0311/Nexus',
          githubUrl: 'https://github.com/Cyxuan0311/Nexus'
        },
        {
          id: 5,
          title: 'SPIDERS - 新闻爬虫',
          category: 'Java应用',
          type: 'java',
          description: '基于Java的新闻爬虫应用，使用Jsoup进行网页爬取，Swing构建UI，MySQL存储数据',
          fullDescription: 'SPIDERS是一个基于Java开发的新闻爬虫应用。使用Jsoup库进行网页内容爬取，将新闻信息存储到MySQL数据库，使用Swing构建用户界面。项目采用Maven管理依赖，使用JUnit进行单元测试，Lombok简化代码编写。',
          icon: 'CubeIcon',
          color: '#e53e3e',
          gradient: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
          date: '2025年5月',
          role: '全栈开发者',
          technologies: ['Java', 'Maven', 'Jsoup', 'Swing', 'MySQL', 'JUnit', 'Lombok'],
          features: ['网页内容爬取', 'Swing用户界面', 'MySQL数据存储', 'Maven依赖管理', 'JUnit单元测试', 'Lombok代码简化'],
          demoUrl: 'https://github.com/Cyxuan0311/SPIDERS',
          githubUrl: 'https://github.com/Cyxuan0311/SPIDERS'
        },
        {
          id: 6,
          title: 'Easy_Log - 日志系统',
          category: 'C++系统',
          type: 'cpp',
          description: '基于Linux平台的简单日志系统，提供高效的日志记录和管理功能',
          fullDescription: 'Easy_Log是一个专为Linux平台设计的轻量级日志系统。使用C++开发，提供高效的日志记录、分级管理和文件输出功能。项目采用现代C++特性，确保高性能和易用性。',
          icon: 'CodeBracketIcon',
          color: '#dd6b20',
          gradient: 'linear-gradient(135deg, #dd6b20 0%, #c05621 100%)',
          date: '2025年2月',
          role: '核心开发者',
          technologies: ['C++', 'Linux', 'Logging', 'File I/O'],
          features: ['多级日志记录', '文件输出管理', '性能优化', '线程安全', '配置灵活', '跨平台支持'],
          demoUrl: 'https://github.com/Cyxuan0311/Easy_Log',
          githubUrl: 'https://github.com/Cyxuan0311/Easy_Log'
        }
      ]
    },
    blog: {
      pageHeader: {
        title: '技术博客',
        subtitle: '分享我的技术见解和学习心得'
      },
      readMore: '阅读全文',
      posts: [
        {
          id: 1,
          title: 'C++17包管理器的设计与实现',
          excerpt: '基于Paker项目的经验分享，深入探讨C++包管理器的设计理念、架构实现和CMake集成的最佳实践。',
          date: '2025-09-17',
          category: 'C/C++',
          views: 1250,
          comments: 23,
          likes: 89
        },
        {
          id: 2,
          title: 'CUDA操作库的性能优化实践',
          excerpt: '从cuOP项目出发，分享CUDA编程中的内存管理、JIT编译和GPU计算优化的实战经验和技巧。',
          date: '2025-09-15',
          category: 'HPC/GPU',
          views: 980,
          comments: 15,
          likes: 67
        },
        {
          id: 3,
          title: '现代C++终端应用开发指南',
          excerpt: '基于FTB文件浏览器的开发经验，介绍使用FTXUI库开发现代化终端应用的设计思路和实现方法。',
          date: '2025-09-12',
          category: 'C/C++',
          views: 756,
          comments: 12,
          likes: 45
        },
        {
          id: 4,
          title: '高性能C++日志库的设计与实现',
          excerpt: '基于ELog项目的实践经验，深入探讨现代C++日志库的设计理念、性能优化和最佳实践。',
          date: '2025-09-10',
          category: 'C/C++',
          views: 892,
          comments: 18,
          likes: 72
        },
        {
          id: 5,
          title: 'Nexus：高性能网络中间件框架',
          excerpt: '基于Nexus项目的设计经验，探讨现代C++网络中间件框架的架构设计和实现方法。',
          date: '2025-09-08',
          category: 'C/C++',
          views: 634,
          comments: 8,
          likes: 38
        },
        {
          id: 6,
          title: 'SPIDERS：分布式网络爬虫框架',
          excerpt: '基于SPIDERS项目的实践经验，分享高性能分布式爬虫系统的设计思路和实现技巧。',
          date: '2025-09-05',
          category: 'C/C++',
          views: 1123,
          comments: 25,
          likes: 91
        }
      ]
    },
    contact: {
      pageHeader: {
        title: '联系我',
        subtitle: '让我们开始交流吧'
      },
      infoTitle: '联系方式',
      formTitle: '发送消息',
      methods: [
        {
          key: 'email',
          icon: 'EnvelopeIcon',
          label: '邮箱',
          value: 'cyxvvv@gmail.com',
          actionText: '发送邮件',
          href: 'mailto:cyxvvv@gmail.com',
          extra: null
        },
        {
          key: 'github',
          icon: 'CodeBracketIcon',
          label: 'GitHub',
          value: 'Cyxuan0311',
          actionText: '访问主页',
          href: 'https://github.com/Cyxuan0311',
          extra: null
        },
        {
          key: 'location',
          icon: 'MapPinIcon',
          label: '位置',
          value: '中国武汉',
          actionText: null,
          href: null,
          extra: '欢迎交流'
        }
      ],
      form: {
        name: '姓名',
        email: '邮箱',
        subject: '主题',
        message: '消息'
      },
      sendMessage: '发送消息',
      sending: '发送中...',
      alertSuccess: '消息发送成功！我会尽快回复您。'
    },
    footer: {
      linkGroups: [
        {
          title: '快速导航',
          links: [
            { href: '#home', label: '首页' },
            { href: '#about', label: '关于我' },
            { href: '#portfolio', label: '作品展示' },
            { href: '#contact', label: '联系我' }
          ]
        },
        {
          title: '技能专长',
          links: [
            { href: '#skills', label: 'C/C++ 开发' },
            { href: '#skills', label: 'AI 基础设施' },
            { href: '#skills', label: '高性能计算' },
            { href: '#skills', label: '容器化技术' }
          ]
        }
      ],
      bottom: [
        '© 2025 Personal Website. 保留所有权利.',
        '用 ❤️ 和 Vue.js 构建'
      ]
    }
  },
  en: {
    app: {
      profile: {
        name: 'Frames',
        title: 'C/C++ & AI Infrastructure & HPC Enthusiast',
        description: 'Focused on high-performance computing and AI infrastructure'
      },
      menuItems: [
        { key: 'home', name: 'Home', href: '#home', icon: 'HomeIcon' },
        { key: 'about', name: 'About', href: '#about', icon: 'UserIcon' },
        { key: 'skills', name: 'Skills', href: '#skills', icon: 'CodeBracketIcon' },
        { key: 'portfolio', name: 'Portfolio', href: '#portfolio', icon: 'BriefcaseIcon' },
        { key: 'blog', name: 'Blog', href: '#blog', icon: 'DocumentTextIcon' },
        { key: 'games', name: 'Games', href: '#games', icon: 'SparklesIcon' },
        { key: 'contact', name: 'Contact', href: '#contact', icon: 'EnvelopeIcon' }
      ],
      tabs: [
        { id: 'home', name: 'Home', icon: 'HomeIcon' },
        { id: 'about', name: 'About', icon: 'UserIcon' },
        { id: 'skills', name: 'Skills', icon: 'CodeBracketIcon' },
        { id: 'portfolio', name: 'Portfolio', icon: 'BriefcaseIcon' },
        { id: 'blog', name: 'Blog', icon: 'DocumentTextIcon' },
        { id: 'games', name: 'Games', icon: 'SparklesIcon' },
        { id: 'contact', name: 'Contact', icon: 'EnvelopeIcon' }
      ],
      socialLinks: [
        {
          key: 'github',
          text: 'GitHub',
          tooltip: 'GitHub',
          href: 'https://github.com/Cyxuan0311',
          class: 'github',
          icon: 'CodeBracketIcon'
        },
        {
          key: 'email',
          text: 'Email',
          tooltip: 'Email',
          href: 'mailto:cyxvvv@gmail.com',
          class: 'email',
          icon: 'EnvelopeIcon'
        }
      ],
      loadingText: 'Loading...',
      languageButton: '中文'
    },
    home: {
      timezone: 'China Standard Time (UTC+8)',
      hero: {
        title: "Hi, I'm Frames",
        subtitle: 'C/C++ & AI Infrastructure & HPC Enthusiast',
        description: 'Based in Wuhan, China, focusing on high-performance computing and AI infrastructure R&D',
        actions: {
          primary: 'Learn More',
          secondary: 'Contact Me'
        }
      },
      sections: {
        coreSkills: 'Core Skills',
        latestProjects: 'Featured Projects',
        quickNav: 'Quick Navigation'
      },
      coreSkills: [
        {
          name: 'C/C++',
          description: 'High-performance systems programming',
          icon: 'CodeBracketIcon'
        },
        {
          name: 'AI Infrastructure',
          description: 'Machine learning platforms & distributed training',
          icon: 'CpuChipIcon'
        },
        {
          name: 'HPC',
          description: 'High-performance and parallel computing',
          icon: 'BoltIcon'
        },
        {
          name: 'Containerization',
          description: 'Docker and Kubernetes orchestration',
          icon: 'CubeIcon'
        }
      ],
      featuredProjects: [
        {
          id: 1,
          title: 'Paker - C++ Package Manager',
          description: 'Package controller for C++ projects with CMake integration and a simple CLI',
          icon: 'CodeBracketIcon',
          gradient: 'linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%)',
          technologies: ['C++17', 'CMake', 'Package Management', 'CLI']
        },
        {
          id: 2,
          title: 'cuOP - CUDA Operator Library',
          description: 'CUDA-ready operator library with smart memory control and JIT compilation',
          icon: 'CpuChipIcon',
          gradient: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)',
          technologies: ['CUDA', 'C++', 'HPC', 'JIT', 'GPU Computing']
        },
        {
          id: 3,
          title: 'FTB - File Browser',
          description: 'C++ terminal file browser built with FTXUI for a modern TUI experience',
          icon: 'ComputerDesktopIcon',
          gradient: 'linear-gradient(135deg, #d69e2e 0%, #b7791f 100%)',
          technologies: ['C++', 'FTXUI', 'Linux', 'CMake', 'Terminal UI']
        }
      ],
      quickNav: [
        {
          target: 'about',
          title: 'About Me',
          description: 'Discover my background and journey',
          icon: 'UserIcon'
        },
        {
          target: 'skills',
          title: 'Expertise',
          description: 'Explore my technical stack',
          icon: 'CodeBracketIcon'
        },
        {
          target: 'portfolio',
          title: 'Portfolio',
          description: 'Browse my project work',
          icon: 'BriefcaseIcon'
        },
        {
          target: 'blog',
          title: 'Tech Blog',
          description: 'Read my technical writing',
          icon: 'DocumentTextIcon'
        },
        {
          target: 'contact',
          title: 'Contact',
          description: 'Get in touch with me',
          icon: 'EnvelopeIcon'
        }
      ],
      viewAll: 'View all projects →',
      loadingText: 'Loading...',
      scrollTopTitle: 'Back to top',
      weatherOptions: [
        { temperature: 22, description: 'Cloudy', location: 'Wuhan, China' },
        { temperature: 25, description: 'Sunny', location: 'Wuhan, China' },
        { temperature: 18, description: 'Light Rain', location: 'Wuhan, China' },
        { temperature: 28, description: 'Sunny', location: 'Wuhan, China' }
      ]
    },
    about: {
      pageHeader: {
        title: 'About Me',
        subtitle: 'Learn about my background, experience, and expertise'
      },
      intro: {
        title: "Hi, I'm Frames",
        highlights: [
          {
            icon: 'HandRaisedIcon',
            text: 'Hello! I’m <strong>Frames</strong> from Wuhan, China.'
          },
          {
            icon: 'EyeIcon',
            text: 'I’m passionate about <span class="tech-tag cpp-tag">C/C++</span>, <span class="tech-tag ai-tag">AI infrastructure</span>, and <span class="tech-tag hpc-tag">HPC</span>.'
          },
          {
            icon: 'AcademicCapIcon',
            text: 'Currently studying with a focus on high-performance computing and AI infrastructure.'
          },
          {
            icon: 'EnvelopeIcon',
            text: 'Reach me at <a href="mailto:cyxvvv@gmail.com">cyxvvv@gmail.com</a>'
          },
          {
            icon: 'HeartIcon',
            text: 'I enjoy reading and movies to keep life balanced beyond code.'
          }
        ]
      },
      stats: [
        { number: 'C/C++', label: 'Core Language' },
        { number: 'AI', label: 'Infrastructure' },
        { number: 'HPC', label: 'High Performance' }
      ],
      education: {
        title: 'Education',
        timeline: [
          {
            year: '2021 - Present',
            title: 'Computer Science & Technology',
            school: 'Wuhan Textile University',
            description: 'Studying and researching high-performance computing and artificial intelligence'
          }
        ]
      },
      techStack: {
        title: 'Tech Stack',
        categories: [
          { title: 'Programming Languages', img: 'https://skillicons.dev/icons?i=c,cpp,python,go', alt: 'Programming Languages' },
          { title: 'AI & Machine Learning', img: 'https://skillicons.dev/icons?i=pytorch,tensorflow,docker,kubernetes', alt: 'AI & Machine Learning' },
          { title: 'Developer Tools', img: 'https://skillicons.dev/icons?i=git,mysql,postgres,cmake', alt: 'Developer Tools' },
          { title: 'Operating Systems', img: 'https://skillicons.dev/icons?i=linux,ubuntu', alt: 'Operating Systems' },
          { title: 'Editors', img: 'https://skillicons.dev/icons?i=vscode,sublime,vim', alt: 'Editors' }
        ]
      },
      interests: {
        title: 'Interests',
        items: [
          { icon: 'BookOpenIcon', title: 'Reading', description: 'Tech books and sci-fi novels' },
          { icon: 'FilmIcon', title: 'Movies', description: 'All genres, especially science fiction' },
          { icon: 'BoltIcon', title: 'Sports', description: 'Running and fitness to stay healthy' },
          { icon: 'MusicalNoteIcon', title: 'Music', description: 'A wide range of music, especially classical' }
        ]
      }
    },
    skills: {
      pageHeader: {
        title: 'Skills & Expertise',
        subtitle: 'My technical stack and professional capabilities'
      },
      techShowcaseTitle: 'Tech Stack Overview',
      techIconRows: [
        { src: 'https://skillicons.dev/icons?i=c,cpp,python,go', alt: 'Programming Languages' },
        { src: 'https://skillicons.dev/icons?i=pytorch,tensorflow,docker,kubernetes', alt: 'AI & Machine Learning' },
        { src: 'https://skillicons.dev/icons?i=git,mysql,postgres,cmake', alt: 'Developer Tools' },
        { src: 'https://skillicons.dev/icons?i=linux,ubuntu', alt: 'Operating Systems' },
        { src: 'https://skillicons.dev/icons?i=vscode,sublime,vim', alt: 'Editors' }
      ],
      categories: [
        {
          key: 'programming',
          name: 'Programming Languages',
          icon: 'CodeBracketIcon',
          color: '#3182ce',
          skills: [
            { name: 'C/C++', level: 95 },
            { name: 'Python', level: 90 },
            { name: 'Go', level: 80 },
            { name: 'Shell Script', level: 75 }
          ]
        },
        {
          key: 'ai',
          name: 'AI & Machine Learning',
          icon: 'CpuChipIcon',
          color: '#38a169',
          skills: [
            { name: 'PyTorch', level: 90 },
            { name: 'TensorFlow', level: 85 },
            { name: 'CUDA', level: 80 },
            { name: 'OpenMP', level: 75 }
          ]
        },
        {
          key: 'containers',
          name: 'Containerization & Orchestration',
          icon: 'CubeIcon',
          color: '#d69e2e',
          skills: [
            { name: 'Docker', level: 90 },
            { name: 'Kubernetes', level: 85 },
            { name: 'Podman', level: 70 },
            { name: 'Helm', level: 75 }
          ]
        },
        {
          key: 'database',
          name: 'Databases & Storage',
          icon: 'CircleStackIcon',
          color: '#e53e3e',
          skills: [
            { name: 'MySQL', level: 85 },
            { name: 'PostgreSQL', level: 80 },
            { name: 'Redis', level: 75 },
            { name: 'MongoDB', level: 70 }
          ]
        },
        {
          key: 'tools',
          name: 'Developer Tools',
          icon: 'WrenchScrewdriverIcon',
          color: '#805ad5',
          skills: [
            { name: 'Git', level: 95 },
            { name: 'CMake', level: 90 },
            { name: 'Make', level: 85 },
            { name: 'GDB', level: 80 }
          ]
        },
        {
          key: 'os',
          name: 'Operating Systems',
          icon: 'ComputerDesktopIcon',
          color: '#dd6b20',
          skills: [
            { name: 'Linux', level: 95 },
            { name: 'Ubuntu', level: 90 },
            { name: 'CentOS', level: 85 },
            { name: 'Arch Linux', level: 80 }
          ]
        }
      ]
    },
    portfolio: {
      sectionTitle: 'Portfolio',
      sectionSubtitle: 'Selected projects and work highlights',
      filters: [
        { key: 'all', label: 'All' },
        { key: 'cpp', label: 'C++' },
        { key: 'hpc', label: 'HPC/GPU' },
        { key: 'java', label: 'Java' },
        { key: 'tool', label: 'Tools' }
      ],
      overlayLabel: 'View details',
      demoLabel: 'Demo',
      codeLabel: 'Code',
      modal: {
        descriptionTitle: 'Project Description',
        featuresTitle: 'Key Features',
        techTitle: 'Tech Stack',
        demoButton: 'View Demo',
        codeButton: 'View Code'
      },
      projects: [
        {
          id: 1,
          title: 'Paker - C++ Package Manager',
          category: 'C++ Development',
          type: 'cpp',
          description: 'Package controller for C++ projects with CMake integration and a streamlined CLI.',
          fullDescription: 'Paker is a modern C++ package manager that simplifies dependency management. It integrates seamlessly with CMake, offers a friendly command-line interface, and supports multiple package formats built with C++17.',
          icon: 'CodeBracketIcon',
          color: '#3182ce',
          gradient: 'linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%)',
          date: 'Sep 2025',
          role: 'Lead Developer',
          technologies: ['C++17', 'CMake', 'Package Management', 'CLI'],
          features: [
            'CMake integration',
            'Command-line interface',
            'Dependency resolution',
            'Versioned packages',
            'Modular architecture',
            'Cross-platform support'
          ],
          demoUrl: 'https://github.com/Cyxuan0311/Paker',
          githubUrl: 'https://github.com/Cyxuan0311/Paker'
        },
        {
          id: 2,
          title: 'cuOP - CUDA Operator Library',
          category: 'HPC/GPU Computing',
          type: 'hpc',
          description: 'CUDA-focused operator library with smart memory control and JIT compilation for GPU workloads.',
          fullDescription: 'cuOP is a high-performance CUDA operator library optimized for GPU computation. It features smart memory management, JIT compilation, and modern C++ design to empower HPC applications.',
          icon: 'CpuChipIcon',
          color: '#38a169',
          gradient: 'linear-gradient(135deg, #38a169 0%, #2f855a 100%)',
          date: 'Sep 2025',
          role: 'Core Developer',
          technologies: ['CUDA', 'C++', 'HPC', 'JIT', 'GPU Computing'],
          features: [
            'Smart memory management',
            'JIT compilation',
            'Optimized GPU ops',
            'High-performance kernels',
            'CUDA integration',
            'Multi-GPU support'
          ],
          demoUrl: 'https://github.com/Cyxuan0311/cuOP',
          githubUrl: 'https://github.com/Cyxuan0311/cuOP'
        },
        {
          id: 3,
          title: 'FTB - File Browser',
          category: 'Terminal Application',
          type: 'tool',
          description: 'C++ terminal file browser built with FTXUI delivering a modern TUI experience.',
          fullDescription: 'FTB is a terminal-based file browser built with FTXUI. It showcases modern C++ and CMake practices, offering intuitive navigation and Linux-friendly workflows.',
          icon: 'ComputerDesktopIcon',
          color: '#d69e2e',
          gradient: 'linear-gradient(135deg, #d69e2e 0%, #b7791f 100%)',
          date: 'Sep 2025',
          role: 'Core Developer',
          technologies: ['C++', 'FTXUI', 'Linux', 'CMake', 'Terminal UI'],
          features: [
            'Modern terminal UI',
            'File system actions',
            'FTXUI integration',
            'Cross-platform support',
            'Keyboard shortcuts',
            'File preview'
          ],
          demoUrl: 'https://github.com/Cyxuan0311/FTB',
          githubUrl: 'https://github.com/Cyxuan0311/FTB'
        },
        {
          id: 4,
          title: 'Nexus - Code Editor',
          category: 'Desktop Application',
          type: 'tool',
          description: 'Qt5-based structure editor for XML/Markdown/code with visual exploration.',
          fullDescription: 'Nexus is a Qt5 desktop editor that visualizes XML, Markdown, and programming language structures. Built with C++17 and CMake, it focuses on code insights and extendable tooling.',
          icon: 'WrenchScrewdriverIcon',
          color: '#805ad5',
          gradient: 'linear-gradient(135deg, #805ad5 0%, #6b46c1 100%)',
          date: 'Sep 2025',
          role: 'Lead Developer',
          technologies: ['C++17', 'Qt5', 'CMake', 'XML Parser', 'Markdown'],
          features: [
            'Qt5 UI architecture',
            'XML/Markdown parsing',
            'Structural visualization',
            'Syntax highlighting',
            'File management',
            'Plugin system'
          ],
          demoUrl: 'https://github.com/Cyxuan0311/Nexus',
          githubUrl: 'https://github.com/Cyxuan0311/Nexus'
        },
        {
          id: 5,
          title: 'SPIDERS - News Crawler',
          category: 'Java Application',
          type: 'java',
          description: 'Java-powered news crawler using Jsoup, Swing UI, and MySQL persistence.',
          fullDescription: 'SPIDERS is a Java news crawler that leverages Jsoup for scraping, Swing for UI, and MySQL for storage. Maven, JUnit, and Lombok streamline the development workflow.',
          icon: 'CubeIcon',
          color: '#e53e3e',
          gradient: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
          date: 'May 2025',
          role: 'Full-stack Developer',
          technologies: ['Java', 'Maven', 'Jsoup', 'Swing', 'MySQL', 'JUnit', 'Lombok'],
          features: [
            'Web scraping',
            'Swing desktop UI',
            'MySQL storage',
            'Maven dependency management',
            'JUnit unit tests',
            'Lombok productivity'
          ],
          demoUrl: 'https://github.com/Cyxuan0311/SPIDERS',
          githubUrl: 'https://github.com/Cyxuan0311/SPIDERS'
        },
        {
          id: 6,
          title: 'Easy_Log - Logging System',
          category: 'C++ Systems',
          type: 'cpp',
          description: 'Lightweight Linux logging framework focused on speed and manageability.',
          fullDescription: 'Easy_Log is a lightweight logging framework for Linux built with modern C++. It offers leveled logging, file management, and strong performance characteristics.',
          icon: 'CodeBracketIcon',
          color: '#dd6b20',
          gradient: 'linear-gradient(135deg, #dd6b20 0%, #c05621 100%)',
          date: 'Feb 2025',
          role: 'Core Developer',
          technologies: ['C++', 'Linux', 'Logging', 'File I/O'],
          features: [
            'Multi-level logging',
            'File output control',
            'Performance tuning',
            'Thread-safe design',
            'Flexible configuration',
            'Cross-platform ready'
          ],
          demoUrl: 'https://github.com/Cyxuan0311/Easy_Log',
          githubUrl: 'https://github.com/Cyxuan0311/Easy_Log'
        }
      ]
    },
    blog: {
      pageHeader: {
        title: 'Tech Blog',
        subtitle: 'Sharing technical insights and learning journeys'
      },
      readMore: 'Read more',
      posts: [
        {
          id: 1,
          title: 'Designing a C++17 Package Manager',
          excerpt: 'Lessons from building Paker, covering architecture decisions and CMake integration best practices.',
          date: '2025-09-17',
          category: 'C/C++',
          views: 1250,
          comments: 23,
          likes: 89
        },
        {
          id: 2,
          title: 'CUDA Operator Optimization in Practice',
          excerpt: 'Practical tips on memory, JIT compilation, and GPU tuning inspired by the cuOP project.',
          date: '2025-09-15',
          category: 'HPC/GPU',
          views: 980,
          comments: 15,
          likes: 67
        },
        {
          id: 3,
          title: 'Modern C++ Terminal UI Development',
          excerpt: 'How FTB leverages FTXUI to build elegant terminal interfaces with contemporary C++.',
          date: '2025-09-12',
          category: 'C/C++',
          views: 756,
          comments: 12,
          likes: 45
        },
        {
          id: 4,
          title: 'High-performance C++ Logging Library Design',
          excerpt: 'Practical insights from ELog on building modern C++ logging systems with performance optimization and best practices.',
          date: '2025-09-10',
          category: 'C/C++',
          views: 892,
          comments: 18,
          likes: 72
        },
        {
          id: 5,
          title: 'Nexus: High-performance Network Middleware Framework',
          excerpt: 'Design patterns and implementation strategies for modern C++ network middleware frameworks based on Nexus project.',
          date: '2025-09-08',
          category: 'C/C++',
          views: 634,
          comments: 8,
          likes: 38
        },
        {
          id: 6,
          title: 'SPIDERS: Distributed Web Crawler Framework',
          excerpt: 'Design insights and implementation techniques for high-performance distributed crawler systems from SPIDERS project.',
          date: '2025-09-05',
          category: 'C/C++',
          views: 1123,
          comments: 25,
          likes: 91
        }
      ]
    },
    contact: {
      pageHeader: {
        title: 'Contact Me',
        subtitle: "Let's start a conversation"
      },
      infoTitle: 'Ways to Reach Me',
      formTitle: 'Send a Message',
      methods: [
        {
          key: 'email',
          icon: 'EnvelopeIcon',
          label: 'Email',
          value: 'cyxvvv@gmail.com',
          actionText: 'Send Email',
          href: 'mailto:cyxvvv@gmail.com',
          extra: null
        },
        {
          key: 'github',
          icon: 'CodeBracketIcon',
          label: 'GitHub',
          value: 'Cyxuan0311',
          actionText: 'View Profile',
          href: 'https://github.com/Cyxuan0311',
          extra: null
        },
        {
          key: 'location',
          icon: 'MapPinIcon',
          label: 'Location',
          value: 'Wuhan, China',
          actionText: null,
          href: null,
          extra: 'Open to conversations'
        }
      ],
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message'
      },
      sendMessage: 'Send Message',
      sending: 'Sending...',
      alertSuccess: 'Message sent! I will get back to you soon.'
    },
    footer: {
      linkGroups: [
        {
          title: 'Quick Links',
          links: [
            { href: '#home', label: 'Home' },
            { href: '#about', label: 'About' },
            { href: '#portfolio', label: 'Portfolio' },
            { href: '#contact', label: 'Contact' }
          ]
        },
        {
          title: 'Expertise',
          links: [
            { href: '#skills', label: 'C/C++ Development' },
            { href: '#skills', label: 'AI Infrastructure' },
            { href: '#skills', label: 'High-performance Computing' },
            { href: '#skills', label: 'Containerization' }
          ]
        }
      ],
      bottom: [
        '© 2025 Personal Website. All rights reserved.',
        'Built with ❤️ and Vue.js'
      ]
    }
  }
}