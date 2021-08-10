<p style="text-align: center;"><img src=".github/assets/nx.png" 
width="100%" alt="Nx - Smart, Extensible Build Framework"></p>

<h1 align="center">React at Scale with Nx Workshop</h2>

✨ In this workshop we'll be building a store for a fictional board game company called "The Board Game Hoard".

We're going to be using [Nx](https://nx.dev/) and some its plugins to accelerate the development of this app.

Some of the things you'll learn:

- Generating a pristine Nx workspace
- Generating frontend React apps and backend APIs inside your workspace, with pre-configured proxies
- Creating shared libs for re-using code
- Generating new routed components with all the routes pre-configured by Nx and ready to go
- How to organize code in a monorepo
- Easily move libs around your folder structure
- Creating Storybook stories and e2e Cypress tests for your components

## The Board Game Hoard

To help you understand how to apply some of these lessons in your own projects, we'll try to build a more **"real-world"** example. However, because of the time constrains and to make sure we get to cover as much material as possible, we'll provide you with all the code for any "non-Nx" work you need to do (like styling and configuring routes) - so you can focus on learning to use Nx to its full potential.

This is what we'll build:

  <img src="docs/assets/game-demo.gif" height="700" alt="lab4 file structure">

## Pre-requisites

Nx has support for a lot of platforms, but in this workshop we'll be using mainly React. While all the code for any React specific work will be provided, it will help if you have some experience with the React ecosystem.

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) version 12 and up
  - `node --version`
- [Yarn (optional)](https://classic.yarnpkg.com/en/docs/install/)
  - `yarn --version`

## How the labs work

Each lab will have the following sections:

- ⏰&nbsp;&nbsp;**Estimated time**
  - How much time we expect is needed to finish this lab
- 📚&nbsp;&nbsp;**Learning outcomes**
  - A summary of the most important things you'll learn in that lab
- 📲&nbsp;&nbsp;**After this workshop, your app should look similar to this**
  - This will contain a screenshot of any changes to the app visuals after the lab  
- 🏋️‍♀️&nbsp;&nbsp;**Steps**
  - All the lab steps you need to follow

The lab might also have this helpful sections:


- 🐳&nbsp;&nbsp;**Hints and solutions feat. Ron the whale**
  - While the _mighty narwhal_ is away on secret missions, you will occasionally see his assistant, **Ron The Whale 🐳** offering helpful hints to the different exercises. Please use these if you get stuck.
- ⚠️ &nbsp;&nbsp;**Important information**
  - Sometimes there are hidden gotchas or common mistakes. Read this before running the step
- **Source files**
  - As mentioned, for anything React/styling or HTML template work we will provide the code you need as direct links to the files. Please use these as much as possible.
- 🎓&nbsp;&nbsp;**Solution**
  - If you get stuck running any Nx command, there is a `SOLUTION.md` file in each lab's folder.

Finally, if you fall behind or join late, Git branches are provided for each lab, which will fast forward you to that lab - `git checkout starting-labx` (where `x` is the number of the lab you want to start).

If you want to skip ahead to the end: `git checkout final`

## The labs

Each lab will contain a link to the next one. Start from **"Lab 1"** and move through them as required:

- 🔬&nbsp;&nbsp;[Lab 1 - Generate an empty workspace](docs/lab1/LAB.md)
- ⚗️&nbsp;&nbsp;[Lab 2 - Generate an React app](docs/lab2/LAB.md)
- 🧪&nbsp;&nbsp;[Lab 3 - Executors](docs/lab3/LAB.md)
- 🔭&nbsp;&nbsp;[Lab 4 - Generate a component lib](docs/lab4/LAB.md)
- 🧬&nbsp;&nbsp;[Lab 5 - Generate a utility lib](docs/lab5/LAB.md)
- 🧮&nbsp;&nbsp;[Lab 6 - Generate a route lib](docs/lab6/LAB.md)
- 🤖&nbsp;&nbsp;[Lab 7 - Add a NestJS API](docs/lab7/LAB.md)
- 📐&nbsp;&nbsp;[Lab 8 - Displaying a full game in the routed game-detail component](docs/lab8/LAB.md)
- 💻&nbsp;&nbsp;[Lab 9 - Generate a type lib that the API and frontend can share](docs/lab9/LAB.md)
- 👩‍💻&nbsp;&nbsp;[Lab 10 - Generate Storybook stories for the shared ui component](docs/lab10%20-%20bonus/LAB.md)
- ⌨️&nbsp;&nbsp;[Lab 11 - E2E test the shared component](docs/lab11%20-%20bonus/LAB.md)
