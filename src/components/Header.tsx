"use client"
import * as Dialog from "@radix-ui/react-dialog";
import Link from "@/components/Link";
import Button from "@/components/Button";
import Arrow from "@/components/Arrow";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Field = ({ label, name, type, placeholder, textArea, id, selectOptions, ...props }) => {
  const Component = textArea ? "textarea" : selectOptions ? "select" : "input";

  return (
    <div className="flex flex-col gap-y-1">
      <label className="text-sm leading-none" htmlFor={id}>
        {label}
      </label>
      <Component
        className="p-2 text-sm leading-none border rounded-sm border-mcqueen placeholder:text-mcqueen/50"
        placeholder={placeholder}
        id={id}
        name={id}
        {...props}
      >
        {selectOptions &&
          selectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </Component>
    </div>
  );
};

export interface HeaderProps {
  onOpenModal: () => void
}

export default function Header({ onOpenModal }: HeaderProps) {
  const route = useRouter().route;
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const handleParam = () => (e) => {
    e.persist();
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const [inputs, setInputs] = useState({
    userInstagram: "",
    parkName: "",
    city: "",
    parkDescription: "",
    safety: "",
  });

  const formSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/submit-place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error al añadir. Reintenta más tarde.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <header className="justify-between w-full px-4 pt-12 pb-16 mx-auto sm:flex max-w-screen-2xl">
      <div>
        <h1 className="text-5xl">
          <Link href="/">Lugares para parcharse y ver el atardecer</Link>
        </h1>
        <p className="max-w-md mt-1">
         Lugares en Colombia idoneos para parcharse y ver el atardecer. Sugeridos por la comunidad y gestionados por{" "}
          <Link
            href="https://instagram.com/typicalmitul"
            isExternal
            className="underline w-fit"
          >
            @gabrielg97
          </Link>
          .
        </p>
        {route === "/" ? (
          <Link href="/about" className="flex items-center mt-4 gap-x-1 w-fit">
            Acerca de <Arrow />
          </Link>
        ) : (
          <Link href="/" className="flex items-center mt-4 gap-x-1 w-fit">
            <Arrow className="rotate-180" />
            Inicio
          </Link>
        )}
      </div>
      <div className="flex items-start mt-4 sm:mt-0 gap-x-2">
        <Button onClick={onOpenModal}>Sugerir un lugar</Button>
      </div>
    </header>
  );
}
