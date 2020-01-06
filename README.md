# 🌈 Intro to Web Development (with React & Firebase) Workshop (at QWER Hacks 2020)

Hey there! This repo contains the finished product of QWER Hacks 2020's Intro to Web Development (with React & Firebase) workshop, and a written guide that summarizes and expands upon the content of the workshop. For reference, our goal is to develop a chatroom application; you can view a deployed version of the finished product [here](https://qwer-hacks-2020.herokuapp.com/) (it's a Heroku instance, so it might take a bit of time to boot up).

It assumes basic understanding of programming fundamentals (e.g. functions, conditionals, variables) and a bit of experience with object-oriented programming, but doesn't explicitly assume previous HTML, CSS, JS, React, or Firebase experience. However, if you don't have experience with HTML/CSS/JS, I 100% recommend that you look at some of the [appendix resources](#appendix) first, since this document/workshop brushes over the details.

You can find the slides for the workshop [here](https://docs.google.com/presentation/d/1qwiixhs7Y1T6ZBk9C_vluvLPCe3vOzkQXeTcIYtpPPw/), though this document covers (almost) everything in the slides and more!

Since this is a hackathon workshop, it goes for breadth over depth and emphasizes working familiarity rather than core understanding. Unfortunately, that means that we gloss over a few important web development concepts; however, I've included some pointers in the Appendix on learning more. In this document, I'll occasionally footnote interesting tidbits that you can learn more about!

(this workshop was developed and presented by [matthew wang](https://matthewwang.me). if you have any questions, feel free to [ask!](mailto:matt@matthewwang.me))

## Table of Contents

* [Brief Overview](#brief-overview)
* [The Client-Server Model](#the-client-server-model)
* [Our Tech Stack](#our-tech-stack)
    * [React](#react)
    * [Firebase](#firebase)
* [Project Setup](#project-setup)
* [Understanding the Template](#understanding-the-template)
    * [App Structure](#understanding-the-template-app-structure)
    * [Imports](#understanding-the-template-imports)
    * [Classes](#understanding-the-template-classes)
    * [Render Function](#understanding-the-template-render-function)
    * [JSX](#understanding-the-template-jsx)
    * [Export](#understanding-the-template-export)
* [Basic App Layout](#basic-app-layout)
    * [Quick Header](#basic-app-layout-quick-header)
    * [Adding Inputs](#basic-app-layout-adding-inputs)
    * [Adding a Button](#basic-app-layout-adding-a-button)
* [React Fundamentals](#react-fundamentals)
    * [Why Components](#why-components)
    * [Creating a Component](#react-fundamentals-creating-a-component)
    * [An Interlude: More on Classes, and this](#an-interlude-more-on-classes-and-this)
    * [this and props](#react-fundamentals-this-and-props)
    * [state (conceptual)](#react-fundamentals-state-conceptual)
    * [this.setState (conceptual)](#react-fundamentals-thissetstate-conceptual)
    * [State and Component Generation](#react-fundamentals-state-and-component-generation)
    * [State, Binding, and Event Handlers](#react-fundamentals-state-binding-and-event-handlers)
* [Integrating Cloud Firestore](#integrating-cloud-firestore)
    * [Creating a Firebase Project](#creating-a-firebase-project)
    * [Registering a Firebase Web App](#registering-a-firebase-web-app)
    * [Setting Up Cloud Firestore](#setting-up-cloud-firestore)
    * [Firestore Database Structure](#firestore-database-structure)
    * [Programming Interlude: Async and Listeners](#programming-interlude-async-and-listeners)
    * [React Interlude: Component Lifecycles](#react-interlude-component-lifecycles)
    * [Adding a Firestore Ref Listener](#adding-a-firestore-ref-listener)
    * [Pushing to Firestore](#pushing-to-firestore)
* [Quick Deploy: Heroku &amp; CRA](#quick-deploy-heroku--cra)
* [Ending Notes](#ending-notes)
    * [Topic Review](#topic-review)
    * [Further Work/Learning](#further-worklearning)
    * [Some Caveats](#some-caveats)
* [Appendix](#appendix)
    * [HTML](#html)
    * [CSS](#css)
    * [JS](#js)
        * [this](#this)
        * [Arrow Functions](#arrow-functions)
        * [Javascript Classes](#javascript-classes)
        * [ES6 Import](#es6-import)
        * [Webpack](#webpack)
        * [JS Date](#js-date)
        * [JS Promises](#js-promises)
        * [JS Try Catch](#js-try-catch)
    * [NodeJS](#nodejs)
    * [More React](#more-react)
        * [JSX](#jsx)
        * [React Render Function](#react-render-function)
        * [super (props)](#super-props)
        * [more on state](#more-on-state)
        * [nested state](#nested-state)
        * [event handlers](#event-handlers)
        * [hooks](#hooks)
        * [component lifecycles](#component-lifecycles)
        * [Create React App](#create-react-app)
    * [More Firebase](#more-firebase)
        * [Firebase Security Rules](#firebase-security-rules)
        * [Collections and Iterating](#collections-and-iterating)
    * [Server Languages](#server-languages)
    * [Databases](#databases)
        * [SQL vs noSQL](#sql-vs-nosql)
        * [CRUD](#crud)
    * [MV Frameworks](#mv-frameworks)
    * [Deployment Options](#deployment-options)
* [Extra Footnotes](#extra-footnotes)
    * [Browser Languages](#browser-languages)
    * [SPA](#spa)
    * [DRY](#dry)
    * [async](#async)
    * [events](#events)
* [Other Web Development Things](#other-web-development-things)
* [Copyright](#copyright)


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

For web applications in particular, the client is the user's web browser (like Chrome, Firefox, or Safari). Browsers themselves run code that some developer (like you!) has written, usually in HTML, CSS, and Javascript ([*](#browser-languages)). Very briefly: HTML defines the structure of our website, CSS defines how it looks, and JS adds any functionality. As we write some code, I'll expand a bit more on what these are; I've also included appendix entries for [HTML](#html), [CSS](#css), and [JS](#js).

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
$ npm install firebase --save
$ npm start
```

What did we just do?

* `npx create-react-app` is a command that creates a template application from [create-react-app](https://github.com/facebook/create-react-app), which is a project boilerplate commonly used for React apps ([*](#create-react-app)). It creates a folder (in this case, `qwer-hacks`), and installs a bunch of stuff in it!
* `cd` is the terminal command that changes the folder you're in; here, we're entering the `qwer-hacks` folder that we just made.
* `npm install firebase --save` installs the node library for firebase, which we'll use later on to interact with Cloud Firestore
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

Open up `src/App.js`, and change it to this (you don't have to copy the comments, which are `//`):

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

Here's another quick example:

```jsx
... TODO MATT PLEASE DO
```

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

### Why Components

One of the biggest concepts in software engineering is DRY, or don't repeat yourself - there are lots of good reasons why ([*](#dry)). If code or functionality would be duplicated many times, we'll abstract it away: with classes, functions, or in our case, components.

Our chatroom application will have tons and tons of messages, all with similar characteristics (the message, the user who sent it, maybe a timestamp or a profile avatar).

We *could* construct each message individually from our data, but that'd be tedious and annoying. Instead, React gives us tools to create custom components, where we can pass in the data and a template for our data; React will handle the rest of the work!

That sounds like a lot of work, but you'll have to trust me on why this is useful. Think about websites like Twitter, Facebook, or Instagram - they have tons of reused components like tweet cards, facebook posts, or photo comments.

![example of a facebook post, taken from ACM Hack](images/fbpost.png)

(*image shamelessly taken from ACM Hack*)

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

To understand how this works, we need to talk about `this` and `props`. Before I get into the specifics, let me just explain what our goal is.

We want:

```jsx
<Message message="hello world" author ="matt" ... />
<Message message="welcome to qwer hacks!" author ="isabel" ... />
```

to output something like:

```jsx
<Message>
    <span>matt</span> says <span>hello world</span>
</Message>
<Message>
    <span>isabel</span> says <span>welcome to qwer hacks!</span>
</Message>
```

But first, we need to learn about `this`.

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

Why did we have to talk about `this`? Well, you might remember that the component we created is a class - so we'll use `this` to refer to any component's properties.

In particular, React has made it easy for you to access a component's properties through an object called `this.props`, which contains all of the values passed in to the component.

It's easiest to demonstrate this with an example:

```jsx
class UserCard extends React.Component{
    render(){
        return (
            <div>
                <h1>{this.props.username}</h1>
                <p>
                    {this.props.bio}
                </p>
            </div>
        );
    }
}

<UserCard
    username="jared"
    bio="my name is jared, i'm 19, and i don't know how to read"
/>

// generates:

<div>
    <h1>jared</h1>
    <p>
        my name is jared, i'm 19, and i don't know how to read
    </p>
</div>
```

As you can see in an example, you can access information passed in to the component with `this.props`, and treat it like you would any other Javascript variable.

One quick note. If you want to do something in the constructor, you need to add in `props` as an argument, and call the function `super(props)`. Why, you might ask? It has to do with OOP ([*](#super-props)).

```jsx
class UserCard extends React.Component{
    constructor(props){
        super(props);
        ...
    }
}
```

With that in mind, let's apply that to our custom `Message` component!

For now, I'm going to say we need three props:

* `author`, a `string` containing who wrote the message
* `message`, a `string` containing the message's text
* `timestamp`, which for now will be a `string` containing the message's timestamp (but we'll change that later)

```jsx
// Message.js
class Message extends React.Component {
    render(){
        let image = "https://api.adorable.io/avatars/64/" + this.props.author + ".png"; // randomly generates a consistent image for the username
        return (
            <div className="message">
                <div className="message-item">
                    <img className="message-img" src={image} alt="profile pic" />
                </div>
                <div className="message-item">
                    <p><b>{this.props.author}</b> <span>{this.props.timestamp}</span></p>
                    <p>{this.props.message}</p>
                </div>
            </div>
        );
    }
}
```

Ah, but if we run this code as is, it won't work as intended - we haven't given any values to the props (they'll all be `undefined`). Let's update our main App too!

```jsx
// App.js
class App extends React.Component {
    render = () => {
        return (
            <div className="app-container">
                ...
                <div className="message-box">
                    ...
                </div>
                <Message
                    author="arjun"
                    message="i love machine learning!"
                    timestamp="01/25/20"
                />
            </div>
        );
    }
}
```

![message component with props](images/message-component-props.png)

It might not seem like it, but this now gives us very powerful tools to build a complex web app. But in order to do that, we'll need to introduce one more concept: **component state**.

### React Fundamentals: state (conceptual)

`props` lets us easily generate data that comes from outside of our component, but what about data in our component? That's what `state` is for. You can think of state as, well, the state of your app - a record of all important internal information your app (or system) needs to function.

`this.state`, like `this.props`, is an object that stores data that our components can then access. The difference is in how state is changed.

The first way you modify the app's state is in the constructor. This makes sense - you're creating an initial state to base your app off of.

Let's take a look at the most commonly-used teaching example, a counter that increments each time a button is pressed. It's initial state should be `0`, so let's set it to that.

```jsx
class Counter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            'count': 0
        }
    }
    ...
}
```

This is **the only time you should ever use `this.state = {...}`**. I'll explain why in a bit.

But anyways, let's flesh out the rest of our counter.

We'll render a button and the current count - note we can treat `this.state.count` in the same way that we've been doing props.

```jsx
class Counter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            'count': 0
        }
    }
    render(){
        <div>
            current count: {this.state.count}
            <button>click me!</button>
        </div>
    }
}
```

This is where the magic happens:

```jsx
class Counter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
    }
    incrementCounter = () => {
        this.setState({
            count: this.state.count + 1
        });
    }
    render(){
        return (
            <div>
                current count: {this.state.count}
                <button
                    onClick={this.incrementCounter}
                    >
                    click me!
                </button>
            </div>
        );
    }
}
```

Let's break down what's going on here!

### React Fundamentals: this.setState (conceptual)

First, let's take a look at `incrementCounter()`:

```js
incrementCounter = () => {
    this.setState({
        count: this.state.count + 1
    });
}
```

This is a typical arrow function, which is properly binded to our class. It just does one thing: it calls `this.setState()`.

`this.setState()` is a special function in React. Its default definition takes in one object, which in turn contains key-value pairs for states we want to update. Here, we want to update `count`, by incremeneting it by 1 from its previous value.

When `this.setState()` is called, it selectively updates the entire app. **Only components that rely on states that were updated are re-rendered.** This can result in huge performance benefits, but also means that you have to think about how to efficiently design your app!

Then, we have:

```jsx
<button
    onClick={this.incrementCounter}
>
    click me!
</button>
```

`onClick` is a certain type of event handler - when the element is clicked, it'll call a certain function; in this case, the one we wrote!

A few other quick notes on state (though it's a huge topic [*](#more-on-state)):

* **do not ever use `this.state = { }` outside the constructor**
* `this.setState()` is actually an asynchronous function!
* ideally, states should not be nested - for managing complex states, updating nested variables can be problematic ([*](#nested-state))
* **do not ever use `this.state = { }` outside the constructor**

Component state is probably the most important core concept behind React, and understanding how to use it properly means that you're on your way to becoming a React wizard!

### React Fundamentals: State and Component Generation

Okay, enough with random counter examples. Let's actually implement what we want in our messages.

First, let's see if we can generate our messages from the app's state (we'll add messages in a moment).

```jsx
// App.js
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [] // our default state is empty!
        };
    }
    renderMessages = () => {
        // check if there are no messages
        // if there are no messages, let the user know!
        if (this.state.messages.length === 0){
            return (<div className="messages-container"> nothing here! why not say something? </div>);
        }
        // there are some messages!
        let messages = [];
        // this is a common way to loop through an array
        // look up Array.forEach for more info!
        this.state.messages.forEach((element, i) => {
            messages.push(
            <Message
                key={i} // needed for procedurally generated components
                author={element.author}
                message={element.message}
                timestamp={element.timestamp}
            />
            );
        });
        return (
            <div className="messages-container">
                {messages}
            </div>
        );
    }
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
                    <button className="send-button">
                        Send Message
                    </button>
                </div>
                {this.renderMessages()}
            </div>
        );
    }
}
```

and some CSS...

```css
/* App.css */
.messages-container{
  margin-top: 1em;
}
```

For readability's sake, I've abstracted the rendering of messages to a function called `this.renderMessages()` - a common pattern in React. If we had more time, we might've made a few more components.

Let's step through the changes we've made:

```js
// App.js
constructor(props){
    super(props);
    this.state = {
        messages: [] // our default state is empty!
    };
}
```

This is pretty simple, we're just creating one state variable (an array called `messages`), and setting it to be an empty array. Implicitly, each object in the array will represent one message - as we mentioned earlier, that means it must have an `author`, a `message`, and a `timestamp`.

```js
renderMessages = () => {
    // check if there are no messages
    // if there are no messages, let the user know!
    if (this.state.messages.length === 0){
        return (<div className="messages-container"> nothing here! why not say something? </div>);
    }
    // there are some messages!
    let messages = [];
    // this is a common way to loop through an array
    this.state.messages.forEach((element, i) => {
        messages.push(
        <Message
            key={i} // needed for procedurally generated components
            author={element.author}
            message={element.message}
            timestamp={element.timestamp}
        />
        );
    });
    return (
        <div className="messages-container">
            {messages}
        </div>
    );
}
```

A meaty function, but don't be scared! The comments explain some of the nuances, but our general idea is to loop through the `messages` state array, and create a new `<Message>` from the values of each item in the array! Then, we return the entire thing - which renders it in our `render()` function.

```jsx
render = () => {
    return (
        <div className="app-container">
            ...
            {this.renderMessages()}
        </div>
    );
}
```

This just calls the `renderMessages()` function. We use `this` because it belongs to our class, and since it's Javascript (but returns JSX elements), we'll wrap it in `{}`.

Your final result should look something like this:

![the generated messages, but without any :(](images/generating-messages-messageless.png)

But there isn't anything there! We'll allow users to input data in a moment, but for now let's just add some fake data.

```js
// App.js
constructor(props){
    super(props);
    this.state = {
        messages: [
            {
                author: "smallberg",
                message: "do your CS31 homework!",
                timestamp: "yesterday"
            },
            {
                author: "matt",
                message: "do people even read this?",
                timestamp: "always"
            }
        ]
    };
}
```

You should get something like this:

![now featuring manually generated messages!](images/generating-messages-manually.png)

It's always good practice to test out components individually: we could've jumped straight ahead to implementing the chatbox, but then if we had an error we wouldn't know what caused it!!!

Okay, we're almost done with React. Onto our last part.

### React Fundamentals: State, Binding, and Event Handlers

State can tie data to elements on the screen (like the messages that we just generated), but it can also tie elements on the screen to data we can manipulate!

In our case, we want to listen in on the text inputs and the button submissions, so we can then create new messages!

React gives us a handy way to do that with event listeners. Before I explain further, here's what it looks like in code:

```jsx
// App.js
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            author: "Anonymous",
            message: ""
        };
    }
    handleNameChange = e => {
        this.setState({ author: e.target.value });
    }

    handleMessageChange = e => {
        this.setState({ message: e.target.value });
    }
    ...
    render = () => {
        return (
            <div className="app-container">
                ...
                <div className="message-box">
                    <input
                        className="text-input"
                        type="text"
                        value={this.state.author}
                        onChange={this.handleAuthorChange}
                    />
                    <input
                        className="text-input"
                        type="text"
                        value={this.state.message}
                        onChange={this.handleMessageChange}
                    />
                    <button className="send-button">
                        Send Message
                    </button>
                </div>
                {this.renderMessages()}
            </div>
        );
    }
}
```

This is what's often called a "single source of truth" design pattern. In this case, our single source of truth is our state. The `value` of each input (i.e. what's in the text box) is whatever's in our state.

And, when the input changes (through an event handler called `onChange`), it'll call some function (which we've specified) - that function then ends up changing the state, which changes the `value`. Unfortunately I'm slightly glossing over what `e` is, but the footnotes have more information ([*](#react-event-handlers)).

There's a lot more to learn about event handlers, and they can be deceptively simple ([*](#react-event-handlers)).

We are **so close** to being done. Now that we have the text inputs in our state, we can create new messages purely off of the state.

To do that, let's create one more function, and call it when the button is clicked.

```jsx
// App.js
createMessage = () => {
    let newMessage = {
        author: this.state.author,
        message: this.state.message,
        timestamp: new Date().getTime() // I'll deal with this in a moment, don't you worry!
    };
    let newMessages = this.state.messages;
    newMessages.push(newMessage);
    this.setState({
        messages: newMessages
    });
}
```

This is pretty simple: we're creating a new message object from our existing state variables. Then, we added it to the end of the messages array (albeit in a rather inefficient way; I did this mostly for clarity).

Finally, we just gotta make our button call this function.

```jsx
// App.js
render = () => {
    ...
    <button
        className="send-button"
        onClick={this.createMessage}
    >
        Send Message
    </button>
    ...
}
```

Pretty simple, just like our button counter example.

Okay, and I promised I'd get to `timestamp: new Date().getTime()`. This one isn't exciting, it just has to do with getting the date in what's called a Unix timestamp, which is how many milliseconds has passed since Jan 1, 1970 GMT. You can imagine that it's easier to do it this way than to deal with timezones, and it makes some math easier.

Add this to your `App.js`; I won't explain too much of it, but it just has to do with date manipulation - nothing spicy. Footnotes ([*](#js-date)) has more info!

```jsx
// App.js
import React from 'react';
import './App.css';
import Message from './components/Message';

const getTimeString = timestamp => {
    let date = new Date(timestamp);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    // 0 padding!
    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    let str = hour + ":" + min + ":" + sec + " on " + month + "/" + day + "/" + date.getFullYear();
    return str;
}

class App extends React.Component {
    ...
    renderMessages = () => {
      ...
      this.state.messages.forEach((element, i) => {
          messages.push(
          <Message
              key={i}
              author={element.author}
              message={element.message}
              timestamp={getTimeString(element.timestamp)} // changed this!
          />
          );
      });
      ...
  }
}
...
```

I've included a bit on the Javascript Date function in the footnotes ([*](#js-date)); but this is basically just copy-pasta.

Okay, and voila! Everything should work!

![the working self-contained app!!!](images/messages-done.png)

You should pat yourself on the back - you've just covered some of the most important fundamentals of React, and in a very rushed manner! There's a lot more cool stuff to learn and do, but for now we'll take a quick breather and then move on to Firebase (and talk a slight bit more about React too).

If you want a quick checkpoint, your JS code should look something like this:

```jsx
// App.js
import React from 'react';
import './App.css';
import Message from './components/Message';

const getTimeString = timestamp => {
    let date = new Date(timestamp);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    // 0 padding!
    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    let str = hour + ":" + min + ":" + sec + " on " + month + "/" + day + "/" + date.getFullYear();
    return str;
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        messages: [],
        author: "Anonymous",
        message: "your message..."
    };
  }
  handleAuthorChange = e => {
    this.setState({ author: e.target.value });
  }

  handleMessageChange = e => {
    this.setState({ message: e.target.value });
  }
  createMessage = () => {
    let newMessage = {
      author: this.state.author,
      message: this.state.message,
      timestamp: getCurrentTimeString()
    };
    let newMessages = this.state.messages;
    newMessages.push(newMessage);
    this.setState({
      messages: newMessages
    });
  }
  renderMessages = () => {
      if (this.state.messages.length === 0){
          return (<div className="messages-container"> nothing's here! why not say something? </div>);
      }
      let messages = [];
      this.state.messages.forEach((element, i) => {
          messages.push(
          <Message
              key={i}
              author={element.author}
              message={element.message}
              timestamp={getTimeString(element.timestamp)}
          />
          );
      });
      return (
          <div className="messages-container">
              {messages}
          </div>
      );
  }
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
                      value={this.state.author} 
                      onChange={this.handleAuthorChange}
                  />
                  <input 
                      className="text-input"
                      type="text"
                      value={this.state.message} 
                      onChange={this.handleMessageChange}
                  />
                  <button 
                    className="send-button" 
                    onClick={this.createMessage}
                  >
                      Send Message
                  </button>
              </div>
              {this.renderMessages()}
          </div>
      );
  }
}

export default App;
```

```jsx
// Message.js
import React from 'react';
import './Message.css';

class Message extends React.Component {
    render(){
        let image = "https://api.adorable.io/avatars/64/" + this.props.author + ".png";
        return (
            <div className="message">
                <div className="message-item">
                    <img className="message-img" src={image} alt="profile pic" />
                </div>
                <div className="message-item">
                    <p>
                        <b>{this.props.author}</b> <span>{this.props.timestamp}</span>
                    </p>
                    <p>{this.props.message}</p>
                </div>
            </div>
        );
    }
}

export default Message;
```

## Integrating Cloud Firestore

Now our application has the most basic frontend features that we need (i.e. being able to create messages); however, it only works on our computer, and if we refresh the page, everything disappears. That doesn't make for a good chatroom!

So, our next step is to somehow store and retrieve all of the messages that exist! To do that, we'll use Firebase's **Cloud Firestore** service, which gets rid of lots of the hassle that normally goes into the backend. 

Let's get started!

### Creating a Firebase Project

This section will walk you through setting up a Firebase Project.

First, head to [firebase.google.com](https://firebase.google.com). After logging in, go to your projects page, and hit add project.

![firebase projects page](images/create-project-1.png)

Name your project whatever you want!

![firebase name project page](images/create-project-2.png)

For the sake of this tutorial, I won't enable Google Analytics (since it requires more setup). However, it's a useful tool if you're looking to explore!

![firebase google analytics page](images/create-project-3.png)

Once you finish that, your project should be all set up! But, we've got to do a bit more configuration: for the Firebase app, and for Firestore.

### Registering a Firebase Web App

Once you make your project, you'll probably be taken to a page like this. Hit the button to add a web application to your project.

![firebase add application page](images/create-app-1.png)

Once you're in the menu, we'll go through a few options, First, register your app with a nickname. It's not insanely important what it will be, but we'll use it in our configuration.

In our case, we're not going to deploy/host with Firebase. However, it's a useful tool!

![firebase register app page](images/create-app-2.png)

Now, we're going to be taken to an "Add Firebase SDK" page. It'll give us some code that's actually a bit useful. Copy that code to your clipboard...

![firebase web app config page](images/create-app-3.png)

... and we'll modify it slightly to put it into our app! Make a new file called `src/lib/firebase.js`, and place this code into it:

![screenshot of code for web app config](images/create-app-4.png)

```js
import firebase from 'firebase';

const config = { // this is the same thing as `firebaseConfig`
    apiKey: "AIzaSyBV6QuxKFGEpS0IRmlcTfYyvA8xw79thjQ",
    authDomain: "qwer-hacks-2020.firebaseapp.com",
    databaseURL: "https://qwer-hacks-2020.firebaseio.com",
    projectId: "qwer-hacks-2020",
    storageBucket: "qwer-hacks-2020.appspot.com",
    messagingSenderId: "968678842798",
    appId: "1:968678842798:web:f15f7c354f55f5e91d683f"
};

firebase.initializeApp(config);

export default firebase;
```

Normally, you won't commit API keys to GitHub repos, but with Firebase things are a bit different - since your app is entirely in the frontend, there is no way to properly obscure the key. Firebase instead ensures secure data through its security rules ([*](#firebase-security-rules)).

We'll get back to using this in a moment. For now, let's finish our Firestore setup!

### Setting Up Cloud Firestore

Head to the Cloud Firestore page in your project, and hit Create database.

![cloud firestore page](images/setup-firestore-1.png)

We can choose to run in test mode - at this point in our app, unauthorized access is unlikely, and things aren't going to spiral out of control. However, security rules are important ([*](#firebase-security-rules))!

![firestore security mode page](images/setup-firestore-2.png)

Next, we'll have to pick a data center location. Since we're in Los Angeles, I think anything `us-west` is probably your best bet.

![firestore location page](images/setup-firestore-3.png)

Cool, now our Firestore has been officially set up!

However, we'll also create a bit of sample data, and give our data some structure.

### Firestore Database Structure

For now, our data use case is pretty simple. We can probably just store all of our messages in one data container (called a **collection** in Firestore), and perform operations there.

However, this is not actually the best way to structure our data in the long term - but I'll talk about that in our [ending notes](#ending-notes).

For now, let's create a collection with the start collection button.

![database page](images/setup-firestore-4.png)

We're going to give it an ID of `messages` (which is how we'll reference it in our code.)

![create collections page](images/setup-firestore-5.png)

Let's also create one piece of sample data - that way, we can know if our code works.

Since each message in our app has three pieces of information (`author`, `message`, `timestamp`), it makes sense to structure our data similarly. In Firestore lingo, each individual data object is called a **document**.

In order to make a sample message, hit create document in our `messages` collection. The actual data doesn't matter, but make sure it has the correct parameters!

![cloud firestore page](images/setup-firestore-6.png)

Cool cool cool! This is all the Firebase setup we'll need!

Our next goal is to connect our Firestore database and our front-end. In particular, we want the database to keep track of all sent messages, and every time a message is sent from a client, it goes to the database.

In a more technical sense, we need two types of data flows to our database: Create (i.e. creating a message), and Read (i.e. reading all messages). This is part of a broader model called CRUD ([*](#crud)).

We'll get into that in a moment, but first, we've got to learn a bit more about React, asynchronous programming, and component lifecycles.

### Programming Interlude: Async and Listeners

Before I go on a ramble about Component Lifecycles, I want to talk about why we might need them.

Often times, we'll want to get a resource (like an image, or a game download, or data from a database). Since this resource doesn't come instantaneously, we'll perform it **asynchronously** - a fancy word for doing other things while we wait to get our information.

Asynchronous programming can definitely be a headache ([*](#async)), and I won't be able to cover everything you need to know about it here. Today though, I'll introduce one asynchronous construct: **event listeners**.

Let's say you're making a chat app. How will you know if any user gets new messages? You could check in with the server every x seconds and check if there are any updates. However, that sounds a bit inefficient, and a bit inelegant.

Instead, we could tell the server to send the client a ping every time there's a new message; that sounds a lot simpler! This design pattern is exactly what an event listener is: our client is **listening** for **events**, which are actions that happen outside the scope of our client.

We actually saw events in action earlier when we were adding event handlers to our input buttons!

If this entire section didn't make too much sense, don't worry too much - it's mostly a background on why we're using component lifecycles - but I encourage you to check out the appendix on [async](#async) and [events](#events).

### React Interlude: Component Lifecycles

There is a bit of information that I left out of our chat app. In particular, how does the server know when the client's using the app, or logged-in, or not connected to the internet? We shouldn't be sending messages to a client that's not listening!

One easy way to solve this is to slightly change our model:

* when the user starts using the app, tell the database to start sending messages
* then, the database sends messages to the client
* when the user exists the client, tell the database to stop sending messages

Cool! But how can we know if the user's using the app? We can use React's **Component Lifecycles**.

Component Lifecycles are special functions that are called when certain things happen to our app. Today, we'll use probably the two most common ones: `componentDidMount()` and `componentWillUnmount()`.

`componentDidMount()` runs **immediately after our component has been added to our web page** (well, "rendered to the DOM"). In other words, it runs when the user first opens our component/app.

`componentWillUnmount()` runs **immediately before our component will be removed from our web page** (well, "removed from the DOM"). In other words, it'll run right before the user closes our component/app.

A quick pseudo-JS example:

```jsx
class MessageApp extends React.Component {
    constructor(props){...}
    componentDidMount = () => {
        startListeningForMessages();
    }
    componentWillUnmount = () => {
        stopListeningForMessages();
    }
    render = () => { ... }
}
```

If this blurb was a bit confusing, check out [the appendix on component lifecycles](#component-lifecycles) for more info.

### Adding a Firestore Ref Listener

Now that we've done all of that, let's put that into action.

First, we'll import the `lib/firebase.js` file we previously made:

```jsx
// App.js
import React from 'react';
import './App.css';
import Message from './components/Message';
import firebase from './lib/firebase.js';
```

Now, we'll have access to the `firebase` object, which we'll use heavily.

First, let's add our `componentDidMount`:

```jsx
// App.js
class App extends React.Component {
    ...
    componentDidMount = () => {
        this.db = firebase.firestore();
        this.unsubscribe = this.db.collection("messages")
        .orderBy("timestamp", "desc").onSnapshot((collection) => {
            let newMessagesList = [];
            collection.forEach(function(doc){
                let message = doc.data();
                let newMessage = {
                    author: message.author,
                    message: message.message,
                    timestamp: message.timestamp
                }
                newMessagesList.push(newMessage);
            });
            this.setState({
                messages: newMessagesList
            });
        });
    }
}
```

Now, it should already render our pre-created message!

![messages view pulling from firestore](images/firestore-componentdidmount.png)

Wow, that was lots of confusing code. Let me quickly break down portions of it:

```js
// App.js
this.db = firebase.firestore();
```

This line creates (and in this specific line, initializes) `this.db` as a reference to our firestore database. More info in the Firebase docs (in the [appendix](#more-firebase)).

```js
// App.js
this.unsubscribe = this.db.collection("messages")
.orderBy("timestamp", "desc").onSnapshot((collection) => {
    ...
}
```

Wow, quite a bit here. We're setting `this.unsubscribe` to the value of some function, which ends up being an unsubscriber function for the listener - any `.onSnapshot` call returns a function to stop the listener. Later, we'll call `this.unsubscribe()` to close the event listener.

Then, we do some stuff to our database: we look at the collection `messages` (which if you remember, we created in our setup) and are ordering it by the `timestamp` key. Traditionally, you want the latest posts to come first; since `timestamp` is a number (that represents the # of milliseconds since Jan 1, 1970), the larger numbers happened later, so we'll order it in descending order.

Now, we have `.onSnapshot()`, which is a function that takes a function as a parameter. It'll call this function every time the snapshot is updated (i.e. the collection's items change), and will pass in a firebase collection object. In our case, we've named the input `collection`, to make our life easier.

```js
// App.js
.orderBy("timestamp", "desc").onSnapshot((collection) => {
    let newMessagesList = [];
    collection.forEach(function(doc){
        let message = doc.data();
        let newMessage = {
            author: message.author,
            message: message.message,
            timestamp: message.timestamp
        }
        newMessagesList.push(newMessage);
    });
    this.setState({
        messages: newMessagesList
    });
}
```

This final bit is pretty self-explanatory: we loop through the collection (treating it like an array), and for each item in the collection (which if you remember, is a message), we pull out the relevant information, and add it to an array. Once we're done, we update our state to the new array - loading in all of our values!

This was a bit hand-wavy (you had to trust me on what the functions did); I encourage you to read the [appendix](#collections-and-iterating).

But, we're not done yet. As we discussed, we need to tell firestore to stop listening (which is called "unsubscribing"). Luckily, Firebase makes this very easy for us:

```jsx
// App.js
class App extends React.Component {
    ...
    componentDidMount = () => {
        ...
    }
    componentWillUnmount = () => {
        this.unsubscribe();
    }
    ...
}
```

And that's it! Our app now renders everything from the Firestore. You can test this by adding more test data from the Firebase console.

### Pushing to Firestore

We're almost almost done! The last thing we want to do is change our `createMessage()` function to also push this new message to firebase.

```jsx
// App.js
class App extends React.Component {
    ...
    createMessage = () => {
        let newMessage = {
            author: this.state.author,
            message: this.state.message,
            timestamp: new Date().getTime()
        };
        let newMessages = this.state.messages;
        newMessages.push(newMessage);
        this.setState({
            messages: newMessages
        });
        // adding this
        this.db.collection("messages").add(newMessage)
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
}
```

![app after message is added](images/firestore-add-message.png)

Let's check our console to verify that this worked:

![firebase console verifying message was added](images/firestore-add-message-console.png)

Nice! Life's pretty good then :)

What's going on? If the above example on the event listener made sense, then hopefully this block of code does too.

```js
this.db.collection("messages").add(newMessage)
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
```

The `.add` function adds some Javascript object to the `messages` collection, which is the behaviour we want. The `.then` and `.catch` are a promise and try-catch respectively; they're a deceptively simple topic to understand, and I've included appendix links to explain both [Javascript promises](#js-promises) and [try-catch in Javascript](#js-try-catch)

But seriously, we're all done! We've completed our entire app: a front-end (that looks alright) built in React (and using JSX + CSS), and an interface to our Cloud Firestore back-end.

You should pat yourself on the back - this was a lot of content, and you either had to listen to me talk about it for an hour (pretty bad), read this entire document (even worse), or both (absolutely the worst option out of the three). I really appreciate you taking the time to do this, and I hope you learned something!

## Quick Deploy: Heroku & CRA

Hah, you thought we were done. Turns out there's one more step!

Right now, you can view your app on your own computer. You could distribute it to other people by making them download and run your code, but that's lots of work! Instead, it'd be way more convenient if you could just show it to people as a website.

So, let's do exactly that.

There are [deployment options available](#deployment-options), but today I'll quickly walk you through how to do this on Heroku, which is one (free-to-start) provider of a variety of web services (that usually fall under the realm of "DevOps").

First, head to [Heroku's website (https://www.heroku.com/)](https://www.heroku.com/), and sign up for an account. You don't need a credit card or anything to use it!

After you sign up for an account, you'll be on your dashboard. We'll create a new project - hit the new button, and create a new app.

![heroku create app page](images/heroku-create-app.png)

You'll have to give your project a unique name that nobody else has taken. I've taken `qwer-hacks-2020`, sorry about that :/. This name is a bit important, since it decides the URL for your project!

Now, you'll be on this page:

![heroku deploy instructions](images/heroku-deployment-instructions.png)

There are some instructions there, but I'll sum it up:

First, install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)

Then, you'll run quite a few terminal commands:

```sh
# first, go to your project directory.
$ cd my-project/
# we'll create an empty git repository here
$ git init
# we're creating a heroku remote. this command does a lot under the hood!
$ heroku git:remote -a qwer-hacks-2020
# this is getting our files ready to push. '.' means all files
$ git add .
# add a nice message for your changes!
$ git commit -am "learning web development!"
# "push" our changes to heroku
$ git push heroku master
...
```

Then, it'll handle everything. The first time you do this, it'll take a bit of time, but it'll eventually tell you when your project is ready.

For example, here's what I got:

```sh
$ git push heroku master
...
remote: -----> Compressing...
remote:        Done: 88.9M
remote: -----> Launching...
remote:        Released v3
remote:        https://qwer-hacks-2020.herokuapp.com/ deployed to Heroku
```

Great! We can visit [https://qwer-hacks-2020.herokuapp.com/](https://qwer-hacks-2020.herokuapp.com/) to check out the project!

Then, every time you make changes to your project, you just need to run these three commands again:

```sh
$ git add .
$ git commit -am "making more awesome changes!"
$ git push heroku master
```

Cool cool! Now you can show your friends your awesome web app!

## Ending Notes

Great, so we built our chatroom. I want to highlight a few skills that you (hopefully) learned, a few caveats about what I talked about, and what's ahead in the road.

### Topic Review

First, what did we learn?

* high-level web development concepts: client-server model, front-end vs. back-end, HTML, CSS, JS
* installing and running node projects with `npm`
* overview of React/ES6-related JS fundamentals:
    * `this`
    * arrow functions
    * classes (including constructors and properties)
    * `import`
* what React is, and how to use it:
    * what React components are and why they're useful
    * creating custom components
    * the `render()` function and JSX
    * `props`
    * `state` and `this.setState()`
    * component lifecycles
* what Firebase is, what Firestore is, and how to use it:
    * setting up a Firebase Project & App
    * setting up Cloud Firestore
    * editing data in the database console
    * (briefly) using the `firebase` node library
    * implementing an event listener
    * implementing a create event
* briefly deploying our project with Heroku

### Further Work/Learning

I included two slides in the workshop on further things you can do

TODO

### Some Caveats

TODO

## Appendix

Here are more links (and brief explanations) on where you can learn more about the stuff that's covered in this workshop.

### HTML

HTML is one of the three technologies that underpins the modern web. In particular, HTML defines the content/structure of the page. While you can get away with a surface-level knowledge of HTML (many web developers do), spending a few hours to really understand what's going on pays dividends if you develop complex web applications.

There are lots of great resources online for learning HTML (which is often learned in conjunction with CSS). Here are a few of my favourites (but feel free to find what you want):

* [Marksheet](https://marksheet.io/), a great reference/tutorial on HTML & CSS. Does a great job on explaining truly understanding HTML and CSS rather than just memorizing properties
* [Mozilla Web Tutorials](https://developer.mozilla.org/en-US/docs/Web/Tutorials), community-driven web tutorials from one of the open-source defenders of the internet
* [W3Schools HTML Tutorial](https://www.w3schools.com/html/default.asp), one of the most common tutorial/reference sites for web development
* [Interneting is Hard, HTML & CSS](https://internetingishard.com/html-and-css/), an elegant and well-presented introduction to HTML & CSS for people with no coding experience
* [Khan Academy HTML & CSS](https://www.khanacademy.org/computing/computer-programming/html-css), if you love learning with Khan Academy, then this is a great resource for you
* [Codecademy HTML & CSS](https://www.codecademy.com/catalog/language/html-css), a really popular interactive HTML and CSS tutorial. Personally will say that your mileage may vary

Things you should probably know:

* basic tags (body, head, paragraph, heading, div, span, img, anchor, button, forms)
* attributes and properties
* the box model, and the DOM
* the difference between block and inline elements
* semantic (HTML5) elements

### CSS

CSS is one of the three technologies that underpins the modern web. CSS controls how your webpage looks, and is critical for making your web application beautiful and easy to use. CSS can be quite tricky to learn (especially because browser behaviour can be unintuitive), and a deep understanding isn't necessary; but, masters of CSS are high in demand (and can make any application look stunning).

There are lots of great resources online for learning CSS (which is often learned in conjunction with HTML). Here are a few of my favourites (but feel free to find what you want):

* [Marksheet](https://marksheet.io/), a great reference/tutorial on HTML & CSS. Does a great job on explaining truly understanding HTML and CSS rather than just memorizing properties
* [Mozilla Web Tutorials](https://developer.mozilla.org/en-US/docs/Web/Tutorials), community-driven web tutorials from one of the open-source defenders of the internet
* [W3Schools CSS Tutorial](https://www.w3schools.com/css/default.asp), one of the most common tutorial/reference sites for web development
* [Interneting is Hard, HTML & CSS](https://internetingishard.com/html-and-css/), an elegant and well-presented introduction to HTML & CSS for people with no coding experience
* [Khan Academy HTML & CSS](https://www.khanacademy.org/computing/computer-programming/html-css), if you love learning with Khan Academy, then this is a great resource for you
* [Codecademy HTML & CSS](https://www.codecademy.com/catalog/language/html-css), a really popular interactive HTML and CSS tutorial. Personally will say that your mileage may vary
* [Flexbox Froggy](https://flexboxfroggy.com/) and [Grid Garden](https://codepip.com/games/grid-garden/), interactive games to learn how to use Flexbox and CSS Grid to position items
* [W3Schools Bootstrap Tutorial](https://www.w3schools.com/bootstrap/bootstrap_ver.asp), one tutorial for Bootstrap (a really common CSS framework)

Things you should probably know:

* basic CSS properties (e.g. styling text, borders, background colors, font size)
* very important properties to understand (`display`, `position`)
* selectors (class, id, tag, etc.), specificity, and cascading (CSS stands for Cascading Style Sheets after all!)
* floats vs. flexbox vs. css grid, and when you'll want to use what
* colors! (hex, rgb, rgba, hsl, etc.)
* CSS animations!
* a general knowledge of what CSS frameworks are (e.g. Bootstrap, Bulma)
* a general knowledge of what CSS preprocessors are (e.g. SASS and LESS)

### JS

Javascript is one of the three technologies that underlies the modern web. It started as a way for developers to create micro-interactions on their site, but now can be used for almost anything (mostly thanks to [NodeJS](#nodejs)). If you develop web applications, you have to know how to use Javascript. And, knowing its quirks (why is everything an object? what is ECMAScript?) can make you a web development superstar.

There is a behemoth of resources to learn Javascript, and to be honest there probably isn't just one article or tutorial you can walk through to gain a full understanding. However, these might give you a start (but you'll definitely have to do more on your own):

* [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS), possibly my favourite ebook on Javascript; you'll get an amazing foundation in Javascript, and understand what makes it different from other languages
* [Mozilla Web Tutorials](https://developer.mozilla.org/en-US/docs/Web/Tutorials), community-driven web tutorials from one of the open-source defenders of the internet
* [W3Schools JS Tutorial](https://www.w3schools.com/js/default.asp), one of the most common tutorial/reference sites for web development
* Khan Academy [Intro to JS w/ Processing](https://www.khanacademy.org/computing/computer-programming/programming) and [Making Webpages Interactive](https://www.khanacademy.org/computing/computer-programming/html-css-js), an intro with a popular drawing library and practical applications for making webpages; if you love learning with Khan Academy, then this is a great resource for you
* [Codecademy Javascript](https://www.codecademy.com/catalog/language/javascript), a really popular interactive JS tutorial. Personally will say that your mileage may vary
* [Eloquent Javascript](https://eloquentjavascript.net/), an MIT-Licensed textbook on Javascript
* [Javascript.info](https://javascript.info/), a textbook-style introduction to JS

Things you should probably know:

* the basics of programming (conditionals, loops, sequential flow, functions, variables, etc.)
* how can you manipulate the DOM (i.e. the webpage) with JS - adding or removing content, changing classes, etc.
* Javascript's type system - how is it like languages you've used, and how is it different
* how do variable scopes work in Javascript (not what you'd think); why do people use `let` instead of `var`?
* what is JSON?
* what does it mean that Javascript is event-driven? how does async work in Javascript?
* why are there different versions of Javascript? what is ES6, ECMAScript, etc.
* what is jQuery? why is it so popular?
* what is Node.js? why is it so popular?
* what is Typescript? why does it exist?

#### this

Turns out, `this` is one of the most confusing topics of object-oriented programming. I like [Mozilla's reference page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) on how `this` operates in Javascript; however, I think practice is the best way to cement your understanding.

#### Arrow Functions

We almost exclusively used arrow functions in this tutorial. [Here's a Mozilla article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) that explains what they are; the specific thing you'll want to keep in mind is how they're bound to calling scopes (e.g. how it works with `this`).

#### Javascript Classes

Object-oriented programming is one of the fundamental paradigms used in software engineering. Usually people take classes on OOP, but there are some solid online resources you can try your hand at:

* [Mozilla Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
* [W3Schools Tutorial](https://www.w3schools.com/js/js_classes.asp)
* [DigitalOcean Writeup](https://www.digitalocean.com/community/tutorials/understanding-classes-in-javascript)

I will say, Javascript by default wasn't a programming language designed for strict class-based OOP (it has its roots in prototypes). However, classes have become very popular, especially in the React community!

#### ES6 Import

We used the `import` and `export` keywords several times when creating our own classes and importing them from other files. [Here's a quick Mozilla writeup](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) on how `import` works.

#### Webpack

[Webpack](https://webpack.js.org/) works under-the-hood in a significant amount of web applications, but few people know how to really use it. `create-react-app` does all of this for us, but if you're interested [their website](https://webpack.js.org/concepts/) is a great place to start.

#### JS Date

Dates and times work slightly differently in Javascript than they do in other languages (one common difference is that Unix timestamps are in milliseconds, rather than seconds). As with almost anything, [Mozilla has a great reference page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) on how the `Date` object works in Javascript.

Also, what was going on in this function?

```js
const getTimeString = timestamp => {
    let date = new Date(timestamp);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    // 0 padding!
    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    let str = hour + ":" + min + ":" + sec + " on " + month + "/" + day + "/" + date.getFullYear();
    return str;
}
```

The `getTimeString` function takes in one parameter, `timestamp`; it's assumed to be a JS Unix Timestamp (e.g. # of milliseconds from Jan 1, 1970 UTC), but in theory could be any date format that fits in the Date constructor.

Then, the next few lines of `let` statements grab numerical values for individual aspects of date and time. Note that `.getMonth() + 1` is required since it's zero-indexed, but we usually view January as the 1st month.

Then, we do something called zero-padding: using ternary operators, we add an extra 0 if the string is only one digit (times and dates tend to be 2). We take advantage of Javascript's type system to implicitly convert the types.

Finally, we construct the string by concatenating the strings, and return it. No side effects!

#### JS Promises

Javascript usually handles asynchronous behaviour with events, but promises are another really popular mechanism to handle async (and one that I personally really enjoy using). It's become very popular in JS recently, and we used it briefly to log the results of our Firebase operations. In general, it's very common when using web requests.

[Mozilla has a top-down reference of Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), and a Google Developer has written a [guide on why you should use Promises](https://developers.google.com/web/fundamentals/primers/promises).

#### JS Try Catch

`try...catch` is a really common syntax pattern used for error handling. You'll encouter it in a variety of languages, and they tend to be implemented in very similar ways. [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) has a good reference on how to use it.

### NodeJS

[Node.js](https://nodejs.org/en/) is one of the most ground-breaking changes to web development in recent memory. At a very basic level, it's a way to run Javascript code anywhere; you're no longer restricted to just a browser. This has directly and indirectly led to Javascript-based command line tools, server implementations, mobile and desktop apps, and transpilers (among many other innovations). It also started `npm`, a package manager for Javascript, which we used to install dependencies in this workshop (and which you'll no doubt use more if you do more web development).

In particular, Node.js is powerful because it uses Javascript's event model to create non-blocking programs. It's the foundation for web frameworks like [Express](https://expressjs.com/), and you'll definitely use things that use Node in the future.

### More React

We only briefly went over React, and there's a lot more to learn. As with many things, there are many different ways that you can learn React; and, as with many things, there's a lot of React to learn.

Usually I'd present a few options, but I strongly believe that [React's own tutorial](https://reactjs.org/tutorial/tutorial.html) (where you build a tic-tac-toe app) is the best place to start. In general, I think the React community does a great job creating primary resources for developers to learn how to use React (which makes sense, since they want React to succeed).

The [React Docs](https://reactjs.org/docs/hello-world.html) also has a more reference-style guide to learning React, and they document the ins and outs of all of the key features.

The other way you'll learn React is through practice: as you build more and more web apps with React, you'll understand why it was created; and more importantly, when you build apps *without* React, you'll understand what problems that it solves. I will say, the [Thinking in React](https://reactjs.org/docs/thinking-in-react.html) article sums up a bit of what I'm talking about: seeing state, components, and [composition](https://reactjs.org/docs/composition-vs-inheritance.html) when you're architecting a web app.

I'll outline a few common topics in these footnotes, but the list isn't exhaustive.

#### JSX

[JSX](https://reactjs.org/docs/introducing-jsx.html) is a templating language (or extension) that React uses to generate components. You can definitely [use React without JSX](https://reactjs.org/docs/react-without-jsx.html), but I wouldn't recommend it unless you know exactly what you're doing. [The React introduction to JSX page](https://reactjs.org/docs/introducing-jsx.html) is a good start with what you can do, and [JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html) is a great secondary resource.

#### React Render Function

The render function is how you can put stuff on the screen, which seems important. We only explored React with class-based components, so we always put the render function as a special class function (extended from `React.Component`); however, you can also use `ReactDOM.render()`, which is how [the getting started guide first introduces the render function](https://reactjs.org/docs/rendering-elements.html).

If you want a more in-depth reference, look at the [React.Component API](https://reactjs.org/docs/react-component.html).

#### super (props)

I glossed over `super(props)` in the workshop; refer to [the React page on Components and Props](https://reactjs.org/docs/components-and-props.html) and the [React.Component API](https://reactjs.org/docs/react-component.html).

#### more on state

In addition to the brief intro I did on state, I'd recommend looking at the [State and Lifecycle Docs Page](https://reactjs.org/docs/state-and-lifecycle.html) for a solid working understanding of state. [This page on lifting state up](https://reactjs.org/docs/lifting-state-up.html) is very useful (as you'll often lift/hoist state up when writing apps), and [the React.Component API entry on setState](https://reactjs.org/docs/react-component.html#setstate) can help you better understand what `this.setState()` actually does.

While it's not directly related, I find that [React Context](https://reactjs.org/docs/context.html) tends to be a common solution to many state-induced problems (basically it allows for global "props" of some sort). 

#### nested state

Nested state can be tricky! [The React.Component API entry on setState](https://reactjs.org/docs/react-component.html#setstate) is a good start on what can be bad about updating nested objects within state. To solve this, people will often use [ImmutableJS](https://github.com/immutable-js/immutable-js) and/or [Redux](https://redux.js.org/), though that's not the only reason you'd use either.

#### event handlers

Short answer: read [Handling Events](https://reactjs.org/docs/handling-events.html).

So, I glossed over this:

```jsx
handleNameChange = e => {
    this.setState({ author: e.target.value });
}

handleMessageChange = e => {
    this.setState({ message: e.target.value });
}
```

What was really going on here? Well, `e` is actually an event - in particular, a [Synthetic Event](https://reactjs.org/docs/events.html) (which you can think of as similar to traditional Javascript events). Like in vanilla JS, events can have targets (which tell us the DOM node that triggered the event), and all inputs have a `value` attribute that has the input's current value.

So, in this code, whenever the specific event is triggered (which in our case, was `onChange`), we take the input's value and update our state, which keeps our state consistent with the user's input.

#### hooks

Hooks are a new-fangled way to deal with side effects. [Check out the introduction to hooks for more info](https://reactjs.org/docs/hooks-intro.html).

#### component lifecycles

I briefly went over component lifecycles when we talked about firestore integration, but it's a more complicated idea than you might think! However, when you build more complex apps, it's a pretty important idea to understand. [The guide has a better intro to lifecycles](https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class), and the [React.Component API reference](https://reactjs.org/docs/react-component.html#the-component-lifecycle) has everything you'll need to know about components (including construction and destruction order).

#### Create React App

When we set up our project, we used [create-react-app](https://github.com/facebook/create-react-app), which is a common starter framework that Facebook made to bootstrap React projects. It's really useful, and lots of projects use it - you can get through a lot of web development without every leaving it!

There's [extensive documentation](https://create-react-app.dev/docs/documentation-intro) on what create-react-app exactly does for you, but some of the big things it handles includes:

* compiling ES6+ code to different targets with [babel](https://babeljs.io/)
* module importing and bundling with [webpack](https://webpack.js.org/)
* hot module reloading (HMR)
* component testing with [Jest](https://jestjs.io/)
* linting with ESLint
* building and deploying your project

If you want to transition your project off of create-react-app, you can [eject out of it](https://create-react-app.dev/docs/available-scripts#npm-run-eject).

### More Firebase

Firebase has lots of features that we didn't cover at all! It's a product, so naturally [their homepage](https://firebase.google.com/) does a good job of selling their features.

We also didn't cover Cloud Firestore in-depth. [The docs](https://firebase.google.com/docs/firestore/) are a good place to start, and [the quickstart](https://firebase.google.com/docs/firestore/quickstart) gives you a flyover view of what Firestore is and how it works. There's also [a sample app](https://firebase.google.com/docs/firestore/client/samples-web) that demonstrates all the common web-app uses of Firestore.

Firebase has another database model called the Realtime Database. [This article](https://firebase.google.com/docs/firestore/rtdb-vs-firestore) does a good job of comparing the two (though it does slant to Firestore, since it's the newer, more commercialized product).

#### Firebase Security Rules

We didn't talk about this at all, but if you want to use a Firebase in production you should definitely look at [Security Rules](https://firebase.google.com/docs/firestore/security/overview); you'll notice that we didn't use any form of database authentication, and this is one way you can do that with Firebase.

#### Collections and Iterating

Some of the most important concepts in databases is how data is stored and how to query it. For the former, check out the [data model explanation](https://firebase.google.com/docs/firestore/data-model) and for the latter, the documentation on [querying](https://firebase.google.com/docs/firestore/query-data/queries) and [ordering](https://firebase.google.com/docs/firestore/query-data/order-limit-data) the data is relevant.

### Server Languages

Almost any language has its own server implementation and accompanying web framework! Here are a few (some of them are more than just servers):

* Python: try [Flask](https://www.palletsprojects.com/p/flask/) or [Django](https://www.djangoproject.com/)
* JS/Node: try [Express](https://expressjs.com/)
* Go: try ... Go (and [net.http](https://golang.org/pkg/net/http/))
* Java: try Servlets
* C++: try [TreeFrog](https://www.treefrogframework.org/) or [Pistache](http://pistache.io/) (just REST)

You can also just google "LANGUAGE server" or "LANGUAGE web framework" and you'll usually find something.

### Databases

Databases are a super important part of creating applications, and we basically didn't talk about them. I could definitely ramble about them for a long time, but I think [this DigitalOcean article](https://www.digitalocean.com/community/tutorials/understanding-sql-and-nosql-databases-and-different-database-models) is a good start.

Again, lots and lots to cover; if it's something you're interested in, definitely look for more information online!

#### SQL vs noSQL

Just going to drop [the DigitalOcean article](https://www.digitalocean.com/community/tutorials/understanding-sql-and-nosql-databases-and-different-database-models) article again. Not too in-depth, but this entire database appendix isn't.

#### CRUD

CRUD is a common set of operations that databases and APIs can perform. [This codecademy article](https://www.codecademy.com/articles/what-is-crud) is a good start, but it's not super important vocabulary.

### MV Frameworks

React isn't exactly a MV* (model-view-something) framework, though it fulfills many of the same needs as them. The most common type of MV* is the Model-View-Controller framework ([here's the Wikipedia page](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)), but there are other similar frameworks (which is why people say MV*). Other common front-end JS frameworks include [Angular](https://angular.io/), [Vue](https://vuejs.org/), and [Ember](https://emberjs.com/).

One useful site that I've recommended people is [TodoMVC](http://todomvc.com/), which builds a simple todo app in many different MV* frameworks. It can help you see what an app might look like on a surface-level, and let you know what's out there in the big wide world.

### Deployment Options

There are a lot of ways you can deploy an app. Here are a few of my favourites (all of which are free to some extent):

* Heroku ([Heroku tutorial link](https://devcenter.heroku.com/articles/deploying-nodejs), [CRA tutorial link](https://create-react-app.dev/docs/deployment/#heroku))
* Firebase ([firebase tutorial link](https://firebase.google.com/docs/hosting/deploying), [CRA tutorial link](https://create-react-app.dev/docs/deployment/#firebase))
* GitHub Pages ([CRA tutorial link](https://create-react-app.dev/docs/deployment/#github-pages))
* Netlify ([CRA tutorial link](https://create-react-app.dev/docs/deployment/#netlify))

I will say, Heroku sleeps your app if it's inactive for a certain period of time. If you want a free production deploy, I wouldn't use Heroku if instant uptime is mission critical.

## Extra Footnotes

Here are the things I've footnoted that don't fall under an appendix category.

### Browser Languages

TODO

Mention plugins (like Flash, Silverlight), web assembly, etc.

### SPA

TODO

### DRY

TODO

### async

TODO

### events

TODO

## Other Web Development Things

Here are some cool things that Matt thinks you should explore.

* Typescript: Javascript, but with explicit static typing!
* SASS: CSS, but with more useful features
* Jekyll: Static Site Building (for blogs, conference websites, etc.)
* Jest + Enzyme: a common JS testing framework for React Apps
* Continuous Integration: automate testing, building, deployment. options include Travis CI, AppVeyor, Circle CI, GitHub Actions, etc.

## Copyright

This entire workshop is under the MIT License, so basically you can do whatever you want. Have fun!

(however, if you do use these workshop materials, I'd appreciate it if you let me know! shoot me an email at [matt@matthewwang.me](mailto:matt@matthewwang.me))