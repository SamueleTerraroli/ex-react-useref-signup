import { useState } from 'react';
import './index.css';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    password: '',
    specialization: '',
    experience: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    // Verifica che tutti i campi siano compilati
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        validationErrors[key] = 'Campo obbligatorio';
      }
    });

    // Verifica che anni di esperienza sia un numero positivo
    if (formData.experience && parseInt(formData.experience) <= 0) {
      validationErrors.experience = 'Inserisci un numero positivo';
    }

    // Verifica che la specializzazione sia selezionata
    if (!formData.specialization) {
      validationErrors.specialization = 'Seleziona una specializzazione';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Dati inviati:', formData);
      setErrors({});
    }
  };

  return (
    <div className="container">
      <h1>Registrazione Utente</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Nome e cognome" onChange={handleChange} />
        {errors.fullName && <p className="error">{errors.fullName}</p>}

        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        {errors.username && <p className="error">{errors.username}</p>}

        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}

        <select name="specialization" id="specializzazione" onChange={handleChange}>
          <option value="">Seleziona la tua specializzazione</option>
          <option value="full-stack">Full stack</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
        </select>
        {errors.specialization && <p className="error">{errors.specialization}</p>}

        <input type="number" name="experience" placeholder="Anni di esperienza" onChange={handleChange} />
        {errors.experience && <p className="error">{errors.experience}</p>}

        <textarea name="description" id="description" placeholder="Raccontaci qualcosa di te" onChange={handleChange}></textarea>
        {errors.description && <p className="error">{errors.description}</p>}

        <button type="submit">Invia</button>
      </form>
    </div>
  );
}

export default App;
