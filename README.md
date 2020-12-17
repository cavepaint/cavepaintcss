# Cavepaint CSS

A Less library for putting together beautiful websites fast without wasting time on setup or complicated workflows.

```
<button class="huge dark green">Colors</button>
```

```
<section class="inner-page-width">Welcome to Cavepaint.</section>
```

## Features

* Color and layout classes which let you quickly compose the basic look and feel of any page 
* Reusable, composable CSS classes give you the most bang-per-KB
* No workflow setup. Just use the CSS file. Later, upgrade to Less and compile with a single console command.
* Over 500 colors using the composable color system
* Grid and column classes in an easy-to-use layout system
* Text and contrast rules based on smart typographical defaults
* Do 95% of your layout work in the browser
* Store your canonical design variables in your web codebase
* Save your team's time with conventions that anyone can learn and remember
* Even the marketing department can learn it!

## CSS version

Just grab a file from https://cavepaint.github.io/cavepaintcss/ (web-based compiler soon!)

Use the CSS version first even for more complicated projects. Hit the ground running! Don't get mired in CSS.

## Less version

* <code>git clone https://github.com/cavepaint/cavepaintCSS.git</code>
* Use the files <em>as your codebase</em>.
* Install Less: <code>npm install less -g</code>
* Run Less: <code>lessc cavepaint.less cavepaint.css</code>

The Less version really is that easy. There's no canonical package to grab and then store as a pristine copy somewhere. Cavepaint is the starting point of your Less codebase. You can christen it as your project by renaming **cavepaint.less** to whatever you want. Enjoy:

* No "chiseling" or CSS culling needed, although Cavepaint will work with standard CSS optimization approaches
* Specialized Less mixins for dealing with color and contrast
* Parametric mixins for targeting breakpoints


## Docs

Learn Cavepaint or brush up at https://cavepaint.github.io/cavepaintcss/learn/
