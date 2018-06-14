import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import './Piano.css';

/* global Pizzicato $ */ // Remove pesky warnings about jquery being undefined...

const MIDDLE_C = 261;

const Key = (props) =>
  <div
    className={`Key-container ${props.color}`}
  ></div>

const Octave = (props) =>
  <div className="Octave-container">
    <Key {...props} color='white' keyNames={['C']} />
    <Key {...props} color='black' keyNames={['C#', 'Db']} />
    <Key {...props} color='white' keyNames={['D']} />
    <Key {...props} color='black' keyNames={['D#', 'Eb']} />
    <Key {...props} color='white' keyNames={['E']} />
    <Key {...props} color='white' keyNames={['F']} />
    <Key {...props} color='black' keyNames={['F#', 'Gb']} />
    <Key {...props} color='white' keyNames={['G']} />
    <Key {...props} color='black' keyNames={['G#', 'Ab']} />
    <Key {...props} color='white' keyNames={['A']} />
    <Key {...props} color='black' keyNames={['A#', 'Bb']} />
    <Key {...props} color='white' keyNames={['B']} />
  </div>

class Piano extends PureComponent {
  componentDidMount() {
    // Do a cool effect when you press the F# key
    $(ReactDOM.findDOMNode(this)).on('click', '.Key-container', (event) => {
      const $key = $(event.currentTarget);
      const $octave = $key.parent();
      const octave = $octave.index();
      const note = $key.index();
      console.log(octave, note);
      const freq = MIDDLE_C * Math.pow(2, octave) * Math.pow(2, note / 12);
      console.log(freq);

      var sineWave = new Pizzicato.Sound({
        source: 'wave',
        options: {
            frequency: freq
        }
      });

      sineWave.play();

      setTimeout(() => {
        sineWave.stop();
      }, 500);

    });
  }
  render() {
    return (
      <div className="Piano-container">
        {Array(this.props.numOctaves).fill().map((element, octave) =>
          <Octave
            key={`Octave-${octave}`}
            onPress={this.props.onPress.bind(null, octave)}
          />
        )}
      </div>
    );
  }
}

export default Piano;
