// importante para o Tauri
//função de escrever arquivos do plugin 'fs' (File System) do Tauri
const { writeTextFile } = window.__TAURI__.fs;

//função de abrir a janela "Salvar Como" do plugin 'dialog' do Tauri
const { save } = window.__TAURI__.dialog;

// id do meu html para o textarea (texto)
const texto = document.getElementById("texto");

// id do meu elemento de resultado
const resultado = document.getElementById("resultado");

async function salvarArquivo() {
  try {
    // Abre a janela "Salvar Como" e espera o usuário escolher um caminho
    resultado.innerText = "Salvando arquivo... Por favor, aguarde.";

    // Abre a caixinha nativa do sistema e espera o usuário escolher a pasta e o nome
    const caminhoArqivo = await save({
      filters: [{
        name: "salver como txt",
        extensions: ['txt']
      }]
    });
// Se o "caminhoArquivo" existir (ou seja, o usuário não cancelou)
    if (caminhoArqivo) {
      // Escreve o valor do seu textarea dentro do caminho do arquivo selecionado
      await writeTextFile(caminhoArqivo, texto.value);

      // Atualiza o seu elemento de status
      resultado.innerText = "Arquivo salvo com sucesso!";
    } else {
      // Se o usuário cancelar, mostra a mensagem de cancelamento
      resultado.innerText = "Operação cancelada pelo usuário.";
    }
    // Se o usuário cancelar ou ocorrer um erro, mostra a mensagem de erro
   }catch (error) {
    resultado.innerText = "Erro ao salvar o arquivo: ";
    console.error(error);
   }
  } 

  window.salvarArquivo = salvarArquivo;