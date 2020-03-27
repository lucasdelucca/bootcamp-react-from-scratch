# React from scratch

## conceitos

### o que é?

- biblioteca para construção de interfaces;
- usado para construção de Single-Page-Applications;
- todo o ecossisistem React pode ser chamado de framework;
- tudo fica dentro do JavaScript;
  ``` js
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

``` js
function Header() {
  return <Button />
}
```

antes do JSX:
``` js
function Button() {
  return React.createElement(
    'button',
    {type: button},
    React.createElement(
      'span',
      {class: 'icon'},
    )
  )
}

<button type='button'>
  <span class="icon"></span>
</button>
```

depois do JSX:
``` js
function Button() {
  return (
    <button type="button">
      <span class="icon"></span>
    </button>
  )
}
```
### imperativo vs declarativo

![notification icon](./readme-files/images/notification-icon.png =44x44)

imperativo:
```js
const notificacaoes = 0;

function montaBadge(num) {
  if (notificacoes === 0 && num > 0) {
    // adiciona badge
    container.appendChild(badge)
    //...
  }
  if (notificaoes !== 0 && num > 0 ){
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
``` js
// não comparamos com o estado anterior
function Badge({ num }) {
  return (
    <div id="container">
      { num > 0 && <div id="badge">{num}</div> }
      <span class="icon"></span>
    </div>
  );
}
```

### babel
o babel converte o código JS de uma forma que o browser entenda;

### webpack
o webpack tem várias funções:
  - criação do bundle, arquivo com todo código da aplicação;
  - ensinar ao JavaScript como importar arquivos CSS, imagens e etc;
  - live reload com `webpack-dev-server`;
