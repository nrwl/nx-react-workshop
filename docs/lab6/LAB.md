### 💻 Lab 6 - Generate a route lib

###### ⏰ Estimated time: 15-25 minutes

We'll look at more advanced usages of the `@nrwl/react` generators and generate a new route lib for our store application. We'll see how Nx takes care of most of the work, and we just have to do the wiring up!

#### 📚 Learning outcomes:

- Get familiar with more advanced usages of Nx generators to create a React route lib

#### 📲 After this workshop, you should have:

<details>
  <summary>App Screenshot</summary>
  <img src="../assets/lab6_screenshot.png" width="500" alt="screenshot of lab6 result">
</details>

<details>
  <summary>File structure</summary>
  <img src="../assets/lab6_directory-structure.png" height="700" alt="lab6 file structure">
</details>

#### 🏋️‍♀️ Steps:

1. Stop `nx serve`
2. Use the `@nrwl/react:lib` generator to generate a new routing library called `feature-game-detail` that:

   - lives under `libs/store`
   - its parent routing app is `store`

   ⚠️ **Use `--help`** with the above generator to figure out which options you need to use to enable **all** the above (See the solution if still unsure)

3. Change the routing path in `apps/store/src/app/app.tsx` to pick up the game ID from the URL

    <details>
    <summary>🐳 Hint</summary>

   ```ts
   import { Route, useHistory } from 'react-router-dom';
   import { StoreFeatureGameDetail } from '@bg-hoard/store/feature-game-detail';

   export const App = () => {
   const history = useHistory();
   ```

   ```tsx
   <Card
     key={x.id}
     className={styles['game-card']}
     onClick={() => history.push(`/game/${x.id}`)}
   >
   ```

   ```tsx
   <Route path="/game/:id" component={StoreFeatureGameDetail} />
   ```

    </details>

4. Populate your new component with the provided files: `store-feature-game-detail.`[tsx](../../examples/lab6/libs/store/feature-game-detail/src/lib/feature-game-detail/store-feature-game-detail.tsx) / [scss](../../examples/lab6/libs/store/feature-game-detail/src/lib/feature-game-detail/store-feature-game-detail.component.scss)

5. We now need to display your new routed component. Let's add a `<router-outlet>` below our list of cards:

   <details>
   <summary>🐳 Hint</summary>

   `apps/store/src/app/app.component.html`:

   ```html
   <div class="container">
     <div class="games-layout">
       <mat-card class="game-card" *ngFor="let game of games"> ... </mat-card>
     </div>
     <router-outlet></router-outlet> <--- ADD IT HERE
   </div>
   ```

    </details>

6. Make clicking on each card route to the `feature-game-detail` module with the game's ID:

   <details>
   <summary>🐳 Hint</summary>

   ```html
   <div class="container">
     <div class="games-layout">
       <mat-card
         class="game-card"
         *ngFor="let game of games"
         [routerLink]="['/game', game.id]"
       >
         <--- HERE ...
       </mat-card>
     </div>
     <router-outlet></router-outlet>
   </div>
   ```

    </details>

7. Serve your app again, click on some games, and compare with the screenshot above
8. Launch the dependency graph and see what's been added
9. Inspect what changed from the last time you committed, then commit your changes

---

The result is still pretty simple though. Our route just displays the ID of the selected game in a card. It would be great if we had some API to get the full game from that ID!

---

🎓If you get stuck, check out [the solution](SOLUTION.md)

---

[➡️ Next lab ➡️](../lab7/LAB.md)
