# Funcionalidades do Sistema NIR Evaluation

## Indicações AntiVEGF

### 🔴 REGRA CRÍTICA: Alternância Obrigatória Entre Olhos

**NUNCA fazer injeções no mesmo dia em ambos os olhos**

O sistema agora implementa uma lógica rigorosa de alternância que garante que injeções em olhos diferentes sempre tenham pelo menos 2 semanas de intervalo.

### Como funciona:

#### 📋 **Regras de Agendamento:**

1. **Apenas um olho com doses:** Intervalo de 4 semanas entre doses do mesmo olho
2. **Ambos os olhos com doses:**
   - **SEMPRE** 2 semanas de intervalo entre olhos diferentes
   - 4 semanas de intervalo entre doses do mesmo olho
   - Alternância automática entre os olhos

#### 📅 **Exemplo Prático:**

**Cenário:**

- Data de início: 01/01/2024
- Doses: OD = 3, OS = 2
- Olho inicial: OD

**❌ ANTES (Problemático):**

```
01/01/2024 - OD dose 1 + OS dose 1 (MESMO DIA - PROIBIDO!)
29/01/2024 - OD dose 2 + OS dose 2 (MESMO DIA - PROIBIDO!)
26/02/2024 - OD dose 3
```

**✅ AGORA (Correto):**

```
01/01/2024 - OD dose 1 (início)
15/01/2024 - OS dose 1 (+ 2 semanas)
29/01/2024 - OD dose 2 (+ 2 semanas)
12/02/2024 - OS dose 2 (+ 2 semanas)
26/02/2024 - OD dose 3 (+ 2 semanas)
```

#### 🔄 **Lógica de Alternância:**

1. **Início:** Olho especificado no campo `startEye`
2. **Alternância:** A cada 2 semanas troca de olho
3. **Finalização:** Quando um olho completar todas as doses, continua apenas o outro olho
4. **Intervalo mínimo:** Nunca menos que 2 semanas entre qualquer injeção

#### 🎯 **Cenários Especiais:**

**Doses desiguais (OD=4, OS=2):**

```
Semana 0:  OD dose 1
Semana 2:  OS dose 1
Semana 4:  OD dose 2
Semana 6:  OS dose 2 (OS completo)
Semana 8:  OD dose 3 (só OD restante)
Semana 10: OD dose 4 (só OD restante)
```

**Apenas um olho (OD=3, OS=0):**

```
Semana 0:  OD dose 1
Semana 4:  OD dose 2 (+4 semanas)
Semana 8:  OD dose 3 (+4 semanas)
```

### 🛡️ **Proteções Implementadas:**

- **Validação de entrada:** Verifica se os dados estão corretos
- **Loop infinito:** Proteção contra erros de lógica
- **Logs detalhados:** Rastreamento completo do agendamento
- **Consistência:** Mesma lógica em `createInjections` e `approveIndication`

### 🏥 **Benefícios Clínicos:**

- ✅ **Segurança:** Nunca haverá conflito de agendamento no mesmo dia
- ✅ **Organização:** Fluxo previsível e bem distribuído
- ✅ **Acompanhamento:** Melhor controle da evolução de cada olho
- ✅ **Compliance:** Segue protocolos médicos recomendados

### 💻 **Implementação Técnica:**

- **Funções atualizadas:** `createInjections` e `approveIndication`
- **Algoritmo:** Alternância com controle de data e contadores por olho
- **Validação:** Proteções contra loops infinitos e dados inválidos
- **Logs:** Rastreamento detalhado para debug e auditoria

**Localização do código:** `src/server/api/routers/indication.ts` - funções `createInjections` e `approveIndication`

---

## 🐛 **CORREÇÃO: Problema no Formulário Frontend**

### **Problema Identificado:**

O formulário de criação de indicações estava gerando programação para a mesma data em ambos os olhos, mesmo após a correção do backend.

### **Causa:**

A função `generateScheduledDates` no frontend usava a lógica antiga:

```javascript
if (dose.doseNumber === 1) {
  // ❌ PROBLEMA: Primeira dose de cada olho na mesma data
  injectionDate = new Date(currentDate);
}
```

### **✅ Solução Implementada:**

#### **Frontend Sincronizado:**

- Reescrita completa da função `generateScheduledDates`
- Implementação da mesma lógica de alternância do backend
- Previsualização correta no formulário

#### **Funções Corrigidas:**

1. **`generateScheduledDates`:** Calcula datas com alternância obrigatória
2. **`recalculateDatesFromIndex`:** Mantém alternância ao alterar datas manualmente

#### **Resultado:**

- **Frontend:** Exibe cronograma correto na criação
- **Backend:** Salva com a mesma lógica
- **Consistência total** entre visualização e execução

### **Antes vs Depois:**

**❌ ANTES (Frontend):**

```
Formulário mostrava:
01/01 - OD dose 1 + OS dose 1 (mesmo dia!)
29/01 - OD dose 2 + OS dose 2 (mesmo dia!)
```

**✅ DEPOIS (Frontend):**

```
Formulário mostra:
01/01 - OD dose 1
15/01 - OS dose 1 (+2 semanas)
29/01 - OD dose 2 (+2 semanas)
12/02 - OS dose 2 (+2 semanas)
```

### **Localização das Correções:**

- **Frontend:** `src/app/(withSidebar)/antivegf/indications/new/page.tsx`
  - Função `generateScheduledDates` (linha ~211)
  - Função `recalculateDatesFromIndex` (linha ~386)

**🎯 Resultado:** Frontend e backend 100% sincronizados com alternância obrigatória!
