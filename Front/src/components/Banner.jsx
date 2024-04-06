import React from "react";



import  imgbanner from  "../images/gestionviajes.png"

function Banner({}) {
  return (
    <section className="flex flex-col md:flex-row bg-slate-200">
      <div className="md:flex-1">
        <img
          src={imgbanner}
          alt="logo"
          className="h-[80%] w-[80%] opacity-50"
          loading="eager"
        />
      </div>
      <div className="md:flex-1">
        <p className="text-lg mt-12">
          Diseña un panel intuitivo que muestra información clave, como la lista
          de pasajeros, estado de pagos, destinos y fechas del viaje. <br />{" "}
          Permite al organizador agregar detalles de cada pasajero, como nombre,
          contacto, preferencias y estado de pago. La capacidad de modificar o
          eliminar pasajeros. <br /> sistema que registra los pagos de cada
          pasajero, indicando si pagaron total, parcial o nada. incluye
          notificaciones para recordar los pagos pendientes. <br />
          Mantén un historial de actividades, como cambios en la lista de
          pasajeros o actualizaciones de pago. Esto proporcionará una visión
          completa del proceso organizativo.
        </p>
      </div>
    </section>
  );
}

export default Banner;
