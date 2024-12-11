document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const quantidade = document.getElementById('quantidade').value;

    const response = await fetch('/equipamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, descricao, quantidade }),
    });

    if (response.ok) alert('Equipamento cadastrado com sucesso!');
});

document.getElementById('registroForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const equipamentoId = document.getElementById('equipamentoId').value;
    const atividade = document.getElementById('atividade').value;

    const response = await fetch('/atividades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ equipamentoId, atividade }),
    });

    if (response.ok) alert('Atividade registrada com sucesso!');
});

async function carregarEquipamentos() {
    const response = await fetch('/equipamentos');
    const equipamentos = await response.json();

    const tabela = document.getElementById('equipamentosTable');
    tabela.innerHTML = '';
    equipamentos.forEach(eq => {
        tabela.innerHTML += `<tr>
            <td>${eq.id}</td>
            <td>${eq.nome}</td>
            <td>${eq.descricao}</td>
            <td>${eq.quantidade}</td>
        </tr>`;
    });
}

carregarEquipamentos();
