const theme = 'dark';
//const theme = 'light';
export const lightTheme = theme === 'light';

export const color = '#fff';
export const color2 = lightTheme ? 'white' : '#010e2c';
export const color3 = '#01579b';

if (lightTheme) {
  document.body.style.background = '#e1eaee';
  document.body.style.color = '#061a44';
}

export const lightBlueBackground = `background-color: ${color}`;
export const backgroundColor2 = `background-color: ${color2};`;
export const greenBackgroundColor = `background-color: ${color3};`;

export const fontColorBlue = `color: #01579b`;
export const fontColorWhite = `color: white`;
export const subtleBoxShadow = `box-shadow: 0px 0px 5px 1px ${
  lightTheme ? '#a9b6ff' : '#121d5b'
}`;
export const blueBoxShadow = `box-shadow: 0px 0px 8px 2px #01579b`;
export const greenBoxShadow = `box-shadow: 0px 0px 8px 2px #00ff00`;
export const redBoxShadow = `box-shadow: 0px 0px 8px 2px #ff6347`;

export const fontSizeBig = 'font-size: 2em';
export const fontSize1 = 'font-size: 1.5em;';
export const fontSize2 = 'font-size: 1.25em';
export const fontSize3 = 'font-size: .75em';

export const textAlignCenter = 'text-align: center;';
