"use client"
import * as Dialog from "@radix-ui/react-dialog";
import Link from "@/components/Link";
import Button from "@/components/Button";
import Arrow from "@/components/Arrow";
import React from "react";
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

export default function Header() {
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

  const [inputs, setInputs] = React.useState({
    userTwitter: "",
    suggestedBook: "",
    parkName: "",
    city: "",
    country: "",
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
      alert("Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <header className="justify-between w-full px-4 pt-12 pb-16 mx-auto sm:flex max-w-screen-2xl">
      <div>
        <h1 className="text-5xl">
          <Link href="/">Places to Read</Link>
        </h1>
        <p className="max-w-md mt-1">
          Parks around the world handpicked by the internet that are perfect to
          sit down in and enjoy a book. Built by{" "}
          <Link
            href="https://x.com/typicalmitul"
            isExternal
            className="underline w-fit"
          >
            @typicalmitul
          </Link>
          .
        </p>
        {route === "/" ? (
          <Link href="/about" className="flex items-center mt-4 gap-x-1 w-fit">
            About <Arrow />
          </Link>
        ) : (
          <Link href="/" className="flex items-center mt-4 gap-x-1 w-fit">
            <Arrow className="rotate-180" />
            Home
          </Link>
        )}
      </div>
      <div className="flex items-start mt-4 sm:mt-0 gap-x-2">
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button>Sugerir un lugar</Button>
          </Dialog.Trigger>
          <Dialog.Overlay className="fixed inset-0 z-10 bg-mcqueen/25 backdrop-brightness-90" />
          <Dialog.Content className="fixed inset-0 z-20 w-full max-w-md px-4 py-6 mx-auto mt-48 bg-white border-2 h-fit border-mcqueen">
            <Dialog.Close className="absolute z-50 p-4 text-6xl cursor-pointer -top-2 right-1 isolate">
              ̽
            </Dialog.Close>
            <form
              className="flex flex-col gap-y-4"
              method="POST"
              onSubmit={formSubmit}
            >
              <h2 className="text-xl leading-none">Sobre ti</h2>
              <div className="grid grid-cols-2 gap-x-2">
                <Field
                  label="Tu Social (opcional)"
                  placeholder="https://"
                  id="userTwitter"
                  onChange={handleParam()}
                  value={inputs.userTwitter}
                />
              </div>
              <hr className="border-mcqueen/25" />
              <h2 className="text-xl leading-none ">El Lugar</h2>
              <Field
                label="Nombre del lugar"
                placeholder="Parque José Prudencio Padilla"
                id="parkName"
                onChange={handleParam()}
                value={inputs.parkName}
              />
              <div className="grid grid-cols-2 gap-x-2">
                <Field
                  label="Ciudad"
                  placeholder="Barranquilla"
                  id="city"
                  onChange={handleParam()}
                  value={inputs.city}
                />
                <Field
                  label="Seguridad"
                  placeholder="Seguro"
                  id="safety"
                  onChange={handleParam()}
                  value={inputs.safety}
                  selectOptions={["Muy Seguro", "Seguro", "Regular", "Inseguro"]}
                />
              </div>
              <Field
                label="Describe el lugar (opcional pero recomendado)"
                placeholder="En tus propias palabras..."
                textArea
                rows={5}
                id="parkDescription"
                onChange={handleParam()}
                value={inputs.parkDescription}
              />

              <Button
                type="submit"
                className="p-2 text-white rounded-sm bg-mcqueen disabled:bg-black"
                disabled={submitted || submitting}
              >
                Enviar
              </Button>
              {submitted && (
                <p>
                  {
                    "¡Muchas gracias! Haré todo lo posible por añadir tu lugar pronto 🫶."
                  }
                </p>
              )}
            </form>
          </Dialog.Content>
        </Dialog.Root>
        {/* <Button>Share feedback</Button> */}
      </div>
    </header>
  );
}
