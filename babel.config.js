module.exports = {
  presets: [
    // traduz o js que o browser ainda não entende
    // exemplo: import, export, arrow functions, classes...
    '@babel/preset-env',
    // traduz o próprio react para o browser
    // exemplo: jsx
    '@babel/preset-react',
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
}
