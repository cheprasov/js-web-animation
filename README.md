[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

@cheprasov/web-animation v0.1.0
=========

Simple class WebAnimation for perform an animation on the web via JavaScript. It is based on requestAnimationFrame for performance.

##### Features:
- Based on requestAnimationFrame for performance.
- It allows to use any functions fo easing.
- Easy to use for looped animation.

### 1. How to install

```bash
> npm install @cheprasov/web-animation
```

### 2. Quick examples

Example 1: Moving div to left on 500px for 2 sec with easing f(x) = n^2. 

```javascript
import WebAnimation from '@cheprasov/web-animation';

const div1 = document.getElementById('div1');

const animation = new WebAnimation({
    duration: 2000,
    easing: n => n ** 2,
});

const move = 500;

animation.setOnStep((progress) => {
    const shiftX = progress.tween * move;
    div1.style.transform = `translate3d(${shiftX}px, 0, 0)`;
});

animation.setOnFinish(() => {
    div1.style.transform = 'none';
    div1.style.left = `${move}px`;
});

animation.run();
```

### 3. Documentation

#### constructor ( options = {...} )

- **`duration`**: `number`, `optional`, `default = 1000`. Duration time (ms) for animation.

- **`easing`**: `function`, `optional`, `default = (n => n)`. Easing function for animation tween.
    **Arguments:** 
    - **`ratio`**: `number` - Ratio of `elapsedTime / duration`
       
    **Returns** `number`. Return of the function will be used like tween for animation progress.
 
- **`rAF`**: `function`, `optional`, `default = window.requestAnimationFrame`. Function for animation tick.
    **Arguments:** 
    - **`function`** - the functions which should be called on animation tick. 
    
- **`onStep`**: `function`, `optional`, `default = null`. Function will be called on each animation step.
    **Arguments:** 
    - **`progress`** - object with progress state of animation (see more below).
    - **`animation`** - link to instance of `WebAnimation` class.
    
- **`onStop`**: `function`, `optional`, `default = null`. Function will be called when animation terminated by call `stop()` method.
    **Arguments:** 
    - **`progress`** - object with progress state of animation (see more below).
    - **`animation`** - link to instance of `WebAnimation` class.
    
- **`onFinish`**: `function`, `optional`, `default = null`. Function will be called when animation is finished.
    **Arguments:** 
    - **`progress`** - object with progress state of animation (see more below).
    - **`animation`** - link to instance of `WebAnimation` class.
    
Example:    
```javascript
const options = {
    duration: 2000,
    easing: n => n ** 2,
    onStep: (progress) => {
        someDiv.style.opacity = progress.tween;
    },
    onFinish: (progress) => {
        someDiv.style.display = 'none';
    },
};

const animation = new WebAnimation(options);
```
    
#### Object `progress` for onStep, onStop, onFinish methods

- **`elapsedTime`**: `number` - Elapsed time
- **`ratio`**: `number` - Ratio of elapsed time / duration. `0 <= n <= 1` 
- **`tween`**: `number` - Tween value for animation. `tween = easing(ratio)`
- **`isFinished`**: `boolean` - Is animation finished?  

Example:
```
{
    elapsedTime: 1000,
    ratio: 0.2,
    tween: 0.04,
    isFinished: false,
}
```

#### run()

Method run to perform animation.

```javascript
const animation = new WebAnimation();
animation.run();
```

#### stop()

Method run to stop animation. It will call `onStop` callback;

```javascript
const animation = new WebAnimation({
    duration: 1000,
    onStop: (progress) => {
        console.log('Animation progress', progress);    
    },
});

animation.run();

setTimeout(() => {
    animation.stop();
}, 500);
```

#### setOnStop(function)
Setter for onStop callback.
```javascript
animation.setOnStop((progress, animation) => {
    console.log('Animation is stopped');
})
```
    
#### setOnStep(function)
Setter for onStep callback.
```javascript
animation.setOnStep((progress, animation) => {
    console.log('Animation step');
})
```

#### setOnFinish(function)
Setter for onFinish callback.
```javascript
animation.setOnFinish((progress, animation) => {
    console.log('Animation is finished');
})
```

#### getProgress(): `progress`
Get progress state of animation. See `progress` object above.
 
```javascript
setTimeout(() => {
    console.log('Animation progress', animation.getProgress());
}, 100);
```
## Something does not work

Feel free to fork project, fix bugs, tests and finally request for pull
