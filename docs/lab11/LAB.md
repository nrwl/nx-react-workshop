### 💻 Lab 11 - e2e test the shared component

###### ⏰ &nbsp;Estimated time: 5 minutes

The storybook generator we invoked earlier also generated some tests. Let's try them out!

## 📚 Learning outcomes:

- **Take advantage of the e2e tests Nx generated earlier to test your app**
  <br />

## 🏋️‍♀️ Steps:

1. Our previous command generated tests with stories as well. Let's run them: `nx storybook store-ui-shared` and in another terminal `nx test-storybook store-ui-shared`

   - The tests should fail
     <br/>

2. Open `libs/store/ui-shared/src/lib/header/header.stories.tsx` and **give the title a value**.

    <details>
    <summary>🐳 Hint</summary>
   ```ts

   args: {
     title: 'Welcome to Board Game Hoard';
   }

   ```
   </details>

   <br />

3. Now **fix the test** to check if it contains that value

    <details>
    <summary>🐳 Hint</summary>
   ```ts

   expect(canvas.getByText(/Welcome to Board Game Hoard/gi)).toBeTruthy();
   
   ```
   </details>

   <br />

4. **Re-run the tests**
   <br/>

5. **Inspect what changed** from the last time you committed, then **commit your changes**
   <br/>

---

[➡️ &nbsp;Next lab ➡️](../lab12/LAB.md)
