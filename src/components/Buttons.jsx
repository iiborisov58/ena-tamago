import React from 'react';

const Buttons = ({ onAction, reaction }) => (
  <div className="buttons">
    <button onClick={() => onAction('pet')}>Погладить</button>
    <button onClick={() => onAction('feed')}>Покормить</button>
    <button onClick={() => onAction('hit')}>Ударить</button>
    <button onClick={() => onAction('sleep')}>Уложить спать</button>
    {reaction && <div className="reaction">{reaction}</div>}
  </div>
);

export default Buttons;
