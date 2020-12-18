# Mater Gatsby

## Gatsby basics

- Gatsby is a framework to build modern websites.
- Gatsby websites are fast and that's because they are statically generated, meaning that at build time all the pages will be pre-rendered to HTML, JS and CSS. Other key features that make it fast are:
  - It only loads critical CSS for every page before it loads the content to prevent the jerky motion we see in some pages.
  - Rehydration: After serving the HTML, Gatsby will pick it up from there and turn it into a full fledged React app.
  - Lazy loads images, meaning it downloads the images when they are about to be seen, also compresses images and converts them to modern formats.
  - Huge plug-in ecosystem.
- By default Gatsby websites get great Lighthouse scores so they get great scores on: Performance, accessibility, best practices and SEO.
- One of Gatsby's shortcomings is that due to it's static nature some things need to be coded in a particular way, specifically when it comes to dynamic pages.

### Gatsby pages

- `static/` is where files that we wanna serve up like regular HTML, like favicons. Almost always we won't be putting things here (not even images or fonts) because we want to run everything through Gatsby because it'll take care of doing performance tasks on those assets.
- The only required folder in a Gatsby project is the `pages/` directory.
- To create a new page in our website we simple need to add it to our `pages/` directory, if we add `index.js` it'll show this page in the root path `/`.
- By default Gatsby will create a 404 page for any routes it doesn't find a match for, but most likely we want our own so we just add `404.js`. This doesn't apply in development where Gatsby will provide a sort of debugger page.

## Routing and Navigation in Gatsby

- Our pages components will usually be the entire page we see and then what we have inside `components/` will be reusable pieces in our pages.
- Most of the time to change from page to page, instead of using the regular `<a>` tag, we'll use Gatsby's `<Link>` component which will render a link tag but supercharge it with other nice features. This performs a HTML5 pushState and instead of reloading the whole page it'll just change the component.
- There are times when we'll want to programmatically change the page, like when somebody submits a form, then we can use Gatsby's `navigate` API . And if we pass `replace:true` it'll show up in the browser's history.

## Creating Layouts in Gatsby

- If we want a layout for all of our pages, we can create a `<Layout>` component that will render it's children along with whatever else we want as our layout.
- Alternatively, we can create a file in our root called `gatsby-browser.js` and let Gatsby know we want it to wrap our pages in our layout component by default by hooking into the `wrapPage` element hook.
- This will only run in the browser since `gatsby-browser` only runs when our page has been loaded and generated in the browser. But Gatsby also generates everything in the server (since it's server rendered) so we need to also add it to `gatsby-ssr.js`.
- NOTE: Whenever we modify `gatsby-browser.js`, `gatsby-node.js`, `gatsby-config.js` or `gatsby-ssr.js` we need to restart the build.

## CSS

- Our styles also need to go through Gatsby since it'll take care of loading only the critical CSS for each page.
- Using `normalize.css` allows us to set a baseline for all the styles across different browsers.
- Importing images or CSS is not valid JS but Gatsby allows to import anything into JS files including images and CSS, and it knows not to render those to JS but to CSS or any other valid place.
- One of the nice things Gatsby does for images is that before an image is rendered for the first time it will render a pixelated version of the image as text using base64.
- Whenever we use an image in Gatsby it will run it through it's compressor but also add a random ID to the name. This allows us to change an image with the same name and not have to ask users to do a hard refresh to see the image change.
- Styled components allows us to create scoped styles. We using it by putting all our styles inside a template literal that's passed to a Styled component's function and it will return a component. We can then render that component into our page or another component.
- Any styles added using `createGlobalStyles` will be applied globally.
- Any styles added using `styled` will be scoped to that component.
- In Styled Components, we can affect styles of the children from the parent by creating a class and then assigning that `className` to the child Styled Component.

## CSS Tricks

- A nice way to handle Styled Components is to create a styled component for the component at the top of the file and then select the HTML elements in the styled component to style the children.
- When doing `transform` if we want to add another transform for example in a pseudo-selector and only change one property this will override all the previous transform properties. A way to get around this is using css variables for each property and then just update the variable in the pseudo-selector.

## Headless CMS

- The idea of a headless CMS is that there's no frontend, meaning we have to build it.
- Sanity is a headlessCMS. To start a sanity project we need to install it globally and then do `sanity init`, if we make changes to the sanity config files then we need to run `sanity init --reconfigure`.
- Sanity provides two things:
  - Sanity: The API we'll interact with
  - Sanity Studio: The UI to do CRUD actions.
- To add a schema ("tables and fields") to Sanity we need to first create our schema in `sanity/schemas/`, import it in `schema.js` and add it to `types` in `createSchema`.
- Everything in Sanity Studio is a react component so for any property in our schema we can pass it a React component.
- The type `slug` will add a field which output will be a slug for whatever we entered in the field marked as it's `source`.
- To add input validation we simply add a property called `validation` which is a function that receives a `Rule` parameter and returns the set of rules by chaining them.
- In Sanity most of the fields take an `options` property to alter the default behavior.
- We can create custom previews of each registry of a document by adding the `preview` property.
- To create relationships between content types (documents) we add a property type (can be an `array`) and also the `of` property with type `reference` and `to` as the name of the document(s) we want to link it to.
- One thing with adding arrays to previews is that it's not recommended since we might be over-fetching data. Instead we need to select each field, e.g.: `topping0: 'toppings.0.name'`
- We're in full control of sanity-studio UI too, all of the custom components for Sanity Studio go in `components/`. And to use our component we pass it as the value of `inputComponent` in the schema's field.
- For custom inputs we need some special functions from sanity: `PatchEvent`, `set` and `unset`. These will allow us to hook into the input's event and pass it as the value of the `onChange` prop. We also need to pass the `inputComponent` prop as a `ref` to let Sanity know that the `ref` is where the actual input is handled and the other stuff in our custom component is not related to the data. And finally we also need to wrap our event handler in the `onChange` prop.

## Getting Data into Gatsby with GaphQL

- The whole idea around Gatsby is that at build time it'll grab all the data it needs (in our case from Sanity), put it in a sort of in-memory DB and then we can query that data via GraphQL queries. Gatsby comes with some queries built-in.
- To surface our data from whatever source we used into our GraphQL explorer we use plugins, we defined them in `gatsby.config.js`. We can write our own data here and it'll surface it to the explorer.
- Gatsby plugins are plugins that make it easy to work with other libraries, services, etc. in Gatsby. We specify them in the property `plugins` in `gatsby.config.js` and we can also pass the plugins an options object to override defaults.
- `gatsby-plugin-styled-components` allows us to only load critical CSS to our pages.
- When using Sanity we can use a plugin to source the data from sanity to the GrapiQL explorer called `gatsby-source-sanity`. If we set `watchMode: true` then in development whatever data we add/modify in Sanity Studio will automatically be reflected in our Gatsby site.
- `gatsby.config.js` goes in our version control so we don't wanna show sensitive data (secrets) there, so we put secrets in an `.env` file and we use them like `process.ENV.MY_SECRET`. By default Gatsby will surface every secret that starts with `GATSBY_` but not in `gatsby.config.js` so we need to use the `dotenv` module.
- When sourcing our data from other plugins we need to deploy our GraphQL API, so after configuring everything for Sanity in `gatsby.config.js` we run `sanity graphql deploy production` in the sanity tab. After deploying we get a URL to a GraphQL Playground (very similar to GraphiQL) to our Sanity API so we can query all of our Sanity data there, then we restart our Gatsby server and that should give us all of our data in the Gatsby API.
- So by the end of this what the `gatsby-source-sanity` plugin does is move our data from our Sanity API to our Gatsby API.
