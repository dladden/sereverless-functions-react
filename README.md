# About netlify.toml

### The `[build]` Section in netlify.toml

In order to build the React application on netlify server we have to specify to netlify that we are building a react application. For that we add a build command:</br>
`command = 'npm run build'`</br>

Next we have to point to the publish directory:</br>
`publish = '/build'`</br>

And as always, when using serverless functions we have to point to where the functions are stored in our project:</br>
`functions = './functions'`</br>

## Netlify and React Redirects

If within the react app something for routing is chosen, as an example with React Router. We need to set up a redirect and rewrite rule for the single page app. [Redirects and rewrites](https://docs.netlify.com/routing/redirects/) If you do not, the redirects which are set up in the netlify.toml will not work.

### The `[[redirects]]` Section in netlify.toml

There redirect which is used in this project used to redirect api calls with a splat for projects. This redirect cannot be removed since it is part of the projects data fetching. In order to over come this hurtle we simply add another set of redirect which projects needs.</br>
`from = '/api/\*'`</br>
`to = '/.netlify/functions/:splat'`</br>
`status = 200`</br>

### **Adding `[[redirects]]` Section in netlify.toml for additional redirects**

Simply add another redirect, by adding another set of redirect you can overcome this problem. Here is an example of reddirects added in this project:

[[redirects]]

- from = '/\*'
- to = '/index.html'
- status = 200

#### build Command

Build command in the package.json
"build": "CI= react-scripts build"
