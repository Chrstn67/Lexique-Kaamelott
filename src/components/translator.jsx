// "use client";

// import { useState, useEffect } from "react";
// import "../styles/translator.css";

// export default function Translator({ dictionaryData }) {
//   const [inputText, setInputText] = useState("");
//   const [outputText, setOutputText] = useState("");
//   const [direction, setDirection] = useState("kaamelott-to-french");
//   const [translationStats, setTranslationStats] = useState({
//     total: 0,
//     translated: 0,
//   });
//   const [debugMode, setDebugMode] = useState(false);

//   // Fonction pour normaliser le texte (minuscules, suppression des accents)
//   const normalizeText = (text) => {
//     return text
//       .toLowerCase()
//       .normalize("NFD")
//       .replace(/[\u0300-\u036f]/g, "");
//   };

//   // Fonction pour générer les variations grammaticales d'un mot
//   const generateWordVariations = (word) => {
//     const variations = new Set([word]);
//     const lowerWord = word.toLowerCase();

//     // Pluriels
//     if (!lowerWord.endsWith("s")) {
//       variations.add(`${lowerWord}s`);
//     } else if (lowerWord.endsWith("s") && lowerWord.length > 2) {
//       variations.add(lowerWord.slice(0, -1)); // Singulier
//     }

//     // Conjugaisons courantes (verbes du premier groupe)
//     if (lowerWord.endsWith("er") && lowerWord.length > 3) {
//       const stem = lowerWord.slice(0, -2);
//       // Présent
//       variations.add(`${stem}e`);
//       variations.add(`${stem}es`);
//       variations.add(`${stem}ons`);
//       variations.add(`${stem}ez`);
//       variations.add(`${stem}ent`);
//       // Imparfait
//       variations.add(`${stem}ais`);
//       variations.add(`${stem}ait`);
//       variations.add(`${stem}ions`);
//       variations.add(`${stem}iez`);
//       variations.add(`${stem}aient`);
//       // Futur
//       variations.add(`${stem}erai`);
//       variations.add(`${stem}eras`);
//       variations.add(`${stem}era`);
//       variations.add(`${stem}erons`);
//       variations.add(`${stem}erez`);
//       variations.add(`${stem}eront`);
//       // Passé simple
//       variations.add(`${stem}ai`);
//       variations.add(`${stem}as`);
//       variations.add(`${stem}a`);
//       variations.add(`${stem}âmes`);
//       variations.add(`${stem}âtes`);
//       variations.add(`${stem}èrent`);
//       // Participes
//       variations.add(`${stem}é`);
//       variations.add(`${stem}ée`);
//       variations.add(`${stem}és`);
//       variations.add(`${stem}ées`);
//       variations.add(`${stem}ant`);
//     }

//     // Verbes irréguliers courants
//     if (lowerWord === "être") {
//       variations.add("suis");
//       variations.add("es");
//       variations.add("est");
//       variations.add("sommes");
//       variations.add("êtes");
//       variations.add("sont");
//       variations.add("étais");
//       variations.add("était");
//       variations.add("étions");
//       variations.add("étiez");
//       variations.add("étaient");
//       variations.add("serai");
//       variations.add("seras");
//       variations.add("sera");
//       variations.add("serons");
//       variations.add("serez");
//       variations.add("seront");
//       variations.add("été");
//     } else if (lowerWord === "avoir") {
//       variations.add("ai");
//       variations.add("as");
//       variations.add("a");
//       variations.add("avons");
//       variations.add("avez");
//       variations.add("ont");
//       variations.add("avais");
//       variations.add("avait");
//       variations.add("avions");
//       variations.add("aviez");
//       variations.add("avaient");
//       variations.add("aurai");
//       variations.add("auras");
//       variations.add("aura");
//       variations.add("aurons");
//       variations.add("aurez");
//       variations.add("auront");
//       variations.add("eu");
//     } else if (lowerWord === "faire") {
//       variations.add("fais");
//       variations.add("fait");
//       variations.add("faisons");
//       variations.add("faites");
//       variations.add("font");
//       variations.add("faisais");
//       variations.add("faisait");
//       variations.add("faisions");
//       variations.add("faisiez");
//       variations.add("faisaient");
//       variations.add("ferai");
//       variations.add("feras");
//       variations.add("fera");
//       variations.add("ferons");
//       variations.add("ferez");
//       variations.add("feront");
//     }

//     // Variations spécifiques à Kaamelott
//     if (lowerWord === "buter") {
//       variations.add("bute");
//       variations.add("butons");
//       variations.add("butez");
//       variations.add("butent");
//     } else if (lowerWord === "radiner") {
//       variations.add("radine");
//       variations.add("radinent");
//       variations.add("radinons");
//     } else if (lowerWord === "piner") {
//       variations.add("pine");
//       variations.add("pinent");
//       variations.add("pinés");
//     }

//     return [...variations];
//   };

//   // Créer des dictionnaires pour la traduction dans les deux sens avec variations grammaticales
//   const createEnhancedDictionaries = () => {
//     // Dictionnaire Kaamelott -> Français (mots simples)
//     const k2fDict = new Map();
//     // Dictionnaire Français -> Kaamelott (mots simples)
//     const f2kDict = new Map();

//     // Dictionnaire pour les expressions composées (plusieurs mots)
//     const k2fPhrases = [];
//     const f2kPhrases = [];

//     // Dictionnaire de variations pour Kaamelott
//     const kaamelottVariations = new Map();

//     dictionaryData.forEach((entry) => {
//       const kaamelottTerm = entry.kaamelott.toLowerCase();
//       const frenchTerms = Array.isArray(entry.french)
//         ? entry.french
//         : [entry.french];

//       // Générer les variations pour le terme Kaamelott
//       let kaamelottVariants = [kaamelottTerm];

//       // Si c'est une expression composée, la traiter comme telle
//       if (kaamelottTerm.includes(" ")) {
//         // Ajouter l'expression aux phrases
//         k2fPhrases.push({
//           phrase: kaamelottTerm,
//           translations: frenchTerms,
//           original: entry.kaamelott,
//         });

//         // Générer des variations pour les expressions composées
//         const words = kaamelottTerm.split(/\s+/);
//         const variations = [];

//         // Générer des variations pour chaque mot de l'expression
//         for (let i = 0; i < words.length; i++) {
//           const wordVariations = generateWordVariations(words[i]);

//           // Créer de nouvelles expressions avec les variations
//           wordVariations.forEach((variation) => {
//             const newWords = [...words];
//             newWords[i] = variation;
//             variations.push(newWords.join(" "));
//           });
//         }

//         // Ajouter toutes les variations de l'expression
//         variations.forEach((variant) => {
//           if (variant !== kaamelottTerm) {
//             k2fPhrases.push({
//               phrase: variant,
//               translations: frenchTerms,
//               original: entry.kaamelott,
//               isVariation: true,
//             });
//           }
//         });
//       } else {
//         // Pour les mots simples, générer toutes les variations possibles
//         kaamelottVariants = generateWordVariations(kaamelottTerm);

//         // Ajouter chaque variation au dictionnaire
//         kaamelottVariants.forEach((variant) => {
//           k2fDict.set(variant, {
//             translations: frenchTerms,
//             original: entry.kaamelott,
//           });

//           // Stocker la relation entre la variation et le terme original
//           kaamelottVariations.set(variant, kaamelottTerm);
//         });
//       }

//       // Traiter chaque traduction française
//       frenchTerms.forEach((frenchTerm) => {
//         if (!frenchTerm) return;

//         const normalizedFrench = frenchTerm.toLowerCase();

//         // Si le terme français contient plusieurs mots, l'ajouter aux phrases
//         if (normalizedFrench.includes(" ")) {
//           f2kPhrases.push({
//             phrase: normalizedFrench,
//             translations: [entry.kaamelott],
//             original: frenchTerm,
//           });

//           // Générer des variations pour les expressions françaises
//           const words = normalizedFrench.split(/\s+/);
//           const variations = [];

//           // Générer des variations pour chaque mot de l'expression
//           for (let i = 0; i < words.length; i++) {
//             const wordVariations = generateWordVariations(words[i]);

//             // Créer de nouvelles expressions avec les variations
//             wordVariations.forEach((variation) => {
//               const newWords = [...words];
//               newWords[i] = variation;
//               variations.push(newWords.join(" "));
//             });
//           }

//           // Ajouter toutes les variations de l'expression
//           variations.forEach((variant) => {
//             if (variant !== normalizedFrench) {
//               f2kPhrases.push({
//                 phrase: variant,
//                 translations: [entry.kaamelott],
//                 original: frenchTerm,
//                 isVariation: true,
//               });
//             }
//           });
//         } else {
//           // Pour les mots simples, générer toutes les variations possibles
//           const frenchVariants = generateWordVariations(normalizedFrench);

//           frenchVariants.forEach((variant) => {
//             if (f2kDict.has(variant)) {
//               f2kDict.get(variant).translations.push(entry.kaamelott);
//               f2kDict.get(variant).originals.push(frenchTerm);
//             } else {
//               f2kDict.set(variant, {
//                 translations: [entry.kaamelott],
//                 originals: [frenchTerm],
//               });
//             }
//           });
//         }
//       });
//     });

//     // Trier les phrases par longueur (les plus longues d'abord pour éviter les remplacements partiels)
//     k2fPhrases.sort((a, b) => b.phrase.length - a.phrase.length);
//     f2kPhrases.sort((a, b) => b.phrase.length - a.phrase.length);

//     return { k2fDict, f2kDict, k2fPhrases, f2kPhrases, kaamelottVariations };
//   };

//   useEffect(() => {
//     translateText(inputText);
//   }, [inputText, direction]);

//   const translateText = (text) => {
//     if (!text) {
//       setOutputText("");
//       setTranslationStats({ total: 0, translated: 0 });
//       return;
//     }

//     const { k2fDict, f2kDict, k2fPhrases, f2kPhrases } =
//       createEnhancedDictionaries();

//     // Sélectionner les dictionnaires appropriés selon la direction
//     const wordDict = direction === "kaamelott-to-french" ? k2fDict : f2kDict;
//     const phraseList =
//       direction === "kaamelott-to-french" ? k2fPhrases : f2kPhrases;

//     // Normaliser le texte d'entrée tout en préservant la casse pour l'affichage final
//     const inputWords = text.split(/\s+/);
//     const normalizedText = text.toLowerCase();
//     let result = normalizedText;
//     let translatedCount = 0;
//     const debugInfo = [];

//     // D'abord, traduire les expressions composées (plusieurs mots)
//     phraseList.forEach(({ phrase, translations, original, isVariation }) => {
//       const regex = new RegExp(`\\b${phrase}\\b`, "gi");
//       if (regex.test(result)) {
//         const replacement = translations[0];
//         result = result.replace(regex, replacement);
//         translatedCount++;

//         if (debugMode) {
//           debugInfo.push({
//             type: "phrase",
//             from: phrase,
//             to: replacement,
//             original: original,
//             isVariation: isVariation,
//           });
//         }
//       }
//     });

//     // Ensuite, traduire les mots individuels
//     const words = result.split(/\s+/);
//     const totalWords = words.length;

//     const translatedWords = words.map((word, index) => {
//       // Préserver la ponctuation
//       const punctuation = word.match(/[.,!?;:]+$/);
//       const cleanWord = punctuation
//         ? word.slice(0, -punctuation[0].length)
//         : word;

//       // Préserver la casse originale
//       const isCapitalized =
//         inputWords[index] &&
//         inputWords[index].charAt(0) ===
//           inputWords[index].charAt(0).toUpperCase();

//       // Normaliser pour la recherche
//       const normalizedWord = normalizeText(cleanWord);

//       // Chercher dans le dictionnaire
//       if (wordDict.has(normalizedWord)) {
//         const { translations, original, originals } =
//           wordDict.get(normalizedWord);
//         let translation = translations[0]; // Prendre la première traduction par défaut

//         // Préserver la casse
//         if (isCapitalized && translation.length > 0) {
//           translation =
//             translation.charAt(0).toUpperCase() + translation.slice(1);
//         }

//         translatedCount++;

//         if (debugMode) {
//           debugInfo.push({
//             type: "word",
//             from: normalizedWord,
//             to: translation,
//             original:
//               direction === "kaamelott-to-french" ? original : originals[0],
//           });
//         }

//         return translation + (punctuation ? punctuation[0] : "");
//       }

//       return word; // Garder le mot original si pas de traduction
//     });

//     setOutputText(translatedWords.join(" "));
//     setTranslationStats({
//       total: totalWords,
//       translated: translatedCount,
//       debugInfo: debugMode ? debugInfo : null,
//     });
//   };

//   const toggleDirection = () => {
//     setDirection((prev) =>
//       prev === "kaamelott-to-french"
//         ? "french-to-kaamelott"
//         : "kaamelott-to-french"
//     );
//   };

//   const toggleDebugMode = () => {
//     setDebugMode(!debugMode);
//   };

//   return (
//     <div className="translator-container">
//       <div className="translator-header">
//         <div className="translation-direction">
//           <span
//             className={
//               direction === "kaamelott-to-french" ? "highlighted" : "dimmed"
//             }
//           >
//             Kaamelott
//           </span>
//           <button
//             type="button"
//             className="direction-toggle"
//             onClick={toggleDirection}
//             aria-label="Inverser la direction de traduction"
//           >
//             ⇄
//           </button>
//           <span
//             className={
//               direction === "french-to-kaamelott" ? "highlighted" : "dimmed"
//             }
//           >
//             Français
//           </span>
//         </div>
//       </div>

//       <div className="translator-content">
//         <div className="translator-input">
//           <textarea
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             placeholder={
//               direction === "kaamelott-to-french"
//                 ? "Entrez votre texte en Kaamelott..."
//                 : "Entrez votre texte en français..."
//             }
//           />
//         </div>

//         <div className="translator-output">
//           <textarea value={outputText} readOnly placeholder="Traduction..." />
//         </div>
//       </div>

//       <div className="translator-stats">
//         {inputText && (
//           <p>
//             {translationStats.translated} sur {translationStats.total} mots
//             traduits (
//             {Math.round(
//               (translationStats.translated /
//                 Math.max(1, translationStats.total)) *
//                 100
//             )}
//             %)
//           </p>
//         )}

//         {debugMode && translationStats.debugInfo && (
//           <div className="debug-info">
//             <h4>Informations de débogage:</h4>
//             <ul>
//               {translationStats.debugInfo.map((info, index) => (
//                 <li key={index}>
//                   {info.type === "phrase" ? "Expression" : "Mot"}: "{info.from}"
//                   → "{info.to}"{info.isVariation && " (variation)"}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//       <div className="translator-controls">
//         <button
//           type="button"
//           className="debug-toggle"
//           onClick={toggleDebugMode}
//           aria-label="Activer/désactiver le mode débogage"
//         >
//           {debugMode ? "Désactiver le débogage" : "Activer le débogage"}
//         </button>
//       </div>

//       <div className="translator-note">
//         <p>
//           Note: La traduction est basée uniquement sur les termes présents dans
//           notre dictionnaire.
//         </p>
//       </div>
//     </div>
//   );
// }
