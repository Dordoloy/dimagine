import Sound from 'react-native-sound';

export function playInventorySound() {
  const inventorySound = new Sound(
    'inventory.mp3',
    Sound.MAIN_BUNDLE,
    error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          inventorySound.getDuration() +
          'number of channels: ' +
          inventorySound.getNumberOfChannels(),
      );

      // Play the sound with an onEnd callback
      inventorySound.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    },
  );
}

export function playScanSound() {
  const scanSound = new Sound('scan.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log(
      'duration in seconds: ' +
        scanSound.getDuration() +
        'number of channels: ' +
        scanSound.getNumberOfChannels(),
    );

    // Play the sound with an onEnd callback
    scanSound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
}
