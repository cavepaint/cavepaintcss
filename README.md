# cavepaint.less

A Less library for smarter component styling


## Compiling the Less

1. Run 'lessc cavepaint.less caveman.css'.
2. If JS is enabled for randomness, use 'lessc --js cavepaint.less caveman.css'

## Dev settings

In **settings.less**, you'll find two settings of note in compiling:

- @output-patterns: This outputs all the demo pattern CSS. It's *over 300kb*.
- @randomness: This enables randomness in a bunch of variables. Great for testing.

## Less errors and randomness 

1. Some of the random mixins randomly throw errors 
2. There are a lot of random mixins
3. Just push on through! It compiles most of the time.

Known errors:

- SyntaxError: error evaluating function `color`: argument must be a color keyword or 3|4|6|8 digit hex e.g. #FFF in