const planICC = {
    "codigo": "IF01001",
    "carrera": "Ingeniería en Ciencias de la Computación",
    "bloques": [
        {
            "bloque": "I",
            "asignaturas": [
                {
                    "codigo": "MT101",
                    "nombre": "Matemáticas",
                    "creditos": 4,
                    "requisitos": []
                },
                {
                    "codigo": "ES101",
                    "nombre": "Español",
                    "creditos": 3,
                    "requisitos": []
                },
                {
                    "codigo": "SC101",
                    "nombre": "Sociología",
                    "creditos": 3,
                    "requisitos": []
                },
                {
                    "codigo": "FI101",
                    "nombre": "Filosofía",
                    "creditos": 3,
                    "requisitos": []
                },
                {
                    "codigo": "IF112",
                    "nombre": "Introducción a CC",
                    "creditos": 3,
                    "requisitos": []
                },
            ]
        },
        {
            "bloque": "II",
            "asignaturas": [
                {
                    "codigo": "ES201",
                    "nombre": "Expresión Oral y Escrita",
                    "creditos": 3,
                    "requisitos": ["ES101"]
                },
                {
                    "codigo": "MT201",
                    "nombre": "Pre cálculo",
                    "creditos": 4,
                    "requisitos": ["MT101"]
                },
                {
                    "codigo": "IF200",
                    "nombre": "Fundamentos y Lógica de Programación",
                    "creditos": 4,
                    "requisitos": ["IF112"]
                },
                {
                    "codigo": "HS101",
                    "nombre": "Historia de Honduras",
                    "creditos": 3,
                    "requisitos": []
                },
                {
                    "codigo": "CR201",
                    "nombre": "El Hombre Frente a la Vida",
                    "creditos": 3,
                    "requisitos": []
                },
            ]
        },
    ],

};

document.addEventListener("DOMContentLoaded", () => {
    const flujoGrama = new FlujoGrama("planflujo", planICC);
    flujoGrama.GenerateUX();
});

class FlujoGrama {
    constructor(rootId, plan) {
        this.plan = plan;
        this.root = document.getElementById(rootId);
        this.root.classList.add("plan");
    }
    GenerateUX() {
        this.createHeader();
        this.createBloques();
    }

    createHeader() {
        let header = document.createElement("H2");
        header.classList.add("plan_header");
        header.innerText = `${this.plan.codigo} - ${this.plan.carrera}`;
        this.root.appendChild(header);
    }
    createBloques() {

        this.plan.bloques.forEach((blq) => {
            let bloque = document.createElement("SECTION");
            bloque.classList.add("plan_bloque");
            let bloqueIndice = document.createElement("DIV");
            let bloqueAsignaturas = document.createElement("DIV");

            bloqueIndice.classList.add("plan_bloque_idx");
            bloqueAsignaturas.classList.add("plan_bloque_asig");

            bloqueIndice.innerText = blq.bloque;

            bloque.appendChild(bloqueIndice);
            bloque.appendChild(bloqueAsignaturas);
            this.root.appendChild(bloque);
        });
    }
}