# aspects (WIP)
Aspect Oriented Programming framework in typescript (WIP).
To know more about the concepts of AOP check here: https://en.wikipedia.org/wiki/Aspect-oriented_programming.

This library intends to be a starting point to allow you to easily implement new aspects. The approach taken here was to provide a fluent API to define an aspect.

# Implemented Advice Types
- Before method execution;
- After method execution;
- On error thrown in method execution;

### TODO
- On promise resolved;
- On promise rejected.

# Implemented Join Point Types
- Method execution;

### TODO
- Property getter and setter.

# How To Use

1. Implement your aspects by deriving from the Aspect class;
2. Implement an Aspects Weaver service to apply your Aspects to instances of your objects/components in the intended lifecycle points.

Example: in an Angular 2 app, the Aspects Weaver can listen to the lifecycle hook OnInit of each Angular component and apply the registered Aspects at that moment.

# License
MIT