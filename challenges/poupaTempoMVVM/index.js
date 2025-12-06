// ============================================
// MODEL - Dados e Regras de Negócio
// ============================================

class Cidadao {
    constructor(nome, cpf) {
        this.nome = nome
        this.cpf = cpf
        this.senha = null
        this.horarioAgendamento = null
        this.status = 'aguardando' // aguardando, chamado, atendido
    }
}

class PoupatempoModel {
    constructor() {
        this.agendamentos = []
        this.senhaAtual = 1000
        this.senhasChamadas = []
    }

    // ========================================
    // CRUD Operations (como queries no banco)
    // ========================================
    
    // CREATE
    criarAgendamento(cidadao) {
        const senha = this.gerarSenha()
        cidadao.senha = senha
        cidadao.horarioAgendamento = new Date()
        this.agendamentos.push(cidadao)
        return senha
    }

    // READ
    buscarPorCpf(cpf) {
        return this.agendamentos.find(c => c.cpf === cpf)
    }

    buscarPorSenha(senha) {
        return this.agendamentos.find(c => c.senha === senha)
    }

    getTodosAgendamentos() {
        return this.agendamentos
    }

    getFilaEspera() {
        return this.agendamentos.filter(c => c.status === 'aguardando')
    }

    // UPDATE
    atualizarStatus(senha, novoStatus) {
        const cidadao = this.buscarPorSenha(senha)
        if (cidadao) {
            cidadao.status = novoStatus
            return true
        }
        return false
    }

    // DELETE
    removerAgendamento(cpf) {
        const index = this.agendamentos.findIndex(c => c.cpf === cpf)
        if (index !== -1) {
            this.agendamentos.splice(index, 1)
            return true
        }
        return false
    }

    // ========================================
    // Business Rules (Regras de Negócio)
    // ========================================

    gerarSenha() {
        return this.senhaAtual++
    }

    validarCpf(cpf) {
        // Remove caracteres não numéricos
        const cpfLimpo = cpf.replace(/[^\d]/g, '')
        
        // Verifica se tem 11 dígitos
        if (cpfLimpo.length !== 11) {
            return false
        }
        
        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1{10}$/.test(cpfLimpo)) {
            return false
        }
        
        return true
    }

    cpfJaAgendado(cpf) {
        return this.agendamentos.some(c => c.cpf === cpf && c.status !== 'atendido')
    }

    podeAgendar(cpf) {
        return this.validarCpf(cpf) && !this.cpfJaAgendado(cpf)
    }

    getProximoNaFila() {
        const fila = this.getFilaEspera()
        return fila.length > 0 ? fila[0] : null
    }

    getTotalPessoasNaFila() {
        return this.getFilaEspera().length
    }

    getTempoMedioEspera() {
        // Estimativa: 10 minutos por pessoa
        return this.getTotalPessoasNaFila() * 10
    }
}

// ============================================
// VIEWMODEL - Orquestração e Transformação
// ============================================

class PoupatempoViewModel {
    constructor(model) {
        this.model = model
        this.observers = []
    }

    // Observer Pattern
    subscribe(observer) {
        this.observers.push(observer)
    }

    notify(event, data) {
        this.observers.forEach(observer => observer.update(event, data))
    }

    // ========================================
    // FLUXO 1: Agendar Cidadão
    // ========================================
    
    agendarCidadao(nome, cpf) {
        // Valida CPF (Model)
        if (!this.model.validarCpf(cpf)) {
            this.notify('erro', {
                mensagem: 'CPF inválido! Verifique o formato (XXX.XXX.XXX-XX)'
            })
            return
        }

        // Verifica se pode agendar (Model)
        if (!this.model.podeAgendar(cpf)) {
            this.notify('erro', {
                mensagem: 'Este CPF já possui agendamento ativo!'
            })
            return
        }

        // Cria cidadão e agenda (Model)
        const cidadao = new Cidadao(nome, cpf)
        const senha = this.model.criarAgendamento(cidadao)

        // Calcula informações para exibição
        const posicaoFila = this.model.getTotalPessoasNaFila()
        const tempoEstimado = this.model.getTempoMedioEspera()

        // Notifica View com dados transformados
        this.notify('agendamentoRealizado', {
            nome: cidadao.nome,
            senha: this.formatarSenha(senha),
            posicaoFila: posicaoFila,
            tempoEstimado: this.formatarTempo(tempoEstimado),
            horario: this.formatarHorario(cidadao.horarioAgendamento)
        })
    }

    // ========================================
    // FLUXO 2: Chamar Próxima Senha
    // ========================================
    
    chamarProximaSenha() {
        const proximo = this.model.getProximoNaFila()

        if (!proximo) {
            this.notify('filaVazia', {
                mensagem: 'Não há pessoas na fila'
            })
            return
        }

        // Atualiza status (Model)
        this.model.atualizarStatus(proximo.senha, 'chamado')

        // Notifica View
        this.notify('senhaChamada', {
            senha: this.formatarSenha(proximo.senha),
            nome: proximo.nome,
            cpf: this.formatarCpf(proximo.cpf)
        })
    }

    // ========================================
    // FLUXO 3: Consultar Fila de Espera
    // ========================================
    
    consultarFila() {
        const fila = this.model.getFilaEspera()
        const total = this.model.getTotalPessoasNaFila()
        const tempoEstimado = this.model.getTempoMedioEspera()

        // Transforma dados para exibição
        const filaFormatada = fila.map((cidadao, index) => ({
            posicao: index + 1,
            senha: this.formatarSenha(cidadao.senha),
            nome: cidadao.nome,
            horario: this.formatarHorario(cidadao.horarioAgendamento)
        }))

        this.notify('filaCarregada', {
            fila: filaFormatada,
            total: total,
            tempoEstimado: this.formatarTempo(tempoEstimado)
        })
    }

    // ========================================
    // FLUXO 4: Consultar por CPF
    // ========================================
    
    consultarPorCpf(cpf) {
        // Valida CPF
        if (!this.model.validarCpf(cpf)) {
            this.notify('erro', {
                mensagem: 'CPF inválido!'
            })
            return
        }

        // Busca cidadão (Model)
        const cidadao = this.model.buscarPorCpf(cpf)

        if (!cidadao) {
            this.notify('naoEncontrado', {
                mensagem: 'CPF não encontrado nos agendamentos'
            })
            return
        }

        // Calcula posição na fila
        const fila = this.model.getFilaEspera()
        const posicao = fila.findIndex(c => c.cpf === cpf) + 1

        // Notifica View com dados formatados
        this.notify('agendamentoEncontrado', {
            nome: cidadao.nome,
            cpf: this.formatarCpf(cidadao.cpf),
            senha: this.formatarSenha(cidadao.senha),
            status: this.formatarStatus(cidadao.status),
            posicao: posicao > 0 ? posicao : '-',
            horario: this.formatarHorario(cidadao.horarioAgendamento)
        })
    }

    // ========================================
    // FLUXO 5: Finalizar Atendimento
    // ========================================
    
    finalizarAtendimento(senha) {
        const cidadao = this.model.buscarPorSenha(senha)

        if (!cidadao) {
            this.notify('erro', {
                mensagem: 'Senha não encontrada'
            })
            return
        }

        // Atualiza status (Model)
        this.model.atualizarStatus(senha, 'atendido')

        this.notify('atendimentoFinalizado', {
            nome: cidadao.nome,
            senha: this.formatarSenha(senha)
        })
    }

    // ========================================
    // Métodos de Formatação (Transform Data)
    // ========================================

    formatarSenha(senha) {
        return `${String(senha).padStart(4, '0')}`
    }

    formatarCpf(cpf) {
        const limpo = cpf.replace(/[^\d]/g, '')
        return limpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    }

    formatarHorario(data) {
        return data.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        })
    }

    formatarTempo(minutos) {
        if (minutos < 60) {
            return `${minutos} minutos`
        }
        const horas = Math.floor(minutos / 60)
        const mins = minutos % 60
        return `${horas}h ${mins}min`
    }

    formatarStatus(status) {
        const statusMap = {
            'aguardando': '⏳ Aguardando',
            'chamado': '📢 Chamado',
            'atendido': '✅ Atendido'
        }
        return statusMap[status] || status
    }
}

// ============================================
// VIEW - Apresentação (Console)
// ============================================

class PoupatempoConsoleView {
    constructor(viewModel) {
        this.viewModel = viewModel
        this.viewModel.subscribe(this)
    }

    // Reage aos eventos do ViewModel
    update(event, data) {
        switch(event) {
            case 'agendamentoRealizado':
                this.mostrarAgendamentoRealizado(data)
                break

            case 'senhaChamada':
                this.mostrarSenhaChamada(data)
                break

            case 'filaCarregada':
                this.mostrarFila(data)
                break

            case 'agendamentoEncontrado':
                this.mostrarDetalhesAgendamento(data)
                break

            case 'atendimentoFinalizado':
                this.mostrarAtendimentoFinalizado(data)
                break

            case 'filaVazia':
                this.mostrarFilaVazia(data)
                break

            case 'erro':
                this.mostrarErro(data)
                break

            case 'naoEncontrado':
                this.mostrarNaoEncontrado(data)
                break
        }
    }

    // Métodos de renderização
    mostrarAgendamentoRealizado(data) {
        console.log('\n════════════════════════════════')
        console.log('✅ AGENDAMENTO REALIZADO COM SUCESSO!')
        console.log('════════════════════════════════')
        console.log(`👤 Nome: ${data.nome}`)
        console.log(`🎫 Senha: ${data.senha}`)
        console.log(`📍 Posição na fila: ${data.posicaoFila}º`)
        console.log(`⏰ Tempo estimado: ${data.tempoEstimado}`)
        console.log(`🕐 Horário: ${data.horario}`)
        console.log('════════════════════════════════\n')
    }

    mostrarSenhaChamada(data) {
        console.log('\n🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔')
        console.log('     SENHA CHAMADA!     ')
        console.log('🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔')
        console.log(`\n       🎫 ${data.senha}       \n`)
        console.log(`👤 ${data.nome}`)
        console.log(`📋 CPF: ${data.cpf}`)
        console.log('🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔🔔\n')
    }

    mostrarFila(data) {
        console.log('\n════════════════════════════════')
        console.log('📋 FILA DE ESPERA')
        console.log('════════════════════════════════')
        console.log(`Total de pessoas: ${data.total}`)
        console.log(`Tempo estimado: ${data.tempoEstimado}`)
        console.log('────────────────────────────────')
        
        if (data.fila.length === 0) {
            console.log('   Fila vazia')
        } else {
            data.fila.forEach(item => {
                console.log(`${item.posicao}º - Senha ${item.senha} - ${item.nome} - ${item.horario}`)
            })
        }
        console.log('════════════════════════════════\n')
    }

    mostrarDetalhesAgendamento(data) {
        console.log('\n════════════════════════════════')
        console.log('🔍 DETALHES DO AGENDAMENTO')
        console.log('════════════════════════════════')
        console.log(`👤 Nome: ${data.nome}`)
        console.log(`📋 CPF: ${data.cpf}`)
        console.log(`🎫 Senha: ${data.senha}`)
        console.log(`📊 Status: ${data.status}`)
        console.log(`📍 Posição na fila: ${data.posicao}`)
        console.log(`🕐 Horário: ${data.horario}`)
        console.log('════════════════════════════════\n')
    }

    mostrarAtendimentoFinalizado(data) {
        console.log('\n════════════════════════════════')
        console.log('✅ ATENDIMENTO FINALIZADO')
        console.log('════════════════════════════════')
        console.log(`👤 ${data.nome}`)
        console.log(`🎫 Senha: ${data.senha}`)
        console.log('════════════════════════════════\n')
    }

    mostrarFilaVazia(data) {
        console.log('\n⚠️  ' + data.mensagem + '\n')
    }

    mostrarErro(data) {
        console.log('\n❌ ERRO: ' + data.mensagem + '\n')
    }

    mostrarNaoEncontrado(data) {
        console.log('\n🔍 ' + data.mensagem + '\n')
    }

    // Métodos de interação (chamados pelo usuário/menu)
    agendar(nome, cpf) {
        this.viewModel.agendarCidadao(nome, cpf)
    }

    chamarProximo() {
        this.viewModel.chamarProximaSenha()
    }

    verFila() {
        this.viewModel.consultarFila()
    }

    consultarCpf(cpf) {
        this.viewModel.consultarPorCpf(cpf)
    }

    finalizarAtendimento(senha) {
        this.viewModel.finalizarAtendimento(senha)
    }
}

// ============================================
// MAIN - Simulação do Sistema
// ============================================

const main = () => {
    console.log('🏢 SISTEMA POUPATEMPO - GESTÃO DE SENHAS')
    console.log('==========================================\n')

    // Inicializa as camadas MVVM
    const model = new PoupatempoModel()
    const viewModel = new PoupatempoViewModel(model)
    const view = new PoupatempoConsoleView(viewModel)

    // Simula alguns agendamentos
    console.log('📝 Realizando agendamentos...\n')
    view.agendar('João Silva', '123.456.789-09')
    view.agendar('Maria Santos', '987.654.321-00')
    view.agendar('José Oliveira', '111.222.333-44')

    // Tenta agendar CPF inválido
    console.log('🧪 Testando CPF inválido...')
    view.agendar('Pedro Costa', '111.111.111-11')

    // Tenta agendar CPF duplicado
    console.log('🧪 Testando CPF duplicado...')
    view.agendar('João Silva', '123.456.789-09')

    // Consulta a fila
    console.log('📋 Consultando fila de espera...')
    view.verFila()

    // Chama próxima senha
    console.log('📢 Chamando próxima senha...')
    view.chamarProximo()

    // Consulta por CPF
    console.log('🔍 Consultando agendamento por CPF...')
    view.consultarCpf('987.654.321-00')

    // Finaliza atendimento
    console.log('✅ Finalizando atendimento...')
    view.finalizarAtendimento(1000)

    // Mostra fila atualizada
    console.log('📋 Fila atualizada após atendimento...')
    view.verFila()
}

main()