import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { createTask } from "./services/taskService";
import Button from 'react-bootstrap/Button';
import Task from "./Task";
import { Spinner } from "react-bootstrap";

function Tasks() {
  const [isAuth, onSignup, onLogin, tasks, onNewTask] = useOutletContext();
  const navigate = useNavigate();

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDecription, setTaskDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isAuth === false) {
      navigate('/signup');
    }
  }, []);

  const submitForm = async () => {
    setIsLoading(true);
    setIsError(false);
    if (isValidForm()) {
      const formObject = {
        title: taskTitle,
        description: taskDecription
      }
      const result = await createTask(formObject);
      if (result !== 400 && result !== 401) {
        setTaskTitle('');
        setTaskDescription('');
        setIsLoading(false);
        return onNewTask();
      }
      setIsLoading(false);
      setIsError(true);
    }
  }

  const isValidForm = () => {
    return (taskTitle !== '');
  }



  if (!isLoading) {
    return (
      <div className="col-sm-6 col-12 mx-auto d-flex flex-column align-items-center mt-5">
        <div className="row">
          <div className="col">
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" onChange={(e) => setTaskTitle(e.target.value)} />
            </Form.Group>
          </div>
          <div className="col">
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" onChange={(e) => setTaskDescription(e.target.value)} />
            </Form.Group>
          </div>
          <div className="">
            <Button variant="primary w-100" onClick={submitForm} className={!isValidForm() ? 'disabled' : ''}>
              Create Task!
            </Button>
          </div>

          {isError ? (
            <>
              <h3 className='text-danger'>
                something wrong happened, try again
              </h3>
            </>
          ) :
            <>
            </>}
        </div>

        <div className="row">
          {tasks.map(task => {
            const { _id, title, description, isCompleted, createdAt, updatedAt } = task;
            return <Task key={_id} taskTitle={title} taskDescription={description} isCompleted={isCompleted} _id={_id} createDate={createdAt} updateDate={updatedAt} onNewTask={onNewTask} />
          })}
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

export default Tasks;