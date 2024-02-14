# react-user-journey 🚀

Elegantly crafted React library for seamless tracking of user journeys across your application. Tailored for developers aiming to enrich user experience analytics and refine user flows effortlessly.

## 🌟 Introduction

`react-user-journey` simplifies the process of defining and monitoring pivotal steps within your users' journeys, offering vital insights into user behaviors and facilitating user experience enhancements with ease.

## 💾 Installation

Incorporate this library into your project by running:

- npm install react-user-journey

or if you prefer yarn:

- yarn add react-user-journey

## 🛠 Usage

Below is a quick guide on how to utilize `react-user-journey` in your application:

**Wrap your application with `JourneyProvider`:**

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { JourneyProvider } from 'react-user-journey';
import App from './App';

ReactDOM.render(
  <JourneyProvider>
    <App />
  </JourneyProvider>,
  document.getElementById('root')
);
```

**Leverage `useJourney` to track user journeys:**

```jsx
import React from 'react';
import { useJourney } from 'react-user-journey';

function ExampleComponent() {
  const { startJourney, completeStep } = useJourney();

  // Start a journey
  const startUserJourney = () => startJourney('purchase', ['view-item', 'add-to-cart', 'checkout']);

  // Complete a step in the journey
  const completeUserStep = () => completeStep('purchase', 'add-to-cart');

  return (
    <div>
      <button onClick={startUserJourney}>Start Purchase</button>
      <button onClick={completeUserStep}>Add to Cart</button>
    </div>
  );
}
```

## 📚 API

### `JourneyProvider`

A context wrapper that should be placed around your application.

### `useJourney`

A hook that provides access to `startJourney` and `completeStep` functions.

- **`startJourney(name: string, steps: string[], onCompletion?: Function, onAbandonment?: Function, metadata?: any): void`:** Initiates a new journey.
- **`completeStep(name: string, step: string)`:** Marks a step as completed.

## 🤝 Contribution

Contributions are always welcome! Please read the contribution guide to learn how to get started.

## 📄 License

`react-user-journey` is licensed under the MIT License. See the LICENSE file for more details.