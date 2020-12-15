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
