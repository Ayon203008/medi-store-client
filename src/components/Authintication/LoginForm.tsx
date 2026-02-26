"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z, { file } from "zod";

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {

  // * for continue with google
    const handleGoogleLogin = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
    callbackURL:"http://localhost:3000",
  });
};
  
  const formSchema = z.object({
    name:z.string().min(1,"This field is required"),
    email: z.string().email("Invalid email"),
    password:z.string().min(8,"Minmum 8 charecters required")
  })
 
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async({value})=>{
      const toastId = toast.loading("Creating User")
      try{
        const {data,error}=await authClient.signIn.email(value)
        if(error){
          toast.error(error.message,{id:toastId})
          return
        }
        toast.success("User created successfully",{id:toastId})
      }catch(err){
        toast.error("Something went wrong , Please try again later",{
          id:toastId
        })
      }
    },
      validators:{
      onSubmit:formSchema
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login in your account</CardTitle>
        <CardDescription>
          Enter your information below to login in your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
          
            <form.Field name="name" children={(field)=>{
              const isInvalid=field.state.meta.isTouched && !field.state.meta.isValid
              return(<Field>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel> 
                <Input type="text" 
                id={field.name} 
                name={field.name}
                value={field.state.value}
                onChange={(e)=>field.handleChange(e.target.value)}  
                  />  
                 {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
              </Field>)
            }}/>


               <form.Field name="email" children={(field)=>{
              const isInvalid=field.state.meta.isTouched && !field.state.meta.isValid
              return(<Field>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel> 
                <Input type="text" 
                id={field.name} 
                name={field.name}
                value={field.state.value}
                onChange={(e)=>field.handleChange(e.target.value)}  
                  />  
                  {
                    isInvalid && (
                      <FieldError errors={field.state.meta.errors}/>
                    )
                  }  
              </Field>)
            }}/>
               <form.Field name="password" children={(field)=>{
              
              const isInvalid=field.state.meta.isTouched && !field.state.meta.isValid
              return(<Field>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel> 
                <Input type="text" 
                id={field.name} 
            
                name={field.name}
                value={field.state.value}
                onChange={(e)=>field.handleChange(e.target.value)}  
                  />  
                  {
                    isInvalid && (
                      <FieldError errors={field.state.meta.errors}/>
                    )
                  }  
              </Field>)
            }}/>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 justify-end">
     
        <Button form="login-form" className="w-full" type="submit">
          Login
        </Button> 
        <Button className="w-full" type="button" onClick={()=>handleGoogleLogin()} >Continue with Google</Button>
      </CardFooter>
    </Card>
  );
}
