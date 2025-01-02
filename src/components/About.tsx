import { useState } from "react";
import TextHighlight from "./elements/TextHighlight"
import Modal from "./modal";

export default function About() {

  const [modal, setModal] = useState(false);
  return (
    <>
      <section
        id="about"
        className="grid grid-cols-1 pt-12 pb-20 md:pt-24 lg:grid-cols-12 xl:py-20"
      >
        <h1
          className="col-span-3 text-accent uppercase font-semibold text-xl mb-4 lg:text-right lg:mr-24 lg:w-52"
        >
          Sobre mí
        </h1>
        <article
          className="font-light flex flex-col gap-5 md:max-w-2xl lg:col-span-9 lg:max-w-2xl lg:text-pretty"
        >
          <p>
            Actualmente soy Ingeniero en{" "}
            <TextHighlight
              url="https://www.bertrandt.com/en/hmi-ux-development"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bertrandt
            </TextHighlight>{" "}
            creando la{" "}
            <TextHighlight
              url="https://www.seat.uy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Interfaz HMI
            </TextHighlight>{" "}
            de los vehículos{" "}
            <TextHighlight
              url="https://www.cupraofficial.es/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CUPRA
            </TextHighlight>{" "}
            y{" "}
            <TextHighlight
              url="https://www.seat.es/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SEAT
            </TextHighlight>
            .
          </p>
          <p>
            Como Ingeniero Multimedia, disfruto navegando entre ingeniería y
            diseño, combinando el conocimiento técnico con mi buen ojo para el
            diseño con el fin de crear un producto visualmente atractivo.
          </p>
          <p className="relative">
            <span className="font-semibold">
              Cuando no estoy delante de una pantalla
            </span>
            , seguramente esté disfrutando de una sesión de gimnasio, leyendo
            todo tipo de fantasía o aprendiendo a ser mejor{" "}
            <TextHighlight url="/photography" setModal={setModal}>fotógrafo.</TextHighlight>
          </p>
          <Modal modal={modal} />
        </article>
      </section>
    </>
  );
}
