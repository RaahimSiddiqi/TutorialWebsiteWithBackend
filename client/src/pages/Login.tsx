import { z } from 'zod';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState }  from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';


const Schema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
});

const Login = () => {
    const [isRegister, setIsRegister] = useState<Boolean>(false);
    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
              name: '',
              email: '',
              password: '',
              confirmPassword: ''
          },
          validationSchema: toFormikValidationSchema(Schema),
          onSubmit: (values) => {
            console.log(values);
          },
    });

    const SignUp = () => 
    {
        formik.handleSubmit();
        // Create new user....
        handleLogin(formik.values.email, formik.values.password);
    };

    const SignIn = () =>
    {
        formik.handleSubmit();
        handleLogin(formik.values.email, formik.values.password);
    };

    const handleLogin = async (username: string, password: string) => {
        try {
          const response = await fetch('https://tutorialwebsitewithbackend.azurewebsites.net/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
    
          if (!response.ok) {
            throw new Error('Login failed');
          }
    
          const data = await response.json();
          console.log('Login successful:', data.message);
          navigate("/home")
        } catch (error: any) {
          console.error('Error during login:', error.message);
        }
      };


    return ( 
        <div className="bg-gray-100 flex h-[calc(100vh)] sm:h-[calc(100vh)]">
            <Card className='bg-white shadow-md rounded w-120 m-auto'>
                <CardHeader className="space-y-1">
                    { isRegister ? 
                    <>
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>
                                Enter your details below to create your account
                        </CardDescription>
                    </>
                    :
                    <>
                        <CardTitle className="text-2xl">Sign In to your account</CardTitle>
                        <CardDescription>
                                Enter your credentials to login to your account
                        </CardDescription>
                    </>
                    }
                </CardHeader>
                <CardContent>
                    <div className='mb-4'>  
                        {
                            isRegister &&
                                <>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                        Name
                                    </label>
                                    <input
                                        className='shadow w-full border rounded px-2 py-2 appearance-none'
                                        {...formik.getFieldProps('name')}
                                        id="name"
                                        name="name"
                                    /> 
                                </>
                        }
                    </div>
                    <div className='mb-4'> 
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            className='px-2 shadow w-full border rounded py-2 appearance-none'
                            {...formik.getFieldProps('email')}
                            type="email"
                            id="email"
                            name="email"
                        /> 
                    </div>
                    <div className='mb-4'> 
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                            <input
                                    className='px-2 shadow w-full border rounded py-2 appearance-none'
                                    {...formik.getFieldProps('password')}
                                    id="password"
                                    name="password"
                            /> 
                    </div>
                    <div className=''>  
                        {
                            isRegister &&
                                <>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Confirm Password
                                    </label>
                                    <input
                                        className='px-2 shadow w-full border rounded py-2 appearance-none'
                                        {...formik.getFieldProps('confirmPassword')}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                    /> 
                                </>
                        }
                    </div>
                </CardContent>
                <CardFooter className='block'>
                        <Button onClick={isRegister ? SignUp : SignIn} className = "w-full" type="button">
                            {isRegister ? "Sign Up" : "Sign In"}
                        </Button>
                        <div className='mt-6'>
                            <button onClick={() => {setIsRegister(!isRegister)}} className='text-gray-500'>{isRegister ? "Existing user?" : "Don't have an account?"}</button>                  
                        </div>
                </CardFooter>
            </Card>
        </div>
     );
}
 
export default Login;