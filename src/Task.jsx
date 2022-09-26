import { useEffect, useState } from "react";
import { Card, FormCheck } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Form } from "react-bootstrap";
import { createTask, updateTask } from "./services/taskService";

function Task({ title, description, isCompleted, _id }) {

  const [completed, setCompleted] = useState(isCompleted);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // updateTask()
  }, [])

  const updateTask = async () => {
    setIsLoading(true);

    const formObject = {
      _id,
      isCompleted: completed
    };
    const result = await updateTask(formObject);
    if (result !== 400 && result !== 401) {
      return setIsLoading(false);
    }
    setIsLoading(false);
    setIsError(true);
  }

  if (!isLoading) {
    return (
      <Card className="mt-3">
        <Card.Body>
          <div className="row">
            <div className="col">
              <div className="d-flex justify-content-start">
                {title}
              </div>
            </div>
            <div className="col">
              <div className="d-flex justify-content-end">
                <FormCheck type="checkbox" checked={completed} onChange={(e) => {setCompleted(e.target.checked)}} onClick={updateTask} />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

}

export default Task;