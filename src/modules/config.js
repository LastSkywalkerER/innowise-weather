/* eslint-disable no-param-reassign */
/* eslint-disable indent */
export const settings = [{
    title: 'Temperature',
    options: [{
        name: 'Celcius',
      },
      {
        name: 'Fahrenheit',
      },
    ],
  },
  {
    title: 'Wind Speed',
    options: [{
        name: 'km/h',
      },
      {
        name: 'mp/h',
      },
    ],
  },
  {
    title: 'Theme',
    options: [{
        name: 'Dark',
      },
      {
        name: 'Light',
      },
    ],
  },
];

export const parsedSettings = settings.reduce((accum, setting) => {
  accum[setting.title] = setting.options.map((option) => option.name);
  return accum;
}, {});

export const startSettings = settings.reduce((accum, setting) => {
  accum[setting.title] = setting.options[0].name;
  return accum;
}, {});