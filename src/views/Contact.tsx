import Section from '@/src/components/Section';
import SocialButtons from '@/src/components/SocialButtons';
import { SectionRoutes } from '@/src/constants/routes';
import Footer from '@/src/views/Footer';

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
      <div className="relative flex w-full flex-1 flex-col px-4 pb-4">
        <SocialButtons
          toolTipPlacement={null}
          className="flex w-1/3 flex-1 items-center justify-between self-center"
        />
      </div>
    </Section>
  );
};

export default Contact;
