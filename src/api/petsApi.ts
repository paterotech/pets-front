'use server';

import { useEffect, useMemo, useState } from 'react';

export async function getPets() {

    const [pets, setPets] = useState([]);
  // Simula una llamada a una API o base de datos
  return [
    { id: 1, name: 'Max', years: 2, description: "Juguetón y cariñoso. Busca familia activa.", icon: 'dog' },
    { id: 2, name: 'Teo', years: 3, description: "Tranquilo y fiel. Ideal para compañía.", icon: 'dog' },
    { id: 3, name: 'Zeus', years: 4, description: "Energético y protector. Le encanta jugar.", icon: 'dog' },
    { id: 4, name: 'Luna', years: 4, description: "Dócil y tierna. Perfecta para niños.", icon: 'cat' },
    { id: 5, name: 'Estrella', years: 1, description: "Curiosa y activa. Muy sociable.",
        icon: 'cat' },

  ];
}