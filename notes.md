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
- There are two types of queries in Gatsby:
  - Page Queries:
    - Can be dynamic with variables.
    - Can only be run on a top level page.
  - Static Queries:
    - Can't be dynamic, no variables can be passed in.
    - Can be run anywhere.
- One thing in GraphQL is that we need to specify every field we want, we can't query for everything. So we have `Fragments` which are a collection of fields, the Sanity plugin comes with some useful fragments like `GatsbySanityImageFluid`.
- To get the data from our Gatsby API into our component we use the `graphql` function and pass it our query. By doing this we'll get the results of our query as props into our component.
- We'll notice that the cool part of right here is that there's no loading state when we're fetching data, when Gatsby shows our page it already has that data.

## Puttin in work

- Images is something that can make our site slow (compression, size, loading perf, format), luckily for us Gatsby has a special image component to take care of all these things for us called `gatsby-image`.
- If we have images in a directory, we can source them from our directory and run it through gatsby's plugins `gatsby-transformer-sharp` and `gatsby-plugin-sharp`. This can take a long time since they'll also be done at build time.
- We can also use services that will create all the image mutations on demand as the user requests them, we use Sanity Image Pipeline which is compatible with `gatsby-image`. Other services: Cloudinary, Imagix.
- If we have one, we can import all of our data to Sanity from a gzip file with `sanity dataset import ./sample-data/all-sample-data.gz production --replace`
- As mentioned before if we want to use a query inside a component it has to be a static query. To create a static query we use Gatsby's custom hook `useStaticQuery`.

## Making Gatsby Dynamic

- In the `gatsby-node` file we can hook into the `createPages` API from Gatsby to dynamically create pages.
- The `createPages` gives us the `graphql` and `actions` params, which we can use to query our data and also create pages by using `actions.createPage()` and passing the path to the new page, the component (only the path) and pass any data to the component as props with `context`.
- In `gatsby-node` we'll want to query just enough data to get our page rendered. Then in the actual component we can query all the data needed for that page. Querying all the data in `gatsby-node` is completely valid but this way we can modify only the page component when we want to get more or less data and adjust the UI in the same file.
- The functions in `createPages()` don't depend on each other so instead of awaiting for each of them to be done, we can do it concurrently with `Promise.all`. This will make our build faster.
- In the case of the single topping page we don't want a new page, we'll simply use the pizzas page and modify the query. This is a work-around to the static query limitation in the `ToppingsFilter` component where we couldn't tell what the active topping was, now we can simply pass it as a prop in `pageContext`. This turns out to not be needed since Gatsby puts an `aria-current='page'` on the link that's currently active so we can style the link with that attribte.
- The way we filter an array varies from implementation to implementation, in Gatsby we do it with `elemMatch`.
- To source (get data into the Gatsby API) nodes (each piece of data) from external APIs we make use of the `sourceNodes()` function in `gatsby-node`. Similar to the `createPage()` function we also get a `params` object here.
- When creating nodes we need to pass both the actual data and also meta data about the node, this is where the functions, in the `params` object, like `createNodeId` and `createContentDigest` come in handy. Once we have both the node's data and meta-data we pass it to the `actions.createNode()` API from Gatsby and we'll be able to see this data in our Gatsby GraphQL API.
- The cool thing about this last part is that we only need to give Gatsby the data and it will automatically build the GraphQL schemas needed for that data.
- `fetch` is not available in node so we have to use `isomorphic-fetch` in `gatsby-node`.

## Pages & Filtering

- To get the gatsby image in CSS we don't do `img` because of all the stuff Gatsby adds to our image, we do `.gatsby-image-wrapper`.
- When showing all the slicemasters the hotspot option comes in handy in case an image is cropped in a weird way, so we can use the hotspot circle in sanity studio to chose the hotspot and we need `hotspot: true` in `schemas/person.js`.
- Pagination in Gatsby is a little different since we need to know how many pages there are at build time, we can't have query URL params like `?page=2`.
- We can surface data to a Gatsby page from our `.env` file we have to prefix it with `GATSBY_` and then we can access it from `process.env`. That's why we wouldn't be able to surface something like our sanity token.
- Then what we do is create pages for each page of slicemasters we'll want. So for example `slicemasters/1` will contain the first n amount of slicemasters at build time.
- In our Gatsby GraphQL API we can pass the `limit` and `skip` variables to our query, to get only a specific range of data.
- Sometimes adding `GATSBY_HOT_LOADER=fast-refresh` to the `.env` file can make the development workflow easier by refreshing the site after a broken build.
- We choose to disabled the next/previous links instead of conditionally rendering because when there's no previous all the pagination layout shifts.
- To get the pagination to go to `/slicemasters` instead of `/slicemasters/1` we can't use `pageContext.pageSize` to get the pageSize because `/slicemasters` is not being generated in `gatsby-node` it's created by just being in our `pages/` dir, so we won't get any of the `context` we passed in `gatsby-node` and in this case we'll need to calculate it again from `process.env`.
- Since we do all of our current page styling with css we have to add a special condition to add the class name `current` when the page is 1 because the link in nav is `/slicemasters` and the one in our pagination is `/slicemasters/`.
- It's a convention to use a `templates/` dir to have all of our "pages" that can be reused multiple times, compared to the ones in `pages/` that should be for pages that aren't meant to be reusable. They could also go in `components/` but it's a nice differentiation because templates are entire pages instead of single components in a page.
- To access data from `gatsby-node` down in the component, we get the data we pass in `context` both in our component with the `pageContext` prop and in our graphql query just by adding a variable like `$myVar`.
- By default we're missing a lot of SEO and QOL things like meta tags and a title tag. That's where `react-helmet` comes in, it allows us to add tags in react helmet and transport them from wherever we put them into the document's head.
- It'd be exhausting to write the head's tags in every component, that's why we create a `<SEO />` component that covers the defaults for all pages and then we can override it on individual pages that need to.
- When we get into pre-rendering we need the `gatsby-plugin-react-helmet` plugin to integrate `react-helmet`.
- `titleTemplate` will append whatever text we set after `%s` to the current page title.
- We can access our site metadata in `gatsby-config` by using `useStaticQuery`.

## Order Form, Custom Hooks and State Management

- To make it easy to control our form values we created a custom hook which basically takes all the initial values and then just returns the updated values and the updater function.
- Due to the way Gatsby works we can't import and use a GraphQL query from one page into another. We have to create one for each page, even if they're the same.
- `Intl.NumberFormat` is a built into JS utility that helps us format numbers into different things like currencies by passing the locales and currency name.
- For our `<PizzaOrder />` component we can't use directly the `removeFromOrder` function from the `usePizza` custom hook because we need it to be bound to our `pizzas` state in `order.js`, if we were to use the hook again it'd create a separate `pizzas` state.

## Serverless Functions

- When navigating between pages the page state will be lost because Gatsby will mount and unmount each page component. That's why we need to move our state up, in Gatsby the highest level in our tree is `<Root>` so using `wrapRootElement` in `gatsby-browser` and `gatsby-ssr` we wrap the root component in our order context provider, and we can delete our state in `usePizza` and access it via `useContext`.
- For the issue when deleting items from our order that were for the same pizza, it was due to using the pizza ID as our order `key`. To fix this we continue using the ID but append the index at the end.
- When Gatsby builds our project it returns only HTML, CSS and JS and Sanity provides all of our data at build time. But when we want to do something in the backend like sending an email or a contact form, we can't do that in Gatsby. But Gatsby works very well with serverless function. Serverless function are like a regular node server but instead of having an entire server that does lots of things we have a single function that will shut down after it does its thing.
- Once we have Netlify in our Gatsby project, when we do `npm run netlify` this will run `netlify dev` which in turn will give us a URL and it will proxy our Gatsby website so this will be the URL we run our website from now on.
- To use netlify functions (AWS lambda under the hood) we need to add `netlify.toml` and point to our `functions/` dir. For each function we need a folder and a file with the same name.
- In these functions we can import or require anything installed in our global `package.json` but sometimes our serverless functions get so big that we want an individual `package.json` for a single function. In Netlify we can simply do `npm init` inside the function folder and it'll be scoped to that function.
- For emails normally we'd use a transactional email provider (e.g.: Postmark) but for test purposes we can use `ethereal.mail` by the nodemailer team which will create a temporary test email account. We create an account with them and use the given credentials.
- We put the base of our serverless functions URL in `.env` to make it flexible in case we don't wanna deploy it to Netlify.
- In our serverless function we get whatever we sent in the request's payload in `event.body`.
- We add server side required validation, we just keep an array of the name of the required fields and check if they are in `event.body`, if they're not then we send a status `400` and an error message.
- Since we're in charge of the API we make sure to do validation server-side, could be both server and frontend.
- Every time we create a submittable form that's public in the internet we have to integrate some sort of mechanism to guard against bots. One of them is a honeypot, a field that the users are not supposed to fill out so if a bot fills it we will detect that because regular users wouldn't do that. Don't name it `honey` nor use the `hidden` HTML attribute because bots are smart enough to detect that.
- It's a good idea to have some one-offs in our homepage, these are quick access info like the persons working in store that day or the pizzas that are available by the slice.
- Just like we can create our own inputs in Sanity, we can also create our own sidebar.
- We hide the Settings from sidebar because we don't want anyone to actually interact with it directly, we want them to use it via the Home Page sidebar menu.
- Data that needs to be updated at run time shouldn't go through Gatsby's GraphQL API because that's all built at build time. For this type of data we can go directly to the source of the data from the client side. For sanity we can get the GraphQL production URL with `sanity graphql list`, remember to deploy any changes before to see them in the production playground.
- We add the sanity GrahpQL endpoint in our env file so remember that when we do this we need to restart our process with `npm run netlify`.
- When trying to fetch from the sanity endpoint we'll run into CORS issues, to fix this we need to go to our project's settings webpage (`sanity manage` in CLI or logging in `sanity.io`) in Settings>API, and add `http://localhost:*` as new origin and allowing credentials.
- With our implementation our custom hook is called once but the component is rerendered 2 times since the state is updated 3 times:
  1. First time when it creates the state variables (`hotSlices: undefiend, slicemasters: undefined`).
  1. Second time when we set hotSlices state (`hotSlices: [...], slicemasters: undefined)`).
  1. Third time when we set slicemasters state (`hotSlices: [...], slicemasters: [...])`).
- The src we use in the image for `LoadingGrid.js` is just a trick to maintain the aspect ratio by using a transparent gif, we can create our own in <https://png-pixel.com>.
- We achieve the loading animations by using a linear gradient and animation the position of the background.
- A trick to have formatting and syntax highlighting for GraphQL queries that don't use Gatsby's `graphql` (like `useLatestData`'s) is to add `gql` before the template string but we don't have a graphql module for this so we also need to add a `gql` dummy function that takes all the pieces and then join them back together or one that uses `String.raw`, this will trick VSCode into thinking it is indeed graphQL.
- Since fragments are only used on the client-side when making requests in GraphQL, an alternative is to just use a template literal with the fields our fragment would have and interpolate it in the query of the fetch request.
- Since we're not using Gatsby to fetch the images in our home page, we can't use Gatsby Image. Luckily Sanity supports image resizing in the URL. And since the images will still take a second or two to load we can use Sanity's LQIP (Low Quality Image Placeholder) while they load.

## Building, Deployment and Responsive Design

- First we need to deploy Sanity (our backend), we can host it ourselves (harder) or simply use Sanity Studio by doing `sanity deploy`, and this will return a URL with our sanity CMS deployed. The project needs a `sanity/static` dir for this to work, this folder won't go in version control.
- If we wanted to host Sanity ourselves we need to host everything inside `sanity/static` wherever we want and add that domain name to our allowed API routes.
- To build or Gatsby project we only need to do `npm run build`, which will put every HTML page in the `gatsby/public/` folder. This will vary depending on the project size and the images it uses, luckily for us Sanity handles the images and it's resizing so it shouldn't take too long.

## CSS Tricks

- A nice way to handle Styled Components is to create a styled component for the component at the top of the file and then select the HTML elements in the styled component to style the children.
- When doing `transform` if we want to add another transform for example in a pseudo-selector and only change one property this will override all the previous transform properties. A way to get around this is using css variables for each property and then just update the variable in the pseudo-selector.
- `subgrid` is where children of another child will align themselves to a grandparent Grid.
