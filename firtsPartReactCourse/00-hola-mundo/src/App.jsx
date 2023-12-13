import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard.jsx";

// * Esta funcion nos permite darle formato al username
const formatterUserName = (userName) => `@${userName}`;

// * Listado de usuarios
const users = [
  {
    formatUserName: formatterUserName,
    userName: "fire",
    name: "Miguel Sanchez",
    initialIsFollowing: true,
  },
  {
    formatUserName: formatterUserName,
    userName: "cat",
    name: "Milles Morales",
  },
  {
    formatUserName: formatterUserName,
    name: "Ramon Dino",
  },
];

export function App() {
  /*
   * si agregamos isFollowing sin un valor por defecto, este se iria con true.
   */
  /*  return (
    <section className="App">
      <TwitterFollowCard
        formatUserName={formatterUserName}
        userName="fire"
        initialIsFollowing={true}
      >
        Miguel Sanchez
      </TwitterFollowCard>
      <TwitterFollowCard formatUserName={formatterUserName} userName="cat">
        Milles Morales
      </TwitterFollowCard>
      <TwitterFollowCard formatUserName={formatterUserName}>
        Ramon Dino
      </TwitterFollowCard>
    </section>
  ); */

  /*
   * De esta manera recorremos el array de usuarios para darles formato y mostrar la info
   */
  return (
    <section className="App">
      {users.map(({ formatUserName, userName, name, initialIsFollowing }) => (
        <TwitterFollowCard
          key={userName + name}
          formatUserName={formatUserName}
          userName={userName}
          initialIsFollowing={initialIsFollowing}
        >
          {name}
        </TwitterFollowCard>
      ))}
    </section>
  );
}
