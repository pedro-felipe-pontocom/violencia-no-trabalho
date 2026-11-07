# Expediente: violência no mundo do trabalho

Apresentação de Sociologia em forma de site (18 slides). Funciona offline: fontes e a biblioteca de animação (GSAP 3.13) estão nas pastas do projeto.

## Como abrir

Dê dois cliques em `index.html`. De preferência no **Google Chrome** ou no **Microsoft Edge**.
Para abrir direto num slide, use `index.html#7` (slide 7).

## Atalhos

| Tecla | O que faz |
|---|---|
| → ↓ Espaço PageDown | próximo slide (também clique na tela ou deslize no celular) |
| ← ↑ PageUp | slide anterior (clicar no quarto esquerdo da tela também volta) |
| F | tela cheia |
| N | notas do apresentador (o texto do que falar) |
| P | notas numa janela separada, com cronômetro e botões |
| O | visão geral com miniaturas |
| B | tela preta (pausa para conversar com a turma) |
| 5 + Enter | pula para o slide 5 |
| Home / End | primeiro / último slide |
| H | mostra os atalhos |

Projetor como **tela estendida**: abra a apresentação no projetor (F) e aperte P para ver as notas no notebook.
Projetor **duplicado** (mesma imagem nas duas telas): use as notas impressas ou no celular, porque o N aparece para a turma também.

Se o computador tiver "reduzir movimento" ligado, as animações são desligadas automaticamente.

## Como editar

Tudo que é texto fica em **`js/slides.js`**. Abra no Bloco de Notas ou no VS Code.

- **Nomes do grupo, professor(a), turma, escola e data**: o bloco `window.TRABALHO`, logo no começo do arquivo.
- **Texto dos slides**: cada `{ ... }` é um slide, na ordem. Troque só o que está entre aspas.
- **Notas do apresentador**: o campo `notas`, entre crases (\`). Linha em branco separa parágrafos.
- **Marcações animadas** dentro de qualquer texto:
  - `==texto==` marca-texto vermelho
  - `~~texto~~` riscado
  - `__texto__` sublinhado à mão
  - `**texto**` negrito

Cuidado com as aspas e as vírgulas no fim das linhas: se o arquivo quebrar, a página fica em branco. Desfaça a última mudança (Ctrl+Z) e salve de novo.

## Pastas

```
index.html        estrutura da página
css/style.css     visual (cores, letras, layout de cada slide)
css/fonts.css     fontes locais
js/slides.js      TODO o conteúdo (edite aqui)
js/layouts.js     HTML e animação de cada tipo de slide
js/deck.js        navegação, notas, visão geral
js/gsap.min.js    biblioteca de animação
fonts/            Anton, Newsreader e Courier Prime (licença OFL)
assets/           texturas de papel e ícone
```

## PDF de reserva

Abra `index.html?estatico` no Chrome, aperte Ctrl+P, escolha **Salvar como PDF**, com **Gráficos de fundo** ligado. Sai um PDF com um slide por página.

## Publicar de graça (abrir por link)

**GitHub Pages**
1. Crie uma conta em github.com e um repositório público (ex.: `sociologia`).
2. Na página do repositório: *Add file › Upload files*, arraste todo o conteúdo desta pasta e confirme (*Commit changes*).
3. *Settings › Pages*: em *Branch*, escolha `main` e `/ (root)`, depois *Save*.
4. Em um ou dois minutos o link aparece ali: `https://SEU-USUARIO.github.io/sociologia/`.

**Vercel**
1. Crie uma conta em vercel.com (dá para entrar com o GitHub).
2. *Add New › Project* e importe o repositório do GitHub, ou instale a CLI e rode `npx vercel` dentro desta pasta.
3. Não precisa configurar nada: é um site estático. O link sai no fim.

## Créditos técnicos

Fontes: Anton, Newsreader e Courier Prime, todas sob SIL Open Font License (arquivos em `fonts/`).
Animação: GSAP 3.13 (gsap.com, licença padrão gratuita).
