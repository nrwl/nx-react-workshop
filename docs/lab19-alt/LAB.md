# 🧲 Lab 19 Alternative - Creating and deploying a 2nd frontend

###### ⏰ &nbsp;Estimated time: 15-20 minutes

## 📚 Learning outcomes:

- **Recap what you've learned about generating apps and creating custom executors with "run-commands"**
<br />

## 🏋️‍♀️ Steps :

In this lab, we'll practice generating a 2nd frontend, using NextJS. This is in preparation for the next few labs, where we'll
be deploying the two frontends independently in our GitHub Actions based Continuous Deployment setup.

1. We want to build a new Admin UI for out store. But we'll use NextJS as our framework of choice.
   **Generate a new NextJS app called "admin-ui"**
   You can use any configuration options you want.

   ⚠️&nbsp;&nbsp;There will be fewer hints in this lab, but you can always use the [solution](SOLUTION.md) as a last resort.
<br />

2. We won't make any changes to it. Let's serve it to see if it looks okay locally.
<br />

3. For simplicity, we want to run it on Surge, **so let's export it as static assets for now**. Since we added a lot of files, also commit your changes.

   ⚠️&nbsp;&nbsp;Look at the available "targets" for your new Next app in `workspace.json`. Make sure you deploy the "exported" sub-folder.
<br />

4. Following the same steps as [Lab 18](../lab18/LAB.md), add a `"deploy"` target to it.

   ⚠️&nbsp;&nbsp;Hint: You can have a `.local.env` at the root of your workspace as well, for any variables that need to be shared.
   You can move your `SURGE_TOKEN` variable to the root, so it can be shared among your projects. [READ MORE](https://nx.dev/latest/react/guides/environment-variables#loading-environment-variables)
<br />

5. Try to deploy both apps and check if they still work.
<br />

6. Commit everything before moving on to the next lab
<br />

7. **BONUS** - Create a custom workspace generator that adds a `"deploy"` target for a frontend project, so that we don't have to manually re-do the steps in [Lab 18](../lab18/LAB.md) each time.
<br />

8. **BONUS** - Create a new React or NextJS frontend app, and test your above schematic
<br />

9. **BONUS** - Add a proper scopes for your new apps in `nx.json` and run your `update-scope-schema` workspace generator you created a few labs ago.
<br />

---

🎓&nbsp;&nbsp;If you get stuck, check out [the solution](SOLUTION.md)

---

[➡️ &nbsp;Next lab ➡️](../lab20-alt/LAB.md)
