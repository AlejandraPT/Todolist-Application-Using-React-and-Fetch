import React, {useState, useCallback , useEffect} from "react";

const Listado = () => {

    const [newTask, setnewTask] = useState ('');
    const [tasks, setTasks] = useState([]);
    
    const onNewTaskChange = useCallback((event)=>{
        setnewTask(event.target.value);
    }, []);
    
    const formSubmitted =useCallback ((event) => {
        event.preventDefault();
        if (!newTask.trim()) return;
        setTasks([
            ...tasks,
            {
                label: newTask,
                done: false,
            }
        ]);
        setnewTask('');
    }, [newTask, tasks]);
    
    const deleteTask = useCallback((task) => (event) => {
        setTasks(tasks.filter(otherTask => otherTask!= task));
    }, [tasks]);
    
    const upDate = (tasks) => {
      fetch('https://assets.breatheco.de/apis/fake/todos/user/alejandra', {
      method: "PUT",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });
    }

    useEffect(() => {
        upDate(tasks);
    },[tasks])

    // esto seria un get
    useEffect(() => {
        fetch('https://assets.breatheco.de/apis/fake/todos/user/alejandra')
        .then((responce) => responce.json())
        .then((data) => setTasks(data))
    },[])
        console.log(tasks)

        return (
            <div className="container col-12 mb-3 text-center">
                <div className="row">
                    <div className="col-12 p-2">
                            <form className="form" onSubmit={formSubmitted}>
                                <input
                                id="newTask"
                                name="newTask"
                                placeholder="Escribe la tarea a realizar..."
                                autoComplete="off"
                                value={newTask}
                                onChange={onNewTaskChange}
                                />
                                <button id="button1">AÑADIR</button>
                                </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-3 mt-3 text-center">
                        <ul>
                            {tasks.map((task, index)=>(
                                <p key={index}>
                                        <span className={task.done ? 'done' : ''}>
                                            {task.label}</span>
                                    <button id="button2" onClick={deleteTask(task)}><i className="fas fa-trash-alt"></i></button>
                                    </p>
                            ))}
                            
                            
                        </ul>
                    </div>
                    <label><strong> Te quedan {tasks.length} tareas !!</strong></label>
                </div>
            </div>
        );

};

export default Listado;