# react-keep

![npm version](https://img.shields.io/npm/v/react-keep.svg)
![react peer dep version](https://img.shields.io/npm/dependency-version/react-keep/peer/react.svg)
![bundle size](https://img.shields.io/bundlephobia/min/react-keep@0.2.0.svg)
![license](https://img.shields.io/npm/l/react-keep.svg)

Higher order component which conditionally keeps and passes down previous values of selected props in subsequent renders.

### [Check out Codesandbox project](https://codesandbox.io/s/pjo5369v0m?autoresize=1&fontsize=14&view=preview)

![example](video/video.gif "Example")

## Motivation

This library is an effect of repeating same pattern multiple times while I was working on React based web applications.

The problem I often encounter is a need to keep current visual state of component after it receives new props which affect its render output. There are situations when data coming from Redux or local state is no longer available and I want to gracefully hide component which just moment ago was displaying data. During hiding animation user can still see immediately disappearing data. It doesn't look good.

One approach could be to somehow synchronize visual component with source of data. But doing it this way, we are making source of data aware of presentation layer.

My approach is about wrapping visual component with hoc which _remembers_ how props looked before they became unavailable.

## Installation

### npm

`npm install --save react-keep`

### yarn

`yarn add react-keep`

## API

### `withKeep(WrappedComponent, propsToKeep, shouldUseKeptProps)`

- _WrappedComponent_ - `function` - React component of any kind which receives kept props
- _propsToKeep_ - `string[]` - list of props names. Example: `["name", "description"]`
- _shouldUseKeptProps_ - `(props: object) => boolean`

  The one and only argument is the most recent props object passed to enhanced component. Function should return truthy value if wrapped component should receive remembered props. Falsy value should be returned otherwise. Example: `({message}) => message === undefined`

_Returned value_: React component

Notes:

Returned component remembers the most recent values of props defined in _propsToKeep_ as long as _shouldUseKeptProps_ returns falsy value. When _shouldUseKeptProps_ returns truthy value, remembered props are passed down to `WrappedComponent` along with other props untouched.

If _shouldUseKeptProps_ returns truthy since very beginning, all original props are passed down as there was nothing before to remember.

If _propsToKeep_ is not an array or _shouldUseKeptProps_ is not a function, `withKeep` returns original `WrappedComponent` so no props are kept.

## How to use it

1. Create enhanced component

```
import withKeep from 'react-keep';

const CounterWithKeep = withKeep(
  Counter,
  ["number"],
  ({ number }) => number === 0;
);
```

2. Pass first set of props

```
<CounterWithKeep visible={true} number={1} />
```

3. Pass new set of props

```
<CounterWithKeep visible={false} number={0} />
```

As a result, Counter instance will disappear and "1" will still be displayed.

## Example

Go to [codesandbox](https://codesandbox.io/s/pjo5369v0m?autoresize=1&fontsize=14&view=preview) to play with examples.
