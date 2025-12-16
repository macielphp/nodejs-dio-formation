import chalk from 'chalk'
const promptQRCode = [
    {
        name: 'link',
        description: chalk.yellow('Digite o link para gerar o QR Code'),
    },
    {
        name:'type',
        description: chalk.yellow('Escolha (1- Normal) ou (2- Terminal):'),
        pattern: /^[1-2]+$/,
        message: chalk.red.italic('Apenas 1 ou 2, escolha: ')
    }
];

export default promptQRCode