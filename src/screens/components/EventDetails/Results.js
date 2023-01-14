import React, { Fragment, useEffect, useState } from "react";
import close_img from "../../../images/close.png";
import edit_img from "../../../images/edit1.png";
import { useSelector } from "react-redux";
import Pagination from "../Pagination";
import ReadOnlyRow from "./ReadOnlyRow";
function Results() {
  // const currentRecords = [{ name: "rupesh", mobileNumber: "8076240766" }];
  console.log("called results");
  const token = useSelector((state) => state.auth.curruser.token);
  const [currentRecords, setCurrentRecords] = useState([
    {
      id: 21,
      name: "old team",
      college: "MNIT",
      leader: "Phoneix",
      staus: 1,
    },
    {
      id: 34,
      name: "new team",
      college: "MNIT",
      leader: "SKY",
      staus: 2,
    },
    {
      id: 38,
      name: "GREED",
      college: "MNIT",
      leader: "SKY",
      staus: 2,
    },
  ]);

  const [close, setClose] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [Pages, setNpage] = useState(1);
  const [decide, setDecide] = useState(false);
  const ResultsPaginate = () => {
    return (
      <Pagination
        nPages={Pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        apiCall={() => {}}
      />
    );
  };

  const data = {
    header: ["Sr.no", "Team ID", "Team Name", "College", "Team Leader"],
    value: ["index", "id", "name", "college", "leader"],
  };
  const status = 4;
  const Rdata = [
    {
      id: 21,
      name: "old team",
      college: "MNIT",
      leader: "Phoneix",
      staus: 1,
    },
    {
      id: 34,
      name: "new team",
      college: "MNIT",
      leader: "SKY",
      staus: 2,
    },
    {
      id: 38,
      name: "GREED",
      college: "MNIT",
      leader: "SKY",
      staus: 4,
    },
  ];

  const decide_winers = () => {
    return (
      <div
        className="createEvent-submit"
        style={{ marginTop: "0px", margin: "0px 6px" }}
        onClick={() => {
          setDecide(true);
        }}
      >
        Decide Winners
      </div>
    );
  };

  const close_btn = () => {
    return (
      <div
        onClick={() => {
          setClose(!close);
        }}
        className="close-result"
      >
        <img src={close ? edit_img : close_img}></img>
      </div>
    );
  };
  const [currRound, setRound] = useState(status);
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleRound = (roundNo) => {
    setRound(roundNo);
    //change the currentRecords According to the roundNo;
  };

  const roundBtn = (roundNo) => {
    return (
      <button
        className={roundNo == currRound ? "roundBtn activeRound" : "roundBtn "}
        onClick={() => {
          handleRound(roundNo);
        }}
      >
        Round {roundNo}
      </button>
    );
  };

  const roundTab = () => {
    const arr = Array.from({ length: status }, (_, index) => index + 1);
    return (
      <div className="roundTab">
        {arr.map((i) => {
          return roundBtn(i);
        })}
      </div>
    );
  };

  const CheckTeam = (value) => {
    console.log("cheked called");
    return (
      <div className="team-chk">
        <input type={"checkbox"} onClick={() => handleToggle(value)}></input>
        <label className="chk-label"> {currentRecords[value].name}</label>
      </div>
    );
  };

  const DecidePop = () => {
    return (
      <div className="createEvent-back">
        <button
          className=" close-decide"
          onClick={() => {
            setDecide(false);
          }}
        >
          <img src={close_img}></img>
        </button>
        <div
          className="createEvent-form"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {<div>{roundTab()}</div>}
          <div className="decideWindow">
            {currentRecords.map((value, i) => {
              return CheckTeam(i);
            })}
          </div>
          <div className="decide-bottom">
            <button className="decideNext">Move To Next Round</button>
            <button className="decideWinners">Declare Winners</button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    let newdata = [];
    checked.forEach((element) => {
      handleToggle(element);
    });
    setChecked([]);
    console.log("use effect");
    console.log(currRound);
    Rdata.forEach((element) => {
      console.log(element.staus);
      if (element.staus >= currRound) {
        newdata.push(element);
      }
    });
    console.log(newdata);
    setCurrentRecords(newdata);
  }, [currRound]);

  return (
    <div>
      {decide ? DecidePop() : <></>}
      <div style={{ margin: "0px 15px" }}>
        <div className="dashboard-function">
          <div className="dashboard-paginate"> {ResultsPaginate()}</div>
          <div className="dashboard-icons">
            {close_btn()}
            {decide_winers()}
          </div>
        </div>
        {roundTab()}
        <div className="tab-line"></div>
      </div>

      <form onSubmit={() => {}} className="resp-m-l-r teams">
        <table>
          <thead>
            <tr>
              {data.header.map((value, i) => (
                <th>{value}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((user, i) => (
              <Fragment>
                <ReadOnlyRow
                  data={{ ...user, index: i }}
                  value={data.value}
                  handleEditClick={() => {}}
                  handleDeleteClick={() => {}}
                />
              </Fragment>
            ))}
          </tbody>
        </table>
        {currentRecords.length != 0 ? (
          <></>
        ) : (
          <div
            style={{
              padding: "2px",
              boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.25)",
              borderRadius: "4px",
              margin: "5px",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            {" "}
            {"No data found"}
          </div>
        )}
      </form>
    </div>
  );
}

export default Results;