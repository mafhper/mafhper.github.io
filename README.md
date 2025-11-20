# System Online | Matheus Pereira

> "Wake up, Neo..."

Bem-vindo ao meu portfólio pessoal.

![Preview](assets/images/profile.jpg)

## 🖥️ Funcionalidades

- **Terminal UI**: Interface inspirada em terminais clássicos com cores de fósforo verde.
- **Efeitos CRT**: Scanlines, cintilação de tela e brilho (glow) para autenticidade retro.
- **Animações**:
  - Efeito de digitação (Typewriter) na inicialização.
  - Glitch effects em textos e imagens.
  - Cursor piscante.
- **Integração GitHub**: Busca automática dos repositórios fixados usando a API pública do GitHub.
- **Página 404 Personalizada**: Tela de "SYSTEM FAILURE" com logs de erro simulados.
- **Responsivo**: Adaptável para dispositivos móveis mantendo a estética.

## 🛠️ Tecnologias

- **HTML5**: Estrutura semântica.
- **CSS3**: Variáveis, Flexbox, Grid, Keyframe Animations (sem frameworks).
- **JavaScript (ES6+)**: Fetch API, manipulação de DOM.

## 🚀 Como Rodar Localmente

Este é um site estático, mas para testar funcionalidades ou evitar problemas de CORS localmente, recomenda-se usar um servidor simples.

### Pré-requisitos
- Python 3.x instalado

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/mafhper/mafhper.github.io.git
   cd mafhper.github.io
   ```

2. Execute o servidor HTTP padrão do Python:
   ```bash
   python -m http.server 8000
   ```

3. Acesse no navegador:
   - Home: `http://localhost:8000`

## 🎨 Estrutura do Projeto

```
.
├── assets/
│   ├── css/       # Estilos (index.css)
│   ├── js/        # Lógica (main.js)
│   └── images/    # Imagens e ícones
├── 404.html       # Página de erro personalizada
├── index.html     # Página principal
└── .nojekyll      # Impede processamento do Jekyll pelo GitHub Pages
```

## 📄 Licença

Este projeto é de código aberto. Sinta-se à vontade para usar como inspiração.

---
*SYSTEM INTEGRITY: 100%*
