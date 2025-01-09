$(document).ready(function () {
    // Kategori seçimi
    $('#categoryList').on('click', '.category-item', function () {
        const categoryId = $(this).data('id');
        $.ajax({
            url: '/products',
            method: 'GET',
            data: { category: categoryId },
            success: function (response) {
                const container = $('#productsContainer');
                container.html(''); // Eski ürünleri temizle

                // Eğer ürün varsa ekle, yoksa uyarı göster
                if (response.products && response.products.length > 0) {
                    response.products.forEach(product => {
                        container.append(`
                            <div class="col-md-4 mb-4">
                                <div class="card h-100">
                                    <img src="${product.image || '/images/placeholder.jpg'}" class="card-img-top" alt="${product.name}">
                                    <div class="card-body">
                                        <h5 class="card-title">${product.name}</h5>
                                        <p class="card-text">Price: $${product.price}</p>
                                        <button class="btn btn-info view-details" data-id="${product.id}">View Details</button>
                                    </div>
                                </div>
                            </div>
                        `);
                    });
                } else {
                    container.append('<p>No products found for this category.</p>');
                }
            },
            error: function () {
                alert('An error occurred while fetching products.');
            }
        });
    });

    // Ürün detaylarını modal içinde gösterme
    $(document).on('click', '.view-details', function () {
        const productId = $(this).data('id');
        $.ajax({
            url: `/products/${productId}`,
            method: 'GET',
            success: function (response) {
                if (response.product) {
                    $('#modalTitle').text(response.product.name);
                    $('#modalBody').html(`
                        <p>Price: $${response.product.price}</p>
                        <p>Description: ${response.product.description}</p>
                    `);
                    $('#productModal').modal('show'); // Modal açılır
                } else {
                    alert('Product details not found.');
                }
            },
            error: function () {
                alert('An error occurred while fetching product details.');
            }
        });
    });
});
$(document).on('submit', '.add-to-cart-form', function (event) {
    event.preventDefault(); // Sayfa yenilenmesini engelle
    const formData = $(this).serialize();

    $.ajax({
        url: '/cart/add',
        method: 'POST',
        data: formData,
        success: function (response) {
            alert('Product added to cart!');
            $('.cart-count').text(response.count); // Header'daki sepet sayısını güncelle
        },
        error: function () {
            alert('An error occurred while adding the product to the cart.');
        }
    });
});

$(document).on('click', '.remove-from-cart', function (event) {
    event.preventDefault(); // Sayfa yenilenmesini engelle
    const productId = $(this).data('id'); // Ürün ID'sini al

    $.ajax({
        url: '/cart/remove', // Backend endpoint
        method: 'POST',
        data: { productId },
        success: function (response) {
            console.log('Remove Response:', response); // Yanıtı kontrol edin
            alert('Product removed from cart!');
            updateCartView(); // Dinamik olarak sepeti güncelle
        },
        error: function () {
            alert('An error occurred while removing the product from the cart.');
        }
    });
});

function updateCartView() {
    $.ajax({
        url: '/cart', // Sepet görünümünü almak için GET isteği
        method: 'GET',
        success: function (html) {
            // Dönen HTML'den sadece `#cartContainer` içeriğini al
            const newContent = $('<div>').append($.parseHTML(html)).find('#cartContainer').html();
            $('#cartContainer').html(newContent); // Mevcut `#cartContainer`'i güncelle
        },
        error: function () {
            console.error('Failed to update cart view.');
        }
    });
}
