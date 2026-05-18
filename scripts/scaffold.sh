#!/usr/bin/env bash
set -euo pipefail

# DuoBlySync Monorepo Scaffolder
# N.B: Uncomment sections as needed to create specific files for each framework as needed.

ROOT_DIR="$(pwd)"
PROJECT_NAME="DuoBlySync"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() { echo -e "${GREEN}✔ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠ $1${NC}"; }

echo -e "${BLUE}──────────────────────────────────────────────${NC}"
echo -e "${BLUE}   $PROJECT_NAME Monorepo Scaffolder           ${NC}"
echo -e "${BLUE}──────────────────────────────────────────────${NC}"

# ───────────────────────────────────────────────
# ROOT STRUCTURE
# ───────────────────────────────────────────────

mkdir -p "$ROOT_DIR"/{api,web,app,deploy,docs} # Add more root folders as needed e.g., scripts

touch "$ROOT_DIR"/{CHANGELOG.md,CONTRIBUTING.md,CODEOWNERS,.editorconfig,Makefile}

log "Root folders created"

# ───────────────────────────────────────────────
# API ( Backend Frameworks: Go + Node + Python )
# ───────────────────────────────────────────────

mkdir -p "$ROOT_DIR/api" #{go,python,node}

touch "$ROOT_DIR/api/.gitkeep"
# touch "$ROOT_DIR/api/go/main.go"
# touch "$ROOT_DIR/api/python/main.py"
# touch "$ROOT_DIR/api/node/index.js"

log "API structure created"

# ─────────────────────────────────────────────────────────────
# WEB (Frontend Framework: React(App) + Dashboard + Supabase)
# ─────────────────────────────────────────────────────────────   

mkdir -p "$ROOT_DIR/web"/app #{app,dashboard,supabase}

touch "$ROOT_DIR/web/app/.gitkeep"
# touch "$ROOT_DIR/web/dashboard/.gitkeep"
# touch "$ROOT_DIR/web/supabase/config.toml"

log "Web structure created"

# ───────────────────────────────────────────────
# Mobile APP (framework: Flutter + Android + iOS)
# ───────────────────────────────────────────────

mkdir -p "$ROOT_DIR/app"/{flutter,android,ios}
touch "$ROOT_DIR/app/flutter/.gitkeep"
touch "$ROOT_DIR/app/android/.gitkeep"
touch "$ROOT_DIR/app/ios/.gitkeep"
# mkdir -p "$ROOT_DIR/app/flutter"/{lib,test,assets}
# touch "$ROOT_DIR/app/flutter/pubspec.yaml"

log "App structure created"

# ───────────────────────────────────────────────
# DEPLOY (Docker + Helm + Terraform)
# ───────────────────────────────────────────────

mkdir -p "$ROOT_DIR/deploy"/{docker,helm,terraform}

touch "$ROOT_DIR/deploy/docker/docker-compose.yml"
touch "$ROOT_DIR/deploy/helm/Chart.yaml"
touch "$ROOT_DIR/deploy/terraform/main.tf"

log "Deploy structure created"

# ───────────────────────────────────────────────
# DOCS
# ───────────────────────────────────────────────

mkdir -p "$ROOT_DIR/docs"/{architecture,api,guides}
touch "$ROOT_DIR/docs/architecture/.gitkeep"

log "Docs structure created"

# ───────────────────────────────────────────────
# SCRIPTS (placeholder for linting, testing, hooks, etc. )
# ───────────────────────────────────────────────

cat > "$ROOT_DIR/scripts/lint.sh" << 'EOF'
#!/usr/bin/env bash
echo "Running lint checks..."
EOF

cat > "$ROOT_DIR/scripts/test.sh" << 'EOF'
#!/usr/bin/env bash
echo "Running tests..."
EOF

chmod +x "$ROOT_DIR/scripts/"*.sh

log "Scripts added"

# ───────────────────────────────────────────────
# DONE
# ───────────────────────────────────────────────

echo -e "${BLUE}──────────────────────────────────────────────${NC}"
echo -e "${GREEN} $PROJECT_NAME monorepo structure created.${NC}"
echo -e "${BLUE}──────────────────────────────────────────────${NC}"
