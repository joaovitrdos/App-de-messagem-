const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Tomar 3L de água por dia',
    checked: false,
}

let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:" })

    if (meta.length == 0) {
        console.log('A meta não pode ser vazia.')
        return
    }

    metas.push(
        { value: meta, checked: false }
    )
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if (respostas.length == 0) {
        console.log("Nenhuma meta selecionada!")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) marcadas como concluída(s)!")

}

const metasAbertas = async () => {
    const abertas = meta.filter((meta) => {
        return !meta.checked  // ! e igual != significa diferente 
    })

    if (abertas.length) {
        console.log("Não existem metas abertas! :)")
        return
    }

    await select({
        message: "Metas Abertas" + abertas.length,
        choices: [...abertas]
    })
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
        console.log("Não existem metas realizadas! :( ")
        return
    }

    await select({
        message: "Metas Realizadas: " + realizadas.length + "!",
        choices: [...realizadas],
    })

}

const removerMetas = async () => {

    const metasremover = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const intensADeletar = await checkbox({
        message: "Selecione um item para remover",
        choices: [...metasremover],
        instructions: false,

    })

    if (intensADeletar.length == 0) {
        console.log("Nenhum item a remover!")
        return
    }

    intensADeletar.forEach((item) =>{
        metas.filter((meta) =>{
            return meta.value != item
        })
    })

    console.log("Meta(s) removida(s) com sucesso!")

}

const start = async () => {
    while (true) {

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: " Metas realizadas",
                    value: "metasRealizadas"
                },
                {
                    name: " Metas abertas",
                    value: "metasAbertas"
                },
                {
                    name: " Remover",
                    value: "removerMetas"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

        switch (opcao) {
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "remover":
                await removerMetas()
                break
            case "sair":
                console.log('Até a próxima!')
                return
        }
    }
}

start();