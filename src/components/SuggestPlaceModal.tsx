import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import Button from "./Button";
import Field from "./Field";

export interface SuggestPlaceModalProps {
  isOpen: boolean,
  onClose: () => void
}

export default function SuggestPlaceModal({ isOpen, onClose }: SuggestPlaceModalProps) {
  const [inputs, setInputs] = useState({
    userInstagram: "",
    parkName: "",
    city: "",
    parkDescription: "",
    safety: "Muy Seguro",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleParam = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

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
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 z-10 bg-mcqueen/25 backdrop-brightness-90" />
      <Dialog.DialogContent className="fixed inset-0 z-20 w-full max-w-md px-4 py-6 mx-auto mt-24 md:mt-48 bg-white border-2 h-fit border-mcqueen" aria-labelledby="suggest-place-title">
        <Dialog.DialogTitle id="suggest-place-title" className="sr-only"> 
          Sugerir un lugar
        </Dialog.DialogTitle>
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
              placeholder="@"
              id="userInstagram"
              onChange={handleParam}
              value={inputs.userInstagram}
            />
          </div>
          <hr className="border-mcqueen/25" />
          <h2 className="text-xl leading-none ">El Lugar</h2>
          <Field
            label="Nombre del lugar"
            placeholder="Parque lineal de Crespo"
            id="parkName"
            onChange={handleParam}
            value={inputs.parkName}
          />
          <div className="grid grid-cols-2 gap-x-2">
            <Field
              label="Ciudad"
              placeholder="Cartagena"
              id="city"
              onChange={handleParam}
              value={inputs.city}
            />
            <Field
              label="Seguridad"
              placeholder="Seguro"
              id="safety"
              onChange={handleParam}
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
            onChange={handleParam}
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
              {"¡Muchas gracias! Haré todo lo posible por añadir tu lugar pronto 🫶."}
            </p>
          )}
        </form>
      </Dialog.DialogContent>
    </Dialog.Root>
  );
}
