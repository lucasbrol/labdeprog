document.addEventListener('DOMContentLoaded', function () {
    const applyBtn = document.getElementById('apply-price');
    const clearBtn = document.getElementById('clear-filters');
    const productCards = document.querySelectorAll('.product-card');

    function applyFilters() {
        const selectedTypes = Array.from(document.querySelectorAll('input[name="tipo"]:checked')).map(cb => cb.value);
        const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(cb => cb.value);
        const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(cb => cb.value);
        const selectedCollections = Array.from(document.querySelectorAll('input[name="collection"]:checked')).map(cb => cb.value);
        
        const minPrice = document.getElementById('min-price').value ? parseFloat(document.getElementById('min-price').value) : 0;
        const maxPrice = document.getElementById('max-price').value ? parseFloat(document.getElementById('max-price').value) : Infinity;

        productCards.forEach(card => {
            let isVisible = true;

            if (isVisible && selectedTypes.length > 0) {
                const productTipo = card.dataset.tipo;
                if (!selectedTypes.includes(productTipo)) isVisible = false;
            }
            
            if (selectedSizes.length > 0) {
                const productSizes = card.dataset.size.split(',');
                const hasSizeMatch = selectedSizes.some(size => productSizes.includes(size));
                if (!hasSizeMatch) isVisible = false;
            }

            if (isVisible && selectedColors.length > 0) {
                const productColor = card.dataset.color;
                if (!selectedColors.includes(productColor)) isVisible = false;
            }

            if (isVisible && selectedCollections.length > 0) {
                const productCollection = card.dataset.collection;
                if (!selectedCollections.includes(productCollection)) isVisible = false;
            }

            if (isVisible) {
                const productPrice = parseFloat(card.dataset.price);
                if (productPrice < minPrice || productPrice > maxPrice) isVisible = false;
            }

            card.style.display = isVisible ? 'block' : 'none';
        });

        const visibleProducts = document.querySelectorAll('.product-card[style="display: block"]');
        if (visibleProducts.length === 0) {
            const noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.textContent = 'Nenhum produto corresponde aos filtros selecionados.';
            noResultsMsg.style.gridColumn = '1 / -1';
            noResultsMsg.style.padding = '30px';
            noResultsMsg.style.textAlign = 'center';
            noResultsMsg.style.color = '#666';
            noResultsMsg.style.backgroundColor = '#f5f5f5';
            noResultsMsg.style.borderRadius = '8px';
            noResultsMsg.style.margin = '20px 0';

            const existingMsg = document.querySelector('.no-results-message');
            if (existingMsg) existingMsg.remove();

            document.getElementById('filtered-products').appendChild(noResultsMsg);
        } else {
            const existingMsg = document.querySelector('.no-results-message');
            if (existingMsg) existingMsg.remove();
        }
    }

    function clearFilters() {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        document.getElementById('min-price').value = '';
        document.getElementById('max-price').value = '';

        productCards.forEach(card => {
            card.style.display = 'block';
        });

        const existingMsg = document.querySelector('.no-results-message');
        if (existingMsg) existingMsg.remove();
    }

    if (applyBtn) {
        applyBtn.addEventListener('click', function (e) {
            e.preventDefault();
            applyFilters();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function (e) {
            e.preventDefault();
            clearFilters();
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

    function updateWishlistCount() {
        const wishlistBadge = document.querySelector('.wishlist-badge');
        if (wishlistBadge) {
            wishlistBadge.textContent = wishlistItems.length;
        }
    }

    function renderWishlistItems() {
        const wishlistContainer = document.getElementById('wishlist-items');
        const emptyMessage = document.getElementById('wishlist-empty');
        if (!wishlistContainer) return;
        wishlistContainer.innerHTML = '';

        if (wishlistItems.length === 0) {
            wishlistContainer.style.display = 'none';
            emptyMessage.style.display = 'block';
            return;
        }

        wishlistContainer.style.display = 'grid';
        emptyMessage.style.display = 'none';

        wishlistItems.forEach(item => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <button class="remove-wishlist-btn" data-produto-id="${item.id}">❌</button>
                <img src="${item.image}" alt="${item.title}" class="product-image">
                <h3 class="product-title">${item.title}</h3>
                <p class="product-price">${item.price}</p>
                <button class="buy-button">Comprar</button>
            `;
            const removeBtn = productCard.querySelector('.remove-wishlist-btn');
            removeBtn.addEventListener('click', function () {
                removeFromWishlist(item.id);
            });
            wishlistContainer.appendChild(productCard);
        });
    }

    function addToWishlist(productId) {
        const exists = wishlistItems.some(item => item.id === productId);
        if (!exists) {
            const productElement = document.querySelector(`.product-card[data-produto-id="${productId}"]`);
            if (productElement) {
                const title = productElement.querySelector('.product-title').textContent;
                const price = productElement.querySelector('.product-price').textContent;
                const imageSrc = productElement.querySelector('.product-image').src;

                wishlistItems.push({ id: productId, title, price, image: imageSrc });
                localStorage.setItem('wishlist', JSON.stringify(wishlistItems));

                const heartIcon = document.querySelector(`.wishlist-btn[data-produto-id="${productId}"] .heart-icon`);
                if (heartIcon) heartIcon.classList.add('active');

                updateWishlistCount();
            }
        }
    }

    function removeFromWishlist(productId) {
        wishlistItems = wishlistItems.filter(item => item.id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));

        const heartIcon = document.querySelector(`.wishlist-btn[data-produto-id="${productId}"] .heart-icon`);
        if (heartIcon) heartIcon.classList.remove('active');

        updateWishlistCount();
        renderWishlistItems();
    }

    document.querySelectorAll('.wishlist-btn').forEach(button => {
        const productId = button.dataset.produtoId;
        if (wishlistItems.some(item => item.id === productId)) {
            button.querySelector('.heart-icon').classList.add('active');
        }

        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const heartIcon = this.querySelector('.heart-icon');
            if (heartIcon.classList.contains('active')) {
                removeFromWishlist(productId);
                heartIcon.classList.remove('active');
            } else {
                addToWishlist(productId);
                heartIcon.classList.add('active');
            }
        });
    });

    document.getElementById('open-wishlist').addEventListener('click', function () {
        const wishlistSection = document.getElementById('wishlist-section');
        if (wishlistSection.style.display === 'none') {
            renderWishlistItems();
            wishlistSection.style.display = 'block';
        } else {
            wishlistSection.style.display = 'none';
        }
    });

    updateWishlistCount();
});


document.addEventListener('DOMContentLoaded', function () {
    const toggleCategorias = document.getElementById('toggle-categorias');
    const listaCategorias = document.getElementById('lista-categorias');

    toggleCategorias.addEventListener('click', function () {
        listaCategorias.classList.toggle('mostrar');
    });

    document.addEventListener('click', function (e) {
        if (!toggleCategorias.contains(e.target) && !listaCategorias.contains(e.target)) {
            listaCategorias.classList.remove('mostrar');
        }
    });
});
