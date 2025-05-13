export function humaniseContent(text) {
    if (!text) return "";
  
    let sentences = text.split(". ").map(s => s.trim()).filter(Boolean);
    const humanPhrases = ["Interestingly,", "Typically,", "As it turns out,", "In many cases,", "More often than not,", "Sometimes,"];
  
    for (let i = 0; i < Math.min(2, sentences.length); i++) {
      const idx = Math.floor(Math.random() * sentences.length);
      sentences[idx] = humanPhrases[Math.floor(Math.random() * humanPhrases.length)] + " " + sentences[idx];
    }
  
    for (let i = 0; i < 2; i++) {
      const idx1 = Math.floor(Math.random() * sentences.length);
      const idx2 = Math.floor(Math.random() * sentences.length);
      [sentences[idx1], sentences[idx2]] = [sentences[idx2], sentences[idx1]];
    }
  
    const typoTargets = [" and ", " to ", " is ", " the ", " for ", " that "];
    let combinedText = sentences.join(". ").replace(/\s+/g, ' ').trim();
    typoTargets.forEach(target => {
      if (Math.random() < 0.2) {
        combinedText = combinedText.replace(target, target.trim() + ' ');
      }
    });
  
    const replacements = [
      { find: "will ", replace: "is likely to " },
      { find: "can ", replace: "may " },
      { find: "ensures ", replace: "helps ensure " },
      { find: "provides ", replace: "typically provides " },
      { find: "offers ", replace: "can offer " },
    ];
    replacements.forEach(({ find, replace }) => {
      if (Math.random() < 0.5) {
        combinedText = combinedText.replaceAll(find, replace);
      }
    });
  
    return combinedText;
  }
  