const socketClient = io();

socketClient.on("enviodeproducts", (obj) => {
  renderizarListaDeProductos(obj);
});

function renderizarListaDeProductos(listaDeProductos) {
  const productosDiv = document.getElementById("list-products");
  let productosHTML = "";

  listaDeProductos.forEach((producto) => {
    productosHTML += `
      <div>
        <div>
          <div>Código del producto: ${producto.code}</div>
          <div>
            <h4>${producto.title}</h4>
            <p>
              <ul>
                <li><img src="${producto.thumbnail}" alt="img"></li>
                <li>ID: ${producto._id}</li>
                <li>Descripción: ${producto.description}</li>
                <li>Precio: $${producto.price}</li>
                <li>Categoría: ${producto.category}</li>
                <li>Estado: ${producto.status}</li>
                <li>Unidades disponibles: ${producto.stock}</li>
              </ul>
            </p>
          </div>
          <div>
            <button type="button" onclick="eliminarProducto('${producto._id}')">Eliminar</button>
          </div>
        </div>
      </div>`;
  });

  productosDiv.innerHTML = productosHTML;
}

const form = document.getElementById("formProduct");
form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const title = form.elements.title.value;
  const description = form.elements.description.value;
  const stock = form.elements.stock.value;
  const thumbnail = form.elements.thumbnail.value;
  const category = form.elements.category.value;
  const price = form.elements.price.value;
  const code = form.elements.code.value;
  const status = form.elements.status.checked;

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

  form.reset();
});

document.getElementById("delete-btn").addEventListener("click", () => {
  const deleteIdInput = document.getElementById("id-prod");
  const deleteId = deleteIdInput.value;
  socketClient.emit("deleteProduct", deleteId);
  deleteIdInput.value = "";
});

function eliminarProducto(productId) {
  socketClient.emit("deleteProduct", productId);
}
