import { Navbar } from "@/components/Navigation/Navbar";
import { Container } from "@/components/Section/Container";
import { DropdownProps, ItemLinksProps } from "@/components/Navigation/NavigationProps";
import { LogoProps } from "@/components/Section/Interface";

interface NavBarPropsProps {
  logo: LogoProps,
  dropdowns: DropdownProps[],
  linkButtons: ItemLinksProps[]
}

const OMGGNavbar = ({ global }: { global: NavBarPropsProps }) => {

  if (!global)
    return null;

  return (
    <header className="sticky top-0 z-50 bg-background shadow-sm w-full">
      <Container>
        <Navbar logo={global.logo} dropdowns={global.dropdowns} itemLinks={global.linkButtons} />
      </Container>
    </header>
  );
}

export { OMGGNavbar }
