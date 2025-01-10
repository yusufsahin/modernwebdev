$(document).ready(function () {
    // Sayfa yüklendiğinde kategori ve ürünleri yükle
    $.ajax({
        url: '/api/initialize',
        method: 'GET',
        success: function (response) {
            renderCategories(response.categories); // Kategorileri render et
            renderProducts(response.products); // Ürünleri render et
        },
        error: function () {
            renderError('Error loading data.');
        }
    });

    // Kategori Listesini Render Et
    function renderCategories(categories) {
        const categoryList = $('#categoryList');
        categoryList.html(''); // Mevcut içeriği temizle
        categories.forEach(category => {
            categoryList.append(`
                <a href="#" class="list-group-item category-item" data-id="${category.id}">
                    ${category.name}
                </a>
            `);
        });
    }

    // Ürün Listesini Render Et
    function renderProducts(products) {
        const productsContainer = $('#productsContainer');
        productsContainer.html(''); // Mevcut içeriği temizle
        products.forEach(product => {
            productsContainer.append(`
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <h5>${product.name}</h5>
                            <p>Price: $${product.price}</p>
                            <button class="btn btn-info view-details" data-id="${product.id}">View Details</button>
                            <button class="btn btn-success add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `);
        });
    }

    // Kategoriye Göre Ürün Filtreleme
    $(document).on('click', '.category-item', function (event) {
        event.preventDefault(); // Sayfa yenilemeyi engelle
        const categoryId = $(this).data('id'); // Tıklanan kategori ID'sini al

        $.ajax({
            url: '/api/products',
            method: 'GET',
            data: { category: categoryId }, // Kategori ID'sini gönder
            success: function (response) {
                renderProducts(response.products); // Yeni ürünleri render et
            },
            error: function () {
                renderError('Error fetching products for selected category.');
            }
        });
    });

    // Ürün Detay Sayfasına Yönlendirme
    $(document).on('click', '.view-details', function (event) {
        event.preventDefault(); // Varsayılan davranışı engelle
        const productId = $(this).data('id');

        // Yeni sayfaya yönlendir
        window.location.href = `/products/${productId}`;
    });

    // Sepetten Ürün Kaldır
    $(document).on('click', '.remove-from-cart', function () {
        const productId = $(this).data('id'); // Silinecek ürün ID'sini al

        $.ajax({
            url: '/api/cart/remove', // Backend API rotası
            method: 'POST',
            data: { productId },
            success: function (response) {
                renderCart(response.cart); // Güncel sepeti yeniden oluştur
                updateCartBadge(response.cartCount); // Sepet rozetini güncelle
                showNotification('Product removed from cart.', 'success'); // Başarılı bildirim
            },
            error: function () {
                showNotification('Error removing product from cart.', 'danger'); // Hata bildirimi
            }
        });
    });

    // Sepeti Render Et
    function renderCart(cart) {
        const cartContainer = $('#cartContainer');

        if (!cart || cart.length === 0) {
            // Eğer sepet boşsa
            cartContainer.html('<p>Your cart is empty.</p>');
            return;
        }

        // Sepet doluysa
        let cartHtml = `
            <h2>Your Cart</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

        cart.forEach(item => {
            const price = item.price || 0;
            const quantity = item.quantity || 0;

            cartHtml += `
                <tr>
                    <td>${item.name || 'Unknown Product'}</td>
                    <td>$${price.toFixed(2)}</td>
                    <td>${quantity}</td>
                    <td>$${(price * quantity).toFixed(2)}</td>
                    <td>
                        <button class="btn btn-danger remove-from-cart" data-id="${item.productId}">Remove</button>
                    </td>
                </tr>
            `;
        });

        cartHtml += `
                </tbody>
            </table>
        `;

        cartContainer.html(cartHtml);
    }

    // Sepet Rozetini Güncelle
    function updateCartBadge(count) {
        $('.cart-count').text(count);
    }

    // Bildirim Göster
    function showNotification(message, type) {
        const notificationContainer = $('#notificationContainer');
        notificationContainer.html(`
            <div class="alert alert-${type}" role="alert">
                ${message}
            </div>
        `);
        setTimeout(() => notificationContainer.html(''), 3000); // 3 saniye sonra bildirimi temizle
    }

    // Hata Mesajı Göster
    function renderError(message) {
        showNotification(message, 'danger');
    }
});


$(document).on('click', '.add-to-cart', function () {
    const productId = $(this).data('id'); // Ürün ID'sini alın

    $.ajax({
        url: '/api/cart/add', // Backend API rotası
        method: 'POST',
        data: { productId }, // Ürün ID'sini gönder
        success: function (response) {
            updateCartBadge(response.cartCount); // Sepet rozetini güncelle
            showNotification('Product added to cart!', 'success'); // Başarılı bildirim
        },
        error: function () {
            showNotification('Error adding product to cart.', 'danger'); // Hata bildirimi
        }
    });
});

function updateCartBadge(count) {
    $('.cart-count').text(count); // Sepet rozetini güncelle
}
function showNotification(message, type) {
    const notificationContainer = $('#notificationContainer'); // Bildirim için HTML öğesi
    notificationContainer.html(`
        <div class="alert alert-${type}" role="alert">
            ${message}
        </div>
    `);
    setTimeout(() => notificationContainer.html(''), 3000); // 3 saniye sonra bildirimi temizle
}

