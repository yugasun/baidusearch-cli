# GitHub Actions Setup Guide

This document explains how to set up and configure GitHub Actions for this project.

## Prerequisites

1. A GitHub repository for this project
2. An NPM account with a published package or ready to publish
3. Access to repository settings

## Step-by-Step Setup

### 1. Create NPM Token

1. Log in to [npmjs.com](https://www.npmjs.com)
2. Click on your profile icon → "Access Tokens"
3. Click "Generate New Token" → "Classic Token"
4. Select "Automation" type
5. Copy the generated token (you won't see it again!)

### 2. Add NPM Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your NPM token
6. Click **Add secret**

### 3. Update Repository URLs

Update the following files with your actual repository URL:

**package.json:**
```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/baidusearch-cli"
  },
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/baidusearch-cli/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/baidusearch-cli#readme"
}
```

**README.md:**
Update the badge URLs at the top of the file.

### 4. Configure Dependabot (Optional)

Update `.github/dependabot.yml`:
```yaml
reviewers:
  - "your-github-username"  # Change this to your username
```

### 5. Enable GitHub Actions

1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. If prompted, click **"I understand my workflows, go ahead and enable them"**

## Workflows Overview

### CI Workflow
**Trigger:** Push to main/master/develop, or Pull Requests  
**Actions:**
- Lints code with ESLint
- Builds on Node.js 16, 18, 20
- Runs tests
- Type checks

**File:** `.github/workflows/ci.yml`

### Release Workflow
**Trigger:** Git tags matching `v*` (e.g., `v1.0.0`)  
**Actions:**
- Builds the project
- Generates changelog
- Creates GitHub release
- Publishes to NPM

**File:** `.github/workflows/release.yml`

### Publish Workflow (Manual)
**Trigger:** Manual dispatch from GitHub Actions UI  
**Actions:**
- Bumps version (patch/minor/major)
- Updates CHANGELOG.md
- Commits and pushes changes
- Creates Git tag
- Publishes to NPM
- Creates GitHub release

**File:** `.github/workflows/publish.yml`

### CodeQL Workflow
**Trigger:** Push to main, PRs, and weekly schedule  
**Actions:**
- Runs security analysis
- Scans for vulnerabilities

**File:** `.github/workflows/codeql.yml`

### Commitlint Workflow
**Trigger:** Pull Request events  
**Actions:**
- Validates PR title follows conventional commits

**File:** `.github/workflows/commitlint.yml`

## Usage

### Publishing a New Version

#### Method 1: Using Git Tags

```bash
# Update version and generate changelog
npm run release:patch  # or release:minor, release:major

# Push with tags
git push --follow-tags origin main
```

This will trigger the Release workflow automatically.

#### Method 2: Using GitHub UI

1. Go to **Actions** tab
2. Select **Publish** workflow
3. Click **Run workflow**
4. Choose version bump type
5. Click **Run workflow**

### Monitoring Workflows

1. Go to the **Actions** tab in your repository
2. Click on any workflow run to see details
3. View logs for each job and step
4. Check for any errors or warnings

## Troubleshooting

### NPM Publish Fails

**Problem:** `npm publish` fails with authentication error

**Solution:**
- Verify `NPM_TOKEN` is correctly set in GitHub Secrets
- Ensure the token has "Automation" permissions
- Check if your package name is available on NPM
- Verify you're logged in to NPM with correct permissions

### Build Fails

**Problem:** Build fails on GitHub Actions but works locally

**Solution:**
- Check Node.js version in workflow matches your local version
- Ensure all dependencies are listed in `package.json`
- Review the workflow logs for specific errors
- Try running `npm ci` instead of `npm install` locally

### Release Workflow Not Triggering

**Problem:** Pushed a tag but Release workflow didn't run

**Solution:**
- Ensure tag follows the pattern `v*` (e.g., `v1.0.0`)
- Check if GitHub Actions is enabled for your repository
- Verify the workflow file is in `.github/workflows/` directory
- Check the Actions tab for any errors

### Permissions Error

**Problem:** Workflow fails with permissions error

**Solution:**
- Check repository Settings → Actions → General
- Ensure "Workflow permissions" is set to "Read and write permissions"
- Enable "Allow GitHub Actions to create and approve pull requests" if needed

## Best Practices

1. **Test Before Publishing**
   - Always test locally before pushing tags
   - Use `npm run build` to verify build succeeds
   - Run `npm run lint` to check code quality

2. **Version Bumping**
   - Use semantic versioning (MAJOR.MINOR.PATCH)
   - Follow conventional commits for automatic version detection
   - Document breaking changes in commit messages

3. **Changelog**
   - Keep CHANGELOG.md up to date
   - Use conventional commit messages
   - Review generated changelog before publishing

4. **Security**
   - Never commit secrets or tokens
   - Use GitHub Secrets for sensitive data
   - Rotate NPM tokens periodically
   - Review Dependabot PRs promptly

## Support

If you encounter issues:
1. Check the [GitHub Actions documentation](https://docs.github.com/en/actions)
2. Review workflow logs for specific errors
3. Open an issue in the repository
4. Check NPM documentation for publishing issues

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [NPM Publishing Guide](https://docs.npmjs.com/cli/publish)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [standard-version](https://github.com/conventional-changelog/standard-version)
