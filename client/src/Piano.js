import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import './Piano.css';

/* global $ */ // Remove pesky warnings about jquery being undefined...

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
      const $element = $(event.currentTarget);
      console.log('GOT THERE');
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
