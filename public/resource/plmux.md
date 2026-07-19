# Plmux — Terminal Multiplexer

> A lightweight, cross-platform terminal multiplexer inspired by tmux.

## Overview

Plmux is a terminal multiplexer that allows you to manage multiple terminal sessions from a single window. Inspired by the legendary tmux, Plmux aims to provide a similar experience with a focus on simplicity and cross-platform compatibility.

Built with Python and Rich for the core, with performance-critical components written in C extensions.

## Key Features

- **Session Management** — Create, detach, and reattach terminal sessions
- **Window Splitting** — Split terminals horizontally and vertically
- **Pane Navigation** — Intuitive keyboard shortcuts for pane switching
- **Cross-Platform** — Works on Linux, macOS, and Windows
- **Customizable** — Configuration file support for personalized keybindings
- **Lightweight** — Minimal resource usage compared to full terminal emulators

## Technical Highlights

- Hybrid Python/C architecture for both developer productivity and performance
- Rich library integration for beautiful terminal rendering
- UNIX socket-based communication for session management
- Signal handling for graceful session detachment and reattachment

## Links

- [GitHub Repository](https://github.com/Cyxuan0311/Plmux)
