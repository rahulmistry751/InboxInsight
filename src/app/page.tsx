'use client'

import { useEmailContext } from "./contexts/EmailContext";

export default function Home() {
  const {filters} = useEmailContext();
  return (
    <div className="grid grid-cols-12 grid-rows-2 p-14 h-full">
      <section className="cols-span-12 flex items-center">
        <div className="mr-4 w-max grow whitespace-nowrap">Filter By: </div>
        <div className="flex gap-4 grow">
          {filters.map((filter) => {
            return (
              <button
                key={filter.id}
                className="bg-backgroundAccent1 rounded-2xl py-px px-3.5 border border-neutralLight border-solid"
              >
                {filter.name}
              </button>
            );
          })}
        </div>
      </section>
      <section className="bg-primary">hi</section>
      <section className="bg-primary">helo</section>
    </div>
  );
}
