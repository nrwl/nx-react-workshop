### 💻 Lab 8 - Displaying a full game in the routed game-detail component

###### ⏰ &nbsp;Estimated time: 15-20 minutes

Now that we have a proper API, we can remove the `fake-api` created earlier and make proper HTTP requests. We'll also look at how the Nrwl Express generators created a helpful proxy configuration for us.

## 📚 Learning outcomes:

- **Learn how to connect frontend and backend apps in an Nx workspace**

#### 📲 After this workshop, you should have:

<details>
  <summary>App screenshot</summary>
  <img src="../assets/lab8_screenshot.png" width="500" alt="screenshot of lab8 result">
</details>

## 🏋️‍♀️ Steps:

1. We can now delete the `fake-api` from the `store` app
<br />

2. Use `fetch` in a `useEffect` hook in the [app.tsx](../../examples/lab8/apps/store/src/app/app.tsx) component and call your new API as an _HTTP request_. We also added a local state to track changes.

   ⚠️&nbsp;&nbsp;_Notice how we assume it will be available at `/api` (more on that below)_
<br />   

3. Run `nx serve api`

   ⚠️&nbsp;&nbsp;Notice the _PORT_ number
<br />   

4. In a different tab, run `nx serve store`

   ⚠️&nbsp;&nbsp;Again, notice the _PORT_ number
<br />   

5. Everything should still look/function the same!

   🎓&nbsp;&nbsp;You can inspect your Network tab in the dev tools and notice an XHR request made to `http://localhost:4200/api/games`
<br />   

---

🎓 &nbsp;&nbsp;Even though the frontend and server are being exposed at different ports, we can call `/api` from the frontend store because `Nx` created a proxy configuration for us (see `apps/store/proxy.conf.json`) so any calls to `/api` are being routed to the correct address/port where the API is running.
This helps you avoid CORS issues while developing locally.

---

**Now let's load the full game in our routed component!**

6. Inside the `libs/store/feature-game-detail/src/lib/game-detail` folder, replace the following files:

   - [tsx](../../examples/lab8/libs/store/feature-game-detail/src/lib/store-feature-game-detail/store-feature-game-detail.tsx) / [module.scss](../../examples/lab8/libs/store/feature-game-detail/src/lib/store-feature-game-detail/store-feature-game-detail.module.scss)

   ⚠️&nbsp;&nbsp;Notice how we're using the shared `formatRating()` function in our routed component as well!
<br />

7. Your component should look similar to the provided screenshot! (you might need to restart your `nx serve store` so the new button styles can be copied over)
<br />

8. Inspect what changed from the last time you committed, then commit your changes
<br />

---

🎓&nbsp;&nbsp;If you get stuck, check out [the solution](SOLUTION.md)

---

[➡️ &nbsp;Next lab ➡️](../lab9/LAB.md)
