import "../styles/header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h1>Dictionnaire Kaamelott</h1>
        <p className="tagline">
          « Moi j'ai appris à lire, hé ben je souhaite ça à personne... ! »
        </p>
      </div>
      <a
        href="https://www.missabrevis.com/"
        className="site-link"
        target="_blank"
      >
        Tous les dialogues de Kaamelott Livres I - VI
      </a>

      <div className="medieval-decoration"></div>
    </header>
  );
}
