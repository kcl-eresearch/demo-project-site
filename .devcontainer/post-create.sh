#!/usr/bin/env bash
set -euxo pipefail

echo "Enabling pnpm"
corepack enable pnpm

echo "Installing OpenCode CLI..."
curl -fsSL https://opencode.ai/install | bash

echo "Installing uv..."
curl -LsSf https://astral.sh/uv/install.sh | sh

echo "Dev container ready."

