# Quick Start Guide

## 🚀 Publishing Your First Release

### Prerequisites
- [ ] GitHub repository created
- [ ] Code pushed to `main` branch
- [ ] NPM account created
- [ ] NPM token generated

### Step 1: Add NPM Token to GitHub

1. Get your NPM token:
   ```bash
   # Login to npmjs.com
   # Go to: https://www.npmjs.com/settings/YOUR_USERNAME/tokens
   # Click "Generate New Token" → "Classic Token" → "Automation"
   # Copy the token
   ```

2. Add to GitHub:
   ```
   GitHub Repo → Settings → Secrets and variables → Actions
   → New repository secret
   Name: NPM_TOKEN
   Value: [paste your token]
   ```

### Step 2: Update Repository Information

Edit `package.json`:
```json
{
  "repository": {
    "url": "https://github.com/YOUR_USERNAME/baidusearch-cli"
  },
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/baidusearch-cli/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/baidusearch-cli#readme"
}
```

Update README.md badges:
```markdown
[![CI](https://github.com/YOUR_USERNAME/baidusearch-cli/actions/workflows/ci.yml/badge.svg)]
```

### Step 3: Choose Publishing Method

#### Method A: Manual Workflow (Recommended)

1. Go to your repo on GitHub
2. Click **Actions** tab
3. Select **Publish** workflow
4. Click **Run workflow**
5. Choose version bump type:
   - `patch` - Bug fixes (1.0.0 → 1.0.1)
   - `minor` - New features (1.0.0 → 1.1.0)
   - `major` - Breaking changes (1.0.0 → 2.0.0)
6. Click **Run workflow**

✨ The workflow will:
- Bump version in package.json
- Update CHANGELOG.md
- Create a git tag
- Publish to NPM
- Create GitHub release

#### Method B: Command Line

```bash
# Make sure you're on main branch and up to date
git checkout main
git pull

# Build and test
npm run build
npm test

# Create a tag (triggers release workflow)
git tag v1.0.0
git push origin v1.0.0
```

### Step 4: Verify Publication

1. Check NPM:
   ```
   https://www.npmjs.com/package/baidusearch-cli
   ```

2. Check GitHub Release:
   ```
   https://github.com/YOUR_USERNAME/baidusearch-cli/releases
   ```

3. Test installation:
   ```bash
   npm install baidusearch-cli
   ```

## 📝 Daily Development Workflow

### Making Changes

```bash
# Create a feature branch
git checkout -b feature/your-feature

# Make changes to src/
# ... edit files ...

# Build and test
npm run build
npm test

# Commit with conventional commit message
git add .
git commit -m "feat: add new search option"

# Push and create PR
git push origin feature/your-feature
```

### Commit Message Format

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `perf:` Performance
- `test:` Tests
- `chore:` Maintenance

**Examples:**
```bash
git commit -m "feat: add support for custom headers"
git commit -m "fix: handle empty search results"
git commit -m "docs: update API examples"
```

## 🔄 Automated Workflows

### CI (Continuous Integration)
**Triggers:** Every push and PR  
**What it does:**
- Builds code on Node 16, 18, 20
- Runs tests
- Uploads artifacts

### Release
**Triggers:** Git tags (v*)  
**What it does:**
- Generates changelog
- Creates GitHub release
- Publishes to NPM

### Dependabot
**Triggers:** Weekly  
**What it does:**
- Checks for dependency updates
- Creates PRs for updates
- Auto-labels PRs

## 🐛 Troubleshooting

### "npm publish failed"
- Check NPM_TOKEN is valid
- Ensure package name is available
- Verify version number is higher than current

### "Build failed in CI"
- Check workflow logs in Actions tab
- Ensure all dependencies in package.json
- Test locally with `npm ci && npm run build`

### "Tag already exists"
- Check existing tags: `git tag -l`
- Delete local tag: `git tag -d v1.0.0`
- Delete remote tag: `git push origin :refs/tags/v1.0.0`

## 📚 Additional Resources

- [Full Setup Guide](.github/SETUP.md)
- [Contributing Guidelines](../CONTRIBUTING.md)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)

## 🎉 Success Checklist

- [ ] NPM token added to GitHub Secrets
- [ ] Repository URLs updated in package.json
- [ ] README badges updated
- [ ] First commit pushed
- [ ] CI workflow passed
- [ ] First release published
- [ ] Package installed successfully

---

Need help? Open an issue on GitHub!
