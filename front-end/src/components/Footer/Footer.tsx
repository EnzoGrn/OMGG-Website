import { FaInstagram, FaLinkedin, FaReddit, FaTiktok } from "react-icons/fa";
import { FaBluesky, FaXTwitter             } from "react-icons/fa6";
import { Container                         } from "@/components/Section/Container"
import { useTranslations                   } from "next-intl";
import { LogoProps                         } from "@/components/Logo/Interface";

interface FooterProps {
  logo  : LogoProps;
  menu ?: {
    title: string;
    links: {
      name: string;
      href: string;
    }[];
  }[];
}

const Footer = ({ logo, menu }: FooterProps) => {
  const t = useTranslations('Footer');

  return (
    <section className="py-8">
      <Container>
        <footer className="">
          <div className="flex flex-col items-center lg:items-start justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
              {/* Logo */}
              <div className="flex items-center gap-2 lg:justify-start">
                <a href={logo.url}>
                  <img src={logo.src} alt={logo.alt} className="h-16" />
                </a>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('subtitle').split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < t('subtitle').split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
              <ul className="flex items-center space-x-6 text-muted-foreground">
                <li className="font-medium hover:text-primary">
                  <a href="https://x.com/omgg_fr">
                    <FaXTwitter className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="https://bsky.app/profile/omggfr.bsky.social">
                    <FaBluesky className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="https://www.instagram.com/omgg_fr/">
                    <FaInstagram className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="https://www.tiktok.com/@omgg_fr">
                    <FaTiktok className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="https://www.linkedin.com/company/omggfr/">
                    <FaLinkedin className="size-6" />
                  </a>
                </li>
                <li className="font-medium hover:text-primary">
                  <a href="https://www.reddit.com/user/omgg_fr/">
                    <FaReddit className="size-6" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-6 lg:gap-20">
              {menu && menu.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-6 font-bold">{section.title}</h3>
                  <ul className="space-y-4 text-sm text-muted-foreground">
                    {section.links.map((link, linkIdx) => (
                      <li
                        key={linkIdx}
                        className="font-medium hover:text-primary"
                      >
                        <a href={link.href}>{link.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 lg:mt-20 flex flex-col justify-between gap-4 border-t pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
            <p>{t('copyright')}</p>
            <ul className="flex justify-center gap-4 lg:justify-start">
              <li className="hover:text-primary">
                <a href="#">{t('terms')}</a>
              </li>
              <li className="hover:text-primary">
                <a href="#">{t('privacy')}</a>
              </li>
            </ul>
          </div>
        </footer>
      </Container>
    </section>
  );
};

export { Footer };
