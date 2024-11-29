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
      </div>
      <div className="flex items-start mt-4 sm:mt-0 gap-x-2">
        <Button onClick={onOpenModal}>Sugerir un lugar</Button>
      </div>
    </header>
  );
}
