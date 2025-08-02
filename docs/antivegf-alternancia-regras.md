# Regras de Alternância - Injeções AntiVEGF

## 📋 Visão Geral

O sistema SEOFT implementa **alternância obrigatória** entre olhos quando ambos são indicados para injeções intravítreas AntiVEGF, seguindo as melhores práticas médicas de segurança.

## ⚡ Regra Principal

**Quando ambos os olhos (OD e OS) são indicados para tratamento:**

- As injeções **alternam automaticamente** entre os olhos
- **Nunca** há injeções bilaterais no mesmo dia
- O sistema calcula automaticamente as datas respeitando os intervalos

## 📅 Intervalos Obrigatórios

### Entre Olhos Diferentes

- **14 dias** de intervalo mínimo
- Exemplo: OD hoje → OS em 14 dias

### Entre Doses do Mesmo Olho

- **28 dias** de intervalo mínimo
- Exemplo: OD hoje → próximo OD em 28+ dias

## 🔄 Como Funciona a Alternância

### Cenário: 3 doses OD + 2 doses OS, começando por OD

```
Dose 1: OD (Dia 0)      ← Olho inicial
    ↓ 14 dias
Dose 2: OS (Dia 14)     ← Alternância
    ↓ 14 dias
Dose 3: OD (Dia 28)     ← Alternância
    ↓ 14 dias
Dose 4: OS (Dia 42)     ← Alternância (última dose OS)
    ↓ 28 dias
Dose 5: OD (Dia 70)     ← Só restam doses OD, intervalo de 28 dias
```

## 🛡️ Benefícios de Segurança

1. **Reduz riscos sistêmicos** - Nunca duas injeções no mesmo dia
2. **Permite recuperação** - Tempo adequado entre procedimentos
3. **Monitoramento melhor** - Acompanhar resposta de cada olho
4. **Conformidade** - Segue protocolos médicos estabelecidos

## 💻 Implementação no Sistema

### Frontend

- Cálculo automático das datas no formulário
- Visualização clara da alternância
- Alertas informativos sobre as regras

### Backend

- Validação no servidor
- Criação automática do cronograma
- Logs detalhados para auditoria

### Interface do Usuário

- **Formulário**: Alerta explicativo quando ambos os olhos são selecionados
- **Visualização**: Indicadores visuais de alternância e intervalos
- **Calendário**: Códigos de cores para diferentes olhos

## 🎯 Casos Especiais

### Apenas Um Olho

- **Intervalo**: 28 dias entre doses do mesmo olho
- **Sem alternância**: Agendamento linear simples

### Números Diferentes de Doses

- Sistema alterna até acabar as doses de um olho
- Continua apenas com o olho restante respeitando intervalo de 28 dias

### Reagendamentos

- Mantém as regras de alternância
- Recalcula automaticamente as datas subsequentes

## 📊 Exemplo Prático

**Paciente**: João Silva  
**Indicação**: DMRI Exsudativa bilateral  
**Prescrição**: 3 doses OD + 2 doses OS  
**Início**: 15/01/2024 (OD)

**Cronograma Gerado:**

1. 15/01/2024 - OD (início)
2. 29/01/2024 - OS (14 dias depois)
3. 12/02/2024 - OD (14 dias depois)
4. 26/02/2024 - OS (14 dias depois - última OS)
5. 25/03/2024 - OD (28 dias depois - só restam OD)

## ✅ Validações do Sistema

- ✅ Nunca permitir injeções bilaterais no mesmo dia
- ✅ Respeitar intervalos mínimos obrigatórios
- ✅ Alternância automática quando ambos os olhos têm doses
- ✅ Verificação de disponibilidade de agenda
- ✅ Logs de auditoria completos

## 🚨 Alertas e Notificações

O sistema exibe alertas quando:

- Ambos os olhos são selecionados (explica a alternância)
- Datas não estão disponíveis na agenda
- Intervalos não são respeitados
- Reagendamentos afetam a sequência

---

_Esta documentação reflete a implementação atual do sistema SEOFT para garantir a segurança e eficácia dos tratamentos AntiVEGF._
