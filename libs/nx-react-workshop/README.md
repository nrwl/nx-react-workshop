# Nx React Workshop utility

This utility is used to provide automatic lab completion during the [**Nx React Workshop**](https://github.com/nrwl/nx-react-workshop).

## Catching up with missed labs

If you fall behind or join late, we provide migrations that would bring your repository up to date with desired lab. To use the migrarions follow the next steps:

1. Install `@nrwl/nx-react-workshop` package as dev dependency (e.g. `yarn add -D @nrwl/nx-react-workshop`). If you finished [Lab 3.1 - Migrations](docs/lab3.1/LAB.md) then you should already have it installed.
2. Run the generator with one of the following options:
   - Provide `lab` you want to complete: `nx g @nrwl/nx-react-workshop:complete-labs --lab=5` or
   - Use `from` range to finish until end: `nx g @nrwl/nx-react-workshop:complete-labs --from=2`
   - Use `to` range to catch up with given lab: `nx g @nrwl/nx-react-workshop:complete-labs --to=5`
   - Use `from/to` range to catch up with several labs in between: `nx g @nrwl/nx-react-workshop:complete-labs --from=2 --from=7`
   - Use `option` to specify if you want **track 1** or **track 2**: `nx g @nrwl/nx-react-workshop:complete-labs --from=19 --option=option2` (default option is track 2)
3. Finnally, run the the migrations `npx nx migrate --run-migrations` to have that code generated.

---

This library was generated with [Nx](https://nx.dev).
