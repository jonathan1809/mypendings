# My Pendings

This is a React application for managing pendings. It allows users to add, update, and delete pending tasks.

## Installation

1. Clone the repository: `git clone https://github.com/jonathan1809/mypendings.git`
2. Navigate to the project directory: `cd mypendings`
3. Install dependencies: `npm install`

## Development

To start the development server and run the application locally, use the following command:

```
npm run dev
```

The application will be available at `http://localhost:5173/`.

## Test

To run the test suites, use the following command, you will see the coverage:

```
npm run test
```

## Deployment

To deploy new changes running the following command will run the build to generate the dist and gh-pages upload this changes to the gh-pages branch in github, automatically is running the actions to deploy the new version.

```
npm run deploy
```

## Technologies Used

- Vite: I use Vite for its speed to start a project and its support for using TypeScript. It is good for working on small and medium-sized projects in React, but for a larger project, other options like webpack should be considered.
- Typescript: I chose TypeScript because it offers type safety, enhances developer experience with better tooling, improves code maintainability and scalability, and has strong support within the React ecosystem.
- React DND (Drag and Drop): I chose react DnD as for the simplicity of the use of th hooks to enable drag elements, other libraries will take more time to set up and I needed to prioritize libraries that don't take much time setting up.
- Styled Components:I chose styled components for the convenience, flexibility, and improved user experience, making it an excellent choice for styling React applications and it is quick to implement and does not require any extra configuration, so I could first focus on the functionality of the app and then style the components. . Additionally, using Styled Components can make our component structure more understandable, allowing new team members to quickly identify the location of each element in the project and can work with other libraries like Material UI and Tailwind.
- Jest: Jest offers features such as automatic mocking, which simplifies the process of isolating components during testing. This allows developers to focus on testing specific components without worrying about their dependencies. Jest also supports snapshot testing, enabling developers to compare the output of React components against saved snapshots, ensuring that any unexpected changes are detected.
- React Context: I chose React Context because the application did not need to share many variables and the components were not at the same level of hierarchy

## Features

### Dashboard

The most important functionality is the dashboard. I had several ideas to implement this part, such as having a white area where the user could interact and move the notes wherever they wanted and stack them. However, considering the time and the importance of adding unit tests to the project as part of the development process, I opted to organize the notes as indicated in the wireframe and allow the user to interchange them with another note from that order, the key component is the Card component this have the useDrag and useDrop hooks that calculate where is another card where can be dropped, we can get that data from the useDrop hook and calculate what is the area of the item and if is available fro dropping. This way, the user only needs to drag a note on top of the one they want to replace, and it will change its position, I left a default rectangle that can't be dragged as a button when click it show the modal with the form to add a new pending.

### Add Pending Form

The form adds a new task to the dashboard by implementing a context function to update the state. It validates that no field is left empty and that if the description is already used in an active task, it will not allow creating another one. If the task is already completed or deleted, you can use the same description. Once the task is created, the context will order the tasks by date and update them on the dashboard. Only tasks with the status pending can be created and displayed.

### Count active task and done task

The section below the dashboard has 2 counters, one for active tasks and another for completed tasks. The DashboardContainer.tsx container component manages the state with a memo that listens for updates to the main array where all tasks are stored via the context. This is done in order to filter new elements by their "done" status and pass them to the child component that renders the number of elements in that array.

Additionally, a separate state is generated specifically for active tasks in order to update only that array for the functionality of the dashboard. This is necessary because we need to be able to swap an object by its index when a task is moved, without affecting our main array in the context.

### Mark as done and delete

In order to update the status of a task to "done" or "delete" using the principles of single responsibility, the card will receive the necessary function as parameters. This function requires the task ID and the new status to apply. In the context, we have a function that searches by ID and applies the new status, receiving only one of the three possible states as a parameter, thus respecting the Open-Closed principle.

Once the user clicks on one of the two options, the function will call the context to update the task array. It will also calculate if there are any changes to the active array and the done array for the functionality of counting active and done tasks.

### Sort task by due date

At the top of the dashboard, we have a button that will sort the tasks by due date in case the user wants to revert their tasks back to their default order.

### Change task background by due date

A function was implemented to calculate the date sent as a parameter to the card, in order to determine if the received date is within the range of today and tomorrow. If it returns true, the card will be changed to the color #FFD6D6; if not, it will remain #FFFFFF.

As a React developer, I can use the SOLID principles to greatly improve the maintainability, scalability, and testability of my app. Let's go through each principle and see how I can apply them to the different folders in my project structure.

Single Responsibility Principle (SRP):

In the Components folder, I ensure that each component has a single responsibility and is focused on rendering UI elements. I avoid adding business logic or data fetching directly within components.
In the Containers folder, I handle the logic of fetching data fro context managing state for specific parts of my application.
In the Features folder, I group related components, containers, and context providers for specific features of my application.

Open-Closed Principle (OCP):

In the Services folder, I implement services that abstract external dependencies, such as LocalSTorage calls. This allows me to easily swap out implementations without modifying client code.

Liskov Substitution Principle (LSP):

In the Context folder, I use context to provide shared data and behavior across my components. I ensure that any component using the context will work correctly with any context provider that adheres to the same contract.

Interface Segregation Principle (ISP):

In the Util folder, I place utility functions that perform specific tasks and can be reused across different parts of my application. These functions have focused interfaces catering to specific needs.

Dependency Inversion Principle (DIP):

I write unit tests for my components, containers, and utility functions.
In the Services folder, I use dependency injection to pass dependencies to service functions instead of creating direct dependencies within them.

### Enhancements

There are still improvements to be made since the form is updating the state for each field, but if an error is thrown and the user re-enters the data, it does not disappear until they click on "add". This should not happen from a UX perspective as the user should know that their data is already correct. The handling of the form's state needs to be refactored to validate when the user enters correct data.

The "Card" component should receive a generic object to render multiple elements for display in case there is a need to add or remove properties, as it is currently dependent on the Task structure. We can remove this dependency.

There is an open bug in Jest as I couldn't test components that depend on react-dnd. More time is needed to investigate and resolve this bug so that the react-dnd component does not become a dependency for testing.
You can find more details about this bug here: https://github.com/jestjs/jest/issues/13739

## Deployment

The application is published on GitHub Pages. You can access it [here](https://jonathan1809.github.io/mypendings/).
