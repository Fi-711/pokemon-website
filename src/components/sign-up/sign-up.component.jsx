import React, { useState } from 'react';
import axios from 'axios';

import {
  Input,
  Stack,
  FormControl,
  InputGroup,
  InputLeftAddon,
  Button,
  Divider,
  useToast,
  Tooltip,
} from '@chakra-ui/react';

import { LockIcon, EmailIcon, InfoIcon } from '@chakra-ui/icons';

const SignUp = ({ handleShake }) => {
  // Toast for feedback
  const toast = useToast();

  const [userCredentials, setUserCredentials] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { firstName, lastName, email, password, confirmPassword } =
    userCredentials;

  // Used to decide if to display onfocus error boxes
  const [validCredentials, setValidCredentials] = useState({
    validFirstName: true,
    validLastName: true,
    validPassword: true,
    validConfirmPassword: true,
  });
  const { validFirstName, validLastName, validPassword, validConfirmPassword } =
    validCredentials;

  // async function call
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Valid Name - at least 2 characters and containing known characters
    /*
    Characters supported:
      abcdefghijklmnopqrstwxyz
      ABCDEFGHIJKLMNOPQRSTUVWXYZ
      áéíóúäëïöüÄ'
      陳大文
      łŁőŐűŰZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųū
      ÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁ
      ŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ.-
      ñÑâê都道府県Федерации
      আবাসযোগ্য জমির걸쳐 있는
    */
    const namePattern = new RegExp(
      /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,}$/
    );

    const passwordPattern = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    );

    // testing if entered name, city and postcode have valid regex patterns
    let firstNameFormat = namePattern.test(firstName);
    let lastNameFormat = namePattern.test(lastName);

    // Check password 8 chars and 1 upper, 1 lower, 1 number
    let passwordFormat = passwordPattern.test(password);

    // Handle form filled in correctly with regex and toasts
    if (!firstNameFormat) {
      handleShake();
      setValidCredentials({ ...validCredentials, validFirstName: false });
      toast({
        title:
          'Names must be at least 2 characters long and contain only valid characters.',
        description: '',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } else if (!lastNameFormat) {
      handleShake();
      setValidCredentials({ ...validCredentials, validLastName: false });
      toast({
        title:
          'Names must be at least 2 characters long and contain only valid characters.',
        description: '',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } else if (password !== confirmPassword) {
      handleShake();
      setValidCredentials({
        ...validCredentials,
        validPassword: false,
        validConfirmPassword: false,
      });
      toast({
        title: "Passwords don't match!",
        description: '',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } else if (!passwordFormat) {
      handleShake();
      setValidCredentials({
        ...validCredentials,
        validConfirmPassword: false,
        validPassword: false,
      });
      toast({
        title: 'Incorrect Password',
        description:
          'Password must be at least eight characters, at least one uppercase letter, one lowercase letter and one number',
        status: 'error',
        duration: 7000,
        isClosable: true,
        position: 'top',
      });
    } else {
      try {
        // Add sign in logic here - use await as async function
        const { data } = await axios.post('/api/sign-up', userCredentials);

        if (data) {
          toast({
            title: 'Account created.',
            description:
              "We've created your account for you. Please check your mail",
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top',
          });
        }
      } catch (error) {
        console.error(error.response);
        handleShake();
        if (error.response.status === 409) {
          toast({
            title: 'Email already Registered',
            description:
              'We were unable to create your account. The email you have provided is already registered.',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top',
          });
        } else {
          toast({
            title: 'Something went wrong',
            description:
              'We were unable to create your account. Please check your details and then try again',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top',
          });
        }
      } finally {
        // Reset form
        setUserCredentials({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    // reset valid credentials so onfocus red error box reset
    setValidCredentials({
      validFirstName: true,
      validLastName: true,
      validPassword: true,
      validConfirmPassword: true,
    });

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <form className='sign-up' onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <FormControl>
          <InputGroup>
            <InputLeftAddon
              children={
                <Tooltip label='Your real first name. Please note this name will appear on any reviews you write'>
                  <InfoIcon />
                </Tooltip>
              }
            />
            <Input
              type='text'
              name='firstName'
              value={firstName}
              aria-label='First Name'
              placeholder='First Name'
              required
              onChange={handleChange}
              color='brand.200'
              isInvalid={!validFirstName}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
            <InputLeftAddon
              children={
                <Tooltip label='Your real last name. This name will not appear publicly'>
                  <InfoIcon />
                </Tooltip>
              }
            />
            <Input
              type='text'
              name='lastName'
              value={lastName}
              aria-label='Last Name'
              placeholder='Last Name'
              required
              onChange={handleChange}
              color='brand.200'
              isInvalid={!validLastName}
            />
          </InputGroup>
        </FormControl>
        <Divider borderColor='gray.400' />
        <FormControl>
          <InputGroup>
            <InputLeftAddon
              children={
                <Tooltip label='Must be a valid email as a confirmation email will be sent'>
                  <EmailIcon />
                </Tooltip>
              }
            />
            <Input
              type='email'
              name='email'
              value={email}
              aria-label='email'
              placeholder='Email'
              required
              onChange={handleChange}
              color='brand.200'
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
            <InputLeftAddon
              children={
                <Tooltip label='Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'>
                  <LockIcon />
                </Tooltip>
              }
            />
            <Input
              type='password'
              name='password'
              value={password}
              aria-label='password'
              placeholder='Password'
              required
              onChange={handleChange}
              color='brand.200'
              isInvalid={!validPassword}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
            <InputLeftAddon
              children={
                <Tooltip label='Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'>
                  <LockIcon />
                </Tooltip>
              }
            />
            <Input
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              aria-label='confirmPassword'
              placeholder='Confirm Password'
              required
              onChange={handleChange}
              color='brand.200'
              isInvalid={!validConfirmPassword}
            />
          </InputGroup>
        </FormControl>
        <Button type='submit' colorScheme='cyan'>
          Sign Up
        </Button>
      </Stack>
    </form>
  );
};

export default SignUp;
