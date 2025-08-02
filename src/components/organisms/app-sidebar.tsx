import { type Collaborator } from "@prisma/client";
import Link from "next/link";
import * as React from "react";
import {
  MdGroup,
  MdLink,
  MdOutlineArchive,
  MdOutlineAssignmentInd,
  MdOutlineAssistant,
  MdOutlineAttribution,
  MdOutlineCalendarToday,
  MdOutlineHome,
  MdOutlineList,
  MdOutlineLocalPharmacy,
  MdOutlineLockPerson,
  MdOutlineNotes,
  MdOutlinePersonAdd,
  MdOutlineSearch,
  MdSettings,
} from "react-icons/md";

import { CollaboratorSwitcher } from "~/components/organisms/collaborator-switcher";
import { SearchForm } from "~/components/organisms/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "~/components/ui/sidebar";
import { HydrateClient } from "~/trpc/server";
import { PendingBadge } from "../atoms/pending-badge";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  collaborators: Collaborator[];
  currentCollaboratorId?: string;
}

export function AppSidebar({
  collaborators,
  currentCollaboratorId,

  ...props
}: AppSidebarProps) {
  const data: {
    navMain: {
      title: string;
      url: string;
      icon?: React.ReactNode;
      items: {
        title: string;
        url: string;
        icon?: React.ReactNode;
        external?: boolean;
      }[];
    }[];
  } = {
    navMain: [
      {
        title: "Início",
        url: "/",
        icon: <MdOutlineHome size={18} />,
        items: [],
      },
      {
        title: "Notas",
        url: "/notes",
        icon: <MdOutlineNotes size={18} />,
        items: [],
      },
      {
        title: "Avaliações",
        url: "/evaluations",
        icon: <MdOutlineArchive size={18} />,
        items: [
          {
            title: "Pendentes",
            url: "/evaluations/pending",
            icon: (
              <HydrateClient>
                <PendingBadge collaboratorId={currentCollaboratorId!} />
              </HydrateClient>
            ),
          },
        ],
      },
      {
        title: "Agenda",
        url: "/agenda",
        icon: <MdOutlineCalendarToday size={18} />,
        items: [],
      },
      {
        title: "Pacientes",
        url: "#",
        icon: <MdGroup size={18} />,
        items: [
          {
            title: "Buscar",
            url: "/patients/search",
            icon: <MdOutlineSearch size={18} />,
          },
          {
            title: "Adicionar",
            url: "/patients/add",
            icon: <MdOutlinePersonAdd size={18} />,
          },
        ],
      },
      {
        title: "Medicamentos",
        url: "/medications",
        icon: <MdOutlineLocalPharmacy size={18} />,
        items: [],
      },
      {
        title: "Ajustes",
        url: "#",
        icon: <MdSettings size={18} />,
        items: [
          {
            title: "Staffs",
            url: "/settings/staffs",
            icon: <MdOutlineAssignmentInd size={18} />,
          },
          {
            title: "Usuários",
            url: "/settings/users",
            icon: <MdOutlineLockPerson size={18} />,
          },
          {
            title: "Residentes",
            url: "/settings/residents",
            icon: <MdOutlineAssistant size={18} />,
          },
          {
            title: "Ambulatórios",
            url: "/settings/clinics",
            icon: <MdOutlineAttribution size={18} />,
          },
        ],
      },
      // {
      //   title: "AntiVEGF",
      //   url: "/antivegf",
      //   icon: <MdLink size={18} />,
      //   items: [
      //     {
      //       title: "Indicações",
      //       url: "/antivegf/indications",
      //       icon: <MdOutlineAssignmentInd size={18} />,
      //     },
      //     {
      //       title: "Agendamentos",
      //       url: "/antivegf/appointments",
      //       icon: <MdOutlineList size={18} />,
      //     },
      //     {
      //       title: "Gestão de Injeções",
      //       url: "/antivegf/injection-day-management",
      //       icon: <MdOutlineLocalPharmacy size={18} />,
      //     },
      //     {
      //       title: "Gestão de Agenda",
      //       url: "/antivegf/schedule-management",
      //       icon: <MdOutlineHome size={18} />,
      //     },
      //     {
      //       title: "Avaliação NIR",
      //       url: "/antivegf/nir-evaluation",
      //       icon: <MdOutlineArchive size={18} />,
      //     },
      //   ],
      // },
      {
        title: "Outros",
        url: "#",
        icon: <MdOutlineList size={18} />,
        items: [
          {
            title: "Justificativas",
            url: "https://just.seoft.app",
            icon: <MdLink size={18} />,
            external: true,
          },
        ],
      },
    ],
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <React.Suspense fallback={<span>Carregando...</span>}>
          <CollaboratorSwitcher collaborators={collaborators} />
        </React.Suspense>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild href={item.url}>
                  <Link href={item.url} className="font-medium">
                    {item.icon} {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          href={subItem.url}
                          exact={subItem.external}
                        >
                          <Link
                            href={subItem.url}
                            target={subItem.external ? "_blank" : undefined}
                          >
                            {subItem.icon} {subItem.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
