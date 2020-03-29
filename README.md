# React from scratch

algumas anotações e testes sobre o [react](https://github.com/facebook/react).

## conceitos

### o que é?

- biblioteca para construção de interfaces;
- usado para construção de Single-Page-Applications;
- todo o ecossisistema React pode ser chamado de framework;
- tudo fica dentro do JavaScript;

  ```js
  import React from 'react';

  import './button.css'
  import icon from './button.png'

  function Button() {
    return (
      <button>
        <img src={icon}>
      </button>
    )
  }
  ```

- React: refere-se a biblioteca de construção de interface;
- ReactJS: React no browser;
- React Native: React no ecossistema mobile;

### vantagens

- organização do código;
  - componentização;
- divisão de responsabilidades;
  - back-end: regra de negócio;
  - front-end: interface;
- uma API, múltiplos clientes;
- programação declarativa;

### JSX

- escrever HTML dentro do JavaScript;
- com React, podemos criar nossos próprios elementos;

```js
function Header() {
  return <Button />
}
```

antes do JSX:

```js
function Button() {
  return React.createElement(
    'button',
    { type: button },
    React.createElement('span', { class: 'icon' })
  )
}

;<button type='button'>
  <span class='icon'></span>
</button>
```

depois do JSX:

```js
function Button() {
  return (
    <button type='button'>
      <span class='icon'></span>
    </button>
  )
}
```

### imperativo vs declarativo


<img src="readme-files/images/notification-icon.png" width="32">
imperativo:

```js
const notificacaoes = 0

function montaBadge(num) {
  if (notificacoes === 0 && num > 0) {
    // adiciona badge
    container.appendChild(badge)
    //...
  }
  if (notificaoes !== 0 && num > 0) {
    // apenas muda o número
    badge.innerHTML = num
    //...
  }
  if (notificacoes !== 0 && num === 0) {
    // remove o badge
    container.removeChild(badge)
    // ...
  }
}
```

declarativo:

```js
// não comparamos com o estado anterior
function Badge({ num }) {
  return (
    <div id='container'>
      {num > 0 && <div id='badge'>{num}</div>}
      <span class='icon'></span>
    </div>
  )
}
```

### babel

o babel converte o código JS de uma forma que o browser entenda;

### webpack

o webpack tem várias funções:

- criação do bundle, arquivo com todo código da aplicação;
- ensinar ao JavaScript como importar arquivos CSS, imagens e etc;
- live reload com `webpack-dev-server`;

## configurando a estrutura

1. adicionar o `babel` e `webpack`:

```shell
$ yarn add @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli -D
```

2. adicionar o `react` e o `react-dom`:

```shell
$ yarn add react react-dom
```

3. configurar o `babel.config.js` na raiz do projeto:

```js
module.exports = {
  presets: [
    // traduz o js que o browser ainda não entende
    // exemplo: import, export, arrow functions, classes...
    '@babel/preset-env',
    // traduz o próprio react para o browser
    // exemplo: jsx
    '@babel/preset-react',
  ],
}
```

4. adiciona o `babel-loader` e o `webpack-dev-server`:

```
$ yarn add babel-loader webpack-dev-server -D
```

5. configura o `webpack.config.js` na raiz do projeto:

```js
const { resolve } = require('path')

module.exports = {
  entry: resolve(__dirname, 'src', 'index.js'),
  output: {
    path: resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}
```

6. configura os scripts no `package.json`:

```json
// ...
"scripts": {
 "build": "webpack --mode production",
 "dev": "webpack-dev-server --mode development"
},
// ...
```

7. run:

```shell
$ yarn dev
```

## criando o componente raiz

`src/index.js`:

```js
import React from 'react'
import { render } from 'react-dom'

import App from './App'

render(<App />, document.getElementById('app'))
```

`src/App.js`:

```js
import React from 'react'

export default function App() {
  return <h1>Hello World</h1>
}
```

### importando css

1. adicionar o `style-loader` e `css-loader`:

```shell
$ yarn add style-loader css-loader -D
```

2. adicionar esse objeto ao array de rules ao `webpack.config.js`:

```js
 {
  test: /\.css$/,
  use: [
    // Inject CSS into the DOM.
    { loader: 'style-loader' },
    // The css-loader interprets @import and url() like import/require() and will resolve them.
    { loader: 'css-loader' },
  ],
},
```

### importando imagens

1. adicionar o `file-loader`:

```
$ yarn add file-loader -D
```

2. adicionar a seguinte `rule` ao `webpack.config.js`:
```js
{
  test: /.*\.(gif|png|jpe?g)$/i,
  use: {
    loader: 'file-loader',
  },
},
```


`App.js`:

```javascript
import React from 'react'

import profile from './assets/profile.JPG'

export default function App() {
  return (
    <>
      <h1>Hello World</h1>
      <img width='300px' src={profile} />
    </>
  )
}
```

### class components

o babel por pradrão não entende as propriedades definidas dentro da classe, apenas dentro do `constructor`.

para usar o `state` fora do `constructor` é preciso adicionar `plugin-proposal-class-properties` às dependências:

```
$ yarn add @babel/plugin-proposal-class-properties -D
```

adicionar ao `babel.config.js`:

```js
plugins: ['@babel/plugin-proposal-class-properties'],
```

class component:

```js
import React, { Component } from 'react'

class TechList extends Component {
  state = {
    techs: ['NodeJS', 'ReactJS', 'React Native'],
  }

  render() {
    return (
      <ul>
        {this.state.techs.map(tech => (
          <li>{tech}</li>
        ))}
      </ul>
    )
  }
}

export default TechList
```

### estado e imutabilidade

```js
handleInputChange = e => {
  this.setState({ newTech: e.target.value })
}

handleSubmit = e => {
  e.preventDefault()
  this.setState({
    techs: [...this.state.techs, this.state.newTech],
    newTech: '',
  })
}

handleDelete = tech => {
  this.setState({
    techs: this.state.techs.filter(t => t !== tech),
  })
}
```

### props

`TechItem.js`

```js
import React from 'react'

export default function TechList({ tech, onDelete }) {
  return (
    <li>
      {tech}{' '}
      <button type='button' onClick={onDelete}>
        Remover
      </button>
    </li>
  )
}
```

`TechList`:

```js
// ...
render() {
 return (
   <form onSubmit={this.handleSubmit}>
     <ul>
       {this.state.techs.map(tech => (
         <TechItem
           key={tech}
           tech={tech}
           onDelete={() => this.handleDelete(tech)}
         />
       ))}
     </ul>
     <input
       type='text'
       onChange={this.handleInputChange}
       value={this.state.newTech}
     />
     <button type='submit'>Enviar</button>
   </form>
 )
}
// ...
```

### default props

```js
export default function TechItem({ tech = 'oculto', onDelete }) {...}

// ou

// funciona assim para classes e funcs
TechItem.defaultProps = {
  tech: 'oculto',
}

// na classe tambem pode ser escrito assim
class TechItem extends Component{
  static defaultProps = {
    tech: 'oculto',
  }
}
```

### proptypes

```
yarn add prop-types
```

```js
import PropTypes from 'prop-types'

TechItem.propTypes = {
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
}
```

### ciclo de vida do componente

```js
// executado assim que o componente aparece em tela
componentDidMount() {}

// executado sempre que houver alteração nas props ou estado
componentDidUpdate(prevProps, prevState) {
 // this.props, this.state
}

// executado quando o componente deixa de existir
componentWillUnmount() {

}
```
