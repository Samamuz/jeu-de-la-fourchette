// FAQ interactive avec transitions douces et accordéon
const faqData = [
  {
    question: "Comment jouer au jeu du nombre mystère ?",
    answer: "Entrez un nombre entre 0 et 100, validez, et suivez les indices pour trouver le nombre secret."
  },
  {
    question: "Comment recommencer une partie ?",
    answer: "Cliquez sur le bouton 'Recommencer' pour lancer une nouvelle partie sans recharger la page."
  },
  {
    question: "Le jeu est-il accessible sur mobile ?",
    answer: "Oui, l’interface est responsive et adaptée à tous les écrans."  },
  {
    question: "Puis-je jouer sans connexion Internet ?",
    answer: "Non, le jeu nécessite une connexion pour charger les ressources externes (polices et framework NES.css)."
  },
  {
    question: "Y a-t-il une limite de temps pour trouver le nombre ?",
    answer: "Non, vous pouvez prendre tout le temps nécessaire pour deviner le nombre mystère."
  },
  {
    question: "Que signifient les différents niveaux de difficulté ?",
    answer: "Les niveaux modifient la plage de nombres à deviner et le nombre de tentatives autorisées."  }
];

const faqContainer = document.getElementById('faq-container');

faqData.forEach((item, idx) => {
  const qBtn = document.createElement('button');
  qBtn.textContent = item.question;
  qBtn.className = 'faq-question nes-btn';
  qBtn.setAttribute('aria-expanded', 'false');
  qBtn.setAttribute('tabindex', '0');

  const ansDiv = document.createElement('div');
  ansDiv.textContent = item.answer;
  ansDiv.className = 'faq-answer';
  ansDiv.style.display = 'none';

  qBtn.addEventListener('click', () => {
    // Accordéon : fermer les autres
    document.querySelectorAll('.faq-answer').forEach((el, i) => {
      if (i !== idx) {
        el.style.display = 'none';
        el.previousSibling.setAttribute('aria-expanded', 'false');
      }
    });
    // Toggle affichage
    const expanded = qBtn.getAttribute('aria-expanded') === 'true';
    qBtn.setAttribute('aria-expanded', !expanded);
    ansDiv.style.display = expanded ? 'none' : 'block';
  });

  faqContainer.appendChild(qBtn);
  faqContainer.appendChild(ansDiv);
});
