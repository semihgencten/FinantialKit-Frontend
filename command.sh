#!/bin/bash
# https://github.com/Necro-U/github_actions.git
cp -r /content/* . 

rm -rf ./github
rm -rf ./git
rm -rf temp
echo after deletion
ls -al
echo in content: 
ls /content

git init
remote_repo=https://Necro-U:${GITHUB_TOKEN}@github.com/Financial-Kit/Frontend.git
git config http.sslVerify false
git config --global user.name "Automated Binder"
git config --global user.email "actions@users.noreply.github.com"

echo initialized
ls -al
# git remote add origin "${remote_repo}"
# git show-ref
# git branch --verbose

git lfs install

# touch selam.txt

git add .
git commit -m "Automatik Binder push 2" && echo commited || exit 0
git show-ref
git push -f "https://Necro-U:${GITHUB_TOKEN}@github.com/Necro-U/financial_kit_binder.git" master
