import { useState, useRef } from 'react';
import './index.css';

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

function App() {
  const fullNameRef = useRef(null);
  const specializationRef = useRef(null);
  const experienceRef = useRef(null);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [validations, setValidations] = useState({});

  const validateField = (name, value) => {
    let error = "";
    let valid = false;

    switch (name) {
      case "username":
        if (value.length < 6 || [...value].some(char => !letters.includes(char) && !numbers.includes(char))) {
          error = "Deve contenere solo caratteri alfanumerici e almeno 6 caratteri";
        } else {
          valid = true;
        }
        break;

      case "password":
        if (value.length < 8 ||
          ![...value].some(char => letters.includes(char)) ||
          ![...value].some(char => numbers.includes(char)) ||
          ![...value].some(char => symbols.includes(char))) {
          error = "Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo";
        } else {
          valid = true;
        }
        break;

      case "description":
        if (value.trim().length < 100 || value.trim().length > 1000) {
          error = "Deve contenere tra 100 e 1000 caratteri senza spazi iniziali e finali";
        } else {
          valid = true;
        }
        break;

      default:
        return;
    }

    setErrors(prev => ({ ...prev, [name]: error }));
    setValidations(prev => ({ ...prev, [name]: valid }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Recupera i valori dai ref
    const fullName = fullNameRef.current.value;
    const specialization = specializationRef.current.value;
    const experience = experienceRef.current.value;

    // Controlla che tutti i campi siano compilati
    if (!fullName) validationErrors.fullName = 'Campo obbligatorio';
    if (!specialization) validationErrors.specialization = 'Seleziona una specializzazione';
    if (!experience || parseInt(experience) <= 0) validationErrors.experience = 'Inserisci un numero positivo';

    // Controlla le validazioni in tempo reale
    if (!validations.username) validationErrors.username = 'Username non valido';
    if (!validations.password) validationErrors.password = 'Password non valida';
    if (!validations.description) validationErrors.description = 'Descrizione non valida';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Dati inviati:', { fullName, specialization, experience, ...formData });
      setErrors({});
    }
  };

  return (
    <div className="container">
      <h1>Registrazione Utente</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <input type="text" ref={fullNameRef} placeholder="Nome e cognome" />
        {errors.fullName && <p className="error">{errors.fullName}</p>}

        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        {errors.username && <p className="error">{errors.username}</p>}
        {validations.username && <p className="success">Username valido</p>}

        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}
        {validations.password && <p className="success">Password valida</p>}

        <select name="specialization" ref={specializationRef}>
          <option value="">Seleziona la tua specializzazione</option>
          <option value="full-stack">Full stack</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
        {errors.specialization && <p className="error">{errors.specialization}</p>}

        <input type="number" ref={experienceRef} placeholder="Anni di esperienza" />
        {errors.experience && <p className="error">{errors.experience}</p>}

        <textarea name="description" placeholder="Raccontaci qualcosa di te" onChange={handleChange}></textarea>
        {errors.description && <p className="error">{errors.description}</p>}
        {validations.description && <p className="success">Descrizione valida</p>}

        <button type="submit">Invia</button>
      </form>
    </div>
  );
}

export default App;