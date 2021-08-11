### 💻 Lab 11 - e2e test the shared component

###### ⏰ &nbsp;Estimated time: 5 minutes

The storybook generator we invoked earlier also generated some e2e tests. Let's try them out!

## 📚 Learning outcomes:

- **Take advantage of the e2e tests Nx generated earlier to test your app**

## 🏋️‍♀️ Steps:

1. Our previous command generated a new `apps/store-ui-shared-e2e` folder. Let's run them: `nx e2e store-ui-shared-e2e`
   - The tests should fail
<br/>

2. Open `apps/store-ui-shared-e2e/src/integration/header/header.spec.ts` and change the test:

   ```ts
   it('should show the title', () => {
     cy.get('header').contains('Board Game Hoard');
   });
   ```

3. Re-run the tests
<br/>

4. Inspect what changed from the last time you committed, then commit your changes
<br/>

---

[➡️ &nbsp;Next lab ➡️](../lab12/LAB.md)
