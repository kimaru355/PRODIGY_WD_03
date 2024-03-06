import { useState, useRef } from "react";
import { FaRedo } from "react-icons/fa";

function TicTacToe() {
  const commonPlayerUI = "w-20 h-20 rounded-2xl text-2xl";
  const buttonUI = "flex justify-center items-center h-14 w-14 rounded-full";
  const bg = [
    "bg-gradient-to-t from-green-dark to-green-light",
    "bg-gradient-to-t from-pink-dark to-pink-light",
  ];
  const [currentPlayerBG, setCurrentPlayerBG] = useState(bg[0]);
  const [currentPlayerUI, setCurrentPlayerUI] = useState(
    `${commonPlayerUI} ${currentPlayerBG}`
  );
  const [currentPlayerColor, setCurrentPlayerColor] =
    useState("text-green-thick");
  const [resetButtonUI, setResetButtonUI] = useState(
    `${currentPlayerBG} ${buttonUI}`
  );
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [currentPlayers, setCurrentPlayers] = useState([1, 2]);
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [allButtons, setAllButtons] = useState([]);
  const [players, setPlayers] = useState({ one: 0, tie: 0, two: 0 });
  const [choosePlayer, setChoosePlayer] = useState(false);
  const zeroRef = useRef();
  const oneRef = useRef();
  const twoRef = useRef();
  const threeRef = useRef();
  const fourRef = useRef();
  const fiveRef = useRef();
  const sixRef = useRef();
  const sevenRef = useRef();
  const eightRef = useRef();

  const handleCurrentPlayer = (event) => {
    if (event.target.textContent == "") {
      event.target.textContent = currentPlayer;
      setBoard((prevBoard) => {
        let newBoard = [...prevBoard];
        newBoard[event.target.id] = currentPlayer;
        return newBoard;
      });
      setAllButtons((prevButtons) => {
        let newButtons = [...prevButtons];
        newButtons.push(event.target);
        return newButtons;
      });
      if (currentPlayer == "X" && currentPlayers[1] !== 0) {
        setCurrentPlayer("O");
        setCurrentPlayerUI(`${commonPlayerUI} ${bg[1]}`);
        setCurrentPlayerBG(bg[1]);
        setCurrentPlayerColor("text-pink-thick");
        event.target.className = `w-full h-full rounded-2xl text-5xl font-bold text-green-thick ${bg[0]}`;
        setResetButtonUI(`${bg[1]} ${buttonUI}`);
      } else if (currentPlayer == "O" && currentPlayers[1] !== 0) {
        setCurrentPlayer("X");
        setCurrentPlayerUI(`${commonPlayerUI} ${bg[0]}`);
        setCurrentPlayerBG(bg[0]);
        setCurrentPlayerColor("text-green-thick");
        event.target.className = `w-full h-full rounded-2xl text-5xl font-bold text-pink-thick ${bg[1]}`;
        setResetButtonUI(`${bg[0]} ${buttonUI}`);
      } else if (currentPlayers[1] == 0) {
        event.target.className = `w-full h-full rounded-2xl text-5xl font-bold text-green-thick ${bg[0]}`;
      }
      let won = checkComplete(event.target.id);
      if (!won && currentPlayers[1] === 0 && allButtons.length < 8) {
        let last = botPlay(event.target.id);
        checkComplete(event.target.id, last);
      }
    }
  };

  const checkComplete = (id, last = null) => {
    let currentBoard = [...board];
    let won = false;
    currentBoard[+id] = currentPlayer;
    last !== null ? (currentBoard[+last] = "O") : null;
    if (
      currentBoard[0] === currentBoard[1] &&
      currentBoard[0] === currentBoard[2] &&
      currentBoard[0] !== ""
    ) {
      won = true;
    } else if (
      currentBoard[3] === currentBoard[4] &&
      currentBoard[3] === currentBoard[5] &&
      currentBoard[3] !== ""
    ) {
      won = true;
    } else if (
      currentBoard[6] === currentBoard[7] &&
      currentBoard[6] === currentBoard[8] &&
      currentBoard[6] !== ""
    ) {
      won = true;
    } else if (
      currentBoard[0] === currentBoard[3] &&
      currentBoard[0] === currentBoard[6] &&
      currentBoard[0] !== ""
    ) {
      won = true;
    } else if (
      currentBoard[1] === currentBoard[4] &&
      currentBoard[1] === currentBoard[7] &&
      currentBoard[1] !== ""
    ) {
      won = true;
    } else if (
      currentBoard[2] === currentBoard[5] &&
      currentBoard[2] === currentBoard[8] &&
      currentBoard[2] !== ""
    ) {
      won = true;
    } else if (
      currentBoard[0] === currentBoard[4] &&
      currentBoard[0] === currentBoard[8] &&
      currentBoard[0] !== ""
    ) {
      won = true;
    } else if (
      currentBoard[2] === currentBoard[4] &&
      currentBoard[2] === currentBoard[6] &&
      currentBoard[2] !== ""
    ) {
      won = true;
    }
    if (won) {
      setPlayers((prevPlayers) => {
        let newPlayers = { ...prevPlayers };
        last === null
          ? currentPlayer === "X"
            ? (newPlayers.one += 1)
            : (newPlayers.two += 1)
          : (newPlayers.two += 1);
        return newPlayers;
      });
      handleReset(currentBoard, id, last !== null ? null : null);
    }
    let tie = true;
    for (let i = 0; i < 9; i++) {
      currentBoard[i] === "" ? (tie = false) : null;
    }
    if (tie) {
      setPlayers((prevPlayers) => {
        let newPlayers = { ...prevPlayers };
        newPlayers.tie += 1;
        return newPlayers;
      });
      console.log("tie");
      handleReset(currentBoard, id, last !== null ? null : null);
    }
    console.log(id, tie, currentBoard);
    return tie || won;
  };

  const handleReset = (event, playerId = null, botId = null) => {
    let newButtons = [...allButtons];
    playerId !== null ? newButtons.push(sortButtons(playerId)) : null;
    botId !== null ? newButtons.push(sortButtons(botId)) : null;
    if (newButtons.length > 0) {
      setCurrentPlayer("X");
      setCurrentPlayerBG(bg[0]);
      setCurrentPlayerUI(`${bg[0]} ${commonPlayerUI}`);
      setCurrentPlayerColor("text-green-thick");
      setResetButtonUI(`${bg[0]} ${buttonUI}`);
      setBoard(["", "", "", "", "", "", "", "", ""]);
      newButtons.map((button) => {
        button.textContent = "";
        button.className = "w-full h-full";
      });
      setAllButtons([]);
    } else {
      if (players.one !== 0 || players.tie !== 0 || players.two !== 0) {
        setPlayers({ one: 0, tie: 0, two: 0 });
      } else {
        setChoosePlayer(!choosePlayer);
      }
    }
  };

  const sortButtons = (id) => {
    let button =
      id == zeroRef.current.id
        ? zeroRef
        : id == oneRef.current.id
        ? oneRef
        : id == twoRef.current.id
        ? twoRef
        : id == threeRef.current.id
        ? threeRef
        : id == fourRef.current.id
        ? fourRef
        : id == fiveRef.current.id
        ? fiveRef
        : id == sixRef.current.id
        ? sixRef
        : id == sevenRef.current.id
        ? sevenRef
        : id == eightRef.current.id
        ? eightRef
        : null;

    return button.current;
  };

  const botPlay = (id) => {
    let available = allButtons.map((button) => +button.id);
    available.push(+id);
    let botChoice;
    while (true) {
      botChoice = Math.floor(Math.random() * 8);
      if (!available.includes(botChoice)) {
        break;
      }
    }
    botChoice = sortButtons(botChoice);

    botChoice.textContent = "O";
    botChoice.className = `w-full h-full rounded-2xl text-5xl font-bold text-pink-thick ${bg[1]}`;
    setAllButtons((prevButtons) => {
      let newButtons = [...prevButtons];
      newButtons.push(botChoice);
      return newButtons;
    });
    return botChoice.id;
  };

  const handleOpponent = (choice) => {
    if (choice === "human") {
      setCurrentPlayers([1, 2]);
    } else if (choice === "bot") {
      setCurrentPlayers([1, 0]);
    }
    setChoosePlayer(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="py-8 text-white text-4xl font-quicksand-bold">
        Tic Tac Toe
      </h2>
      <div className="pb-16 grid grid-cols-3 w-full gap-4">
        <p className="text-white text-4xl px-4 bg-green-dark w-full text-end rounded-r-2xl">
          X
        </p>
        <div className="flex justify-center items-center text-2xl">
          <p className={`${currentPlayerColor}`}>
            {currentPlayers[1] === 2
              ? `Player ${currentPlayer == "X" ? 1 : 2}`
              : "Player"}
          </p>
        </div>
        <p className="text-white text-4xl bg-pink-dark w-full text-start px-4 rounded-l-2xl">
          O
        </p>
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-4">
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="0"
            ref={zeroRef}
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="1"
            ref={oneRef}
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="2"
            ref={twoRef}
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="3"
            ref={threeRef}
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="4"
            ref={fourRef}
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="5"
            ref={fiveRef}
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="6"
            ref={sixRef}
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="7"
            ref={sevenRef}
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="8"
            ref={eightRef}
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 place-items-center text-2xl py-8 font-bold">
        <p>{currentPlayers[1] === 2 ? "Player 1" : "Player"}</p>
        <p>Tie</p>
        <p>{currentPlayers[1] === 2 ? "Player 2" : "Bot"}</p>
        <p>{players.one}</p>
        <p>{players.tie}</p>
        <p>{players.two}</p>
      </div>
      <button className={resetButtonUI} onClick={handleReset}>
        <FaRedo className="w-8 h-8" fill="#9f9f9f" />
      </button>
      {choosePlayer && (
        <div className="w-full h-screen flex justify-center items-center absolute top-0 bg-slate-1">
          <div className="w-72 h-72 bg-blue-light absolute flex flex-col items-center gap-8 p-4 rounded-xl">
            <h3 className="text-2xl">Choose your opponent:</h3>
            <button
              type="button"
              className="text-2xl rounded-xl w-40 py-4 bg-pink-thick"
              onClick={() => handleOpponent("human")}
            >
              Human
            </button>
            <button
              type="button"
              className="text-2xl rounded-xl w-40 py-4 bg-green-thick"
              onClick={() => handleOpponent("bot")}
            >
              Bot
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicTacToe;
