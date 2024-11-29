"use client"; // This tells Next.js that this component uses client-side hooks

import { Park } from "@/app/types/homeTypes";
import * as Collapsible from "@radix-ui/react-collapsible";
import Link from "@/components/Link";
import { useState } from "react";
import Arrow from "./Arrow";
import MagnifyingGlass from "./MagnifyingGlass";

interface ParksListProps {
  parks: Park[];
}

export default function ParksList({ parks }: ParksListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredParks = parks.filter((park) =>
    Object.values(park).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const ParkRow = (props: Park) => {
    const {
      parkName,
      city,
      notableFeature,
      latitude,
      longitude,
      locationLink,
      description,
      submittedByLink,
      submittedByHandle,
      safety
    } = props;

    return (
      <Collapsible.Root>
        <li className="transition hover:bg-sally/10">
          <Collapsible.Trigger className="w-full grid text-left py-2.5 px-4 grid-cols-yeah group">
            <h2>{parkName}</h2>
            <div>{city}</div>
            <div>{notableFeature}</div>
            <div>{safety}</div>
            <Link
              href={locationLink}
              isExternal
              className="z-10 p-1 ml-4 leading-none transition rounded-sm bg-sally/50 w-fit hover:bg-mcqueen hover:text-white tabular-nums text-sm"
            >
              {latitude.substr(0, 8)}, {longitude.substr(0, 8)}
            </Link>
            <div className="ml-auto transition-transform duration-300 group-data-[state='open']:rotate-90 place-self-center">
              <Arrow />
            </div>
          </Collapsible.Trigger>
          <Collapsible.Content className="overflow-hidden data-[state=open]:open data-[state=closed]:close">
            <div className="grid px-4 overflow-hidden grid-cols-yeah">
              <div className="flex flex-col col-span-2 pl-12 ml-1.5 gap-y-6 pb-6 pt-3">
                <h3 className="sr-only">Descripción</h3>
                <p>{description}</p>
                <div className="flex leading-none gap-x-10">
                  <div>
                    <h3 className="text-sm mb-1.5">Sugerido por</h3>
                    {submittedByHandle ? (
                      <Link
                        href={submittedByLink}
                        isExternal
                        className="underline transition hover:bg-sally/50 underline-offset-4"
                      >
                        @{submittedByHandle}
                      </Link>
                    ) : (
                      <p>{submittedByLink}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Collapsible.Content>
        </li>
      </Collapsible.Root>
    );
  };

  const MobileParkRow = (props: Park) => {
    const {
      parkName,
      city,
      latitude,
      longitude,
      locationLink,
      description,
      submittedByLink,
      submittedByHandle,
      id,
      safety
    } = props;
    return (
      <Collapsible.Root>
        <li>
          <Collapsible.Trigger className="flex justify-center items-center gap-x-4 w-full pr-4 group">
            <div className="bg-mcqueen text-white px-4 py-6 z-10 w-full max-w-[3.5rem] -mb-px tabular-nums">
              {id && id.padStart(2, "0")}
            </div>
            <div className="flex flex-col text-left">
              <span>{parkName}</span>
              <span>
                {city}
              </span>
              <span>{"Seguridad: "+safety}</span>
            </div>
            <div className="ml-auto transition-transform duration-300 group-data-[state='open']:rotate-90">
              <Arrow />
            </div>
          </Collapsible.Trigger>
          <Collapsible.Content className="data-[state=open]:open data-[state=closed]:close overflow-hidden">
            <div className="flex flex-row">
              <div className="bg-mcqueen h-max-content w-full max-w-[3.5rem]" />
              <div className="px-4 pt-2">
                <p className="max-w-prose">{description}</p>
                <div className="flex flex-col mt-8 items-baseline leading-none bg-mcqueen/5 text-sm -mx-4 divide-y divide-mcqueen border-t border-mcqueen">
                  <div className="w-full py-3 flex flex-row justify-between px-4">
                    <h3>Sugerido por</h3>
                    {submittedByHandle ? (
                      <Link
                        href={submittedByLink}
                        isExternal
                        className="underline transition hover:bg-sally/50 underline-offset-4 w-fit"
                      >
                        @{submittedByHandle}
                      </Link>
                    ) : (
                      <p>{submittedByLink}</p>
                    )}
                  </div>
                  <div className="w-full py-3 flex flex-row justify-between px-4">
                    <h3>Ubicación</h3>
                    <Link
                      href={locationLink}
                      isExternal
                      className="underline transition hover:bg-sally/50 underline-offset-4 w-fit"
                    >
                      {latitude.substr(0, 8)}, {longitude.substr(0, 8)}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Collapsible.Content>
        </li>
      </Collapsible.Root>
    );
  };

  return (
    <>
    <div className="relative border-t sm:border border-mcqueen w-full font-medium bg-mcqueen/20 focus-within:bg-mcqueen/5 transition-all duration-200 grid grid-cols-yeah sm:mb-12 sm:-mt-4">
        <div className="col-[1/-1]">
          <MagnifyingGlass className="w-5 h-5 text-mcqueen/60 absolute top-1/2 left-4 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar lugares..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full outline-none placeholder:text-mcqueen/60 bg-transparent pr-4 pl-16 sm:pl-12 py-4 sm:py-2.5"
          />
        </div>
      </div>
      <ul className="sm:hidden grid w-full divide-y divide-mcqueen border-t-2 border-mcqueen">
        {filteredParks.map((park) => (
          <MobileParkRow key={park.id} {...park} />
        ))}
      </ul>

      <div className="hidden sm:block">
        <div className="text-xl border-b-2 border-mcqueen">
          <ul className="grid w-full px-4 grid-cols-yeah">
            <li className="pl-12 ml-1.5">Lugar</li>
            <li>Ciudad</li>
            <li>Característica principal</li>
            <li>Seguridad</li>
            <li className="pl-4">Mapa</li>
          </ul>
        </div>

        <div className="grid isolate">
          <ul className="z-10 border-b divide-y border-mcqueen divide-mcqueen park overlay">
            {filteredParks.map((park) => (
              <ParkRow key={park.id} {...park} />
            ))}
          </ul>
          <div className="w-full h-full content">
            <div className="grid w-full h-full px-4 grid-cols-yeah col-divider" />
          </div>
        </div>
        <div className="absolute grid w-full px-4 -translate-x-1/2 left-1/2 grid-cols-yeah col-divider" />
      </div>
      </>
  );
}
