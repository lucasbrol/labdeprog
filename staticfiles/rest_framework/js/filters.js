// Função imediata para isolar o código
(function() {
    // Função para ser executada quando o DOM estiver carregado
    function initFilters() {
        console.log('Inicializando sistema de filtros...');
        
        // Referências aos elementos do DOM
        const productCards = document.querySelectorAll('.product-card');
        const sizeCheckboxes = document.querySelectorAll('input[name="size"]');
        const colorCheckboxes = document.querySelectorAll('.color-option input');
        const collectionCheckboxes = document.querySelectorAll('input[name="collection"]');
        const minPriceInput = document.getElementById('min-price');
        const maxPriceInput = document.getElementById('max-price');
        const applyPriceBtn = document.querySelector('.apply-price-btn, #apply-price, button:contains("Aplicar")') || 
                            document.querySelector('button[class*="aplicar" i], button[id*="aplicar" i]') ||
                            document.querySelector('button').filter(btn => btn.textContent.toLowerCase().includes('aplicar'));
        const clearFiltersBtn = document.getElementById('clear-filters');
        
        console.log('Produtos encontrados:', productCards.length);
        console.log('Botão aplicar:', applyPriceBtn);
        
        // Objeto para armazenar os filtros ativos
        const activeFilters = {
            size: [],
            color: [],
            collection: [],
            minPrice: null,
            maxPrice: null
        };
        
        // Adicionando eventos aos checkboxes de tamanho
        sizeCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                console.log('Tamanho alterado:', this.value, this.checked);
                updateFilterArray('size', this.value, this.checked);
            });
        });
        
        // Adicionando eventos aos checkboxes de cor
        colorCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                console.log('Cor alterada:', this.value, this.checked);
                updateFilterArray('color', this.value, this.checked);
            });
        });
        
        // Adicionando eventos aos checkboxes de coleção
        collectionCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                console.log('Coleção alterada:', this.value, this.checked);
                updateFilterArray('collection', this.value, this.checked);
            });
        });
        
        // Função auxiliar para atualizar arrays de filtro
        function updateFilterArray(filterType, value, checked) {
            if (checked) {
                if (!activeFilters[filterType].includes(value)) {
                    activeFilters[filterType].push(value);
                }
            } else {
                const index = activeFilters[filterType].indexOf(value);
                if (index > -1) {
                    activeFilters[filterType].splice(index, 1);
                }
            }
            console.log('Filtros ativos:', JSON.stringify(activeFilters));
        }
        
        // Usando delegação de eventos para capturar qualquer botão Aplicar na página
        document.addEventListener('click', function(e) {
            if (e.target && (
                e.target.id === 'apply-price' || 
                e.target.classList.contains('apply-price-btn') ||
                (e.target.tagName === 'BUTTON' && e.target.textContent.trim().toLowerCase() === 'aplicar')
            )) {
                e.preventDefault();
                console.log('Botão Aplicar clicado via delegação');
                
                // Atualizar filtros de preço
                activeFilters.minPrice = minPriceInput && minPriceInput.value ? parseFloat(minPriceInput.value) : null;
                activeFilters.maxPrice = maxPriceInput && maxPriceInput.value ? parseFloat(maxPriceInput.value) : null;
                
                console.log('Aplicando filtros:', JSON.stringify(activeFilters));
                applyFilters();
            }
        });
        
        // Adicionando evento ao botão de limpar filtros
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', function() {
                console.log('Botão Limpar Filtros clicado');
                
                // Desmarca todos os checkboxes
                sizeCheckboxes.forEach(checkbox => checkbox.checked = false);
                colorCheckboxes.forEach(checkbox => checkbox.checked = false);
                collectionCheckboxes.forEach(checkbox => checkbox.checked = false);
                
                // Limpa os campos de preço
                if (minPriceInput) minPriceInput.value = '';
                if (maxPriceInput) maxPriceInput.value = '';
                
                // Reseta os filtros ativos
                for (const key in activeFilters) {
                    if (Array.isArray(activeFilters[key])) {
                        activeFilters[key] = [];
                    } else {
                        activeFilters[key] = null;
                    }
                }
                
                // Mostra todos os produtos
                productCards.forEach(card => {
                    card.style.display = '';
                });
                
                // Remove mensagem de nenhum resultado se existir
                const noResultsMessage = document.querySelector('.no-results-message');
                if (noResultsMessage) {
                    noResultsMessage.remove();
                }
            });
        }
        
        // Função para aplicar os filtros
        function applyFilters() {
            console.log('Aplicando filtros...');
            let visibleCount = 0;
            
            productCards.forEach(card => {
                let shouldShow = true;
                
                // Filtra por tamanho
                if (activeFilters.size.length > 0) {
                    const cardSizes = card.dataset.size ? card.dataset.size.split(',') : [];
                    // Verificação adicional para o caso de não ter o atributo data-size
                    if (cardSizes.length === 0) {
                        // Tenta encontrar referência ao tamanho no título ou classe
                        const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
                        const hasSize = activeFilters.size.some(size => 
                            title.includes('tamanho ' + size.toLowerCase()) || 
                            title.includes('tam ' + size.toLowerCase())
                        );
                        if (!hasSize) shouldShow = false;
                    } else {
                        const sizeMatch = activeFilters.size.some(size => cardSizes.includes(size));
                        if (!sizeMatch) shouldShow = false;
                    }
                }
                
                // Filtra por cor
                if (shouldShow && activeFilters.color.length > 0) {
                    const cardColor = card.dataset.color;
                    // Verificação adicional para o caso de não ter o atributo data-color
                    if (!cardColor) {
                        // Tenta encontrar referência à cor no título
                        const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
                        const hasColor = activeFilters.color.some(color => 
                            title.includes(color.toLowerCase())
                        );
                        if (!hasColor) shouldShow = false;
                    } else {
                        const colorMatch = activeFilters.color.includes(cardColor);
                        if (!colorMatch) shouldShow = false;
                    }
                }
                
                // Filtra por coleção
                if (shouldShow && activeFilters.collection.length > 0) {
                    const cardCollection = card.dataset.collection;
                    // Verificação adicional para o caso de não ter o atributo data-collection
                    if (!cardCollection) {
                        // Tenta encontrar referência à coleção no título
                        const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
                        const hasCollection = activeFilters.collection.some(collection => {
                            if (collection === 'sportif') return title.includes('le suf sportif');
                            if (collection === '4suf') return title.includes('4suf');
                            if (collection === 'basic') return title.includes('basic');
                            return false;
                        });
                        if (!hasCollection) shouldShow = false;
                    } else {
                        const collectionMatch = activeFilters.collection.includes(cardCollection);
                        if (!collectionMatch) shouldShow = false;
                    }
                }
                
                // Filtra por preço
                if (shouldShow && (activeFilters.minPrice !== null || activeFilters.maxPrice !== null)) {
                    // Tenta obter o preço do dataset primeiro
                    let cardPrice;
                    if (card.dataset.price) {
                        cardPrice = parseFloat(card.dataset.price);
                    } else {
                        // Caso não tenha dataset, extrai do texto
                        const priceEl = card.querySelector('.product-price');
                        if (priceEl) {
                            const priceText = priceEl.textContent.replace(/[^\d,]/g, '').replace(',', '.');
                            cardPrice = parseFloat(priceText);
                        }
                    }
                    
                    if (cardPrice !== undefined) {
                        if (activeFilters.minPrice !== null && cardPrice < activeFilters.minPrice) {
                            shouldShow = false;
                        }
                        
                        if (activeFilters.maxPrice !== null && cardPrice > activeFilters.maxPrice) {
                            shouldShow = false;
                        }
                    }
                }
                
                // Aplica o display diretamente ao elemento
                card.style.display = shouldShow ? '' : 'none';
                
                if (shouldShow) {
                    visibleCount++;
                }
            });
            
            console.log('Produtos visíveis após filtragem:', visibleCount);
            
            // Verifica se há produtos visíveis após a filtragem
            checkEmptyResults();
        }
        
        // Verifica se não há resultados após a filtragem
        function checkEmptyResults() {
            const visibleProducts = Array.from(productCards).filter(card => card.style.display !== 'none');
            const productGrid = document.getElementById('filtered-products') || document.querySelector('.product-grid');
            
            console.log('Verificando resultados vazios. Produtos visíveis:', visibleProducts.length);
            
            // Remove mensagem de "nenhum resultado" se existir
            const existingMessage = document.querySelector('.no-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Adiciona mensagem se não houver produtos visíveis
            if (visibleProducts.length === 0 && productGrid) {
                console.log('Nenhum produto corresponde aos filtros selecionados');
                const noResultsMessage = document.createElement('div');
                noResultsMessage.className = 'no-results-message';
                noResultsMessage.textContent = 'Nenhum produto corresponde aos filtros selecionados.';
                noResultsMessage.style.cssText = 'grid-column: 1 / -1; padding: 30px; text-align: center; color: #666; font-size: 16px; background-color: #f5f5f5; border-radius: 8px; margin-top: 20px;';
                productGrid.appendChild(noResultsMessage);
            }
        }
    }
    
    // Verifica se o DOM já está carregado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFilters);
    } else {
        initFilters();
    }
})();
