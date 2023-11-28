import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { SIGNUP, START_FREE_TRIAL } from 'path/to/graphql/mutations';
import { setUser, setWindowFlag } from 'path/to/redux/actions';

export default function Signup() {
  const router = useRouter();

  // Set the page title
 
document.title = 'Sign Up';


  // Form handling
  const { handleSubmit, register } = useForm();

  // Query data
  const queryData = router.query;

  // Responsive design
  const isMobile = useSelector((state) => state.responsive.isMobile);

  // State for success, modal, snackbar
  const [success, setSuccess] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // GraphQL mutation
  const [signUp, { data, loading, error }] = useMutation(SIGNUP);
  const [startFreeTrial, { loading: startFreeTrialLoading, error: startFreeTrialError }] = useMutation(START_FREE_TRIAL);

  // Redux dispatch
  const dispatch = useDispatch();

  const [, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const signUpResult = await signUp({
        variables: { input: { ...data, invitationId: queryData?.invite_id } },
      });

      if (signUpResult.data.createUser) {
        await startFreeTrial({
          variables: { userId: signUpResult.data.createUser._id, createdAt: signUpResult.data.createUser.created_at },
        });
      }
      setShowSnackbar(true);

      // Send POST request to server endpoint
      const emailInput = document.querySelector('#email');

    } catch (error) {
      console.error(error);
      if (error) {
        setError(error);
      }
    }
  };

  // Handle Snackbar close
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  // Set user after successful signup
  if (data && data.createUser && !error) {
    setTimeout(() => dispatch(setUser(data.createUser)), 3000);
  }

  // Handle window resize
  const handleWindowResize = () => {
    dispatch(setWindowFlag({ isMobile: window.innerWidth <= 450 }));
  };

  // Initial call for window resize
  handleWindowResize();

  // Add event listener for window resize
  window.addEventListener('resize', handleWindowResize);

  // Cleanup the event listener
  return () => {
    window.removeEventListener('resize', handleWindowResize);
  };


  return (
    // JSX content goes here
  );
}