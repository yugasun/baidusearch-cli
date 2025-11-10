# 🚀 Project Setup Checklist

Use this checklist to set up your baidusearch-cli package with full CI/CD automation.

## ✅ Pre-Deployment Checklist

### 1. GitHub Repository Setup
- [ ] Create new GitHub repository
- [ ] Initialize with README (or push existing code)
- [ ] Set default branch to `main` or `master`
- [ ] Enable GitHub Actions in repository settings
- [ ] Set workflow permissions to "Read and write"

### 2. NPM Account Setup
- [ ] Create NPM account at https://www.npmjs.com
- [ ] Verify email address
- [ ] Generate automation token
  - [ ] Go to https://www.npmjs.com/settings/~/tokens
  - [ ] Click "Generate New Token" → "Classic Token"
  - [ ] Select "Automation" type
  - [ ] Copy token (save it securely!)

### 3. GitHub Secrets Configuration
- [ ] Go to repo Settings → Secrets and variables → Actions
- [ ] Click "New repository secret"
- [ ] Add `NPM_TOKEN` with your NPM automation token

### 4. Code Configuration Updates

#### Update package.json
- [ ] Update `repository.url` with your GitHub URL
- [ ] Update `bugs.url` with your GitHub issues URL
- [ ] Update `homepage` with your GitHub README URL
- [ ] Update `author` field with your name/email
- [ ] Verify package name is available on NPM

#### Update README.md
- [ ] Replace `YOUR_USERNAME` in badge URLs
- [ ] Update repository links
- [ ] Add your name to credits

#### Update .github/dependabot.yml
- [ ] Replace `yourusername` with your GitHub username in reviewers

### 5. Verify Local Build
- [ ] Run `npm install`
- [ ] Run `npm run build`
- [ ] Run `npm test`
- [ ] Test CLI: `./dist/cli.js "test"`
- [ ] No build errors

## 🔄 First Deployment

### 6. Push to GitHub
```bash
git add .
git commit -m "feat: initial project setup with CI/CD"
git push origin main
```

### 7. Verify CI Workflow
- [ ] Go to Actions tab on GitHub
- [ ] Check that CI workflow runs
- [ ] Verify build succeeds on all Node versions
- [ ] Fix any errors if workflow fails

### 8. Test Workflows (Optional)
- [ ] Create a test branch
- [ ] Make a small change
- [ ] Open a Pull Request
- [ ] Verify CI runs on PR
- [ ] Verify commitlint validates PR title
- [ ] Close test PR

## 🎉 First Release

### 9. Choose Release Method

#### Option A: GitHub Actions (Recommended)
- [ ] Go to Actions tab
- [ ] Select "Publish" workflow
- [ ] Click "Run workflow"
- [ ] Choose "patch" (for v1.0.0 → v1.0.1)
- [ ] Click "Run workflow" button
- [ ] Wait for workflow to complete

#### Option B: Git Tag
```bash
git tag v1.0.0
git push origin v1.0.0
```

### 10. Verify Publication
- [ ] Check NPM: https://www.npmjs.com/package/baidusearch-cli
- [ ] Verify version number is correct
- [ ] Check GitHub Releases tab
- [ ] Verify changelog was generated
- [ ] Test installation: `npm install baidusearch-cli`

## 🛠️ Post-Deployment

### 11. Documentation
- [ ] Update README with actual package usage
- [ ] Add more examples if needed
- [ ] Update CHANGELOG.md if necessary

### 12. Enable Optional Features
- [ ] Enable Dependabot alerts in repo settings
- [ ] Enable security advisories
- [ ] Add branch protection rules (optional)
- [ ] Add status checks requirements (optional)

### 13. Monitor
- [ ] Watch for Dependabot PRs
- [ ] Check CodeQL analysis results
- [ ] Monitor issue tracker

## 📈 Ongoing Maintenance

### For Each Update

#### Making Changes
- [ ] Create feature branch: `git checkout -b feature/name`
- [ ] Make changes to src/
- [ ] Use conventional commit messages
- [ ] Push and create PR
- [ ] Wait for CI to pass
- [ ] Merge PR

#### Creating Release
- [ ] Use GitHub Actions Publish workflow
- [ ] Or push version tag
- [ ] Verify NPM publication
- [ ] Check GitHub release notes

## 🐛 Troubleshooting

### If CI Fails
- [ ] Check workflow logs in Actions tab
- [ ] Review error messages
- [ ] Test locally: `npm run build && npm test`
- [ ] Fix issues and push

### If NPM Publish Fails
- [ ] Verify NPM_TOKEN is correct in GitHub Secrets
- [ ] Check token hasn't expired
- [ ] Verify package name is available
- [ ] Check version number isn't already published

### If Changelog Doesn't Generate
- [ ] Use conventional commit messages
- [ ] Check .versionrc.json configuration
- [ ] Verify commits are properly formatted

## ✨ Success Criteria

Your setup is complete when:
- ✅ CI workflow passes on every push
- ✅ Package successfully published to NPM
- ✅ GitHub release created automatically
- ✅ Changelog generated from commits
- ✅ Package can be installed via `npm install`
- ✅ CLI works: `npx baidusearch-cli "test"`

## 📞 Getting Help

If you encounter issues:
1. Check `.github/SETUP.md` for detailed setup instructions
2. Review `CI_CD_SUMMARY.md` for overview
3. See `.github/QUICK_START.md` for quick reference
4. Open an issue on GitHub

## 🎊 Congratulations!

Once all checkboxes are complete, your project is:
- ✅ Fully automated with CI/CD
- ✅ Published on NPM
- ✅ Ready for contributions
- ✅ Following best practices
- ✅ Production-ready!

---

**Last Updated**: 2025-11-07  
**For**: baidusearch-cli v1.0.0
