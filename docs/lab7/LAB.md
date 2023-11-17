### 💻 Lab 7 - Add an Express API

###### ⏰ &nbsp;Estimated time: 10-15 minutes

Up until now we've had a single app in our repository, and a few other libs that it uses.

But remember how we created that `fake-api` way back in the second lab, that only our `store` app can access?

Our new routed component suddenly needs access to the games as well, so in this lab we'll be adding a completely new app, this time on the backend, as an API. And we'll use the `@nx/express` plugin to easily generate everything we need.

All the Express specific code for serving the games is provided in the solution.

## 📚 Learning outcomes:

- **Explore other plugins in the Nx ecosystem**

#### 📲 After this workshop, you should have:

<details>
  <summary>App Screenshot</summary>
  No change in how the app looks!
</details>

## 🏋️‍♀️ Steps:

1. Stop any running `nx serve` instance
   <br/>

2. `yarn add @nx/express` or `npm i -S @nx/express`
   <br/>

3. Generate a new Express app, called `api`

   ⚠️&nbsp;&nbsp;Make sure you instruct the generator to configure a proxy from the frontend `store` to the new `api` service (use `--help` to see the available options)<br />

4. Copy the code from the `fake api` to a new file called `apps/api/src/app/`[games.repository.ts](../../examples/lab7/apps/api/src/app/games.repository.ts)
   <br/>

5. Update the Express [main.ts](../../examples/lab7/apps/api/src/main.ts) to use the repository data
   <br/>

6. Let's now inspect the dependency graph!
   <br/>

7. Inspect what changed from the last time you committed, then commit your changes
   <br/>

---

🎓&nbsp;&nbsp;If you get stuck, check out [the solution](SOLUTION.md)

---

[➡️ &nbsp;Next lab ➡️](../lab8/LAB.md)
