##### Generate a new type lib for the API

```shell
nx generate @nx/js:lib api-util-interface --directory=libs/api/util-interface
```

##### Use the `move` generator to move a nested lib to root

```shell
nx generate @nx/workspace:move --projectName=api-util-interface util-interface
```
