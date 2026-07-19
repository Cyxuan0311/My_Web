export const messages = {
  zh: {
    app: {
      tabs: [
        { id: 'home', name: 'Home' },
        { id: 'about', name: 'About' }
      ],
      languageButton: '切换中文'
    },
    home: {
      subTabs: { projects: 'Projects', notes: 'Notes' },
      readMore: 'Read',
      back: 'Back',
      loading: 'Loading...',
      projects: [
        {
          id: 1, name: 'PNANA',
          description: 'A modern terminal text editor built with FTXUI, inspired by Nano, Micro, and Sublime Text.',
          language: 'C++', stars: 310,
          mdPath: '/resource/pnana.md'
        },
        {
          id: 2, name: 'FTB',
          description: 'A terminal-based file browser, built with C++17 and FTXUI.',
          language: 'C++', stars: 11,
          mdPath: '/resource/ftb.md'
        },
        {
          id: 3, name: 'Plmux',
          description: 'A lightweight, cross-platform terminal multiplexer inspired by tmux.',
          language: 'Python', stars: 4,
          mdPath: '/resource/plmux.md'
        },
        {
          id: 4, name: 'Forge',
          description: 'A lightweight LLM inference engine written from scratch in C++ and CUDA.',
          language: 'C++', stars: 1,
          mdPath: '/resource/forge.md'
        },
        {
          id: 5, name: 'Paker',
          description: 'A modern C++ package manager with intelligent dependency management.',
          language: 'C++', stars: 2,
          mdPath: '/resource/paker.md'
        },
        {
          id: 6, name: 'ELog',
          description: 'A cross-language logging library supporting C, C++, Go, and Python.',
          language: 'C++', stars: 3,
          mdPath: '/resource/elog.md'
        },
        {
          id: 7, name: 'cuOP',
          description: 'A CUDA-ready operator library with smart memory control and JIT compilation.',
          language: 'C++', stars: 1,
          mdPath: '/resource/cuop.md'
        },
        {
          id: 8, name: 'Fcon',
          description: 'An interactive 3D file system visualization teaching tool (Vue3 + Three.js).',
          language: 'JavaScript', stars: 1,
          mdPath: '/resource/fcon.md'
        },
        {
          id: 9, name: 'Nexus',
          description: 'An editor for XML, Markdown, and programming language structure.',
          language: 'JavaScript', stars: 1,
          mdPath: '/resource/nexus.md'
        },
        {
          id: 10, name: 'SPIDERS',
          description: 'A Java-based news crawler with Jsoup, Swing UI, and MySQL.',
          language: 'Java', stars: 2,
          mdPath: '/resource/spiders.md'
        }
      ],
      notes: [
        { id: 1, title: 'CPU to GPU的总线', description: '关于CPU与GPU之间总线架构的学习笔记', mdPath: '/resource/notes/CPU to GPU的总线.md' },
        { id: 2, title: 'CUDA Stream', description: 'CUDA流的概念、用法与并发机制', mdPath: '/resource/notes/CUDA Stream.md' },
        { id: 3, title: 'Cuda 数据模型架构', description: 'CUDA内存层次结构与数据模型分析', mdPath: '/resource/notes/Cuda 数据模型架构.md' },
        { id: 4, title: 'JIT 的"试验田"：WebGPU 后端', description: 'JIT编译在WebGPU后端中的应用', mdPath: '/resource/notes/JIT 的"试验田"：WebGPU 后端.md' },
        { id: 5, title: 'MOE模型', description: 'Mixture of Experts 模型架构详解', mdPath: '/resource/notes/MOE模型.md' },
        { id: 6, title: 'docker的从浅入深', description: 'Docker容器技术从入门到深入', mdPath: '/resource/notes/docker的从浅入深.md' },
        { id: 7, title: 'flashattention的原理是什么', description: 'FlashAttention 算法的核心原理', mdPath: '/resource/notes/flashattention的原理是什么.md' },
        { id: 8, title: 'llama.cpp 中的 DECL_MMQ_CASE 宏和 generate_cu_files.py 脚本', description: 'llama.cpp 代码生成与宏展开分析', mdPath: '/resource/notes/llama.cpp 中的 DECL_MMQ_CASE 宏和 generate_cu_files.py 脚本.md' },
        { id: 9, title: 'pageattention的原理是什么', description: 'PagedAttention 算法原理与实现', mdPath: '/resource/notes/pageattention的原理是什么.md' },
        { id: 10, title: '为什么 llama.cpp 死磕 AOT，而不像 PyTorch 那样拥抱 JIT', description: 'AOT与JIT编译策略对比分析', mdPath: '/resource/notes/为什么 llama.cpp 死磕 AOT，而不像 PyTorch 那样拥抱 JIT.md' },
        { id: 11, title: '为什么函数指针的效果高于if-else的效果', description: '函数指针与分支预测的性能分析', mdPath: '/resource/notes/为什么函数指针的效果高于if-else的效果.md' },
        { id: 12, title: '从单机到集群的GPU总线', description: 'GPU互联技术从单机到分布式集群', mdPath: '/resource/notes/从单机到集群的GPU总线.md' }
      ]
    },
    about: {
      pageTitle: 'About',
      pageDesc: 'Wuhan, China',
      github: 'Cyxuan0311',
      email: 'cyxvvv@gmail.com',
      bio: '<p><strong>C/C++</strong> · <strong>CUDA</strong> · <strong>HPC</strong> · <strong>AI Infrastructure</strong></p><p>Working on open-source projects in systems programming and GPU computing. Learning about LLM inference and low-level performance. 23 repos on GitHub.</p>'
    }
  },
  en: {
    app: {
      tabs: [
        { id: 'home', name: 'Home' },
        { id: 'about', name: 'About' }
      ],
      languageButton: 'Switch to EN'
    },
    home: {
      subTabs: { projects: 'Projects', notes: 'Notes' },
      readMore: 'Read',
      back: 'Back',
      loading: 'Loading...',
      projects: [
        {
          id: 1, name: 'PNANA',
          description: 'A modern terminal text editor built with FTXUI, inspired by Nano, Micro, and Sublime Text.',
          language: 'C++', stars: 310,
          mdPath: '/resource/pnana.md'
        },
        {
          id: 2, name: 'FTB',
          description: 'A terminal-based file browser, built with C++17 and FTXUI.',
          language: 'C++', stars: 11,
          mdPath: '/resource/ftb.md'
        },
        {
          id: 3, name: 'Plmux',
          description: 'A lightweight, cross-platform terminal multiplexer inspired by tmux.',
          language: 'Python', stars: 4,
          mdPath: '/resource/plmux.md'
        },
        {
          id: 4, name: 'Forge',
          description: 'A lightweight LLM inference engine written from scratch in C++ and CUDA.',
          language: 'C++', stars: 1,
          mdPath: '/resource/forge.md'
        },
        {
          id: 5, name: 'Paker',
          description: 'A modern C++ package manager with intelligent dependency management.',
          language: 'C++', stars: 2,
          mdPath: '/resource/paker.md'
        },
        {
          id: 6, name: 'ELog',
          description: 'A cross-language logging library supporting C, C++, Go, and Python.',
          language: 'C++', stars: 3,
          mdPath: '/resource/elog.md'
        },
        {
          id: 7, name: 'cuOP',
          description: 'A CUDA-ready operator library with smart memory control and JIT compilation.',
          language: 'C++', stars: 1,
          mdPath: '/resource/cuop.md'
        },
        {
          id: 8, name: 'Fcon',
          description: 'An interactive 3D file system visualization teaching tool (Vue3 + Three.js).',
          language: 'JavaScript', stars: 1,
          mdPath: '/resource/fcon.md'
        },
        {
          id: 9, name: 'Nexus',
          description: 'An editor for XML, Markdown, and programming language structure.',
          language: 'JavaScript', stars: 1,
          mdPath: '/resource/nexus.md'
        },
        {
          id: 10, name: 'SPIDERS',
          description: 'A Java-based news crawler with Jsoup, Swing UI, and MySQL.',
          language: 'Java', stars: 2,
          mdPath: '/resource/spiders.md'
        }
      ],
      notes: [
        { id: 1, title: 'CPU to GPU Bus', description: 'Bus architecture between CPU and GPU', mdPath: '/resource/notes/CPU to GPU的总线.md' },
        { id: 2, title: 'CUDA Stream', description: 'CUDA stream concepts and concurrency', mdPath: '/resource/notes/CUDA Stream.md' },
        { id: 3, title: 'CUDA Memory Model', description: 'CUDA memory hierarchy and data model', mdPath: '/resource/notes/Cuda 数据模型架构.md' },
        { id: 4, title: 'JIT Playground: WebGPU Backend', description: 'JIT compilation in WebGPU backend', mdPath: '/resource/notes/JIT 的"试验田"：WebGPU 后端.md' },
        { id: 5, title: 'MOE Model', description: 'Mixture of Experts architecture deep dive', mdPath: '/resource/notes/MOE模型.md' },
        { id: 6, title: 'Docker Deep Dive', description: 'Docker from beginner to advanced', mdPath: '/resource/notes/docker的从浅入深.md' },
        { id: 7, title: 'How FlashAttention Works', description: 'Core principles of FlashAttention', mdPath: '/resource/notes/flashattention的原理是什么.md' },
        { id: 8, title: 'DECL_MMQ_CASE and generate_cu_files.py in llama.cpp', description: 'Code generation and macro expansion in llama.cpp', mdPath: '/resource/notes/llama.cpp 中的 DECL_MMQ_CASE 宏和 generate_cu_files.py 脚本.md' },
        { id: 9, title: 'How PagedAttention Works', description: 'PagedAttention algorithm principles', mdPath: '/resource/notes/pageattention的原理是什么.md' },
        { id: 10, title: 'Why llama.cpp Uses AOT Instead of JIT', description: 'AOT vs JIT compilation strategy analysis', mdPath: '/resource/notes/为什么 llama.cpp 死磕 AOT，而不像 PyTorch 那样拥抱 JIT.md' },
        { id: 11, title: 'Why Function Pointers Beat If-Else', description: 'Performance analysis of function pointers vs branch prediction', mdPath: '/resource/notes/为什么函数指针的效果高于if-else的效果.md' },
        { id: 12, title: 'GPU Bus: Single Node to Cluster', description: 'GPU interconnect from single machine to distributed clusters', mdPath: '/resource/notes/从单机到集群的GPU总线.md' }
      ]
    },
    about: {
      pageTitle: 'About',
      pageDesc: 'Wuhan, China',
      github: 'Cyxuan0311',
      email: 'cyxvvv@gmail.com',
      bio: '<p><strong>C/C++</strong> · <strong>CUDA</strong> · <strong>HPC</strong> · <strong>AI Infrastructure</strong></p><p>Working on open-source projects in systems programming and GPU computing. Learning about LLM inference and low-level performance. 23 repos on GitHub.</p>'
    }
  }
}
