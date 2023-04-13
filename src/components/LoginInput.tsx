import { FormEventHandler, useState } from "react";

type Props = {
  login: (password: string) => void;
};

const LoginInput = ({ login }: Props) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    login(password);
  };

  const handleEnterPress = (e: any) => {
    if (e.key === "Enter") {
      login(password);
    }
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleEnterPress}>
      <input
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        placeholder="Enter Password"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginInput;
