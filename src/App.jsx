import { useEffect, useMemo, useRef, useState } from "react";

const specializationArray = ["Full Stack", "Frontend", "Backend"];

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

function App() {
  const name = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const specialization = useRef();
  const expYear = useRef();
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const startPage = useRef();

  useEffect(() => {
    name.current.focus();
  }, []);

  const isUsernameValid = useMemo(() => {
    const charsIsValid = username
      .split("")
      .every(
        (char) =>
          letters.includes(char.toLowerCase()) || numbers.includes(char),
      );

    return charsIsValid && username.trim().length >= 6;
  }, [username]);

  const isPasswordValid = useMemo(() => {
    return (
      password.trim().length >= 8 &&
      password.split("").some((char) => letters.includes(char.toLowerCase())) &&
      password.split("").some((char) => numbers.includes(char)) &&
      password.split("").some((char) => symbols.includes(char))
    );
  }, [password]);

  const isDescriptionValid = useMemo(() => {
    return (
      description.trim().length >= 100 && description.trim().length <= 1000
    );
  }, [description]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name.current.value.trim() ||
      !username.trim() ||
      !password.trim() ||
      specialization.current.value === "" ||
      expYear.current.value === "" ||
      Number(expYear.current.value) < 0 ||
      !description.trim() ||
      !isUsernameValid ||
      !isDescriptionValid ||
      !isPasswordValid
    ) {
      setError("Tutti i campi devono essere compilati correttamente.");
      return;
    }

    setError("");

    console.log(`
      Nome completo: ${name.current.value}
      Username: ${username}
      Password: ${password}
      Specializzazione: ${specialization.current.value}
      Anni di esperienza: ${expYear.current.value}
      Breve descrizione: ${description}`);
  };

  function handleReset() {
    name.current.value = "";
    setUsername("");
    setPassword("");
    specialization.current.value = "";
    expYear.current.value = "";
    setDescription("");
    setError("");
    name.current.focus();
  }

  return (
    <div className="container mt-5" ref={startPage}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Nome Completo
          </label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            ref={name}
            placeholder="Inserisci il tuo nome e cognome..."
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            className="form-control"
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Inserisci il tuo username..."
            required
          />
          {username.trim() && (
            <p className={isUsernameValid ? "text-success" : "text-danger"}>
              {isUsernameValid
                ? "Username valido"
                : "Lo username deve contenere solo caratteri alfanumerici e almeno 6 caratteri"}
            </p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Inserisci la password..."
            required
          />
          {password.trim() && (
            <p className={isPasswordValid ? "text-success" : "text-danger"}>
              {isPasswordValid
                ? "Password valida"
                : "La password deve avere almeno 8 caratteri, una lettera, un numero ed un simbolo"}
            </p>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="specialization">
            Specializzazione
          </label>
          <select
            className="form-select"
            name="specialization"
            id="specialization"
            ref={specialization}
            required
          >
            <option value="">Seleziona la specializzazione</option>
            {specializationArray.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="expYear">
            Anni di esperienza
          </label>
          <input
            className="form-control"
            type="number"
            name="expYear"
            id="expYear"
            min={0}
            ref={expYear}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="description">
            Breve descrizione
          </label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            minLength={100}
            maxLength={1000}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {description.trim() && (
            <p className={isDescriptionValid ? "text-success" : "text-danger"}>
              {isDescriptionValid
                ? "Descrizione valida"
                : `La descrizione deve avere tra 100 e 1000 caratteri.
                caratteri attuali: ${description.trim().length}`}
            </p>
          )}
        </div>

        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="btn btn-primary">
          Invia
        </button>
        <button
          type="button"
          className="btn btn-danger ms-3"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
      <div className="fixed-bottom pe-none">
        <div className="d-flex flex-row-reverse pe-3 pb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            style={{ cursor: "pointer" }}
            className="bi bi-arrow-up-square-fill pe-auto"
            viewBox="0 0 16 16"
            onClick={() =>
              startPage.current.scrollIntoView({ behavior: "smooth" })
            }
          >
            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default App;
