# 🌈 Intro to Web Development (with React & Firebase) Workshop (at QWER Hacks 2020)

Hey there! This repo contains the finished product of QWER Hacks 2020's Intro to Web Development (with React & Firebase) workshop, and a written guide that summarizes and expands upon the content of the workshop.

It assumes basic understanding of programming fundamentals (e.g. functions, conditionals, variables) and a bit of experience with object-oriented programming, but doesn't explicitly assume previous HTML, CSS, JS, React, or Firebase experience. However, if you don't have experience with HTML/CSS/JS, I 100% recommend that you look at some of the [appendix resources](#appendix) first, since this document/workshop brushes over the details.

You can find the slides for the workshop [here](https://docs.google.com/presentation/d/1qwiixhs7Y1T6ZBk9C_vluvLPCe3vOzkQXeTcIYtpPPw/), though this document covers (almost) everything in the slides and more!

Since this is a hackathon workshop, it goes for breadth over depth and emphasizes working familiarity rather than core understanding. Unfortunately, that means that we gloss over a few important web development concepts; however, I've included some pointers in the Appendix on learning more. In this document, I'll occasionally footnote interesting tidbits that you can learn more about!

(this workshop was developed and presented by [matthew wang](https://matthewwang.me). if you have any questions, feel free to [ask!](mailto:matt@matthewwang.me))

## Brief Overview

The goal of this workshop is to create a skeleton for a basic web application with client-"server" interaction (I'll explain why "server" was in quotes in a moment). Specifically, the example app we'll be making is an online chatroom.

The topics we'll cover today are the bread and butter of web development, and hopefully this workshop gives you a working understanding of the basics of web development. Plus, it should give you the base set of skills to make awesome web applications at QWER Hacks!

I mentioned this earlier, but I should warn you again: this workshop is focused on quick prototyping and hackathon solutions - we’ll be skipping over a lot of the (super cool) concepts and details that can turn a mediocre developer into a superstar. I'll try to point out when we gloss over really important things, and I've also included more information in the Appendix.

## The Client-Server Model

*This touches on how web applications work on a very high level. Feel free to skip this, it's a lot of text!*

Almost all web and mobile applications follow the client-server interaction model. At a very simple level, it looks like something like this:

![client-server diagram](images/client-server.png)

If you've heard of "front-end" or "back-end" web development, it usually boils down to the difference between the client and the server.

The **client**, or the front-end, is what runs on the user's computer (or other device). It's responsible for creating whatever the user sees (e.g. the interface for a web page, a mobile app, or a video game).

For web applications in particular, the client is the user's web browser (like Chrome, Firefox, or Safari). Browsers themselves run code that some developer (like you!) has written, usually in HTML, CSS, and Javascript ([*](#browser-languages)). As we write some code, I'll expand a bit more on what these are; I've also included appendix entries for [HTML](#html), [CSS](#css), and [JS](#js).

Some apps can run entirely as front-end applications (meaning that after the user downloads it, the app is entirely self-contained). Examples include simple text editors or single-player video games!

However, we're doing *web* development, and that usually involves communicating over the internet somehow. Social media sites like Facebook need to store posts and images that users upload, user accounts (and their passwords!), and tons of other information that they mostly use to sell you ads.

To do this, you'll need some central computer to store and distribute this information: this is called a **server**. A lot goes into servers, but at their core they send and receive information to and from each client. The information includes the code that goes into the front-end, but also includes data that the application uses, and files that the client needs (like images, videos, or other applications). People who work on servers are often called back-end developers (though "back-end" can mean lots of things).

Servers can be written in a variety of languages; I guarantee that there's an HTTP server for your favourite language (unless it's [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck)). The [appendix entry](#server-languages) covers some popular options and expands a bit more on the topic.

If you're storing lots of data (like millions or billions of users), you'll need a good way to organize, store, and retrieve your data. **Databases** are programs and rules that let developers do this efficiently. It might not sound like it, but database engineering is one of the trickiest (and highest-paying) types of web development work! 

Recently, there's also been an uptick in popularity of data science (and more broadly, machine learning) - there's quite a bit of cross-over with databases and data science! 

The [appendix entry](#databases) goes a bit more in-depth; this is a topic that we'll almost entirely gloss over in this workshop.

Hopefully, you have a better understanding of how web applications work! If stuff like this sounds cool, then you should definitely explore more of web development!

## Our Tech Stack

Okay, but what are we doing today? We're going to use two very popular libraries/frameworks to build out our front-end, and cheat a bit to do as little back-end work as possible (which is usually tougher for web development beginners).

I'll give a brief flyover of what we're using today, but we'll learn more as we delve into coding; I've also included appendix entries on both!

### React

![react logo](images/react-logo.png)

[React](https://reactjs.org/) is a popular Javascript framework that's used to build front-ends (and more specifically, user interfaces). While you totally can make front-ends in "normal" Javascript, React can make complex apps much easier to code and manage. In particular, it allows you to create reusable code components, and manage your app state in a structured way.

React will be the core of our app: it will handle the interface of our application, keep a client-side snapshot of our data, manage our app's routing ([*](#spa)), and make calls to our back-end.

Coding "in React" is very similar to coding with Javascript, and shouldn't be too jarring if you're used to using other declarative languages or web development. It does introduce something called **JSX** ([*](#JSX)) to declare components; we'll go over that in a moment.

React is an open-source project made and maintained by Facebook. It's absurdly popular, with a vibrant and mature community, lots of supporting libraries, and jobs! I blab a bit more about React [in the appendix](#more-react).

React is one of many MVC/MV* frameworks; I talk a bit more about what that means and other examples in [the appendix](#mv-frameworks).

### Firebase

![firebase logo](images/firebase-logo.png)

[Firebase](https://firebase.google.com) is a "comprehensive app development platform" designed to make developers' lives easier. Specifically, it implements a lot of common back-end functionalities for you (like database management, user authentication, analytics, hosting, monitoring, and testing).

Today, we'll use **Cloud Firestore**, which is a database scheme and manager provided by Firebase. It simplifies a huge (and I really mean *huge*) part of making apps. 

For us, Firebase itself will manage deploying and hosting the server; we'll use Firebase's Javascript library to communicate with that server. Later on in the workshop, I'll walk you through how to set up a Firebase app.

Firebase is a product that's sold by Google, though many of its supporting libraries are open-source. It's a comparatively new product that competes in many fields of web development, but doesn't have a single competitor. I talk a bit more about Firebase [in the appendix](#more-firebase).

## Project Setup

Cool, now that we've gotten a lot of the high-level concepts out of the way, let's do some coding!

First, install [Node](https://nodejs.org) (the LTS version should be fine). I explain what Node is [in the appendix](#nodejs).

Next, open up your terminal application (Powershell on Windows, Terminal on OSX; if you're using Linux, you should know already); we're going to install our dependencies for our project.

```sh
$ npx create-react-app qwer-hacks
$ cd qwer-hacks
$ npm start
```

What did we just do?

* `npx create-react-app` is a command that creates a template application from [create-react-app](https://github.com/facebook/create-react-app), which is a project boilerplate commonly used for React apps ([*](#create-react-app)). It creates a folder (in this case, `qwer-hacks`), and installs a bunch of stuff in it!
* `cd` is the terminal command that changes the folder you're in; here, we're entering the `qwer-hacks` folder that we just made.
* `npm start` tells Node to "start" our project. More info [in the appendix](#nodejs).

After running `npm start`, you should get a message like this:

```sh
$ npm start
Compiled successfully!

You can now view qwer-hacks in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://10.0.9.62:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.
```

Usually, it'll open your browser to your app; if it doesn't, visit whatever address follows "Local" in your browser (it's usually [http://localhost:3000/](http://localhost:3000/)).

You should get a screen like this:

![splash page from create react app](images/cra-splash.png)

One convenient thing is that `create-react-app` automatically refreshes your page every time you make a change to your app's code; it just makes life *that* much easier.

## Understanding the Template

### Understanding the Template: App Structure

Now, let's jump into React. The splash tells us to edit `src/App.js`, so let's do that!

Open up `src/App.js`:

![original src/App.js](images/original-app-js.png)

And change it to this:

![makes App.js class-based](images/class-app-js.png)

Here's the code, if you prefer to copy-paste it (you don't have to copy the comments, which are `//`):

```jsx
// App.js
import React from 'react';
import logo from './logo.svg';
import './App.css';
class App extends React.Component { // I changed this!
  render = () => { // I changed this!
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  } // I changed this!
}

export default App;
```

What did we just do? Well, we didn't actually change any content of the web-app (you can double-check yourself if you want)! Instead, we just reformatted (or refactored) the code to make it a bit more understandable.

But that's not helpful if we don't know what's going on! Let's break down what's happening in this file.

### Understanding the Template: Imports

```jsx
// App.js
import React from 'react';
import logo from './logo.svg';
import './App.css';
```

Here, we're importing some files and libraries from elsewhere in the app. If you've programmed in other languages, you've seen keywords like these (like `#include` in C or C++, `import` in Java or Python).

In this case, each of these three import statements is doing something slightly different:

1. `import React from 'react';` imports the React javascript library (which was stealthily installed by `npx create-react-app`). We give it a namespace of `React`, which is similar to concepts like `std::` in C++, `System.` in Java, or `math.` in Python.
2. `import logo from './logo.svg';` imports the file `logo.svg` and gives it the name `logo`. We can now use it as a variable!
3. `import './App.css';` imports the entire CSS file of `App.css`! But, you'll notice that we don't reference this in the code; this import has more to do with Webpack ([*](#webpack)). Don't worry about this for now!

Imports are a relatively new feature of Javascript, and they can be quite confusing ([*](#es6-imports)). I explain more about some of Javascript's quirks [in the appendix](#js).

### Understanding the Template: Classes

```jsx
// App.js
class App extends React.Component {
  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
```

Wow, there's a lot of code here! The first line,

```jsx
// App.js
class App extends React.Component {
    ...
}
```

is declaring a class called `App`; it extends (or inherits, implements, etc.) the class `React.Component`. This class will contain, you guessed it, our entire app. And, it extends `React.Component` because our entire app will be a React component!

### Understanding the Template: Render Function

```jsx
// App.js
render = () => {
    return (
      <div className="App">
        ...
      </div>
    );
}
```

All React components must have one function called a **render function** ([*](#react-render-function)). The render function must return a `JSX` element, which is what will be rendered in the app.

I'll explain JSX in just a moment, but I also want to point out what looks like weird syntax.

When people learn Javascript, they usually first learn this way to define them:

```js
function hi (message){
    console.log(message);
    return true;
}
```

This is totally valid! However, I chose to use what's called an **arrow function** ([*](#arrow-functions)).

```js
const hi = (message) => {
    console.log(message);
    return true;
}
```

This is an alternative way to write functions that has slight nuances (in our case, the relevant difference is with how `this` works). I hate being hand-wavy about how this works, but we won't have too much time to delve into this. Check out the footnote ([*](#arrow-functions)) for more.

Two quick tidbits:

In classes, the `const` can be ommitted; there's no performance difference:

```js
class Greeter {
    hi = (message) => {
        console.log(message);
        return true;
    }
}
```

If there's only one parameter, you can omit the parens. If there are no parameters, you need to have the empty parens.

```js
const hi = message => {
    console.log(message);
    return true;
}

const hello = () => {
    console.log("hello");
    return true;
}
```

### Understanding the Template: JSX

Anyways, back to this:

```jsx
// App.js
render = () => {
    return ( // must return a JSX element!
      <div className="App">
        ...
      </div>
    );
}
```

Back up a minute. What's JSX? **JSX** ([*](#jsx)) is a combination of HTML and Javascript that gives you the formatting of HTML, but allows you to use Javascript to generate content. All valid HTML is valid JSX: you see `<p>`, `<a>`, and `<div>` tags!

For example, note this line:

```jsx
// App.js
<img src={logo} className="App-logo" alt="logo" />
```

The `{logo}` tells React to use the variable `logo`, which if you remember, is the image we imported at the top of the file! You can't do stuff like this in HTML, which makes JSX very powerful! The general idea is that anything in braces (`{}`) is processed as Javascript, rather than raw HTML.

A few tidbits:

If you're familiar with HTML and CSS, you'll know that you can use the `class="..."` attribute to add CSS classes to HTML elements. But, `class` is a keyword in Javascript (we just used it earlier!), so you have to use `className="..."` instead - the effect is the same.

Unfortunately, I don't have the time (or space) to go more in-depth in JSX, but the footnote ([*](#jsx)) has more info (and if you don't know what HTML ([*](#html)) is, check out the footnote too)! React's official documentation also has a [great page](https://reactjs.org/docs/introducing-jsx.html) that explains more.

There's an additional rule about what the render function can return; the function must return one, **and only one**, JSX element.

```jsx
// this is ok!
return (
    <div>
        ...
    </div>
);
// as is this!
return (
    <div>
        <p>
            ...
        </p>
    </div>
);
// but this isn't!
return (
    <div>
        ...
    </div>
    <div>
        ...
    </div>
);
```

One final tidbit: all we really did was change `App` from being a function to a class with a function. I'll have to be a bit hand-wavy about this now, but it turns out classes and functions are pretty similar ([*](#javascript-classes)).

### Understanding the Template: Export

```jsx
// App.js
export default App;
```

We won't really touch this line too often, but this has to do with the `import` we talked about earlier! It turns out, another file imports our `App.js` file. Like in other languages, we need to tell other programs what they can import; in this case, we'll say that the class `App` is exported. The `default` means the export isn't named by default ([*](#es6-import)).

## Basic App Layout

### Basic App Layout: Quick Header

Okay, now let's make some stuff change on the screen! We'll edit our `render()` function a bit.

First, let's do some cleanup:

```jsx
// App.js
import React from 'react';
import './App.css';
class App extends React.Component {
  render = () => {
    return (
      <div>
        <header>the hive</header>
        <p>find out what's all the buzz!</p>
      </div>
    );
  }
}

export default App;
```

Ah! That looks horrible!

![barebones JSX, no styling!](images/barebones-jsx.png)

Let's fix some of this up.

First, we'll add some CSS classes. Remember, in JSX, you need to use `className` instead of `class`.

```jsx
// App.js
import React from 'react';
import './App.css';
class App extends React.Component {
  render = () => {
    return (
      <div className="app-container">
        <header className="header-text">the hive</header>
        <p>find out what's all the buzz!</p>
      </div>
    );
  }
}

export default App;
```

Now, we can head into `src/App.css`, and change some of the styling rules for our code. I'll comment the code with `/* */`; if you don't follow everything that's happening, I'd definitely recommend the [CSS Appendix](#css).

```css
/* App.css */
.app-container { /* selecting all elements with class "app-container" */
  background-color: #282c34; /* makes background a shade of grey */
  font-size: 16px; /* sets font size to 16 pixels */
  color: white; /* sets text color to white */
  padding: 1em; /* adds 1 font-size (i.e. 16px) of space inside the element */
  min-height: calc(100vh - 2em); /* a little complicated! refer to appendix */
}
.header-text{ /* selecting all elements with class header-text */
  font-size: 2em; /* font size is double of parent */
  font-weight: bold; /* make the text bold! */
}
```

![barebones JSX with a bit of styling, no styling!](images/barebones-with-styling.png)

### Basic App Layout: Adding Inputs

Cool! But right now, this doesn't have any chatting capability! Let's add a place for the user to input text.

```jsx
// App.js
render = () => {
    return (
      <div className="app-container">
        <header className="header-text">the hive</header>
        <p>find out what's all the buzz!</p>
        <hr />
        <div className="message-box">
            <input 
                className="text-input"
                type="text"
                placeholder="your name..."
            />
            <input 
                className="text-input"
                type="text"
                placeholder="your message..."
            />
        </div>
      </div>
    );
}
```

The `<input>` tag is one of the default HTML tags that's designed to handle user input.

![adding inputs to our barebones page](images/barebones-unstyled-inputs.png)

Agh, those inputs look terrible! Let's give them a bit of styling. Remember, we've already added the class `text-input`!

```css
/* App.css */
.text-input{
  margin-right: 1em; /* adds 1 font-size of space to the right of the element*/
  padding: 0.5em; /* adds half a font-size of space inside the element */
  border: 4px solid white; /* adds a solid white border of 4px around the element*/
  border-radius: 4px; /* curves the border's edges by 4px */
  font-size: 1em; /* makes the font size the same as the parent */
}
```

Not awful!

![styling our added inputs](images/barebones-styled-inputs.png)

### Basic App Layout: Adding a Button

We'll probably also want to add a send button.

```jsx
// App.js
render = () => {
    return (
      <div className="app-container">
        ...
        <div className="message-box">
            <input 
                className="text-input"
                type="text"
                placeholder="your name..."
            />
            <input 
                className="text-input"
                type="text"
                placeholder="your message..."
            />
            <button className="send-button">
                Send Message
            </button>
        </div>
      </div>
    );
}
```

![adding a button to the inputs](images/barebones-unstyled-button.png)

And again, let's style it. Common pattern, huh?

```css
/* App.css */
.send-button {
  padding: 0.5em;
  background-color: #AED643;
  border: 4px solid #AED643;
  border-radius: 4px;
  color: black;
  font-size: 1em;
}
```

![styling the button](images/barebones-styled-button.png)

Cool cool cool! I think we're now ready to design our messages, and really get into React!

## React Fundamentals

### A Brief Interlude on Components

One of the biggest concepts in software engineering is DRY, or don't repeat yourself - there are lots of good reasons why ([*](#dry)). If code or functionality would be duplicated many times, we'll abstract it away: with classes, functions, or in our case, components.

Our chatroom application will have tons and tons of messages, all with similar characteristics (the message, the user who sent it, maybe a timestamp or a profile avatar).

We *could* construct each message individually from our data, but that'd be tedious and annoying. Instead, React gives us tools to create custom components, where we can pass in the data and a template for our data; React will handle the rest of the work!

That sounds like a lot of work, but you'll have to trust me on why this is useful. Think about websites like Twitter, Facebook, or Instagram - they have tons of reused components like tweet cards, facebook posts, or photo comments.

![example of a facebook post, taken from ACM Hack](images/fbpost.png)

*image shamelessly taken from ACM Hack*

If you want more convincing, you can look at [the appendix](#more-react).

### React Fundamentals: Creating a Component

So, let's make a custom message component!

In order to do this, we're going to create a folder `src/components`, and create two files: `src/components/Message.js` and `src/components/Message.css`.

First, let's make a class called `Message` with its own render function. For now, we'll hard-code some data - we'll make it modular in a bit.

```jsx
// src/components/Message.js
import React from 'react';
import './Message.css';

class Message extends React.Component {
    render(){
        let image = "https://api.adorable.io/avatars/64/matt.png";
        return (
            <div className="message">
                <div className="message-item">
                    <img className="message-img" src={image} alt="profile pic" />
                </div>
                <div className="message-item">
                    <p><b>@matt</b> <span>01/25/20</span></p>
                    <p>excited to learn web development at QWER hacks!</p>
                </div>
            </div>
        );
    }
}

export default Message;
```

*A quick note:* the URL I put in `image` is a website that randomly generates cartoon faces, called [Adorable Avatars](http://avatars.adorable.io/). It's just useful for creating profile images, but not needed.

Let's import this component, and add it to our `App`.

```jsx
// App.js
import React from 'react';
import './App.css';
import Message from './components/Message'; // added this!

class App extends React.Component {
    render = () => {
        return (
            <div className="app-container">
                ...
                <div className="message-box">
                    ...
                </div>
                <Message /> { /* added this! */ }
            </div>
        );
    }
}

...
```

![adding the message component to our app](images/sample-message-unstyled.png)

Eh, could look better. Let's add some CSS.

```css
/* src/components/Message.css */
.message {
    padding: 0.5em;
    border: 1px solid white;
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin-top: 0.5em;
}
.message-item{
    margin-left: 1em;
    margin-right: 1em;
}
```

![styling messages!](images/sample-message-styled.png)

Cool! Now it kind of looks like a tweet.

But, that wasn't that helpful! We hard-coded the contents of the message into the component. Instead, let's see if we can pass in some data, and have the component manage it.

To understand how this works, we need to talk about `this` and `props`.

### An Interlude: More on Classes, and `this`

`this` is a common topic of confusion in Javascript ([*](#this)) (and object-oriented programming in general). To understand it, we'll have to take a quick detour on classes.

Like in many other programming languages, classes have a `constructor` - a special function that gets called when a class is made. You can pass in parameters and access them.

```js
class Person {
    constructor (name){
        console.log(name);
    }
}
let m = Person("matt"); // prints "matt"
```

Every time you create a new copy of a class, we'll call this copy a different **instance**.

```js
let i = Person("isabel"); // one instance
let a = Person("arjun"); // different instance!
```

For now, we'll just say that `this` refers to the **instance of the current calling class**. In other words, if we use `this` in a class, it'll refer to the functions and variables of that specific version of the class.

To access specific properties of a class, you'll use dot notation (i.e. `this.something`).

```js
class Person {
    constructor (name){
        this.name = name;
    }
    identify = () => {
        console.log(this.name);
    }
}

let s = Person("sharvani");
s.identify(); // logs "sharvani"
let j = Person("julia");
j.identify(); // logs "julia"
```

As a side note, this is why we needed to use arrow functions ([*](#arrow-functions)).

### React Fundamentals: this and props

...

## Appendix

### HTML

### CSS

### JS

#### this

#### Arrow Functions

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

#### Javascript Classes

#### ES6 Import

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

#### Webpack

### NodeJS

### More React

#### JSX

https://reactjs.org/docs/introducing-jsx.html

stuff on jsx

#### React Render Function

#### Create React App

https://github.com/facebook/create-react-app

### More Firebase

### Server Languages

### Databases

### MV Frameworks

## Extra Footnotes

Here are the things I've footnoted that don't fall under an appendix category.

### Browser Languages

Mention plugins (like Flash, Silverlight), web assembly, etc.

### SPA

### DRY