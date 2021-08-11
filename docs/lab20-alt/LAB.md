# 🧲 Lab 20 Alternative - Mock Store

###### ⏰ Estimated time: 5 minutes
<<<<<<< HEAD
=======

>>>>>>> ebb6ada (feat: add day 2 labs (#6))
<br />

## 🏋️‍♀️ Steps :

For now, our `store` project has no API when it is deployed. Hence, it is only displaying the header.

1. If you removed your `fake-api/index.ts` from the `store`, let's [re-add it](https://github.com/nrwl/nx-workshop/blob/master/examples/lab2/apps/store/src/fake-api/index.ts)
   <br /> <br />

<<<<<<< HEAD
2. Import it in your `apps/store/src/app/app.component.ts`
=======
2. Import it in your `apps/store/src/app/app.tsx`
>>>>>>> ebb6ada (feat: add day 2 labs (#6))

   <details>
   <summary>🐳 Hint</summary>

   ```typescript
<<<<<<< HEAD
   import { getAllGames } from '../fake-api/index';
   //....
   games = getAllGames();
   ```
   
   ```html
   <bg-hoard-header [title]="title"></bg-hoard-header>
   <div class="container">
      <div class="games-layout">
        <mat-card
          class="game-card"
          *ngFor="let game of games" <---- HERE (remove the async pipe)
   ```
=======
    import { getAllGames } from '../fake-api/index';

    export const App = () => {
    const history = useHistory();

    return (
      <>
        <Header title="Board Game Hoard" />
          <div className={styles.container}>
            <div className={styles['games-layout']}>
              {getAllGames().map((x) => (
                <Card
                  key={x.id}
                  className={styles['game-card']}
                  onClick={() => history.push(`/game/${x.id}`)}
                >
   ```

>>>>>>> ebb6ada (feat: add day 2 labs (#6))
   </details>
   <br />

3. Build and deploy your `store` project. Your deployed version should now be showing some games.
<<<<<<< HEAD
  
    ⚠️ Clicking on games and displaying game details will still not work. We can fix that later. 

    <img src="./lab20_result.png" width="500" alt="screenshot of lab20 result">
    <br />
=======

   ⚠️ Clicking on games and displaying game details will still not work. We can fix that later.

   <img src="./lab20_result.png" width="500" alt="screenshot of lab20 result">
   <br />
>>>>>>> ebb6ada (feat: add day 2 labs (#6))

---

[➡️ Next lab ➡️](../lab21-alt/LAB.md)
