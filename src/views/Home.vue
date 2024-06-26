<template>
  <div class="container mt-5 font-principal">
    <h1 class="tittle-color">Análisis Sintáctico Ascendente</h1>
    <div style="margin: 0 auto;" class="text-start w-75">
      <p>El análisis sintáctico ascendente corresponde a la construcción de un árbol de análisis sintáctico para una cadena de entrada que empieza en las hojas y avanza hacía la raíz del árbol.

      En la siguiente imagen podemos una secuencia de cómo se construye el árbol de <span class="bold-text">análisis sintáctico ascendente</span>, podemos visualizar que parte desde los nodos hoja hacía la raíz del árbol.
      </p>


      <img src="@/assets/imagen__ascendente.png" alt="Imagen Ascendente" class="img-fluid rounded border boder-dark shadow-sm mx-auto d-block"/>
      <figcaption class="font-italic text-center mt-2">Diagrama del análisis sintáctico ascendente</figcaption>

      <h3 class="mt-3">Reducciones</h3>

      Podemos considerar que este análisis consiste en aplicar el proceso conocido como <span class="bold-text">reducciones</span>, donde se tiene una cadena w la cal se puede reducir al símbolo inicial de la gramática.

      <h3 class="mt-3"> Poda de Mangos</h3>

      Durante el recorrido de izquierda a derecha de la entrada, se construye una derivación por la derecha en forma inversa. Un <span class="bold-text">mango</span> es una subcadena que coincide con el cuerpo de una producción de la gramática.

    </div>

    <h2 class="tittle-color mt-4">Análisis sintáctico LR simple</h2>

    <div style="margin: 0 auto;" class="text-start w-75">
      <p>LR(k), la <em>"L"</em> indica la exploración de izquierda a derecha de la entrada, la <em>"R"</em> indica la construcción de una derivación por la derecha a la inversa, y la <em>"k"</em> para el número de símbolos de entrada de preanálisis que se utilizan al hacer decisiones del análisis sintáctico.
      </p>

      Estos analizadores sintácticos son controlados por tablas, similar al análisis sintáctico LL no recursivo. Para que una gramática sea LR, debe ser libre de contexto y debe tener la propiedad de ser analizable de izquierda a derecha y que cada <span class="bold-text">mango</span>  pueda ser reconocido de derecha a izquierda.
      
      <h3 class="mt-3">Desventaja</h3>

      Una de las principales desventajas de este método es que es demasiado trabajo construir un analizador sintáctico LR en forma manual para una gramática. Se requiere de un generador de analizadores sintácticos LR.<br>
      Un analizador sintáctico LR realiza las decisiones de desplazamiento-reducción mediante el mantenimiento de estados, para llevar el registro de la ubicación que tenemos en un análisis sintáctico.

      <h3 class="mt-3">¿Cómo sabe un analizador sintáctico LR(0) cuándo reducir y cuándo desplazar?</h3>
      Los estados representan conjuntos de "elementos". Un elemento LR(0) de una gramática G es una producción de G con un punto en cierta posición del cuerpo. Por ende, la producción A → XYZ produce:

      <div class="production-example">
        <div class="point">.</div>
        A → XYZ
      </div>

      En la animación, se plasma cómo el punto se va moviendo en cada posición del cuerpo de la producción A. El punto, indica qué parte de la producción hemos visto durante el proceso de análisis sintáctico. El punto nos dirá que símbolo se ha leído y qué esperamos ver a continuación. Esto proporciona la base para la construcción de un autómata finito determinista, el cual se utiliza para realizar decisiones durante el análisis.

      <h3 class="mt-3">Cerradura de conjuntos de elementos</h3>
      Si <em class="fw-bold">I</em> es un conjunto de elementos para una gramática G, entonces la cerradura de un conjunto de elementos se construye a partir de <em class="fw-bold">I</em> mediante las siguientes dos reglas:

      <ul>
        <li>
          Al inicio, agregar cada elemento en <em class="fw-bold">I</em> a CERRADURA(I).
        </li>
        <li>
          Si A → α.Bβ está en CERRADURA(I) y B → γ es una producción, entonces se debe agregar dicha producción a CERRADURA(I) siempre y cuando no esté ahí. Se debe aplicar esta regla hasta que no puedan agregarse más elementos nuevos.
        </li>
      </ul>

      <h3 class="mt-3 tittle-color">Ejemplo</h3>

      Consideremos la gramática que se ve en la siguiente imagen, la cual sirve para poder evaluar expresiones.

      <img src="@/assets/gramatica.png" alt="Imagen Ascendente" class="img-fluid rounded border boder-dark shadow-sm mx-auto mt-4 d-block"/>
      <figcaption class="font-italic text-center mt-2">Gramática para expresiones</figcaption>

      Primero que nada, se coloca la producción E' → ·E en la CERRADURA(I). Como a la derecha del punto tenemos una
      <span class="bold-text">E</span>, tenemos que agregar las producciones de <span class="bold-text">E</span> con puntos en los extremos izquierdos:
      <span class="fw-bold">E →·E + T y E →·T. </span>Ahora hay una T justo después de un punto, entonces también agregamos <span class="fw-bold">T → ·T ∗ F y T → ·F</span>.
      La F a la derecha de un punto nos obliga a agregar <span class="fw-bold">F → ·(E ) y F → ·id</span>.<br>
      Cada conjunto de elementos de interés se forma tomando la cerradura de un conjunto de elementos del corazón; desde luego que los elementos que se agregan en la cerradura nunca podrán ser elementos del corazón (Son todos los elementos cuyos puntos <span class="fw-bold text-danger">no estén en el extremo izquierdo</span>).<br><br>
      En la siguiente imagen, podemos ver el autómata donde se tiene cada conjunto de elementos, con sus respectivos símbolos de transición. Por ejemplo, para el estado Io, con E pasa al estado I1, esto es porque el punto se encuentra a la derecha de E, entonces se agregan las producciones que tengan el punto a la derecha de E. <br>
      En el estado I1, podemos ver en la segunda producción agregada que se tiene un punto justo a la izquierda del símbolo <span class="fw-bold">+</span>  entonces se avanza el punto y ahora tendríamos un nuevo estado con <span class="fw-bold">E → E + ·T</span>, el cual sería un elemento del corazón ya que apartir de este deriva todo el conjunto de este estado. Dado que <span class="fw-bold">T</span> tiene dos producciones, entonces se agrega <span class="fw-bold">T → ·T * F y T → ·F</span>, pero ahora podemos ver que el punto está a la izquierda del símbolo <span class="fw-bold">F</span>, entonces agregamos las producciones <span class="fw-bold">F → ·(E) y F → ·id </span>

      <img src="@/assets/AutomataLR.png" alt="Imagen Ascendente" class="img-fluid rounded border boder-dark shadow-sm mx-auto mt-4 d-block"/>
      <figcaption class="font-italic text-center mt-2">Autómata LR(0)</figcaption>

      En la imagen, los elementos que no están sombreados, son los elementos del corazón, es decir, a partir de esos elementos se pueden obtener todos los demás elementos <span class="fw-bold">elementos sombreados.</span>

      <h3 class="mt-3">La función Ir_A</h3>
      ir_A(I, X), en donde <em class="fw-bold">I</em> es un conjunto de elementos y X es un símbolo gramatical. Esta función se define como la cerradura del conjunto de todos los elementos [A → αX·β], de tal forma que
      [A → α·Xβ] se encuentre en I. Es decir, se utiliza para poder definir las transiciones del autómata LR(0) para una gramática. Como se mencionó anteriormente, los estados del autómata corresponden a los conjuntos de elementos, y ir_A(I, X) especifíca la transición que proviene del estado para I, con la entrada X.
    </div>
  </div>
</template>

<style scoped>
  .tittle-color {
    color: var(--color_principal);
    font-weight: bold;
    font-family: "Roboto Mono", sans-serif;
    text-transform: uppercase;
  }

  .production-example {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 10px;
  }

  .point {
    position:relative;
    color: var(--color_principal);
    top: 40px;
    animation-name: mover-punto;
    animation-iteration-count: infinite;
    animation-duration: 5s;
  }

  @keyframes mover-punto {
    0% {
      left: 0
    }

    25% {
      left: 40px;
    }

    50% {
      left: 70px;
    }

    75% {
      left: 100px;
    }
  }
</style>