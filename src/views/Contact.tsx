import Section from '@/src/components/Section';
import SocialButtons from '@/src/components/SocialButtons';
import Terminal from '@/src/components/Terminal';
import { SectionRoutes } from '@/src/constants/routes';
import Footer from '@/src/views/Footer';
import { TooltipPlacement } from '../types/ui';

const Contact = () => {
  return (
    <Section
      id={SectionRoutes.Contact}
      overlayChildren={
        <Footer
          className="absolute inset-x-0 bottom-0 items-start border-none pl-4 !backdrop-blur-none sm:justify-start"
          showSocialLinks={false}
        />
      }
    >
      <div className="flex h-3/4 w-full justify-center px-4">
        <Terminal className="w-full md:w-3/4" />
      </div>
      <SocialButtons
        toolTipPlacement={TooltipPlacement.Bottom}
        className="flex w-full flex-1 items-center justify-evenly"
      />
    </Section>
  );
};

export default Contact;
