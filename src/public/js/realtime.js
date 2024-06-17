const socketClient = io();

socketClient.on("enviodeproducts", (productos) => {
  console.log("Productos recibidos:", productos);
  renderizarListaDeProductos(productos);
});

socketClient.on("productUpdated", (updatedProduct) => {
  console.log("Producto actualizado:", updatedProduct);
  // Solicitar la lista de productos nuevamente
  socketClient.emit("requestProducts");
});

socketClient.on("productUpdateFailed", (error) => {
  console.error("Error al actualizar el producto:", error);
});

function renderizarListaDeProductos(listaDeProductos) {
  const productosDiv = document.getElementById("list-products");
  let productosHTML = "";

  listaDeProductos.forEach((producto) => {
    productosHTML += `
      <div id="producto-${producto._id}">
        <div>
          <div>Código del producto: ${producto.code}</div>
          <div>
            <h4>${producto.title}</h4>
            <p>
              <ul>
                <li><img src="${producto.thumbnail}" alt="Imagen"></li>
                <li>ID: ${producto._id}</li>
                <li>Descripción: ${producto.description}</li>
                <li>Precio: $${producto.price}</li>
                <li>Categoría: ${producto.category}</li>
                <li>Estado: ${producto.status ? 'Activo' : 'Inactivo'}</li>
                <li>Unidades disponibles: ${producto.stock}</li>
              </ul>
            </p>
          </div>
          <div>
            <button type="button" onclick="eliminarProducto('${producto._id}')">Eliminar</button>
            <button type="button" onclick="mostrarFormularioEditar('${producto._id}')">Editar</button>
          </div>
          <div id="form-edit-${producto._id}" style="display:none;">
            <form id="editForm-${producto._id}">
              <label for="title-${producto._id}">Título:</label>
              <input type="text" id="title-${producto._id}" name="title" value="${producto.title}" placeholder="Título">
              <label for="description-${producto._id}">Descripción:</label>
              <textarea id="description-${producto._id}" name="description" placeholder="Descripción">${producto.description}</textarea>
              <label for="stock-${producto._id}">Stock:</label>
              <input type="number" id="stock-${producto._id}" name="stock" value="${producto.stock}" placeholder="Stock">
              <label for="thumbnail-${producto._id}">URL de Imagen:</label>
              <input type="text" id="thumbnail-${producto._id}" name="thumbnail" value="${producto.thumbnail}" placeholder="URL de Imagen">
              <label for="category-${producto._id}">Categoría:</label>
              <input type="text" id="category-${producto._id}" name="category" value="${producto.category}" placeholder="Categoría">
              <label for="price-${producto._id}">Precio:</label>
              <input type="number" id="price-${producto._id}" name="price" value="${producto.price}" placeholder="Precio">
              <label for="code-${producto._id}">Código:</label>
              <input type="text" id="code-${producto._id}" name="code" value="${producto.code}" placeholder="Código">
              <label for="status-${producto._id}"><input type="checkbox" id="status-${producto._id}" name="status" ${producto.status ? 'checked' : ''}> Activo</label>
              <button type="submit">Actualizar Producto</button>
              <button type="button" onclick="ocultarFormularioEditar('${producto._id}')">Cancelar</button>
            </form>
          </div>
        </div>
      </div>`;
  });

  productosDiv.innerHTML = productosHTML;
  addEventListenersToEditForms();
}

function addEventListenersToEditForms() {
  document.querySelectorAll('[id^="editForm-"]').forEach(form => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const productId = form.id.replace('editForm-', '');
      console.log("Enviando producto actualizado, ID:", productId);

      const updatedProduct = {
        id: productId,
        title: form.elements.title.value,
        description: form.elements.description.value,
        stock: form.elements.stock.value,
        thumbnail: form.elements.thumbnail.value,
        category: form.elements.category.value,
        price: form.elements.price.value,
        code: form.elements.code.value,
        status: form.elements.status.checked,
      };
      console.log("Datos del producto actualizado:", updatedProduct);

      socketClient.emit("updateProduct", updatedProduct);
      ocultarFormularioEditar(productId);
    });
  });
}

// Maneja el formulario de añadir productos
const form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  console.log("Añadiendo nuevo producto");

  const newProduct = {
    title: form.elements.title.value,
    description: form.elements.description.value,
    stock: form.elements.stock.value,
    thumbnail: form.elements.thumbnail.value,
    category: form.elements.category.value,
    price: form.elements.price.value,
    code: form.elements.code.value,
    status: form.elements.status.checked,
  };

  console.log("Datos del nuevo producto:", newProduct);
  socketClient.emit("addProduct", newProduct);
  form.reset();
});

// Maneja el evento de eliminación de productos
function eliminarProducto(productId) {
  console.log("Eliminando producto, ID:", productId);
  socketClient.emit("deleteProduct", productId);
}

function mostrarFormularioEditar(productId) {
  console.log("Mostrando formulario de edición, ID:", productId);
  document.getElementById(`form-edit-${productId}`).style.display = 'block';
}

function ocultarFormularioEditar(productId) {
  console.log("Ocultando formulario de edición, ID:", productId);
  document.getElementById(`form-edit-${productId}`).style.display = 'none';
}

// Solicita la lista de productos al cargar la página
socketClient.emit("requestProducts");
