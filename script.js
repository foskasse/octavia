// Datas importantes
const purchaseDate = new Date('2024-05-09');  // Data de compra do carro
const startDateInShop = new Date('2024-07-01');  // Data em que o carro foi para a oficina
const today = new Date();  // Data atual

// Calcula os dias em que o carro foi utilizado e os dias parado
const daysUsed = Math.floor((startDateInShop - purchaseDate) / (1000 * 3600 * 24));
const daysInShop = Math.floor((today - startDateInShop) / (1000 * 3600 * 24));

// Exibe o número de dias sem o carro
document.getElementById('counter').textContent = daysInShop + " dias";

// Função para criar o gráfico de pizza
function createChart() {
    const ctx = document.getElementById('carChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['A andar!  ', 'Oficina'],
            datasets: [{
                data: [daysUsed, daysInShop],
                backgroundColor: ['#4caf50', '#f44336'],
                hoverBackgroundColor: ['#66bb6a', '#ef5350']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                datalabels: {
                    color: '#ffffff',
                    formatter: (value, context) => {
                        const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                        const percentage = (value / total * 100).toFixed(2) + '%';
                        return percentage;
                    },
                    font: {
                        size: 18,
                        weight: 'bold'
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}
function updateStoryDays() {
    const storyElement = document.getElementById('story-days');
    if (storyElement) {
        storyElement.innerHTML = `Já passaram mais de ${daysInShop} dias — sim, mais tempo do que demora a encontrar um lugar de estacionamento em Lisboa — durante os quais o pobre Aurelius Bizarro mal pôde sequer espreitar o seu valente carrinho de ferro. Conta a lenda que o nosso herói, armado com a paciência de um santo e a teimosia de um burro, enfrenta a interminável odisseia de tentar reaver o seu precioso investimento.`;
    }
}

// Chama as funções para atualizar a página ao carregar
window.onload = function() {
    updateStoryDays();
    createChart();
};

