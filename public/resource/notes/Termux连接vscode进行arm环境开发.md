这是一份通过平板上的 **Termux** 开启 SSH 服务，然后在电脑 **VS Code** 中远程连接进行编程的详细教程。

---

### 准备工作

在开始前，请确保以下条件已满足：

1.  **平板与电脑**：平板（Android）和电脑（Windows/macOS/Linux）连接在**同一个局域网**下（例如，连接同一个 Wi-Fi）。
2.  **Termux 应用**：在平板上安装 Termux。**强烈建议从 F-Droid 商店下载**，因为 Google Play 版本可能更新不及时。
3.  **VS Code**：在电脑上安装好 Visual Studio Code。

---

### 第一步：在 Termux 中配置 SSH 服务器

这部分操作都在平板的 Termux 应用中进行。

1.  **更新软件包并安装 OpenSSH**
    打开 Termux，运行以下命令更新包列表并安装 SSH 服务：
    ```bash
    pkg update && pkg upgrade
    pkg install openssh -y
    ```

2.  **设置用户密码**
    为 Termux 的默认用户设置一个密码，用于后续 SSH 登录：
    ```bash
    passwd
    ```
    根据提示输入并确认你的密码（输入时屏幕不会显示，这是正常现象）。

3.  **启动 SSH 服务**
    在 Termux 中运行以下命令来启动 SSH 服务端：
    ```bash
    sshd
    ```
    > **注意**：Termux 的 SSH 服务默认监听在 **`8022`** 端口，而非标准的 `22` 端口。

4.  **获取平板 IP 地址和用户名**
    *   **查看 IP 地址**：运行以下命令，找到 `inet` 后面的地址（通常是 `192.168.x.x` 或 `10.x.x.x` 格式）：
        ```bash
        ip addr show
        # 或者 ifconfig
        ```
    *   **查看用户名**：运行以下命令，记住显示的用户名：
        ```bash
        whoami
        ```

    至此，你的平板已经变成了一台 SSH 服务器。请记下**平板 IP**、**用户名**和**你设置的密码**。

---

### 第二步：在 VS Code 中安装并配置 Remote-SSH

1.  **安装 Remote-SSH 插件**
    打开电脑上的 VS Code，点击左侧活动栏的“扩展”图标（或按 `Ctrl+Shift+X`），在搜索框中输入 `Remote - SSH`，找到由 Microsoft 发布的插件并点击“安装”。

2.  **添加 SSH 连接配置**
    *   安装完成后，点击 VS Code 左下角的 **远程连接图标**（绿色`><`样式的按钮）。
    *   在顶部弹出的命令面板中，选择 **“Connect to Host...”**。
    *   接着选择 **“Configure SSH Hosts...”**，然后选择第一个 SSH 配置文件（通常位于用户目录下的 `.ssh/config`）。

3.  **编辑 SSH 配置文件**
    在打开的 `config` 文件中，添加以下内容（请将对应信息替换为你的实际值）：
    ```
    Host Termux-Tablet
        HostName 192.168.x.x      # 替换为第一步中查到的平板 IP 地址
        User u0_a123              # 替换为第一步中查到的用户名
        Port 8022                 # Termux SSH 默认端口
    ```
    保存文件（`Ctrl+S`）。

---

### 第三步：连接并开始编程

1.  **发起连接**
    再次点击 VS Code 左下角的**远程连接图标**，选择 **“Connect to Host...”**，然后选择你刚刚配置的 `Termux-Tablet`。

2.  **输入密码**
    在新打开的 VS Code 窗口中，顶部会提示你输入密码。输入你在 Termux 中设置的密码后按回车。

3.  **连接成功**
    连接成功后，VS Code 窗口左下角的远程连接图标会显示 **“SSH: Termux-Tablet”**。现在，你可以像在本地一样，通过 VS Code 打开平板上的文件夹、编辑代码、使用终端，所有操作都将在平板上的 Termux 环境中执行。

---

### 进阶优化与常见问题

*   **使用密钥登录（免密且更安全）**
    每次输入密码比较繁琐，可以配置 SSH 密钥实现免密登录。
    1.  在电脑终端（非 VS Code 内）生成密钥对（如果已有可跳过）：
        ```bash
        ssh-keygen -t rsa
        ```
    2.  将电脑的公钥复制到平板 Termux 的授权文件中：
        ```bash
        ssh-copy-id -p 8022 u0_a123@192.168.x.x
        ```
        之后连接便无需再输入密码。

*   **关于稳定性与兼容性**
    直接在 Termux 原生环境中使用 Remote-SSH 可能会遇到库兼容性问题。如果遇到问题或希望获得更完整的 Linux 体验，可以考虑在 Termux 中通过 `proot-distro` 安装一个 Ubuntu 或 Debian 系统，然后在这个子系统内启动 SSH 服务，VS Code 连接子系统会更稳定。

*   **一个更简单的替代方案：Remote - Tunnels**
    如果配置 SSH 过于复杂，可以尝试微软官方推出的 **Remote - Tunnels** 扩展。它通过安全隧道连接，无需配置 SSH，设置更简单，且支持在浏览器（如 vscode.dev）中直接开发。

---

通过以上步骤，你就成功地将平板变成了一个便携的开发环境，可以在任何地方通过电脑的 VS Code 进行编程了。