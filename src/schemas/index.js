import * as yup from "yup" 

const passwordRules= /^(?=.*[a-z])(?=.*\d).{8,}$/

export const loginSchema=yup.object().shape({
    username:yup.string().required("Required"),
    password:yup.string().min(8).matches(passwordRules,{message:"Please create a stronger password"}).required("Required"),
})
export const registerSchema=yup.object().shape({
    email:yup.string().email("Pleace enter a valid email").required("Required"),
    username:yup.string().required("Required"),
    password:yup.string().min(8).matches(passwordRules,{message:"Please create a stronger password"}).required("Required"),
    confirm:yup.string().oneOf([yup.ref('password'), null],"Passwords must match").required("Required")
})