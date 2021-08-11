# 💡 Lab 12 - Module boundaries

###### ⏰ Estimated time: 10-15 minutes
<<<<<<< HEAD
=======

>>>>>>> ebb6ada (feat: add day 2 labs (#6))
<br /><br />

## 📚 Learning outcomes:

- **Understand how to assign scopes and type tags to your libraries**
- **How to specify boundaries around your tags and avoid circular dependencies in your repo**
- **How to use linting to trigger warnings or errors when you are not respecting these boundaries**
<<<<<<< HEAD
<br /><br /><br />
=======
  <br /><br /><br />
>>>>>>> ebb6ada (feat: add day 2 labs (#6))

## 🏋️‍♀️ Steps :

1. Open `nx.json` and **finish tagging the apps** accordingly:

<<<<<<< HEAD
    ```
    "projects": {
        "store": {
          "tags": ["scope:store", "type:app"]
        },
        .... <-- fill in the rest of the tags
      }
    ```
   <br /><br />
2. Open the root `.eslintrc.json`, find the `"@nrwl/nx/enforce-module-boundaries"` rule and **set the `depConstraints`**:

    ```
    "depConstraints": [
        {
            "sourceTag": "scope:store",
            "onlyDependOnLibsWithTags": ["scope:store", "scope:shared"]
        },
        .... <-- finish adding constraints for the tags we defined in the previous step
    ]
    ```
=======
   ```
   "projects": {
       "store": {
         "tags": ["scope:store", "type:app"]
       },
       .... <-- fill in the rest of the tags
     }
   ```

   <br /><br />

2. Open the root `.eslintrc.json`, find the `"@nrwl/nx/enforce-module-boundaries"` rule and **set the `depConstraints`**:

   ```
   "depConstraints": [
       {
           "sourceTag": "scope:store",
           "onlyDependOnLibsWithTags": ["scope:store", "scope:shared"]
       },
       .... <-- finish adding constraints for the tags we defined in the previous step
   ]
   ```

>>>>>>> ebb6ada (feat: add day 2 labs (#6))
   <br /><br />

3. **Run `nx run-many --target=lint --all --parallel`**

<<<<<<< HEAD
    💡 `nx run-many` allows you run a specific target against a specific set of projects
    via the `--projects=[..]` option. However, you can also pass it the `--all` option
    to run that target against all projects in your workspace. 
    
    💡 `--parallel` launches all the `lint` processes in parallel
   <br /><br />

4. We talked about how importing a **Feature** lib should not be allowed from a
**UI** lib. Let's **test our lint rules** by doing just that:
    - In `libs/store/ui-shared/src/lib/store-ui-shared.module.ts`
    - Try to `import { StoreFeatureGameDetailModule } from '@bg-hoard/store/feature-game-detail';`
=======
   💡 `nx run-many` allows you run a specific target against a specific set of projects
   via the `--projects=[..]` option. However, you can also pass it the `--all` option
   to run that target against all projects in your workspace.

   💡 `--parallel` launches all the `lint` processes in parallel
   <br /><br />

4. We talked about how importing a **Feature** lib should not be allowed from a
   **UI** lib. Let's **test our lint rules** by doing just that: - In `libs/store/ui-shared/src/lib/header/header.tsx` - Try to `import { StoreFeatureGameDetail } from '@bg-hoard/store/feature-game-detail';`
>>>>>>> ebb6ada (feat: add day 2 labs (#6))
   <br /><br />

5. **Run linting** against all the projects again.
   <br /><br />
6. You should see the expected error. Great! You can now **delete the import** above.
   <br /><br />
7. We also talked about the importance of setting boundaries between your workspace scopes.
<<<<<<< HEAD
Let's try and **import a `store` lib** from an `api` scope.
    - In `apps/api/src/app/app.service.ts`
    - Try to `import { formatRating } from '@bg-hoard/store/util-formatters';`
=======
   Let's try and **import a `store` lib** from an `api` scope. - In `apps/api/src/main.ts` - Try to `import { formatRating } from '@bg-hoard/store/util-formatters';`
>>>>>>> ebb6ada (feat: add day 2 labs (#6))
   <br /><br />

8. **Run linting** on all projects - you should see another expected error.
   <br /><br />
9. You can now **delete the import** above.
   <br /><br />
10. **Run linting** again and check if all the errors went away.
<<<<<<< HEAD
    
    💡 Pass the suggested `--only-failed` option, so it doesn't relint everything.
   <br /><br />

11. **Commit everything** before moving on to the next lab


=======

    💡 Pass the suggested `--only-failed` option, so it doesn't relint everything.
    <br /><br />

11. **Commit everything** before moving on to the next lab

>>>>>>> ebb6ada (feat: add day 2 labs (#6))
---

🎓If you get stuck, check out [the solution](SOLUTION.md)

---

[➡️ Next lab ➡️](../lab13/LAB.md)
