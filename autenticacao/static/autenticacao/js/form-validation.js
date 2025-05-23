document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const emailInput = form.querySelector('input[name="email"]');
    const senhaInput = form.querySelector('input[name="senha"]');
    const botao = form.querySelector('button[type="submit"]');

    function atualizarEstadoBotao() {
        botao.disabled = !(emailInput.value.trim() && senhaInput.value.trim());
    }

    emailInput.addEventListener('input', atualizarEstadoBotao);
    senhaInput.addEventListener('input', atualizarEstadoBotao);

    atualizarEstadoBotao();
});
