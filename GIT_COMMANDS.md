# 📦 Git Commands to Push to GitHub

## Step-by-Step Instructions

### 1. Initialize Git Repository (if not already done)
```bash
git init
```

### 2. Add All Files
```bash
git add .
```

### 3. Check What Will Be Committed
```bash
git status
```

### 4. Commit Your Changes
```bash
git commit -m "Initial commit: News Aggregator System with FastAPI, MongoDB, and Docker"
```

### 5. Add Your Remote Repository
```bash
git remote add origin https://github.com/bejoy-jbt/News_aggregator_system.git
```

### 6. Rename Branch to Main
```bash
git branch -M main
```

### 7. Push to GitHub
```bash
git push -u origin main
```

---

## Complete Command Sequence

```bash
# Initialize (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: News Aggregator System"

# Add remote
git remote add origin https://github.com/bejoy-jbt/News_aggregator_system.git

# Rename branch
git branch -M main

# Push
git push -u origin main
```

---

## If Repository Already Exists on GitHub

If your repository on GitHub already has content (like README), use:

```bash
# Pull and merge
git pull origin main --allow-unrelated-histories

# If conflicts occur, resolve them, then:
git add .
git commit -m "Merge with existing repository"
git push -u origin main
```

---

## Update After Changes

```bash
# Add changes
git add .

# Commit
git commit -m "Your commit message here"

# Push
git push
```

---

## Useful Commands

**Check status:**
```bash
git status
```

**See what files changed:**
```bash
git diff
```

**View commit history:**
```bash
git log
```

**Remove a file from tracking (but keep it locally):**
```bash
git rm --cached filename
```

