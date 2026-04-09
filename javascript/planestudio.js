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
        {
            "bloque": "III",
            "asignaturas": [
                {
                    "codigo": "MT301",
                    "nombre": "Cálculo",
                    "creditos": 4,
                    "requisitos": ["MT201"]
                },
                {
                    "codigo": "MT102",
                    "nombre": "Estadística I",
                    "creditos": 4,
                    "requisitos": ["MT101"]
                },
                {
                    "codigo": "IF214",
                    "nombre": "Programación Estructurada I",
                    "creditos": 3,
                    "requisitos": ["IF200"]
                },
                {
                    "codigo": "IF213",
                    "nombre": "Estructura Discretas",
                    "creditos": 3,
                    "requisitos": ["IF200"]
                },
                {
                    "codigo": "BG205",
                    "nombre": "Ecología",
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
        this.pseudoDom = {};
        this.selected = null;
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
            this.createAsignaturas(bloqueAsignaturas, blq);
            this.root.appendChild(bloque);
        });
    }

    createAsignaturas(bloqueDOM, blqDef) {
        blqDef.asignaturas.forEach((asg) => {
            let asignaturaDOM = document.createElement("DIV");
            asignaturaDOM.classList.add("plan_asignatura");
            let codigoDom = document.createElement("DIV");
            codigoDom.innerText = asg.codigo;
            let descripcionDom = document.createElement("DIV");
            descripcionDom.innerText = `${asg.nombre} (${asg.creditos})`;
            asignaturaDOM.appendChild(codigoDom);
            asignaturaDOM.appendChild(descripcionDom);
            bloqueDOM.appendChild(asignaturaDOM);
            // Agregar
            this.pseudoDom[asg.codigo] = {};
            this.pseudoDom[asg.codigo]["nodo"] = asignaturaDOM;
            this.pseudoDom[asg.codigo]["requisitos"] = [];
            this.pseudoDom[asg.codigo]["apertura"] = [];
            asg.requisitos.forEach(rq => {
                this.pseudoDom[asg.codigo]["requisitos"].push(
                    this.pseudoDom[rq].nodo
                );
                this.pseudoDom[rq].apertura.push(
                    this.pseudoDom[asg.codigo].nodo
                );
            });
            this.pseudoDom[asg.codigo]["nodo"].addEventListener(
                "click",
                (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (this.selected) {
                        this.selected.nodo.classList.remove("plan_selected");
                        this.selected.requisitos.forEach(
                            n => n.classList.remove("plan_requisito")
                        );
                        this.selected.apertura.forEach(
                            n => n.classList.remove("plan_apertura")
                        );
                    }
                    this.selected = this.pseudoDom[asg.codigo];
                    this.selected.nodo.classList.add("plan_selected");
                    this.selected.requisitos.forEach(
                        n => n.classList.add("plan_requisito")
                    );
                    this.selected.apertura.forEach(
                        n => n.classList.add("plan_apertura")
                    );
                }
            );
        });
    }
}