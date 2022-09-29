import React from "react";

export default function Box1() {
  //*****************************DECLARATION OF STATES *************************/
  const [tempList, setTempList] = React.useState("");
  const [tempList2, setTempList2] = React.useState("");

  const [statusValue, setStatusValue] = React.useState("");
  const [listItems, setListItems] = React.useState(() =>JSON.parse(localStorage.getItem("listItems")) || [
     {
      id: 0,
      title: "",
      content: "",
      status: false,
    },
  ]);
  const [progressList, setProgressList] = React.useState(() => JSON.parse(localStorage.getItem("progressList")) || [
    {
      id: 0,
      title: "",
      content: "",
      status: false,
    },
  ]);
  const [completeList, setcompleteList] = React.useState(() => JSON.parse(localStorage.getItem("completeList")) ||[
    {
      id: 0,
      title: "",
      content: "",
      status: false,
    },
  ]);

  /******************************FUNCTIONS********************************/
  React.useEffect(()=>{
    localStorage.setItem("listItems", JSON.stringify(listItems))
  },[listItems])
  React.useEffect(()=>{
    localStorage.setItem("progressList", JSON.stringify(progressList))
  },[progressList])
  React.useEffect(()=>{
    localStorage.setItem("completeList", JSON.stringify(completeList))
  },[completeList])
  function handleChange(event) {
    const { value } = event.target;
    setTempList(value);
  }
  function handleChange2(event) {
    const { value } = event.target;
    setTempList2(value);
  }

  function handleClick() {
    setListItems((prevListItems) => {
      return [
        ...prevListItems,
        {
          id: listItems.length,
          title: `${tempList2}`,
          content: `${tempList}`,
          status: false,
        },
      ];
    });
    setTempList("");
    setTempList2("");
  }

  function deleteItem(id) {
    const newList = listItems.filter((item) => item.id !== id);
    setListItems(newList);
  }

  function deleteItemProgressList(id) {
    const newList = progressList.filter((item) => item.id !== id);
    setProgressList(newList);
  }

  function progressClick(id) {
    const tempNewList = listItems.filter((item) => item.id === id);
    const newProgress = {
      id: tempNewList[0].id,
      title: tempNewList[0].title,
      content: tempNewList[0].content,
      status: tempNewList[0].status,
    };
    setProgressList([...progressList, newProgress]);
    // setProgressList((prevProgList) => {
    //   return [
    //     ...prevProgList,newProgress
    //   ];
    // });
    deleteItem(id);
  }

  function completeClick(id) {
    const tempNewList = progressList.filter((item) => item.id === id);
    setcompleteList((prevCompleteList) => {
      return [
        ...prevCompleteList,
        {
          id: tempNewList[0].id,
          title: tempNewList[0].title,
          content: tempNewList[0].content,
          status: tempNewList[0].status,
        },
      ];
    });
    deleteItemProgressList(id);
  }

  function directCompleteClick(id) {
    const tempNewList = listItems.filter((item) => item.id === id);
    setcompleteList((prevCompleteList) => {
      return [
        ...prevCompleteList,
        {
          id: tempNewList[0].id,
          title: tempNewList[0].title,
          content: tempNewList[0].content,
          status: tempNewList[0].status,
        },
      ];
    });
    deleteItem(id);
  }

  function toDoClick(id) {
    const tempNewList = progressList.filter((item) => item.id === id);
    setListItems((prevCompleteList) => {
      return [
        ...prevCompleteList,
        {
          id: tempNewList[0].id,
          title: tempNewList[0].title,
          content: tempNewList[0].content,
          status: tempNewList[0].status,
        },
      ];
    });
    deleteItemProgressList(id);
  }
  function defaultFunction() {
    console.log("default");
  }

  function handleStatus(event) {
    const { value } = event.target;
    console.log(value);
    setStatusValue(value);
  }

  function statusChangeClick(id) {
    if (statusValue === "default") {
      defaultFunction();
    } else if (statusValue === "progress") {
      progressClick(id);
    } else if (statusValue === "complete") {
      directCompleteClick(id);
    } else if (statusValue === "todo") {
      toDoClick(id);
    } else if (statusValue === "completefromtodo") {
      completeClick(id);
    }
    // setStatusValue("default")
  }
  function finalDelete(id){
    const newList = completeList.filter((item) => item.id !== id);
    setcompleteList(newList);
  }

  /**************************FILTER LISTS******************************/
  /*****************to-do-list**********************/
  const finalListItems = listItems.slice(1, listItems.length);
  const finalList = finalListItems.map((items, indexval) => (
    <li className="listitems">
      <div className="card bg-dark p-2 m-2">
        <div className="list-heading-div">
          <div id="title">
            <h3 className="text-light"> {items.title} : </h3>
          </div>
          <div className="row justify-content-center">
            <select className="col-md-8" onChange={handleStatus}>
              <option value="default">Select-Status</option>
              <option value="progress">Progress</option>
              <option value="complete">Complete</option>
            </select>
          </div>
          <div className="buttons row justify-content-center my-2">
            <button className="col-md-5 btn btn-primary mx-1 rounded-pill" onClick={() => statusChangeClick(items.id)}>
              Change-Status
            </button>
            <button
              className="to-do--delete col-md-5 btn btn-danger mx-1 rounded-pill"
              onClick={() => deleteItem(items.id)}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="section text-light">
          <span id="content-div"> Description : {items.content}</span>
        </div>
      </div>
    </li>
  ));

  /*****************progress-list*******************/
  const finalProgressListItems = progressList.slice(1, progressList.length);
  const finalPorgressList = finalProgressListItems.map((items, index) => (
    <li className="listitems">
      <div className="card p-2 my-2 bg-dark">
        <div className="list-heading-div">
          <h3 className="text-light">{items.title} : </h3>
          <div className="buttons">
            <div className="row justify-content-center">
              <select className="col-md-8" onChange={handleStatus}>
                <option value="default">Select-Status</option>
                <option value="todo">Todo</option>
                <option value="completefromtodo">complete</option>
              </select>
            </div>
            <div className="row justify-content-center my-2">
              <button
                className="btn btn-primary col-md-5 mx-1 rounded-pill"
                onClick={() => statusChangeClick(items.id)}
              >
                Change-Status
              </button>
              <button
                className="btn btn-danger col-md-5 mx-1 rounded-pill"
                onClick={() => deleteItemProgressList(items.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className="section text-light">
          <span id="content-div"> Description : {items.content}</span>
        </div>
      </div>
    </li>
  ));

  /****************complete-list*******************/
  const finalCompleteListItems = completeList.slice(1, completeList.length);
  const finalCompleteList = finalCompleteListItems.map((items) => (
    <li className="listitems">
      <div className="card bg-dark my-2 p-2 d-flex flex-column align-items-center">
        <h3 className="text-center text-light">{items.title}</h3>
        <button className="btn btn-danger w-75" onClick={() => finalDelete(items.id)}>Delete</button>
      </div>
    </li>
  ));
  /***************************************RENDER***********************************/

  return (
    <div id="main-div">
      <section id="headings">
        <div className="row justify-content-center">
          <div className="card m-1 p-2 bg-dark w-75">
            <div className="row justify-content-center align-items-center">
              <div className="col-md-7 d-flex flex-column justify-content-center align-items-center">
                <input
                  type="text"
                  name="title"
                  id="to-do--input"
                  value={tempList2}
                  onChange={handleChange2}
                  placeholder="Task Name"
                  className="w-50 my-2 text-center"
                  style={{ borderRadius: "0.5rem" }}
                ></input>
                <textarea
                  type="text"
                  name="content"
                  id="to-do--textarea"
                  value={tempList}
                  onChange={handleChange}
                  placeholder="Add Task Description"
                  className="w-50 my-2"
                ></textarea>
              </div>
              <div
                id="button-area"
                className="col-md-3 d-flex justify-content-center"
              >
                <button
                  id="to-do--button"
                  onClick={handleClick}
                  className="btn btn-primary rounded-pill w-50 py-3 d-flex align-items-center justify-content-center"
                >
                  <h6 className="fw-bold fs-3 m-0 text-light">Add</h6>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div id="navigation--bar" className="row justify-content-around">
          <div id="to-do-headingx" className="col-md-3">
            <h2 className="text-center">To-do List</h2>
          </div>

          <div id="progress-list-heading" className="col-md-3">
            <h1 className="text-center">Progress List</h1>
          </div>

          <div id="complete-heading" className="col-md-3">
            <h1 className="text-center">Completed List</h1>
          </div>
        </div>
      </section>
      <section id="lists">
        <div id="lists" className="row justify-content-around">
          <div id="to-do-list" className="col-md-3">
            {finalList}
          </div>
          <div id="progress-list" className="col-md-3">
            {finalPorgressList}
          </div>
          <div id="complete-list" className="col-md-3">
            {finalCompleteList}
          </div>
        </div>
      </section>
    </div>
  );
}
