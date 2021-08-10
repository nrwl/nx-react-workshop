
#!/bin/bash

version=$1

git checkout main
yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
git checkout starting-lab2
yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
git checkout starting-lab3
yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
git checkout starting-lab3
yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
git checkout starting-lab4
yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
git checkout starting-lab5
yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
git checkout starting-lab6
yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
git checkout starting-lab7
yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
git checkout starting-lab8
yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
git checkout starting-lab9
yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
git checkout starting-lab10
yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
git checkout starting-lab11
yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
# git checkout starting-lab12
# yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
# git checkout starting-lab13
# yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
# git checkout starting-lab14
# yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
# git checkout starting-lab15
# yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
# git checkout starting-lab16
# yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
# git checkout starting-lab17
# yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
# git checkout starting-lab18
# yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
# git checkout starting-lab19
# yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
# git checkout starting-lab20
# yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
# git checkout starting-lab21
# yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
# git checkout starting-lab22
# yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
git checkout final
yarn nx migrate "$version" && yarn && git add -A && git commit -am "chore(deps): update nx to $version"
git checkout main
git push --all
