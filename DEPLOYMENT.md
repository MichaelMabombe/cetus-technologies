# Publicação — Cetus Technologies

O site está configurado como um projeto estático no Cloudflare Pages:

- Projeto: `cetustechnologies`
- Endereço: https://cetustechnologies.pages.dev
- Branch de produção: `main`
- Método: Direct Upload com Wrangler, sem publicação automática por Git.

## Publicar uma atualização

É necessário Node.js, Python 3 e uma sessão Cloudflare com acesso ao projeto.

```sh
./scripts/build-site.sh
npx --yes wrangler@4.132.0 pages deploy dist --project-name cetustechnologies --branch main --commit-dirty=true
```

O script recria `dist/` apenas com os HTML, CSS, JavaScript e diretórios
`assets/` e `servicos/`. Nunca publicar a raiz do repositório: contém ficheiros
Git e configurações do editor que não fazem parte do site.

O comando publica os ficheiros locais atuais, incluindo alterações ainda não
commitadas. Não faz commit nem push para o GitHub. Verificar o site público
após cada publicação.

## Futuro domínio cetustechnologies.co.mz

Depois da compra na MozDomain:

1. Adicionar o domínio à mesma conta Cloudflare.
2. Configurar na MozDomain os nameservers atribuídos pelo Cloudflare.
   Preservar quaisquer registos de email ou outros serviços existentes.
3. No projeto Pages, associar `cetustechnologies.co.mz` e
   `www.cetustechnologies.co.mz` em **Custom domains**.
4. Aguardar a ativação de DNS e HTTPS e verificar ambos os endereços.
5. Definir o endereço principal e os redirecionamentos dos endereços alternativos.

O domínio continua registado na MozDomain; o alojamento permanece no Cloudflare.
Não é necessário reconstruir o site para associar o novo domínio.

Referência: https://developers.cloudflare.com/pages/configuration/custom-domains/
