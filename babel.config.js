module.exports = {
  presets: ['module:@react-native/babel-preset','nativewind/babel'],
  // presets: ['<existing presets>', 'nativewind/babel'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }]
  ]
};