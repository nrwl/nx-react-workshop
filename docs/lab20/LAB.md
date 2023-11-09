# 🎸 Lab 20 - Connecting the frontend and backend

###### ⏰ &nbsp;Estimated time: 5 minutes

## 📚 Learning outcomes:

- **Configure the React app for production**
  <br />

## 🏋️‍♀️ Steps:

When we serve the Store and API locally, they work great, because of the configured
proxy discussed in previous labs. The Store will think the API lives at the same address.

When deployed separately however, they do not yet know about each other. Let's configure
a production URL for the API.

1. In `apps/store/src/app/app.tsx`, inject an API URL if it's available as an env variable:

   ```ts
   fetch((process.env.NX_API_URL ?? '') + '/api/games');
   ```

   ⚠️&nbsp;&nbsp;Nx automatically replaces any env var prefixed with `NX_` in your code. We are allowing devs to override the API URL above via an env variable.
   <br />

2. Do the same in `libs/store/feature-game-detail/src/lib/game-detail/game-detail.tsx`:

   ```typescript
   fetch((process.env.NX_API_URL ?? '') + `/api/games/${gameId}`);
   ```

   <br />

3. Point your local apps to your Fly.io API.

   1. Make sure your API is not running locally
   2. Serve your app with `NX_API_URL=https://<your-app-name>.fly.dev nx serve store`
   3. You should see the games being loaded from Fly.io
      <br />

4. Build the Store for production (make sure to make the `NX_API_URL` env var available when building) and trigger a deployment
   <br />

5. Go to your Surge deployment URL - you should now see the full app with all the games.
   <br />

---

[➡️ &nbsp;Next lab ➡️](../lab21/LAB.md)
