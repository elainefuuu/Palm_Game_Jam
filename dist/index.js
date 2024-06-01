const fixMobileFullHeight = () => {
  let vhUnit = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vhUnit}px`);
  window.scrollTo(0, 1);
};

window.onload = () => {
  let numTrees = 0;
  let money = 100;
  let fame = 0;
  let fameDueToTrees = 0;
  let moneyMultiplierRate = null;
  let moneyMultiplier = null;

  if (localStorage.getItem("numTrees") != null) {
    numTrees = parseInt(localStorage.getItem("numTrees"));
    for (let i = 1; i <= numTrees; i++) {
      document.getElementById(`palm-${i}`).style.display = "block";
    }
  }

  if (localStorage.getItem("currencyMoney") != null) {
    money = parseInt(localStorage.getItem("currencyMoney"));
  }

  if (localStorage.getItem("currencyFame") != null) {
    fame = parseInt(localStorage.getItem("currencyFame"));
  }

  if (localStorage.getItem("currencyFameDueToTrees") != null) {
    fameDueToTrees = parseInt(localStorage.getItem("currencyFameDueToTrees"));
  }

  if (numTrees >= 1) {
    moneyMultiplierRate = parseInt(
      (numTrees * 5) / Math.exp((numTrees - 1) / 16)
    );
  } else {
    moneyMultiplierRate = 1;
  }

  var isPaused = true;

  const maxTreesAllowed = 9;

  let modalMessage = document.getElementById("modal-message");
  let modalMessageTitle = document.getElementById("modal-message-title");
  let modalMessageDescription = document.getElementById(
    "modal-message-description"
  );

  document.getElementById("currency-money").innerText = `$${money}`;
  document.getElementById("currency-fame").innerText = `${
    fame + fameDueToTrees
  }`;
  document.getElementById(
    "actions-add-trees"
  ).innerText = `Add Tree: $${parseInt(
    70 + (numTrees - 1) * Math.exp(numTrees / 3)
  )}`;

  let restartGameElements = document.getElementsByClassName("restart-game");
  for (let i = 0; i < restartGameElements.length; i++) {
    restartGameElements[i].addEventListener("click", function () {
      localStorage.clear();
      setTimeout(() => {
        location.reload();
      }, 500);
    });
  }

  fixMobileFullHeight();

  // Sync device clock
  setInterval(() => {
    document.getElementsByClassName("current-time")[0].innerText = moment(
      new Date()
    ).format("HH: mm: ss");
  }, 1000);

  let gameOver = () => {
    document.getElementById("modal-gameover").style.display = "flex";
    isPaused = true;
    localStorage.clear();
  };

  // Losing condition check
  let fameCheck = () => {
    setInterval(() => {
      if (isPaused == false) {
        // if (fame >= 0 && hasSetPositiveFameMultiplier == false) {
        //   let multiplier = parseInt(1.25 * (fame / 100));
        //   setMoneyMultiplier(multiplier);
        //   hasSetPositiveFameMultiplier = true;
        //   hasSetNegativeFameMultiplier = false;
        // } else if (fame < 0 && hasSetNegativeFameMultiplier == false) {
        //   let multiplier = parseInt(0.5 * (1 + fame / -100));
        //   setMoneyMultiplier(multiplier);
        //   hasSetPositiveFameMultiplier = false;
        //   hasSetNegativeFameMultiplier = true;
        // }
        if (numTrees > 0) {
          fameDueToTrees = numTrees * 3;
          localStorage.setItem("currencyFameDueToTrees", fameDueToTrees);
        }
        document.getElementById("currency-fame").innerText = `${
          fameDueToTrees + fame
        }`;
        localStorage.setItem("currencyFame", fame);
        if (fame <= -100) {
          clearInterval(fameCheck);
          gameOver();
        }
      }
    }, 1000);
  };

  fameCheck();

  // Background Audio
  function playInitialAudio() {
    document.body.removeEventListener("click", playInitialAudio);
    document.getElementById("background-audio").volume = 0.2;
    document.getElementById("background-audio").play();
  }
  document.body.addEventListener("click", playInitialAudio);

  // Click Sound
  // let clickAudio = document.getElementById('click-audio');

  // Tell user that it is under construction
  let modal404 = document.getElementById("modal-404");
  let navElements = document.getElementsByClassName("nav-element");
  for (let i = 0; i < navElements.length; i++) {
    navElements[i].onclick = () => {
      modal404.style.display = "flex";
      isPaused = true;
    };
  }
  document.getElementById("nav-estate").onclick = null;

  let extrasElements = document.getElementsByClassName("extras-element");
  for (let i = 0; i < extrasElements.length; i++) {
    extrasElements[i].onclick = () => {
      modal404.style.display = "flex";
      isPaused = true;
    };
  }

  document.getElementsByClassName("settings-button")[0].onclick = () => {
    modal404.style.display = "flex";
    isPaused = true;
  };

  // Close modal
  let closeButtons = document.getElementsByClassName("close");
  let allModals = document.getElementsByClassName("modal");
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].onclick = () => {
      for (let j = 0; j < allModals.length; j++) {
        allModals[j].style.display = "none";
      }
      isPaused = false;
    };
  }

  const wildCardData = [
    {
      id: 1,
      promptTime: 3000,
      data: {
        tag: "IndonesiaMassDeforestation",
        description:
          "Indonesia has started mass deforestation by burning acres of palm oil fields. Your reputation as a palm oil company has decreased.",
        outcomeMoney: 0,
        outcomeFame: -10,
        outcomeMultiplier: 0,
        type: "notification",
      },
    },
    {
      id: 2,
      promptTime: 7000,
      data: {
        tag: "RSPOCertified",
        description:
          "A new regulation by RSPO is gaining popularity. Would you like to be part of it?",
        outcomeMoney: -20,
        outcomeFame: 0,
        outcomeMultiplier: 0,
        type: "decision",
      },
    },
    {
      id: 3,
      promptTime: 13000,
      data: {
        tag: "CheckIfRSPOCertified",
        description:
          "A strike has started in various countries for non-RSPO certified companies. People has began to dislike non-RSPO companies.",
        outcomeMoney: 0,
        outcomeFame: 30,
        outcomeMultiplier: 0,
        type: "notification",
      },
    },
    {
      id: 4,
      promptTime: 20000,
      data: {
        tag: "OilIsContaminated",
        description:
          "The palm oil has been contaminated due to a careless mistake done by your worker. Will you pretend that nothing has happened and continue shipping the oil?",
        outcomeMoney: 0,
        outcomeFame: -10,
        outcomeMultiplier: 0,
        type: "decision",
      },
    },
  ];

  const spawnTrees = (numTrees) => {
    numTrees += 1;
    localStorage.setItem("numTrees", numTrees);
    document.getElementById(`palm-${numTrees}`).style.display = "block";
    return numTrees;
  };

  const setMoneyMultiplier = (moneyPerSecond) => {
    document.getElementById("currency-money").innerText = `$${money}`;
    clearInterval(moneyMultiplier);
    if (moneyPerSecond != 0) {
      moneyMultiplier = setInterval(() => {
        if (isPaused == false) {
          money += parseInt(moneyPerSecond);
          document.getElementById("currency-money").innerText = `$${money}`;
          localStorage.setItem("currencyMoney", money);
        }
      }, 1000);
    }
  };

  let wildCard = document.getElementById("wildCard");
  // When the user clicks anywhere outside of the wildCard, close it

  const closeAndReset = () => {
    wildCard.style.display = "none";
    document.getElementById("wildCard-okay").style = "";
    document.getElementById("wildCard-yes").style = "";
    document.getElementById("wildCard-no").style = "";
    document.getElementById("wildCard-no-money").style = "";

    modalMessage.style.display = "none";

    document.getElementById("currency-money").innerText = `$${money}`;
    document.getElementById("currency-fame").innerText = `${
      fame + fameDueToTrees
    }`;
    setMoneyMultiplier(moneyMultiplierRate);
    isPaused = false;
  };

  const createWildCard = (data) => {
    let {
      tag,
      description,
      outcomeMoney,
      outcomeFame,
      outcomeMultiplier,
      type,
    } = data;
    document.getElementById("wildCard-description").innerText = description;
    document.getElementById(
      "wildCard-money"
    ).innerText = `Money: $${outcomeMoney}`;
    document.getElementById("wildCard-fame").innerText = `Fame: ${outcomeFame}`;
    if (type == "notification") {
      document.getElementById("wildCard-okay").style.display = "block";
      document.getElementById("wildCard-okay").style.marginRight = "0px";
      document.getElementById("wildCard-okay").innerText = "Okay";
      document.getElementById("wildCard-yes").style.display = "none";
      document.getElementById("wildCard-no").style.display = "none";

      if (tag == "CheckIfRSPOCertified") {
        let isRSPOCertified = localStorage.getItem("RSPOCertified");
        if (isRSPOCertified == null) {
          document.getElementById(
            "wildCard-fame"
          ).innerText = `Fame: ${-outcomeFame}`;
          outcomeFame = -outcomeFame;
        }
      }

      money += outcomeMoney;
      moneyMultiplierRate += outcomeMultiplier;
      fame += outcomeFame;

      localStorage.setItem("currencyMoney", money);
      localStorage.setItem("currencyFame", fame);
    } else if (type == "decision") {
      document.getElementById("wildCard-okay").style.display = "none";
      let playerMoney = money;
      if (playerMoney > Math.abs(outcomeMoney)) {
        document.getElementById("wildCard-yes").style.display = "block";
        document.getElementById("wildCard-no").style.display = "block";
        document.getElementById("wildCard-yes").onclick = () => {
          localStorage.setItem(tag, true);
          money += outcomeMoney;
          moneyMultiplierRate += outcomeMultiplier;
          fame += outcomeFame;

          localStorage.setItem("currencyMoney", money);
          localStorage.setItem("currencyFame", fame);
          closeAndReset();
        };
      } else {
        document.getElementById("wildCard-okay").innerText = "Pass";
        document.getElementById("wildCard-okay").style.display = "block";
        document.getElementById("wildCard-okay").style.marginRight = "0px";
        document.getElementById("wildCard-yes").style.display = "none";
        document.getElementById("wildCard-no").style.display = "none";
        document.getElementById("wildCard-no-money").style.display = "block";
      }
    }
    wildCard.style.display = "flex";
  };

  const startWildCardController = (wildCardData) => {
    let promptIndex = 0;
    let timeElapsed = 0;
    if (localStorage.getItem("timeElapsed") != null) {
      timeElapsed = parseInt(localStorage.getItem("timeElapsed"));
    }
    if (localStorage.getItem("promptIndex") != null) {
      promptIndex = parseInt(localStorage.getItem("promptIndex"));
    }
    setInterval(() => {
      if (isPaused == false && wildCardData[promptIndex] != null) {
        timeElapsed += 1000;
        localStorage.setItem("timeElapsed", timeElapsed);
        console.log(timeElapsed);
        if (timeElapsed >= wildCardData[promptIndex].promptTime) {
          isPaused = true;
          //   alert(wildCardData[promptIndex].data.description);
          createWildCard(wildCardData[promptIndex].data);
          promptIndex += 1;
          localStorage.setItem("promptIndex", promptIndex);
        }
      }
    }, 1000);
  };

  // Init

  if (numTrees >= 1) {
    startWildCardController(wildCardData);
  }

  setTimeout(() => {
    setMoneyMultiplier(moneyMultiplierRate);
  }, 1000);

  document.getElementById("wildCard-okay").onclick = () => {
    closeAndReset();
  };
  document.getElementById("wildCard-no").onclick = () => {
    closeAndReset();
  };

  document.getElementById("modal-message-close").onclick = () => {
    closeAndReset();
  };

  document
    .getElementById("actions-add-trees")
    .addEventListener("click", function () {
      // TODO: check currency and minus currency
      let priceTree = parseInt(70 + (numTrees - 1) * Math.exp(numTrees / 3));
      if (numTrees != maxTreesAllowed && money >= priceTree) {
        numTrees = spawnTrees(numTrees);
        money -= priceTree;
        localStorage.setItem("currencyMoney", money);
        moneyMultiplierRate = parseInt(
          (numTrees * 5) / Math.exp((numTrees - 1) / 16)
        );

        setMoneyMultiplier(moneyMultiplierRate);
        document.getElementById(
          "actions-add-trees"
        ).innerText = `Add Tree: $${parseInt(
          70 + (numTrees - 1) * Math.exp(numTrees / 3)
        )}`;

        if (numTrees == 1) {
          startWildCardController(wildCardData);
        }
      } else if (numTrees == maxTreesAllowed) {
        isPaused = true;
        modalMessage.style.display = "flex";
        modalMessageTitle.innerText = "Alert!";
        modalMessageDescription.innerText =
          "Currentlt, the maximum amount of trees allowed that you are allowed to plant is 9 trees.";
      } else if (priceTree > money) {
        isPaused = true;
        modalMessage.style.display = "flex";
        modalMessageTitle.innerText = "Insufficient cash";
        modalMessageDescription.innerText =
          "You don't have enough cash to purchase another palm oil tree.";
      }
    });
};

window.onresize = () => {
  fixMobileFullHeight();
};
