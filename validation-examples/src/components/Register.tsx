import { useForm } from "react-hook-form";
import User from "../models/User";
import './Register.css';
import { useState } from "react";
import doUserCheck from "../services/api-client";

const Register = ()=>{
    const [pwdColor, setPwdColor] = useState<string>('red');
    const [message, setMessage] = useState<string>('');
    const getCountries = ()=>{
        return ["India", "Srilanka", "USA","Canada", "UK"];
    }
    const onSubmit = async (user:User)=>{
        console.log('User is ', user);
        try{
        const result = await doUserCheck(user);
        console.log('Data API Send ', result);
        // if (response.statusCode == 404)
        if(result && result.message){
            setMessage('User Not Exist So U can Register ');
        }
        else{
            setMessage("User  Exist So U can't Register ");
        }
        }
        catch(err){
            console.log('API Call Fails ', err);
        }
    }
    const passwordStrength = (password:string)=>{
        if(password.length<8){
            setPwdColor('red');
           
        }
        else if(password.length>=8 && password.length<12){
            setPwdColor('yellow');
           
        }
        else{
            setPwdColor('green');
           
        }
        return true;
       
    }
    const {register, handleSubmit, formState:{errors}, watch} = useForm<User>();
    const password = watch('password');
    return (<div>
        <h1>{message}</h1>
        <h2>Register Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
                <label>UserName</label>
                
                <input {...register('username',{required:'UserName is Required', })} type="text" placeholder="Type UserName Here" />
                {errors && errors.username && <p>{errors.username.message}</p>}
                {/* {  !errors.email  && <p>Correct</p>} */}
            </div>
            <div>
                <label>Email</label>
                
                <input {...register('email',{required:'Email is Required', pattern:{value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message:'Invalid Pattern'}})} type="text" placeholder="Type Email Here" />
                {errors && errors.email && <p>{errors.email.message}</p>}
                {/* {  !errors.email  && <p>Correct</p>} */}
            </div>
            <div>
                <label>Password</label>
                <input {...register('password', {required:'Password is Required',validate:passwordStrength})} type="password" placeholder="Type Password Here" />
                {errors && errors.password && <p>{errors.password.message}</p>}
                
                <div style={{width:'30%', height:'10px', backgroundColor:pwdColor ,marginTop:'10px'}}>

                </div>
                
                </div>
            <br />
            <div>
                <label>Password</label>
                <input {...register('confirmPassword',{required:'Confirm Password is Required', validate:(cpwd)=>cpwd==password || 'Password not match'})} type="password" placeholder="Type Confirm Password Here" />
                {errors && errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>
            <div>
                <label>Gender</label>
                <input {...register('gender',{required:'Gender is Required'})}  type="radio" value = "M" /> Male
                &nbsp;
                <input {...register('gender',{required:'Gender is Required'})} type="radio" value = "F" /> Female
                {errors && errors.gender && <p>{errors.gender.message}</p>}
            </div>
            <div>
                <label>Country</label>
                <select {...register('country',{required:'Country is Required'})} defaultValue="">
                    <option value="" disabled>Select Your Country</option>
                    {getCountries().map((country, index)=><option key={index} value={country}>{country}</option>)}
                </select>
                {errors && errors.country && <p>{errors.country.message}</p>}
            </div>
            <div>
                <label>DOB</label>
                <input {...register('dob',{required:'DOB is Required'})} type="date"  />
                {errors && errors.dob && <p>{errors.dob.message}</p>}
            </div>
            <div>
                <button>Register</button> &nbsp;
                <button>Clear All</button>
            </div>
        </form>
    </div>);
}
export default Register;