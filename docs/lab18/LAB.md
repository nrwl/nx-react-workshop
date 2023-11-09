# 📎 Lab 18 - Run-Commands and deploying the frontend

###### ⏰ &nbsp;Estimated time: 15-20 minutes

## 📚 Learning outcomes:

- **Understand how to create custom targets via the "run-commands" workspace executor**
- **Explore real-world usages of "run-commands" by creating a frontend "deploy" executor**
- **Learn how to expose custom ENV variables to Nx**
  <br />

## 🏋️‍♀️ Steps :

1.  Make sure you are on the `main` branch
    <br />

2.  We'll use a CLI tool called [Surge](https://surge.sh/) to statically deploy the frontend:

    ```bash
    npm i -S surge
    ```

    <br />

3.  Get the surge token (you'll need to create an account with an email and password):

    ```
    npx surge token
    ```

    ☝️ Copy the token you get

    <br />

4.  Let's use the Surge CLI to deploy our project:

    ```bash

    # make sure the project is built first - and we have something in dist

    nx build store

    # use surge to deploy whatever assets are in dist/apps/store

    surge dist/apps/store https://<chose-some-unique-url-123>.surge.sh --token <your-surge-token>

    ```

    ⚠️&nbsp;&nbsp;Make sure you chose a **unique value** for your domain above, otherwise
    it will fail as you won't have permission to deploy to an existing one.

    ⚠️&nbsp;&nbsp;You should see surge deploying to your URL - if you click you'll see just the header though, because it doesn't have a server yet to get the games from.
    <br />

    ```

    ```

5.  Let's now abstract away the above command into an Nx target. Generate a new **"deploy"** target using the `@nx/workspace:run-commands` generator:

    - under the `store` project
    - the "command" will be the same as the one you typed in the previous step

    <details>
    <summary>🐳 &nbsp;&nbsp;Hint</summary>

    Consult the run-commands generator docs [here](https://nx.dev/nx-api/workspace/generators/run-commands)
    </details><br />

6.  Use Git to inspect the changes in `project.json` and try to deploy the store using Nx!
    <br />
7.  We're now storing the surge token in `project.json`. We don't want to check-in this file and risk exposing this secret token. Also, we might want to deploy to different domains depending on the environment. Let's move these out:

    📁 Create a new file `apps/store/.local.env`

    🔒 And let's add your secrets to it

    ```
    SURGE_TOKEN=<your-surge-token>
    SURGE_DOMAIN_STORE=https://<some-unique-url-123>.surge.sh
    ```

    ✅ Finally, update your "deploy" command, so that it loads the values from the ENV, using the `${ENV_VAR}` syntax.

     <details>
     <summary>🐳 &nbsp;&nbsp;Hint</summary>
     
     ```bash
    surge dist/apps/store ${SURGE_DOMAIN_STORE} --token ${SURGE_TOKEN} 
    ```
     </details><br />

8.  Now invoke the deploy target again, and check if it all still works.
    ⚠️&nbsp;&nbsp;Note for Windows users: the command might fail, as we're trying to access env variables the Linux-way.
    To make it pass, you can generate a separate `windows-deploy` executor (make sure you keep the existing `deploy` target intact - it will be used by GitHub Actions):

        ```bash
        nx generate run-commands windows-deploy --project=store --command="surge dist/apps/store %SURGE_DOMAIN_STORE% --token %SURGE_TOKEN%"
        nx windows-deploy store
        ```

    <br />

---

❓ We did not load those environment variables into the deploy process anywhere.
We just added a `.local.env` file. How does that work?

Nx [automatically picks up](https://nx.dev/latest/react/guides/environment-variables#loading-environment-variables) any `.env` or `.local.env` files in your workspace,
and loads them into processes invoked for that specific app.

---

🎓&nbsp;&nbsp;If you get stuck, check out [the solution](SOLUTION.md)

---

[➡️ For the next lab, head over to our chapter list to chose your path ➡️](https://github.com/nrwl/nx-react-workshop#day-2)
