# Graceful lines plugin

Design plugin Graceful lines for [React Roulette Pro](https://github.com/IvanAdmaers/react-roulette-pro)   
Live example - [rrp-graceful-lines-plugin.ivanadmaers.com](https://rrp-graceful-lines-plugin.ivanadmaers.com)

<div align="center">
  <a href="https://rrp-graceful-lines-plugin.ivanadmaers.com">
    <img src="https://i.ibb.co/m68m9cq/graceful-lines-example.gif" alt="Graceful Lines Plugin Example" />
  </a>
</div>

## Installation

```bash
# Via npm:
npm i rrp-graceful-lines-plugin

# Via yarn:
yarn add rrp-graceful-lines-plugin
```

## Usage

```jsx
import gracefulLinesPlugin from 'rrp-graceful-lines-plugin';
import 'rrp-graceful-lines-plugin/dist/index.css';

<RoulettePro
  designPlugin={gracefulLinesPlugin()}
/>
```

## Options

All the options are optional

| **Option** | **Type** | **Description** |
|--|--|--|
| hideTopArrow | `boolean` | Hide top arrow |
| hideSideArrows | `boolean` | Hide side arrows |
| replaceBottomArrowWithTopArrow | `boolean` | Replace bottom arrow with top arrow |
| prizesWithText | `boolean` | Prizes with text |

Example:
```jsx
<RoulettePro
  designPlugin={gracefulLinesPlugin({
    hideTopArrow: true,
  })}
/>
```

## Versions

- react >=17.0.0
- react-dom >=17.0.0
- react-roulette-pro >=3.0.4

## Local development

*Development*

```bash
npm ci i

npm run dev

cd example/

npm ci i

npm run dev
```

*Production*

```
npm run build

cd example/

npm run build
```

## License

[MIT](./LICENSE.md)

Copyright (c) 2022-present, Ivan Admaers
