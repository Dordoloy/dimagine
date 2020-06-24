# dimagine

## **Installation :** 
  - Follow installation intructions of "React-Native CLI Quickstart" on React Native official website to install and configure all dependencies like NodeJS ( >= 8.3), Python2, Jdk8 (development kit Java >= 8).  
  - Get the git on the following link : https://github.com/Dordoloy/dimagine.
  - Run `npm install` to be sure to have all dependencies.
  - Go on this git, to see how to start the websocket : https://github.com/seb7474/WebSocket.

## **Execution :** 
  - Open a terminal in the application folder,
  - For Android :
    - Connect your phone to the computer
    - Run `npx react-native run-android`
    - If you have the following error: `undefined is not an object (evaluating 'RNSound.IsAndroid')`, do the following steps:
      - Stop any react-native processes you have running.
      - Uninstall your app from your emulator / phone.
      - Do react-native link react-native-sound
      - Clear Android build cache with cd android && ./gradlew cleanBuildCache
      - Run npx react-native run-android in app folder
  - For IOS :
    - Open XCode
    - Run the build (we still have some errors to correct)
