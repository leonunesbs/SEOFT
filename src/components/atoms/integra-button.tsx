import { Button, ButtonProps } from "../ui/button";

import Link from "next/link";
import { MdLink } from "react-icons/md";

interface IntegraButtonProps extends ButtonProps {
  linkProps?: React.ComponentProps<typeof Link>;
}

export function IntegraButton({ ...props }: IntegraButtonProps) {
  return (
    <Link href={"/integra"} target="_blank" passHref {...props.linkProps}>
      <Button {...props}>
        <MdLink size={18} />
        <span className="hidden sm:inline">Acessar</span> Integra
      </Button>
    </Link>
  );
}
