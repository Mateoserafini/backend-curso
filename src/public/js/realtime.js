// Establece una conexión con el servidor mediante Socket.io
const socketClient = io();

// Evento que recibe la lista de productos desde el servidor
socketClient.on("enviodeproducts", (obj) => {
  ProductList(obj); // Llama a la función para actualizar la lista de productos
});

// Función para renderizar la lista de productos en el DOM
function ProductList(productList) {
  const productsDiv = document.getElementById("list-products"); // Obtiene el elemento de la lista de productos
  let productosHTML = ""; // Variable para almacenar el HTML de los productos

  // Itera sobre la lista de productos recibidos
  productList.forEach((product) => {
    productosHTML += `
    <div class="">
      <div class="">
          <div class="">Código del producto: ${
            product.code
          }</div>
          <div class="">
              <h4 class="">${product.title}</h4>
              <p class="">
              <ul class="">
                <li><img src="${
                  product.thumbnail
                }" alt="img" class=""></li>
                <li>ID: ${product._id}</li>
                <li>Descripción: ${product.description}</li>
                <li>Precio: $${product.price}</li>
                <li>Categoría: ${product.category}</li>
                <li>Estado: ${product.status}</li>
                <li>Unidades disponibles: ${product.stock}</li>
              </ul>
              </p>
          </div>
          <div class="">
            <div class="">
              <button type="button" class="" onclick="deleteProduct('${
                product._id
              }')">Eliminar</button>
            </div>
          </div>
      </div>
    </div>`;
  });
  // Actualiza el contenido del elemento con la lista de productos
  productsDiv.innerHTML = productosHTML;
}

// Maneja el evento de envío del formulario para agregar un producto
let form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
  evt.preventDefault(); // Evita el envío predeterminado del formulario
  // Obtiene los valores de los campos del formulario
  let title = form.elements.title.value;
  let description = form.elements.description.value;
  let stock = form.elements.stock.value;
  let thumbnail = form.elements.thumbnail.value;
  let category = form.elements.category.value;
  let price = form.elements.price.value;
  let code = form.elements.code.value;
  let status = form.elements.status.checked;

  // Envía un evento al servidor con los datos del nuevo producto
  socketClient.emit("addProduct", {
    title,
    description,
    stock,
    thumbnail,
    category,
    price,
    code,
    status,
  });

  form.reset(); // Resetea los campos del formulario
});

// Maneja el evento de clic en el botón de eliminar producto
document.getElementById("delete-btn").addEventListener("click", function () {
  const deleteidinput = document.getElementById("id-prod"); // Obtiene el campo de entrada del ID del producto a eliminar
  const deleteid = deleteidinput.value; // Obtiene el valor del ID
  socketClient.emit("deleteProduct", deleteid); // Envía un evento al servidor para eliminar el producto
  deleteidinput.value = ""; // Limpia el campo de entrada del ID
});

// Función para eliminar un producto
function deleteProduct(productId) {
  socketClient.emit("deleteProduct", productId); // Envía un evento al servidor para eliminar el producto
}
