## Weather App (built with Vite + ReactJS)

### Start the app based on your operating system:

- Linux/maxOS Bash: `export VITE_WEATHER_KEY=your_api_key_here && npm run dev`
- Windows PowerShell: `($env:VITE_WEATHER_KEY="your_api_key_here") -and (npm run dev)`
- Windows cmd.exe: set `"VITE_WEATHER_KEY=your_api_key_here" && npm run dev`

Replace your_api_key_here with your actual API key

### Technical description

#### Search component

- it returns an input field
- it is imported into the `App` component, which renders the `Search` component in all cases
- it receives 2 props: 
    - `search`: the value of the input field
    - `handleSearch`: the event handler for the `onChange` event
    the `App` component passes its `search` state variable as the `search` prop, and the `handleSearch` function as the `handleSearch` prop to the `Search` component
- whenever the input value changes (i.e., when the `onChange` event fires) the `handleSearch` function (defined in the `App` component) is called
- the `handleSearch` event handler funcion updates the `search` state variable with the current value of the input field (with the event's target's value --> the event is the `onChange` event, the event's target is the input field, the event's target's value is the current value of the input field) 
- when `handleSearch` runs and updates the state using `setSearch`, the component re-renders, as React triggers a re-render on every state change

#### Card component

- it returns a `div` element
- it is imported into the `App` component, which renders the `Card` component only if the `weather` state variable is not an empty string
- it receives one prop: 
    -   `data`: a single piece of weather data

#### App component

- it returns 
    - the `Search` component (always)
    - a `div` (only if the `weather` state variable is not an empty string), which contains:
        - an image
        - a paragraph
        - the `Card` component rendered multiple times
- 2 state variables are initialized:
    - `search`
    - `weather`
- the `handleSearch` event handler function is defined here
- an effect hook containing the `getWeather` function from the `weatherService` is executed:
    - after the app is loaded in the browser (i.e., after the initial render)
    - and every time the value of the `search` state variable changes
- once the promise resolves, the `weather` state is updated with the result
as a result, the component re-renders and returns not only the `Search` component, but also the image, paragraph, and multiple `Card` components

#### Weather service

- the OpenWeatherMap API is used
- the `axios` library is used to fetch the data
- the `getWeather` function takes one parameter: city
- the `getWeather` function is called with the `search` state variable as its argument in the `App` component
- the `getWeather` function returns the `API` response data using the `then` method of axios; if an error occurs it is caught with the  `catch` method and the function returns an empty string


#### Additional notes

- if a React app is created with Vite, environment variable names must start with `VITE_`
- the city.list.json.gz is downloaded from: https://bulk.openweathermap.org/sample/ --> after extraction the file data is reduced to just ids and names
- weather and forecast data from: https://openweathermap.org/