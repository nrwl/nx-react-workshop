### 💻 Lab 2 - Generate a React app

###### ⏰ &nbsp;Estimated time: 15-20 minutes

In this lab we'll generate our first React application within the new monorepo.

## 📚 Learning outcomes:

- **Get familiar with generating new apps within your workspace using the Nx CLI**

#### 📲 After this workshop, your app should look similar to this:

<details>
  <summary>App Screenshot</summary>
  <img src="../assets/lab2_result.png" width="500" alt="screenshot of lab2 result">
</details>

## 🏋️‍♀️ Steps:

1. Make sure you can run Nx commands:

   - try out `nx --version` and see if it outputs a version number
   - install the CLI globally: `npm i -g nx`
   - if you don't want to install it globally, use `npx/yarn/pnpm nx` (depending on the installed package manager) instead of `nx` in all the commands in the upcoming labs

     > Please make sure you are using the latest version of Nx (17+)
     > <br />

2. Run `nx list` to see which plugins you have installed
   <br />

3. Add the React plugin: `npm i -S @nx/react` (or `yarn add @nx/react` or `pnpm add @nx/react`)
   <br />

4. Let's also add Material UI so we can use some of their components: `npm i -S @material-ui/core` (or `yarn add @material-ui/core` or `pnpm add @material-ui/core`)
   <br />

5. Use the [`@nx/react` plugin](https://nx.dev/nx-api/react/generators/application) to generate an React app called `store` in your new workspace

   ⚠️**Important:** Make sure you **add React Router**, select **SCSS** as a style, select **cypress** as E2E test runner, and use the **Webpack** bundler when asked!

   <details>
   <summary>🐳 &nbsp;&nbsp;Hint</summary>
   <img src="../assets/lab2_cmds.png" alt="Nx generate cmd structure">
   </details><br />

6. Create a `fake-api.ts` file in your new app's `src` folder that returns an array of some games (you can just copy the code from [here](../../examples/lab2/apps/store/src/fake-api/index.ts))

   ⏳**Reminder:** When you are given example files to copy, the folder they're in hints to the _folder_ and _filename_ you can place them in when you do the copying
   <br />

7. Add some basic styling to your new component and display the games from the Fake API (to not spend too much time on this, you can copy it from here [.tsx](../../examples/lab2/apps/store/src/app/app.tsx) / [.scss](../../examples/lab2/apps/store/src/app/app.module.scss) - and replace the full contents of the files)
   <br />

8. You can get the example game images from [here](../../examples/lab2/apps/store/src/assets)

   ⚠️&nbsp;&nbsp;Make sure you put them in the correct folder
   <br />

9. Serve the app: `nx serve store`
   <br />

10. See your app live at [http://localhost:4200/](http://localhost:4200/)
    <br />

11. Inspect what changed from the last time you committed, then commit your changes
    <br />

---

<img src="../assets/lab2_result.png" width="500" alt="screenshot of lab2 result">

Your app should look similar to the screenshot above!

Now we're starting to see some content! But the ratings also don't look that good - we'll fix those in **Lab 5**.

---

🎓&nbsp;&nbsp;If you get stuck, check out [the solution](SOLUTION.md)

---

[➡️ &nbsp;Next lab ➡️](../lab3/LAB.md)
