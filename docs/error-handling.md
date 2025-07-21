# Sistema de Gerenciamento de Erros Profissional

## 📋 Visão Geral

Este documento descreve o sistema completo de gerenciamento de erros implementado no projeto SEOFT, incluindo integração com **Vercel Analytics** para monitoramento em tempo real.

## 🏗️ Arquitetura do Sistema

### Componentes Principais

1. **Classes de Erro Customizadas** (`src/lib/errors.ts`)
2. **Sistema de Analytics** (`src/lib/analytics.ts`)
3. **Middleware de Logging** (`src/server/api/middleware/error-logging.ts`)
4. **Hooks React** (`src/hooks/use-error-handler.ts`)
5. **Validação** (`src/lib/validation.ts`)

### Fluxo de Tratamento de Erros

```
Erro Ocorre → AppError Class → Analytics Tracking → Logging → Toast Notification
     ↓
Middleware tRPC → Error Formatting → Client Response
```

## 🔧 Integração com Vercel Analytics

### Funcionalidades Implementadas

- **Tracking Automático de Erros**: Todos os erros são automaticamente enviados para o Vercel Analytics
- **Categorização por Severidade**: Erros são categorizados como low, medium, high, critical
- **Contexto Rico**: Inclui informações como usuário, operação, duração, ambiente
- **Performance Monitoring**: Tracking de performance de operações
- **User Actions**: Monitoramento de ações do usuário

### Eventos Enviados para Analytics

#### 1. Eventos de Erro

```typescript
{
  name: "error",
  properties: {
    code: "AUTH_001",
    message: "Sessão expirada",
    path: "/api/patient/create",
    userId: "user_123",
    operation: "create_patient",
    severity: "medium",
    environment: "production",
    timestamp: "2024-01-01T00:00:00Z",
    duration: 150
  }
}
```

#### 2. Eventos de Performance

```typescript
{
  name: "performance",
  properties: {
    path: "/api/patient/list",
    duration: 250,
    operation: "list_patients",
    userId: "user_123",
    environment: "production",
    timestamp: "2024-01-01T00:00:00Z"
  }
}
```

#### 3. Eventos de Ação do Usuário

```typescript
{
  name: "user_action",
  properties: {
    action: "create_patient",
    resource: "patient",
    userId: "user_123",
    success: true,
    environment: "production",
    timestamp: "2024-01-01T00:00:00Z"
  }
}
```

## 📊 Códigos de Erro Estruturados

### Categorias de Erro

| Categoria | Códigos             | Descrição                           | Severidade |
| --------- | ------------------- | ----------------------------------- | ---------- |
| **AUTH**  | AUTH_001 a AUTH_004 | Autenticação e autorização          | Medium     |
| **VAL**   | VAL_001 a VAL_004   | Validação de dados                  | Low        |
| **RES**   | RES_001 a RES_004   | Recursos (não encontrado, conflito) | Medium     |
| **DB**    | DB_001 a DB_005     | Banco de dados                      | High       |
| **BUS**   | BUS_001 a BUS_004   | Lógica de negócio                   | Medium     |
| **SYS**   | SYS_001 a SYS_004   | Sistema                             | Critical   |

### Mapeamento de Severidade

```typescript
function getErrorSeverity(
  code: string,
): "low" | "medium" | "high" | "critical" {
  if (code.startsWith("AUTH_")) return "medium";
  if (code.startsWith("VAL_")) return "low";
  if (code.startsWith("RES_")) return "medium";
  if (code.startsWith("DB_")) return "high";
  if (code.startsWith("BUS_")) return "medium";
  if (code.startsWith("SYS_")) return "critical";
  return "medium";
}
```

## 🛠️ Implementação Backend

### 1. Classes de Erro Customizadas

```typescript
// Exemplo de uso
throw new ResourceNotFoundError("Paciente", "12345", {
  operation: "get_patient",
  userId: ctx.session?.user?.id,
});
```

### 2. Wrapper para Procedures

```typescript
export const patientRouter = createTRPCRouter({
  create: protectedProcedure.input(patientSchema).mutation(
    withErrorHandling(
      async ({ input, ctx }) => {
        // Lógica da operação
        return await ctx.db.patient.create({ data: input });
      },
      { operation: "create_patient" },
    ),
  ),
});
```

### 3. Middleware de Logging

```typescript
// Middleware automático para todas as procedures
export const comprehensiveLoggingMiddleware = t.middleware(
  async ({ path, input, next, ctx }) => {
    const startTime = Date.now();

    try {
      const result = await next();
      const duration = Date.now() - startTime;

      // Track performance
      trackPerformance(path, duration, "tRPC", ctx.session?.user?.id);

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;

      // Track erro
      trackError(error.code, error.message, {
        path,
        userId: ctx.session?.user?.id,
        operation: path,
        duration,
      });

      throw error;
    }
  },
);
```

## 🎨 Implementação Frontend

### 1. Hook Principal

```typescript
const { handleError, handleSuccess, handleWarning } = useErrorHandler();

// Uso
handleError(error, {
  operation: "create_patient",
  userId: "current_user_id",
});

handleSuccess(
  {
    message: "Paciente criado com sucesso!",
    action: "create_patient",
    resource: "patient",
  },
  { userId: "current_user_id" },
);
```

### 2. Hook para Mutações

```typescript
const { handleMutationError, handleMutationSuccess } =
  useMutationErrorHandler();

const createPatient = api.patient.create.useMutation({
  onError: (error) => {
    handleMutationError(error, {
      operation: "create_patient",
      userId: "current_user_id",
    });
  },
  onSuccess: () => {
    handleMutationSuccess("Paciente criado com sucesso!", {
      action: "create_patient",
      resource: "patient",
      userId: "current_user_id",
    });
  },
});
```

### 3. Hook para Formulários

```typescript
const { handleFormError, handleFormSuccess } = useFormErrorHandler();

// Validação
if (!patientName.trim()) {
  handleFormError(new Error("Nome é obrigatório"), "name");
  return;
}

// Sucesso
handleFormSuccess("Formulário enviado com sucesso!", "patient_form");
```

### 4. Hook para Queries

```typescript
const { handleQueryError } = useQueryErrorHandler();

const getPatient = api.patient.get.useQuery(
  { refId: patientRefId },
  {
    enabled: false,
  },
);

const handleSearch = async () => {
  try {
    await getPatient.refetch();
  } catch (error) {
    handleQueryError(error, {
      operation: "get_patient",
      userId: "current_user_id",
    });
  }
};
```

## 📈 Monitoramento e Analytics

### Dashboard do Vercel Analytics

Acesse o dashboard do Vercel Analytics para visualizar:

1. **Eventos de Erro**: Frequência, tipos, severidade
2. **Performance**: Tempo de resposta por operação
3. **User Actions**: Ações mais comuns, taxa de sucesso
4. **Alertas**: Configuração de alertas para erros críticos

### Métricas Importantes

- **Error Rate**: Taxa de erro por operação
- **Response Time**: Tempo médio de resposta
- **User Experience**: Ações do usuário e sucesso
- **System Health**: Erros de sistema e performance

### Configuração de Alertas

Configure alertas no Vercel Analytics para:

- Erros com severidade "critical" ou "high"
- Taxa de erro acima de 5% em qualquer operação
- Tempo de resposta acima de 2 segundos
- Falhas de autenticação frequentes

## 🔍 Debugging e Logs

### Logs Estruturados

```typescript
console.error(`[TRPC] ❌ ${path} failed after ${duration}ms`, {
  code: appError.code,
  message: appError.message,
  path,
  duration,
  userId: ctx.session?.user?.id,
  timestamp: appError.timestamp.toISOString(),
  context: {
    ...appError.context,
    originalError: error instanceof Error ? error.message : String(error),
  },
});
```

### Logs de Analytics

```typescript
// Em desenvolvimento
console.log("[ANALYTICS] Error tracked:", {
  name: "error",
  properties: {
    /* ... */
  },
});
```

## 🚀 Melhores Práticas

### 1. Uso Consistente de Códigos

```typescript
// ✅ Correto
throw new ValidationError("Data de nascimento inválida", {
  field: "birthDate",
  operation: "create_patient",
});

// ❌ Incorreto
throw new Error("Data inválida");
```

### 2. Contexto Rico

```typescript
// ✅ Incluir contexto útil
throw new ResourceNotFoundError("Paciente", patientId, {
  operation: "update_patient",
  userId: ctx.session?.user?.id,
  attemptedFields: Object.keys(input),
});

// ❌ Contexto pobre
throw new ResourceNotFoundError("Paciente", patientId);
```

### 3. Tracking de Performance

```typescript
// ✅ Sempre track performance
const startTime = Date.now();
try {
  const result = await operation();
  const duration = Date.now() - startTime;
  trackPerformance(path, duration, operation, userId);
  return result;
} catch (error) {
  const duration = Date.now() - startTime;
  trackError(error.code, error.message, { duration });
  throw error;
}
```

### 4. User Experience

```typescript
// ✅ Feedback claro para o usuário
handleError(error, {
  operation: "create_patient",
  userId: currentUser.id,
});

// ✅ Sucesso com contexto
handleSuccess({
  message: "Paciente criado com sucesso!",
  action: "create_patient",
  resource: "patient",
});
```

## 🔧 Configuração

### Variáveis de Ambiente

```bash
# Vercel Analytics (já configurado)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# Ambiente
NODE_ENV=production
```

### Configuração do tRPC

```typescript
// src/server/api/trpc.ts
export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    db,
    session: await auth(),
    headers: opts.headers,
  };
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        customError: {
          code: error.cause?.code || "UNKNOWN",
          message: error.cause?.message || error.message,
          statusCode: error.cause?.statusCode || 500,
          context: error.cause?.context || {},
        },
      },
    };
  },
});
```

## 📚 Exemplos Completos

### Exemplo de Router Completo

```typescript
export const patientRouter = createTRPCRouter({
  create: protectedProcedure.input(patientSchema).mutation(
    withErrorHandling(
      async ({ input, ctx }) => {
        // Validação de negócio
        const existing = await ctx.db.patient.findUnique({
          where: { refId: input.refId },
        });

        if (existing) {
          throw createConflictError(
            "Paciente",
            `já existe com prontuário ${input.refId}`,
          );
        }

        // Criação
        const patient = await ctx.db.patient.create({
          data: input,
        });

        return patient;
      },
      { operation: "create_patient" },
    ),
  ),

  get: protectedProcedure.input(z.object({ refId: z.string() })).query(
    withErrorHandling(
      async ({ input, ctx }) => {
        const patient = await ctx.db.patient.findUnique({
          where: { refId: input.refId },
        });

        if (!patient) {
          throw createNotFoundError("Paciente", input.refId);
        }

        return patient;
      },
      { operation: "get_patient" },
    ),
  ),
});
```

### Exemplo de Componente Completo

```typescript
export function PatientForm() {
  const { handleMutationError, handleMutationSuccess } = useMutationErrorHandler();
  const { trackUserAction } = useErrorTracking();

  const createPatient = api.patient.create.useMutation({
    onError: (error) => {
      handleMutationError(error, {
        operation: "create_patient",
        userId: "current_user_id"
      });
    },
    onSuccess: (data) => {
      handleMutationSuccess("Paciente criado com sucesso!", {
        action: "create_patient",
        resource: "patient",
        userId: "current_user_id"
      });

      trackUserAction("patient_created", true, "patient");
    },
  });

  const handleSubmit = (data: PatientFormData) => {
    trackUserAction("patient_form_submit", true, "patient");
    createPatient.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Formulário */}
    </form>
  );
}
```

## 🎯 Benefícios do Sistema

### Para Desenvolvedores

- **Debugging Eficiente**: Logs estruturados e contexto rico
- **Type Safety**: Tipagem completa com TypeScript
- **Consistência**: Padrões uniformes em todo o projeto
- **Produtividade**: Hooks reutilizáveis e automáticos

### Para Usuários

- **Feedback Claro**: Mensagens de erro compreensíveis
- **Experiência Consistente**: Comportamento uniforme
- **Recuperação Rápida**: Informações para resolver problemas

### Para Operações

- **Monitoramento Real-time**: Analytics em tempo real
- **Alertas Proativos**: Notificações de problemas
- **Métricas de Performance**: Insights de performance
- **Análise de Tendências**: Histórico e padrões

## 🔄 Manutenção e Evolução

### Atualizações Regulares

1. **Revisão de Códigos**: Adicionar novos códigos conforme necessário
2. **Análise de Métricas**: Revisar dados do Vercel Analytics
3. **Otimização**: Melhorar performance baseado em métricas
4. **Documentação**: Manter documentação atualizada

### Extensões Futuras

- **Integração com Sentry**: Para tracking mais detalhado
- **Alertas Customizados**: Configuração de alertas específicos
- **Dashboards Personalizados**: Métricas customizadas
- **A/B Testing**: Testes de diferentes mensagens de erro

---

Este sistema fornece uma base sólida e profissional para o gerenciamento de erros, garantindo uma experiência de usuário excepcional e facilitando o desenvolvimento e manutenção do projeto.
