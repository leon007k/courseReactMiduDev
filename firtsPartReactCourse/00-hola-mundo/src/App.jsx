import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx';

export function App() {
  // * Esta funcion nos permite darle formato al username
  const formatUserName = (userName) => `@${userName}`;

  /*
   * si agregamos isFollowing sin un valor por defecto, este se iria con true. 
   */
  return (
    <section className="App">
      <TwitterFollowCard
        formatUserName={formatUserName}
        userName="fire"
        initialIsFollowing={true}>Miguel Sanchez</TwitterFollowCard>
      <TwitterFollowCard
        formatUserName={formatUserName}
        userName="cat">Milles Morales</TwitterFollowCard>
      <TwitterFollowCard
        formatUserName={formatUserName}>Ramon Dino</TwitterFollowCard>
    </section>
  );
}