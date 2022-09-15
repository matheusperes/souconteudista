const plugins = [
  [
    'babel-plugin-transform-imports',
    {
      '@mui/icons-material': {
        transform: '@mui/icons-material/${member}',
        preventFullImport: true,
      },
    },
  ],
];

module.exports = { plugins };
