## Figma-React-Tailwind-Starter

This starter is based on [figma ai template](https://github.com/figma/ai-plugin-template). Added more libs and linters to make DX better.

Choosing a technology stack is a very subjective matter, if you happen to like using `Vite`, `React`,`Tailwind`, `TS` and `shadcn ui` and more to build `Figma plugins`, then give it a try.

## Getting Started

Clone this repo or create a repo based on this starter on Github

```sh
yarn
yarn dev
```

We prefer `Yarn` as package manager, If you want to use `pnpm` or `npm`, feel free to use

## Tech Stack

- [nextjs](https://nextjs.org/)
- [shadcn ui](https://ui.shadcn.com/)
- [react-lucide](https://lucide.dev/)
- [react-query](https://tanstack.com/query/latest/)
- [tailwindcss](https://tailwindcss.com/)
- [less](http://lesscss.org/)
- [postcss](https://postcss.org/)
- [eslint](https://eslint.org/)/[stylelint](https://stylelint.io/)
- [prettier](https://prettier.io/)
- [svgr](https://react-svgr.com/)
- [editorconfig](https://editorconfig.org/)
- [husky](https://typicode.github.io/husky/#/)/[lint-staged](https://github.com/okonet/lint-staged)
- [commitlint](https://commitlint.js.org/)

## Publishing your plugin

In this example we will be publishing the Next.js app to [Vercel](https://vercel.com/). You can also publish to any other hosting provider that supports Next.js.

1. If you haven't already, push your code to a git repo on GitHub.
2. Create an account on Vercel and connect your GitHub account.
3. Deploy your app to Vercel. You can follow the guide [here](https://vercel.com/docs/concepts/deployments/git).
4. While deploying make sure to set the environment variable `OPENAI_API_KEY` to your OpenAI API key.
   ![Photo of environment variable editor](https://static.figma.com/uploads/e41166e6a4e0d9c9c90bf662a609396ab7fe33cc)
5. Once your app is deployed you can update the `siteURL` section of your `package.json` file to point to the deployed URL. It will look something like `https://your-site-here.vercel.app/`

```json
"config": {
  "siteURL": "https://your-site-here.vercel.app/"
}
```

6. Run `npm run build` to create the production build of your plugin that points to your deployed URL.
7. Test your plugin locally and make sure that it works after pointing to vercel.
8. [Publish your plugin to community](https://help.figma.com/hc/en-us/articles/360042293394-Publish-plugins-to-the-Figma-Community)
9. After publishing to community your plugin will update automatically when you push to your git repo.

## figmaAPI

This template includes a `figmaAPI` helper at `@/lib/figmaAPI` that lets you run plugin code from inside of the iframe. This is
useful for avoiding the iframe <-> plugin postMessage API and reduces the amount of code you need to write.

**Example:**

```ts
import { figmaAPI } from "@/lib/figmaAPI";

const nodeId = "0:2";

const result = await figmaAPI.run(
  (figma, { nodeId }) => {
    return figma.getNodeById(nodeId)?.name;
  },
  // Any variable you want to pass to the function must be passed as a parameter.
  { nodeId },
);

console.log(result); // "Page 1"
```

A few things to note about this helper:

1.  The code cannot reference any variables outside of the function unless they are passed as a parameter to the second argument. This is
    because the code is stringified and sent to the plugin, and the plugin
    evals it. The plugin has no access to the variables in the iframe.
2.  The return value of the function must be JSON serializable. This is
    because the result is sent back to the iframe via postMessage, which only
    supports JSON.


## Related

- [Next Starter](https://github.com/Quilljou/next-ts-tailwind-starter)

- [React Starter](https://github.com/Quilljou/vite-react-ts-tailwind-starter)

- [Figma Starter](https://github.com/Quilljou/figma-react-tailwind-starter)

<!-- [Electron Starter](https://)

[R3f Starter](https://)

[Express Starter](https://)

[Node Starter](https:/)

[Chrome Extension Starter](https://)

[VSCode Extension Starter](https://) -->
