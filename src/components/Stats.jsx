import React from 'react';

const Stats = ({ health, hunger, mood }) => (
  <div className="stats">
    <div>Здоровье: <span>{Math.round(health)}%</span></div>
    <div>Голод: <span>{Math.round(hunger)}%</span></div>
    <div>Настроение: <span>{Math.round(mood)}%</span></div>
  </div>
);

export default Stats;
