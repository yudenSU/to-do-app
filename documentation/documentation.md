# Documentation

This document will detail the application's requirements, notable design & development choices, and other relevant documentation.

It is to be stored in the application's codebase and source controlled via GIT.

## Requirements
High priority requirements are specified by the technical assignment specification.

### Technical Requirements
**High Priority**
- User can Login
- User can logout
- Login state must persist even with the tab being closed
- To dos are to be displayed in a a paginised manner with 10 items per page
- To do items must be queried from DummyJSON

**Medium Priority**
- Register Page
- Forgot password page
- Login with username OR email
- Create, Update and Delete functionality for To Do items.

**Accesibility**
- Dark themes changes (eye-strain)
- Tab Key (keyboard) navigation support

### Non Functional Requirements

**High Priority**
- React must be used for development


**Accesibility**
- ARIA labels and descriptors to be effectively used

## Technologies Used

**React:** Use was required based on the technical assessment specification.

**Vite:** Vite was used the build and development enviornment as it offers a lightweight and performant approach. 

**Vitest:** Vitest was used for unit testing as it intergrates well with Vite and has strong community support.

**React-Query:** React Query was used for handling API request. It was used in conjunction with the Fetch library. React Query was chosen for its fast set-up and simple approach to manage server-state.

**JOY UI:** Joy ui was used as the main component library for its strong support (by MUI), and mobile-first design principles. It also follows best practises for web accesibility.

## Known Limitations & Security Risk
### Limitations

| Limitation    | Provisional Solution |
| -------- | ------- |
| DummyJSON does not update server state for create, update and delete. Since our  implementation with react-query aims to maintain a single source of truth with server state. Create, Update and Delete changes are not reflected in the front-end | An *Alert* UI element is raised to recognise succesful POST, PATCH and PUT actions following a succesfuly 200 ok response from DummyJSON.    |
| DummyJSON's cookie authentication system was not working at the time this project was created. As a result cookie based authentication was not available. | Auth Tokens are stored in local storage and passed through headers. Known security errors are detailed below.     |
| Register and password reset operations are not supported by dummyJSON | Currently the register and forgot password pages are not functional. But maintained to demonstrate UI/UX considerations and prepare for future implementation   |

### Security Risks

The app is currently vulnerable to Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) due to the storage of auth tokens in local storage.

This should be ammended by storing the tokens in httpOnly cookies, but this is not an applicable solutions due to the limitations of DummyJSON.

## UI/UX Design 

The project aims to uphold design best practices. The following assumptions on potential users were established:

1. Most users are likely to use the app on mobile.
2. Desktop users are likely to dynamically resize the screen, such as for multitasking by looking at their to do list and another task.



Mobile-centric design:

- 'Action' components such as buttons are spaced to prevent misclicks
- Vertical content delivery in mobile views which are more intuitive with scrolling.
- Information segregation: content is divided in distinct views to prevent information overview: e.g. navigation is hidden behind a navigation menu button.
- Optimised with 320px lower bound: https://uxpickle.com/what-is-the-smallest-screen-size-you-should-design-for/

Responsive design

- Design is responsive to screen size and supports dynamic resizing of the screen 

Dark/light color themes

- Light and Dark mode themes are supported to prevent eye-strain, and for personal preference
- On start-up the app will use the current system/browser dark/light mode setting. This is so that the app adheres to the user's usual preference.
- Light and dark mode is toggleable at runtime so users will have a choice to change themes such as in cases where they move to another room with different lighting.

## Accesibility
The system's accesibility requirements are based on WCAG 2 standard.

Notable accesiblity choices include:

- Text contrast
- Tab navigation
    - All sections of the app are tested to be completely navigatable using the *tab* key and there is no region that 'traps' tab navigation e.g. an extremely long list.
- Aria labels and descriptors are used to communicate functionality for screen readers. This includes aria labels using plain english to describe functionality.

## Design Considerations

### General
The project was segregated as follows:

Networking functionality is sectioned in the /api directory

Authentication functionality is sectioned in the /auth directory

Other sections are related to visual elements of the user interface.

### Networking
#### General approach
React-query is used to manage all network requests. Querying the data is performed using the fetch API. The queries are handled by React-Query hooks, which handle server state. This includes:
- Cacheing responses to reduce load on the server
    - Cache invalidation is handled through React-Query's mutation system
- isLoading and isError states

Dynamic component that rely on server-side data strictly uses react-query's states. This ensures consistency with the server and that the user's view is consitent to remote data.


#### Error handling
- 401 errors trigger an attempted reauthentication of the user (via the refresh token)
- non 401 and 404 errors, are handled by 3 retries operations handled by react-query using exponential back-off. 
- If the request still does not succeed, the error is formatted and thrown.
- Presentation of the error is handled at the component side to ensure a user-friendly view is displayed.

### Authentication
An auth context system was developed using react context. The context is accessed through a useAuth hook. This approach ensures a single source of truth for authentication data and functionality. 

The approach is similar to what is done by Auth0, firebase Auth and other pre-built solutions such as Refine. Thus, it will also allow easy transition to production ready authentication providers.

Similar to other network request, a 3 retry system is used to handle authentication actions.

### To do functionality

The to do component is the main functionality of the application. It is displayed in a list format with pagination (10 per page). Each to do list item includes user events to Edit, Delete and Mark the item as completed.

Sort, search and filter functionality is not supported due to limitations in dummyJSON.

## Justification of Additional Features
A help page is added to assist first-time users with the app.

### Testing
Unit test are provided to test components are correctly rendering and respond to user interaction.