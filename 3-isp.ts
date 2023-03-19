/**
 * Interface Segregation - Entities should not depend on interfaces that they do not use.
 */


// Bad one
interface Programmer {
    writeCode(): void;
    eatPizza(): void;
}

const officeProgrammer: Programmer = {
    writeCode: () => console.log('writing code'),
    eatPizza: () => console.log('eating pizza')
}

// Freelancer cant eat pizza, since its only at office
const freelancer: Programmer = {
    writeCode: () => console.log('writing code'),
    // useless implementation of interface
    eatPizza: () => {}
}

// Good One

interface CodeWriter {
    writeCode(): void;
}

interface PizzaEater {
    eatPizza(): void;
}

const officeProgrammerISP: CodeWriter & PizzaEater = {
    writeCode: () => console.log('writing code'),
    eatPizza: () => console.log('eating pizza')
}

// Uses only interface that needed
const freelancerISP: CodeWriter = {
    writeCode: () => console.log('writing code'),
}