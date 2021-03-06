import Sound from 'react-native-sound';

function play(soundName) {
  const sound = new Sound(`${soundName}.mp3`, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    //loaded successfully
    console.log(
      'duration in seconds: ' +
        sound.getDuration() +
        'number of channels: ' +
        sound.getNumberOfChannels(),
    );

    // Play the sound with an onEnd callback
    sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  });
}

export function playInventorySound() {
  play('inventory');
}

export function playScanSound() {
  play('scan');
}

export function playDeleteSound() {
  play('delete2');
}

export function playClueSound() {
  play('clue3');
}

export function playRetrySound() {
  play('retry');
}

export function playGoSound() {
  play('go');
}

export function playLoseSound() {
  play('lose');
}

export function playModalSound() {
  play('modal');
}

export function playSwitchSound() {
  play('switchButton');
}

export function playThrowSound() {
  play('throwButton');
}

export function playWinSound() {
  play('win');
}

export function playTaserSound() {
  play('taser');
}
