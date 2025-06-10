import "../styles/dictionary-results.css";

export default function DictionaryResults({
  data,
  searchTerm,
  isReversed,
  onResetSearch,
}) {
  // Filtrer les données selon le terme de recherche
  const filteredData = data.filter((entry) => {
    if (!searchTerm) return true;

    if (isReversed) {
      // Pour la recherche en français, vérifier dans toutes les traductions possibles
      const frenchTerms = Array.isArray(entry.french)
        ? entry.french
        : [entry.french];
      return frenchTerms.some(
        (term) => term && term.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      // Pour la recherche en Kaamelott
      return entry.kaamelott.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  // Trier les données par ordre alphabétique selon la langue affichée
  const sortedData = [...filteredData].sort((a, b) => {
    if (isReversed) {
      // Trier par le terme français
      const termA = Array.isArray(a.french) ? a.french[0] : a.french;
      const termB = Array.isArray(b.french) ? b.french[0] : b.french;
      return termA.toLowerCase().localeCompare(termB.toLowerCase(), "fr");
    } else {
      // Trier par le terme Kaamelott
      return a.kaamelott
        .toLowerCase()
        .localeCompare(b.kaamelott.toLowerCase(), "fr");
    }
  });

  if (sortedData.length === 0 && searchTerm) {
    return (
      <div className="no-results">
        <a
          href="https://www.missabrevis.com/glossaire//"
          className="site-link"
          target="_blank"
        >
          Pas moyen de piger un broc de ce qu'il dit...
        </a>
        <p>Aucun résultat trouvé pour "{searchTerm}"</p>
        <p className="quote">« Bon bah il faut tout recommencer. »</p>
        <p className="quote">
          « Hé bah ouais, du coup faut que j'aille apprendre à lire, que je
          revienne... j'en ai pour des plombes. »
        </p>
        <button className="reset-search-button" onClick={onResetSearch}>
          Voir tous les mots
        </button>
      </div>
    );
  }

  return (
    <div className="results-container">
      {sortedData.map((entry, index) => (
        <div key={index} className="dictionary-entry">
          <div className="entry-header">
            <h3 className="term">
              {isReversed
                ? Array.isArray(entry.french)
                  ? entry.french.join(", ")
                  : entry.french
                : entry.kaamelott}
            </h3>
            <span className="translation">
              {isReversed
                ? entry.kaamelott
                : Array.isArray(entry.french)
                ? entry.french.join(", ")
                : entry.french}
            </span>
          </div>

          {entry.definition && <p className="definition">{entry.definition}</p>}

          {entry.example && (
            <div className="example">
              <p className="quote">« {entry.example} »</p>
              {entry.character && (
                <p className="character">— {entry.character}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
