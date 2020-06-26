import {View} from 'react-native';
import React from 'react';
import style from './style';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: this.props.maxTime,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer = () => {
    setInterval(() => {
      if (!this.state.timer <= 0) {
        this.setState({timer: this.state.timer - 1});
      }
    }, 1000);
  };

  updateTimerBar = () => {
    return (this.state.timer / this.props.maxTime) * 100 + '%';
  };

  timerToTime = () => {
    let minutes = 0;
    let seconds = 0;
    let timerState = this.state.timer;

    minutes = parseInt(timerState / 60, 10);
    seconds = parseInt(timerState % 60, 10);

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return minutes + ':' + seconds;
  };

  render() {
    return (
      <View style={style.timerbarFull}>
        <View style={[style.timerbar, {width: this.updateTimerBar()}]} />
      </View>
    );
  }
}

export default Timer;
