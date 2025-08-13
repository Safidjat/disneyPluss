import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { loginSchema, registerSchema } from '../../schemas';
import { Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { getUseLogin, getUseRegister } from '../../services';
import { useNavigate } from 'react-router-dom';


function AuthView({signInFirst,setView}) {
    const [passwVisible,setPasswVisible]=useState(false);
    const [confirmVisible,setConfirmVisible]=useState(false);
    const [tryAgain,setTryAgain]=useState(false)
    const{setLoggedIn,setUsername,showNotification}=useAuth() 
    const navigate=useNavigate();
    const resetValues=()=>{
        setView(!signInFirst)
    }
    const onSubmit=async (values,actions)=>{
        // console.log(values);
        // console.log(actions);
        const reqBody={
            "login": `${values.username}`,
            "password": `${values.password}`
        }
        if(signInFirst){
            await getUseLogin(reqBody)
            .then(res=>{
                const{refresh,token,status}=res;
                if(status&&token&&refresh){
                    localStorage.setItem("disneyToken",token);
                    setLoggedIn(true)
                    setUsername(reqBody.login)
                    navigate('/')
                    setTryAgain(false)
                }else if(res?.response?.status===401){
                    setTryAgain(true)
                }else{
                    showNotification('Connection with the server failed','error');
                    setTryAgain(false)
                }
                actions.resetForm()
            })
        }else{
            await getUseRegister(reqBody)
            .then(res=>{
                const{refresh,token,login}=res;
                if(login&&token&&refresh){
                    showNotification('Registration successful! Please sign in.', 'success');
                    actions.resetForm()
                    resetValues()
                }else if(res?.response?.status===400 || res?.response?.status===409){
                    showNotification('This username already exists.','error');
                    actions.resetForm()
                }else{
                    showNotification('Connection with the server failed','error');
                }
            })
        }
        
    }
    
    const {values,errors,touched,isSubmitting,handleBlur,handleChange,handleSubmit}=useFormik({
        initialValues: signInFirst 
                       ? { username:'', password:'' } 
                       : { email:'', username:'', password:'', confirm:'' },
        validationSchema: signInFirst ? loginSchema : registerSchema,
        onSubmit,
    })

    return (
        <div className="py-[110px] grid place-items-center bg-[url('/assets/img/home-backgroundImg.png') bg-cover] ">
            <motion.div 
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className='w-full flex flex-col gap-[18px] items-center'>
                <form onSubmit={handleSubmit} className="p-[30px] w-[70%] max-w-[350px] bg-white rounded-[16px] shadow-formShadow">
                    <div className="my-[10px] flex justify-center"><img src="/assets/img/disney-logo-color.svg" className="h-[50px] min-[1000px]:h-[60px]" alt="disney" /></div>
                    <h2 className="mt-[30px] mb-[20px] text-black text-[21px] font-[700]">{signInFirst ? 'Sign in':'Sign up'}</h2>
                    <div className="flex flex-col gap-5 w-full">
                        <div className='w-full'>
                            <input 
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="username" 
                            type="text" 
                            placeholder="Username"
                            className={`${errors.username && touched.username ? 'inputError':''} w-full border border-[#0006] p-[10px] rounded-[5px] placeholder-[#757575] text-black text-[14px] font-[400] leading-0.5`}
                            />
                            {errors.username && touched.username && <p className="text-red-700 text-[12px] font-[200]">{errors.username}</p>}
                        </div>
                        {
                            !signInFirst && 
                            <div>
                                <input 
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="email"
                                type="email"
                                placeholder="Email" 
                                className={`${errors.email && touched.email ? 'inputError':''} w-full border border-[#0006] p-[10px] rounded-[5px] placeholder-[#757575] text-black text-[14px] font-[400] leading-0.5`}
                                />
                                {errors.email && touched.email && <p className="text-red-700 text-[12px] font-[200]">{errors.email}</p>}
                            </div>
                        }
                        <div className='flex flex-col w-full'>
                            <div className='relative w-full'>
                                <input 
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="password"
                                type={passwVisible ? 'text':'password'}
                                placeholder="Password"  
                                className={`${errors.password && touched.password ? 'inputError':''} w-full border border-[#0006] p-[10px] rounded-[5px] placeholder-[#757575] text-black text-[14px] font-[400] leading-0.5`}
                                />
                                <div onMouseDown={(e) => {
                                    e.preventDefault();
                                    setPasswVisible(prev => !prev);
                                }} 
                                className='cursor-pointer absolute right-[10px] top-[50%] translate-y-[-50%]'>
                                    {passwVisible ? <VisibilityIcon fontSize='small'/>:<VisibilityOffIcon fontSize='small'/>}
                                </div>
                            </div>
                            {errors.password && touched.password && <p className="text-red-700 text-[12px] font-[200]">{errors.password}</p>}
                        </div>
                        {
                            !signInFirst && 
                            <div className='flex flex-col w-full'>
                                <div className='relative w-full'>
                                    <input 
                                    value={values.confirm}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="confirm"
                                    type={confirmVisible ? 'text':'password'}
                                    placeholder="Confirm your password"  
                                    className={`${errors.confirm && touched.confirm ? 'inputError':''} w-full border border-[#0006] p-[10px] rounded-[5px] placeholder-[#757575] text-black text-[14px] font-[400] leading-0.5`}
                                    />
                                    <div onMouseDown={(e) => {
                                        e.preventDefault(); 
                                        setConfirmVisible(prev => !prev);
                                    }} 
                                    className='cursor-pointer absolute right-[10px] top-[50%] translate-y-[-50%]'>
                                        {confirmVisible ? <VisibilityIcon fontSize='small'/>:<VisibilityOffIcon fontSize='small'/>}
                                    </div>
                                </div>
                                {errors.confirm && touched.confirm && <p className="text-red-700 text-[12px] font-[200]">{errors.confirm}</p>}
                            </div>
                        }
                    </div>
                    <span className='text-[#0158e1] text-[12px] font-[200]'>{tryAgain ? 'Invalid password or login. Please try again.' : ''}</span>
                    <Button
                    type="submit"
                    loading={isSubmitting}
                    sx={{
                        width:'100%',
                        height:'35px',
                        padding:'10px 20px',
                        backgroundColor:'#0158e1',
                        color:'white',
                        borderRadius:'20px',
                        fontWeight:400,
                        fontSize:'14px',
                        textTransform:'none',
                        transition:'all 300ms ease',
                        marginTop:'25px',
                        '&:hover':{
                            opacity:0.75, 
                        },
                        '&.Mui-disabled':{
                            backgroundColor:'#0158e1',
                            opacity:0.75, 
                        }
                    }}
                    >
                        {signInFirst ? 'Sign in':'Sign up'}
                    </Button>
                </form>
                <div id='renavigate'>
                    {
                        signInFirst 
                        ? <h3 className='text-[13px]'><span className='text-[#ffffffb3] font-[400]'>New to Disney Plus?</span> <span onClick={resetValues} className='cursor-pointer text-white font-bold'>Sign up now</span></h3>
                        : <h3 className='text-[13px]'><span className='text-[#ffffffb3] font-[400]'>Already on Disney Plus?</span> <span onClick={resetValues} className='cursor-pointer text-white font-bold'>Sign in now</span></h3>
                    }
                </div>
            </motion.div>
        </div>
    )
}
export default AuthView

const formVariants = {
  hidden: {
    opacity: 0,
    y: 40, 
  },
  visible: {
    opacity: 1,
    y: 0, 
    transition: {
      duration: 0.6, 
      ease: "easeOut", 
    }
  },
};



// alo: aloaloalo9  user1
// f128:abcd1234    user2
// f132:eltun1234   user3
// tirim:tirimtirim9 user4
// salamm:necesen123 user5
// delulu:dellu7777 user6

