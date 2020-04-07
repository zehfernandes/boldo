# Boldo 🌱

An open source prototype tool with shared context.

[![Demo boldo](https://www.dropbox.com/s/plls8bk8qqueazo/demo.png?raw=1)](https://www.dropbox.com/s/035m3mthd0x6agf/demo-prototype-tool.mp4?dl=1)

## Why?

There are fantastic prototype tools in the market, but choosing one requires you to compromise whether in creative freedom or in an powerful outcome. Boldo comes as a prototype tool focused on sharing information within the softwares used in the design process, with a simple and easy code syntax to give creative freedom for new ideas, without stressing about your code.

The way we envision boldo is by using svelte under the hood: it allows you to write simple HTML, CSS and JS with all the modern web development tooling. Plus, integration with Figma, to avoid redrawing the designs and to create a shared context between the softwares.


## Get started

We are still working to find the best way to install and start a new project. As a proof of concept, you can start a new project cloning the repository and follow the steps:

1 - Install the dependencies

```bash
npm install
```

2 - Link your figma file

```bash
npm run link
```

3- Start project

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running.

## Walkthrough

For easy testing and iteration, To be easy to test and iterate we are using a single repository with four touchpoints: the prototype you are working on [`./project`](`./project`), the scripts to fetch and parse Figma [`boldo/scripts`](`boldo/scripts`), the components with methods and syntax sugar [`/boldo/components`](`/boldo/components`),  and the editor to help controlling the canvas and the prototype presentation [`/boldo/editor`](`/boldo/editor`)

The next steps are:

- Expanding the components library like Framer Classic, with a ScrollComponent, Page Component, Gestures Components...
- Growing the editor with a helpful GUI and potentially taking out of the browser and moving to an electron app.
- Starting to dig deeper to convert all Figma properties to a styled markup, in the most efficient way.
- Writing a good documentation

After completion of these tasks, we will probably split this directory into the other three `boldo-editor`, `boldo-components`, `boldo-figma-connect`, and have a CLI bootstrap `npx create-boldo-project` inside a boldo organization.

<br/>
Join and contribute to build the prototype tool we have always dreamed of.

## LICENSE

MIT, see [LICENSE.md](LICENSE.md) for details.
