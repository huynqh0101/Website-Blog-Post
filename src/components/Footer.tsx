import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";
const Footer = (): JSX.Element => {
  const companyLinks = [
    { title: "About Us", href: "#" },
    { title: "The Test Kitchen", href: "#" },
    { title: "Podcast", href: "#" },
    { title: "Events", href: "#" },
    { title: "Jobs", href: "#" },
  ];

  const helpLinks = [
    { title: "Contact & Faq", href: "#" },
    { title: "Oders & Returns", href: "#" },
    { title: "Gift Cards", href: "#" },
    { title: "Register", href: "#" },
    { title: "Catalog", href: "#" },
  ];

  const exploreLinks = [
    { title: "The Shop", href: "#" },
    { title: "Recipes", href: "#" },
    { title: "Food", href: "#" },
    { title: "Travel", href: "#" },
    { title: "Hotline", href: "#" },
  ];

  const socialLinks = [
    { title: "Facebook", href: "#", icon: <FaFacebook className="w-5 h-5" /> },
    { title: "Twitter", href: "#", icon: <FaTwitter className="w-5 h-5" /> },
    {
      title: "Instagram",
      href: "#",
      icon: <FaInstagram className="w-5 h-5" />,
    },
    { title: "Youtube", href: "#", icon: <FaYoutube className="w-5 h-5" /> },
    {
      title: "Pinterest",
      href: "#",
      icon: <FaPinterest className="w-5 h-5" />,
    },
  ];
  return (
    <footer className="w-full bg-transparent py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description column */}
          <div className="flex flex-col space-y-5">
            <div className="w-[171px] h-[50px] bg-[url(/logo-png.png)] bg-cover bg-[50%_50%]" />
            <p className="text-[#545e69] text-base leading-7">
              Browned Butter And Brown Sugar
              <br />
              caramelly Goodness, Crispy Edges
              <br />
              thick And Soft Centers And Melty
              <br />
              little Puddles Of Chocolate.
            </p>
          </div>

          {/* Company column */}
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <h3 className="font-extrabold [font-family:'Manrope',Helvetica] text-[#183354] text-xl leading-6">
                Company
              </h3>
              <img
                className="w-8 h-[5px]"
                alt="Mask group"
                src="/mask-group-5.svg"
              />
            </div>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-medium text-[#545e69] text-[15px] leading-[26.2px]"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Help column */}
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <h3 className="font-extrabold [font-family:'Manrope',Helvetica] text-[#183354] text-xl leading-6">
                Get Help
              </h3>
              <img
                className="w-8 h-[5px]"
                alt="Mask group"
                src="/mask-group-8.svg"
              />
            </div>
            <ul className="space-y-3">
              {helpLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-medium text-[#545e69] text-[15px] leading-[26.2px]"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore column */}
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <h3 className="font-extrabold [font-family:'Manrope',Helvetica] text-[#183354] text-xl leading-6">
                Explore
              </h3>
              <img
                className="w-8 h-[5px]"
                alt="Mask group"
                src="/mask-group-10.svg"
              />
            </div>
            <ul className="space-y-3">
              {exploreLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-medium text-[#545e69] text-[15px] leading-[26.2px]"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us column */}
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <h3 className="font-extrabold [font-family:'Manrope',Helvetica] text-[#183354] text-xl leading-6">
                Follow Us On
              </h3>
              <img
                className="w-8 h-[5px]"
                alt="Mask group"
                src="/mask-group-6.svg"
              />
            </div>
            <ul className="space-y-3">
              {socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-medium text-[#545e69] text-[15px] leading-[26.2px] flex items-center gap-2 hover:text-[#183354] transition-colors"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.icon}
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
