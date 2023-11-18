export const transformFirebaseErrorMessage = (errorMessage: string) => {
  if (errorMessage.includes("Firebase:")) {
    const message = errorMessage
      .split("/")[1]
      .slice(0, [1].length - 3)
      .split("-");

    const firstLetter = message[0][0].toUpperCase();
    const restOfTheMessage = message
      .filter((element) => element !== message[0])
      .map((element) => element);

    const finalMessage = `${firstLetter}${message[0].slice(
      1
    )} ${restOfTheMessage}!`;

    return finalMessage.replaceAll(",", " ");
  }
};
