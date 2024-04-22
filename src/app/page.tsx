"use client";

import { useState } from "react";
import API from "@/app/helpers/api";
import { EMethod } from "@/app/type";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const test = (data: any) =>
    API({
      method: EMethod.post,
      url: "auth/login",
      payload: data,
      headers: {
        "Content-Type": "application/json",
      },
    });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };

    test(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="имя"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="пароль"
        autoComplete="on"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">отправить</button>
    </form>
  );
}
