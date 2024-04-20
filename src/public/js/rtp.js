const socket = io();

socket.on("enviando productos", (productList) => {
    ProductList(productList);
});

function ProductList(productList) {
    const productsDiv = document.getElementById("list-products");
    let productosHTML = "";
    productList.forEach(product => {
        productosHTML += `
            <div class="">
                <div class="">
                    <div class="">
                        <img
                            src="${product.img}"
                            alt="Imagen descriptiva del producto"
                        />
                    </div>
                    <div class="">
                        <div class="">
                            <h5>${product.title}</h5>
                            <p>${product.description}</p>
                            <div class="">
                                <p><strong>Categoria:</strong> ${product.category}</p>
                                <p><strong>Precio:</strong> ${product.price}</p>
                                <p><strong>Unidades disponibles:</strong> ${product.stock}</p>
                            </div>
                            <div class="">
                                <small><strong>ID:</strong> ${product.id}</small>
                                <small><strong>Código:</strong> ${product.code}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    });
    productsDiv.innerHTML = productosHTML;
}

// Manejamiento del formulario para la creación de productos
const form = document.getElementById("formProduct");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = form.elements.title.value;
    const description = form.elements.description.value;
    const price = parseFloat(form.elements.price.value);
    const img = form.elements.img.value;
    const code = form.elements.code.value;
    const stock = parseInt(form.elements.stock.value);
    const category = form.elements.category.value;
    const status = form.elements.status.checked; // Verifica si el checkbox está marcado
    const thumbnails = form.elements.thumbnails.value.split(",").map(url => url.trim());
  
    socket.emit("addProduct", {
        title,
        description,
        price,
        img,
        code,
        stock,
        category,
        status,
        thumbnails,
    });

    form.reset();
});


document.getElementById("delete-btn").addEventListener("click", function () {
    const deleteInput = document.getElementById("id-prod");
    const deleteId = deleteInput.value;

    socket.emit("deleteProduct", deleteId);

    deleteInput.value = "";
});
