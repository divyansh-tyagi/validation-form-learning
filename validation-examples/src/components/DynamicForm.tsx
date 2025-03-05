import { useFieldArray, useForm } from "react-hook-form";

// Step - 1 Define Individual Form Field
type TaskFormFields  = {
    taskName:string;
    taskDesc:string;
}

// Array of Forms
type FormValues = {
    tasks: TaskFormFields[]; // Array of Objects (TaskFormFields object)
}

export const DynamicForm = ()=>{
    // Step - 2 useForm, useFieldArray Hook
    const {register, handleSubmit, formState:{errors}, control} = useForm<FormValues>({
        defaultValues:{tasks:[{taskName:'', taskDesc:''}]}
    });
    const {fields, append, remove} = useFieldArray({
        control, name:'tasks'
    });

    // Step-4 Add New Form Logic
    const addTask = ()=>{
        append({taskName:'', taskDesc:''});
    }

    const removeTaskForm = (index:number)=>{
            remove(index);
    }
    const onSubmit = (tasks:FormValues)=>{
        console.log('Form Submit ', tasks);
    }

    // Step - 3  Form Design
    return (
        <>
        <button onClick={addTask}>Add New Task</button>
        <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index)=>{
            return (<div key = {field.id}>
                
                <hr />
                <label>Task name</label>
                <input {...register(`tasks.${index}.taskName`, {required:'TaskName is Required'})} type="text" placeholder="Type Task name Here" />
                {  errors && errors.tasks && errors?.tasks[index]?.taskName?.message}
                <br />
                <label >Task Desc</label>
                <input {...register(`tasks.${index}.taskDesc`,{required:'TaskDesc is Required'})} type="text" placeholder="Type Task Desc here" />
                {errors && errors.tasks &&  errors?.tasks[index]?.taskDesc?.message}
                <br />
                <button onClick={()=>removeTaskForm(index)}>Remove</button>
                
                
                
            </div>)
        })}
        <br />
        <button>Submit</button>
        </form>
        
        </>
    )
    

}