export function getMotivationalPictures() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockedResponse = [
        "images/motivational-pictures/motivation1.jpg",
        "images/motivational-pictures/motivation2.jpg",
        "images/motivational-pictures/motivation3.jpg",
      ];
      resolve(mockedResponse);
    }, 700);
  });
}
