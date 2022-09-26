import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { createTask } from "./services/taskService";
import Button from 'react-bootstrap/Button';
import Task from "./Task";

function Tasks() {
  const [isAuth, onSignup, onLogin, tasks] = useOutletContext();
  const navigate = useNavigate();

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDecription, setTaskDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!isAuth) {
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
        return setIsLoading(false);
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
              <Form.Label>Description (optional)</Form.Label>
              <Form.Control type="text" onChange={(e) => setTaskDescription(e.target.value)} />
            </Form.Group>
          </div>
          <Button variant="primary" onClick={submitForm} className={!isValidForm() ? 'disabled' : ''}>
            Create Task!
          </Button>
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
          {
            tasks.map((task) =>
            (<>
              <Task title={task.title} description={task.description} isCompleted={task.isCompleted} _id={task._id} />
            </>)
            )
          }
        </div>

      </div>
    );

  }


}

export default Tasks;