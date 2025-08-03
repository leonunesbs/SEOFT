# Card de Reagendamento de Atendimentos

Este componente permite reagendar atendimentos existentes, alterando a data, turno e observações.

## Características

- **Card Isolado**: Utiliza um componente Card separado para evitar desorganização do layout
- **DatePicker com Ocupação**: Utiliza o `DatePickerWithOccupancy` para mostrar a lotação dos dias
- **Validação de Conflitos**: Verifica se o paciente já possui agendamento na nova data
- **Campos Condicionais**: O campo de turno só aparece quando uma data é selecionada
- **Integração com tRPC**: Utiliza a mutation `appointment.update` para salvar as alterações

## Uso Básico

```tsx
import { AppointmentRescheduleCard } from "~/components/organisms/appointment-reschedule-card";

// Em um componente
<AppointmentRescheduleCard
  appointmentId="appointment-id"
  patientName="João Silva"
  patientId="patient-id"
  collaboratorId="collaborator-id"
  currentDate={new Date("2024-01-15T07:00:00")}
  currentNotes="Observações atuais"
  trigger={
    <Button variant="outline" size="sm">
      Reagendar
    </Button>
  }
/>;
```

## Props

| Prop             | Tipo         | Obrigatório | Descrição                          |
| ---------------- | ------------ | ----------- | ---------------------------------- |
| `appointmentId`  | `string`     | ✅          | ID do agendamento a ser reagendado |
| `patientName`    | `string`     | ✅          | Nome do paciente                   |
| `patientId`      | `string`     | ✅          | ID do paciente                     |
| `collaboratorId` | `string`     | ✅          | ID do colaborador/médico           |
| `currentDate`    | `Date`       | ✅          | Data atual do agendamento          |
| `currentNotes`   | `string`     | ❌          | Observações atuais do agendamento  |
| `isOpen`         | `boolean`    | ✅          | Controla se o card está visível    |
| `onClose`        | `() => void` | ✅          | Função para fechar o card          |

## Funcionalidades

### DatePicker com Indicadores de Lotação

O componente utiliza o `DatePickerWithOccupancy` que mostra:

- **Verde**: Baixa lotação (≤30 agendamentos)
- **Amarelo**: Média lotação (31-50 agendamentos)
- **Laranja**: Alta lotação (51-80 agendamentos)
- **Vermelho**: Lotação crítica (80+ agendamentos)

### Validação de Conflitos

O sistema verifica automaticamente se o paciente já possui agendamento na nova data selecionada, evitando conflitos de horário.

### Campos Condicionais

- O campo de **turno** só aparece quando uma data é selecionada
- Quando a data é removida, o turno é automaticamente limpo

### Turnos Disponíveis

- **Manhã**: 07:00
- **Tarde**: 13:00

## Integração com tRPC

O componente utiliza a mutation `appointment.update` do router de agendamentos:

```tsx
const updateAppointment = api.appointment.update.useMutation({
  onSuccess: () => {
    // Feedback de sucesso
    // Invalidação de queries relacionadas
  },
  onError: (error) => {
    // Tratamento de erro
  },
});
```

## Exemplo de Implementação na Tabela

```tsx
// Na página de detalhes do agendamento
const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);

// Botão para abrir o card
<Button onClick={() => setIsRescheduleOpen(true)}>
  Reagendar
</Button>

// Card de reagendamento
<AppointmentRescheduleCard
      appointmentId={appointment.id}
      patientName={appointment.patient?.name || "N/A"}
      patientId={appointment.patientId}
      collaboratorId={appointment.collaboratorId}
      currentDate={new Date(appointment.scheduledDate)}
      currentNotes={appointment.notes}
      trigger={
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-muted/50 dark:hover:bg-muted/30"
        >
          <CalendarDays className="h-4 w-4" />
        </Button>
      }
    />
    {/* Outros botões de ação */}
  </div>
</TableCell>
```

## Dependências

- `Card`: Componente de interface para exibir conteúdo em container
- `DatePickerWithOccupancy`: Componente de seleção de data com indicadores de ocupação
- `api.appointment.update`: Mutation tRPC para atualizar agendamentos
- `api.appointment.getOccupancyByPeriod`: Query para buscar dados de ocupação
- `formatDateForAPI`, `localToUTC`, `parseLocalDateString`, `extractTimeFromDate`: Funções utilitárias para manipulação de datas
