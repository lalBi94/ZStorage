## ZStorage
ZStorage is a JavaScript library for implementing **Linked Lists**.

## Installation
Go to the GitHub release page you provided: **https://github.com/lalBi94/ZStorage/releases/tag/v3.0**. Now, you can import the src/ file to put him in your project.

## Examples
```js
// Card Game Class
import ZStorage from 'libs/ZStorage/ZStorage'

export default class CardGame {
    constructor(deck) {
        this.deck = new ZStorage()
        for(let i = 0; i <= deck.length-1; ++i) this.deck.push(deck[i])
    }

    mixDeck() {
        this.deck.mix()
    }

    getDeck() {
        return this.deck
    }
}
```

```js
// Main
import CardGame from "class/CardGame/CardGame"

let cg = new CardGame([
    {n:1,motif:"spade"},
    {n:5,motif:"heart"},
    {n:9,motif:"diamond"},
    {n:2,motif:"flower"}
    ...
])

console.log(cg.getDeck().toString()) /* <{"n":1,"motif":"spade"},{"n":5,"motif":"heart"},{"n":9,"motif":"diamond"},{"n":2,"motif":"flower"},...>*/
cg.mixDeck()
console.log(cg.getDeck().toString()) /* Its random so one possibility is: <{"n":2,"motif":"flower"},{"n":5,"motif":"heart"},{"n":1,"motif":"spade"},{"n":9,"motif":"diamond"},...> */
```

## Documentation
For detailed documentation and usage examples, please refer to the documentation page at **https://lalbi94.github.io/ZStorage/out/global.html**.

## Author
ZStorage is created and maintained by **General Zod(lalBi94)**.

## Licence
This project is licensed under the **MIT License** - see the LICENSE file for details.

## Contact
If you have any questions or encounter any issues, please open an issue on the GitHub repository at **https://github.com/lalBi94/ZStorage/issues** or send an email to **[bilal@boudjemline.fr](mailto:bilal@boudjemline.fr)**.