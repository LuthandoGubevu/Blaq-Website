import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../../context/SessionContext';
import { useSignIn } from '../../hooks/useSignIn';
import { getDemoUser } from '../../api/auth';
import { ROLE_DISPLAY_MAP, USER_ROLES } from '../../types';
import type { UserRole } from '../../types';
import { isValidEmail, isValidPassword } from '../../utils/validators';
import { Eyebrow } from '../../components/common/Eyebrow';
import { TextField } from '../../components/common/TextField';
import { Button } from '../../components/common/Button';
import styles from './LoginScreen.module.css';

interface FieldErrors {
  email?: string;
  password?: string;
}

export function LoginScreen() {
  const { dispatch } = useSession();
  const { mutate, isLoading } = useSignIn();
  const navigate = useNavigate();

  const [role, setRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  function validate(): boolean {
    const errors: FieldErrors = {};
    if (!isValidEmail(email)) {
      errors.email = 'Enter a valid email address.';
    }
    if (!isValidPassword(password)) {
      errors.password = 'Password must be at least 4 characters.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    if (!validate()) return;

    dispatch({ type: 'SIGN_IN_START' });
    const user = await mutate(email, password, role);
    if (user) {
      dispatch({ type: 'SIGN_IN_SUCCESS', user });
      navigate(ROLE_DISPLAY_MAP[user.role].homePath);
    } else {
      const message = 'Unable to sign in. Check your credentials and try again.';
      dispatch({ type: 'SIGN_IN_FAILURE', message });
      setFormError(message);
    }
  }

  function handleBypass() {
    dispatch({ type: 'BYPASS_DEMO_LOGIN', user: getDemoUser(role) });
    navigate(ROLE_DISPLAY_MAP[role].homePath);
  }

  return (
    <div className={styles.screen}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <h1 className={styles.wordmark}>BLAQ</h1>
          <Eyebrow tone="gold">{ROLE_DISPLAY_MAP[role].appName}</Eyebrow>
        </div>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.roleSwitch} role="radiogroup" aria-label="Sign in as">
            {USER_ROLES.map((option) => (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={role === option}
                className={`${styles.roleOption} ${role === option ? styles.roleOptionActive : ''}`}
                onClick={() => setRole(option)}
              >
                {ROLE_DISPLAY_MAP[option].label}
              </button>
            ))}
          </div>

          <TextField
            label="Email Address"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={fieldErrors.email}
          />
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
          />

          {formError ? (
            <p role="alert" className={styles.formError}>
              {formError}
            </p>
          ) : null}

          <div className={styles.actions}>
            <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
              {isLoading ? 'Signing In…' : 'Sign In'}
            </Button>
            <Button type="button" variant="outline-muted" onClick={handleBypass}>
              Bypass (Demo)
            </Button>
          </div>
        </form>
      </div>

      <p className={styles.footer}>Shoreditch · Est. 2019</p>
    </div>
  );
}
