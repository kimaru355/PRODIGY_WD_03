import { useState } from "react";
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
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [allButtons, setAllButtons] = useState([]);

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
      if (currentPlayer == "X") {
        setCurrentPlayer("O");
        setCurrentPlayerUI(`${commonPlayerUI} ${bg[1]}`);
        setCurrentPlayerBG(bg[1]);
        setCurrentPlayerColor("text-pink-thick");
        event.target.className = `w-full h-full rounded-2xl text-5xl font-bold text-green-thick ${bg[0]}`;
        setResetButtonUI(`${bg[1]} ${buttonUI}`);
      } else {
        setCurrentPlayer("X");
        setCurrentPlayerUI(`${commonPlayerUI} ${bg[0]}`);
        setCurrentPlayerBG(bg[0]);
        setCurrentPlayerColor("text-green-thick");
        event.target.className = `w-full h-full rounded-2xl text-5xl font-bold text-pink-thick ${bg[1]}`;
        setResetButtonUI(`${bg[0]} ${buttonUI}`);
      }
      checkComplete(event.target.id);
    }
  };

  const checkComplete = (id) => {
    let currentBoard = [...board];
    let won = false;
    currentBoard[+id] = currentPlayer;
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
      console.log(currentPlayer, "wins");
    }
  };

  const handleReset = () => {
    setCurrentPlayer("X");
    setCurrentPlayerBG(bg[0]);
    setCurrentPlayerUI(`${bg[0]} ${commonPlayerUI}`);
    setCurrentPlayerColor("text-green-thick");
    setResetButtonUI(`${bg[0]} ${buttonUI}`);
    setBoard(["", "", "", "", "", "", "", "", ""]);
    allButtons.map((button) => {
      button.textContent = "";
      button.className = "w-full h-full";
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="py-8 text-white text-4xl font-quicksand-bold">
        Tic Tac Toe
      </h2>
      <div className="pb-20 grid grid-cols-3 w-full gap-4">
        <p className="text-white text-4xl px-4 bg-green-dark w-full text-end rounded-r-2xl">
          X
        </p>
        <div className="flex justify-center items-center text-2xl">
          <p className={`${currentPlayerColor}`}>
            Player {currentPlayer == "X" ? 1 : 2}
          </p>
        </div>
        <p className="text-white text-4xl bg-pink-dark w-full text-start px-4 rounded-l-2xl">
          O
        </p>
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-4 pb-20">
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="0"
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="1"
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="2"
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="3"
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="4"
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="5"
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="6"
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="7"
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
        <div className={currentPlayerUI}>
          <button
            type="button"
            id="8"
            className="w-full h-full"
            onClick={handleCurrentPlayer}
          ></button>
        </div>
      </div>
      <button className={resetButtonUI} onClick={handleReset}>
        <FaRedo className="w-8 h-8" fill="#9f9f9f" />
      </button>
    </div>
  );
}

export default TicTacToe;
