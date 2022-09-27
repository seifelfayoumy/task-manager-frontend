import { useEffect, useState } from "react";
import { Card, FormCheck, Spinner } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Form } from "react-bootstrap";
import { createTask, deleteTask, updateTask } from "./services/taskService";
import { logout } from "./services/userService";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Task({ taskTitle, taskDescription, isCompleted, _id, createDate, updateDate, onNewTask }) {

  const [completed, setCompleted] = useState(isCompleted);
  const [taskUpdateDate, setTaskUpdateDate] = useState(updateDate);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (taskTitle) {
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [])

  const saveTask = async () => {
    setIsLoading(true);
    setIsError(false);


    const result = await updateTask({
      _id: _id,
      isCompleted: !completed
    });
    if (result !== 400 && result !== 401) {
      setTaskUpdateDate(result.updatedAt);
      return setIsLoading(false);
    }
    setIsLoading(false);
    setIsError(true);

  }

  const changeTask = (e) => {
    setCompleted(e.target.checked);
  }

  const deleteT = async () => {
    setIsLoading(true);
    setIsError(false);


    const result = await deleteTask({
      _id: _id,
    });
    if (result !== 400 && result !== 401) {
      return onNewTask();
    }
    setIsLoading(false);
    setIsError(true);
  }

  if (!isLoading) {
    return (
      <div className="row">
        <div className="col-10">
          <Card className="mt-3 w-100">
            <Card.Body>
              <div className="row">
                <div className="col">
                  <div className="d-flex justify-content-start fw-bold">
                    {taskTitle}
                  </div>
                </div>
                <div className="col">
                  created:
                  <Moment fromNow>{createDate}</Moment>
                </div>
                <div className="col">
                  checked:
                  <Moment fromNow>{taskUpdateDate}</Moment>
                </div>
                <div className="col">
                  <div className="d-flex justify-content-end">
                    <div>
                      <FormCheck type="checkbox" checked={completed} onChange={(e) => { changeTask(e) }} onClick={saveTask} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="text-secondary">
                  {taskDescription}
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-2">
          <FontAwesomeIcon icon={faTrashCan} color={'red'} className="mt-5" onClick={deleteT} cursor={"pointer"}></FontAwesomeIcon>
        </div>
      </div>


    );
  } else {
    return (
      <Spinner animation="border mt-4 mb-2 ms-5" role="status">
      </Spinner>
    )
  }

}

export default Task;