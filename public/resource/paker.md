# Paker — C++ Package Manager

> A modern C++ package manager with intelligent dependency management, colorful CLI, and GitHub-powered package recommendations.

## Overview

Paker reimagines C++ package management by providing a developer-friendly tool that integrates seamlessly with CMake. It simplifies the notoriously difficult task of managing C++ dependencies, making it as easy as package managers in other ecosystems.

## Key Features

- **CMake Integration** — Seamless integration with existing CMake projects
- **CLI Interface** — Clean, colorful command-line interface with progress indicators
- **Dependency Resolution** — Intelligent dependency graph resolution and version management
- **Package Discovery** — GitHub-powered package search and recommendations
- **Cache System** — Local package caching for faster builds
- **Cross-Platform** — Works on Linux, macOS, and Windows

## Technical Highlights

- Written in modern C++17 with the nlohmann/json library
- HTTP client built on libcurl for GitHub API and package fetching
- Thread-safe package installation with atomic file operations
- JSON-based manifest format for package definitions

## Links

- [GitHub Repository](https://github.com/Cyxuan0311/Paker)
