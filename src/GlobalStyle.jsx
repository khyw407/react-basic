import { createGlobalStyle } from 'styled-components';

let GlobalStyle = createGlobalStyle`

html, body {
  font-size: 14px;
  overflow-x: hidden;
}

body {
  margin: 0;
  font-family: "Noto Sans KR", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

body a {
  color: inherit;
  text-decoration: none;
}

body a:hover {
  color: inherit;
  text-decoration: none;
}

@media (min-width: 1280px) {
  .MuiTouchRipple-root {
    display: none;
  }
}

* {
  -webkit-overflow-scrolling: touch;
}

html, body, #root {
  height: 100%;
}

.MuiPickersCalendarHeader-dayLabel {
  font-size: 12px;
}
.MuiPickersDay-day .MuiTypography-root {
  font-size: 14px;
}

`;

export default GlobalStyle;
