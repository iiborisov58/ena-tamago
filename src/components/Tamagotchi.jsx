import React, { useState, useEffect } from 'react';
import phrases from '../data/phrases.json';

const Tamagotchi = () => {
  const [stats, setStats] = useState({ health: 100, hunger: 0, mood: 50 });
  const [reaction, setReaction] = useState('');
  const [filter, setFilter] = useState('');

  // Автоматическое изменение параметров со временем
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => {
        const newStats = {
          health: Math.max(prev.health - 0.5, 0),
          hunger: Math.min(prev.hunger + 1, 100),
          mood: Math.max(prev.mood - 0.3, 0)
        };

        // Логика вывода фраз при изменении параметров
        if (newStats.health < 30 && Math.random() > 0.7) {
          setReaction(phrases.healthDown[Math.floor(Math.random() * phrases.healthDown.length)]);
        } else if (newStats.hunger > 80 && Math.random() > 0.7) {
          setReaction(phrases.hungerUp[Math.floor(Math.random() * phrases.hungerUp.length)]);
        } else if (newStats.mood < 20 && Math.random() > 0.7) {
          setReaction(phrases.moodDown[Math.floor(Math.random() * phrases.moodDown.length)]);
        }

        return newStats;
      });
    }, 1000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(interval);
  }, []);

  // Обработка действий пользователя
  const handleAction = (action) => {
    setFilter(action);
    setTimeout(() => setFilter(''), 1000); // Сбрасываем фильтр через 1 секунду

    setStats(prev => {
      let newStats = { ...prev };

      switch (action) {
        case 'pet':
          newStats.mood = Math.min(newStats.mood + 10, 100);
          setReaction(phrases.pet[Math.floor(Math.random() * phrases.pet.length)]);
          break;
        case 'feed':
          newStats.hunger = Math.max(newStats.hunger - 20, 0);
          newStats.health = Math.min(newStats.health + 5, 100);
          newStats.mood = Math.min(newStats.mood + 5, 100);
          setReaction(phrases.feed[Math.floor(Math.random() * phrases.feed.length)]);
          if (newStats.hunger <= 0) {
            setReaction(phrases.hungerDown[Math.floor(Math.random() * phrases.hungerDown.length)]);
          }
          break;
        case 'hit':
          newStats.health = Math.max(newStats.health - 10, 0);
          newStats.mood = Math.max(newStats.mood - 20, 0);
          setReaction(phrases.hit[Math.floor(Math.random() * phrases.hit.length)]);
          if (newStats.health <= 30) {
            setReaction(phrases.healthDown[Math.floor(Math.random() * phrases.healthDown.length)]);
          }
          if (newStats.mood <= 20) {
            setReaction(phrases.moodDown[Math.floor(Math.random() * phrases.moodDown.length)]);
          }
          break;
        case 'sleep':
          newStats.health = Math.min(newStats.health + 15, 100);
          newStats.mood = Math.min(newStats.mood + 15, 100);
          newStats.hunger = Math.min(newStats.hunger + 5, 100);
          setReaction(phrases.sleep[Math.floor(Math.random() * phrases.sleep.length)]);
          if (newStats.health >= 80) {
            setReaction(phrases.healthUp[Math.floor(Math.random() * phrases.healthUp.length)]);
          }
          if (newStats.mood >= 70) {
            setReaction(phrases.moodUp[Math.floor(Math.random() * phrases.moodUp.length)]);
          }
          break;
        default:
          break;
      }

      return newStats;
    });
  };

  // Проверка состояния здоровья (игра окончена)
  useEffect(() => {
    if (stats.health <= 0) {
      alert('Ваш питомец погиб! Начните заново.');
      setStats({ health: 100, hunger: 0, mood: 50 });
    }
  }, [stats.health]);

  return (
    <div className="container">
      <img
        id="character"
        src="ena_plush.jpg"
        alt="Персонаж Тамагочи"
        className={filter}
      />
      <Stats health={stats.health} hunger={stats.hunger} mood={stats.mood} />
      <Buttons onAction={handleAction} reaction={reaction} />
    </div>
  );
};

export default Tamagotchi;