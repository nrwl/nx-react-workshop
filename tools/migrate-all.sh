
#!/bin/bash

version=$1

update_to_version() {
  rm -rf node_modules
  yarn
  yarn nx migrate "$version"
  yarn
  if [[ -f "migrations.json" ]]; then
    yarn nx migrate --run-migrations=migrations.json
  fi
  git add -A && git commit -am "chore(deps): update nx to $version"
}

git checkout main
update_to_version
git checkout starting-lab2
update_to_version
git checkout starting-lab3
update_to_version
git checkout starting-lab3
update_to_version
git checkout starting-lab4
update_to_version
git checkout starting-lab5
update_to_version
git checkout starting-lab6
update_to_version
git checkout starting-lab7
update_to_version
git checkout starting-lab8
update_to_version
git checkout starting-lab9
update_to_version
git checkout starting-lab10
update_to_version
git checkout starting-lab11
update_to_version
# git checkout starting-lab12
# update_to_version
# git checkout starting-lab13
# update_to_version
# git checkout starting-lab14
# update_to_version
# git checkout starting-lab15
# update_to_version
# git checkout starting-lab16
# update_to_version
# git checkout starting-lab17
# update_to_version
# git checkout starting-lab18
# update_to_version
# git checkout starting-lab19
# update_to_version
# git checkout starting-lab20
# update_to_version
# git checkout starting-lab21
# update_to_version
# git checkout starting-lab22
# update_to_version
git checkout final
update_to_version

# go back to main
git checkout main

# push all changes
git push --all
