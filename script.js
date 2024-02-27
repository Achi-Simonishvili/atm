function atm() {
  const users = [
    {
      name: "John",
      surname: "Doe",
      pin: "1234",
      balance: Math.floor(Math.random() * 10000),
    },
    {
      name: "Jane",
      surname: "Smith",
      pin: "5678",
      balance: Math.floor(Math.random() * 10000),
    },
    {
      name: "Achi",
      surname: "Simonishvili",
      pin: "9012",
      balance: Math.floor(Math.random() * 10000),
    },
  ];

  // ამოწმებს თუ არის მომხმარებლის მიერ შეყვანილი სახელი array-ში.
  function nameValidation(usersArray, property, userInput) {
    for (let user of usersArray) {
      if (user[property].toLowerCase() === userInput.toLowerCase()) {
        return user;
      }
    }
    return false;
  }

  // თანხის შეტანის ფუნქცია
  function depositValidation() {
    let input;
    // უსასრულო ლუპი სანამ სასურველ შედეგს არ მივიღებთ
    while (true) {
      input = prompt("How much would you like to deposit?");

      if (input === null) {
        console.log("Deposit cancelled");
        alert("Deposit cancelled");
        return null;
      }
      if (input.trim() === "") {
        console.log("The deposit amount cannot be empty, please try again");
        alert("The deposit amount cannot be empty, please try again");
      } else if (!isNaN(input) && input > 0) {
        return parseFloat(input);
      } else {
        console.log("Invalid input, please try again");
        alert("Invalid input, please try again");
      }
    }
  }

  // თანხის გამოტანის ფუნქცია
  function withdrawValidation() {
    let input;
    // უსასრულო ლუპი სანამ სასურველ შედეგს არ მივიღებთ
    while (true) {
      input = prompt("How much would you like to withdraw?");

      if (input === null) {
        console.log("Withdrawal cancelled");
        alert("Withdrawal cancelled");
        return null;
      }
      if (input.trim() === "") {
        console.log("The withdrawal amount cannot be empty, please try again");
        alert("The withdrawal amount cannot be empty, please try again");
      } else if (!isNaN(input) && input > 0) {
        return parseFloat(input);
      } else {
        console.log("Invalid input, please try again");
        alert("Invalid input, please try again");
      }
    }
  }

  // ოპერაციის არჩევის ფუნქცია
  function actionValidInput(message, validInputs) {
    let input;
    while (true) {
      console.log(message);
      input = prompt(message);
      if (input === null) {
        return null;
      }
      // ვადარებთ მომხმარებლის მიერ შეყვანილ სიტყვას წინასწარ გაწერილ array-ს
      if (validInputs.includes(input)) {
        return input;
      } else {
        console.log("Invalid action, please try again");
        alert("Invalid action, please try again");
      }
    }
  }

  let userName;
  while (true) {
    userName = prompt("Enter your name:");

    // სახელის ვალიდაცია
    if (userName === null) {
      console.log("Login cancelled");
      alert("Login cancelled");
      return; // cancel-ის დაჭერის შემთხვევაში გამოვდივართ კოდიდან
    } else {
      let user = nameValidation(users, "name", userName);
      if (!user) {
        console.log("Invalid name");
        alert("Invalid name");
      } else {
        // გვარის ვალიდაცია
        let userSurname;
        while (true) {
          userSurname = prompt("Enter your surname: ");
          if (userSurname === null) {
            console.log("Login cancelled");
            alert("Login cancelled");
            return; // cancel-ის დაჭერის შემთხვევაში გამოვდივართ კოდიდან
          } else {
            if (
              !nameValidation(users, "surname", userSurname) ||
              nameValidation(users, "surname", userSurname).name !== user.name
            ) {
              console.log("Invalid surname");
              alert("Invalid surname");
            } else {
              let userPin;
              let wrongAttempts = 0; // არასწორი ცდების ცვლადი
              while (true) {
                userPin = prompt("Enter your PIN: ");
                if (userPin === null) {
                  console.log("Login cancelled");
                  alert("Login cancelled");
                  return; // cancel-ის დაჭერის შემთხვევაში გამოვდივართ კოდიდან
                  // თუ მომხმარებელი შეიყვანს მარტო სფეისს არ ვთვლით არასწორ ცდაში
                } else if (userPin.trim() === "") {
                  console.log("PIN cannot be empty, please try again");
                  alert("PIN cannot be empty, please try again");
                  continue;
                } else if (isNaN(userPin)) {
                  // თუ მომხმარებელი შეიყვანს ასოებს ციფრების ნაცვლად არ ვთვლით არასწორ ცდაში და ვეუბნებით რომ უნდა შეიუვანოს ციფრები
                  console.log("Please enter numbers only for your PIN.");
                  alert("Please enter numbers only for your PIN.");
                  continue;
                } else {
                  // თუ მომხმარებელი არასწორ პინს ვზრდით არასწორი ცდების რაოდენობას
                  if (!user.pin || user.pin !== userPin) {
                    wrongAttempts++;
                    console.log("Invalid PIN.");
                    alert("Invalid PIN.");
                    // თუ არასწორი ცდების რაოდენობა არის 3 ვბლოკავთ მომხმარებელს
                    if (wrongAttempts === 3) {
                      console.log(
                        "Too many wrong attempts. Your account is blocked."
                      );
                      alert(
                        "Too many wrong attempts. Your account is blocked."
                      );
                      return;
                    }
                  } else {
                    console.log(`Hello ${user.name} ${userSurname}`);
                    alert(`Hello ${user.name} ${userSurname}`);
                    while (true) {
                      let action = actionValidInput(
                        "Please write:\n'deposit' - to deposit money \n'withdraw' - to withdraw money \n'balance' - to check your balance",
                        ["deposit", "withdraw", "balance"]
                      );
                      if (action === null) {
                        console.log("Action cancelled");
                        alert("Action cancelled");
                        return;
                      } else if (action === "balance") {
                        console.log(`Your balance is: ${user.balance}₾`);
                        alert(`Your balance is: ${user.balance}₾`);
                      } else if (action === "deposit") {
                        let deposit = depositValidation();
                        if (deposit !== null) {
                          user.balance += deposit;
                          console.log(
                            `Deposit successful. Your new balance is ${user.balance}₾`
                          );
                          alert(
                            `Deposit successful. Your new balance is ${user.balance}₾`
                          );
                        }
                      } else if (action === "withdraw") {
                        let withdraw = withdrawValidation();
                        if (withdraw !== null) {
                          if (user.balance < withdraw) {
                            console.log("Insufficient funds.");
                            alert("Insufficient funds.");
                          } else {
                            user.balance -= withdraw;
                            console.log(
                              `Withdrawal successful. Your new balance is ${user.balance}₾`
                            );
                            alert(
                              `Withdrawal successful. Your new balance is ${user.balance}₾`
                            );
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

atm();
