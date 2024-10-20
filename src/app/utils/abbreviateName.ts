const abbreviateName = (name: string) => {
  if (name) {
    const splitedWords = name.split(" ");
    if (splitedWords.length) {
            return splitedWords[0].charAt(0).toUpperCase()
    }
    return splitedWords
  }
  return name;
};

export default abbreviateName;
