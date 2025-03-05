// import { useState } from "react";
// import { useForm } from "react-hook-form";

// type AsyncFormFields = {
//     email:string;
// }
// export const AsyncValidation = ()=>{
//     const {register, handleSubmit, formState:{errors}} = useForm<AsyncFormFields>();
//     const [loading, setLoading] = useState<string>('');
//     const checkEmail = (email:string)=>{
//         setLoading('Checking Email Wait...');
//         const blackListedEmails = ['tim@yahoo.com','tom@yahoo.com','kim@yahoo.com'];
//         const promise = new Promise<boolean>((resolve, reject)=>{
//             setTimeout(()=>{
//                 const r = blackListedEmails.includes(email);
//                resolve(r);  
//                setLoading('');   
//             }, 5000);
//         });
//         return promise;
//     }
//     const onSubmit = (data:AsyncFormFields)=>{
//         console.log('Form Submit ', data);
//     }
//     return (<>
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <div>
//                 <label htmlFor="">Email</label>
//                 <input {...register('email',{required:'Email is Required', validate:async (email:string)=>{
//                    const r =  await checkEmail(email);
//                    return r?"BlackListed Email":""
//                 }})} type="text" placeholder="Type Email here" /> {loading}
//                 {errors && errors.email && <p style={{color:'red'}}>{errors.email.message}</p>}
//             </div>
//             <button>Submit</button>
//         </form>
//     </>)
// }




import { useState } from "react";
import { useForm } from "react-hook-form";

type AsyncFormFields = {
    email: string;
};

export const AsyncValidation = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<AsyncFormFields>();
    const [loading, setLoading] = useState<string>('');

    const checkEmail = async (email: string) => {
        setLoading('Checking Email Wait...');
        const blackListedEmails = ['tim@yahoo.com', 'tom@yahoo.com', 'kim@yahoo.com'];

        return new Promise<boolean>((resolve) => { // Removed "reject" since it's not used
            setTimeout(() => {
                const isBlacklisted = blackListedEmails.includes(email);
                resolve(isBlacklisted);
                setLoading(''); // Ensure state is updated after resolving
            }, 2000);
        });
    };

    const onSubmit = (data: AsyncFormFields) => {
        console.log('Form Submit ', data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        {...register('email', { 
                            required: 'Email is Required', 
                            validate: async (email: string) => {
                                setLoading('Checking Email Wait...'); // Ensure loading is shown
                                const isBlacklisted = await checkEmail(email);
                                return isBlacklisted ? "Blacklisted Email" : true;
                            } 
                        })} 
                        type="text" 
                        placeholder="Type Email here" 
                    /> 
                    {loading && <p style={{ color: 'blue' }}>{loading}</p>}
                    {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};
