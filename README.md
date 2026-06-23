# Tasty Kitchens

Tasty Kitchens is a React food ordering app that lets users log in, browse restaurants, inspect a restaurant menu, manage cart items, and complete an order flow.

## Features

- Login with the CCBP authentication API
- Protected routes for authenticated users
- Home page with an offers carousel and a paginated list of popular restaurants
- Restaurant sorting by rating in ascending or descending order
- Restaurant details page with menu items and quantity controls
- Cart page with persistent item counts, price calculation, and order summary
- Local storage support for cart persistence across refreshes
- Responsive header, footer, and mobile navigation
- 404 page for invalid routes

## Tech Stack

- React 17
- React Router DOM 5
- js-cookie
- react-icons
- react-loader-spinner
- react-slick
- slick-carousel

## Project Structure

- `src/App.js` defines the app routes
- `src/components/Login` handles authentication
- `src/components/Home` renders the offers carousel and restaurant list
- `src/components/RestaurantDetails` shows the selected restaurant menu
- `src/components/Cart` manages cart items and order placement
- `src/components/Header` and `src/components/Footer` provide shared layout
- `src/components/ProtectedRoute` guards authenticated pages
- `src/components/NotFound` renders the fallback route

## Routes

- `/login` - Login page
- `/` - Home page
- `/restaurant/:id` - Restaurant details page
- `/cart` - Cart page
- `/not-found` - Page not found view

## API Endpoints

- `POST https://apis.ccbp.in/login`
- `GET https://apis.ccbp.in/restaurants-list/offers`
- `GET https://apis.ccbp.in/restaurants-list?offset={offset}&limit=9&sort_by_rating={Highest|Lowest}`
- `GET https://apis.ccbp.in/restaurants-list/{restaurantId}`

## Authentication and Storage

- Successful login stores the JWT in the `jwt_token` cookie
- Cart items are stored in local storage under the `cartData` key
- Cart item objects use the shape:

```json
{
  "cost": 345,
  "quantity": 2,
  "id": "c3b24b72-3356-4c26-a2cf-8379eb9053cd",
  "imageUrl": "https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-2/chicken-salad-16.jpg",
  "name": "Chicken Salad"
}
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Start the app

```bash
npm start
```

The app runs on `http://localhost:3000`.

## Available Scripts

- `npm start` - Start the development server
- `npm test` - Run tests
- `npm run build` - Create a production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix lint issues in `src/`
- `npm run format` - Format files in `src/`
- `npm run run-all` - Run tests and lint fixes together

## Default Test Login

Use the API-provided sample credentials for quick testing:

- Username: `rahul`
- Password: `rahul@2021`

## Notes

- The app is responsive for desktop, tablet, and mobile layouts
- Protected pages redirect to `/login` when no JWT token is present
- Invalid URLs redirect to the not found page
