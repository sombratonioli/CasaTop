# Fluxo de Trabalho Git - Domus
INSTRUÇÃO PARA A IA: Sempre que o utilizador solicitar um "envio", "merge" ou "passar código para staging/produção", deves obrigatoriamente ler este ficheiro e executar os comandos exatos dos roteiros abaixo.

Roteiro 1: Envio de Desenvolvimento (Feature) para Staging
Este roteiro funde uma branch de desenvolvimento na branch de homologação.

git checkout staging (Garante que estás na staging)

git pull origin staging (Atualiza a staging com o que está no remoto)

git merge <nome-da-branch-feature> (Funde o código novo)

git push origin staging (Envia para o GitHub/Railway)

Roteiro 2: Envio de Staging para Produção (Main)
Este roteiro aplica as alterações validadas em produção.

git checkout main (Muda para a produção)

git pull origin main (Garante que a main está atualizada)

git merge staging (Funde tudo o que foi validado na homologação)

git push origin main (Envia para o GitHub/Railway em produção)

git checkout staging (Volta à staging para continuar o desenvolvimento)
