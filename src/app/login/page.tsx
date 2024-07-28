"use client";
import { FormEvent, useState } from 'react';
import { useRouter } from "next/navigation";
import * as Form from '@radix-ui/react-form';
import { LOGIN_CONSTANTS } from '@/constants';

interface Errors {
  email: string | null;
  password: string | null;
}

const LoginPage = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({ email: null, password: null });
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      setErrors({
        email: !email ? LOGIN_CONSTANTS.EMAIL_REQUIRED : null,
        password: !password ? LOGIN_CONSTANTS.PASSWORD_REQUIRED : null,
      });
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, isAdmin: true }),
    });

    const resData = await response.json();

    if (resData.status == 200) {
      sessionStorage.setItem("auth-token", "value");

      router.push('/home');
    } else {
      setErrors({ email: null, password: resData.message});
    }
  };

  const handleForgotPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    if (!email) {
      setErrors({
        email: !email ? LOGIN_CONSTANTS.EMAIL_REQUIRED : null,
        password: null,
      });
      return;
    }

    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      // Handle OTP sent logic
    } else {
      // errors
    }
  };

  return (
    <div style={styles.container}>
      {!isForgotPassword ? (
        <Form.Root onSubmit={handleSubmit} style={styles.form}>
          <h2 style={styles.title}>{LOGIN_CONSTANTS.SHOPEE_ADMIN}</h2>
          <Form.Field name="email" style={styles.field}>
            <Form.Label>{`Email`}</Form.Label>
            <Form.Control asChild>
              <input type="email" placeholder="Email" style={styles.input} />
            </Form.Control>
            {errors.email && (
              <Form.Message style={styles.error}>
                {errors.email}
              </Form.Message>
            )}
          </Form.Field>
          <Form.Field name="password" style={styles.field}>
            <Form.Label>{`Password`}</Form.Label>
            <Form.Control asChild>
              <input type="password" placeholder="Password" style={styles.input} />
            </Form.Control>
            {errors.password && (
              <Form.Message style={styles.error}>
                {errors.password}
              </Form.Message>
            )}
          </Form.Field>
          <Form.Submit asChild>
            <button type="submit" style={styles.button}>Login</button>
          </Form.Submit>
          <button
            type="button"
            style={styles.linkButton}
            onClick={() => setIsForgotPassword(true)}
          >
            {`Forgot Password?`}
          </button>
        </Form.Root>
      ) : (
        <Form.Root onSubmit={handleForgotPassword} style={styles.form}>
          <h2 style={styles.title}>Forgot Password</h2>
          <Form.Field name="email" style={styles.field}>
            <Form.Label>Email</Form.Label>
            <Form.Control asChild>
              <input type="email" placeholder="Email" required style={styles.input} />
            </Form.Control>
            {errors.email && (
              <Form.Message style={styles.error}>
                {`Email is required`}
              </Form.Message>
            )}
          </Form.Field>
          <Form.Submit asChild>
            <button type="submit" style={styles.button}>Send OTP</button>
          </Form.Submit>
          <button
            type="button"
            style={styles.linkButton}
            onClick={() => setIsForgotPassword(false)}
          >
            {`Back to Login`}
          </button>
        </Form.Root>
      )}
    </div>
  );
};

export default LoginPage;

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#333',
  },
  field: {
    marginBottom: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  linkButton: {
    padding: '0.75rem',
    fontSize: '1rem',
    color: '#0070f3',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    marginTop: '1rem',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '0.25rem',
  },
};
