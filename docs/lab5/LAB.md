### 💻 Lab 5 - Generate a utility lib

###### ⏰ &nbsp;Estimated time: 5-10 minutes

Let's fix the ratings! They don't look that good and they could benefit from some formatting.

We will create a shared utility lib where we'll add our formatters and see how to import them in our components afterwards.

## 📚 Learning outcomes:

- **Get familiar with generating project specific, framework agnostic utility libs**

#### 📲 After this workshop, you should have:

<details>
  <summary>App Screenshot</summary>
  <img src="../assets/lab5_screenshot.png" width="500" alt="screenshot of lab5 result">
</details>

<details>
  <summary>File structure</summary>
  <img src="../assets/lab5_directory-structure.png" height="700" alt="lab5 file structure">
</details>

## 🏋️‍♀️ Steps:

1. Stop the `nx serve`
   <br/>

2. Use the `@nx/workspace` package to generate another lib in the `libs/store` folder - let's call it `util-formatters`.
   <br/>

3. Add the [code for the utility function](../../examples/lab5/libs/store/util-formatters/src/lib/store-util-formatters.ts) to the new library you just created `libs/store/util-formatters/src/lib/store-util-formatters.ts`
   <br/>

4. Use it in your frontend project to format the rating for each game

    <details>
    <summary>🐳 &nbsp;&nbsp;Hint</summary>

   `app.tsx`:

   ```ts
   import { formatRating } from '@bg-hoard/store/util-formatters';
   ```

   ```html
   <strong>Rating:</strong> {formatRating(x.rating)}
   ```

    </details><br />

5. Serve the store app - notice how the ratings are formatted.
   <br/>

6. Launch the dependency graph - notice how the app depends on two libs now.
   <br/>

7. Inspect what changed from the last time you committed, then commit your changes
   <br/>

---

🎓&nbsp;&nbsp;If you get stuck, check out [the solution](SOLUTION.md)

---

[➡️ &nbsp;Next lab ➡️](../lab6/LAB.md)
