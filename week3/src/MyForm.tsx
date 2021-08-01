import React from "react";
import { useState } from "react";

type Params = {
  name: string;
  description: string;
};

type MyformProps = {
  onSubmit: (form: Params) => void;
};

const Myform = (props: MyformProps) => {
  const [form, setForm] = useState({
    name: "",
    description: ""
  });

  const { name, description } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit(form);
    setForm({
      name: "",
      description: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={onChange} />
      <input name="description" value={description} onChange={onChange} />
      <button type="submit">등록</button>
    </form>
  );
};

export default Myform;
