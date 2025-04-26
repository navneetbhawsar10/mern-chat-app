import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightAddon, InputRightElement, Show, VStack, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import axios from 'axios'
const SignIn = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [Show, setShow] = useState(false)

    const handleCLick = () => setShow(!Show)
    const [loading, setLoading] = useState( false)
    const toast = useToast()
    const navigate = useNavigate()
    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );
                
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate('/chat');
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };



    return (
        <VStack spacing="5px" color='black' >SignUp
            <FormControl id='email' isRequired >
                <FormLabel> Email </FormLabel>
                <Input
            
                value={email}
                    placeholder='Enter your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id='password' isRequired >
                <FormLabel> Password </FormLabel>
                <InputGroup>
                    <Input
                        type={Show ? "text" : "password"}
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleCLick} >
                            {Show ? "hide" : "show"}

                        </Button>


                    </InputRightElement>

                </InputGroup>





            </FormControl>





            <Button
                colorScheme='blue'
                width="100%"
                style={{ margin: 15 }}
                onClick={submitHandler}
                isLoading={loading}>

                Sign In

            </Button>
            <Button
                variant="solid"
                colorScheme='red'
                width="100%"
                onClick={() => {
                    setEmail("guest@example.com")
                    setPassword("12345678")
                }}
            >

                Get Guest User Credentials

            </Button>



        </VStack>
    )
}
export default SignIn