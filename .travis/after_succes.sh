  #!/bin/sh

setup_git() {
  git config --global user.email "tardieu.f@hotmail.fr"
  git config --global user.name "ftardieu"
}

setup_git
standard-version
git checkout dev
git cherry-pick master
git push origin dev master --tags
