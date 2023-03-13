export function getMotivationalPictures() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockedResponse = [
        "images/motivational-pictures/motivation1.webp",
        "images/motivational-pictures/motivation2.webp",
        "images/motivational-pictures/motivation3.webp",
      ];
      resolve(mockedResponse);
    }, 700);
  });
}
