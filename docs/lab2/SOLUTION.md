##### To generate a new React application:

```shell
nx generate @nx/react:application store \
  --directory=apps/store \
  --style=scss \
  --routing \
  --e2eTestRunner=cypress \
  --bundler=webpack \
  --projectNameAndRootFormat=as-provided

# Alternatively using the shorthand
nx g app store --directory=apps/store # the rest of the arguments are the same
```
