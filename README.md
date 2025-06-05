## Weather App (built with Vite + ReactJS)

### You can try the app here: https://vdweatherapp.netlify.app/

### Technical description

#### Start the app in your local environment based on your operating system:

- Linux/maxOS Bash: `export VITE_WEATHER_KEY=your_api_key_here && npm run dev`
- Windows PowerShell: `($env:VITE_WEATHER_KEY="your_api_key_here") -and (npm run dev)`
- Windows cmd.exe: set `"VITE_WEATHER_KEY=your_api_key_here" && npm run dev`

Replace your_api_key_here with your actual OpenWeather API key

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

#### Search component

- returns an input field
- imported into the `App` component, which renders the `Search` component in all cases
- receives 2 props: 
    - `search`: the value of the input field
    - `handleSearch`: the event handler for the `onChange` event
    the `App` component passes its `search` state variable as the `search` prop, and the `handleSearch` function as the `handleSearch` prop to the `Search` component
- whenever the input value changes (i.e., when the `onChange` event fires) the `handleSearch` function (defined in the `App` component) is called
- the `handleSearch` event handler funcion updates the `search` state variable with the current value of the input field (with the event's target's value --> the event is the `onChange` event, the event's target is the input field, the event's target's value is the current value of the input field) 
- when `handleSearch` runs and updates the state using `setSearch`, the component re-renders, as React triggers a re-render on every state change

#### SumCard component
- returns a `div` element with nested elements inside
- imported into the `App` component, and it is rendered when the `weather` and `forecast` properties in the `data` state are not null
- receives two props:
    - `weather`: the `weather` property from the `data` state in the `App` component, it contains the current `weather` data (including properties like `icon`, `name`, `temperature`, etc.).
    - `date`: the first item from the `dates` array in the `data` state, representing the current date and time
- calls the `setContainerBackground` method from the `weatherService` to determine the background style for the card, the returned value is applied to the `sum-container` `div` as inline CSS

#### ScrollFade component
- always returns a `div` with nested elements inside and conditionally an `h3`
    - there are multiple `Card` components inside the `div`, the first and the fourth `Card` components are conditionally rendered (only in the case of forecast)
    - the last two `Card` components are rendered only if the `weather.sunrise` and `weather.sunset` exist
    - the `scroll-fade-left` div is rendered only if the `showLeftFade` state variable is true
    - the `scroll-fade-right` div is rendered only if the `showRightFade` state variable is true
- three built-in `hooks` are used:
    1. `useState`: `showLeftFade` and `showRightFade` state variables
    2. `useEffect`: the side effect which checks (`checkFadeVisibility` function) whether the container needs a visible, it runs only after the first render (empty dependency array)
        `checkFadeVisibility` function: 
            - if the `container` variable does not exist, the function does nothing (`return`), otherwise:
            - if the scrolling is started (`scrollLeft > 0` is true), it sets the `showLeftFade` state variable to true (and causes a re-render, so the `div` with the `class` `scroll-fade-left` is rendered)
            - if the visible area (`scrollLeft + clientWidth`) is smaller than the full width (`scrollWidth - 1`), that means that the user did not reach the right side, so it sets the `showRightFade` state variable to true (and causes a re-render, so the `div` with the `class` `scroll-fade-right` is rendered)
            - the function is is added as event handler function to the events scroll and resize
            - cleanup for the event listeners is done in the useEffect return function (effect cleanup)
    3. `useRef`: tracks the direct parent `div` of the `Card` elements

#### LineChart component
- returns a `div` element that contains a `Line chart` from `react-chartjs-2`
- imported into the `App` component where it is rendered to display weather forecast data for a specific date
- receives two props:
    - `data`: an array of weather data, where each item contains the hour, humidity, temperature, and windSpeed values for a given hour
    - `date`: a string representing the forecast date, which is displayed in the chart's title
- uses the `useState` and `useEffect` hooks to track the window's width and adjust font size dynamically based on the screen size
- configures the `chartData` with three datasets for humidity, temperature, and windspeed, each with custom labels, colors, and data points
- applies the `chartjs-plugin-datalabels` plugin to display data values directly on the chart with custom formatting
- defines options to configure chart appearance such as grid, ticks, title, and legend, with dynamic font size depending on the window width
- the chart is rendered with responsive: true to ensure it adjusts properly when the window is resized

#### Card component

- returns a `div` element with nested elements inside
- imported into the `ScrollFade` component, which renders the `Card` multiple times along with other elements
- receives seven props: 
    -   `data`: a single piece of weather data
    -   `unit`: the unit of the single piece of weather data
    -   `parameterName`: the name of the single piece of weather data
    -   `icon`: a descriptive image representing the weather data, coming from the React Icons library
    -   `containerStyle`: an object with CSS properties and values from the `setContainerBackground` method, specifically for the forecast card that has an image background
    -   `hasImg`: a boolean value indicating whether the card has an image background (true for the forecast card)
    -   `addition`: additional text displayed after the weather data and its unit
- conditionally renders elements based on the value of `hasImg`:
    - if `hasImg` is true, the component will return a card with an overlay and content
    - if `hasImg` is false, it will return a simple card with the weather data and unit, along with any additional text

#### Footer component
- returns a `footer` element with nested elements inside
- displays data sources with links to:
    - OpenWeatherMap for weather data
    - Pixabay for images used in the app
    - displays developer information with a link to the developer's GitHub profile
    - includes a copyright statement with the year and app name

#### Weather service

- the OpenWeatherMap API is used
- the `axios` library is used to fetch the data
- the `getWeather` function takes one parameter: city
- the `getWeather` function is called with the `search` state variable as its argument in the `App` component
- the `getWeather` function returns the `API` response data using the `then` method of axios; if an error occurs it is caught with the  `catch` method and the function returns an empty string

#### Dependencies
- React Icons: 
    command to install: `npm install react-icons`
    https://react-icons.github.io/react-icons/
- Chart.js --> react-chartjs-2:
    command to install: `npm install chart.js react-chartjs-2`

#### Additional notes

- if a React app is created with Vite, environment variable names must start with `VITE_`
- `useRef` keeps track of DOM elements or variables, without causing the re-rendering of the component
        - the current property is used to store the current value, and even if the current value changes, it will not re-render the component, which always happens in the case of state management
- in the earlier version of the app, the city.list.json.gz file was downloaded from from: https://bulk.openweathermap.org/sample/ --> after extraction, the file contains data with a reduced set of information, just city ids and names, which can be processed using the following `Node.js` code:
    ```javascript
    const fs = require('fs');

    const inputFile = './city.list.json';
    const outputFile = './city-min.json';

    try {
        const rawData = fs.readFileSync(inputFile, 'utf8');
        const cities = JSON.parse(rawData);

        const simplifiedCities = cities.map(city => ({
            id: city.id,
            name: city.name
        }));

        fs.writeFileSync(outputFile, JSON.stringify(simplifiedCities, null, 2), 'utf8');
        console.log(`✅ ${simplifiedCities.length} cities saved to: ${outputFile}`);
    } catch (err) {
        console.error('❌ An error occurred:', err.message);
    }
- weather and forecast data from: https://openweathermap.org/

### User Guide

The layout of this weather app was designed with a mobile-first approach, which is why the following screenshots were taken on a mobile device.

Type a place name on the line

![0](https://github.com/user-attachments/assets/3d85c9b3-ff41-4732-bf6a-bde90f586d40)

The app takes a moment to process, then displays the current weather and forecast data.
  
![1](https://github.com/user-attachments/assets/f7262d15-27d4-4d0c-b212-2208687a7658)
![2](https://github.com/user-attachments/assets/ff513a8b-8b35-467f-ad87-efaa89199f64)
![3](https://github.com/user-attachments/assets/645ed0d0-4417-4c2e-8e73-ae46927c6222)
![4](https://github.com/user-attachments/assets/141e1088-ae99-473f-9186-ae030fd840cf)
![6](https://github.com/user-attachments/assets/d31818b7-3ce0-49ff-ac33-2a1b208b068b)

According to the current weather or time, the app's appearance changes.
The app's appearance at night:
(In the case shown in the screenshot below, there is no 'Forecast For The Rest Of The Day' chart because the last forecast data is for 10 p.m.)

![4418f4d5-a3cd-4da0-80ef-03970a4d3be1](https://github.com/user-attachments/assets/c58530ad-a8b6-45b0-8f6e-181ccbc637a1)
![cc0654a3-896c-4328-9950-280f1589cb6c](https://github.com/user-attachments/assets/3b373876-a8a6-4ca3-aec0-9fd2268814de)
![d0a11a8a-ffe8-44cf-acb4-2c5af6e72f6e](https://github.com/user-attachments/assets/e76332a9-200f-43ca-a819-e538618cccbb)
![2bddb6a2-7b2b-4a70-a34c-094aa1497be1](https://github.com/user-attachments/assets/0aea51ea-5bf5-49c2-ae3d-e6da8b3db54e)
![3ce395fe-48f4-42c2-903f-2da672f61d46](https://github.com/user-attachments/assets/512be9c7-cf80-4253-aeb7-9477597d3e7e)

The app's appearance when the current weather is sunny and warm:

![1](https://github.com/user-attachments/assets/8384feae-e2eb-4534-85b6-e91fd1c1a9cd)
![2](https://github.com/user-attachments/assets/8c76943b-dfa3-43d9-b8b6-445ad732ba64)
![3](https://github.com/user-attachments/assets/ca117f92-fc14-45c4-ad97-ce11a73f941b)
![4](https://github.com/user-attachments/assets/e8f4d224-9337-433f-8abf-c0a60f616e6f)







